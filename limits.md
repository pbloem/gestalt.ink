---
title: Limits
---

# Limits

## Summary

**Limits** are a mathematical way of talking about the way a function behaves as a particular variable gets closer and closer to a given target value. They are used in many areas of mathematics, for example in the definition of [derivatives](/derivatives).

As an example, consider what happens to the function 

$$
\frac{1}{\bc{x}-1}
$$

as $\bc{x}$ gets closer and closer to $1$. We can't just plug in $1$, because then we'd get a division by $0$, and that's undefined.

<!-- 
<aside>The reason we leave operations like $\bc{x}/0$ undefined and disallow them is that it depends on the context what a good value for them would be. We are usually very happy to just define things in a way that makes sense. For instance for $\bc{x}^0$, it doesn't follow from the definition what this should be, but it makes sense in all contexts to define it as $1$. For $\bc{x}/0$ there is not one value that always makes sense. This is why we leave it undefined, and use limits.
</aside>
 -->

With limits, we can say what the value $\frac{1}{\bc{x}-1}$ _converges to_ as $\bc{x}$ goes to $1$. In fact, with this function, we'll get different answers depending on whether we start with a number larger than 1 and let it get closer to 1 "from above" or whether we approach 1 from below. In the first case, we get larger and larger positive values and in the second we get larger and larger negative values.

We can write that insight down like this:

<p>$$\begin{align*}

\limt{\bc{x} \downarrow 1} \frac{1}{\bc{x}-1} = \infty & & \limt{\bc{x} \uparrow 1} \frac{1}{\bc{x}-1} = -\infty
\end{align*}$$</p>

In general, a limit is written as 

$$
\limt{\bc{x} \to t} f(\bc{x})
$$

and expresses the value that $f(\bc{x})$ converges to if we let $\bc{x}$ get closer and closer to $t$. If it doesn't matter whether we are approaching from above or below, or it's clear from context, we use $\bc{x} \to \t$. If we need to specify from which direction we approach, we use the up or down arrow as shown above. 

One common use of limits is to set $t = \infty$. This lets us express what a function converges to as its input gets larger and larger. Sometimes, the answer is obvious. For instance

<p>$$
\limt{\bc{x} \to \infty} \bc{x}^2 = \infty \p
$$</p>

That is, if we give the function $\bc{x}^2$ bigger and bigger inputs, the outputs will also get bigger and bigger. In other cases we get a finite answer. For instance

<p>$$
\limt{\bc{x} \to \infty} \frac{1}{\bc{x}} = 0 \p
$$</p> 

These two examples are pretty obvious. Here is a more complex example

<p>$$
\limt{\bc{x} \to \infty} \frac{\bc{x} + 1}{2\bc{x} + 5} = \frac{1}{2} \p
$$</p> 

To see, informally, why this answer holds, you can imagine using some very large number like $100\;000$ in place of $\bc{x}$. For such a large number it doesn't really matter that you're adding 1 or 5 to it. And the larger the number gets, the less it matters to the end result: you'll end up pretty much with one number above the fraction bar, and roughly twice that number below, so the result should be close to $1/2$ and get closer to $1/2$ as $\bc{x}$ gets bigger.

Limits are a way to make this kind of reasoning precise, and to help you figure out the answer when the function in question becomes too complex to figure it out by intuition alone.

### On infinities

In limits, you will often see the infinities $\infty$ and $-\infty$ used in the same way that numbers are used. As you may know, we don't usually consider these as part of the set of numbers. When we uses them in the context of limits, they are just a convenient shorthand for saying that either we want to make a particular variable bigger and bigger, or for saying that the limit of a function doesn't converge to a finite values (i.e. the output gets bigger and bigger).

To be precise, the result of a limit can be either a number _or_ positive or negative infinity. The same holds for the target $t$ in the definition of the limit. In most settings, this is only allowed for these two parts of the limit: the variable $\bc{x}$ itself, and any other parts of the function are only allowed to be numbers.

The reason to keep this separation clear is that we don't normally want to treat infinity as a real concept, in the same way we treat numbers. You might hear people say something like "adding infinity to 3 results in infinity", but this kind of reasoning quickly breaks down. It's better to take this as a shorthand for the more precise "adding a very large number to 3 results in another very large number, and as the first number gets larger, the distinction between the two disappears".

In short, infinity is not a point on the number line, _it's a direction_. 

There are no infinitely large or infinitely small quantities, but we can set up a series of values that grow arbitrarily large or arbitrarily small. This is the distinction that the language of limits allows us to capture.

## Working out limits: numerically, informally and analytically

TODO

### The rules

TODO