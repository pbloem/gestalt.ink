--- 
title: Autoencoders

---

# Summary 

Preliminaries:
**Neural networks**

**Autoencoders** are neural networks arranged in an hourglass shape. They are used for dimensionality reduction, representation learning and generative modeling.

# Autoencoders

A basic autoencoder looks like this:

-- img

The key properties of an autoencoder are:
* The shape of the input is the same as the shape of the output. If you've only seen [basic neural networks](/neural-networks) so far, you can think of this as a vector of $n$ numbers. _If you've seen convolutions and tensor, you can also think of this as a tensor representing, for instance, an image. Then the input and output are tensors of the same shape. We'll assume that they are vectors for now._
* Somewhere between the input and the output, there is a hidden layer if size $m$, where $m$ is substantially smaller than $n$. This point in the network is called the _bottleneck_.
* The layers between the input and the bottleneck are called the _<span class="rc">encoder</span>_ and the layers between the bottleneck and the output are called the _<span class="gc">decoder</span>_.
* The network is trained on unlabeled data. The loss function simply trains the network to reconstruct the input, as closely as possible. _This can be done with various loss functions, but the simplest option is to take the sum of squared errors between the input $\x$ and the output $\y$: $\text{loss} = \|\y - \x\|$.

In short, an autoencoder attempts to learn the _identity function_, $f(\x) = \x$. Normally neural networks have no trouble with this. The reason that it is challenging in this case, is that the information needs to pass through the bottleneck. The <span class="rc">encoder</span> part of the network maps the $n$-dimensional input to this $m$-dimensional representation, and the <span class="gc">decoder</span> maps it back. 

As a consequence, an autoencoder that is somewhat succesful has learned to map the high dimensional data, to a low dimensional representation. That is the encoder performs a _dimensionality reduction_. After training, we can discard the decoder, and use the encoder to map any $\x$, whether from the data or from the same source as our data, to a low-dimensional representation $\z$. 

We call $\z$ the _latent representation_ of $\x$. That is, the encoder computes a function $\x \to z$ and the decoder computes (approximately) $\x \to \z$.

<div clas="aside" markdown="1">
  If you know about [PCA](pca), you may have noted that autoencoders and PCA behave quite similarly. In fact, if we use only a singlew linear layer in the encoder and decoder and no activations, and train the autoencoder with least squares loss, the result is almost, but not quite the same as PCA. We'll spell out the difference below.
</div>

== Autoencoders for dimensionality reduction ==

What is the point of dimensionality reduction? For PCA, the aim is often to reduce the number of features in our data, so we can fit a model to is that is too expensive to fit on the original high dimensional data. But that is only part of the picture. To illustrate the true benefits of this kind of dimentionality reduction, we can show a simple example.

Imagine that we have a dataset of small $64 \times 64$ pixel, color images of people's faces. Each pixel in each image is represented by three numbers (the amount of red, green and blue respectively), so the whole image can be represented by a vector of $64 \times 64 \times 3 =12\,288$ values.

We build the following network, and train it for a few epochs (i.e. we do a few passes over the data).

-- network

Since we've given the bottleneck only two dimensions, we can actually plot the results to 2d axes. We compute the latent $(z_1, z2)$ representation of all the images in our validation data, and then plot each original image at the latent coordinates $z_1$ and $z_2$. Here is the result:

-- See if I can get this to work. Maybe switch to simpler data.

What we see is that the hidden representation captures a lot of high-level features. We see some clustering of men and women, children and older people, smiling and non-smiling people and so on. 

This is the real power of a method like autoencoders: they map your high-dimensional data to a low-dimensional representation where high-level semantic features like the age or expression of the subject becomes clearly expressed as a single direction or region in the latent space.

<div class="aside"> We've chosen an extremely small latent space here to be able to visualize what is happening. Normally, we don't need to visalize the latent space, and we can set $m$ much larger, making the network easier to train.
</div>

This is sometimes called _representation learning_. The main aim is not so much to learn a lower-dimensional representation of our data, but to learn a representationsa in which the propertiers we are interested in come to the surface. A mapping to a lower dimensional space is one way to achieve this, but not the only one (see, for instance, the _denoising_ autoencoders below).


### The smile vector

To show the power of representation learning, we'll try a litte experiment. We try to use the latent space of ouer autoencoder above to make a frowning person smile. Note first that our data is unlabeled. The autoencoder needs a lot of data, but it's not annotated with features, like which people are smiling and frowning. What we see in the plot, however, is that the model seems to learn what smiling is without explicit annotation. Some region in the latent space is dedicated to smiling people, and another to frowning people.

-- image

The key idea of the "smile vector" is that if we take a picture of a frowning person, map it to the latent space, and nudge it away from the cloud of frowning people and towards the cloud of smiling people, but keep all the other dimensions the same, we get a poitn in the latent space that represents the same person, but smiling instead of frowning.

All we need to achieve this, is to find the broad regions in latent space where the model puts smiling people and where it puts frowning people. We need a little bit of annotated data here, but not much: about twenty examples of smiling people and twenty examples of frowning people.

We map each subset to their latent representations and compute the averages: $\z_\text{smiles}$ is the average of the latent representations of the smiling people and $\z_\text{frowns}$ is the average for the frowning people. The _smile vector_ $\z_s$ is the arrow from the frowning to the smiling group. That is, $\z_s = \z_\text{frowns} - \z_\text{smiles}$. 

We can treat $\z_s$ as a a _direction_ in latent space. If we take any picture of a frowning person $\x$, map it to its latent representation $\z$ and add a little bit of the smile vector to it, we should a latent representation of the same person, but smiling a bit more

-- image algorithm

### Interpolation

What the smile vector example shows us, is that the the latent representations of the data aren't the only points in the latent space that decode to realistic looking faces. The points in between also show us quite realistic images of people. So far, variations of the people in our data, but we can push this a little farther by using _interpolation_. We simply pick two random people in the data and draw a line between them _in the latent space_. If we then pick a series 



== Autoencoders for generative modelling ==


== Stacked and denoising autoencoders ==






== Autoencoders and PCA ==




