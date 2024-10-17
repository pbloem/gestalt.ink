---
title: Gaussians
summary: ""
---
# Gaussians

The **Gaussian distribution**, or **normal distribution** is a key subject in statistics, machine learning, physics, and pretty much any other field that deals with data and probability. It's one of those subjects, like $\pi$ or Bayes' rule, that is so fundamental that people treat it almost like an icon of their subject. 

* toc
{:toc}

To start at the beginning: the normal distribution is a _probability distribution_: a mathematical object that describes a process by which you can _sample data_. Here is an example. If I measure the height of 1000 female soldiers in the US army, and plot the results in a histogram, here is what that might look like.

-- image

You can see that the data is clustered around the _mean value_. Another way of saying this is that the distribution has a definite _scale_. That is, even though people can have all sorts of heights, there are clear limits. You might see somebody who is 1 meter taller than the mean, and it might theoretically be possible to be 2 meters taller than the mean, but that's it. People will never be 3 or 4 meters taller than the mean, no matter how many people you see.

<aside markdown="1">As an example of a distribution _without_ a definite scale, consider wealth. In the town or city where you live, there are probably many people with ten times the typical level of wealth, and a few with a hundred times. In the whole world there will be people with a thousand to a million times the typical wealth. If we could sample more people than that we could keep going.
</aside>

The definite scale of the height distribution is why we can have doors. We know that heights will fall in a certain range, so we can build for that. There are a few distributions like this with a definite scale, but the Gaussian is the most famous one. You can see in the plot above that it has a kind of "bell" shape---it's also called _the bell curve_---which trails off smoothly as we get further from the mean, first slowly and then dropping rapidly, and then flattening out quickly. If we make the bins in our histogram smaller, and increase the sample size so they are still filled up, we can see the shape appear more clearly. 

-- image

If you measure more than one thing about your subject, you get _multivariate_ data, and the resulting distribution is called a _multivariate distribution_. For example, if we take our soldiers, and measure their height and the distance between their shoulder blades, the data looks like this.

-- image: scatter plot with gradient in back

This is called _a multivariate normal distribution_. Like the one-dimensional (_uni_variate) version, the data is clustered around a central value.

Most descriptions you will read of the Gaussian distribution will focus on the way it is used to describe or approximate the real world: its use as _a model_. This is a typical statistics approach, and it  comes with a lot of baggage that we will not discuss here. 

In this article, we want to focus more on the way Gaussians are used in _machine learning_. There, we also aim to build a model of our data, but we are often less concerned with the fact of capturing our data in a single Gaussian.  Instead, we use Gaussians as a _building block_, a small part of a more complex model. For instance, we might add noise from a Gaussian to our data at some point in our algorithm, or we could have a neural network produce the parameters of a Gaussian as part of its prediction. We could combine multiple Gaussians together, in order to create a distribution with multiple peaks. We could even take a sample from a Gaussian and feed it to a neural net, so that the neural net effectively twists and folds the relatively simple shape of the Gaussian into something much more complex.

-- image

To use Gaussians in this way requires a solid intuition for how they behave. The best way to do that, I think, is to do away entirely with the symbolic and mathematical foundations, and to derive what Gaussians are, and all their fundamental properties from purely geometric and visual principles. That's what we'll do in this article.

### Bringing in parameters

-- Multiplication and addition. high-level only (return to the height example). Save the working out for later. 

## Building a geometric intuition for Gaussians

If you're not intimately familiar with Gaussians, you would be forgiven  for thinking of them as one of the most monstrously complicated probability distributions around. After all, when we learn about them, pretty much the first thing we see is their probability density function.

$$
N(\x \mid \oc{\bmu}, \bc{\Sig}) = \frac{1}{\sqrt{(2\pi)^{k}|\bc{\Sig}|}}\text{exp} \left( -\frac{1}{2}(\x-\oc{\bmu})^T \bc{\Sig}^{-1} (\x-\oc{\bmu})\right)
$$

It's a beast of a formula, especially if you're not used to reading such things. Why then, do people like this distribution so much? Why use it as a building block when it is already so complex? Shouldn't we look for simple building blocks?

Partly it's because it has nice properties, but actually another part of the reason is that once you get to know it, it's not so complicated. You just have to let yourself forget about the complicated formula. So we'll put it out of our minds, and start elsewhere.

The plan is as follows. We will first derive a _standard_ Gaussian. Just on distribution, in one dimension. Thi makes the formula much simpler. From this, we will define a standard multivariate Gaussian is a straightforward way, which doesn't require us to extend the formula very much. Then, we will use _affine transformations_---multiplication by a matrix, and addition of a vector---to define a whole _family_ of Gaussians. Implicitly, this will lead to the formula we use above, but practically, all we need to understand are the basic transformations of linear algebra.

We will use this view to derive a bunch of useful properties about Gaussians, and then finally wrap up by showing that the above formula is indeed correct.

## The standard Gaussians

The first thing we need is the standard Gaussian in one dimension. This is a probability distribution on the real number line: if we sample from it, we can get any real number. The function that describes it is a probability density function: it maps each real number to a probability density. Numbers with higher density are in some sense more likely than numbers with low density.

<aside markdown=1>A counter-intuitive property is that any individual number actual has probability zero, even the one with the highest probaility density. If this idea is unfamiliar, have a look at the article on [probability and probability density](../probability-and-probability-density). 
</aside>

<p>To come up with the density function, remember the aim we started with: we want the distribution to have a definite scale, some area where almost all of the probability mass is concentrated. We'll put that region around zero on the number line (it seems as good a point as any). This is where the density should peak, and as we move away from zero the density should drop very quickly, so that pretty soon, it's almost zero. One way of achieving this is to have exponential decay. Just like an exponential function $e^x$ blows up very quickly, the negative exponential function $e^{-|x|}$ drops to zero extremely quickly. We could use this function, but if we add a square in there, to give us $e^{-x^2}$ we get some nice properties on top of the exponential decay.</p>

-- image

First of all, the decay far out from zero is even faster, since we're taking the negative exponential of the square. Second, close to zero, we get a little more probability density on the numbers close to zero. The exponential decay really favors only 0, while the squared exponential favours all numbers _near zero_. The squared exponential is also smooth while the exponential as a discontinuity at 0, and finally, it has two _inflection points_: points where the decay moves from dropping faster and faster to moving slower and slower. These inflection points form a nice, natural marking for the _scale_ of the distribution: we can take the interval between the inflection points as the "typical" range of outcomes that we might get if we sample from the distribution. The numbers outside this range are possible, but they're less likely.

So that's where the basic bell shape of the distribution comes from: the choice to have the probability density decay squared exponentially. Next, we'll make a small adjustment to make the function a little more well-behaved. Remember that the inflection points give a us a nice interval to consider the "typical points". This interval is now a little arbitrary. If we scale the function a bit, we can put the inflection points at $-1$ and $1$, so that the interval containing the bulk of the probaility mass is contained in $(-1, 1)$. This seems like a nice property to have, and as it turns out, it doesn't make the function much more complex.

First, we need to figure out where the inflection points are. We defined them as the point where the function moves from dropping faster and faster to dropping slower and slower. This behavior, how fast the change in the function changes is given by the second derivative of the function, where that is equao to zero, we find an inflection point. The first derivative of $e^{-x^2}$ is (using the chain rule) $-2xe^{-x^2}$, and the second derivative is (using the product rule) $-2e^{-x^2} + 4x^2e^{-x^2} = (4x^2 -2)e^{-x^2}$. Setting that equal to zero, we get $x^2 = 1/2$, so the inflection points are at 

$$
x = -\sqrt{\frac{1}{2}}  \;\text{and}\; x = \sqrt{\frac{1}{2}} \p
$$

Filling this into the function $e^{-x^2}$, we see that the density at the inflection points is $e^{-\frac{1}{2}}$. This tells us that if we scale the input by $\bc{\sqrt{\frac{1}{2}}}$ our density function becomes

$$
e^{-\left(\bc{\sqrt{\frac{1}{2}}}x\right)^2} = e^{-\bc{\frac{1}{2}}x^2} \p
$$

Filling in $x=-1$ and $x=1$, we see that that is where the density is $e^{-\frac{1}{2}}$, so the inflection points are now at $-1$ and $1$.

<aside>This reasoning works because scaling the input by a constant only stretches or shrinks the function horizontally. If we draw a horizontal line on the original function that crosses the inflection points, that line will still cross them if we stretch the function horizontally.  
</aside>
 
-- image

So, our function is now $e^{-\frac{1}{2}x^2}$. The multiplier of $\frac{1}{2}$ is a small price to pay to put the inflection points at $-1$ and $1$.

With that, we almost have a probability density function. The only problem left is that the rules of probability density functions state that the whole area under the curve should integrate to 1. Put simply, the probability of sampling any number in $(-\infty, \infty)$ should be $1$.

We could check this, and if it doesn't, we could stretch the function vertically until it does. This would require some complicated analysis, which, while fun, is exactly the kind of thing we are trying to avoid. To keep things simple, we will simply assume that the area under the whole curve, from negative to positive infinity, is some finite value. 

<aside>This is pretty well justified, since the function lies below $e^{-|x|}$, except for some finite amount, and we know that exponential tails have finite area under the curve. 
</aside>

Whatever the area under the curve $e^{-\frac{1}{2}x^2}$ is, we will call that $z$. By the rules of integration, multiplying our function by $1/z$ will then yield a function that integrates to 1. Since $z$ is a constant, we can say that the scaled function, which we will call $N_s$, is _proportional to_ the unscaled function:

$$ N_s(x) \propto e^{-\frac{1}{2}x^2}.$$

That is, $N_s$ is a bit more complicated than $e^{-\frac{1}{2}x^2}$ but all that complexity is in some multiplicative constant. One other trick we can use to simplify things is to focus on the logarithm of the probability density. In our case, we get:

$$ \ln N_s(x) \eqplus -\frac{1}{2} x ^2 $$

where the symbol $\eqplus$ means that both sides are equal except for some term ($- \text{ln}\,z$ in this case) that doesn't depend on $x$,

With that, we have defined our _standard Guassian_ in one dimension as precisely as we need. We don't have the precise functional form of the density, but we can leave that for later. We know the function exists, and we know what it looks like. We can now derive the full family of Gaussians.

First, to make the leap to _multivariate_ Gaussians, we define a single multivariate _standard_ Gaussian. In $n$ dimensions, we will call this distribution $N^n_s$. It's a distribution over vectors $\x$ of $n$ elements.

We define $N^n_s$ by a _sampling process_. To sample from the multivariate Gaussian in $n$ dimensions, we sample $n$ separate values $x_1$ though $x_n$ from the standard one-dimensional Gaussian $N_s$ (which we've just defined) and we concatenate them into a vector $\x$. To saying that the random vector $\x$ is distributed according to the standard Gaussian $N^n_s$ in $n$ dimensions, we write $\x \sim N^n_s$. This means that 

$$
\begin{pmatrix}x_1 \\ \vdots \\x_n\end{pmatrix} \;\text{with}\; x_i \sim N_s \p
$$

In short, if $\x$ is distributed according to $N^n_s$, then each individual element of $\x$ is distributed according to $N_s$.

This is a complete definition of the standard Gaussian. You may wonder what its density function looks like. We can derive the general form very easily from one basic property: that of _independence_. Since we sample the elements of $\x$ independently---how we sample one does not depend on how we sample the others---the probability density of the whole vector is the probability density of the elements multiplied together:

$$
N^n_s(\x) = p(x_1) \cdot p(x_2) \cdot \ldots \cdot p(x_n) \\
$$

Now, switching to log-probability densities, we can get a sense of the shape of the function. Remember that $\eqplus$ means equal up to some constant term, so we can remove any terms that don't depend on elements of $\x$.

$$\begin{align*}
\text{ln }N^n(s) &= \text{ln }p(x_1) + \ldots + \text{ln }p(x) \\
 &= N_s(x_1) + \ldots + N_s p(x) \\
&\eqplus -\tfrac{1}{2}{x_1}^2 - \ldots -\tfrac{1}{2}{x_n}^2 \\
&= -\tfrac{1}{2}\left({x_1}^2 + \ldots +{x_n}^2\right) \\
&= - \tfrac{1}{2}\| \x \|^2\\
\end{align*}$$

<p>The last line follows from recognizing that the right hand side has, up to some constant multiplier, become equal to the vector norm without the square root. That is, the  square of the norm: $\|\x\|^2 = {x_1}^2 + \ldots + {x_n}^2$. Taking the logarithm away again, we get</p> 

<p>$$
N^n_s \propto e^{-\tfrac{1}{2}\|x\|^2} \p 
$$</p>

That is, the probability density at any point $\x$ depends only on the norm of $\x$---how far away from $0$ we are. This tells us first, that all points with the same distance to $0$, any set of points that forms a _circle_, have the same density. The function also tells us that as the norms (and thus the circles) get bigger, the probability density of the points in that circle decays in the same way as the density decays in $N_s$ according to a negative squared exponential.

With that, we have a pretty clear picture of what the standard multivariate Gaussian looks like. It's rotationally symmetric, since all circle have the same density, and it decays in the same way as the bell shape of $N_s$. Putting this together, tells us that it should look, in two dimensions, like the function of $N_s$ rotated about the origin.

-- image

In two dimensions, the set of all points that have the same density is called a _contour line_. The standard Gaussian is called a _spherical_ distribution because all its contour lines are circles (two-dimensional spheres). In higher dimensions, where things are more difficult to visualize, the same principle holds: the density of $\x$ under $N^n_s$ depens only on the norm of $\x$, so the set of all points with the same density is the set of all points with the same norm, a (hyper)-sphere. These spheres are called the _contour surfaces_ of $N_s^n$. The principle of contour surfaces will be very helpful going forward, in building up an intuition for what general Gaussians look like.

Moving forward, we will drop the <span class="bc">superscript</span> from $N_\bc{n}_s$ when the dimensionality is clear from context. Likewise, we will use $N^\bc{1}_s$ to emphasize that we are talking about the one-dimensional Gaussian if necessary.

### A family of Gaussians

Next, let's build the rest of the family. We do this by taking the standard Gaussian $N_s$ in $n$ dimensions, and _transforming_ it linearly. We will start, again, with a sampling process.

We sample $\x$ from $N_s$ and apply any linear operation $\y = \bc{\A}\x + \rc{\t}$ with a matrix $\bc{\A} \in \mR^{d \times n}$ and $\rc{\t} \in \mR^\d$, then the resulting distribution on $\y$ is, by our definition, a Gaussian. We will, for the time being, call this Gaussian $N(\bc{\A}, \rc{\t})$.

<aside>Note that $\x$ is an $n$-dimensional vector and $\x$ is a $d$-dimensional vector. It's possible to have $\x$ and $\y$ the same dimension, but not necessary.  
</aside>

We have defined how to sample a point from $N(\bc{\A}, \rc{\t})$, so we have fulle defined this Gaussian. Obviously, it would be interesting to know what the resulting density function looks like, but that doesn't need to be _its definition_. We can work that out from how we defined the sampling process. We'll try to do that, and to work out the important properties of the distribution we have now defined, without getting into the comlicated functional form we saw earlier. 

For the time being, assume that $\A$ is square and invertible, so that no two points are mapped to the same point by $\bc{\A}$.

<p>To help us understand the shape of the density function, we can think back to the contour circles we defined for $N_s$, let's say the one for $\|\x\| = 1$. Each of the points $\x$ in this circle could be sampled from $N_s$ and transformed by $\bc{\A}$ and $\rc{\t}$. What happens to a circle when all its points are transformed by a matrix? It becomes an <em>ellipse</em>. What's more, the relative lengths of vectors are maintained under matrix multiplication---if $\|\a\| < \|b\| then \|\bc{\A}\a\| < \|\bc{\A}\b\| $---so any point inside the circle (any point with $\|\x\| < 1$) before the transformation is inside the _ellipse_ after the transformation. Any point outside the circle before, is outside the ellipse after.</p>

-- image

This means that the amount of probability mass captured inside the unit circle before the transformation, is captured inside the corresponding ellipse after the transformation. After all, when we are sampling, these are the same points: if p is the probability of sampling $\x$ inside the circle before the transformation then that is the same probability of sampling $\y$ inside the corresponding ellipse.

If $\bc{\A}$ is not square and invertible, the picture is a little more complex. If, for example $\x$ is three dimensional and $\y$ is two dimensional, then we are taking all points $\x$ on a sphere, and projecting them down to two dimensions. The result is still an ellipse in two dimensions, but not all points are on the edge of the ellipse anymore. Some are in the interior. This means we no longer have the property that if $\|\a\| < \|b\| then \|\bc{\A}\a\| < \|\bc{\A}\b\| $. However, we will be able to show in a bit that this distribution is equivalent toi one defined with a two-dimensional $\x$ and a square, invertible $\bc{\A}$. Thus, this messiness isn't really any cause for concern. We can still call this a Gaussian, and think of it as being mapped from $N_s$ in a neat way that maps contour circles to contour ellipses. 

-- image

### Spherical, diagonal and degenerate Gaussians

Before we move on, it pays to investigate what kind of family members this family has.

The simplest type of Gaussian is the **spherical Gaussian**, also known as an _isotropic_ Gaussian. This is the special case when the contour surfaces, which are spheres before the transformation, are still spheres after the transformation. This happens only when we expand $\s$ uniformly in all directions. Or, in other words, when we multiply it by a scalar. That is, if

$$ \x = \bc{\sigma} \s + \oc{\t} $$

for some scalar $\bc{\sigma}$, then the distribution on $\x$ is a sperical Gaussian. To fit this into the standard affine transformation framework, we can insert an identity matrix and get:

$$ \x = \bc{\sigma \I} \s + \oc{\t} \p $$

This shows that the matrix $\bc{ \sigma\I}$---a diagonal matrix with $\bc{\sigma}$ at every point on the diagonal---is the matrix we should multiply by to get a spherical Gaussian.

<aside>We usually call $\bc{\sigma}$ the variance of the Gaussian. Technically, a multivariate distribution has a variance in each direction, as well as many covariances, but in this case, the variances are all equal to $\bc{\sigma}$ and the covariances are all zero. If we want to call $\bc{sigma}$ the variance, we should pick a positive value: a negative values works in the affine transformation, but then the variance is its absolute value.
</aside>

The spherical Gaussian is particularly simple, and using them will simplify many aspects of the use of Gaussians. In machine learning, you will see them used in, for example, diffusion models.

A class that allows for a bit more variation is the **diagonal Gaussian**. Here, we again use a diagonal matrix in our affine transformation, but we let the diagonal values vary. That is, we define some vector $\sig$, and we [place these values along the diagonal of a matrix](../diag). That matrix them becomes our transformation matrix.

A diagonal $\gc{\D}$ matrix represents a particularly simple transformation. The dimension $i$ is simply multiplied by the value $\gc{D}_{ii}$, ignoring whatever happens elsewhere in the matrix.

Visually, the result is that the circles or spheres in the standard normal distribution are stretched into ellipses, but _only along the axes_. Any ellipse is allowed, but the axes of the ellipse (the lines from tip to tip) has to point along one of the axes.

-- image

Practically, this means that the distribution has zero _correlation_ between the elements of $\x$. If I tell you the value of $x_1$, it carries no information about the value of $x_2$. Study the image to see the opposite case in the non-diagonal Gaussian: the points are roughly on a diagonal line, so if I tell you that $x_1$ has the value $1$, it's a safe bet that $x_2$ is around $1$ as well. For that sort of reasoning, you need more than a diagonal Gaussian.

The final special case we will discuss is the degenerate Gaussian. This is what happens when, for example, we map a one-dimensional $\s$ to a two-dimensional $\x$.

-- image

Since $\s lies on a line, the resulting $\x$ can only lie on a line, even though they're in a two-dimensional space. We've decided to call this a Gaussian, and along the line, you will see the familiar bell shape, but it's fundamentally different from a true two-dimensional Gaussian like $N^2_s$.

We call this a degenerate Gaussian. If $\x$ has $d$ dimensions, the _support_ of the Gaussian, the set of all points that have non-zero density isn't the whole of $\mR^d$, in fact, it's a linear subset of it (a hyperplane).

<aside>You may be tempted to call it a linear subspace, but a subspace should pass through the origin, which only happens if $\oc{t} = \zero$.
</aside>

Within the support, the distribution looks like a normal Gaussian: a bell shape and non-zero probability density everywhere, trailing squared-exponentially. We call a Gaussian that does have a non-zero density everywhere a _non-degenerate_ Gaussian, or a _Gaussian with full support_.  

### Means

Next, let's look at the properties of these Gaussians. First, the mean $\bar\x$. If we average a bunch of samples from $N_s$ and let the number of samples go to infinity, where do we end up? This is called the [expected value](../expectation). The definition of the expected value for continuous functions like these is a a bit complex (it involves integration), but happily, we don't need to open it up. We just need to remember some key properties:
* Expectation distributes over (vector) sums. That is $E_\x \left (f(\x) + g(\x)\right) = E_\x f(\x) + E_\x g(\x)$.
* If we have (matrix) multiplication or (vector) addition inside the expectation, we can move it outside. That is $$E \rc{\t} + \bc{\A}\x  = \rc{\t} + \bc{\A}E \x$$.

The answer is simple, because the components of $\x$ are independently drawn. If we ask for the $i$-th element of the mean, we need only look at the $i$-th elements of our samples. These are all samples from $N^1_s$, so the mean for that component is the mean of $N^1_s$. $N^1_s$ is symmetric around $0$, so its mean must be $0$.

In short, the mean for the standard Gaussian is the zero vector.

<aside>If the argument for the mean of $N^1_s$ being $0$ is too hand-wavy for you, you can show it more rigorously by unpacking the expectation into an integral $E x = \int_{-\infty}^\infty x\,p(x)\,dx = \frac{1}{z}\int_{-\infty}^\infty x e^{-\tfrac{1}{2}x}$. You can then break this up into two integrals to the left and right of $0$: $E x \propto  \int_0^{\infty} x e^{-\tfrac{1}{2}x} + \int_{-\infty}^0 x e^{-\tfrac{1}{2}x} = \int_0^\infty  x e^{-\tfrac{1}{2}x} - \int_0^{\infty} x e^{-\tfrac{1}{2}x} = 0$.
</aside>

What about the mean of our transformed Gaussian $N(\bc{\A}, \rc{\t})$? The transformation by $\bc{\A}$ keeps the origin in place, $\A\zero= \zero $, so it's a reasonable guess that if we set $\rc{\t}=\zero$, the mean stays $\zero$. If we use the basic poperty that the expectation is a linear function--that is, we can move additions and multiplications outside the expectation)---we can prove our guess correct very simply:

<p>${E}_{\x \sim N_s} \bc{\A}\x = \bc{\A} E_{\x \sim N_s} \x = \bc{\A}\zero = \zero \p$
</p>

If $\t$ is not zero, then all the term $+\;\rc{\t}$ contributes is that we are adding a vector to a $\rc{\t}$ random variable with mean $\zero$. The result is that afterwards the mean is $\rc{\t}$.

<aside>Note that we're not talking about the <em>parameters</em> of these Gaussians. The parameters are how we define a distribution. We've done that with $\bc{\A}$ and $\rc{\t}$. What we are talking about here its <em>properties</em>. For instance the mean. Normally, you would use the mean as the parameter of a Gaussian, but we're taking a different path here. 
</aside>

### (Co)variances

The variance is a measure of how widely the sampled points are spread about the mean. We'll need to work out the variance of $N^1_s$ first. It is defined as the expected value of the squared distance to the mean: $E (x - \bar x)^2$. Since the mean is $0$, we sare just looking for the expected value of $x^2$.

We could solve this by unpacking this expectation into its integral definition and working out the integral, but that requires a lot of heavy math. Happily, there's a nifty trick that allows us to minimize the amount of time we need to spend in integral-land. First, let's see what the integral is that we're looking for. To simplify things, we'll call the unscaled density function $f$. That is $f(x) = e^{-\tfrac{1}{2} x}$ and $p(x) = \tfrac{1}{z}f(x)$.

Then, the variance is 

$$V x = E (x-\bar x)^2 = E x^2 = \int_{-\infty}^\infty p(x)x^2 dx  = \tfrac{1}{z} \bc{\int_{-\infty}^\infty x^2f(x) dx} \p$$

To show that the variance of the standard normal distribution is 1 (which it is), we need to show that the integral marked <span class="bc">in blue</span> at the end is equal to $z$ (which is the name we gave to the area under the curve of $f$). This is where we can use a trick.

The trick requires us to take the second derivative of $f$. We have 
$$\begin{align*}
f'(x) &= -x e^{-\tfrac{1}{2}x^2} \\
f''(x) &= (x^2 - 1) e^{-\tfrac{1}{2}x^2} = x^2 f(x) - f(x)\p \\
\end{align*}$$

Note that the function we're taking the integral for $x^2f(x)$ has popped up on the right-hand-side. If we re-arrange, we see

$$
x^2 f(x) = f''(x) + f(x) \p
$$

Filling this into the integral, we get 

$$
\bc{\int_{-\infty}^\infty x^2f(x) dx} = \int_{-\infty}^\infty f''(x) + f(x) dx = \int_{-\infty}^\infty f''(x) + \int_{-\infty}^\infty f(x) dx \p
$$

Now, the first term, $\int_{-\infty}^\infty f''(x)$ is equal to 0. We solve it by taking the antiderivative $f'(x)$ and working out $f'(\infty) - f'(-\infty)$. The derivative of $f$ is 0 at both ends, since the function flattens out towards infinity.

That leaves us with the second term, $\int_{-\infty}^\infty f(x) dx$, which is exactly the definition of $z$. Which, if we fill it in above, shows that the variance of $N^1_s$ is 1. 

<aside>You may wonder if something slightly magical has happened here. We designed $N^1_s$ so that the inflection points, the zeros of the second derivative, were exactly 1 unit away from the origin. Now, when we work out the variance, that turns out to be exactly one unit as well. Is that a coincidence? It isn't. The relation between the variance and the second derivative can be explained by the [moment generating function](../moment-generating-function), a different way to define probability distributions.   
</aside>

Now that we know what the variance of the standard, one-dimensional, Gaussian is, the hard work is done. The parameters of the rest of the Gaussians follow straightforwardly.  

For a multivariate distribution on a vector $\x$ there are many variances to capture. There is first the variance along each dimension $x_i$, but also the _co_variance of every element $x_i$ with every other element $x_j$. 

The [covariance matrix](covariance-matrix) $\bc{\Sig}$ captures all of this. For a random vector $\x$ this is defined as the expected outer product of the deviation from the mean $E  (\bar\x - \x)(\bar\x - \x)^T$. This is a square matrix. It contains all the variances of the individual elements $x_i$ of $\x$ along its diagonal, and it contains all the covariances between elements $x_i$ and $x_j$ on its off-diagonal elements.

Let's start with $N_s$. We know that in $\bc{\Sig}$, the diagonal elements are the variances of $x_i$. These are $1$, because we sampled them independently from $N_1$, which has variance 1. The off-diagonal elements are the co-variances between any two of the elements $x_i$ and $x_j$. We know these are $0$, because we sampled each $x_i$ independently. So, in a phrase, the covariance matrix of $N_s$ is the identity matrix $\I$. 

Now for the rest of the Gaussians. The covariance matrix of $\y = \bc{\A}\x + \rc{\t}$ is defined as the expected outer product of the vector $\y - \bar\y$, where $\bar\y$ is the mean of $\y$. We already know that $\bar\y = \rc{\t}$, so we are looking for the expection of $\y = \bc{\A}\x \kc{\;+\;\t - \t}$. This gives us. 

$$
E_{\x \sim N_s} (\bc{\A}\x)(\bc{\A}\x)^T = E \bc{\A}\x\x^T\bc{\A}^T = \bc{\A} (E \x\x^T)\bc{\A}^T = \bc{\A} \I\bc{\A}^T = \bc{\A\A}^T \p 
$$

Note that we are again using the fact that the expectation is a linear function, so we can take matrix multiplications outside of the expectation (on the left and on the right).

So, to summarize, if we build our Gaussian by transforming $N_s$ with a transformation matrix $\bc{\A}$ and translation vector $\rc\t$, we end up with a distribution with mean $\rc\t$ and covariance matrix $\bc{Sig} = \bc{\A\A^T}$. 

We can now make the leap from _properties_ to _parameters_. Instead of identifying a particular Gaussian by the transformation $\bc{\A}, \oc{\t}$ we used to create it, we can identify it by the covariance $\bc{\Sig}$ and mean $\oc\t$ of the resulting distribution.

The Gaussian we get from the transformation $\A\x + \t$ on the standard normal distribution is called $N(\oc{\bmu}, \bc{\Sig})$, with $\oc{\bmu} = \oc{\t}$ and $\Sig = \bc{\A\A}^T$. 

This also means that $N_s = N(\oc{\zero}, \bc{\I})$, which is how we'll refer to it from now on.

<aside>You can also keep thinking  of the Gaussians as being parametrized by $\A$ and $\t$ directly, but take into account that different transformation matrices $\A$ may lead to the same Gaussian. For instance, any rotation of $N(\oc{\zero}, \bc{I})$ will simply give you $N(\oc{\zero}, \bc{\I})$ again. The benefit of parametrizing by $\bc{\Sig}$ is that we get exactly one unique Gaussian for every single $\bc{\Sig}$.    
</aside>

Note that in all our constructions above, we allowed $\bc{\A}$ to be _rectangular_. That means that we can project to higher or lower dimensions all we like, and the result is still a Gaussian, just in a space of different dimensionality. 

-- image

<aside>The only thing we need to be mindful of, is that if we are projecting up to higher dimensions than $N_s$, we won't be able to define all possible Gaussians in the higher dimensional space. For that, we need to start with a standard Gaussian $N_s$ that has at least as many dimensions as the space we are projecting to.
</aside>

It's worth thinking briefly about what the covariance matrix looks like for the three special categories of Gaussian that we discussed earlier: spherical, diagonal and degenerate. 

<aside>See if you can work out the answer, before moving on. The first two should be straighforward.</aside>

For the spherical Gaussian and the diagonal remember that $\bc{\A}$ is a diagonal matrix. This means that the covariance matrix $\bc{\A}^T\bc{\A}$ is equal to $\bc{\A}\bc{\A}$, since the $\bc{\A}$ is symmetric, so $\bc{\A}^T = \bc{\A}$. The product of two diagonal matrices is very simple: it is another diagonal matrix, with at ach point along the diagonal, the prodcut of the corresponding elements of the two matrices. That is, for diagonal matrices, the matrix product coincides with the element-wise product. 

The result is that for a spherical Gaussian with standard deviation $\bc{\sigma}$, while $\bc{\A}$ is a diagonal matrix with $\bc{\sigma}$ along the diagonal, the covariance matrix is a diagonal matrix with $\bc{\sigma}^2$ along the diagonal. This is of course, the variance.

<aside>This is worth remembering: when we take the transformation perspective, we always multiply by the standard deviation. The transformation matrix $\bc{\A}$ is the generalization of the standard deviation and the "square" $\bc{\A}^T\bc{\A}$ is the generalization of the variance.
</aside>

Likewise for the diagonal Gaussian, we have the standard deviations along the diagonal of $\bc{\A}$, and their squares, the variances, along the diagonal of the covariance $\bc{\A}^T\bc{\A}$. 

In both cases, the covariances (the off-diagonal elements of $\bc{\A}^T\bc{\A}$) are zero. This shows that there is no correlation between the axes: if our Gaussian is diagonal, we cannot predict the value of one dimension from one of the other dimensions.

Finally, let's look at the degenerate Gaussians. We get a degenerate Gaussian if $\bc{\A}$'s _[rank](../matrix-rank)_ is less than the output dimension. Or, put differently, for $\x \in \mbR^d$, if it has fewer than $d$ linearly independent columns. If this happens---say there are $k$ linearly independent columns in $\bc{\A}$ and the rest can be expressed as a linear combination of these $k$ columns---then any $\s$ multiplied by $\bc{\A}$ is mapped to a space of dimension $k$, since the multiplication is a linear combination of $k$ vectors. 

We can get some insight into wthe consequences by looking at the [singular value decomposition](../svd) (SVD) of $\bc{\A}$. 

<aside>The SVD comes up once or twice in this article. If you're not familiar with it you can skoip these bits.
</aside>

Let $\bc{\A} = \rc{\U}\gc{\Sig}\rc{\V}^T$ be the full SVD of $\bc{\A}$. If \bc{\A} maps its input into an output of dimension $k$, then the diagonal of $\gc{\Sig}$, containing the singular values has $k$ non-zero elements. 

<aside>Each singular value is mapped to one output dimension by $\rc{\U}$, all of which are orthogonal to one another. If $\text{diag }\gc{\Sig}$ had more than $k$ non-zero values, there would be more than $k$ output dimensions.</aside>

To see the effect on the covariance matrix, we can fill in the SVD. You may have seen this before: filling in the SVD of $\bc{\A}$ in the Gram matrix, and simplifying, gives us the eigendecomposition of the Gram matrix.

$$\begin{align*}
\bc{\A}^T\bc{\A} &= (\rc{\U}\gc{\Sig}\rc{\V}^T)^T\rc{\U}\gc{\Sig}\rc{\V}^T \\
&= \rc{\V}\gc{\Sig}^T\rc{\U}^T\rc{\U}\gc{\Sig}\rc{\V}^T \\
&= \rc{\V}\gc{\Sig}^T\gc{\Sig}\rc{\V}^T \\
&= \rc{\V}\gc{\Sig}^2\rc{\V}^T \p
\end{align*}$$

Note that the square of a diagonal matrix like $\gc{\Sig}$ just consists of a diagonal matrix with the squares of the original matrix on the diagonal. That means that $\gc{\Sig}^2$ also has $k$ non-zero values.  

What does this tell us? Since this last line is the eigendecomposition, the diagonal values of $\gc{\Sig}$ are the [eigenvalues](eigenvalues) of the Gram matrix. 


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

This expresses $\y$ as a linear transformation of $\s \sim N(\zero, \I)$ with transformation matrix $\gc{\A}\bc{\B}$ and translation vector $\bc{\A}\oc{\q}+\rc{\t}$, so $\z$ has a Gaussian distribution. Moreover, we know that its parameters are 

$$
\oc{\bmu}_\z = \gc{\A}\oc{\q} + \rc{\t} = \gc{\A}\oc{\bmu} + \rc{\t}
$$

and 

$$
\bc{\Sig}_\z = \gc{\A}\bc{\B}(\gc{\A}\bc{\B})^T = \gc{\A}\bc{\B\B}^T\gc{\A}^T = \gc{\A}\bc{\Sig}\gc{\A}^T \p 
$$
<span class="qed"></span>
</div>

<span class="clearing"></span>

Note, again,  that this result holds, **even if $\A$ is not a square matrix**. This leads directly to some very useful corollaries. 

<div class="theorem"><strong class="gc">Subvectors of a Gaussian vector are Gaussian.</strong>
If we sample $\y$ from any Gaussian, and select one or more of its elements, the resulting vector $\y'$ is also distributed according to a Gaussian.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Selecting elements of a vector can be done by a matrix multiplication. For instance, the matrix $(0, 1, 0)$ selects the middle element of a three-dimensional vector.
<span class="qed"></span>
</div>

<strong>question:</strong> What does this look like if I select two elements? What are the parameters of the resulting distribution. What should I expect the resulting distribution to be if I select _all elements_? Can you show that this expectation is correct? 

One consequence is that if you project a Gaussian onto one of the axes, the result is a univariate Gaussian along that axis. In terms of probability, this corresponds to _taking a marginal_. For example, if I measure the height and the distance between the shoulders in a population of women, I get a bivariate distribution which is highly correlated (you can predict one measurement from the other pretty well). The above result shows that if I know the combined measurement is Gaussian, then dropping one of the two dimensions automatically results in a Gaussian as well.

With the example in the proof, we sample $\x$ from some Gaussian, and then only look at the distribution on $x_2$, disregarding the rest of the vector. If you followed the definition of marginalization, you would end up with a formula like 

$$
p(x_2) = \int_{x_1, x_2} N(x_1, x_2, x_3 \mid\oc{\bmu}, \bc{\Sig})\, d x_1x_2 
$$

for which you would then have to fill in that horrible formula for $N$ and work out the integral. Ultimately, you would end up with the result that $p(x_2)$ is a Gaussian, with some particular parameters, but it would be a lot of work.

This shows the benefit of our geometric construction of the Gaussians. With a little thinking we can almost always leave $N$ be and never open up the box. We just assume that it's some affine transformation of the standard Gaussian and build up from there. 

### If you can linearly transform it to a Gaussian, it's a Gaussian

We showed above that if you linearly transform a Gaussian, the result is another Gaussian. Next, it's useful to show that this also works the other way around. If we are given a distribution $p$ and we can apply a linear transformation to turn it into a Gaussian, then $p$ is also a Gaussian.

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
\x = \gc{\A}^\dagger\bc{\B}\s + \gc{\A}^\dagger(\oc{\q} - \rc{\t}) \;\text{with}\; \gc{\A}^\dagger = (\gc{\A}^T\gc{\A})^{-1}\gc{\A} \p
$$

The right-hand-side, while complicated, is an affine transformation of a standard normally distributed vector, so $\x$ is Gaussian.
<span class="qed"></span>
</div>

<aside>You might wonder what goes wrong if $\gc{\A}$'s columns aren't linearly independent. A simple example is the matrix that picks out the first dimension from $\x$ and discards the rest, returning a one dimensional $\y$ (that is, the one-hot vector with a 1 in the first element). If the first dimension of $\x$ is sampled from a Gaussian, the rest can be anything, since it is discarded anyway. This is the key issue: a matrix with linearly dependent columns may "discard information" from $x$ and pick out only the Gaussian parts. 
</aside>

### There is always an _invertible_ transformation

We have defined a Gaussian as a distribution resulting from _any_ affine transformation $\gc{\A}\s + \rc{\t}$ of standard-normal noise $\s$. Even if $\s$ ansd $\y$ have different distributions, or if $\gc{\A}$ is low-rank, so that the result Gaussian only covers a subspace of the space that $\y$ occupies.  

<aside>There is even an extreme edge case here, in the form the zero matrix which compresses everything to one point. We'll just make that "distribution" an honorary, if slightly ill-behaved Gaussian.
</aside>

Let's focus on those Gaussians that are not degenerate in this way: assume, for an $n$-dimensional vector $\x$, that the Gaussian $\x = \gc{\A}\s + \rc{\t}$ assigns every point in $\mR^n$ a non-zero probability density. We'll call this a Gaussian with _full support_.

$\s$ might still be of a higher dimensionality than $\x$, and $\gc{\A}$ may thus still not be invertible. In such a case, we can always find a different parametrization of the same Gaussian using an invertible matrix and noise with the same dimension as $\y$.

<div class="theorem"><strong class="gc">Invertible parametrization</strong> Let $\x = \gc{\A}\s + \rc{\t}$ be any Guassian with full support. Then, there are parameters $\gc{\B}$, $\rc{\u}$ such that $\gc{\B}$ is square and invertible and $\x = \gc{\B}\s' + \rc{\u}$ describes the same Gaussian.    
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> If $\gc{\A}$ is taller than wide, it can not provide full support, so we may dismiss this case. If $\gc{\A}$ is square and provides full support, then it must be invertible, so we can set $\gc{\A} = \gc{\B}$.

We are left with the case that $\gc{\A}$ is rectangular and wider than tall. Let $\gc{\A} = \rc{\U}\gc{\Sig}\rc{\V}^T$ be the full singular value decomposition of $\gc{\A}$. This gives us

$$\x = \rc{\U}\gc{\Sig}\rc{\V}^T\s + \rc{\t} \p$$

We can rename $\s' = \rc{\V}^T\s$. Since $\rc{\V}$ is an orthogonal transformation (a combination of rotations and flips), $\s'$ is still standard-normally distributed. This gives us

$$\x = \rc{\U}\gc{\Sig}\s' + \rc{\t} \p$$

--image

<p>From the multiplication diagram, we see that $\gc{\Sig}$ contains a number of zero-columns which essentially ignore the corrsponding dimensions of $\s'$. Call $\s'_{\setminus}$ the vector $\s'$ with these dimensions removed, and call $\gc{\sig}_\setminus$ the matrix $\gc{\Sig}$ with the corresponding colums removes. This gives us</p>

$$\x = \rc{\U}\gc{\Sig}_\setminus + \rc{\t} \p $$

We set $\gc{\B} = \rc{\U}\gc{\Sig}$ top obtain the required result. Note that the diagonal of $\gc{\Sig}$ must contain all non-zero elements, or we would not have full support, so that it must be invertible. $\rc{\U}$ is also invertible, since it is orthogonal, and multiplying two invertible matrices together results in another invertible matrix.
<span class="qed"></span>
</div>

If all that seems a bit technical, the key idea is that an affine transformation that results in full support on $\mbR^d$ must map $d$ dimensions in the range to $d$ dimensions in the domain. The rest are dimensions that are ignored (they are in the _null space_ of $\gc{\A}$). The trick is then to isolate just those $d$ dimensions, and to remove the rest from the question. 

The singular value decomposition is just a handy tool to isolate the right dimensions. 


### The sum of two Gaussians is a Gaussian

Let $\a$ be a vector sampled from one Gaussian and $\b$ be a vector sampled from another Gaussian. Sum them together and return the result $\c = \a + \b$. What is the distribution on $\c$? 

That is, if somebody told us that they had done this, but didn't tell us the values of $\a$ and $\b$. What probability density should we assign to them getting a particular value of $\c$?

It may not surprise you to learn that the result is another Gaussian. 

It pays to be careful here. If I give you the probability density functions of two Gaussians, and you create a new probability density function by making a weighted sum of these two densities for a given value $\x$, then the result of that is a mixture-of-Gaussians, which is usually, decidedly not Gaussian. What we are talking about is _sampling_ from two different Gaussians, and then summing the sampled values.   

**question**: I am a teacher and my class has students from two different schools in equal proportion, with different mean grades. The probability over the whole class of someone scoring a grade of $6$ is the average of the probability that someone from school 1 scores a $6$ and the probability that someone from school 2 scores a $6$. Is the result necessarily a Gaussian? Consider what the distribution looks like if the mean grades for the two schools are very far apart. 

**question**: I pair up each student from school 1 with a student from school 2. For one such pair, I test both, and average their grades. What is the distribution on the average I get? Is it Gaussian?

We can prove this property using our geometric construction, but we have to be a little bit more inventive than before. The key is to realize that the _concatenation_ of $\a$ and $\b$ has a Gaussian distribution and that given this concatenation, the sum is just an affine operation.

We'll first show that the concatenation of two Gaussians yields a Gaussian. This is a very intuitive result, that you may well be willing to accept without proof, but it doesn't hurt to be rigorouas. 

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

-- diagram
<span class="qed"></span>
</div>

<div class="theorem"><strong class="gc">Theorem. Sum of Gaussian variables</strong> Let 
$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{, }\\ 
\b &\sim N(\oc{\b_eta}, \bc{\bTau}) \text{ and }\\
\c &= \a + \b \p 
\end{align*}$$
Then $p(\c) = N(\c \mid \oc{\bmu} + \oc{\bnu}, \bc{\Sig} + \bc{\bTau})$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Let $k$ be the dimensionality of $\a$ and $\b$. 

Let $\d$ be the concatenation of $\a$ and $\b$. That is, a vector that has $2k$ elements with the first $k$ elements taken from $\a$, and the remaining $k$ taken from $\b$. The distribution on $\d$ is a Gaussian with the first $k$ elements independent from the remaining $k$ elements.

To see 

</div>

### Chaining Gaussians

<aside>If you're studying diffusion models, pay particular attention to this section. 
</aside>

Here's a situation that comes up occasionally. We sample a vector $\a$ from one Gaussian, and then make this the mean of another Gaussian. Both Gaussians have fixed covariances. We then sample $\b$ from the second Gaussian. What's the distribution on $\b$? Given $\a$, it's a Gaussian, that's how we defined it. But what about $p(\b)$. That is, what if someone told us only they had followed this process, but they didn't tell us what the value of $\a$ was? What probabilities would we assign to a given value of $\b$?

An example is trying to saw one plank to the length of another. You measure the second plank and then saw the first to the length of your measurement. Both steps have some error: there is some error in how accurately you measure, and some error in how accurately you saw. Both processes are probably Gaussian: if you repeat the measurement or the sawing and plot the results, a bell shape will appear. The point here is that for tye sawing, the mean of the bell shape will be at your measurement. If you measure the first plank at 10 cm exactly, then that will be the mean of the Gaussian on your sawing.  

-- plank picture

The question now is what distribution we get if we don't know the measurement. Or, if you like, if we repeat the whole experiment many times. What will the distribution be on the length of plank we saw, combining both the uncertainty in the measuring and in the cutting. 

<aside>Another place this pops up is in Bayesian statistics, where we put <em>priors</em> on the parameters of our distributions. We then imagine the data being generated by first sampling parameters from the prior, and then sampling the data from the distribution wiht the sampled parameters. If both the prior on the mean and the data distribution are Gaussians, the resulting distirbution on the data over all possible values for the mean is also Gaussian. 
</aside>

It turns out that this distribution is Gaussian as well. One way to think of this distribution is as a _convolution_ of the two Gaussians we used for sampling. At every point $\a$ in space we place a Gaussian. The probability density is a mixture of all these Gaussians, weighted by how likely we are to put a Gaussian at $\a$. Put differently, the probability $p(\b)$ assigned to some point is a weighted "sum"---or more precisely an integral---of all the Gaussians we could sample in the first step, all weighted by how likely they are to be sampled.

-- image

We could use this to work out the shape of $p(\b)$, but that would require lots of integrals and formulas. Instead, we will use our geometric perspective to take a shortcut. 

<div class="theorem"><strong>Theorem. Gaussian convolution</strong> Let 
$$\begin{align*}
\a &\sim N(\oc{\bmu}, \bc{\Sig}) \text{ and }\\ 
\b &\sim N(\a, \bc{\bc \T}) \p 
\end{align*}$$
Then, 
$$p(\b) = N(\oc{\bmu}, \bc{\Sig}\bc{\Sig}^T + \bc{\bc \T}\bc{\bc \T}^T) \p$$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> From our geometric definition, we can rewrite $\a$ as 
$$
\a = \bc{\A} \s + \oc{\bmu}
$$
with $\s$ a stand-normally distributed vector, and $\bc{\Sig} = \bc{\A\A}^T$. Likewise we can write,
$$
\b = \bc{\B} \t + \a
$$
with $\t$ a <em>separate</em> standard normally distributed vector and $\bc{\T} = \bc{\B\B}^T$. Note that $\a$ takes the roles of the translation vector in the definition of $\b$.

In this view, we sample $\s$ and $\t$, and then compute $\a$ and $\b$ from them as regular vectors. That means we can plug the definition of $\a$ into that of $\b$ and get 

$$\begin{align*}
\b = \bc{\B} \t + \bc{\A} \s + \bmu \p
\end{align*}$$

The first two terms, $\bc{\B} \t + \bc{\A} \s$ form the sum of two zero centered Gaussians. By the result of the previous section, this is equal to a single Gaussian with covariance $\bc{\Sig}\bc{\Sig}^T + \bc{\bc \T}\bc{\bc \T}^T$.
</div>

In the geometric view, we can say that $\b = \bc{\Y}\u + \bc{\bmu}$, with $\u$ standard normally distributed and $\bc{\Y}\bc{\Y}^T = \bc{\Sig}\bc{\Sig}^T + \bc{\bc \T}\bc{\bc \T}^T$  

<div class="theorem"><strong class="gc">Corollary. Spherical Gaussian convolution</strong> Define $\a$ and $\b$ as before, but with the constraint that they are spherical Gaussians with scalar variances $\bc{\sigma}$ and $\bc{\tau}$ respectively. Then
$$\begin{align*} 
\b \sim N(\co{\t} + {\mathbf \kc{0}}, (\bc{\sigma}^2 + \bc{\tau}^2)\kc{\I}) \;\text{and}\\
\b &= \sqrt{\bc{\sigma}^2 + \bc{\tau}^2}\,\s + \co{\t} 
\end{align*}$$
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span>We take the result from the main proof and assum that $\bc{\Sig}$ is a diagonal matrix with every $\bc{\Sigma}_{ii} = \sigma$ and likewise for $\bc{\T}$. Then $\bc{\Sig}\bc{\Sig}^T$ is a diagonal matrix with all diagonal elements equal to $\bc{\sigma}^2$ and likewise for $\bc{\T}\bc{\T}$ so that 
$$
N(\oc{\bmu}, \bc{\Sig}\bc{\Sig}^T + \bc{\bc \T}\bc{\bc \T}^T) = N(\co{\bt} + {\mathbf \kc{0}}, (\cb{\sigma}^2 + \cb{\tau}^2)\kc{\I})
$$
and the geometric definition follows from ...
</div>

### Conditioning Gaussians

What if we want to _condition_ $\x$ on one or more of its values? For instance, we are interested in the distribution $p(\x \mid x_2=3)$ where $\x$ is drawn from a Gaussian. We can show that the result is, again, a Gaussian.

For a real-world example, we can look at our population of female soldiers again. If the combination of their heights and the weights is normally distributed, then what happens if we slice out only those soldiers that are 190cm tall? Do we get a Gaussian distribution on the weights in this subpopulation? 

This one is a little more complex to prove. We will start with a lemma showing a single, specific, case. If $\x$ is drawn from the standard normal distribution $N(\zero, \I)$, and we condition on one of the elements having a particular value $c$, then the resulting distribution $p(\x\mid x_i = c)$ is standard normal on the remaining elements of $\x$. This result will require us to open the box and to look at the formula for $N(\zero, \I)$, but as we saw earlier, this formula is relatively straightforward.

With that lemma in place, we can then show our main result: that for _any_ variable $y$ with a Gaussian distribution, conditioning on one of the elements of $\y$ results in another Gaussian. This, we can do entirely by the affine operation trick. We will simply show that we can transform the standard Gaussian from our lemma to any other Gaussian with the desired condition, which will prove that the latter is a Gaussian too.

<div class="theorem"><strong class="gc">Lemma. Gaussian conditioning</strong> Let $\x \sim N^n(\zero, \I)$. Then for any element $x_i$, and value $c$,
$$
p(\x \mid x_i = c)
$$
is a standard Gaussian $N^{n-1}(\zero, \I)$ on the remaining elements of $\x$.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> To start with, consider how this conditional distribution is defined. In two dimensions, the situation looks like this.

-- image

The constraint $x_i = c$ tells us that we assume that $\x$ is on the red line. The probability density for points that are not on the line becomes zero. The density for points on the line stays the same, but should be rescaled uniformly so that the probability density, if we integrate over the whole line becomes 1.

<aside>This is the definition of the conditional probability. We take the joint distribution over all outcomes, select a subset of them to condition on, and then rescale the probabilities or probability densities so that the whole probability mass over the subset sums or integrates to 1.
</aside>

Extending this to $n$ dimensions, if we condition on one element $x_i$ of $\x$, the result is that the line becomes an $n-1$ dimensional hyperplane orthogonal to the $i$-th axis. For any point in this hyperplane, we take the probability density under $N^n(\zero, \I)$ and rescale it, so that the whole hyperplane integrates to 1.

This integral sound like a tricky one to work out. Luckily, we don't have to. We just assume it exists, and work around it with the "proportional to" trick we saw earlier. 

To make the notation simpler, we will assume, [without loss of generality](../wlog), that $x_i$ is the last element of $\x$, that is $x_n$. We call the vector $\\x$ with the $n$-th element removed $\x_{\setminus n}$ 

Then if $\x$ has $x_n=c$, we have 

<p>$$\begin{align*}
p(\x \mid x_n = c) &\propto N^n(\zero, \I) \\
&= \text{exp} - \frac{1}{2} \|\x\|^2 \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 + x_n \right) \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 + \rc{c}\right) \\
&= \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 \right) \cdot \rc{ \text{exp} - \frac{1}{2} c} \\
&\propto \text{exp} - \frac{1}{2} \left ({x_1}^2 + \ldots + {x_{n-1}}^2 \right) = \text{exp} -\frac{1}{2} \|\x_{\setminus n}\| \\ 
&= N^{n-1}(\x_{\setminus n}\mid \zero, \I) \p
\end{align*}$$</p>

We see that the probability density that $p(\x \mid x_n =c)$ assigns to the vector $\x$, if $x_n=c$, is proportional to the density that $N^{n-1}(\x_{\setminus n})$ assigns to the first $n-1$  elements of $\x$. Normally, to turn this into a fully determined probability function, we need to figure out what this integrates to and divide by that to turn the $\propto$ into a $=$. However, in this case, we know what the right-hand side integrates to, because $N^{n-1}$ is already a proper probability function, and we are allowing all possible values for $\x_{\setminus n}$. It integrates to $1$, so we can simply say that

$$
p(\x \mid x_n = c) = N^{n-1}(\zero, \I) \p
$$
<span class="qed"></span>
</div>

Why doesn't this argument hold for Gaussians in general? It's the "orthogonal" structure of the standard Gaussian. This allows us to remove one dimension, after which we are left simply with a standard Gaussian of one dimension less. 

Now, to do the same thing for any other Gaussian, we can simply show that it can be transformed to the Lemma above by a simple series of affine operations.

<div class="theorem"><strong class="gc">Theorem. Guassian conditioning.</strong> If we sample $\y$ from any Gaussian, and condition on one of its elements, the resulting distribution, $p(\y \mid y_i = \rc{c})$, is Gaussian. 
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Since $p(\y)$ is Gaussian, there is some $\gc{\A}$ and $\rc{\t}$ so that $\y = \gc{\A}\s + \rc{\t}$ with $\s \sim N(\zero, \I)$. This means that $y_i = \gc{\a}_i\s + \rc{t}_i$, where $\gc{\a}_i$ is the $i$-th row of $\A$. 

-- image: mult. diagram 

Our conditioning $y_i = \rc{c}$, gives us $\gc{\a}_i\s + \rc{t}_i = \rc{c}$, a linear constraint on the values of $\s$. Since it's an extra constraint in one variable, it essentially means that if we know all values of $\x$ except one, say $x_1$, then we can work out what $x_1$ must be. We can show this with some simple re-arranging:

$$\begin{align*}
y_i = \rc{c} &= A_{i1}s_1 + \ldots + A_{in}s_n + t_i\\
s_1 &= - \frac{1}{A_{i1}} \left (A_{i2}s_2 + \ldots + A_{in}s_n - \rc{c}\right) \p
\end{align*}$$

<aside>We could replace $1$ by any index $k$, but the result looks simpler for $x_1$. 
</aside>

The last line represents a constraint on $\s$. We'll refer to this constraint as $c(\s)$, a boolean function which is true if the constraint holds for $\s$.

What we've shown is that just like sampling from $p(\x)$ and transforming to $\y = \gc{\A}\s + \rc{\t}$ gives us a sample from $p(\y)$, sampling from $p(\s\mid c(\x))$ and transforming by $\y = \gc{\A}\s + \rc{\t}$, gives us a sample from $p(\y \mid y_i = \rc{c})$.

Now, since $c(\s)$ linearly expresses one element of $\s$ in terms of the other $n-1$, the $\s$'s that satisfy it form an $n-1$ dimensional hyperplane. It's not axis-aligned, as it was in the lemma, but that can be fixed with a simple rotation. Let $\R$ be an orthogonal matrix such that the transformation 

$\z = \R\s$

when applied to the hyperplane $c(\s)$ yields a hyperplane orthogonal to the $n$ -th axis. 

<aside>Note that $c(\s)$ does not necessarily cross the origin, but that doesn't matter. We just want to rotate it around the origin, until it aligns with the axes. 
</aside>

Since $N(\zero, I)$ is rotationally symmetric, the density of any point $\x$ remains unaffected when it is mapped to $\z$. This tells us that $p(\s \mid c(\s)) = p(\z \mid z_n = \rc{c}')$ for some value $c'$. 

And with that, we can apply our lemma. $p(\z \mid z_n=\rc{c}')$ is a standard Gaussian, by the lemma. $p(\x \mid c(\x))$ is an orthogonal transformation of it, so also a standard Gaussian, and $p(\y \mid y_k=c)$ is an affine transformation of that, so also Gaussian.

-- add images?
<span class="qed"></span>
</div>

Finally, if we want to condition on more than one element of $\y$, we can repeat the same proof for different dimensionalities of hyperplanes, but it's simpler to just apply the theorem multiple times.

<div class="theorem"><strong class="gc">Corollary. Gaussian conditioning on multple elements.</strong> If we sample $\y$ from any Gaussian, and condition on $m$ of its elements, the resulting distribution is Gaussian. 
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> Assume we have a Gaussian $p(y_1, \ldots, \y_n)$. Conditioning on $y_1$ given us, by the theorem, a Gaussian $p(y_2 \ldots, y_{n} \mid y_1)$. Since the latter is a Gaussian, we can condition on one of its elements and, by the theorem get another Gaussian $p(x_3, \ldots x_1, x_2)$. We can do this for any number of elements, and in any order we like.
</div>

**question:** What if you want to know not just whether the conditional a Gaussian is, but _which_ Gaussian? I.e. what are its parameters? How would you proceed? Which elements of the proof would you need to work out in greater detail? 

## The formula

To finish, we will see where that gargantuan formula comes from. With the picture we have built up, of Gaussians as affine transformations of a single standard Gaussian, it's not so complex to derive. We just need one small trick. 

### A change of basis

The key to working out the formula is that, given some Gaussian $\y = \gc{\A}x + \rc{\t}$, we can work out the density of $\y$ by mapping it back to the original $\s$ that generated it, 


## Conclusion

...


##  Appendix

<div class="theorem" markdown="1"><strong class="gc">Invertible alternatives.</strong>
Let $\x \sim p$ and let there be a _non-invertible_ matrix $\gc{\A}$ and vector $\rc{\t}$ such that $\y = \gc{\A}\x + \rc{\t}$ is Gaussian. Then, there is also an invertible $\gc{\A}'$ such that $\y = \gc{\A}\x + \rc{\t}$ is Gaussian.
</div>
<div class="proof" markdown=1><span class="kc">Proof.</span>Note first that it suffices to show that there is an invertible $\gc{\A}'$ such that $\gc{\A}'\x$ is Gaussian. If that is the case, then $\gc{\A}'\x + \rc{\t}$ is also Gaussian.

To establish this, note that by definition there is some $\bc{\B}$
</div>


## Scrap



<div class="theorem"><strong class="gc">Conditioning</strong>
If we sample $\y$ from any Gaussian, and condition on one or more of its elements, the resulting distribution $p(\y \mid y_i = c)$ is Gaussian. 
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