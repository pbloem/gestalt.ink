---
title: Gaussians
summary: "The **Gaussian distribution**, or **normal distribution** is a key subject in statistics, machine learning, physics, and pretty much any other field that deals with data and probability. "
---

# Understanding Gaussians

The **Gaussian distribution**, or **normal distribution** is a key subject in statistics, machine learning, physics, and pretty much any other field that deals with data and probability. It's one of those subjects, like $\pi$ or Bayes' rule, that is so fundamental that people treat it like an icon.

* toc
{:toc}

To start at the beginning: the normal distribution is a _probability distribution_: a mathematical object that describes a process by which you can _sample data_. Here is an example. If I measure the height of about 2000 female soldiers in the US army, and plot the results in a histogram, here is what that might look like.

<figure class="centering" markdown="1">
<img src="/images/gaussians/soldiers.svg" class="three-quarters">
<figcaption markdown="1">The _stature_ (height) of 1986 female soldiers in the US Army. From the ANSUR II dataset [[1](#references)].
</figcaption>
</figure>

<aside markdown="1">Why _female_ soldiers only? If we were to mix male and female soldiers, we would get a distribution with two peaks, which would not be Gaussian.  
</aside>

You can see that the data is clustered around the _<span class="oc">mean value</span>_. Another way of saying this is that the distribution has a definite _scale_. That is, even though people can have all sorts of heights, there are clear limits. You might see somebody who is 1 meter taller than the mean, and it might theoretically be possible to be 2 meters taller than the mean, but that's it. People will never be 3 or 4 meters taller than the mean, no matter how many people you see. The distribution still assigns this event some probability density, since we can never be sure, but it's astronomically small.  

<aside markdown="1">As an example of a distribution _without_ a definite scale, consider wealth. In the town or city where you live, there are probably many people with ten times the typical level of wealth, and a few with a hundred times. In the whole world there will be people with a thousand to a million times the typical wealth. If we could sample more people than that we could keep going.
</aside>

The definite scale of the height distribution is why we can have doors. We know that heights will fall in a certain range, so we can build for that. There are a few distributions like this with a definite scale, but the Gaussian is the most famous one. You can see in the plot above that it has a kind of "bell" shape---it's also called _the bell curve_---which trails off smoothly as we get further from the mean, first slowly and then dropping rapidly, and then flattening out quickly. If we make the bins in our histogram smaller, and increase the sample size so they are still filled up, we can see the shape appear more clearly.

<figure class="centering" markdown="1">
<img src="/images/gaussians/soldiers-synth.svg" class="three-quarters">
<figcaption markdown="1">Synthetic data for 100 million imagined soldiers from the same distribution as the figure above.
</figcaption>
</figure>

<aside>Note that the normal distribution is a little bit of a mismatch for the people's heights, since this domain has a hard cutoff at 0. Negative heights are impossible rather than unlikely, but the normal distribution extends to infinity in both directions. It is quite common in such situations to use a Gaussian anyway, especially if the cutoff in your data coincides with a region where the probability is vanishingly small. 
</aside>

If you measure more than one thing about your subject, you get _multivariate_ data, and the resulting distribution is called a _multivariate distribution_. For example, if we take our soldiers, and measure their height and their weight, the data looks like this.

<figure class="centering" markdown="1">
<img src="/images/gaussians/soldiers-2d.svg" >
<figcaption markdown="1">A scatter plot of the height and weight of our sample of soldiers. 
</figcaption>
</figure>

This is called _a multivariate normal distribution_. Like the one-dimensional (<em>uni</em>variate) version, the data is clustered around <span class="oc">a central value</span>.

Most descriptions you will read of the Gaussian distribution will focus on the way it is used to describe or approximate the real world: its use as _a model_. This is a typical statistics approach, and it  comes with a lot of baggage that we will not discuss here. 

In this article, we want to focus more on the way Gaussians are used in _machine learning_. There, we also aim to build a model of our data, but we are often less concerned with the fact of capturing our data in a single Gaussian.  Instead, we use Gaussians as a _building block_, a small part of a more complex model. For instance, we might add noise from a Gaussian to our data at some point in our algorithm, or we could have a neural network produce the parameters of a Gaussian as part of its prediction. We could combine multiple Gaussians together, in order to create a distribution with multiple peaks. We could even take a sample from a Gaussian and feed it to a neural net, so that the neural net effectively twists and folds the relatively simple shape of the Gaussian into something much more complex.

<figure class="centering" markdown="1">
<img src="/images/gaussians/neural-net.png" class="full">
<figcaption markdown="1">100 000 points drawn from a Gaussian distribution and passed through a randomly initialized neural network. 
</figcaption>
</figure>

To use Gaussians in this way requires a solid intuition for how they behave. The best way to do that, I think, is to do away entirely with the symbolic and mathematical foundations, and to derive what Gaussians are, and all their fundamental properties from purely geometric and visual principles. That's what we'll do in this article.

<aside markdown="1">That doesn't mean we don't go into some hairy symbolic maths. However, the basic principle of what we're doing is hopefully simpler to understand and visualize than it is when we start with the big scary formula. 
</aside>


## Building a geometric intuition for Gaussians

If you're not intimately familiar with Gaussians, you would be forgiven  for thinking of them as one of the most monstrously complicated probability distributions around. After all, when we learn about them, pretty much the first thing we see is their probability density function.

$$
N(\x \mid \oc{\bmu}, \bc{\Sig}) = \frac{1}{\sqrt{(2\pi)^{k}|\bc{\Sig}|}}\text{exp} \left( -\frac{1}{2}(\x-\oc{\bmu})^T \bc{\Sig}^{-1} (\x-\oc{\bmu})\right)
$$

It's a beast of a formula, especially if you're not used to reading such things. Why then, do people like this distribution so much? Why use it as a building block when it is already so complex? Shouldn't we look for simple building blocks---perhaps something like a uniform distribution, which has a much simpler formula?

Partly, we like the Gaussian because it has nice properties, but partly, we like it because once you get to know it, it's not so complicated. You just have to let yourself forget about the complicated formula. So we'll put it out of our minds, and start elsewhere.

The plan is as follows. We will first derive a _standard_ Gaussian. Just one distribution, in one dimension. This makes the formula much simpler. From this, we will define a standard Gaussian in $n$ dimensions, in a straightforward way, which doesn't require us to extend the formula very much. Then, we will use _affine transformations_---multiplication by a matrix, and addition of a vector---to define a whole _family_ of Gaussians. Implicitly, this will lead to the formula we use above, but practically, all we need to understand are the basic rules of linear algebra.

We will use this view to derive a bunch of useful properties about Gaussians, and then finally wrap up by showing that the above formula is indeed correct.

### The standard Gaussians

The first thing we need is the standard Gaussian in one dimension. This is a probability distribution on the real number line: if we sample from it, we can get any real number. The function that describes it is a _probability density function_: it maps each real number to a probability density. Numbers with higher density are in some sense more likely than numbers with low density.

<aside markdown=1>A counter-intuitive property is that any individual number actual has probability zero, even the one with the highest probability density. If this idea is unfamiliar, have a look at the article on [probability and probability density](./probability-and-probability-density). 
</aside>

<p>To come up with the density function, remember the aim we started with: we want the distribution to have a definite scale, some area where almost all of the probability mass is concentrated. We'll put that region around zero on the number line (it seems as good a point as any). This is where the density should peak, and as we move away from zero the density should drop very quickly, so that pretty soon, it's almost zero. One way of achieving this is to have <em>exponential decay</em>. Just like an exponential function $e^x$ blows up very quickly, the negative exponential function $e^{-x}$ drops to zero extremely quickly.</p>

<aside>To have it drop to zero in both directions, we can use the absolute value of $x$: $e^{-|x|}$.
</aside>

<p>We could use the exponential function, but if we add a square in there, to give us $e^{-x^2}$ we get some nice properties on top of the exponential decay.</p>

<figure class="centering" markdown="1">
<img src="/images/gaussians/exp-vs-squaredexp.svg" class="full">
</figure>

First of all, the decay far out from zero is even faster, since we're adding in a square. Second, close to zero, we get a little more probability density on all numbers in that region. The exponential decay really favors only 0, while the squared exponential favours all numbers _near zero_. Finally, the quared exponential has two _inflection points_, highlighted in the image with diamonds. These are the points where the decay moves from dropping faster and faster to dropping slower and slower. These inflection points form a nice, natural marking for the _scale_ of the distribution: we can take the interval between the inflection points as the "typical" range of outcomes that we might get if we sample from the distribution. The numbers outside this range are possible, but they're less likely.

<aside>It is of course, entirely arbitrary what we consider a "likely" outcome. However, the inflection points at least function as a recognizable marking on the function: a point where the behavior of the function noticeably changes. The <span class="bc">exponential function</span> doesn't have this. The function always behaves the same everywhere: for one step away from 0, the function dcreases by a factor of $e$.
</aside>

So that's where the basic bell shape of the distribution comes from: the choice to have the probability density decay squared exponentially. Next, we'll make a small adjustment to make the function a little more well-behaved. Remember that the inflection points give a us a nice interval to consider the "typical points". This interval is now a little arbitrary. If we scale the function a bit, we can put the inflection points at $-1$ and $1$, so that the interval containing the bulk of the probaility mass is contained in $(-1, 1)$. This seems like a nice property to have, and as it turns out, it doesn't make the function much more complex.

First, we need to figure out where the inflection points are. We defined them as the point where the function moves from dropping faster and faster to dropping slower and slower. This behavior, how fast the change in the function changes, is given by the second derivative of the function. Where that is equal to zero, we find an inflection point. The first derivative of $\gc{e^{-x^2}}$ is (using the chain rule) $-2x\gc{e^{-x^2}}$, and the second derivative is (using the product rule) $-2\gc{e^{-x^2}} + 4x^2\gc{e^{-x^2}} = (4x^2 -2)\gc{e^{-x^2}}$. Setting that equal to zero, we get $x^2 = 1/2$, so the inflection points are at 

$$
x = -\sqrt{\frac{1}{2}}  \;\text{and}\; x = \sqrt{\frac{1}{2}} \p
$$

If we want to stretch a function $f(x)$ horizontally by a factor of $\rc{y}$, we should multiply its input by $\rc{1/y}$: $f\left(\rc{\frac{1}{y}}x\right)$. That means that if we want to stretch it so that the point $\rc{x}$ ends up at 1---a stretch of $\rc{1/x}$---we should multiply the input by $\rc{x}$

In our case, that means we multiply the input by $\rc{\sqrt{\frac{1}{2}}}$: 

$$
e^ {-\left(\rc{\sqrt{ \frac{1}{2} }}x\right)^2} = e^{- \frac{1}{2}x}
$$

<figure class="centering" markdown="1">
<img src="/images/gaussians/move-inflection-pts.svg" class="full">
</figure>

So, our function is now $e^{-\frac{1}{2}x^2}$. The extra multiplier of $\frac{1}{2}$ is a small price to pay to put the inflection points at $-1$ and $1$. 

With that, we almost have a probability density function. The only problem left is that the rules of probability density functions state that the whole area under the curve should integrate to 1. Put simply, the probability of sampling any number in $(-\infty, \infty)$ should be $1$.

We could check whether it does, and if it doesn't, we could stretch or squeeze the function vertically until it does. This would require some complicated analysis, which, while fun, is exactly the kind of thing we are trying to avoid. To keep things simple, we will simply assume that the area under the whole curve, from negative to positive infinity, is some finite value. 

<aside>This is pretty well justified, since the function lies below $e^{-|x|}$, except for some finite amount around zero, and we know that exponential tails have finite area under the curve. 
</aside>

Whatever the area under the curve $e^{-\frac{1}{2}x^2}$ is, we will call that $\bc{z}$. By the rules of integration, multiplying our function by $1/\bc{z}$ will then yield a function that integrates to 1. Since $\bc{z}$ is a constant, we can say that the scaled function, which we will call $N_s$, is _proportional to_ the unscaled function:

$$ N_s(x) \propto e^{-\frac{1}{2}x^2}.$$

That is, $N_s$, which is a proper probability density, is a bit more complicated than $e^{-\frac{1}{2}x^2}$ but all that complexity is in some multiplicative constant. One other trick we can use to simplify things is to focus on the logarithm of the probability density. In our case, we get:

$$ \text{ln } N_s(x) \eqplus -\frac{1}{2} x ^2 $$

where the symbol $\eqplus$ means that both sides are equal except for some term ($- \text{ln}\,\bc{z}$ in this case) that doesn't depend on $x$.

With that, we have defined our _standard Gaussian_ in one dimension as precisely as we need. We don't have the complete functional form of the density,but we don't need it. We know the function exists, and we know what it looks like. We can now derive the full family of Gaussians.

<aside>I hope you'll agree that we've reduced the Gaussian to a pretty straightforward function.</aside>

First, to make the leap to _multivariate_ Gaussians, we define a single multivariate _standard_ Gaussian. In $n$ dimensions, we will call this distribution $N^n_s$. It's a distribution over vectors $\x$ of $n$ elements.

We define $N^n_s$ by a _sampling process_. To sample from the multivariate Gaussian in $n$ dimensions, we sample $n$ separate values $x_1$ though $x_n$ from the standard one-dimensional Gaussian $N_s$ (which we've just defined) and we concatenate them into a vector $\x$. To say that the random vector $\x$ is _distributed according to the standard Gaussian_ $N^n_s$ in $n$ dimensions, we write $\x \sim N^n_s$. This means that 

$$
\begin{pmatrix}x_1 \\ \vdots \\x_n\end{pmatrix} \;\text{with}\; x_i \sim N_s \p
$$

If $\x$ is distributed according to $N^n_s$, then each individual element of $\x$ is distributed according to $N_s$.

This is a complete definition of the standard Gaussian. We haven't defined a density function for $N^n_s$, but we've defined how to sample from it, which is all we need for a definition. The density function exists _implicitly_.

We can now ask ourselves what this density function looks like. We can derive the general form very easily from one basic property: that of _independence_. Since we sample the elements of $\x$ independently---how we sample one does not depend on how we sample the others---the probability density of the whole vector is the probability density of the elements multiplied together:

$$
N^n_s(\x) = p(x_1) \cdot p(x_2) \cdot \ldots \cdot p(x_n) \\
$$

Now, switching to log-probability densities, we can get a sense of the shape of the function. Remember that $\eqplus$ means equal up to some constant term, so we can remove any terms that don't depend on elements of $\x$.

$$\begin{align*}
\text{ln }N^n(\x) &= \text{ln }p(x_1) + \ldots + \text{ln }p(x) \\
 &= \text{ln }N_s(x_1) + \ldots + \text{ln }N_s p(x) \\
&\eqplus -\tfrac{1}{2}{x_1}^2 - \ldots -\tfrac{1}{2}{x_n}^2 \\
&= -\tfrac{1}{2}\left({x_1}^2 + \ldots +{x_n}^2\right) \\
&= - \tfrac{1}{2}\| \x \|^2\\
\end{align*}$$

<p>The last line follows from recognizing that the right hand side has become equal to the vector norm without the square root. That is, the  square of the norm: $\|\x\|^2 = {x_1}^2 + \ldots + {x_n}^2$. Taking the logarithm away again, we get</p> 

<p>$$
N^n_s(\x) \propto e^{-\tfrac{1}{2}\|\x\|^2} \p 
$$</p>

That is, the probability density at any point $\x$ depends only on the norm of $\x$---how far away from $\zero$ we are. Imagining this in two dimensions to start with, this tells us that all points with the same distance to $\zero$, any set of points that forms a _circle_, have the same density. The function also tells us that as the norms (and thus the circles) get bigger, the probability density of the points in that circle decays in the same way as the density decays in $N_s$: according to a negative squared exponential.

With that, we have a pretty clear picture of what the standard multivariate Gaussian looks like. It's rotationally symmetric, since all circles have the same density, and it decays in the same way as the bell shape of $N_s$. Putting this together, tells us that it should look, in two dimensions, like the function of $N_s$ rotated about the origin.

<figure class="centering wide">
<img src="/images/gaussians/bivariate.svg" class="two-thirds">
</figure>

In two dimensions, the set of all points that have the same density---like one of the <span class="gc">the circles</span> in the picture above---is called a _contour line_. The standard Gaussian is called a _spherical_ distribution because all its contour lines are circles (two-dimensional spheres). In higher dimensions, where things are more difficult to visualize, the same principle holds: the density of $\x$ under $N^n_s$ depens only on the norm of $\x$, so the set of all points with the same density is the set of all points with the same norm, a (hyper)-sphere. These spheres are called the _contour surfaces_ of $N_s^n$. The principle of contour surfaces will be very helpful going forward, in building up an intuition for what general Gaussians look like.

Moving forward, we will drop the <span class="rc">superscript</span> from $N^\rc{n}_s$ when the dimensionality is clear from context. Likewise, we will use $N^\rc{1}_s$ to emphasize that we are talking about the one-dimensional Gaussian if necessary.

### A family of Gaussians

Next, let's build the rest of the family. We do this by taking the standard Gaussian $N_s$ in $n$ dimensions, and _transforming_ it linearly. We will start, again, with a sampling process.

We sample an $n$-dimensional vector $\s$ from $N_s$ and apply any linear operation $\x = \bc{\A}\s + \oc{\t}$ with a matrix $\bc{\A} \in \mR^{m \times n}$ and $\oc{\t} \in \mR^m$. This results in a random vector $\x$, since part of this process (the sampling of $\s$) is random.

Now, we _define_ a Gaussian to be any distribution that results from this process, for some choice of $\bc{\A}$ and $\oc{\t}$. We will, refer to such a Gaussian as $N(\bc{\A}, \oc{\t})$.

<aside>Note that $\s$ is an $n$-dimensional vector and $\x$ is a $m$-dimensional vector. $\s$ and $\x$ often have the same dimension, but it's not necessary.  
</aside>

We have defined how to sample a point from $N(\bc{\A}, \oc{\t})$, so we have fully defined this Gaussian. Obviously, it would be interesting to know what the resulting density function looks like, but that doesn't need to be _its definition_. We can work that out from how we defined the sampling process. We'll try to do that, and to work out some properties of the distribution we have now defined, without getting into the complicated formula for the density function. 

For the time being, assume that $\bc{\A}$ is square and invertible, so that no two points are mapped to the same point by $\bc{\A}$.

<p markdown="0">To help us understand the shape of the density function, we can think back to the contour circles we defined for $N_s$, let's say the one for $\|\x\| = 1$. Each of the points $\x$ in this circle could be sampled from $N_s$ and transformed by $\bc{\A}$ and $\rc{\t}$. What happens to a circle when all its points are transformed by a matrix? It becomes an <em>ellipse</em>. What's more, the relative lengths of vectors are maintained under matrix multiplication&mdash;if $\|\a\| < \|\b\|$ then $\|\bc{\A}\a\| < \|\bc{\A}\b\| $&mdash;so any point inside the circle (any point with $\|\x\| < 1$) before the transformation is inside the <em>ellipse</em> after the transformation. Any point outside the circle before, is outside the ellipse after.</p>

<figure class="centering">
<img src="/images/gaussians/circle-ellipse.svg" class="full">
<figcaption>Transforming the standard Gaussian by an affine transformation turns the contour circles into contour ellipses. Any <span class="bc">point</span> inside one of the circles before the transformation will be inside the corresponding ellipse after.     
</figcaption>
</figure>

This means that the amount of probability mass captured inside the unit circle before the transformation, is captured inside the corresponding ellipse after the transformation. After all, when we are sampling, these are the same points: if p is the probability of sampling some $\s$ inside the circle before the transformation, then that is the probability of sampling some $\x$ inside the corresponding ellipse.

For higher dimensions, the circles becomes hyper-spheres and the ellipses become ellipsoids, but the basic intuition stays the same.

<p>If $\bc{\A}$ is not square and invertible, the picture is a little more complex. If, for example $\s$ is three-dimensional and $\x$ is two-dimensional, then we are taking all points $\s$ on a sphere, and projecting them down to two dimensions. The result is still an ellipse in two dimensions, but not all points are on the edge of the ellipse anymore. Some are in the interior. This means we no longer have the property that if $\|\a\| < \|b\|$ then $\|\bc{\A}\a\| < \|\bc{\A}\b\| $. However, we will be able to show in a bit that this distribution is equivalent to one defined with a two-dimensional $\s$ and a square, invertible $\bc{\A}$. Thus, this messiness isn't really any cause for concern. We can still call this a Gaussian, and think of it as being mapped from $N_s$ in a neat way that maps contour circles to contour ellipses.</p>

<figure class="centering">
<img src="/images/gaussians/2s-to-3d.png" class="full">
<figcaption>If the transformation is from three to two dimensions, points on the sphere (left) may end up inside the corresponding ellipse (right).    
</figcaption>
</figure>

### Spherical, diagonal and degenerate Gaussians

Before we move on, it pays to investigate what kind of family members this family of ours has. We'll look at three special types of Gaussians: spherical, diagonal and degenerate.

The simplest type of Gaussian is the **spherical Gaussian**, also known as an _isotropic_ Gaussian. This is the special case when the contour surfaces, which are spheres before the transformation, are still spheres after the transformation. 

<aside markdown="1">We will use the word "spheres" to refer to circles, spheres and hyper-spheres.
</aside>

This happens only when we expand $\s$ uniformly in all directions. Or, in other words, when we multiply it by a scalar. That is, if

$$ \x = \bc{\sigma} \s + \oc{\t} $$

for some scalar $\bc{\sigma}$, then the distribution on $\x$ is a sperical Gaussian. To fit this into the standard affine transformation framework, we can insert an identity matrix and get:

$$ \x = \bc{\sigma \I} \s + \oc{\t} \p $$

This shows that the matrix $\bc{ \sigma\I}$---a diagonal matrix with $\bc{\sigma}$ at every point on the diagonal---is the matrix we should multiply by to get a spherical Gaussian.

<aside>We usually call $\bc{\sigma}$ the standard deviation of the Gaussian, and $\bc{\sigma}^2$ the variance. Technically, a multivariate distribution has a variance in each direction, as well as many covariances, but in this case, the variances are all equal to $\bc{\sigma}^2$ and the covariances are all zero. If we want to call $\bc{\sigma}$ the standard deviation, we should pick a positive value: a negative value works in the affine transformation, but then the standard deviation is its absolute value.
</aside>

The spherical Gaussians are particularly simple, and using them will simplify many aspects of the use of Gaussians. In machine learning, you will see them used in, for example, diffusion models.

A class that allows for a bit more variation is the **diagonal Gaussian**. Here, we again use a diagonal matrix in our affine transformation, but we let the diagonal values vary. That is, we define some _vector_ $\bc{\sig}$, and we [place these values along the diagonal of a matrix](../diagonal-matrix). That matrix then becomes our transformation matrix.

A diagonal $\gc{\D}$ matrix represents a particularly simple transformation. The dimension $i$ is simply multiplied by the value $\gc{D}_{ii}$, ignoring whatever happens elsewhere in the matrix.

Visually, the result is that the circles or spheres in the standard normal distribution are stretched into ellipses, but _only along the axes_. Any ellipse is allowed, but the major axis of the ellipse (the line from tip to tip) has to point along one of the axes of our coordinate system.

Practically, this means that the distribution has zero _correlation_ between the elements of $\x$. If I tell you the value of $x_1$, it carries no information about the value of $x_2$. Study the example of the heights and widths of the soldiers above to see the opposite case: the points are roughly on a diagonal line, so if I tell you that a particular soldier has a certain height, you can make an informed guess about what their weight is likely to be. For that sort of reasoning, you need more than a diagonal Gaussian. You get this by playing non-zero values on the off-diagonal elements of your transformation matrix.

The final special case we will discuss is the **degenerate Gaussian**. This is what happens when, for example, we map a one-dimensional $\s$ to a two-dimensional $\x$.

<figure class="centering">
<img src="/images/gaussians/family-members.svg" class="full">
</figure>

Since all points $\s$ lie on a line, the resulting points $\x$ can only lie on a line, even though they're in a two-dimensional space. We've decided to call this a Gaussian, and along the line, you will see the familiar bell shape, but it's fundamentally different from a true two-dimensional Gaussian like $N^2_s$, that fills all of $\mR^2$.

We call this a degenerate Gaussian. If $\x$ has $d$ dimensions, the _support_ of the Gaussian, the set of all points that have non-zero density isn't the whole of $\mR^d$, in fact, it's a linear subset of it (a hyperplane).

Within the support, the distribution looks like a normal Gaussian: a bell shape and non-zero probability density everywhere, decaying squared-exponentiallyas we move away from the mean. We call a Gaussian that does have a non-zero density everywhere a _non-degenerate_ Gaussian, or a _Gaussian with full support_.  

### Means

Next, let's look at the properties of these Gaussians. First, the mean $\bar\x$. If we average a bunch of samples from $N_s$ and let the number of samples go to infinity, where do we end up? This is called the [expected value](../expectation): $\bar\x = E_{\x\sim N_s} \x $

<aside>Note that we're not talking about the <em>parameters</em> of these Gaussians. The parameters are how we define a distribution. We've done that with $\bc{\A}$ and $\oc{\t}$. What we are talking about here are its <em>properties</em>, such as the mean. Normally, you would use the mean as the parameter of a Gaussian, but we're taking a different path here. 
</aside>

The definition of the expected value for continuous functions like these involves an integral, but happily, we don't need to open it up. We just need to remember some key properties:
* Expectation distributes over (vector) sums. That is $E_\x \left (f(\x) + g(\x)\right) = E_\x f(\x) + E_\x g(\x)$.
* If we have (matrix) multiplication or (vector) addition inside the expectation, we can move it outside. That is $$E_\x \oc{\t} + \bc{\A}\x  = \oc{\t} + \bc{\A}E_\x \x$$.

Let's start with the mean of the standard Gaussian. You may be able to guess what this should come out to. The density peaks at $\zero$, and the function is radially symmetric around $\zero$. If we think of the mean as the center of mass of the density function, there isn't really any other point that could qualify.

It's relatively simple to show that this guess is correct, because the components of $\x$ are independently drawn. If we ask for the $i$-th element of the mean, we need only look at the $i$-th elements of our samples. These are all samples from $N^1_s$, so the mean for that component is the mean of $N^1_s$. $N^1_s$ is symmetric around $0$, so its mean must be $0$.
In short, the mean for the standard Gaussian is the zero vector.

<aside>If the argument for the mean of $N^1_s$ being $0$ is too hand-wavy for you, you can show it more rigorously by unpacking the expectation into an integral $E x = \int_{-\infty}^\infty x\,p(x)\,dx = \frac{1}{z}\int_{-\infty}^\infty x e^{-\tfrac{1}{2}x}$. You can then break this up into two integrals to the left and right of $0$: $E x \propto  \int_0^{\infty} x e^{-\tfrac{1}{2}x} + \int_{-\infty}^0 x e^{-\tfrac{1}{2}x} = \int_0^\infty  x e^{-\tfrac{1}{2}x} - \int_0^{\infty} x e^{-\tfrac{1}{2}x} = 0$.
</aside>

What about the mean of our transformed Gaussian $N(\bc{\A}, \oc{\t})$? If we use the basic poperty that the expectation is a linear function--that is, we can move additions and multiplications outside the expectation)---we can show very simply that the mean is equal to the translation vector in our transformation, $\oc{\t}$:

<p>$$E_{\x\sim N(\bc{\A}, \oc{\t})} \x = {E}_{\s \sim N_s} \oc{\t} + \bc{\A}\s= \oc{\t} + \bc{\A} E_{\s} \x = \oc{\t} + \kc{\zero} \p$$
</p>

### (Co)variances

#### The variance of $N^1_s$

The variance is a measure of how widely the sampled points are spread about the mean. We'll need to work out the variance of $N^1_s$ first. It is defined as the expected value of the squared distance to the mean: $E (x - \bar x)^2$. Since the mean is $0$, we are just looking for the expected value of $x^2$.

We could solve this by unpacking this expectation into its integral definition and working it out, but that requires a lot of heavy math. Happily, there's a nifty trick that allows us to minimize the amount of time we need to spend in integral-land. First, let's see what the integral is that we're looking for. To make things easier to follow, I'll give away that the answer is 1, and we'll work towards that.

First, we'll call the unscaled density function $f$. That is 

$$f(x) = e^{-\tfrac{1}{2} x} \;\text{ and }\; p(x) = \tfrac{1}{\bc{z}}f(x) \p$$

Then, the variance is 

$$\begin{align}
E x^2 = \int_{-\infty}^\infty p(x)x^2 dx  = \tfrac{1}{\bc{z}} \gc{\int_{-\infty}^\infty x^2f(x) dx} \p \tag{var}
\end{align}$$

To show that the variance of the standard normal distribution is 1, we need to show that the integral marked <span class="gc">in green</span> at the end is equal to $\bc{z}$ (which is the name we gave to the area under the curve of $f$). This is where we can use a trick.

The trick requires us to take the second derivative of $f$. We have 

$$\begin{align*}
f'(x) &= -x e^{-\tfrac{1}{2}x^2} \\
f''(x) &= (x^2 - 1) e^{-\tfrac{1}{2}x^2} = \gc{x^2 f(x)} - f(x)\p \\
\end{align*}$$

Note that the function we're taking the integral for $\gc{x^2f(x)}$ has popped up on the right-hand-side. If we re-arrange this last line, we see

$$
\gc{x^2 f(x)} = f''(x) + f(x) \p
$$

Filling this into the integral, we get 

$$
\gc{\int_{-\infty}^\infty x^2f(x) dx} = \int_{-\infty}^\infty f''(x) + f(x) dx = \rc{\int_{-\infty}^\infty f''(x)dx} + \oc{\int_{-\infty}^\infty f(x) dx} \p
$$

<p>Now, the <span class="rc">first term</span>, $\int_{-\infty}^\infty f''(x)$, is equal to 0. We solve it by taking the antiderivative $f'(x)$ and working out $f'(\infty) - f'(-\infty)$. The derivative of $f$ is 0 at both ends, since the function flattens out towards infinity, so the answer is $0 - 0 = 0$.</p>

That leaves us with <span class="oc">the second term</span>, $\int_{-\infty}^\infty f(x) dx$, which is exactly the definition of $\bc{z}$. So we have worked out that 

$$\gc{\int_{-\infty}^\infty x^2f(x) dx} = \bc{z}$$

which, if we fill it in above---in equation (var)--- shows that the variance of $N^1_s$ is 1. 

<aside markdown="1">You may wonder if something slightly magical has happened here. We designed $N^1_s$ so that the inflection points, the zeros of the second derivative, were exactly 1 unit away from the origin. Now, when we work out the variance, that turns out to be exactly one unit as well. Is that a coincidence? It isn't. The relation between the variance and the second derivative can be explained by the [moment generating function](./moment-generating-function), a different way to define probability distributions.   
</aside>

Now that we know what the variance of the standard, one-dimensional Gaussian is, the hard work is done. The parameters of the rest of the Gaussians follow straightforwardly.

#### The covariance

For a multivariate distribution on a vector $\x$ there are many variances to capture. There is first the variance along each dimension $x_i$, but also the <em>co</em>variance of every element $x_i$ with every other element $x_j$. 

The [covariance matrix](covariance-matrix) $\bc{\Sig}$ captures all of this. For a random vector $\x$ this is defined as the expected outer product of the deviation from the mean $E  (\bar\x - \x)(\bar\x - \x)^T$. This is a square matrix. It contains all the variances of the individual elements $x_i$ of $\x$ along its diagonal, and it contains all the covariances between elements $x_i$ and $x_j$ on its off-diagonal elements.

Let's start with the covariance matrix of the standard Gaussian $N_s$. We know that in $\bc{\Sig}$, the diagonal elements are the variances of $x_i$. These are $1$, because we sampled them independently from $N_1$, which has variance 1. The off-diagonal elements are the co-variances between any two of the elements $x_i$ and $x_j$. We know these are $0$, because we sampled each $x_i$ independently. So, in a phrase, the covariance matrix of $N_s$ is the identity matrix $\I$. 

Now for the rest of the Gaussians. The covariance matrix of $\x = \bc{\A}\s + \rc{\t}$ is defined as the expected outer product of the vector $\x - \bar\x$, where $\bar\x$ is the mean of $\x$. We already know that $\bar\x = \oc{\t}$, so we are looking for the expected outer product of $\x - \bar\x = \bc{\A}\s \kc{\;+\;\t - \t}$. This gives us. 

$$ \begin{align*}
E_{\x\sim N(\bc{\A}, \oc{\t})} (\x-\bar\x)(\x-\bar\x)^T  &= E_{\s \sim N_s} (\bc{\A}\s)(\bc{\A}\s)^T \\
& = E \bc{\A}\s\s^T\bc{\A}^T = \bc{\A} (E \s\s^T)\bc{\A}^T\\ 
& = \bc{\A} \I\bc{\A}^T = \bc{\A\A}^T \p 
\end{align*} $$

Note that in the second line we are again using the fact that the expectation is a linear function, so we can take matrix multiplications outside of the expectation (on the left and on the right).

So, to summarize, if we build our Gaussian by transforming $N_s$ with a transformation matrix $\bc{\A}$ and a translation vector $\oc\t$, we end up with a distribution with mean $\oc\t$ and covariance matrix $\bc{\Sig} = \bc{\A\A^T}$. 

We can now make the leap from _properties_ to _parameters_. Instead of identifying a particular Gaussian by the transformation $\bc{\A}, \oc{\t}$ we used to create it, we can identify it by the covariance $\bc{\Sig}$ and mean $\oc\t$ of the resulting distribution.

The Gaussian we get from the transformation $\bc{\A}\x + \oc{\t}$ on the standard normal distribution is called $N(\oc{\bmu}, \bc{\Sig})$, with $\oc{\bmu} = \oc{\t}$ and $\bc{\Sig} = \bc{\A\A}^T$. 

<aside>Note that when we parametrize by a function, we put the matrix first, and when we parametrize by the mean and covariance we put the (mean) vector first. It's a little overloaded, but it's usually clear from context what the idea is.
</aside>

This also means that $N_s = N(\oc{\zero}, \bc{\I})$, which is how we'll refer to it from now on.

<aside>You can also keep thinking of the Gaussians as being parametrized by $\bc{\A}$ and $\oc{\t}$ directly, but take into account that different transformation matrices $\bc{\A}$ may lead to the same Gaussian. For instance, any rotation of $N(\oc{\zero}, \bc{\I})$ will simply give you $N(\oc{\zero}, \bc{\I})$ again. The benefit of parametrizing by $\bc{\Sig}$ is that we get exactly one unique Gaussian for every single $\bc{\Sig}$.    
</aside>

#### Of spherical, diagonal and degenerate Gaussians 

It's worth thinking briefly about what the covariance matrix looks like for the three special categories of Gaussian that we discussed earlier: spherical, diagonal and degenerate. 

For the spherical and the diagonal Gaussian, remember that $\bc{\A}$ is a diagonal matrix. This means that the covariance matrix $\bc{\A}\bc{\A}^T$ is equal to $\bc{\A}\bc{\A}$, since $\bc{\A}$ is symmetric, so $\bc{\A}^T = \bc{\A}$. The product of two diagonal matrices is very simple: it is another diagonal matrix, with at each point along the diagonal, the product of the corresponding elements of the two matrices. 

<aside>In other words, for diagonal matrices, the matrix product coincides with the element-wise product.</aside> 

The result is that for a spherical Gaussian with standard deviation $\bc{\sigma}$, while $\bc{\A}$ is a diagonal matrix with $\bc{\sigma}$ along the diagonal, the covariance matrix is a diagonal matrix with $\bc{\sigma}^2$ along the diagonal. This is of course, the variance.

<aside>This is worth remembering: when we take the transformation perspective, we always multiply by the standard deviation. The transformation matrix $\bc{\A}$ is the generalization of the standard deviation and its "square" $\bc{\A}\bc{\A}^T$ is the generalization of the variance.
</aside>

Likewise for the diagonal Gaussian, we have the standard deviations along the diagonal of $\bc{\A}$, and their squares, the variances, along the diagonal of the covariance $\bc{\A}\bc{\A}^T$. 

In both cases, the covariances (the off-diagonal elements of $\bc{\A}^T\bc{\A}$) are zero. This shows that there is no correlation between the axes: if our Gaussian is diagonal, we cannot predict the value of one dimension from one of the other dimensions.

Finally, let's look at the degenerate Gaussians. We get a degenerate Gaussian if $\bc{\A}$'s _[rank](rank)_ is less than the output dimension. Or, put differently, for $\x \in \mR^d$, if it has fewer than $d$ linearly independent columns. If this happens---say there are $k$ linearly independent columns in $\bc{\A}$ and the rest can be expressed as a linear combination of these $k$ columns---then any $\s$ multiplied by $\bc{\A}$ is mapped to a space of dimension $k$, since the multiplication is a linear combination of $k$ vectors. 

We can get some insight into the consequences by looking at the [singular value decomposition](../svd) (SVD) of $\bc{\A}$. 

<aside>The SVD comes up once or twice in this article. If you're not familiar with it you can skip these bits.
</aside>

Let $\bc{\A} = \rc{\U}\gc{\Sig}\rc{\V}^T$ be the full SVD of $\bc{\A}$. If $\bc{\A}$ maps its input into an output of dimension $k$, then the diagonal of $\gc{\Sig}$, containing the singular values, has $k$ non-zero elements. 

<aside>Each singular value is mapped to one output dimension by $\rc{\U}$, all of which are orthogonal to one another. If $\text{diag }\gc{\Sig}$ had more than $k$ non-zero values, there would be more than $k$ output dimensions.</aside>

To see the effect on the covariance matrix, we can fill in the SVD. You may have seen this before: filling in the SVD of $\bc{\A}$ in the Gram matrix, and simplifying, gives us the eigendecomposition of the Gram matrix.

$$\begin{align*}
\bc{\A}\bc{\A}^T &= \rc{\U}\gc{\Sig}\rc{\V}^T\left (\rc{\U}\gc{\Sig}\rc{\V}^T\right)^T \\
&= \rc{\U}\gc{\Sig}\rc{\V}^T\rc{\V}\gc{\Sig}^T\rc{\U}^T \\
&= \rc{\U}\gc{\Sig}\gc{\Sig}^T\rc{\U}^T \\
&= \rc{\U}\gc{\Sig}^2\rc{\U}^T \p
\end{align*}$$

Note that the square of a diagonal matrix like $\gc{\Sig}$ just consists of a diagonal matrix with the squares of the original matrix on the diagonal. That means that $\gc{\Sig}^2$ also has $k$ non-zero values.  

What does this tell us? Since this last line is the eigendecomposition, the diagonal values of $\gc{\Sig}^2$ are the [eigenvalues](eigenvalues) of the covariance matrix. They tell us how much the matrix $\bc{\A}\bc{\A}^T$ stretches space along the eigenvectors. If any of the eigenvalues are zero, as they are here, then along those directions, $\bc{\A}\bc{\A}^T$ _collapses_ space. By multiplying with zero, a whole dimension is collapsed into a single point. The result is that $\bc{\A}\bc{\A}^T$ is _singular_---the opposite of invertible.

So with that slight detour into singular value decompositions, we can characterize the covariance matrices of degenerate Gaussians. A covariance matrix is singular [if and only if](/iff) the Gaussian is degenerate. If the Gaussian has full support, its covariance matrix is invertible. 

## Fundamental properties of Gaussians

Now that we have built up a geometric view of Gaussians, we can work out pretty much any property we need. Let's look at some examples. First, we know that linear transformations turn the standard Gaussian into another Gaussian. What happens if we linearly transform other Gaussians?

### Linear transformations

<div class="theorem"><strong class="gc">Linear transformation of Gaussians</strong> Let $\x$ be a random variable with any Gaussian distribution $\x \sim N(\oc{\bmu}, \bc{\Sig})$. Apply to $\x$ any linear operation $\y = \gc{\A}\x + \rc{\t}$ with a matrix $\gc{\A}$ and vector $\rc{\t}$. Then $\y$ has a Gaussian distribution. Specifically,
$$
\y \sim N(\gc{\A}\oc{\bmu} + \rc{\t}, \gc{\A}\bc{\Sig}\gc{\A}^T) \p
$$
</div>
<div class="proof"><span class="kc">Proof.</span> We know, from our construction of the Gaussians, that there is some $\bc{\B}$ and $\oc{\q}$ so that $\x = \bc{\B}\s + \oc{\q}$ with $\s = N(\zero, \I)$ gives us $\x \sim N(\oc{\mu} = \oc{\q}, \bc{\Sig} = \bc{\B\B}^T)$. Filling in this operation into the one from the theorem, we get

$$
\y = \gc{\A}(\bc{\B}\s + \oc{\q}) + \rc{\t} =  \gc{\A}\bc{\B}\s + \bc{\A}\oc{\q} + \rc{\t} \p
$$

This expresses $\y$ as a linear transformation of $\s \sim N(\zero, \I)$ with transformation matrix $\gc{\A}\bc{\B}$ and translation vector $\bc{\A}\oc{\q}+\rc{\t}$, so $\y$ has a Gaussian distribution. Moreover, we know that its parameters are 

$$
\oc{\bmu}_\y = \gc{\A}\oc{\q} + \rc{\t} = \gc{\A}\oc{\bmu} + \rc{\t}
$$

and 

$$
\bc{\Sig}_\y = \gc{\A}\bc{\B}(\gc{\A}\bc{\B})^T = \gc{\A}\bc{\B\B}^T\gc{\A}^T = \gc{\A}\bc{\Sig}\gc{\A}^T \p 
$$
<span class="qed"></span>
</div>

<span class="clearing"></span>

Note, again,  that this result holds, **even if $\gc{\A}$ is not a square matrix**. This leads directly to some very useful corollaries. 

<div class="theorem"><strong class="gc">Subvectors of a Gaussian vector are Gaussian.</strong>
If we sample $\x$ from any Gaussian, and select one or more of its elements, the resulting vector $\x'$ is also distributed according to a Gaussian.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Selecting elements of a vector can be done by a matrix multiplication. For instance, the matrix $(0, 1, 0)$ selects the middle element of a three-dimensional vector.
<span class="qed"></span>
</div>

<strong>question:</strong> What does this look like if I select two elements? What are the parameters of the resulting distribution. What should I expect the resulting distribution to be if I select _all elements_? Can you show that this expectation is correct? 

One consequence is that if you project a Gaussian onto one of the axes, the result is a univariate Gaussian along that axis. In terms of probability, this corresponds to _taking a marginal_. For example, if I measure the height and weight in a population of female soldiers, I get a bivariate distribution which is highly correlated (you can predict one measurement from the other pretty well) as we saw above. The above result shows that if I know the combined measurement is Gaussian, then dropping one of the two dimensions automatically results in a Gaussian as well.

<aside>This is slightly different from <em>conditioning</em> on one of the values. For example, looking at all soldiers whose height is 192cm, and wondering whether the distribution on their weights is Gaussian. We will show below that this is also the case.   
</aside>

With the example in the proof, we sample $\x$ from some Gaussian, and then only look at the distribution on $x_2$, disregarding the rest of the vector. If you followed the definition of marginalization, you would end up with a formula like 

$$
p(x_2) = \int_{x_1, x_3} N(x_1, x_2, x_3 \mid\oc{\bmu}, \bc{\Sig})\, d x_1x_2 
$$

for which you would then have to fill in that horrible formula for $N$ and work out the integral. Ultimately, you would end up with the result that $p(x_2)$ is a Gaussian, with some particular parameters, but it would be a lot of work.

This shows the benefit of our geometric construction of the Gaussians. With a little thinking we can almost always leave $N$ be and never open up the box. We just assume that it's some affine transformation of the standard Gaussian and build up from there. 

### If you can linearly transform it to a Gaussian, it's a Gaussian

We showed above that if you linearly transform a Gaussian, the result is another Gaussian. Next, it's useful to show that, under some mild assumptions, this also works the other way around. If we are given a distribution $p$ and we can apply a linear transformation to turn it into a Gaussian, then $p$ is also a Gaussian.

<div class="theorem"><strong class="gc">Linear transformation <em>to</em> Gaussians</strong> Let $\x \sim p$. If there exists a linear transformation $\y = \gc{\A}\x + \oc{\t}$ so that $\y$ is a Gaussian, then so long as the columns of $\gc{\A}$ are linearly independent, $p$ is Gaussian. 
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Since $\y$ is Gaussian, there is a transformation $\y = \bc{\B}\s + \oc{\q}$ with $\s \sim N(\zero, \I)$. This gives us

$$\begin{align*}
\gc{\A}\x + \rc{\t} &= \bc{\B}\s + \oc{\q} \\
\gc{\A}\x &= \bc{\B}\s + \oc{\q} - \rc{\t}\\
\gc{\A}^T\gc{\A}\x &= \gc{\A}^T\bc{\B}\s + \gc{\A}^T(\oc{\q} - \rc{\t})\\
\end{align*}$$

The matrix $\gc{\A}^T\gc{\A}$ on the left is called the [Gram matrix](../gram-matrix) of $\gc{\A}$. If $\gc{\A}$'s columns are linearly independent, then the Gram matrix is invertible. This means we can multiply both sides by the inverse of the Gram matrix and get 

$$
\x = \gc{\A}^\dagger\bc{\B}\s + \gc{\A}^\dagger(\oc{\q} - \rc{\t}) \;\text{ with }\; \gc{\A}^\dagger = (\gc{\A}^T\gc{\A})^{-1}\gc{\A} \p
$$

The right-hand-side, while complicated, is an affine transformation of a standard normally distributed vector $\s$, so $\x$ is Gaussian.
<span class="qed"></span>
</div>

<aside>You might wonder what goes wrong if $\gc{\A}$'s columns aren't linearly independent. A simple example is the matrix that picks out the first dimension from $\x$ and discards the rest, returning a one dimensional $\y$ (that is, the one-hot vector with a 1 in the first element). If the first dimension of $\x$ is sampled from a Gaussian, the rest can be anything, since it is discarded anyway. This is the key issue: a matrix with linearly dependent columns may "discard information" from $x$ and pick out only the Gaussian parts. The best we can say in that case is that the part of $\x$ that $\gc{\A}$ selects is Gaussian.
</aside>

### There is always an _invertible_ transformation

We have defined a Gaussian as a distribution resulting from _any_ affine transformation $\x = \bc{\A}\s + \oc{\t}$ of standard-normal noise $\s$. Even if a $\bc{\A}$ is low-rank, so that the resulting Gaussian only covers a subspace of the space that $\x$ is embedded in.  

<aside markdown="1">There is an extreme edge case here, in the form of the zero matrix which compresses everything to one point. We'll just make that "[distribution](dirac-delta)" an honorary, if slightly ill-behaved Gaussian.
</aside>

Let's focus on those Gaussians that are not degenerate in this way: assume, for an $n$-dimensional vector $\x$, that the Gaussian $\x = \gc{\A}\s + \rc{\t}$ assigns every point in $\mR^n$ a non-zero probability density.

<aside>Remember that we call this a Gaussian <em>with full support</em>.
</aside>

$\s$ might still be of a higher dimensionality than $\x$, and $\gc{\A}$ may thus still not be invertible. In such a case, we can always find a different parametrization of the same Gaussian using an invertible matrix and an $\s$ with the same dimension as $\x$.

<div class="theorem"><strong class="gc">Invertible parametrization</strong> Let $\x = \bc{\A}\s + \oc{\t}$ be any non-degenerate Gaussian. Then, there are parameters $\bc{\B}$, $\oc{\u}$ such that $\bc{\B}$ is square and invertible and $\x = \bc{\B}\s' + \oc{\u}$ with $\s' \sim N(\zero, \I)$ describes the same Gaussian.    
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Let $k$ be the dimensionality of $\x$. If $\bc{\A}$ is taller than wide, it can not provide full support, so we may dismiss this case. If $\bc{\A}$ is square and provides full support, then it must be invertible, so we can set $\bc{\A} = \bc{\B}$.

We are left with the case that $\bc{\A}$ is rectangular and wider than tall. Let $\gc{\A} = \rc{\U}\gc{\Sig}\rc{\V}^T$ be the full singular value decomposition of $\bc{\A}$. This gives us

$$\x = \rc{\U}\gc{\Sig}\rc{\V}^T\s + \oc{\t} \p$$

We can rename $\s' = \rc{\V}^T\s$. Since $\rc{\V}$ is an orthogonal transformation (a combination of rotations and flips), $\s'$ is still standard-normally distributed. 

<aside>This follows from the fact that the standard normal distribution is symmetric under rotations and flips. You can prove this fact more rigorously with the change-of-variables trick in the last section.
</aside>

This gives us

$$\x = \rc{\U}\gc{\Sig}\s' + \oc{\t} \p$$

<figure class="centering">
<img src="/images/gaussians/svd-slice.svg" class="three-quarters">
<figcaption>(left) A multiplication diagram for the operation above (with the $+ \oc{\t}$ term omitted). (right) The reduced version we will derive below.</figcaption>
</figure>

<p>From the multiplication diagram, we see that $\gc{\Sig}$ contains a number of zero columns which essentially ignore the corrsponding dimensions of $\s'$. Call $\s'_k$ the vector $\s'$ with these dimensions removed, and call $\gc{\Sig}_k$ the matrix $\gc{\Sig}$ with the corresponding columns removed. This gives us</p>

$$\x = \rc{\U}\gc{\Sig}_k\s'_k + \oc{\t} \p $$

We set $\bc{\B} = \rc{\U}\gc{\Sig}_k$ to obtain the required result. Note that the diagonal of $\gc{\Sig}$ must contain all non-zero elements, or we would not have full support, so that it must be invertible. $\rc{\U}$ is also invertible, since it is orthogonal, and multiplying two invertible matrices together results in another invertible matrix.
<span class="qed"></span>
</div>

If all that seems a bit technical, the key idea is that an affine transformation that results in full support on $\mR^k$ must map $k$ dimensions in the input to $k$ dimensions in the output. The rest are dimensions that are ignored (they are in the _null space_ of $\gc{\A}$). The trick is then to isolate just those $k$ dimensions, and to ignore the rest. 

The singular value decomposition is just a handy tool to isolate the right dimensions. 

### The sum of two Gaussians is a Gaussian

Let $\a$ be a vector sampled from one Gaussian and $\b$ be a vector sampled from another Gaussian. Sum them together and return the result $\c = \a + \b$. What is the distribution on $\c$? 

<aside>That is, if somebody told us that they had done this, but didn't tell us the values of $\a$ and $\b$. What probability density should we assign to them getting a particular value of $\c$?</aside>

It may not surprise you to learn that the result is another Gaussian. 

It pays to be careful here. If I give you the probability density functions of two Gaussians, and you create a new probability density function by making a weighted sum of these two densities for a given value $\x$, then the result of that is a mixture-of-Gaussians, which is usually, decidedly _not_ Gaussian. What we are talking about here is _sampling_ from two different Gaussians, and then summing the sampled values.   

**question**: I am a teacher and my class has students from two different schools in equal proportion, with different mean grades. The probability over the whole class of someone scoring a grade of $6$ is the average of the probability that someone from school 1 scores a $6$ and the probability that someone from school 2 scores a $6$. Is the result necessarily a Gaussian? Consider what the distribution looks like if the mean grades for the two schools are very far apart. 

**question**: I pair up each student from school 1 with a student from school 2. For one such pair, I test both, and average their grades. What is the distribution on the average I get? Is it Gaussian?

We can prove this property using our geometric construction, but we have to be a little bit more inventive than before. The key is to realize that the _concatenation_ of $\a$ and $\b$ has a Gaussian distribution and that given this concatenation, the sum is just an affine operation.

We'll first show that the concatenation of two Gaussians yields a Gaussian. This is a very intuitive result, that you may well be willing to accept without proof, but it doesn't hurt to be rigorous. 

<div class="theorem" markdown="1"><strong class="gc">Lemma. Concatenation of Gaussian variables</strong> Let $\a$ and $\b$ be vectors

$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{, }\\ 
\b &\sim N(\oc{\bnu}, \bc{\T}) \text{ and }\\
\c &= \begin{pmatrix}\a \\ \b \end{pmatrix} \p 
\end{align*}$$

That is, $\c$ is the concatenation of $\a$ and $\b$. Then $p(\c)$ is Gaussian with mean 
$$
\begin{pmatrix}\oc{\bmu} \\ \oc{\bnu} \end{pmatrix}
$$ 
and covariance 
$$
\begin{pmatrix}
\bc{\Sig} & \zero \\
\zero & \bc{\T}
\end{pmatrix} \p
$$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> First, we rewrite $\a$ and $\b$ as affine transformations of standard normal noise:

$$\begin{align*}
\a &= \bc{\A}\s + \oc{\bmu} \\
\b &= \bc{\B}\t + \oc{\bnu} \p
\end{align*}$$

Where $\s$ and $\t$ are standard normal and $\bc{\Sig} = \bc{\A\A}^T$ and $\bc{\T} = \bc{\B\B}^T$. Then, $\c$ can be written as

$$
\c = \begin{pmatrix}\a \\ \b\end{pmatrix} = \begin{pmatrix} \bc{\A}\s + \oc{\bmu} \\ \bc{\B}\t + \oc{\bnu} \end{pmatrix}  = \bc{\C} \begin{pmatrix} \s \\ \t\end{pmatrix} + \begin{pmatrix} \oc{\bmu} \\ \oc{\bnu}\end{pmatrix} 
$$

where 

$$
\bc{\C}  = \begin{pmatrix}\bc{\A} & \zero \\ \zero & \bc{\B} \end{pmatrix} \p
$$

<p>Now, note that the vector $\begin{pmatrix} \s \\ \t\end{pmatrix}$ consists only of univariate, standard-normal elements. In other words, this vector is a standard-normal sample itself. This means that $\c$ has a Gaussian distribution. From the affine transformation above, we see that its mean is the concatenation of $\oc{\bmu}$ and $\oc{\bnu}$ as required. Its covariance is $\bc{\C\C}^T$, which the following diagram shows is equal to the covariance in the proof statement.</p>

<figure class="centering">
<img src="/images/gaussians/concatenate.svg" class="three-quarters">
</figure>

<span class="qed"></span>
</div>

Using this lemma, the result for summing Gaussians follows almost directly.

<div class="theorem" markdown="1"><strong class="gc">Theorem. Sum of Gaussian variables</strong> Let 

$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{, }\\ 
\b &\sim N(\oc{\nu}, \bc{\bTau}) \text{ and }\\
\c &= \a + \b \p 
\end{align*}$$

Then $p(\c) = N(\c \mid \oc{\bmu} + \oc{\bnu}, \bc{\Sig} + \bc{\bTau})$.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Let $k$ be the dimensionality of $\a$ and $\b$. 

Let $\d$ be the concatenation of $\a$ and $\b$. By the lemma above, $\d$ follows a Gaussian distribution.

To turn two concatenated vectors into the sum of two vectors, we can multiply by the matrix $\begin{pmatrix}\I& \I\end{pmatrix}$---that is, two identity matrices side by side. If we have $\c = \begin{pmatrix}\I & \I\end{pmatrix}\d$, then

$$
c_i = \sum_\kc{k} \begin{pmatrix}\I & \I\end{pmatrix}_{i\kc{k}} d_i = a_i + b_i \p
$$

This shows that $\d$ is Gaussian. 

To work out the parameters, we write out the full operation: concatenation and summation:

$$\begin{align*}
\c &= \begin{pmatrix}\I & \I\end{pmatrix} \begin{pmatrix}\bc{\A} & \zero \\ \zero & \bc{\B} \end{pmatrix} \begin{pmatrix} \s \\ \t\end{pmatrix} + \begin{pmatrix}\I & \I\end{pmatrix}\begin{pmatrix} \oc{\bmu} \\ \oc{\bnu}\end{pmatrix} \\ 
&= \begin{pmatrix}\bc{\A}&\bc{\B}\end{pmatrix} \s' +\oc{\bmu} + \oc{\bnu} \p
\end{align*}$$

Which tells us that the mean is $\oc{\bmu} + \oc{\bnu}$ and the covariance matrix is $\begin{pmatrix}\bc{\A} & \bc{\B}\end{pmatrix}\begin{pmatrix}\bc{\A} & \bc{\B}\end{pmatrix}^T = \bc{\A}\bc{\A}^T + \bc{\B}\bc{\B}^T $.
<span class="qed"></span>
</div>

### Chaining Gaussians

<aside>If you're studying diffusion models, pay particular attention to this section. 
</aside>

Here's a situation that comes up occasionally. We sample a vector $\a$ from one Gaussian, and then make this the mean of another Gaussian. We then sample $\b$ from the second Gaussian. What's the distribution on $\b$? If we are given the values of $\a$, it's a Gaussian, that's how we defined it. But what about $p(\b)$. That is, what if someone told us only they had followed this process, but they didn't tell us what the value of $\a$ was? What probabilities would we assign to a given value of $\b$?

An example is trying to saw one plank to the length of another. You measure one plank and then saw the other to the length of your measurement. Both steps have some error: there is some error in how accurately you measure, and some error in how accurately you saw. Both processes are probably Gaussian: if you repeat the measurement or the sawing and plot the results, a bell shape will appear. 

<figure class="centering">
<img src="/images/gaussians/planks.svg" class="three-quarters">
<figcaption>We <span class="gc">measure</span> plank 1, and then <span class="oc">saw</span> plank 2 to the measured length. Both actions have some inaccuracy in the form of Gaussian noise. Can we show that the distribution on <span class="bc">the end result</span> (a) is Gaussian and (b) has the length of the first plank as its mean?  
</figcaption>
</figure>

The question now is what distribution we get if we don't know the measurement. Or, if you like, if we repeat the whole experiment many times. What will the distribution be on the length of plank we saw, combining both the uncertainty in the measuring and in the cutting.

It turns out that this distribution is Gaussian as well. One way to think of this distribution is as a _convolution_ of the two Gaussians we used for sampling. At every point $\x$ in space we place a Gaussian. The probability density is a mixture of all these Gaussians, weighted by how likely we are to put a Gaussian at $\x$. Put differently, the probability $p(\y)$ assigned to some point is a weighted "sum"---or more precisely an integral---of all the Gaussians we could sample in the first step, all weighted by how likely they are to be sampled.

<figure class="centering">
<img src="/images/gaussians/convolution.svg" class="full">
<figcaption>Imagine placing copies of <span class="oc">one Gaussian</span> along the number line at various points. We then take a weighted sum of these Gaussians, where the weight is the density of the point according to <span class="gc">a second Gaussian</span>. The result, as the number of points goes to infinity, is the <em>convolution</em> of the two Gaussians. 
</figcaption>
</figure>

We could use this integral to work out the shape of $p(\y)$, but that would require lots of calculus. Instead, we will use our geometric perspective to take a shortcut. 

<div class="theorem"><strong class="gc">Theorem. Gaussian convolution.</strong> Let 
$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{ and }\\ 
\b &\sim N(\a, \bc{\bc \T}) \p 
\end{align*}$$
Then, 
$$p(\b) = N(\oc{\bmu}, \bc{\Sig} + \bc{\bc \T}) \p$$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> From our geometric definition, we can rewrite $\a$ as 
$$
\a = \bc{\A} \s + \oc{\bmu}
$$
with $\s$ a standard-normally distributed vector, and $\bc{\Sig} = \bc{\A\A}^T$. Likewise we can write,
$$
\b = \bc{\B} \t + \a
$$
with $\t$ a <em>separate</em> standard normally distributed vector and $\bc{\T} = \bc{\B\B}^T$. Note that $\a$ takes the roles of the translation vector in the definition of $\b$.

In this view, we sample $\s$ and $\t$, and then compute $\a$ and $\b$ from them as regular vectors. That means we can plug the definition of $\a$ into that of $\b$ and get 

$$\begin{align*}
\b = \bc{\B} \t + \bc{\A} \s + \bmu \p
\end{align*}$$

The first two terms, $\bc{\B} \t + \bc{\A} \s$ form the sum of two zero centered Gaussians. By the result of the previous section, this is equal to a single Gaussian with covariance $\bc{\Sig} + \bc{\bc \T}$.
</div>

In the geometric view, we can say that $\b = \bc{\Y}\u + \oc{\bmu}$, with $\u$ standard normally distributed and $\bc{\Y}\bc{\Y}^T = \bc{\A}\bc{\A}^T + \bc{\bc \B}\bc{\bc \B}^T$  

We'll work out the spherical case specifically as a corollary, since it's so central to diffusion models. 

<div class="theorem"><strong class="gc">Corollary. Spherical Gaussian convolution</strong> Define $\a$ and $\b$ as before, but with the constraint that they are spherical Gaussians with scalar standard deviations $\bc{\sigma}$ and $\bc{\tau}$ respectively. Then
$$\begin{align*} 
\b &\sim N(\oc{\bmu}, \bc{\sigma}^2 + \bc{\tau}^2) \;\text{and}\\
\b &= \sqrt{\bc{\sigma}^2 + \bc{\tau}^2}\,\s + \oc{\bmu} 
\end{align*}$$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Take the result from the proof and let $\bc{\Sig}$ be diagonal matrix with every $\bc{\Sigma}_{ii} = \bc{\sigma}$ and likewise for $\bc{\T}$. Then $\bc{\Sig}\bc{\Sig}^T$ is a diagonal matrix with all diagonal elements equal to $\bc{\sigma}^2$ and likewise for $\bc{\T}\bc{\T}^T$ so that

$$
N(\oc{\bmu}, \bc{\Sig}\bc{\Sig}^T + \bc{\bc \T}\bc{\bc \T}^T) = N(\oc{\bmu}, \bc{\sigma}^2 + \bc{\tau}^2 ) \p
$$

For the geometric definition of $\b$, note that the transformation matrix $\bc{\A}$ should have the property that $\bc{\Sig} = \bc{\A\A}^T$. Since $\bc{\Sig}$ is the diagonal matrix $(\bc{\sigma}^2 + \bc{\tau}^2)\I$, we can derive $\bc{\A}$ simply by taking the square root of these diagonal elements

$$
\bc{\A} = \sqrt{\bc{\sigma}^2 + \bc{\tau}^2}\I \p
$$

<span class="qed"></span>
</div>

<aside>I'm being a bit sloppy using $N(\oc{\bmu}, \bc{\sigma}^2 + \bc{\tau}^2)$ for a multivariate distribution. That should really read $N(\oc{\bmu}, (\bc{\sigma}^2 + \bc{\tau}^2)\I)$ to distinguish it from a univariate Gaussian. I hope it's still clear from context. 
</aside>

### Conditioning Gaussians

What if we want to _condition_ $\x$ on one or more of its values? For instance, we are interested in the distribution $p(\x \mid x_2=3)$ where $\x$ is drawn from a Gaussian. We can show that the result is, again, a Gaussian.

For a real-world example, we can look at our population of female soldiers again. If the combination of their heights and the weights is normally distributed, then what happens if we slice out only those soldiers that are 192cm tall? Do we get a Gaussian distribution on the weights in this subpopulation? 

This one is a little more complex to prove. We will start with a lemma showing a single, specific, case. If $\x$ is drawn from the standard normal distribution $N(\zero, \I)$, and we condition on one of the elements having a particular value $c$, then the resulting distribution $p(\x\mid x_i = c)$ is standard normal on the remaining elements of $\x$. This result will require us to open the box and to look at the formula for $N(\zero, \I)$, but as we saw earlier, this formula is relatively straightforward.

With that lemma in place, we can then show our main result: that for _any_ variable $y$ with a Gaussian distribution, conditioning on one of the elements of $\y$ results in another Gaussian. This, we can do entirely by the affine operation trick.

<div class="theorem"><strong class="gc">Lemma. Gaussian conditioning</strong> Let $\x \sim N^n(\zero, \I)$. Then for any element $x_i$, and value $c$,
$$
p(\x \mid x_i = \rc{c})
$$
is a standard Gaussian $N^{n-1}(\zero, \I)$ on the remaining elements of $\x$.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> To start with, consider how this conditional distribution is defined. In two dimensions, the situation looks like this.

<figure class="centering">
<img src="/images/gaussians/standard-conditional.svg" class="half">
</figure>

The constraint $x_i = \rc{c}$ tells us that we assume that $\x$ is on the red line. The probability density for points that are not on the line becomes zero. The density for points on the line stays the same, but should be rescaled uniformly so that the probability density, if we integrate over the whole line becomes 1.

<aside>This is the definition of the conditional probability. We take the joint distribution over all outcomes, select a subset of them to condition on, and then rescale the probabilities or probability densities so that the whole probability mass over the subset sums or integrates to 1.
</aside>

Extending this to $n$ dimensions, if we condition on one element $x_i$ of $\x$, the result is that the line becomes an $n-1$ dimensional hyperplane orthogonal to the $i$-th axis. For any point in this hyperplane, we take the probability density under $N^n(\zero, \I)$ and rescale it, so that the whole hyperplane integrates to 1.

This integral sounds like a tricky one to work out. Luckily, we don't have to. We just assume it exists, and work around it with the "proportional to" trick we saw earlier. 

To make the notation simpler, we will assume, [without loss of generality](../wlog), that $x_i$ is the last element of $\x$, that is $x_n$. We call the vector $\x$ with the $n$-th element removed $\x_{\setminus n}$ 

Then if $\x$ has $x_n=\rc{c}$, we have 

<p>$$\begin{align*}
p(\x \mid x_n = \rc{c}) &\propto N^n(\zero, \I) \\
&= \text{exp} - \frac{1}{2} \|\x\|^2 \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 + x_n \right) \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 + \rc{c}\right) \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 \right) \cdot \rc{ \text{exp} - \frac{1}{2} c} \\
&\propto \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 \right) = \text{exp} -\frac{1}{2} \|\x_{\setminus n}\|^2 \\ 
&= N^{n-1}(\x_{\setminus n}\mid \zero, \I) \p
\end{align*}$$</p>

We see that the probability density that $p(\x \mid x_n =\rc{c})$ assigns to the vector $\x$, if $x_n=\rc{c}$, is proportional to the density that $N^{n-1}(\x_{\setminus n})$ assigns to the first $n-1$  elements of $\x$. Normally, to turn this into a fully determined probability function, we need to figure out what this integrates to and divide by that to turn the $\propto$ into a $=$. However, in this case, we know what the right-hand side integrates to, because $N^{n-1}$ is already a proper probability density function, and we are allowing all possible values for $\x_{\setminus n}$. It integrates to $1$, so we can simply say that

$$
p(\x \mid x_n = \rc{c}) = N^{n-1}(\zero, \I) \p
$$

<span class="qed"></span>
</div>

Why doesn't this argument hold for Gaussians in general? It's the "orthogonal" structure of the standard Gaussian. This allows us to remove one dimension, after which we are left simply with a standard Gaussian of one dimension fewer. 

However, we can build on this result to show that conditioning in general produces a Gaussian. All we need to do is to show that a conditioned Gaussian can be transformed _to_ a conditioned standard normal Gaussian. Since anything that can be transformed to a Gaussian is itself Gaussian (so long as the transformation has linearly independent columns), this proves the result.

<div class="theorem"><strong class="gc">Theorem. Gaussian conditioning.</strong> If we sample $\x$ from any Gaussian with full support, and condition on one of its elements, the resulting distribution, $p(\x \mid x_i = \rc{c})$, is Gaussian. 
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> 

<figure class="centering">
<img src="/images/gaussians/conditional-proof.svg" class="full">
<figcaption markdown="1">The key idea of the proof. The $\s$'s that result in samples $\x$ that satisfy $x_i = \rc{c}$ form a hyperplane constraint on the standard Gaussian on $\s$. With a simple rotation, which doesn't affect the density, we translate to the situation of the lemma. We can now say that we can transform _from_ $p(\x \mid x_i = \rc{c})$ to $p(\s \mid s_j = \rc{c}')$ by an invertible, affine operation. As we showed earlier, this means that $p(\x \mid x_i = \rc{c})$ must be Gaussian.
</figcaption>
</figure>

Since $p(\x)$ is Gaussian, there is some invertible $\bc{\A}$ and $\oc{\t}$ so that $\x = \bc{\A}\s + \oc{\t}$ with $\s \sim N(\zero, \I)$. This means that $x_i = \bc{\a}_i\s + \oc{t}_i$, where $\bc{\a}_i$ is the $i$-th row of $\bc{\A}$. 

Our conditioning $x_i = \rc{c}$, gives us $\bc{\a}_i\s + \oc{t}_i = \rc{c}$, a linear constraint on the values of $\s$. Since it's an extra constraint in one variable, it essentially means that if we know all values of $\s$ except one, say $s_1$, then we can work out what $s_1$ must be. We can show this with some simple re-arranging:

$$\begin{align*}
y_i = \rc{c} &= \bc{A}_{i1}s_1 + \ldots + \bc{A}_{in}s_n + \oc{t}_i\\
s_1 &= - \frac{1}{\bc{A}_{i1}} \left (\bc{A}_{i2}s_2 + \ldots + \bc{A}_{in}s_n + \oc{t}_i - \rc{c}\right) \p
\end{align*}$$

The last line represents a constraint on $\s$. We'll refer to this constraint as $c(\s)$, a boolean function which is true if the constraint holds for $\s$.

Now, since $c(\s)$ linearly expresses one element of $\s$ in terms of the other $n-1$, the $\s$'s that satisfy it form an $n-1$ dimensional hyperplane. It's not axis-aligned, as it was in the lemma before, but that can be fixed with a simple rotation. Let $\R$ be an orthogonal matrix such that the transformation 

$\z = \R\s$

when applied to the hyperplane $c(\s)$ yields a hyperplane orthogonal to the $n$-th axis.

Since $N(\zero, I)$ is rotationally symmetric, the density of any point $\s$ remains unaffected when it is mapped to $\z$. This tells us that $p(\s \mid c(\s)) = p(\z \mid z_n = \rc{c}')$ for some value $\rc{c}'$. 

And with that, we can apply our lemma. $p(\z \mid z_n=\rc{c}')$ is a standard Gaussian, by the lemma. $p(\x \mid c(\x))$ is an orthogonal transformation of it, so also a standard Gaussian, and $p(\x \mid x_k=\rc{c})$ is an affine transformation of that (with an invertible matrix), so also Gaussian.

<span class="qed"></span>
</div>

<aside markdown="1">It's worth noting the direction of the proof. We want to show that we can map _to_ a standard Gaussian rather than from it, as we did in most previous proofs. The reason is that we don't know that sampling from the constrained $\s$ and mapping to $\x$ will result in the correct conditional distribution. It's a good bet, but we haven't proved it. By mapping from $\x$ to $\s$ and invoking our earlier result, we sidestep this issue.  
</aside>

Finally, if we want to condition on more than one element of $\x$, we could repeat the same proof structure any dimension of hyperplane, but it's simpler to just apply the theorem multiple times.

<div class="theorem"><strong class="gc">Corollary. Gaussian conditioning on multiple elements.</strong> If we sample $\y$ from any Gaussian, and condition on $m$ of its elements, the resulting distribution is Gaussian. 
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Assume we have a Gaussian $p(x_1, \ldots, x_n)$. Conditioning on $x_1$ gives us, by the theorem, a Gaussian $p(x_2 \ldots, x_{n} \mid x_1)$. Since the latter is a Gaussian, we can condition on one of its elements and, by the theorem get another Gaussian $p(x_3, \ldots x_n \mid x_1, x_2)$. We can do this for any number of elements, and in any order we like.
</div>

**question:** What if you want to know not just whether the conditional a Gaussian is, but _which_ Gaussian? I.e. what are its parameters? How would you proceed? Which elements of the proof would you need to work out in greater detail? 

## Deriving the density

To finish, we will see where that gargantuan formula comes from. With the picture we have built up, of Gaussians as affine transformations of a single standard Gaussian, it's not so complex to derive. We just need one small trick. 

To build our intuition, let's look at a very simple 2D Gaussian, as defined by the transformation

$$\x = \bc{\I}\s + \oc{\begin{pmatrix} 1 \\ 1\end{pmatrix} } \p
$$

That is, we don't squish or stretch the standard-normal distribution, we just shift it around a bit, _translate_ it. 

<p>To figure out what the density of a particular point $\x$ is, all we need to do is shift it back. For example, if $\x = \begin{pmatrix} 2 \\ 1\end{pmatrix}$, a point one unit above the mean, we can work out the density by shifting this point back to $\begin{pmatrix}1 \\ 0\end{pmatrix}$, the point one unit above the mean of the standard Gaussian. Since the two distributions are just translations of each other, these points will have the same density under their respective distributions.</p>

<figure class="centering">
<img src="/images/gaussians/translate.svg" class="three-quarters">
</figure>

This tells us that we can express the density of our new function in terms of the density function we already have for the standard Gaussian.

$$
N(\x \mid \bc{\I}, \oc{\t}) = N(\s - \oc{\t} | \bc{\I}, \oc{\zero})
$$

Now, we know the density function of the standard Gaussian, that's

<p>$$
N(\s \mid \bc{\I}, \zero) = \kc{\frac{1}{z}} \text{exp }{- \tfrac{1}{2}\|\s\|^2} \p
$$</p>

So, if we fill in $\s = \x -\oc{\t}$ we get

<p>$$
N(\x \mid \bc{\I}, \oc{\t}) = \kc{\frac{1}{z}} \text{exp }{- \tfrac{1}{2}\|\x - \oc{\t}\|^2} \p
$$</p>

<aside markdown="1">This trick is sometimes called a _change of variables_ in integration. We change the variables to turn a function we want to integrate into a function we have already integrated. 
</aside>

The idea is simple: for a given Gaussian expressed as a transformation of the standard Gaussian, we transform $\x$ back to the standard Gaussian, by inverting the transformation, and then we just read off the density. 

Can we apply the same idea to the transformation matrix $\bc{\A}$? Here we have to be a bit more careful. As we transform by $\bc{\A}$, it may stretch or shrink space. It's easiest to see what might go wrong in the 1D case:

<figure class="centering">
<img src="/images/gaussians/inflation.svg" class="three-quarters">
</figure>

As you can see, if we have $\bc{\sigma}=\bc{1/2}$, then after we multiply by $1/\bc{\sigma} = \bc{2}$, the whole function blows up as a result. This means that the area under the curve will no longer sum to 1. Luckily, the increase is simply a factor of $\bc{\sigma}$, so if we apply the change of variables naively, all we have to do is divide the result by $1/\bc{\sigma}$ to correct the error.

If you're not convinced, imagine approximating the bell curve by a series of boxes. Multiplying by $\bc{\sigma}$ stretches each box horizontally but not vertically, so the area goes from height $times$ width to height $\times$ width $\times \bc{\sigma}$. When we sum over all boxes, we can take $\bc{\sigma}$ out of the sum to see that the total area is multiplied once by $\bc{\sigma}$. Now let the width of the boxes shrink to get a better and better approximation. 

The same reasoning applies in higher dimensions. Assume we have our Gaussian described in terms of an invertible transformation matrix $\bc{\A}$---which, as we showed before, is always possible.

We can carve up the plane of a 2D Gaussian into squares, and approximate the _volume_ under the surface with a series of rectangular columns on top of these.

The result of transforming the Gaussian by $\bc{\A}$ is that the squares are stretched into parallelograms. Happily, because it's a linear transformation, every square is stretched into a parallelogram of the same size. We know much the surface area shrinks or increases, because that's simply the determinant of $\bc{\A}$.

<p>With that, we can establish our formula for the density. We know that $\x = \bc{\A}\s + \oc{\t}$ defines our Gaussian. To work out the density of $\x$, all we need to do is invert our function to find the corresponding $\s$, take its density, and then <span class="rc">correct</span> for the amount by which $\bc{\A}$ inflates space by multiplying with $1/|\bc{\A}|$.</p>

<p>$$\begin{align*}
N(\x \mid \bc{\A}, \oc{\t}) &= N(\s = \bc{\A}^{-1}(\x - \oc{t}) \mid \I, \zero) \\
&=  \rc{ \frac{1}{|{\A}|} } \rc{\times} \frac{1}{\bc{z}} \;\text{exp } - \| \bc{\A}^{-1}(\x - \oc{t}) \|^2 \\
&=  \frac{1}{z |\bc{\A}|} \; \text{exp } - (\bc{\A}^{-1}(\x - \oc{t}))^T(\bc{\A}^{-1}(\x - \oc{t})) \\
&=  \frac{1}{z |\bc{\A}|} \; \text{exp } - (\x - \oc{t})^T(\bc{\A}^T\bc{\A})^{-1}(\x - \oc{t}) \\
\end{align*}$$</p>

<p>In the last two lines, we've used the properties that $\|z\|^2 = \z^T\z$, that $\A^{-1}\B^{-1} = (\B\A)^{-1}$ and that $(\A^{-1})^T = (\A^T)^{-1}$.
</p>

<p>This is the density function of a Gaussian expressed in the geometric parameters. If we want to translate this to the more common parametrization in terms of the covariance matrix $\bc{\Sig} = \bc{\A}^T\bc{\A}$, we just need to note that the determinant has the properties that $|\A\B| = |\A|\times |\B|$ and $|\A^T| = |\A|$, so that</p> 

$$
|\bc{\A}| = |\bc{\A}^T\bc{\A}|^{\frac{1}{2}} = |\bc{\Sig}|^{\frac{1}{2}} \p
$$

Filling this in, we get 

$$
\frac{1}{\bc{z} |\bc{\Sig}|^{\frac{1}{2}} } \;\text{exp } - (\x - \oc{t})^T\bc{\Sig}^{-1}(\x - \oc{t}) \p
$$

<p markdown="1">This is exactly the formula we started with at the top of the article, except that we haven't bothered to work out $\bc{z} = \int _{-\infty}^\infty \text{exp } -\tfrac{1}{2} \|\x\|^2$. This is called the [Gaussian integral](/gaussian-integral), and as you can tell from the completed formula, it works out to $(2\pi)^{-\frac{1}{2}d}$, where $d$ is our dimension. We will leave this working out to another article.
</p>

You may ask what happens if $\bc{\A}$ is not invertible. Well, then $\bc{\Sig}$ isn't either, and the traditional parametrization breaks down. However, in the geometric parametrization, we have some hope left. We know that we still have a Gaussian on our hands, with a bell shape and everything. It's just that it only covers a linear subset of space. 

<aside>If we wanted to, we could even use the singular value decomposition to work out what that linear subset is. We could then work out a coordinate system in that space, and provide an invertible, low-dimensional $\bc{\Sig}$ for the points in that space.</aside>  

## Sources and other materials

* We discuss these same topics in our [lecture on Diffusion models](https://dlvu.github.io/diffusion/) in the [deep learning course at the Vrije Universiteit Amsterdam](https://dlvu.github.io/). This lecture is a little more compact than this article, which may help you to get the general overview. It comes with videos (or will do soon).

## Acknowledgements

Many thanks to the commenters on [Hacker News](https://news.ycombinator.com/item?id=41912160) for pointing out mistakes, and other places where the article could be improved.  

## References

[1] Paquette, S. (2009). [Anthropometric survey (ANSUR) II pilot study](https://www.openlab.psu.edu/ansur2/): methods and summary statistics. Anthrotch, US Army Natick Soldier Research, Development and Engineering Center. 