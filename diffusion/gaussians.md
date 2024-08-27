---
title: Gaussians
summary: ""
---
# Gaussians

The **Gaussian distribution**, or **normal distribution** is a key subject in statistics, machine learning, physics, and pretty much any other field that deals with data and probability. It's one of those subjects, like $\pi$ or Bayes' rule, that is so fundamental that people treat it almost like an icon of their subject. 

* toc
{:toc}

To start at the beginning: the normal distribution is a probability distribution. If you sample some data, and it clusters around the mean of the data, it's likely that your data is _normally distributed_. Here is an example. If I measure the height of 100 soldiers in the US army, here is what that data might look like. 

-- image

You can see that the data is clustered around the mean value. Another way of saying this is that the distribution has a definite _scale_. That is, even though people can have all sorts of heights, there are clear limits. You might see somebody who is 1 meter taller than the mean, and it might theoretically be possible to be 2 meters taller than the mean, but that's it. People will never be 3 or 4 meters taller than the mean, no matter how many people you see.

<aside>As an example of a distribution without a definite scale, consider wealth. In the town or city where you live, there are probably many people with ten times the typical level of wealth, and a few with a hundred times. In the whole world there will be people with a thousand to a million times the typical wealth. If we could sample more people than that we could keep going.
</aside>

The definite scale of the height distribution is why we can have doors. We know that heights will fall in a certain range, so we can build for that.

If you measure more than one thing about your subject, you get _multivariate_ data, and the resulting distribution is called a _multivariate distribution_. For example, if we take our soldiers, and measure their height and width, the data looks like this.

-- image

This is called a multivariate normal distribution. Like the one-dimensional (_uni_variate) version, the data is clustered around a central value.

In this article, we'll focus on the use of Gaussians (uni- and multivariate normal distributions) as a _building block_. These distributions are often used as a small part of a more complex model. For instance, we might add noise from a Gaussian to our data at some point in our algorithm, or we could have a neural network produce the parameters of a Gaussian as part of its prediction. 

To use Gaussians in this way requires a solid intuition for how they behave. The best way to do that, I think, is to do away entirely with the symbolic and mathematical foundations, and to derive what Gaussians are, and all their fundamental properties from purely geometric and visual principles. That's what we'll do in this article.  

Todos
- Reference the reparametrization trick somewhere.



### Bringing in parameters

-- Multiplication and addition. high-level only (return to the height example). Save the working out for later. 

## Building a geometric intuition for Gaussians

If you're not intimately familiar with Gaussians, you would be forgiven  for thinking of them as one of the most monstrously complicated probability distributions around. After all, when we first learn about them, pretty much the first thing we see is their probability density function.

$$
N(\x \mid \oc{\bmu}, \bc{\Sig}) = \frac{1}{\sqrt{(2\pi)^{k}|\bc{\Sig}|}}\text{exp} \left( -\frac{1}{2}(\x-\oc{\bmu})^T \bc{\Sig}^{-1} (\x-\oc{\bmu})\right)
$$

It's a beast of a formula, especially if you're not used to reading such things. Why then, do people like this distribution so much? Partly it's because it has nice properties, but actually another part of the reason is that once you get to know it, it's not so complicated. You just have to let yourself forget about the complicated formula.

To start with, we will simply use the following notation

$$
\x \sim N(\oc{\bmu}, \bc{\Sig})
$$

to indicate that a particular [random variable](../random-variable) is normally distributed with parameters $\oc{\bmu}, \bc{\Sig}$, and we will use

$$
N(\x \mid \oc{\bmu}, \bc{\Sig})
$$

to indicate the probability density that a vector $\x$ has under a Gaussian with parameters $\oc{\bmu}, \bc{\Sig}$. This will allow us to hide the complicated formula. It turns out, we can define and study Gaussians in-depth, and prove many useful properties without ever opening up this "black box" to look at the formula.

The way we will do this is by define only the **standard normal distribution in one dimension** in terms of its formula. If we stick to just this one distribution, the formula becomes very simple, and more importantly, very intuitive.

We will then make the jump to Gaussians in multiple dimensions. We first define the standard normal distribution in $n$ dimensions as simply the concatenation of $n$ independent samples from the univariate standard normal. Then, and this is the big magic trick, we look at **affine transformations** of a vector drawn from the $n$-dimensional normal distribution. That is, we look at what happens when you sample a vector form the standard normal distribution, multiply it by some matrix $\bc{\A}$ and add to it fomr vector $\oc{\t}$. 

We _define_ the resulting distribution as a Gaussian. It turns out, this corresponds exactly to the normal definition of Gaussians based on means, covariances and the defintion above. The benefit of this approach, howeer, is that we never need to look at that beastly formula, and we can prove everything we want to from the much more comfortable and intuitive language of affine transformations. 

### The univariate standard normal distribution

-- 

### Parameters for the univariate distribution

### The multivariate Gaussians

We'll assume that the standard normal distribution in one variable $N_1$ has been defined. We'll need a few properties of its probability density function, but we can keep the mean to $0$ and the variance to $1$, so the whole thing simplifies a lot. All we need is 

$$
N_1(x) = \kc{z} e^{-\frac{1}{2} x^2}
$$

where $\kc{z}$ is some constant value that we don't need to worry about. We can make this even simpler by talking about the _natural logarithm_ of the probability density, and replacing the $=$ with a $\propto$, which means "proportional to" or "equal to if you multiply one side by a constant":  

$$
\text{ln}\, N_1(x) \propto - \frac{1}{2} x^2 \p
$$

If we take $n$ scalar random variables $X_1, \ldots, X_n$ all distributed according to $N_1$, and concatenate them into a vector $\x$ , we **define** the resulting distribution on $X$ as $N_s$: the standard normal distribution in $n$ dimensions.

<aside>A warning on notation. For scalar variables, we tend to meticulously use a capital letter $X$ for a random variable and a lower-case letter $x$ for a regular variable with a definite value. With vectors-valued random variables, we tend to let go of this distinction and use bold lower-case, $\x$ for both. Hopefully, the distinction will be clear from context. 
</aside>

Let's see if we can draw a picture of what $N_s$ looks like in 2 dimensions. It's a distribution on vectors $\x = (X_1, X_2)$, with $X_1$ and $X_2$ normally distributed random variables. $X_1$ and $X_2$ both have a distribution that is symmetric around $0$, with its center of mass at $0$, so we can expect the center of mass of the distribution on $\x$ to be at $(0, 0)$. 

How is the rest of the probability mass arranged? Here, we can look at the formula. We know that $X_1=x_1$ and $X_2=x_2$ are independently chosen, so to get the probability density for $\x$, we can just multiply those of its components. Again, we will work with the logarithm to keep things as simple as possible.

$$\begin{align*}
\text{ln}\, N_s(\x) &=\; \text{ln}\,\left (N_1(x_1) \cdot N_1(x_2) \right )\\
&=\; \text{ln} N_1(x_1) + \text{ln}\, N_1(x_2) \\
&\propto\; -\frac{1}{2} {x_1}^2 - \frac{1}{2} {x_2}^2 \\ 
&\propto\; {x_1}^2 + {x_2}^2 \\
&=\; \|\x\|^2  
\end{align*}$$

That last line shows the key principle we wanted to derive: the probability density of $\x$ under $N_2$ is proportional to the squared length of $\x$. That means is we look at all the $\x$ with length, say, $1$, they all have the same probability density. This means that the regions that share the same probability density, the _contour lines_ of the probability density function, form circles. 

With that, we can form a geometric intuition of what $N_s$ looks like.

-- picture, caption. 2d and 3d

In higher dimensions, this becomes difficult to visualize. However, the same argument still works: the density is proportional to the squared length of $\x$, so all $\x$'s with the same length have the same density. In $\mR^3$, these form a sphere, so we can think of $N_s$ in three dimensions as a series of concentric spheres around $\mathbf 0$ that are the contour _surfaces_ of the distribution. In higher dimensions, the spheres become hyperspheres, but they are defined the same way: the collection of $\x$'s that all have the same length.

<aside>Perhaps you knew this already, but it's good to see how you can get there without the full formula for the Gaussian. Note that all we've done is to define $N_s$ in terms of $N_1$.</aside>

Next, let's build the rest of the family. We now **define** a Gaussian as any _linear combination_ of the elements of $\x \sim N_s$. That is, if we sample $\x$ from $N_s$ and apply any linear operation $\y = \bc{\A}\x + \rc{\t}$ with a matrix $\bc{\A} \in \mR^{d \times n}$ and $\rc{\t} \in \mR^\d$, then the resulting distribution on $\y$ is, by our definition, a Gaussian.

<p>What's the geometric intuition here? Think back to the contour circles we defined for $N_s$, let's say the one for $\|\x\| = 1$. Each of the points $\x$ in this circle could be sampled from $N_s$ and transformed by $\bc{\A}$ and $\rc{\t}$. What happens to a circle when all its points are transformed by a matrix? It becomes an <em>ellipse</em>. What's more, the relative lengths of vectors are maintained, so any point inside the circle (any point with $\|\x\| < 1$) before the transformation is inside the ellipse after the transformation. Any point outside the circle before, is outside the ellipse after.</p>

-- image

This means that the amount of probability mass captured inside the unit circle before the transformation, is captured inside the corresponding ellipse after the transformation. 

-- todo: double check this.

Next, let's look at the properties of these Gaussians. First, the mean. If we average a bunch of samples from $N_s$ and let the number of samples go to infinity, where do we end up? The answer is simple: the components of $\x$ are independently drawn, and each has mean $0$, so the resulting distribution must the zero vector $\zero$ as its mean.

<aside>Note that we're not talking about the <em>parameters</em> of these Gaussians. The parameters are how we define a distribution. We've done that with $\bc{\A}$ and $\rc{\t}$. What we are talking about here its <em>properties</em>. For instance the mean. The fact that this can also be used to parametrize the Gaussian, is something we will show later. 
</aside>

What about the mean of our transformed Gaussian? The transformation by $\bc{\A}$ keeps the origin in place, $\A\zero= \zero $, so it's a reasonable guess that if we set $\rc{\t}=\zero$, the mean stays $\zero$. If we use the basic poperty that [the expectation](/expectation) is a linear function--that is, we can move additions and multiplications outside the expectation)---we can prove our guess correct very simply:

<p>${E}_{\x \sim N_s} \bc{\A}\x = \bc{\A} E_{\x \sim N_s} \x = \bc{\A}\zero = \zero \p$
</p>

If $\t$ is not zero, then  all the term $+\;\rc{\t}$ contributes is that we are adding a vector to a $\rc{\t}$ random variable with mean $\zero$. The result is that afterwards the mean is $\rc{\t}$.  

Next up, the [covariance matrix](covariance-matrix) $\bc{\Sig}$. For a random vector $\x$ this is defined as the outer product of the deviation from the mean. It contains all the variances of the individual elements $x_i$ of $\x$ along its diagonal, and it contains all the covariances between elements $x_i$ and $x_j$ on its off-diagonal elements.

Let's start with $N_s$. We know that in $\bc{\Sig}$, the diagonal elements are the variances of $x_i$. These are $1$, because we sampled them independently from $N_1$, which has variance 1. The off-diagonal elements are the co-variances between any two of the elements $x_i$ and $x_j$. We know these are $0$, because we sampled each $x_i$ independently. So, in a phrase, the covariance matrix of $N_s$ is the identity matrix $\I$. 

Now for the rest of the Gaussians. The covariance matrix of $\y = \bc{\A}\x + \rc{\t}$ is defined as the expected outer product of the vector $\y - \bar\y$, where $\bar\y$ is the mean of $\y$. We already know that $\bar\y = \rc{\t}$, so we are looking for the expection of $\y = \bc{\A}\x \kc{\;+\;\t - \t}$. This gives us. 

$$
E_{\x \sim N_s} (\bc{\A}\x)(\bc{\A}\x)^T = E \bc{\A}\x\x^T\bc{\A}^T = \bc{\A} (E \x\x^T)\bc{\A}^T = \bc{\A} \I\bc{\A}^T = \bc{\A\A}^T \p 
$$

Note that we are again using the fact that the expectation is a linear function, so we can take matrix multiplications outside of the expectation (on the left and on the right).

So, to summarize, if we build our Gaussian by transforming $N_s$ with a transformation matrix $\bc{\A}$ and translation vector $\rc\t$, we end up with a distribution with mean $\rc\t$ and covariance matrix $\bc\Sig$. 

We can now make the leap from _properties_ to _parameters_. Instead of identifying a particular Gaussian by the transformation $\bc{\A}, \oc{\t}$ we used to create it, we can identify it by the covariance $\bc{\Sig}$ and mean $\oc\t$ of the resulting distribution.

The Gaussian we get from the transformation $\A\x + \t$ on the standard normal distribution is called $N(\oc{\bmu}, \bc{\Sig})$, with $\oc{\bmu} = \oc{\t}$ and $\Sig = \bc{\A\A}^T$. 

This also means that $N_s = N(\oc{\zero}, \bc{\I})$, which is how we'll refer to it from now on.

<aside>You can also think of the Gaussians as being parametrized by $\A$ and $\t$ directly, but take into account that different transformation matrices $\A$ may lead to the same Gaussian. For instance, any rotation of $N(\oc{\zero}, \bc{I})$ will simply give you $N(\oc{\zero}, \bc{\I})$ again. The benefit of parametrizing by $\bc{\Sig}$ is that we get exactly one Gaussian for every single $\bc{\Sig}$.    
</aside>

Note that in all our constructions above, we allowed $\bc{\A}$ to be _rectangular_. That menas that we can project to higher or lower dimensions all we like, and the result is still a Gaussian, just in aspace of different dimensionality. 

-- image

<aside>The only thing we need to be mindful of, is that if we are projecting up to higher dimensions than $N_s$, we won't be able to define all possible Gaussians in the higher dimensional space. For that, we need to start with a standard Gaussian $N_s$ that has at least as many dimensions as the space we are projecting to.
</aside>

## Fundamental properties of Gaussians

With this geometric view of Gaussians, we can work out pretty much any property we need. Let's look at some examples. First, we know that linear transformations turn the standard Gaussian into another Gaussian. What happens if we linearly transform other Gaussians?

### Linear transformations

<div class="theorem"><strong class="gc">Linear transformation of Gaussians</strong> Let $\y$ be a random variable with any Gaussian distribution $\y \sim N(\oc{\bmu}, \bc{\Sig})$. Apply to $\y$ any linear operation $\z = \gc{\A}\y + \rc{\t}$ with a matrix $\gc{\A}$ and vector $\rc{\t}$. Then $\z$ has a Gaussian distribution. Specifically,
$$
\z \sim N(\gc{\A}\oc{\bmu} + \gc{\t}, \gc{\A}\bc{\Sig}\gc{\A}^T) \p
$$
</div>
<div class="proof"><span class="kc">Proof.</span> We know, from our construction of the Gaussians, that there is some $\bc{\B}$ and $\oc{\q}$ so that $\y = \bc{\B}\x + \oc{\q}$ with $\x = N(\zero, \I)$ gives us $\y \sim N(\oc{\mu} = \oc{\q}, \bc{\Sig} = \bc{\B\B}^T)$. Filling in this operation into the one from the theorem, we get

$$
\z = \gc{\A}(\bc{\B}\x + \oc{\q}) + \rc{\t} =  \gc{\A}\bc{\B}\x + \bc{\A}\oc{\q} + \rc{\t} \p
$$

This expresses $\z$ as linear transformation of $\x \sim N(\zero, \I)$ with transformation matrix $\gc{\A}\bc{\B}$ and translation vector $\bc{\A}\oc{\q}+\rc{\t}$, so $\z$ has a Gaussian distribution. Moreover, we know that its parameters are 

$$
\oc{\bmu}_\z = \gc{\A}\oc{\q} + \rc{\t} = \gc{\A}\oc{\bmu} + \rc{\t}
$$

and 

$$
\bc{\Sig}_\z = \gc{\A}\bc{\B}(\gc{\A}\bc{\B})^T = \gc{\A}\bc{\B\B}^T\gc{\A}^T = \gc{\A}\bc{\Sig}\gc{\A}^T \p 
$$
<span class="qed"></span>
</div>

Note, again,  that this result holds, **even if $\A$ is not a square matrix**. This leads directly to some very useful corollaries. 

<div class="theorem"><strong class="gc">Subvectors of a Gaussian vector are Gaussian.</strong>
If we sample $\y$ from any Gaussian, and select one or more of its elements, the resulting vector $\y$' is also distributed according to a Gaussian.
<span class="qed"></span>
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Selecting elements of a vector can be done by a matrix multiplication. For instance, the matrix $(0, 1, 0)$ selects the middle element of a three-dimensional vector. 
</div>

<strong>question:</strong> What does this look like if I select two elements? What are the parameters of the resulting distribution. What should I expect the resulting distribution to be if I select _all elements_? Can you show that this expectation is correct? 

One consequence is that if you project a Gaussian onto one of the axes, the result is a univariate Gaussian along that axis. In terms of probability, this corresponds to _taking a marginal_. With the example in the proof, we sample $\x$ from some Gaussian, and then only look at the distribution on $x_2$, disregarding the rest of the vector. If you followed the definition of marginalization, you would end up with a formula like 

$$
p(x_2) = \int_{x_1, x_2} N(x_1, x_2, x_3 \mid\oc{\bmu}, \bc{\Sig})\, d x_1x_2 
$$

for which you would then have to fill in that horrible formula for $N$ and work out the integral. Ultimately, you would end up with the result that $p(x_2)$ is a Gaussian, with some particular parameters, but it would be a lot of work.

This shows the benefit of our geometric construction of the Gaussians. With a little thinking we can almost always leave $N$ be and never replace it by any formulas. 

### If you can linearly transform it to a Gaussian, it's a Gaussian

We showed above that if you linearly transform a Gaussian, the result is another Gaussian.  Next, it's useful to show that this also works the other way around. If we are given a distribution $p$ and we can apply a linear transformation to turn it into a Gaussian, then $p$ is also a Gaussian.

<div class="theorem"><strong class="gc">Linear transformation <em>to</em> Gaussians</strong> Let $\z ~ p$. If there exists some linear transformation $\y = \gc{\A}\y + \oc{\t}$ so that $\y$ is a Gaussian, then $p$ is a Gaussian as well.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Assume first that $\gc{\A}$ is [invertible](../invertible-matrix). Since $\y$ is Gaussian, there is a transformation $\y = \bc{\B}\x + \oc{\q}$ with $\x ~ N(\zero, \I)$. This gives us

$$\begin{align*}
\gc{\A}\z + \rc{\t} &= \bc{\B}\x + \oc{\q} \\
\z &= \gc{\A}^{-1}\bc{\B}\x + \gc{\A}^{-1}(\oc{\q} - \rc{\t})
\end{align*}$$

<aside>You can read these as random variables, but it's most straightforward to read them as regular vectors. That is, after we sample a $\z$ we know that it can be mapped to a $\y$ so that the result is a Gaussian over all possible results of that sample, and we know that that $\y$ can be mapped to an $\x$ which has distribution $N(\zero, \I)$ over all such samples.  
</aside>

This tells us that the distribution on $\z$ is a Gaussian transformation of some $\x ~ N(\zero, \I)$ and thus a Gaussian.

If $\A$ is not invertible, we can show that if there is a non-invertible $\A$ so that $\A\z + \t$ is Gaussian then there is also an invertible $\A$ and corresponding $\t$. This is shown in the appendix as a lemma.
<span class="qed"></span>
</div>

### The sum of two Gaussians is a Gaussian

Let $\a$ be a vector sampled from one Gaussian and $\b$ be a vector sampled from another Gaussian. Sum them together and return the result $\c = \a + \b$. What is the distribution on $\c$? 

That is, if somebody topld us that they had done this, but didn't tell us the values of $\a$ and $\b$. What probability density should we assign to them getting a particular value of $\c$?

It may not surprise you to learn that the result is another Gaussian. 

It pays to be careful here. If I give you the probability density functions of two Gaussians, and you create a new probability density function by making a weighted sum of these two densities for a given value $\x$, then the result of that is a mixture-of-Gaussians, which is usually, decidedly not Gaussian. What we are talking about is _sampling_ from two different Gaussians, and then summing the sampled values.   

*question*: I am a teacher and my class has students from two different schools in equal proportion, with different mean grades. The probability over the whole class of someone scoring a grade of $6$ is the average of the probability that someone from school 1 scores a $6$ and the probability that someone from school 2 scores a $6$. Is the result necessarily a Gaussian? Consider what the distribution looks like if the mean grades for the two schools are very far apart. 

*question*: I pair up each student from school 1 with a student from school 2. For one such pair, I take a test, and average their grades. What is the distribution on the average I get? Is it Gaussian?

We can prove this property using our geometric construction, but we have to be a little bit more inventive than before. The key is to realize that the _concatenation_ of $\a$ and $\b$ has a Gaussian distribution and that given this concatenation, the sum is just an affine operation.

We'll first show that the concatenation of two Gaussians yields a Gaussian. This is a very intuitive result, that you may well be willing to accept without proof, but it doesn't hurt to be rigorouas. 

<div class="theorem"><strong>Lemma. Concatenationof Gaussian variables</strong> Let $\a$ and $\b$ be vectors
$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{, }\\ 
\b &\sim N(\oc{\b_eta}, \bc{\bTau}) \text{ and }\\
\c &= \begin{pmatrix}\a \\ \b \end{pmatrix} \p 
\end{align}$$

That is, $\c$ is the concatenation of $\a$ and $\b$. Then $p(\c)$ is Gaussian with mean 
$$
\begin{pmatrix}\oc{\bmu} \\ \oc{\bnu} \end{pmatrix}
$$ 
and covariance 
$$
\begin{pmatrix}
\bc{\Sig} & \zero \\
\zero & \bc{\bTau}
\end{pmatrix} \p
$$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> First, we rewrite $\a$ and $\b$ as affine transformations of standard normal noise:
$$\begin{align*}
\a &= \bc{\A}\s + \oc{\bmu} \\
\b &= \bc{\B}\t + \oc{\bnu} \p
\begin{align*}$$

Where $\s$ and $\t$ are standard normal and $\bc{\Sig} = \bc{\A\A}^T$ and $\bc{\bTau} = \bc{\B\B}^T$. Then, $\c$ can be written as

$$
\c = \begin{pmatrix}\a \\ \b\end{pmatrix} = \begin{pmatrix} \bc{\A}\s + \oc{\bmu} \\ \bc{\B}\t + \oc{\bnu} \end{pmatrix}  = \bc{C} \begin{pmatrix} \s \\ \t\end{pmatrix} + \begin{pmatrix} \oc{\bmu} \\ \oc{\bnu}\end{pmatrix} 
$$

where 
$$
\bc{\C}  = \begin{pmatrix}\bc{\A} & \zero \\ \zero & \bc{B} \end{pmatrix} \p
$$

Now, note that the vector $\begin{pmatrix} \s \\ \t\end{pmatrix}$ consists only of univariate, standard-normal elements. In other words, this vector is a standard-normal sample itself. This means that $\c$ has a Gaussian distribution. From the affine transformation above, we see that its mean is the concatenation of $\oc{\bmu}$ and $\oc{\bnu}$ as required. Its covariance is $\bc{\C\C}^T$, which the following diagram shows is equal to the covariance in the proof statement.

-- diagram

</div>


<div class="theorem"><strong>Theorem. Sum of Gaussian variables</strong> Let 
$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{, }\\ 
\b &\sim N(\oc{\b_eta}, \bc{\bTau}) \text{ and }\\
\c &= \a + \b \p 
\end{align}$$
Then $p(\c) = N(\c \mid \oc{\bmu} + \oc{\bnu}, \bc{\Sig} + \bc{\bTau})$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Let $k$ be the dimensionality of $\a$ and $\b$. 

Let $\d$ be the concatenation of $\a$ and $\b$. That is, a vector that has $2k$ elements with the first $k$ elements taken from $\a$, and the remaining $k$ taken from $\b$. The distribution on $\d$ is a Gaussian with the first $k$ elements independent from the remaining $k$ elements.

To see 

</div>



### Sampling the mean from another Gaussian

Here's a situation that comes up occasionally. We sample a vector $\a$ from one Gaussian, and then make the resulting value the mean of another Gaussian. Both Gaussians have fixed covariances. We then sample $\b$ from the second Gaussian. What's the distribution on $\b$? Conditional on $\a$, it's a Gaussian. that's how we defined it. But what about $p(\b)$. That is, what if someone told us they had followed this process, but they didn't tell us what the value of $\a$ was? What probabilities would we assign to a given value of $\b$?

<aside>One place this pops up is in Bayesian statistics, where we put <em>priors</em> on the parameters of our distributions. We then imagine the data being generated by first sampling parameters from the prior, and then sampling the data from the distribution wiht the sampled parameters. If both the prior on the mean and the data distribution are Gaussians, the resulting distirbution on the data over all possible values for the mean is also Gaussian. 
</aside>

It turns out that this distribution is Gaussian as well. One way to think of this distribution is as a _convolution_ of the two Gaussians we used for sampling. At every point $\a$ in space we place a Gaussian. The probability density is a mixture of all these Gaussians. Put differently, the probability $p(\b)$ assigned to some point is a weighted "sum", more precisely an integral, of all the Gaussians we could sample in the first step, all weighted by how likely they are to be sampled.

-- image

We could use this to work out the shape of $p(\b)$, but that would require lots of integrals and formulas. Instead, we will use our geometric perspective to take a shortcut. 

<div class="theorem"><strong>Theorem. Gaussian convolution</strong> Let 
$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{ and }\\ 
\b &\sim N(\a, \bc{\bc\Sig}') \po 
\end{align}$$
Then, $p(\b) = N()$.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> From our geometric definition, we can rewrite $\a$ as 
$$
\a = \bc{\A} \s + \bmu
$$
with $\s$ a stand-normally distributed vector, and $\bc{\Sig} = \bc{\A\A}^T$. Likewise we can write,
$$
\b = \bc{\B} \s' + \a
$$
with $\s'$ a <em>separate</em> standard normally distributed vector and $\bc{\Sig'} = \bc{\B\B}^T$. In this view, we sample $\s$ and $\s'$, but we compute $\a$ and $\b$ from them as regular variables. That means we can fill the definition of $\a$ into that of $\b$ and get 

$$\begin{align*}
\b = \bc{\B} \s' + \bc{\A} \s + \bmu \p
\end{align*}$$

The first two terms, $\bc{\B} \s' + \bc{\A} \s$ form the sum of two Gaussians. By the result of the previous section, this is equal to a single Gaussian with ... so that we get ...

</div>



### Conditioning Gaussians

Here is a slightly more complex example. What if we want to _condition_ $\x$ on one of its values? For instance, we are interested in the distribution $p(\x \mid x_2=3)$ where $\x$ is drawn from a Gaussian. We can use our construction above so show that the result is, again, a Gaussian.

This one is a little more complex to prove. We will start with a lemma showing a single, specific, case. If $\x$ is drawn from the standard normal distribution $N(\zero, \I)$, and condition on one of the elements having a particular value $c$, then the resulting distribution $p(\x\mid x_i = c)$ is standard normal on the remaining elements of $\x$. This result will require us to open the box and to look at the formula for $N(\zero, \I)$, but as we saw earlier, this formula is relatively straightforward.

With that lemma in place, we can show our main result: that for _any_ variable $y$ with a Gaussian distribution, conditioning on one of the elements of $\y$ results in another Guassian. This, we can do entirely by the affine operation trick. We will simply show that we can transform the standard Gaussian from our lemma to any other Gaussian with the desired condition, which will prove that the latter is a Gaussian too.   

Finally, we will show, as a corollary, that if we want to condition on more than one  

<div class="theorem"><strong>Lemma. Gaussian conditioning</strong> Let $\x \sim N^n(\zero, \I)$. Then for any element $x_i$, and value $c$,
$$
p(\x \mid x_i = c)
$$
is a standard Gaussian $N^{\n-1}(\zero, \I)$ on the remaining elements of $\x$.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> To start with, consider how this conditional distribution is defined. In two dimensions, the situation looks like this.

-- image

The constraint $x_i = c$ tells us that we assume that $\x$ is on the red line. The probability density for points that are not on the line becomes zero. The density for points on the line stays the same, but should be rescaled uniformly so that the probability density, if we integrate over the whole line becomes 1.

<aside>This is the definition of the conditional probability. We take the joint distribution over all outcomes, select a subset of them to condition on, and then rescale the probabilites or probability densities so that the whole probability mass over the subset sums or integrates to 1.
</aside>

Extending this to $n$ dimensions, if we condition on one element $x_i$ of $\x$, the result is that the line becomes an $n-1$ dimensional hyperplane orthogonal to the $i$-th axis. For any point in this hyperplane, we take the probability density under $N^n(\zero, \I)$ and rescale it, so that the whole hyperplane integrates to 1.

This integral sound like a tricky one to work out. Luckily, we don't have to. We just assume it exists, and work around it with the "proportional to" trick we saw earlier. 

To make the notation simpler, we will assume, [without loss of generality](../wlog), that $x_i$ is the last element of $\x$, that is $x_n$. We call the vector $\\x$ with the $n$-th element removed $\x_{\\n}$ 

Then if $\x$ has $x_n=c$, we have 

<p>$$\begin{align*}
p(\x \mid x_n = c) &\propto N^n(\zero, \I) \\
&= \text{exp} - \frac{1}{2} \|\x\|^2 \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 + x_n \right) \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 + \rc{c}\right) \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 \right) \cdot \rc{ \text{exp} - \frac{1}{2} c} \\
&\propto \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 \right) = \text{exp} -\frac{1}{2} \|\x_{\\n}\| \\ 
&= N^{n-1}(\x_{\\n}\mid \zero, \I) \p
\end{align*}$$</p>

We see that the probability density that $p(\x \mid x_n =c)$ assigns to the vector $\x$, if $x_n=c$, is proportional to the density that $N^{n-1}(\x_{\\n})$ assigns to the first $n-1$  elements of $\x$. Normally, to turn this into a fully determined probability function is to figure out what this integrates to and divide by that to turn the $\propto$ into a $=$. However, in this case, we know what the right-hand side integrates to, because $N^{n-1}$ is already a proper probability function, and we are allowing all possible values for $\x_{\\n}$. It integrates to $1$, so we can simply say that

$$
p(\x \mid x_n = c) = N^{n-1}(\zero, \I) \p
$$

</div>

Now, to do the same thing for any other Gaussian, we can simply show that it can be transformed to the Lemma above by a simple series of affine operations.

<div class="theorem"><strong class="gc">Theorem. Guassian conditioning.</strong> If we sample $\y$ from any Gaussian, and condition on one of its elements, the resulting distribution is Gaussian. 
</div>
<div class="proof"><span class="kc">Proof.</span> Since $p(\y)$ is Gaussian, there is some $\A$ and $\t$ so that $\y = \A\x + \t$ with $\x ~ N(\zero, \I)$. This means that $y_i = \a_i\x + t_i$, where $\a_i$ is the $i$-th row of $\A$. This is a linear constraint on the values of $\x$ that we accept. Since it's an extra constraint in one variable, it essentially means that if we know all values of $\x$ except one, say $x_k$, then we can work out what $x_k$ must be. We can show this with some simple re-arranging:

$$\begin{align*}
y_i = \rc{c} &= A_{i1}x_1 + \ldots + A_{in}x_n + t_i\\
x_k &= - \frac{1}{A_{ik}}\left ( A_{i1}x_i + \bc{ldots} + A_{in}x_n\right + t_i - \rc{c}) \n
\end{align*}$$

The last line represents a constraint on $\x$. We'll refer to this constraint as $c(\x)$, a bollean function which is true if the constraint holds for $\x$.

What we've shown is that just like sampling from $p(\x)$ and transforming to $\y = \A\x + \t$ gives us a sample from $p(\y)$, sampling from $p(\x\mid c(\x))$ and transforming by $\y = \A\x + \t$, gives us a sample from $p(\y \mid y_i = c)$.

Now, since $c(\x)$ linearly expresses one element of $\x$ in terms of the other $n-1$, the $\x$'s that satisfy it form an $n-1$ dimensional hyperplane. It's not axis-aligned, as it was in the lemma, but that can be fixed with a simple rotation. Let $\R$ be the orthogonal matrix such that the transformation 

$\z = \R\x$

when applied to the hyperplane $c(\x)$ yields a hyperplane orthogonal to the $n$ 
-th axis. Since $N(\zero, I)$ is rotationally symmetric, the density of any point $\x$ remains unaffected when it is mapped to $\z$. This tells us that $p(\x \mid c(\x)) = p(\z \mid z_n = c')$ for some value $c'$. 

And with that, we can apply our lemma. $p(\z \mid z_n=c')$ is a (standard) Gaussian, by the lemma. $p(\x \mid c(\x))$ is an orthogonal transformation of it, so also a (standard) Gaussian, and $p(\y \mid y_k=c)$ is an affine transformation of that, so also Gaussian.

-- add images?
</div>

Finally, if we want to condition on more than one element of $\y$, we can repeat the same proof for different dimensionalities of hyperplanes, but it's simpler to just apply the theorem multiple times.

<div class="theorem"><strong class="gc">Corollary. Guassian conditioning.</strong> If we sample $\y$ from any Gaussian, and condition on $m$ of its elements, the resulting distribution is Gaussian. 
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Assume we have a Gaussian $p(y_1, \ldots, \y_n)$. Conditioning on $y_1$ given us, by the theorem, a Gaussian $p(y_2 \ldots, y_{n} \mid y_1)$. Since the latter is a Gaussian, we can condition on one of its elements and, by the theorem get another Gaussian $p(x_3, \ldots x_1, x_2)$. We can do this for any number of elements, and in any order we like.
</div>

<strong>question:</strong> What if you want to know not just whether the conditional a Gaussian is, but which Gaussian? I.e. what are its parameters? How would you proceed? Which elements of the proof would you need to work out in greater detail? 


##  Appendix and scrap

<div class="theorem"><strong class="gc">Conditioning</strong>
If we sample $\y$ from any Gaussian, and condition on one or more of its elements, the resulting distribution $p(\y \mid y_i = c)$ is Gaussian. 
<span class="qed"></span>
</div>
<div class="proof" markdown="1" ><span class="kc">Proof.</span> Assume first, that we are conditioning on a single element of $\y$. xThat is, we know that $p(\y)$ is Gaussian, and now we want to show that $p(\y \mid y_1 = \rc{c})$--with $\rc{c}$ some constant value, is also Gaussian.

Since $p(\y)$ is Gaussian, there is some $\A$ and $\t$ so that $\y = \A\x + \t$ with $\x ~ N(\zero, \I)$. 

It will help if we first get rid of the translation vector $\t$. Note that $p(\y) = N(\y \mid \t, \A\A^T)$. To make this distribution mean-centered, we can say that $p(\y - \t) = N(\zero, \A\A^T)$, and that $p(\y| y_k = c) = p(\y -\t \mid y_k - t_k = c - t_k)$

-- image

This tells us that if we can show that the vector $\y - \t$ is Gaussian when conditioned on one of its elements, so is $\y$, since it's just a translation of $\y$. In short, we can assume that $\y$ is mean center for the remainder of the proof: if it holds for mean-centered $\y$'s it holds for all the rest as well. 

<strong>In two dimensions</strong>To help our intuition, we will work out the proof in two dimensions first, and then generalize. We'll use the concrete example p(\y \mid y_2 = 2) 

-- image

The constraint that $y_2 = 2$ means that we are restricting ourselves to a horizontal line in the space of $\y$'s. The corresponding $\x$'s form a sloped line through the origin, which we'll call $c$. Any $\x$ that is on this line, is mapped to a $\y$ for which $y_2 = 2$. What we'd like to do is show that $p(\x\mid \text{"$\x$ is on $c$"})$ is a Gaussian. Since $p(\y \mid y_2=2)$ is an affine transformation of this, the proof will follow.

 First, imagine that we were conditioning on $x_1 = 0$. That is, instead of assuming that $\x$ is in a sslopedline through the origin, we assume that $\x$ lies on the vertical axis. In that case, the conditional distribution is a slice through the 2D probability density surface.

-- image

This slice gives us the conditional probability density, except that we need to multiply it by some constant so that the whole thing integrates to 1 over the whole vertical axis. We don't need to work out what this constant is, we can just call it $z$ and say that the conditional distribution is 

$$
p(x \mid x_1=0) = z \cdot N_1(x_1=0) N_1(x_2)  \propto N_1(x_2) \p  
$$

So, our conditional distribution is proportional to $N_1(x_2)$, and whatever constant we multiply it by will cause the distribution to integrate to 1. Since $N_1(\x_2)$ _already_ integrates to 1, this constant must be 1, and we can say that $p(x_2 \mid x_1 = 0 ) = N_1(x_2)$.

Now, back to conditioning on any line $c$ through the origin. The standard normal distribution consists entirely of circular contour lines, so it's rotationally symmetric. By conditioning $\x$ to a line through the origin, essentially create the same picture as we had when conditioned on $x_1= 0$, but rotated.  

--image 3d

This tells us that the conditional probability must have the same shape. If we let $c_\x$ be a scalar that tells us how far along $c$ the vector $\x$ is from the origin, then, assuming $\x$ is on $c$, the conditional distribution is 

$$
p(\x\mid c(x)) = p(c_\x \mid c(\x)) = N_1(c_\x) \p
$$

Therefore, $p(\x \mid c(\x))$ is a Gaussian distribution. And since $p(\y \mid y_k=c)$ is an affine transformation of this distribution, we know that it must also be Gaussian.

<strong>In $n$ dimensions</strong> Let's now extend this idea to higher dimensions. Remember, whatever the dimension of $\y$, there is some $\A$ such that $\y = \A\x$ with $\x \sim N(\zero, \I)$.



This means that $y_i = \a_i\x + t_i = c$, where $\a_i$ is the $i$-th row of $\A$. This is a linear constraint on the values of $\x$ that we accept. Since it's an extra constraint in one variable, it essentially means that if we know all values of $\x$ except one, say $x_k$, then we can work out what $x_k$ must be. We can show this with some simple re-arranging:

$$\begin{align*}
y_i = \rc{c} &= A_{i1}x_1 + \ldots + A_{in}x_n + t_i\\
x_k &= - \frac{1}{A_{ik}}\left ( A_{i1}x_i + \bc{ldots} + A_{in}x_n\right + t_i - \rc{c}) \n
\end{align*}$$

Where the <span class="bc">sum</span> in the second line does not include the $k$-th term, and we have used the fact that we condition on $y_i = \rc{c}$ in the first line. We call this last line, the constraint $c(\x)$. That is, if we can compute $x_k$ from the other values of $\x$ in this way, then $c(\x)$ holds.

This tells us that the space of points $\x$ for which $c(\x)$ holds, is an $N-1$ dimensional subspace of $\mR^N$. Call $\x$ with the $k$-th element $\x_{\\k}$. Then, we can freely choose the $N-1$ elements of $\x_\{\\k}$, and then compute the single value of $x_k$ that allows $c(\x)$ to hold.

If it were the case that this subspace was aligned to the axes, as in our two-dimensional example, then $x_k$ would be $0$ (if this happens, all the $A_{i\cdot}$ in the constraint above would be $0$). In this case, as before, we can work out what the density $p(\x | x_k = c')$





</div>


We can also prove property (1) this way, although it requires a bit more cleverness. First, we note that if we concatenate  

---

A simpler way to the conditioning proof?

$$
p(x_1, x_2, x_3) = p(x_1)p(x_2, x_3\midx_1) \p
$$

$p(x_1, x_2, x_3)$ and $p(x_1)$ are Gaussians. Can we show that if something multiplied by a Gaussian yields a Gaussian, that something must be a Gaussian?

Even if it is simple to do this, I don't think it's as intuitive. 