---
title:Variational Autoencoder
---

# Summary

Preliminaries:
* [Neural networks](/neural-networks)
* [Autoencoders](/autoencoders)

**Autoencoders** are hourglass-shaped neural networks that can be user for many things, including _generative modelling_.

The variational autoencoder is a special type of autoencoder that is specifically derived for this purpose. It defines a probability distribution for your training data, and then directly optimizes its parameters to maximize the likelihood of your data under the chosen model. I.e. it attempts to find a maximum likelihood fit.

In principle, there is nothing a variational autoencoder can do that a regular autoencoder can't, but the formal derivation from a well-defined objective has some benefits. It reduces the amount of possible architectural tricks we can try, reducing the search space, and it provides us with some very meaningful additions to the loss function and training process that we wouldn't have come up with by just tuning an autoencoder from scrath.

In short, the following derivation is a little involved, but it's worth it in the end.

## Step 1: The generator network

To begin with, forget about autoencoders for a second. We are not setting out to build an autoencoder, we are setting out to build a _probability model_. 

To make things concrete, we will assume that we are training a VAE to generate images of 64 by 64 images, with three color channels per pixel. There can be represented in a $64 \times 64 \times 3$ tensor, or flattened into a single vectors with $12\,288$ elements. 

Before we worry about training neural networks to generate the right images, ask yourself how we train a neural network to generate random images _at all_? A neural network represents a _deterministic_ function. Once we've picked our parameters it maps some input $\x$ to some output $\y$, but it never makes any random choices. 

There are two places to add randomness to a network: at the output and at the input. The VAE does both.

### Adding randomness at the output

To add randomness to the output of a neural net, we can take the output $\y$ and interpret it as the parameter of a probability distribution. This is nothing new: for instance, when we are doing binary classification, we can do this with one output node, apply a sigmoid activation, and interpret the resulting output as the probability that the positive class is true, according to the network. In technical terms, we ar taking the output as the parameter for a Bernoulli distribution.

<!-- To spell this out formally, we can write the computation of the neural network as $f_\theta(\x) = y$, resulting in a single value $y$ between 0 and 1. We then take this as the parameter of a Bernoulli distribution, and look at the terget value $t$ (which is either positive or negative). We then get a predicted probability -->

When we are doing multiclass classification, we usually have one output node per class, with a [softmax]() activation over the ouptut layer. The $i$-th output node, after the activation represents the probability that the $i$-th class is true for the current input. In technical terms, we are taking the output nodes as the parameters of a Categorical distribution on the classes.

We can do the same with continuous distributions. For instance, if we have 10 numeric output values, we can give the network 20 outputs so that it can produce a mean and variance for each, giving us a normal distribution over every output value.

In all cases the objective is the same. For each input $\x$, the network gives us a _probability distribution_ on the space of target values. For a given training pair $(\x, \t)$ and network parameters $\theta$, we can write this as
\[
p_\theta(\t \mid \x) \p
\]

The higher this value is for the true target value $\t$ the better the network does. This gives us a clear training objective. Maximize this value over all pairs in the data. Since logarithms of probabilities are easier to work with, we usually stick a log in front of the probability, maximizing the log-probability instead of the probability. Finally, since we like to minimize things, we stick a minus in front of that. This gives us the following training objective

\[
\argmin_\theta \prod_{\x, \t \in \text{Data}} p_\theta(\t \mid \x)
\]


### Adding randomness at the input

## Step 2: The "encoder"

## Step 3: The evidence lower bound (ELBO)

## Step 4: Making everything end-to-end-differentiable

### The reparametrization trick

## Better output distributions

## 
