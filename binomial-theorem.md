---
title: the binomial theorem

---

## Summary

The **Binomial theorem** is a generalization of [the rule](square-sum) that says that

$$(\rc{a} + \bc{b})^2 = \rc{a}^2 + 2\rc{a}\bc{b} + \bc{b}^2 \p$$

It tells us, for instance that

$$(\rc{a} + \bc{b})^3 = \rc{a}^3 + 3\rc{a}^2\bc{b} + 3\rc{a}\bc{b}^2 + \bc{b} ^ 3$$

and it tells us how to do the same for _any_ $(\rc{a} + \bc{b})^n$

Or, to show the pattern more clearly:

<p>$$\begin{align*}
(\rc{a} + \bc{b})^2 =&\;\rc{a}\rc{a} + \rc{a}\bc{b} + \bc{b}\rc{a} + \bc{b}\bc{b} = \rc{a}\rc{a} + 2\rc{a}\bc{b} + \bc{b}\bc{b} \\
&\\
(\rc{a} + \bc{b})^3 =&\;\rc{a}\rc{a}\rc{a} + \\ 
&\;\bc{b}\rc{a}\rc{a} + \rc{a}\bc{b}\rc{a} + \rc{a}\rc{a}\bc{b} + \\
&\;\rc{a}\bc{b}\bc{b} + \bc{b}\rc{a}\bc{b} + \bc{b}\bc{b}\rc{a} + \\
&\;\bc{b}\bc{b}\bc{b} \\ 
=&\;\rc{a}\rc{a}\rc{a} + 3\rc{a}\rc{a}\bc{b} + 3\rc{a}\bc{b}\bc{b} + \bc{b}\bc{b}\bc{b} \\ 
\end{align*}$$</p>

The general idea is that we end up with all possible products of three elements chosen from $\rc{a}, \bc{b}$, which each triplet occurring once of every unique way to arrange its elements. That is, there is only unique one way to arrange three $\rc{a}$'s, so the term $\rc{a}\rc{a}\rc{a} = \rc{a}^3$ only occurs once, but there are three distinct ways to arrange two $\rc{a}$'s and one $\bc{b}$, so that term occurs three times.

In its most compact formulation the binomial theorem looks like this

$$
(\rc{\a} + \bc{b})^n = \sum_{k = 0}^n {n \choose k} \rc{a}^{n-k}\bc{b}^k \p$$

<aside>We'll derive what this means and where it comes from below.</aside>

Like we saw with the rule for [the square of a sum](square-sum), all of this can be derived from the simple property that _multiplication distributes over addition_.  

## Derivation

First, let's see how the pattern we saw above emerges. The main tool we have at our disposal is the face that [multiplication distributes over summation](/square-sum). That is

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
<figcaption>The terms of the expansion of $(\rc{a} + \bc{b})^3$ are generates in a kind of binary tree-structure. Starting with a single &ldquo;empty&rdquo; term, each step turns one of the previous terms into two longer terms, by adding either an $\rc{a}$ or a $\bc{b}$.
</figcaption>
</figure>

All of the distinct series that we can make in this way become one term in our final product. This shows where the patternwe saw earlier comes from. If such a series contains only $\rc{a}$'s or $\bc{b}'s$, there's only one such series, so there is only one corresponding term for each. 

However, there are many series with three $\rc{a}$'s and four $\bc{b}$'s. For instance $\bc{b}\rc{a}\bc{b}\rc{a}\bc{b}\rc{a}\bc{b}$ and $\rc{a}\rc{a}\rc{a}\bc{b}\bc{b}\bc{b}\bc{b}$. Each such series becomes a term in our sum. Since these are products, they all have the same value, so we can bundle them in the expression 

$$
\gc{c} \rc{a}\rc{a}\rc{a}\bc{b}\bc{b}\bc{b}\bc{b} = \gc{c}\rc{a}^\rc{3}\bc{b}^\bc{4}
$$

where $\gc{c}$ is the number of series we can make with three $\rc{a}$'s and four $\bc{b}$'s. All we need to do is to figure out what $\gc{c}$ is.

<aside>If you're up on your combinatorics, you should be able to write this down right away, using the choose function. For now, we'll work from first principles.
</aside>

The first thing we need to work this out is the _factorial function_. This function takes a positive integer and multiplies it by all the positive integers below it. It's written with an exclamation mark, for instance:

$$
7! = 7 \times 6 \times 5 \times 4 \times 3 \times 2 \times 1 \kc{ = 5040}\p
$$

The factorial is the basic building block of combinatorics: the mathematics of counting how many ways things can be arranged. The reason is that if you have a set of $n$ things, for instance people, then $n!$ is the number of ways you could line those $n$ people up. 

This is easy to see, if you imagine choosing the positions in the line one by one: for the first position in your line, you have $n$ options. Every person could be the first in the line. Once you've chosen the first person, whoever is, there are always $n-1$ people left to choose. This means there are $n \times (n-1)$ ways to fill the first two positions. Continuing the pattern we get $n \times (n-1) \times (n-2)$ ways to fill the first three positions and so on, until we ultimately get $n \times (n-1) \times \ldots \times 2 \times 1 = n!$ ways to fill all positions.

We can translate this logic to our setting. For a "set" of things $\rc{a}, \rc{a}, \rc{a}, \bc{b}, \bc{b}, \bc{b}, \bc{b}$, we want to figure out how many ways there are to arrange them. By the logic above, this would be $7!$. The problem is that we are counting some sequences multiple times. For our purposes, it doesn't matter if we put tghe first $\rc{a}$ in the first place of and the second $\rc{a}$ in the second. The result counts as the same sequence. We only count two sequences as different if one has an $\rc{a}$ where the other has a $\bc{b}$.In short we are overcounting our sequences.

Luckily, we can correct this with the same factorial-logic. In our enumeration of all orderings of $\rc{a}, \rc{a}, \rc{a}, \bc{b}, \bc{b}, \bc{b}, \bc{b}$, assuming they're all different, how often do we see the sequence $\rc{a}\rc{a}\rc{a}\bc{b}\bc{b}\bc{b} \bc{b}$? Well, by the logic above, there are $\rc{3}!$ ways to arrange the different $\rc{a}$'s in this configuration and $\bc{4}!$ ways to arrange the different $\bc{b}$'s, so $\rc{3}!\times\bc{4}!$ in total. 

What's more, this holds for every configurations of three $\rc{a}$'s and four $\bc{b}$'s: for every series with these ingredients, it occurs exactly $\rc{3}!\bc{4}!$ times in the enumeration of all $7!$ arrangements. This means that we can simply divide these out to get the correct count:

$$
\frac{7!}{3!4!} = \frac{5040}{6 \cdot 24} = 35 \p
$$ 

This function, where we count the number of arrangements if $\gc{n}$ items and then correct for the fact that one group of $\oc{k}$ and one group of $\gc{n}-\oc{k}$ are considered "the same", is called the _choose function_. We write it as follows:

$$
{\gc{n} \choose \oc{k}} = \frac{\gc{n}!}{(\gc{n}-\oc{k})!\oc{k}!} \p
$$

<aside>
This is pronounced &ldquo;<span class="gc">n</span> choose <span class="oc">k</span>.&rdquo;
</aside>
With this, we can return to our problem of bundling terms together. We now know that there are $7 \choose 3$ terms in total with three $\rc{a}$'s and four $\bc{b}$'s, and that all these terms have the same value. This means we can write all of them together as 

$$
{7 \choose 3} \rc{a}^3\bc{b}^4 \p
$$

Or, more generally, if our goal is $(\rc{a} + \bc{b})^n$, then each term with $k$ $\rc{a}$'s occurs $n \choose k$ times, which we can bundle as 

$$
{n \choose k} \rc{a}^k\bc{b}^{n-k} \p
$$

Finally, we can sum together all these bundles for all possible numbers of $\rc{a}$\s from $0$ to $n$, which gives us 

$$
(\rc{a} + \bc{b})^n = \sum_{k = 0}^n {n \choose k} \rc{a}^k\bc{b}^{n-k} \p
$$

And there we have it, the Binomial theorem. 

## Applications 

So, we've shown that we can take any sum of the form $(\rc{a} + \bc{b})^n$ and rewrite it as $\sum_{k = 0}^n {n \choose k} \rc{a}^k\bc{b}^{n-k}$. What does this buy us. In what situations are we likely to encounter such sums and why would we prefer the second formulation?

One simple example is working out [derivatives](/derivatives). Remember that the derivative of $f(x)$ as how much $f(x)$ proportional to the change in $x$ for a vanishingly small change. Symbolically:

$$
f'(x) = \lim_{\oc{\epsilon} \to 0}\frac{f(x + \oc{\epsilon}) - f(x) }{\oc{\epsilon}} \p
$$

For a specific function, we can work this out. For instance, if $f(x) = x^3$, we get:

<p>$$\begin{align*}
f'(x) = \lim_\oc{\epsilon} \frac{(x + \oc{\epsilon})^3 - x^3}{\oc{\epsilon}} \p
\end{align*}$$</p>

In this formulation, we're not allowed to cancel anything in the fraction. However, rewriting with the binomial theorem, we get

$$
f'(x) = \lim_\oc{\epsilon} \frac{xxx + 3\oc{\epsilon}xx + 3\oc{\epsilon}\oc{\epsilon}x + \oc{\epsilon}\oc{\epsilon}\oc{\epsilon} - xxx}{\oc{\epsilon}} \p
$$

<aside>The last term $-xxx$ is not part of the binomial expansion, but is the $-x^3$ in the previous formula.</aside>

This gives us 
<p>$$
f'(x) = \lim_\oc{\epsilon} \frac{3xx\oc{\epsilon} + 3x\oc{\epsilon}\oc{\epsilon} + \oc{\epsilon}\oc{\epsilon}\oc{\epsilon}}{\oc{\epsilon}} = \lim_\oc{\epsilon} 3xx + 3x\oc{\epsilon} + \oc{\epsilon}\oc{\epsilon} = 3x^2 \p
$$</p>

In short, we have proved the derivative rule for $x^3$. 

For general exponents $x^n$, we can repeat the same argument. We will always get a binomial expansion above the division line, from which the term $x^n$ cancels out against the term $-x^n$ that the definition of the derivative gives us. Then, the remaining terms all have at least one $\oc{\epsilon}$ so we can cancel the division by $\oc{\epsilon}$. Before we do this, there is one term ${n \choose 1}\oc{\epsilon}x^{n-1}$, which becomes ${n \choose 1}x^{n-1}$ after cancellation. Note that ${n \choose 1} = n$ so we get 

$$
n x^{n-1} \p
$$ 

This term doesn't contain $\oc{\epsilon}$, so it remains when we take the limit. The other terms all contain more than one $\oc{\epsilon}$ before the cancellation, so at least one after, which means that they go to zero with the limit and only the familiar expression above remains as the derivative of $x^n$.

<aside>This assumes that $n$ is a positive integer. To show that this rule also holds if the exponent is not a positive integer, we need the <a href="">generalized binomial theorem</a>.
</aside>











