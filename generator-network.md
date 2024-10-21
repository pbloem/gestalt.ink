---
title: Generator networks
---

# Summary

Preliminaries: 
* [Neural networks](neural-networks)

A **generator network** is a name for a neural network that has been turned into a probability distribution by feeding it random data.

Generator networks are easy to define, but training them is harder than training a normal neural network. For this, special algorithms, such as GANs, VAEs diffusion, or autoregressive training are necessary. In this article, we will just set up the definition of a generator network, and why they are difficult to train. The training algorithms will each be discussed in their own articles.

# Generator networks

Generator networks are the first step toward generative modelling. That is, creating neural network models that generate rich data like realistic images of human faces.

Before we worry about _training_ neural networks to generate the right images, ask yourself how we train a neural network to generate random images _at all_? A neural network represents a _deterministic_ function. Once we've picked our parameters, it maps some input $\x$ to some output $\y$, but it never makes any random choices. The same $\x$ will always lead to the same $\y$.

To take the power of neural networks and to use it for any kind of generation, we need to add in some _randomness_.

There are two places to add randomness to a network: at the output and at the input. The VAE does both.

## Adding randomness at the output (what we normally do)

To add randomness to the output of a neural net, we can take the output $\y$ and interpret it as the parameter(s) of a probability distribution. This is nothing new: for instance, when we are doing binary classification, we give our netowrk one scalar output, apply a sigmoid activation, and interpret the resulting value as the probability that the positive class is true, according to the network. In technical terms, we are taking the output as the parameter for a Bernoulli distribution.

-- picture

<!-- To spell this out formally, we can write the computation of the neural network as $f_\theta(\x) = y$, resulting in a single value $y$ between 0 and 1. We then take this as the parameter of a Bernoulli distribution, and look at the terget value $t$ (which is either positive or negative). We then get a predicted probability -->

When we are doing multiclass classification, we usually have one output node per class, with a [softmax](/softmax) activation over the ouptut layer. The $i$-th output node, after the activation, represents the probability that the $i$-th class is true for the current input. In technical terms, we are taking the output nodes as the parameters of a categorical distribution on the classes.

-- picture

We can do the same with continuous distributions. For instance, if we have 10 numeric output values, we can give the network 20 outputs so that it can produce a mean and variance for each, giving us a normal distribution over every output value. 

-- picture

<aside>You can also think of this as a multivariate normal distribution in 10 dimensions, with a diagonal covariance matrix.</aside>

In all cases the objective is the same. For each input $\x$, the network gives us a _probability distribution_ on the space of target values. For a given training pair $(\x, \t)$ and network parameters $\theta$, we can write this as
\[
p_\theta(\t \mid \x) \p
\]

The higher this value is for the true target value $\t$ the better the network does. This gives us a clear training objective. Maximize this valueover all pairs in the data. Since logarithms of probabilities are easier to work with, we usually stick a log in front of the probability, maximizing the log-probability instead of the probability. Finally, since we like to minimize things, we stick a minus in front of that. This gives us the following training objective

\[
\argmin_\theta - \sum_{\x, \t \in \text{Data}} \log p_\theta(\t \mid \x) \p
\]

Here, $p_\theta$ encapsulates both our choice of network architecture and the probability function it parametrizes. This is always the aim of supervised learning. 

## Adding randomness at the input (the key to generator networks)

We have two problems with the random neural networks we have defined so far:

1. They are only well-defined for problems with example input/output pairs (like a classification task). With the type of problem we have here, we only have examples of the sort of thing we want the network to output. There are no corresponding inputs.
2. The output distributions we have so far are too simple. Imagine, for instance that we want a distribution on the space of all images, that has high probability for images of human faces. A normal distribution can put the most likely output at one point in space, the mean. This is the most likely image, and all other likely points are just the points near that image. This is not how we want a generative model to behave: we want it to be able to sample multiple different possible images.

This property of the normal distribution is called _unimodality_. That is, it has one mode, one point that has the highest probability.

We can make the output distribution multi-modal, for instance with a Gaussian mixture model, but this will give us a handful of modes at best.

<aside>Note that multi-modal here refers to having multiple modes, not multiple modalities, like text and images, which is amn entirely different kind of multi-modality.
</aside>

A complex distribution like the one on pictures of human faces doesn't have just a couple of modes. Every possible face functions as a mode, and we can usually travel from one face to another through a path of images that are all themselves realistic faces.

-- image

In short, this probability distribution doesn't look like a smooth landscape with a handful of distinct peaks, it's more like a rough mountainous landscape with long ridges of high probability. 

To model this kind of landscape, we need the power of the neural network to help us describe the exact shape of the probability distribution. We don't get that with a simple output distribution, because the network doesn't determine the shape: if we pick a normal distribution as an output, we will always get a bell shape with a single peak on our outputs. The complexity of the neural network helps us to analyse the input in many complicated ways, but the output will always be unimodal, and bell-shaped.

A simple way of achieving a more complex distribution is to start with a simple, unimodal distribution, like the standard multivariate normal distribution $N({\mathbf 0}, {\mathbf I})$, and _let the network transform it_.

Since we're only interested in sampling from our distribution, the process is very simple. We sample a vector $\z$ from $N({\mathbf 0}, {\mathbf I})$ and we feed it to a neural network $f$, observing the output: $\y = f(\z)$. This is a random process, so we can think of it as _sampling_ from some probability distribution $p$. The parameters of $p$ are the parameters of the neural network.

<aside>We don't know much about this distribution: we can't easily work out its mean or its variance, how much probability assigns to some region of space. All we can do is sample from it. That is the price we pay for using the power of neural networks.
</aside>

As an experiment, let's see what such a distribution might look like. We'll wire up a simple neural network, consisting of a 2D input layer, twelve ReLU-activated linear layers with a 100 units each, and a final 2D output layer. We feed this network a sample from a 2D standard normal distrbution, and observe the output. If we do this a few hundred thousand times, and scatterplot the result, we get a pretty good picture of the shape of the distribution we're sampling from.

-- image

<aside>Note that this network <em>wasn't trained</em>. This is simply the distribution we get at intialization. The only thing we want to show here is how unlike a normal distribution this distribution is. It doesn't have a single mode, or even a handful of modes: it has a very complex ridge-like shape. Just the sort of thing we're looking for.
</aside>

This type of network, one which is fed with random noise, is what we call **a generator network**. 

## Doing both

In some cases, like in a [VAE](/vae), we are required to also put a probability distribution on the output of the network, for instance with a normal distribution. In that case, the whole sampling process looks like this:
* Sample $\z$ from $N({\mathbf 0}, {\mathbf I})$.
* Let the neural network, with parameters $\rc{\theta}$ compute $\oc{\mathbf \mu}, \bc{\mathbf \sigma} \leftarrow f_\rc{\theta}(\z)$.
* Sample the output $\x$ from $N(\oc{\mathbf \mu}, \bc{\mathbf \sigma})$.

The result is a complex multi-modal distribution $p(\x)$ on the high-dimensional space of $\x$. If we take $\z$ as given, we can say that the network computes the simple, unimodal distribution 
\[
p(\x \mid \z) = N(\x \mid \oc{\mathbf \mu}, \bc{\mathbf \sigma}) \;\;\;\text{with } \oc{\mathbf \mu}, \bc{\mathbf \sigma} = f_\rc{\theta}(\z)
\]

# The trouble with generators: mode collapse

The simplest generator network is pretty easy to define. Just sample some random noise, and stick it into a neural network. The difficulty is not in building the network, but in training it. 

Here is the task: given a set of $\x$'s, say pictures of human faces, how do we adjust the parameters $\rc{\theta}$ of our neural network in such a way that the generator starts spitting out images that are like our data? That is, new human faces that look realiostic to us, but that aren't in the dataset.

To illustrate the problem, let's try a naive approach and see what happens. We'll follow this algorithm.

$$\begin{align*}
&\textbf{loop:} \\
&\tab \text{pick a random $\x$ from the data.} \\
&\tab \text{sample } \z ~ $N({\mathbf 0}, {\mathbf I})$ \\
&\tab \text{train } \y = f_\rc{\theta}(x) \text{ to be like } \x \\
\end{align*}$$

In short, we sample a random point from the model, and train the model to move it closer to a randomly sampled point in the dataset

The last step can be achieved with a basic loss function like the sum of squared errors, and gradient descent/brackpropagation.

To see where this goes wrong, imagine that the target distribution has ten modes which are arranged in a ring. We sample a random point from the model, which can be anywhere in space. Imagine that we happen to get lucky and to land quite close to one of the modes. In that case, the model has actually done well. However, the algorithm compares it to a randomly chosen point on the ring: it's very unlikely to be the one it's already close to.

-- image (faces instead of dots)

The result is that even is the model is starting to get close to the modes, it will always be pulled to the center of the ring. This is the mean of the data but not a mode: it does not represent a realistic sample from the data.

<aside>
  If you do this with a dataset of faces, the result is a fuzzy picture of the average of all faces. 
</aside>

We call this _mode collapse_. Instead of sampling different faces every time, from the areas of high probability, the model returns the mean every time which comes from an area of low probability.

There are a few algorithms to solve mode collapse. For generator networks, the most popular ones are:
* [Variational autoencoders (VAEs)](/vae): This is a very principled approach, derived from a maximum likelihood objective. they solve the above problem by learning an inverted version of the generator network that finds a corresponding $\z$ for a given $\x$. In a sense, this tells the above algorithm which $\x$ it should be comparing its sample to (instead of picking a random one).
* [Invertible flows](/flows): VAEs optimize maximum likelihood for any generator network you can think of. The price we pay is that we optimize the likelihood indirectly, using a lower bound rather than the actual likelihood. If we constrain the generator network to be _invertible_, we can directly optimize the likelihood without using a lower bound.
* [Generative adversarial networks](/gan) GANs work by training a classifier network, called a _discriminator_ that learns to tell the images generated by the generator network apart from thos in the dataset. At first this is easy, because the generator only produces noise. However, once the discriminator is successfull, we can then train the generator to generate images that the discriminator thinks are real. By iterating the two steps, we converge to a powerful generator, and we get a robust discriminator to boot.

Outside of simple generator networks, there are also methods that require us to brak up the sampling process into multiple passes through the network that is used to generate. Two examples are:  
* [Diffusion models](/diffusion): These work by reducing the task of sampling to noise _removal_. Removing a small amount of noise from an image is not a task that requires a strong multimodal distribution. However, once we have a model that can do this, we can start with an entirely noisy image and apply a small denoising step over and over again, slowly building up to a fully &ldquo;denoised&rdquo; image (even though we started with noting but noise). Diffusion models have theoretical links to many other approaches, including VAEs and score based approaches.
* [Autoregressive training](/autoregressive) Autoregressive  don't work by generating the whole high-dimensional object at once, but by generating a bit of it conditioned on what has been generated before. Most successfully, generating natural language one word or character at a time, conditioned on what it has generated before. This is a bit like a diffusion model, except that the output object is broken up according to its native structure: for example , in the case of images, we would generate one pixel at a time, from left to right and top to bottom. It'sa bit too expensive to do in that case, but for language, it works _very_ well.

# More resources

* MLVU Lecture: [Deep generative modeling](https://mlvu.github.io/generative/#video-000)
