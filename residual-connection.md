---
title: Residual connection
summary: "A residual connection is a feature in modern neural networks. Whenever you have a block of complicated processing going on in a neural network for which the input has the same shape as the output, you can add a residual connection around the block. To do this, you just add the input to the output."
---

# Residual connection

A **residual connection** is a feature in modern neural networks. Whenever you have a block of complicated processing going on in a neural network for which the input has the same shape as the output, you can add a residual connection around the block. To do this, you just add the input to the output.

<figure class="centering">
<img src="/images/residual.svg" class="half">
</figure>

In code, a residual connection looks very simple

<div class="algorithm" markdown="1">
<h3>Residual connection</h3>
<section class="pseudocode" markdown="1"> 
#### pseudocode
```python

given: 
  x: "some input tensor" 
  block: "some module that produces an output with the same shape as x"

y ← block(x) + x # the residual connection 

```
</section>

<section class="pytorch" markdown="1">
#### pytorch
```python

x = ... # our input tensor
block = ... # some module that does some computation

y = block(x)
assert x.size() == y.size() # this is a requirement for a res. connection

y = y + x # the residual connection  

```
</section>
</div>

## What's the point?

There are a few complementary perspectives on why residual connections help.

The first is to do with **vanishing gradients**. As a general rule, the more complex the thing your neural network does, the less informative the gradients that means that if your block does things like sigmoids of softmaxes internally, the gradients coming out of the bottom will be less strong (their activation will be smaller) than those of the gradients flowing into the top.

Even with ReLUs and maxpools, in some sense the graidents for the output will be more informative than the gradients for the input. In general, this will slow down learning for anything below the block. This means, that if your network is a stack of blocks, the lower stacks (closer to the input) will learn most slowly. This is a bad situation, because all the other blocks depend on what the lowest blocks end up doing. None of the network can start learning until the lower blocks get going. 

The residual network gets rid of this problem. It makes the output of your network a mixture of two networks: one that includes your block and one that doesn't. At the start of training, your block will behave randomly and will not produce strong gradients. The gradients flowing through the residual connection, however, will be purely linear. They will tell the lower layers how to behave under the assumption that the block produces random noise. 

Once the lower layers learn this, the block will learn first of all to reduce the magnitude of its output, and then slowly start learning to add something useful to what the lower layers are producing. Then, finally, as the block begins to add useful things, _based on its input x_, we will start to see strong gradients emerging at the input to the block $x$. These can then be used to tell the lower layers how to change their behavior so that their output is actually usefull to the higher layers

### Intitializing to the identity

A useful model of what the residual layer does, is to change the function to <code>y ← <span class="oc">a</span> * block(x) + x</code>, where <span class="oc" markdown="1">`a`</span> is a learnable paramegter that is initialized to $0$. This way, we can see that we start out with just the identity `y ← x`, and slowly learn to add the functionality of the block as <span class="oc" markdown="1">`a`</span> changes to a nonzero value as the block begins to add something useful.   

<figure class="centering">
<img src="/images/residual-a.svg" class="half">
</figure>

In practice, however, this isn't necessary and the simpler version `y ← block(x) + x` works just as well. Gradient descent will quickly learn to tune out the random output of the block until it begins to learn.  

## An experiment

We can validate the explanation above by training a model with a residual connection and tracking the gradient norm at two points: the part going into the block, which we'll call $\x_\text{in}$ and the residual connection, which we'll call $\x_\text{res}$.

We set up a simple network to classify MNIST. It consists of a block of three ReLU-activated convolutions, followed by a $4 \times 4$ maxpool, followed by another block of two convolutions, followed by another maxpool and a classification layer. Around the second block of convolutions, we place a residual layer.

<aside markdown="1">For the details, see [the notebook here](https://github.com/pbloem/gestalt.ink/blob/main/notebooks/residual.ipynb).
</aside>

We train for one epoch. During learning, we track the loss and the gradient norm we get on $\x_\text{in}$ and on $\x_\text{res}$. Here are the results.

<figure class="centering">
<img src="/images/residual-experiment.svg" class="full">
</figure>

Note what happens at the start of learning. The gradients that we get <span class="gc">on the input of the block</span> are small and likely uninformative. 

<aside>Note that this is not necessarily due to vanishing gradients, but more likely due to noisy gradients. The gradient for each individual instance may be big, but because the block is not doing anything useful, the gradients over the whole batch likely all point in different directions, and so have a small norm when summed together.</aside>

<span class="rc">Over the residual connection</span>, we get a much clearer gradient, directly from the linear classification layer.

However, as learning progresses, these two quickly change place. The gradient over the residual connection begins to fade away and the gradient through the block gains in norm. 
