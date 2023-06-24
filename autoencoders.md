title: Autoencoders
---

# Summary 

Preliminaries:
**Neural networks**

**Autoencoders** are neural networks arranged in an hourglass shape. They look like this:

-- img

The key properties of an autoencoder are:
* The shape of the input is the same as the shape of the output. If you've only seen [basic neural networks](/neural-networks) so far, you can think of this as a vector of $n$ numbers. _If you've seen convolutions and tensor, you can also think of this as a tensor representing, for instance, an image. Then the input and output are tensors of the same shape._
* Somewhere between the input and the output, there is a hidden layer if size $m$, where $m$ is substantially smaller than $n$. This point in the network is called the _bottleneck_.
* The layers between the input and the bottleneck are called the _encoder_ and the layersd between the bottleneck and the output are called the decoder.
* The network is trained on unlabeled data. The loss function simply trains the network to reconstruct the input as closely as possible 



