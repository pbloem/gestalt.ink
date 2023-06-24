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

As a consequence, an autoencoder that is somewhat succesfull has learned to map the high dimensional data, to a low dimensional representation. That is the encoder performs a _dimensionality reduction_. After training, we can discard the decoder, and use the encoder to map any $\x$, whether from the data or from the same source as our data, to a low-dimensional representation $\x'$.

<div clas="aside" markdown="1">
  If you know about [PCA](pca), 
</div>





