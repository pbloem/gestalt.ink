---
title: The square of a sum
---

# The square of a sum

## Summary

The square of a sum with two terms, like $\rc{a} + \bc{b}$ squared, can be rewritten by the following formula

$$(\rc{a} + \bc{b})^2 = \rc{a}^2 + 2\rc{a}\bc{b} + \bc{b}^2 \p$$

For example

$$16 = (\rc{1} + \bc{3})^2 = \rc{1}^2 \,+\, 2\cdot\rc{1} \cdot\bc{3} \,+\, \bc{3}^2 = 1 + 6 + 9\p$$

This is an important rule that comes up a lot, so it's good to get familiar with it.

## Derivation

We can derive this rule simply from the _distributive_ property of multiplication. 

Imagine that you want to buy apples for a children's birthday party of 4 boys and 5 girls. Each child should get <span class="gc">two apples</span>. How many apples should you buy? 

Do you add up the boys and girls first and then multiply by <span class="gc">two</span>, or do you multiply the number of girls by <span class="gc">two</span>, the number of boys by <span class="gc">two</span> and then add these together? 

The answer is that it doesn't matter, of course, because

$$(4 + 5) \cdot \gc{2} = 4 \cdot \gc{2}\,+\, 5 \cdot \gc{2} \p $$

We say that the multiplication by $\gc{2}$ _distributes_ over the summation of 4 and 5. For three numbers $a$, $b$ and $\gc{x}$ we know that  

$$(a + b)\gc{x} = a\gc{x}\, +\, b\gc{x} \p $$

With this knowledge, we can work out what happens if $\gc{x}$ itself is _also_ a sum: $\gc{x} = \gc{c} + \gc{d}$

$$\begin{align*}
(a + b)\gc{x} &= a\gc{x} + b\gc{x} \\
  &= a\gc{(c + d)} + b\gc{(c + d)} \p\\
\end{align*}$$

Now, we can just apply distribution again on both terms of this final sum to get

$$
a\gc{(c + d)} + b\gc{(c + d)} = a\gc{c} + b\gc{d} + b\gc{c} + b\gc{d} \p\\
$$

How does this relate to our original problem of $(\rc{a} + \bc{b})^2$? That one is just a special case of $(\rc{a} + \bc{b})(c + d)$ because $(\rc{a} + \bc{b})^2 = (\rc{a}+ \bc{b})(\rc{a} + \bc{b})$. Following the same derivation as before, we get 

$$\begin{align}
(\rc{a} + \bc{b})(\rc{a} + \bc{b}) &= (\rc{a} + \bc{b})\rc{a} + (\rc{a} + \bc{b})\bc{b} \\
&= \rc{a}\rc{a} + \bc{b}\rc{a} + \rc{a}\bc{b} + \bc{b}\bc{b} \\
&= \rc{a}^2 + 2\rc{a}\bc{b} + \bc{b}^2 \p
\end{align}$$

## Illustration

This particular formula can be illustrated very neatly with a simple diagram. Note that the reason we call the operation of raising something to the second power a _square_, is because $x^2$ gives us the area of a square with sides of length $x$.

That suggests that we can draw a square for $(\rc{a} + \bc{b})^2$ with sides of length $\rc{a} + \bc{b}$ and its area should sum up to $\rc{a}^2 + 2\rc{a}\bc{b} + \bc{b}^2$.

<figure class="narrow centering">
<img src="/images/sum-square.svg" class="half" >
<figcaption>
An illustration of the sum/square rule.
</figcaption>
</figure>

**question** We showed above that the formula for the square of a sum was a specific case of the rule 

$$(\rc{a} + \bc{b})(c + d) = \rc{a}c + \rc{a}d + \bc{b}c + \bc{b}d$$. 

That suggests that this rule could be similarly illustrated with a diagram. What would this diagram look like?   

## Generalizations

### Binomial theorem

What if we have $(\rc{a} + \bc{b})^3$ or $(\rc{a} + \bc{b})^5$? We can work these out step by step with the distributive property, but it gets a bit hairy, and it becomes very easy to make a mistake. Happily, there's a general rule called **the [binomial theorem](/binomial-theorem)** which can tell us exactly how to get rid of the brackets. 

<aside>The Binomial theorem also has generalizations for any power of a sum of the form $(\rc{a} + \bc{b})^\frac{n}{m}$. This form was first worked out by Newton.</aside>

If the sum itself contains more than two terms, things get even more complicated. In that case we need the **Multinomial theorem**.
