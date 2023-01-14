---
title: the binomial theorem

---

## Summary

The **Binomial theorem** is a generalization of [the rule](square-sum) that says that

$$(\rc{a} + \bc{b})^2 = \rc{a}^2 + 2\rc{a}\bc{b} + bc{b}^2 \p$$

It tells us, for instance that

$$(\rc{a} + \bc{b})^3 = \rc{a}^3 + 3\rc{a}^2\bc{b} + 3\rc{a}\bc{b}^2 + bc{b} ^ 3 \p$$

Or, more to show the pattern more clearly:

$$\begin{align*}
(\rc{a} + \bc{b})^2 =& \rc{a}\rc{a} + \rc{a}\bc{b} + \rc{a}\bc{b} + \bc{b}\bc{b} = \rc{a}\rc{a} + 2\rc{a}\bc{b} + \bc{b}\bc{b}  \\ $$
(\rc{a} + \bc{b})^3 =& \rc{a}\rc{a}\rc{a} + \\ 
\bc{b}\rc{a}\rc{a} + \rc{a}\bc{b}\rc{a} +  + \rc{a}\rc{a}\bc{b} + \\
\rc{a}\bc{b} + \bc{b}\rc{a}\bc{b} +  + \bc{b}\bc{b}\rc{a} + \\
\bc{b}\bc{b}\bc{b} \\ 
= \rc{a}\rc{a}\rc{a} + 3\rc{a}\rc{a}\bc{b} + 3\rc{a}\bc{b}\bc{b} + \bc{b}\bc{b}\bc{b} \\ $$
\end{align*}

The general idea is that we end up with all possible products of three elements chosen from $\rc{a}, \bc{b}$, which each triplet occurring once of every unique way to arrnage its elements: there is only unique one way to arrange three $\rc{a}$'s, so the term $\rc{a}\rc{a}\rc{a} = \rc{a}^3$ only occurs once, but there are three distinct ways to arrange two $\rc{a}$'s and one $\bc{b}$, so that term occurs three times.

In its most compact formulation the binomial theorem looks like this
$$(\rc{\a} + \bc{b})^n = \sum_{k = 0}^n \choose{n}{k} \rc{a}^{n-k}\bc{b}^k \p$$

<aside>We'll derive what this means and where it comes from below.</aside>

Like we saw with the rule for [the square of a sum](square-sum), all of this can be derived from the simple property that _multiplication distributes over addition_.  

## Derivation
