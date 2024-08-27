---
title: Naive diffusion
summary: ""
---



# Naive diffusion

This is part 1 in a series on diffusion models. In this part, we will build a diffusion model from scratch, working purely from intuitive principles. We will use as little mathematical derivation as possible, and appeal purely to intuitive ideas.

The resulting model won't be as strong as the state of the art, but it will give us a good understanding of the basic mechanism at play. It will also allow us to set up some basic concepts, like the UNet architecture, before we start digging into the mathematics that will help us to improve the model.  

## The problems of generative modeling 

Before we get building, it's good to review what the problem is that we are trying to solve. What is [generative modeling](../generator-network), and what makes it difficult? In generative modeling, we are given a dataset of _things_. To keep things concrete, we'll stick with images. We are given a set of images (somewhere between 10 000 and several billion) and our job is to create a model that can produce new images _of the same kind_. That is, the images produced by the model should not be in the original dataset, but <span class="rc">they should be realistic examples of the type of thing we see in the dataset</span>.

That <span class="rc">last constraint</span> is, of course, a little ambiguous. All we have is the set of images. We usually don't even know how to formally define what kind of thing they depict. That's why machine learning is a good tool to use. If we have gaps in our formal understanding of a task---but we do have a kind of intuitive understanding that would be good enough for a human being to solve it---then _learning_ can often help us to bridge those gaps. Whatever isn't properly defined, we'll try to learn by example.

To my mind, there are two problems that make generative modeling harder than problems like classification and regression. For each generative modeling approach you encounter, it's instructive to see how it solves these problems.

**Problem 1: How to compare the output to the data?** This is the most fundamental problem. Say you've built some model, perhaps a [generator network](generator-network), a diffusion process, or something else. Whatever it is, you've built a box with a button on it, and if you push the button out pops an image. The box has some dials (the parameters of your network) that determine what sort of images it spits out, and you'd like to figure out how to turn these dials so that your network starts producing images like the ones in your dataset.

Here comes the problem: you push the button, and out pops an image. Which image from your dataset do you compare it to, to figure out if the model has done well? The closest one? A randomly chosen one? 

It turns out that if you try this kind of approach, what invariably happens is that the model ends up minimizing the distance of what it spits out to _all images in the dataset_. In short, the model produces the mean (or mode) of the data. This is what we call _[mode collapse](../mode-collapse)_.

-- Mean face

This is not what we are looking for. We want our model to produce _variation_. If it's trained on a dataset of images of faces, we want it to produce a person with glasses one time, and a person without glasses the next. Not a person with fuzzy half-glasses both times.

The fundamental issue that we keep coming back to in all these approaches is that we don't have examples of what _input_ to the network should produce which _output_. All we have is a set of outputs of the sort of thing we'd like the network to produce. 

**Problem 2: Generalization.** A simple way to avoid problem 1, is to just remember the data. Every time the button is pushed, we spit out a random instance from the dataset. This is, of course, overfitting. We want the model to generate new face, ones that don't yet exist. 

The issue, how do we ensure that the model generalizes, and how do we test how much it has generalized? Does it just spit out very slight variations of the people in the dataset, or does it generate genuinely new faces?

Whether we can test this effectively, and based on sound principles, depends a lot on the structure of the model.

**Problem 3. Variety** Another cheap trick that a model can use to seem like it's doing well, is to generate only a few, high-quality, novel examples. Perhaps it has stored in memory only 100 very high quality examples. They could be very different from the ones in the data, and all very different from each other. 

In this case, generating a few exampleswould convince us that we have a well-performing generator. However, if we looked more rigorously, generating hundreds of examples, we'd see the model starting to repeat itself. A proper generative model should be able to generate essentially an infinite number of novel, highly varied instances. 

**Problem 4: Where do you get enough randomness?** This issue is less fundamental, but it's an instructive one to keep in mind. In the early days of generative modeling, those dominated by GANs and VAEs, the fundamental approach was usually a [generator network](generator-network): we sample a vector of random noise, and feed it to a network that turns it into an image. Often the noise vector was quite low-dimensional compared to the number of dimensions in the output image. For instance, we would try to map a $512$-dimensional random vector to an image with $1024 \times 1024$ pixels with $3$ color channels per pixel.

Consider what that means when you're trying to generate an images like this

-- StyleGAN silver fox

That rakishly unkempt hair is full of randomness. For every lock of hair, the model has to somehow decide whether it goes this way or that. For every image of this same man with the same hairstyle, but messy in a slightly different way, the model should be capable of producing it. Since the network itself is purely deterministic, all that randomness should come from the input vector.

The above images came from StyleGAN, an GAN model, that fed large amounts of randomness in to the generator at the late stages of generation. The authors were lucky that this approach worked in GANs. In VAEs, for example, this isn't nearly so easy.

So, as we get started on diffusion, keep these four problems in mind. They should help to build some understanding for why diffusion is so successful.

## Building diffusion 

As explained in the summary, diffusion is built on the idea of slowly adding noise to our data until all the information in it is gone. 

To keep things simple for our naive diffusion model, we will choose _binomial noise_. That's a fancy way of saying that we will pick a handful of pixels in the image and turn each of them either black or white with 50% probability. Then we repeat the process and repeat again and again and so on, until all the pixels have been replaced by black or white. 

-- image

We will call the original image $\x_0$. The image after one step of adding noise we call $\z_1$, after two steps $\z_2$ and so on. We will call the final image $\z_T$. That is, we add noise for $T$ steps, at which point all the information in the original image $\x_0$ should be gone. 

What we set $T$ to, that is how many steps of noise we add, is a choice we make. If we were so inclined, we could easily work out at which $T$ we could expect all pixels to have been replaced by noise. However, I promised no math in this part, so we'll just eyeball it for now. With $32 \times 32$ images and $32$ pixels of noise added each step, it seems that $T=60$ is enough for all pixels to be turned either black or white. 

Once we have our sequence of noisy images $\z_1 \ldots \z_T$, we can set up our network $\bc{f}$. It takes as input a noisy image $\z_t$ and attempts to predict the image $\z_{t-1}$ that preceded it. That is, we are training a simple denoising operation. Something neural networks (and other machine learning models) have been able to do for a long time. 

-- image

Now comes the clever bit. Once we have a network that can reasonably remove a small amount of noise, we can easily _reverse_ our whole noising process. Let's first look at what we know about $\z_T$. We've assumed that at this point, every pixel in the image has had some noise applied to it, possibly multiple times. Whenever this happens we know that the pixel becomes either black or white with 50% percent probability, regardless of what its value was before. That means that in $\z_T$ _every pixel_ is either black or white with 50% probability. To put it formally, we know the distribution to which our process _converges_ if we set $T$ high enough.

To reverse our noising process, we can simply sample a new $\z_T$ from this distribution. In our case, this means making a $32 \times 32$ image and randomly setting each pixel to black or white. Once we have our $\z_T$, we feed it to our network to remove some of the noise. If we set $T=60$, then this gives us a slightly denoised image $\bc{f}(\z_{60}) = z_{59}$. We then apply $\bc{f}$ again to remove some more of the noise $\bc{f}(\z_{59}) = \z_{58}$ and so on, all the way to the start $\bc{f}(\z_1) = \x_0$. If everything works, this $\x_0$ should be a sample that looks like the images in our data set. 

It's of course slightly inaccurate to say that we are _removing_ the noise. There was never any "real image" behind our sample $\z_T$. More accurately we can say that in attempting to remove the noise, the network $f$ is hallucinating some details to add in place of the noise. In every step, it takes the small hallucinations from the previous steps and builds on them to slowly hallucinate a full sample that looks like it could have been part of our dataset.

### Setting up our network: UNets

So, what should this neural network $\bc{f}$ look like? Ultimately, we want to apply this method to high-resolution images. This means that a simple approach, like a fully connected feed-forward network won't do. If we want to map one image of $1024 \times 1024$ pixels with 3 color channels to another such image, our input and output are both described by about 3 million numbers, so just a single feedforward layer would give us around $9 \cdot 10^12$ parameters. 

Let's look at the sort of thing this network should be able to do easily. The first is to _preserve_ part of the input. At each step of denoising, most of the image won't contain noise that we want to remove, so the network should simply take the input as it is, and reproduce it. This is easiest with a _pointwise_ convolution: we just connect every input pixel to the corresponding output pixel and to no other part of the image.

<aside>Put differently, a pointwise convolution is just a feedforward layer applied to each pixel in isolation, with the same weights shared over all pixels.
</aside>

Then, the network can do a lot by just looking at local patches. Even in a $3 \times 3$ patch of pixels, we can make a reasonable prediction for what the center value of a pixel should be by just, for instance, averaging over the patch. If the noise level is low, this should already be a good denoising strategy. To allow the network to do this, we can use a simple $3 \times 3$ convolution.

--- image pointwise and 3x3 convolutions

These are all what we call _short-range_ patterns. Stuff we can learn for very local, very small neighborhoods of the image.

Beyond that, we want the network to learn some long range dependencies. For instance, if the top of the image starts to look like a forehead, then we probably want the bottom of the image to start looking like a chin. Or more simply, if the top of the image is relatively blue, then, more often than not, the bottom is relatively blue as well. These are called _long-range_ patterns. Stuff we can learn only if we look what's happening across the whole image.

<aside>Short- and long-range patterns are also called high- and low-frequency patterns respectively, based on ideas from signal analysis. We won't need to know these ideas to understand the UNet. 
</aside>

To learn the low-frequency patterns, we need to combine information from all parts of the images. Here we run into the problem described above: we cannot just connect every pixel to every other pixel. The solution is to _downsample_. We chain together convolutions and after a few of these, we reduce the resolution of the output. 

<aside>This is traditionally done with a max-pooling operation, but we can also use explicit downsampling, or even the convolution itself, with the right parameters.
</aside>

Then, after a few of these convolutions and downsampling operations, we have a very low-resolution representation of our image, where we can easily apply a fully connected layer to learn our low-frequency patterns. This is the idea behind the classical convolutional network.

However, what the classical convolutional network doesn't tell us, is how to get back to a high-resolution image. To do this, we need to _reverse the downsampling process_. We apply deconvolutions, combined with _up_sampling to get back to our original resolution. This gives us a network with a kind of hourglass shape.

-- image. Show input and output with very little noise to emphasize problem

This is a network that could, in principle do everything we want: capture short-range patterns in the convolutions and deconvolutions on the outside, and long-range patterns in the convolutions and deconvolutions on the inside. 

The problem is that if everything has to go through the whole hourglass, the short-range patterns become very hard to learn. They have to be encoded in the low-resolution representation of the image in the middle and the decode out of it. Even if we just want to reproduce the input, we'll need to learn a lot of complicated computations.

To avoid having to do this, we can add _[residual connections](../residual-connections)_. We take the high-resolution representation from the start of the network, and we simply add it onto the corresponding representation at the end of the network.

-- image

This way, the short-range information can pass almost directly from the input to the output and the network does not need to learn any complex encoding/decoding strategies for these. Only for the very longest range patterns does the information need to travel all the way through the center.   

This structure is called a UNet [Unet], and it's the basic network at the heart of most diffusion models. It was invented long before diffusion models and it's the key to solving many tasks with neural networks: image segmentation, denoising, object detection, and so on. Anytime you need to map one image to another image, a UNet is a good place to start.

<aside markdown="1">The name UNet comes from the way it's [normally drawn](https://en.wikipedia.org/wiki/U-Net#/media/File:Example_architecture_of_U-Net_for_producing_k_256-by-256_image_masks_for_a_256-by-256_RGB_image.png), with the residual connections as horizontal lines, and the downsampling and upsampling backbone forming a U-shape below.
</aside> 

So, that's the basic structure  the network $\bc{f}$. Next, we need a few extra features to make this work well for diffusion.

**Adding $t$ to the input.** First up, it turns out it's very useful for the network to know at what timestep $t$ it's performing the denoising. That is, whether it's denoising a fully noisy image, or one that is almost entirely denoised already. To help with this we simply add $t$ to the input. So instead of saying $\bc{f}(\z_t) \approx \z_{t-1}$, we say $\bc{f}(\z_t, t) \approx \z_{t-1}$.

How do we add this extra information to the UNet? We simply add an _extra channel_ to the input. So instead of feeding the UNet a $h \times w \times \rc{3}$ tensor, for an RGB image with <span class="rc">three color channels</span>, we feed it an $h \times w \times \gc{4}$ tensor, where the <span class="gc">extra channel</span> contains $t$ at every pixel, rescaled to the range $[0, 1]$.

**Adding coordinate information.** Next, we find that it's useful to add a little coordinate information to each pixel. Convolutional networks by themselves aren't very good at focusing on specific parts of the image. For instance, if you train a convolution classifier to detect which pixel is white in an otherwise black image, it won't do very well [CoordConv]. Likewise, if you'd like to train a generator to make a particular pixel white and the rest black, convolutions tend to have trouble with this.

The solution is to tell the network the coordinates of each pixel it's processing. We do this again by adding some extra channels: one for the vertical coordinate of each pixel, and one for the horizontal. Both, again. rescaled to the range $[0, 1]$. This brings our total input channels to $5$. 

Both the input $t$ and the coordinates are added to the input before each convolution and deconvolution.

<aside>In production systems, sinusoidal encoding vectors are often used in place of the pixel coordinates and $t$, similar to what happens in large language models. This has the benefit of expressing the coordinate of the pixel as a set of high and low frequency features (a bit like mapping a date to separate features for the year, month and day). For our purposes, the basic coordinate representation will suffice.
</aside>

-- image 

### The naive diffusion algorithm

Now that we have a structure for our neural network $\bc{f}(\z_\rc{t}, \rc{t})$, we can start to set up our algorithm in detail. The one ingredient that's missing is a loss function. We know the input to our network, $\z_\rc{t}$, and we know what output it should produce, $\z_\rc{t-1}$. All we need is a way to tell how far the actual output is from the target output. 

Since we're not diving into any of the math yet, we'll simply use the most intuitive approach: the (squared) distance between the two.

$$
l = \|\z_\rc{t} - \hat\z_\rc{t} \|^2 \;\;\text{ with }\;\; \hat\z_\rc{t} = \bc{f}(\z_\rc{t+1}, \rc{t+1})
$$

<p>Here, $\|\x\|$ is the length of the tensor $\x$ if we flatten it out into a vector (also known as the <em>Frobenius norm</em>).</p>

<aside markdown="1">Ok, so maybe the _absolutely_ most intuitive thing would be the actual distance between the two, not the squared one. But we know that minimizing the squared distance is the same as minimizing the distance, and that taking the squared distance usually works better, bot in practice and in mathematical analysis.
</aside>

With that, we get the following algorithm for one epoch of our diffusion process.

<div class="algorithm" markdown="1">
<h3>Naive diffusion, training</h3>
<section class="pseudocode" markdown="1"> 
#### pseudocode
```python
given: 
  k: "a number of pixels to apply noise to per step." 
  T: "a number of steps to apply noise for."

unet ← Unet(...)

for batch in data:
  b, c, h, w ← batch.size()

  for t in 0 ... T:
    prev_batch ← batch
    `randomly set k pixels to black or white in each instance in batch`

    # Predict the denoised image
    pred_batch ← unet(batch, t/T)
    loss ← (batch - pred_batch)²

    `backpropagate` loss 
    `update parameters of` unet `by one step of gradient descent`
```
</section>

<section class="pytorch" markdown="1">
#### pytorch
```python
unet = Unet(...)

for batch in data:
  b, c, h, w = batch.size()

  for t in range(T):
    old_batch = batch.clone()

    # Sample a random binary tensor, the same size as the batch
    noise = torch.rand(size=(b, 1, h, w)).round().expand(b, 3, h, w)

    # Sample `k` pixel indices to apply the noise to
    indices = torch.randint(low=0, high=32, size=(k, 2))
    # -- To keep things simple, we'll corrupt the same pixels for each 
    #    image in the batch. Whether they are made black or white still 
    #    differs per image.

    # Change the values of the sampled indices to those of the random tensor
    batch[:, :, indices[:, 0], indices[:, 1]] = \
                              noise[:, :, indices[:, 0], indices[:, 1]]

    # Train the model to denoise
    output = unet(batch, step=s/steps)
    loss = ((output - old_batch) ** 2.0).mean()

    loss.backward()
    opt.step()
    opt.zero_grad()
```
</section>
</div>

Then, when this model has trained, we can try to sample from it as follows.

<div class="algorithm" markdown="1">
<h3>Naive diffusion, sampling</h3>
<section class="pseudocode" markdown="1"> 
#### pseudocode
```python
z ← `tensor of random bits with size (b, c, h, w)`
# -- We are sampling a batch of `b` images  

for t in 0 ... T:
  z ← unet(z, (T-t-1)/T)
  # -- Note that we're moving backward over time, so the second argument
  #    starts at (T-1)/T and ends at 0
```
</section>

<section class="pytorch" markdown="1">
#### pytorch
```python

z = torch.rand(size=(b, 1, h, w)).round().expand(b, 3, h, w)
# -- We are sampling a batch of `b` images  

for t in range(T):
    z = unet(z, step=(T-t-1)/T)
```
</section>
</div>

Here are some results for the MNIST dataset.

-- Switch to FFH128?
-- specify hyperparams etc


### Denoising and renoising, a more flexible approach

We can see the beginnings of a successful generative model here. But the results are a little patchy. Working purely from intuition, what are some of the problems of the approach that we have built so far? We will try to tackle two problems.

The first, is that **we are forced to learn in sequence**. That is, the model always sees the fully denoised image, then a slightly noisier image and so on. This creates a slight dependence in the images we train on, which might hurt gradient descent. In practice, it would be better if every image the model saw had a randomly selected level of noise.

The problem is, with the current approach we cannot easily sample what an image looks like after $t$ steps of diffusion, without actually computing those $t$ steps of noising, and that's a bit costly. Ideally we'd like to pick an image from our data, and quickly figure out what $\z_\rc{t}$ and $\z_\rc{t-1}$ look like.

<aside>It shouldn't be too difficult to work out what the distribution on the number of noisy pixels at step $t$ is, and from that we can directly apply noise to that number of pixels. But, that would require a little math, and I promised no math in this part. 
</aside>

To give ourselves an easy solution, we will change our process a little. First, we will only add noise to one pixel at a time. What's more, we'll keep a record of which pixels we've noised already, and we'll sample without replacement. That is, we'll only ever turn a pixel to noise that we haven't turned to noise already.

This massively increases the number of noising steps required to remove all information from the image, but it also makes things a bit more predictable.

With this process, we know exactly how many steps to take before the whole picture is noise: simply the number of pixels we have. If our pictures are $32 \times 32$ pixels the last bit of information will have been removed at exactly $1024$ steps.

We also know exactly how to sample a picture at time step $t$. We simply pick $t$ pixels (without replacement) and set each of them to black or white with 50% probability.

The only downside is that with $T=1024$ we have a relatively long diffusion process. That means we need to take many steps to sample after training, and the problem is only going to get worse if we move to higher-resolution images. Luckily, as we will see, this won't pose as much of a problem as you might think.

The second problem with our previous approach is that what we're asking our neural network to do is not something it's really that good at. At every point of the denoising process, it has to identify which, say,  16 pixels we turned to noise in that step, and come up with something to put in their place. That means that at high noise levels, it needs to pick 16 pixels of noise remove, from an image that is entirely noise. Furthermore, it needs to keep the rest of the image exactly the same. 

This is of course, a completely arbitary choice, and for each image it sees the correct answer is completely unpredictable. In such case, a single neural net will simply end up averaging over all possible correct solutions. That is, it will denoise all pixels a little, instead of denoising a randomly chosen 16 of them entirely, and keeping the rest the same.

In the end, this works well enough, but it's not really reversing the noising process as we'd hoped.

<aside>One place where you can see this effect is in the final samples. Even though the diffusion process we train on is exactly the same length as the sampling process, we often have quite a lot of noise left over at $\rc{t}=0$ in the sampling process. This is because it's difficult for the model to know how much noise to remove at each step.   
</aside>

Luckily, there's a different approach that plays to the strengths of convolutions a lot more. First, we train the model to _fully denoise the image_. Whatever stage $t$ of the diffusion process we are at, we simply train the model to predict the original $\x_0$ that the diffusion started with. This is as easy as changing the loss to 

$$
L = \|\x_\rc{0} - \hat\x_\rc{0}\|^2 \;\;\text{ with }\;\; \hat\x_\rc{0} = \bc {f}(\z_\rc{t}) \p
$$

For low $\rc{t}$, the model should be able to do pretty well, and for high $t$ the best we can expect is a very blurry picture, a _mode collapse_. But that's fine, because we can adapt our sampling approach. 

Once our model $\bc{f}$ is fully trained, we proceed as follows. First, we sample $\z_\rc{T}$ from random Bernoulli noise as before. Then, for every $\rc{t}$, we first predict $\x_\rc{0}$ from $\z_\rc{t}$ using our trained model and then _we add noise back in for level $\rc{t-1}$._ That is, we denoise, and then <em>re</em>noise. We let the model predict, as well as it can, what $\x_\rc{0}$ looks like from $\z_\rc{t}$, and then we add noise to that for level $\rc{t-1}$ to gize us $\z_{t-1}$. The fundamental benefit is the same as before: at each step $\rc{t}$, the guesses that $\bc{f}$ makes about what is behind the noise only count towards the final product for a small amount. Most of it will get covered back up when we renoise the image. However, _unlike_in our first algorithm, $\bc{f}$ doesn't have to guess which pixels were noise added at step $\rc{t}$. If just removes all noise, and the renoising process takes care of choosing which noise it removes at this step.

Another benefit, and this is a big one, is that **we are free to take bigger steps during sampling than during training**. That is, during training, the model is as likely to see one noise level $t$ as any other noise level. However, during training, we can freely skip a few steps. So, instead if denoising from level $\rc{t}$ and renoising at level $\rc{t-1}$, we can instead denoise at level $\rc{t}$ and renoise at level $\rc{t-10}$, or at level $\rc{t-100}$. Perhaps the results won't be quite as nice, but the sample will be taken 10 or 100 times as fast. Since diffusion models are known for their slow sampling, this is a nice tradeoff to be able to make.

<aside>Note that with this, we have entirely removed the downside of only noising one pixel at a time. The whole noising process is extremely long, but we never have to go through it from start to finish. During training, we pick random times $\rc{t}$ for every batch, and during sampling we can increase sampling speed by taking large steps.
</aside>

To combine everything into one algorithm, we set $T$ to the numer of pixels in our image and we set the number of sampling steps $S$ as a separate hyperparameter. With that, here's what the new training algorithm looks like in pseudocode.

<div class="algorithm" markdown="1">
<h3>Naive diffusion, training (alternative)</h3>
<section class="pseudocode" markdown="1"> 
#### pseudocode
```python
unet ← Unet(...)

for batch in data:
  b, c, h, w ← batch.size()
  T ← h × w

  t ← U(1, T) # Sample from a uniform distribution
  noisy_batch = add_noise(batch, t)
  #-- Choose t pixels without replacement, and set 
  #   each to black or white at random

  # Predict the fully denoised image
  pred_batch ← unet(noisy_batch, t/T)
  loss ← (batch - pred_batch)²

  `backpropagate` loss
  `update parameters of` unet `by one step of gradient descent`
```
</section>

<section class="pytorch" markdown="1">
#### pytorch
```python
...
```
</section>
</div>

And here's the new sampling algorithm.

<div class="algorithm" markdown="1">
<h3>Naive diffusion, sampling (alternative)</h3>
<section class="pseudocode" markdown="1"> 
#### pseudocode
```python
given: a number of sampling steps S

z ← `tensor of random bits with size (b, c, h, w)`
# -- We are sampling a batch of `b` images  
T ← h × w
k ← T/S # number of noisy pixels to remove each step  

t = T
while t > 0:
  x0 ← unet(z, t/T)        # prediction for the fully denoised image
  t ← t - k
  z ← add_noise(x0, t)     # "renoised" image with k fewer noisy pixels

```
</section>

<section class="pytorch" markdown="1">
#### pytorch
```python

z = torch.rand(size=(b, 1, h, w)).round().expand(b, 3, h, w)
# -- We are sampling a batch of `b` images

T = h * w
k = T/S # number of noisy pixels to remove each step    

for s in range(S):

      t   = (S-s)/steps  # where we are in the denoising process from 0 to 1
      tm1 = (S-s-1)/steps  # next noise level, t - 1
      
      x = unet(z, t) 
      # -- Fully denoise the image
      z = add_noise(z, tm1)
      # -- Renoise tm1 randomly chosen pixels
```
</section>
</div>

At the end of the sampling process, we can return the most recent predicted $\x_0$ as our sample.

Here are some samples from a model trained in this way. Note that before, our sampling process didn't always terminate at a fully denoised image. Now, we fully denoise the image at every step, so we are guaranteed to end up with an image without noise. What's more, since we add the noise back in ourselves for the renoised images, the amount of noise in these always perfectly fits the schedule we've set in training.

-- add hyperparams

### Let's review

As you can see, without any hard mathematics, we have built a pretty solid generative model for human faces. One consequence of  this sort of approach is that we are left with a lot of _freedom of choice_. We are free to choose a different type of noise, for instance, to add to our images. We can choose a different loss function to compare the prediction to the output. All of these things we can play around with and investigate 

<aside>Whether this kind of freedom is a good thing is in the eye of the beholder. It gives us a lot of options, but it also creates a huge search space that we have to explore in search of good models. One thing mathematical analysis can do for us, is to constrain the search space a little.
</aside>

In a recent paper [ColdDiffusion], the authors show that indeed, there is a great number of ways you can apply noise to your images, and all of them yield successful diffusion methods.  

-- Image from ColdDiffusion. Add caption. 

Note that the key principle at work is not the _noise_ but the _degradation_. We need to remove the information from $\x_0$ bit by bit, until at the end all informationabout the original image is gone. The only requirement is that the degraded image is not the same image for all possible $\x_0$. Why not? Well, consider that given a fully degraded image $\z_T$ the whole reconstruction process if fully deterministic. Let's say, for instance, that we degrade the image by fading it to black step by step. This will certainly remove all the information about the original image, eventually. But the resulting image will alwasy be fully black. What happens when we feed a fully black image to our sampler? The neural network $\bc{f}$ is entirely determinstic, so it will just produce the same image $\z_{T-1}$ every time for the first step of sampling. The next step is deterministic again so $\z_{T-2}$ will also always be the same, all the way to $\x_0$.

<aside>The same thing happens when we use the denoising/renoising algorithm. After full denoising, we renoise again, but in this case we're not actually adding noise: we're just fading the image back to black again.
</aside>

The solution in the paper above is to use degradation operators that degrade to a number of different, fully degraded images. For instance, fading to a random color. That way, all the information is clearly removed, but there is still a range of different values that $\z_T$ could take, which means we get an equal range of possible $\x_0$'s to sample.

These cold diffusion examples illustrate quite neatly how diffussion solves the two main problems of generative modeling. First, the issue of mode collapse. In the denoising/renoising algorithm, we saw that when we try to denoise a very noise image in one go this is exactly what happens: we get a very blurry picture that looks a lot like the average of all the possible ways the image could be denoise, but that isn't actually a realistic picture from our data distribution.

The way diffusion solves this problem is by only denoising a little bit at a time. When we denoise only, say one pixel, what happens depends on where we are in the diffusion process. If the entire image is noise, the best we can do is mode collapse to the average value for that pixel. However, we've only mode-collapsed for the value of one pixel, and what's more, successive steps in the algorithm can still tweak that value later on. As we denoise more and more of the image, we get more and more context for every next pixel we will try to denoise. With more context, there are fewer realistic values that our target pixel could take, and mode collapse becomes less of an issue.  This is one way of think about how our diffusion model avoids mode collapse. 

If you are aware of [autoregressive sampling](autoregressive-sampling)---which langauge models like GPT use to generate text one character at a time---diffusion works on a similar principle. They can't generate the whole instance in one go without mode collapsing, so instead, they make one small choice at a time. Then for the rest of the sampling process that choice is (more or less) locked in, and used as context for the remaining choices.  

<aside>At least, this is how it works in our naive binomial diffusion model, where a pixel value has very cleearly been corrupted or not corrupted. In later parts of this series, we will see more smooth types of noise, where a pixel can be corrupted _to an extent_. This means that in adding the noise, we are essentially blurring its values. This trains the model to both remove noise and de-blur the image, helping even more with the mode collapse we can expect in the early sampling stages.</aside>

The second problem we identified was that a generative model needs access to a source of randomness. And if it is going to generate highly varied images, it will need lots of randomness. What we saw in the Cold Diffusion example was that the amount of variation in the degraded image directly determined the amount of variety in our samples: if we fade to black, we get one possible sample. If we fade to one of $N$ random colors, we get $N$ possible samples.

This shows us where the variety on our samples comes from. The noise doesn't just serve to degrade the image, it also gives the model randomness to aid in its sampling. With $1024$ pixels, using binomial noise, there are $2^{1024}$ possible $\z_T$ to sample, each of which can be decoded to a different $\x_0$.   
