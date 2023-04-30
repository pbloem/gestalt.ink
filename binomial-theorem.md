---
title: the binomial theorem

---

# The binomial theorem

## Summary

The **Binomial theorem** is a generalization of [the rule](square-sum) that says that

$$(\rc{a} + \bc{b})^2 = \rc{a}^2 + 2\rc{a}\bc{b} + \bc{b}^2 \p$$

It tells us, for instance that

$$(\rc{a} + \bc{b})^3 = \rc{a}^3 + 3\rc{a}^2\bc{b} + 3\rc{a}\bc{b}^2 + \bc{b} ^ 3$$

and it tells us how to do the same for _any_ $(\rc{a} + \bc{b})^n$.

Before we show the full binomial theorem, we can rewrite the expressions above to make the pattern a little more clear.

<p>$$\begin{align*}
(\rc{a} + \bc{b})^2 =&\;\rc{a}\rc{a} + \rc{a}\bc{b} + \bc{b}\rc{a} + \bc{b}\bc{b} = \rc{a}\rc{a} + 2\rc{a}\bc{b} + \bc{b}\bc{b} \\
&\\
(\rc{a} + \bc{b})^3 =&\;\rc{a}\rc{a}\rc{a} + \\ 
&\;\bc{b}\rc{a}\rc{a} + \rc{a}\bc{b}\rc{a} + \rc{a}\rc{a}\bc{b} + \\
&\;\rc{a}\bc{b}\bc{b} + \bc{b}\rc{a}\bc{b} + \bc{b}\bc{b}\rc{a} + \\
&\;\bc{b}\bc{b}\bc{b} \\ 
=&\;\rc{a}\rc{a}\rc{a} + 3\rc{a}\rc{a}\bc{b} + 3\rc{a}\bc{b}\bc{b} + \bc{b}\bc{b}\bc{b} \\ 
\end{align*}$$</p>

The idea is that we end up with all possible products of three elements chosen from $\rc{a}, \bc{b}$, with each pair or triplet occurring once for every unique way to arrange its elements. That is, there is only one unique way to arrange three $\rc{a}$'s, so the term $\rc{a}\rc{a}\rc{a} = \rc{a}^3$ occurs only once, but there are three distinct ways to arrange two $\rc{a}$'s and one $\bc{b}$, so that term occurs three times.

In its most compact form, the binomial theorem looks like this

$$
(\rc{\a} + \bc{b})^n = \sum_{k = 0}^n {n \choose k} \rc{a}^{n-k}\bc{b}^k \p$$

<aside>Don't worry if this looks like gibberish right now. We'll derive what this means and where it comes from below.</aside>

<!-- 
Similar to [the square of a sum](square-sum), all of this can be derived from the simple property that _multiplication distributes over addition_.  
 -->

## Derivation

First, let's see how the pattern emerges. The main tool we have at our disposal is the fact that [multiplication distributes over summation](/square-sum). That is

$$
(\rc{a} + \bc{b}) \gc{c} = \rc{a}\gc{c} + \bc{b}\gc{c} \p
$$

We can derive the binomial theorem by simply repeatedly applying this rule.

We start with the expression

$$
(\rc{a} + \bc{b})^{n+1} = (\rc{a} + \bc{b})\gc{(a + b)^n} \p
$$

Distributing <span class="gc">the factor on the right</span> over the sum on the left, we get

$$
 (\rc{a} + \bc{b})^{n+1} = \rc{a}\gc{(a + b)^n} + \bc{b}\gc{(a + b)^n} \p
$$
 
Applying the same trick again, to the factor in green, we get 

<p>$$\begin{align*}
 (\rc{a} + \bc{b})^{n+1} =\;&\rc{a}\left(\rc{a}\gc{(a + b)^{n-1}} + \bc{b}\gc{(a + b)^{n-1}}\right) \\ + \;&\bc{b}\left( \rc{a}\gc{(a + b)^{n-1}} + \bc{b}\gc{(a + b)^{n-1}} \right) \\ 
 = \;&\rc{a}\rc{a}\gc{(a + b)^{n-1}}\\  + \;&\rc{a}\bc{b}\gc{(a + b)^{n-1}}\\ + \;&\bc{b}\rc{a}\gc{(a + b)^{n-1}}\\ + \;&\bc{b}\bc{b}\gc{(a + b)^{n-1}}  \p
\end{align*}$$</p>

Can you see the pattern? We start with two terms $\rc{a} + \bc{b}$, and at each step we "unroll" one of the factors of $(\rc{a} + \bc{b})^n$. Every time we do this, we get two new terms for each term in the original sum: one that adds a factor $\rc{a}$ and one that adds a factor $\bc{b}$. Essentially, we are enumerating all series of $n$ letters that we can build up from the letters $\rc{a}$ and $\bc{b}$. We can draw this as a tree.

<figure class="narrow centering">
<img src="/images/binomial-tree.svg"  >
<figcaption>The terms of the expansion of $(\rc{a} + \bc{b})^3$ are generated in a kind of binary tree-structure. Starting with a single &ldquo;empty&rdquo; term, each step turns one of the previous terms into two longer terms, by adding either an $\rc{a}$ or a $\bc{b}$.
</figcaption>
</figure>

All of the distinct series that we can make in this way become one term in our final product. This shows where the pattern we saw earlier comes from. If such a series contains only $\rc{a}$'s or $\bc{b}$'s, there's only one such series, so there is only one corresponding term for each. 

However, there are many series with three $\rc{a}$'s and four $\bc{b}$'s. For instance $\bc{b}\rc{a}\bc{b}\rc{a}\bc{b}\rc{a}\bc{b}$ and $\rc{a}\rc{a}\rc{a}\bc{b}\bc{b}\bc{b}\bc{b}$. Each such series becomes a term in our sum. Since these are products, the order of the elements doesn't matter: they all have the same value. Therefore, we can bundle them in the expression 

$$
\gc{c} \rc{a}\rc{a}\rc{a}\bc{b}\bc{b}\bc{b}\bc{b} = \gc{c}\rc{a}^\rc{3}\bc{b}^\bc{4}
$$

where $\gc{c}$ is the number of series we can make with three $\rc{a}$'s and four $\bc{b}$'s. All we need to do is to figure out what $\gc{c}$ is: the number of ways to make a sequence out of three $\rc{a}$'s and four $\rc{b}$'s.

<aside>If you're up on your combinatorics, you should be able to write this down right away, using the binomial coefficient. We won't assume that here, and derive everything we need from first principles.
</aside>

The first thing we need to work this out is the _factorial function_. This function takes a positive integer and multiplies it by all the positive integers below it. It's written with an exclamation mark, for instance:

$$
7! = 7 \times 6 \times 5 \times 4 \times 3 \times 2 \times 1 \kc{ = 5040}\p
$$

The factorial is the basic building block of _combinatorics_: the mathematics of counting how many ways things can be arranged. The reason that it's so important is that if you have a set of $n$ things, for instance people, then $n!$ is the number of ways you could line those $n$ people up.

This is easy to see, if you imagine choosing the positions in the line one by one: for the first position in your line, you have $n$ options. Every person could be the first in the line. Once you've chosen the first person, whoever it is, there are always $n-1$ people left to choose. This means there are $n \times (n-1)$ ways to fill the first two positions. Continuing the pattern we get $n \times (n-1) \times (n-2)$ ways to fill the first three positions and so on, until we ultimately get $n \times (n-1) \times \ldots \times 2 \times 1 = n!$ ways to fill all positions.

We can translate this logic to our setting. For a "set" of things $\rc{a}, \rc{a}, \rc{a}, \bc{b}, \bc{b}, \bc{b}, \bc{b}$, we want to figure out how many ways there are to arrange them. By the logic above, this would be $7!$. The problem is that we are counting some sequences multiple times: for our purposes, it doesn't matter if we put the first $\rc{a}$ in the first place and the second $\rc{a}$ in the second or vice versa. The result counts as the same sequence. We only count two sequences as different if one has an $\rc{a}$ where the other has a $\bc{b}$. In short, we are overcounting our sequences.

Luckily, we can correct this with the same factorial-based logic. In our enumeration of all $7!$ orderings of $\rc{a}, \rc{a}, \rc{a}, \bc{b}, \bc{b}, \bc{b}, \bc{b}$ how often do we encounter the sequence $\rc{a}\rc{a}\rc{a}\bc{b}\bc{b}\bc{b} \bc{b}$? Well, by the logic above, there are $\rc{3}!$ ways to arrange the different $\rc{a}$'s in this configuration and $\bc{4}!$ ways to arrange the different $\bc{b}$'s, so $\rc{3}!\times\bc{4}!$ in total. 

What's more, this holds for every configuration of three $\rc{a}$'s and four $\bc{b}$'s: for every series with these ingredients, it occurs exactly $\rc{3}!\bc{4}!$ times in the enumeration of all $7!$ arrangements. Once the positions of the $\rc{a}$'s and $\bc{b}$'s have been selected, there are $\rc{3}!$ ways to place the three different $\rc{a}$'s in those positions and $\bc{4}!$ ways to place the four different $\bc{b}$'s in those positions.

This means that we can simply divide these out to get the correct count:

$$
\frac{7!}{\rc{3}!\bc{4}!} = \frac{5040}{6 \cdot 24} = 35 \p
$$ 

<aside>Each series occurs $\rc{3}!\bc{4}!$ times in a collection of $7!$ series, so if $\gc{c}$ is the number of series (the number we want to work out), we have $\rc{3}!\bc{4}!\gc{c} = 7!$
</aside>

This function, where we count the number of arrangements of $\gc{n}$ items and then correct for the fact that one group of $\oc{k}$ and one group of $\gc{n}-\oc{k}$ are considered "the same," is called the _binomial coefficient_. We write it as follows:

$$
{\gc{n} \choose \oc{k}} = \frac{\gc{n}!}{(\gc{n}-\oc{k})!\oc{k}!} \p
$$

<aside>
This is pronounced &ldquo;$\gc{n}$ choose $\oc{k}$.&rdquo; It is <em>also</em> the number of ways to pick $\oc{k}$ out of $\gc{n}$ people, but that perspective is not relevant for us here.
</aside>

With this, we can return to our problem of bundling terms together. We now know that there are $7 \choose 3$ terms in total with three $\rc{a}$'s and four $\bc{b}$'s, and that all these terms have the same value. This means we can write all of them together as 

$$
{7 \choose 3} \rc{a}^3\bc{b}^4 \p
$$

Or, more generally, if we are rewriting the expression $(\rc{a} + \bc{b})^n$, then each term with $k$ $\rc{a}$'s occurs $n \choose k$ times, which we can bundle as 

$$
{n \choose k} \rc{a}^k\bc{b}^{n-k} \p
$$

Finally, we can sum together all these bundles for all possible numbers of $\rc{a}$'s from $0$ to $n$, which gives us 

$$
(\rc{a} + \bc{b})^n = \sum_{k = 0}^n {n \choose k} \rc{a}^k\bc{b}^{n-k} \p
$$

And there we have it, the binomial theorem. 

## Applications 

So, we've shown that we can take any sum of the form $(\rc{a} + \bc{b})^n$ and rewrite it as $\sum_{k = 0}^n {n \choose k} \rc{a}^k\bc{b}^{n-k}$. What does this buy us? In what situations are we likely to encounter such sums and why would we prefer the second formulation?

### Derivatives

<div class="prel">preliminaries:</div>
* [limits](/limits)
* [derivatives](/derivatives)

One simple example is working out [derivatives](/derivatives). Remember that the derivative of $f(x)$ tells us how much $f(x)$ changes proportional to the change in $x$ for a vanishingly small change. Symbolically:

$$
f'(x) = \underset{\oc{\epsilon} \to 0}{\text{lim}}\frac{f(x + \oc{\epsilon}) - f(x) }{\oc{\epsilon}} \p
$$

For instance, if $f(x) = x^3$, we get:

<p>$$\begin{align*}
f'(x) = \limt{\oc{\epsilon}} \frac{(x + \oc{\epsilon})^3 - x^3}{\oc{\epsilon}} \p
\end{align*}$$</p>

Like this, we cannot get rid of the fraction by canceling the $\oc{\epsilon}$ against anything above the fration bar. However, rewriting with the binomial theorem, we get

$$
f'(x) = \limt{\oc{\epsilon}} \frac{xxx + 3\oc{\epsilon}xx + 3\oc{\epsilon}\oc{\epsilon}x + \oc{\epsilon}\oc{\epsilon}\oc{\epsilon} - xxx}{\oc{\epsilon}} \p
$$

<aside>The last term $-xxx$ is not part of the binomial expansion, but is the $-x^3$ in the previous formula.</aside>

This gives us 
<p>$$
f'(x) = \limt{\oc{\epsilon}} \frac{3xx\oc{\epsilon} + 3x\oc{\epsilon}\oc{\epsilon} + \oc{\epsilon}\oc{\epsilon}\oc{\epsilon}}{\oc{\epsilon}} = \limt{\oc{\epsilon}}\;3xx + 3x\oc{\epsilon} + \oc{\epsilon}\oc{\epsilon} = 3x^2 \p
$$</p>

In short, we have proved the derivative rule for $x^3$. 

For general exponents $x^n$, we can repeat the same argument. We will always get a binomial expansion above the division line, from which the term $x^n$ cancels out against the term $-x^n$ that the definition of the derivative gives us. Then, the remaining terms all have at least one $\oc{\epsilon}$ so we can cancel the division by $\oc{\epsilon}$. Before we do this, there is one term ${n \choose 1}\oc{\epsilon}x^{n-1}$, which becomes ${n \choose 1}x^{n-1}$ after cancellation. Note that ${n \choose 1} = n$ so we get 

$$
n x^{n-1} \p
$$ 

This term doesn't contain $\oc{\epsilon}$, so it remains when we take the limit. The other terms all at least one $\oc{\epsilon}$ after the cancellation, which means that they go to zero with the limit and only the familiar expression above remains as the derivative of $x^n$.

<aside>This assumes that $n$ is a positive integer. To show that this rule also holds if the exponent is not a positive integer, we need the <a href="">generalized binomial theorem</a>.
</aside>

### Expressing $e$

<div class="prel">preliminaries:</div>
* [limits](/limits)

Imagine that you have a bank account that doubles whatever you put in after a decade. You put in a dollar, and 10 years later, you have 2 dollars. 

That's great, but the bank also allows you to take your money plus interest out before the decade is over. For instance, if you take it out halfway through, you get <span class="rc">your dollar back, together with half a dollar of interest</span>. You quickly realize that if you do this, and then put your <span class="rc">1.5 dollars</span> back into the bank for the remainder of the decade, you end up with more money than if you'd just let the money sit there for a whole decade.

Specifially, you'd earn

$$
\rc{\left(1 + \frac{1}{2}\right)} + \frac{1}{2}\rc{\left(1 + \frac{1}{2}\right)} \kc{= \left(1 + \frac{1}{2}\right)\left(1 + \frac{1}{2}\right) =} \left(1 + \frac{1}{2}\right)^2 \p
$$

The result is that you get 2.25 dollar at the end of the decade. This trick is called **compounding**. If the bank allows it, we can compound more frequently. For instance, three times at three equally spaced points in the decade. The resulting payoff after two compounding steps would be 

$$
\rc{\left(1 + \frac{1}{3}\right)} + \frac{1}{3}\rc{\left(1 + \frac{1}{3}\right)} = \bc{\left(1 + \frac{1}{3}\right)^2}
$$

and after three steps
 
$$
\bc{\left(1 + \frac{1}{3}\right)^2} + \frac{1}{3}\bc{\left(1 + \frac{1}{3}\right)^2} = \left(1 + \frac{1}{3}\right)^3 \p
$$

At this point, you can probably guess the pattern: if we divide the decade into $n$ intervals of equal length, and compound $n$ times, the amount of money we make is

$$
\left (1 + \frac{1}{n}\right)^n \p
$$

Assuming that more compounding alway leads to more money (which it does), what's the most we could make? In other words, what's the limit of this expressing as n goes to infinity?

This is the definition of the number $e = 2.71828 \ldots$, **Euler's number**. This is one of those famous constants that crops up in many different settings. It was first discovered in the study of compounding interest.

The relevance to the binomial theorem is that this expression fits the pattern $(\rc{a} + \bc{b})^n$ with $\rc{a} = 1$ and $\bc{b} = \cfrac{1}{n}$. That means we can use the binomial theorem with derive an alternative expression of $e$.

Let's start with the official definition.

$$
e = \limt{n \to \infty} \left(\rc{1} + \bc{\frac{1}{n}}\right)^n
$$

With the binomial theorem, the expression inside the limit rewrites to 

<p>$$
\sum_{k\in 0..n} {n \choose k} \rc{1}^{n-k} \left(\bc{\frac{1}{n}}\right)^{k} = \sum_{k\in 0..n} \frac{n!}{k!(n-k)!} \frac{1}{n^k} = \sum_{k\in 0..n} \frac{1}{k!} \gc{ \frac{n!}{(n-k)!}} \frac{1}{n^k} \p
$$</p>

Now, look at that <span class="gc">middle factor</span>. The top part multiplies all positive integers from 1 to $n$, and the bottom part divides out all positive integers from 1 to $n-k$. This means we end up with the product of all integers from $n-k +1$ to $n$, which the next factor divides by $n^k$

<p>$$
\sum_{k\in 0..n} \frac{1}{k!} \frac{\rc{n}\bc{(n-1)} \ldots \gc{(n-k+1)}}{n^k} = \sum_{k\in 0..n} \frac{1}{k!} \frac{\rc{n}}{n}\frac{\bc{(n-1)}}{n} \ldots \frac{\gc{(n-k+1)}}{n}  \p
$$</p>

As the coloring suggests, we can pair up each factor above the division line with a factor of $n$ below. If $k = 0$, we get just the $n/n$ factor which is equal to $1$. If $k$ is larger than 0, we multiply this by a number of fractions that are each between $0$ and $1$. This total product gets smallest when $k=1$ and we are multiplying all fractions from $n/n$ to $1/n$, which we can also write as $\frac{n!}{n^n}$. 

What the value of this product is, depends on $k$. For $k=0$ we get just the factor $n/n$, so the result is 1, but for $k=n$ we get a product of many factors, all less than or equal to 1, with the last one $1/n$, so we converge to $0$ with large $n$. 

We can't simplify this expression any further, but often, taking limits helps to simplify things. Placing this back into the original limit, we get

<p>$$
\limt{n \to \infty} \sum_{k\in 0..n} \frac{1}{k!} \frac{\rc{n}}{n}\frac{\bc{(n-1)}}{n} \ldots \frac{\gc{(n-k+1)}}{n} \p
$$</p>

What we want to show is that as we take $n$ to infinity, we can set the factor $\frac{\rc{n}}{n}\frac{\bc{(n-1)}}{n} \ldots \frac{\gc{(n-k+1)}}{n}$ equal to 1. The idea is that the terms that matter in this sum are the ones with relatively low $k$'s. For the rest, the factor $\frac{1}{k!}$ goes to zero very quickly and the other factors are always less than 1. If we focus only on these lower terms, then we see that $\frac{\rc{n}}{n}\frac{\bc{(n-1)}}{n} \ldots \frac{\gc{(n-k+1)}}{n}$ contains only a relatively small number of factors each with the numerator relatively close to the denominator, since we let the latter go to infinity.

To make this precise, we'll define $n = m^2$, and let $m$ go to infinity. This gives us

<p>$$
\limt{m \to \infty} \sum_{k\in 0..m^2} \frac{1}{k!} \frac{\rc{m^2}}{m^2}\frac{\bc{(m^2-1)}}{m^2} \ldots \frac{\gc{(m^2-k+1)}}{m^2} \p
$$</p>

We can now break the sum up into the first $m$ terms and the remainder:

<p>$$
\limt{m \to \infty} \sum_{k\in 0..m} \frac{1}{k!} \frac{\rc{m^2}}{m^2}\frac{\bc{(m^2-1)}}{m^2} \ldots \frac{\gc{(m^2-k+1)}}{m^2} \\+ \sum_{k\in m+1..m^2} \frac{1}{k!} \frac{\rc{m^2}}{m^2}\frac{\bc{(m^2-1)}}{m^2} \ldots \frac{\gc{(m^2-k+1)}}{m^2}\p
$$</p>

In the limit, the second sum goes to zero: each term is made up of $\frac{1}{k!}$ multiplied by various factors that are 1 or smaller, so each is smaller than $\frac{1}{k!}$. Moreover, we start at $\frac{1}{(m+1)!}$, with $m$ going to infinity, so the first and largest term goes to zero. 

<aside>
For completenes, we should also check that $\sum_{k\in m+1..m^2} \frac{1}{k!}$ does not diverge as $m$ grows: it could be that all terms shrink to zero, but the number of terms grows quickly enough to counter this. In this case $k! > 2^k$ for large enough $k$ so for some $r$ $\sum_{k\in r..\infty} \frac{1}{k!} < \sum_{k \in r..\infty} \frac{1}{2^{k}} < 1$. 
</aside>

This leaves us with just 

<p>$$
\limt{m \to \infty} \sum_{k\in 0..m} \frac{1}{k!} \frac{\rc{m^2}}{m^2}\frac{\bc{(n-1)}}{m^2} \ldots \frac{\gc{(m^2-k+1)}}{m^2} \p
$$</p>

All factors apart from $\frac{1}{k!}$ are between $0$ and $1$. The smallest is the rightmost factor for the largest value of $k$, $k = m$. If we can show that that one converges to $1$ with $m \to \infty$, then the rest of them are squeezed between that one and $n/n=1$ so they too must all converge to 1. This is a straightforward limit to work out 

<p>$$\begin{align*}
\limt{m \to \infty}\frac{\gc{(m^2-m+1)}}{m^2} &\kc{= \limt{m \to \infty} \frac{m^2}{m^2}-\frac{m}{m^2}+\frac{1}{m^2}} \\
&=\kc{ \limt{m} \frac{m^2}{m^2} - \limt{m} \frac{m}{m^2} + \limt{m} \frac{1}{m^2} } \\
&= 1 \kc{\;-\;0\;+\;0 } \p
\end{align*}$$</p>

This gives us the simplification we were looking for. All factors except $\frac{1}{k!}$ go to 1 as $m$ goes to infinity. This leaves us with 

<p>$$
e = \limt{m \to \infty} \sum_{k\in 0..m} \frac{1}{k!} 
$$</p>

or more simply 

<p>$$
e = \sum_{k\in 0..\infty} \frac{1}{k!} \p
$$</p>

That is, if we compute the series 

$$
\frac{1}{1} + \frac{1}{1} + \frac{1}{1 \cdot 2} + \frac{1}{1 \cdot 2 \cdot 3} + \frac{1}{1 \cdot 2 \cdot 3 \cdot 4} + \ldots
$$

each term we add will give us an increasingly accurate approximation of $e$. You can imagine that especially in the days before calculators, this definition of $e$ made it much easier to compute than the one we started with.
