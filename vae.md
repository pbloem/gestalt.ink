---
title:Variational Autoencoder
---

# Summary

Preliminaries:
* [Neural networks](/neural-networks)
* [Generator networks](/generator-network)
* [Autoencoders](/autoencoders)

**Autoencoders** are hourglass-shaped neural networks that can be user for many things, including _generative modelling_.

The variational autoencoder is a special type of autoencoder that is specifically derived for this purpose. It defines a probability distribution for your training data, and then directly optimizes its parameters to maximize the likelihood of your data under the chosen model. I.e. it attempts to find a maximum likelihood fit.

In principle, there is nothing a variational autoencoder can do that a regular autoencoder can't, but the formal derivation from a well-defined objective has some benefits. It reduces the amount of possible architectural tricks we can try, reducing the search space, and it provides us with some very meaningful additions to the loss function and training process that we wouldn't have come up with by just tuning an autoencoder from scrath.

In short, the following derivation is a little involved, but it's worth it in the end.

## Step 1: The generator network

To begin with, forget about autoencoders for a second. We are not setting out to build an autoencoder, we are setting out to build a _probability model_. 

To make things concrete, we will assume that we are training a VAE to generate images of 64 by 64 images, with three color channels per pixel. There can be represented in a $64 \times 64 \times 3$ tensor, or flattened into a single vectors with $12\,288$ elements. 

The model that will generate these images for us is a [generator network](/generator-networks) with an output distribution. That is, we have three components:
* The input to the neural network $\z \in \R^m$ is a vector sampled from a standard normal distribution $N({\mathbb 0}, {\mathbb I})$

## Step 2: The "encoder"

## Step 3: The evidence lower bound (ELBO)

## Step 4: Making everything end-to-end-differentiable

### The reparametrization trick

## Better output distributions

## 
