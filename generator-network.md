---
title: Generator networks
---

# Summary

Preliminaries: 
* [Neural networks](neural-networks)

A **generator network** is a name for a neural network that has been turned into a probability distribution by feeding it random data.

Generator networks are easy to define, but training them is harder than training a normal neural network. For this, special algorithms, such as GANs, VAEs or diffusion are necessary. In this article, we will just set up the definition of a generator network, and why they are difficult to train. The training algorithms will each be discussed in their own articles.

# Generator networks

Generator networks are the first step toward generative modelling. That is, creating neural network models that generate rich data like realistic images of human faces.

Before we worry about _training_ neural networks to generate the right images, ask yourself how we train a neural network to generate random images _at all_? A neural network represents a _deterministic_ function. Once we've picked our parameters it maps some input $\x$ to some output $\y$, but it never makes any random choices. To take the powe of neural networks and to use it for any kind of generation, we need to add in some randomness

There are two places to add randomness to a network: at the output and at the input. The VAE does both.

## Adding randomness at the output (what we normally do)

To add randomness to the output of a neural net, we can take the output $\y$ and interpret it as the parameter of a probability distribution. This is nothing new: for instance, when we are doing binary classification, we can do this with one output node, apply a sigmoid activation, and interpret the resulting output as the probability that the positive class is true, according to the network. In technical terms, we ar taking the output as the parameter for a Bernoulli distribution.

<!-- To spell this out formally, we can write the computation of the neural network as $f_\theta(\x) = y$, resulting in a single value $y$ between 0 and 1. We then take this as the parameter of a Bernoulli distribution, and look at the terget value $t$ (which is either positive or negative). We then get a predicted probability -->

When we are doing multiclass classification, we usually have one output node per class, with a [softmax]() activation over the ouptut layer. The $i$-th output node, after the activation represents the probability that the $i$-th class is true for the current input. In technical terms, we are taking the output nodes as the parameters of a Categorical distribution on the classes.

We can do the same with continuous distributions. For instance, if we have 10 numeric output values, we can give the network 20 outputs so that it can produce a mean and variance for each, giving us a normal distribution over every output value. 

<aside>You can also think of this as a multivariate normal distribution in 10 dimensions, with a diagonal covariance matrix.</aside>

In all cases the objective is the same. For each input $\x$, the network gives us a _probability distribution_ on the space of target values. For a given training pair $(\x, \t)$ and network parameters $\theta$, we can write this as
\[
p_\theta(\t \mid \x) \p
\]

The higher this value is for the true target value $\t$ the better the network does. This gives us a clear training objective. Maximize this value over all pairs in the data. Since logarithms of probabilities are easier to work with, we usually stick a log in front of the probability, maximizing the log-probability instead of the probability. Finally, since we like to minimize things, we stick a minus in front of that. This gives us the following training objective

\[
\argmin_\theta \prod_{\x, \t \in \text{Data}} p_\theta(\t \mid \x) \p
\]

Here, $p_\theta$ encapsulates both our choice of network architecture and the probability function it parametrizes. This is always the aim of supervised learning. 

## Adding randomness at the input (the key to generator networks)

We have two problems with the random neural networks we have defined so far:

1. They are only well defined for problems with example input/output pairs (like a classification task). With the type of problem we have here, we only have examples of the sort of thing we want the network to output. There are no corresponding inputs.
2. The output distributions we have so far are too simple. For instance, a normal distribution can put the most likely output at one point in space, the mean. This is the most likely image, and all other likely points are just the points near that image. This is not how we want a generative model to behave: we want it to be able to sample multiple different possible images.

This property of the normal distribution is called _unimodality_. That is, it's got one mode, one point that has the highest probability.

We can make the output distribution multi-modal, for instance with a Gaussian mixture model, but this will give us a handful of modes at best. A complex distribution like the one on pictures of human faces doesn't have just a couple of modes. Every possible face functions as a mode, and as we saw in the autoencoder example, we can travel from one face to another along a path where every point is a realistic face.

-- image

In short, this probability ditribution doesn't look like a smooth landscape with a handfull of distinct peaks, it's more like a rough mountainous landscape with long ridges of high probability. 

To model this kind of landscape, we need the powe of the neural network to help us describe the exact shape of the probability distribution. A simple way of achieving this is to start with a simple, unimodal distribution, like the standard multivariate normal distribution $N({\mathbf 0}, {\mathbf I})$, and _let the network transform it_.

Since we're only interested in sampling from our distribution, the process is very simple. We sample a vector $\z$ from $N({\mathbf 0}, {\mathbf I})$ and we feed it to a neural network $f$, observing the output: $\y = f(\z)$. This is a random process, so we can think of it as _sampling_ from some probability distribution $p$. 

<aside>We don't know much about this distribution: we can't easily work out its mean or its variance, how much probability assigns to some region of space. All we can do is sample from it. That is the price we pay for using the power of neural networks.
</aside>

As an experiment, let's see what such a distribution might look like. We'll wire up a simple neural network, consisting of a 2D input layer, twelve ReLU-activated linear layers with a 100 units each, and a final 2D output layer. We feed this network a sample from a 2D standard normal distrbution, and observe the output. If we do this a few hundred thousand times, and scatterplot the result, we get a pretty good picture of the shape of the distribution we're sampling from.

-- image

<aside>Note that this network wasn't trained. This is simply the distribution we get at intialization. The only thing we want to show here is how unlike a normal distribution this distribution is. It doesn't have a single mode, or even a handful of modes: it has a very complex ridge-like shape.
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
