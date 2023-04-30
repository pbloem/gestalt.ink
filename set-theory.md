---
title: Set theory 
---

# Set theory

## Summary

Set theory is a mathematical language used to define collections of things. It plays a central role in mathematics because it is often used as a languag ein which to define other mathematical concepts.

The basic idea of sets is very simple. We first need to define a _universe of objects_. This could be all people in the Netherlands, all women who have won oscars, or all natural numbers.

<aside>We can have a finite or infinite amount of objects in our universe.
</aside>

<p>Once we have our universe defined we can form <strong>sets</strong> of things in the universe. For instance, for the universe of women who have won oscars we can form a set contained elements from that universe. A set is indicated by curly brackets $\{$ and $\}$. The simplest way to specify a set is simply to specify its content as a list delimited by commas:</p>

$$
F = \left\{\text{MichelleYeoh}, \text{ChloeZhao}, \text{KathrynBigelow}\right\} \p
$$

This is a set containing three elements from the universe of female oscar winners.

<aside>We assume that we have defined some symbols to represent the elements in our universe. In this case, we've used camel-cased strings.
</aside>

Sets can contain objects from the universe, but also, _other sets_. For instance, 

<p>$$
G = \left\{\text{MichelleYeoh}, \rc{\left\{\text{ChloeZhao}, \text{KathrynBigelow}\right\}} \right\} \p
$$</p>

is a different set from the one above. It contains _two_ elements: MichelleYeoh, and <span class="rc">another set</span>, which contains two further elements.

<p>The elements of the set are called its <strong>members</strong>. Note that the order doesn't matter: $\{\text{MichelleYeoh}, \text{ChloeZhao}\}$ is the same set as $\{   \text{ChloeZhao}, \text{MichelleYeoh}\}$. </p>

<p>Each member can be in the set or not in the set, but it can't be in the set multiple times. A set like $\{\text{ChloeZhao}, \text{ChloeZhao}, \text{MichelleYeoh}\}$ is not allowed.
</p>

The amount of things in a set is called its **cardinality**. The set $F$ above has cardinality $3$. This is often expressed with vertical bars

$$
|F| = 3 \p
$$ 

A set's cardinality can also be infinite. For instance in the universe of natural numbers, we can specify the set of all even numbers

$$
P = \{2, 4, 6, 8, \ldots\}
$$

<p>which has infinite cardinality: $|P| = \infty$.</p>

<aside>The notation used to specify $P$ is a little ambiguous, since it requires you to understand the pattern inside the brackets. We'll introduce a more precise notation later.
</aside>

For a set, like $P$, whose members have not been explicitly enumerated, we can still ask whether a particular object is in the set. For this we use the $\in$ symbol. The statement _$16$ is a member of the set $P$_ is written as:

$$
16 \in P \p
$$

## Why set theory is so fundamental

Set theory is often hailed as the fundamental language of mathematics. The language in which all other areas are defined. It's important to recognize that this is a _choice_. 

For most of history, mathematics was divided into distinct domains, like geometry, artihmetic and algebra. As time progressed, these domains became more rigorously defined. The problem was that to rigorously define the basic concepts, of say, geometry, you need some language to define those concepts in. You can define what a cube is in terms of squares and you can define what a square is in terms of lines, but as some point, you have to just accept what a line is.

At some point, it began to emerge that you could use one area of mathematics to define the foundational notionas for another. For instance, you could use arithmetic to define a space of pairs of numbers. In this space, you could then define what it means for numbers to fall on a line, and build up geometry from there.

The problem is that you could also do it the other way around. If you start with a notion of a line segment of some standard length, you could us that to define the number 1. Laying two such segments end to end, would then define the addition 1 + 1 and define the number 2. This way, you could build up all of arithmatic on a foundation of geometry.

In short pretty much every distinct domain of mathematics could be defined and build on top of every of every other domain. The idea of starting with set theory can be traced back to Georg Cantor and Gottlob Frege in the 19th century. It was David Hilbert who first started a serious program to actually define all mathematics in terms of set theory.

<aside markdown=1>This wasn't a smooth process. It first required a rigorous definition of set theory that didn't lead to paradoxes. We won't go into such details in this article, and stick with what is sometimes called "naive set theory." A semi-formal treatment that is sufficient understand how set theory is usually used in other fields. 
</aside>

## Set theory in an empty universe.

The first problem we run into when we start building mathematics in set theory, is that nothing has been defined yet. We can't talk about the "universe of natural numbers" because we haven't defined numbers yet. All that has been defined are sets. What do we put inside those sets?

<p>The saving grace is that we can always define the empty set. A set of cardinality $0$. We write it like $\{\}$</p>

<aside>Sometimes the special symbol $\emptyset$ is used, but we'll use $\{\}$ here.
</aside>

<p>This gives us one object to play with. We can give it a name, like $\oc{a} =\{\}$ and, more importantly put it in a set. We can define a new set</p>

$$
\gc{b} = \gc{\{\oc{a}\}} = \gc{\{\oc{\{ \}}\}} \p
$$

It can sometimes take a while to grasp how the sets $\oc{a}$ and $\gc{b}$ are different. How is a set containing an empty set not the same as an empty set? Think of a box containing an empty box. This is different from a box containing nothing. Sets work the same way.

Now that we have two objects $\oc{a}$ and $\gc{b}$, we can create more sets like:

<p>$$\begin{align*}
\{\oc{a}, \gc{b}\} &= \left\{\oc{\{\}}, \gc{\{\{\}\}}\right\} \\
\{\gc{b}\} &= \left\{\gc{\{\oc{ \{\} }\}}\right\}\\
\end{align*}$$</p>

<p><strong>question</strong>: Why would the set $\{\{\oc{a}\}, \gc{b}\}$ not be allowed?</p>

With this, we can start thinking about how to define other areas of mathematics. To give you a taste, we can define the natural numbers. There are a few ways of doing this, but the most popular is the _von Neumann construction_. We start by defining <span class="oc">zero</span>. We simply equate this with the empty set:

$$
\oc{0} = \oc{\{\}} \p
$$

You can think of this simply as using the symbol $0$ as a name for the empty set (like we did with the symbol $\oc{a}$ before). This gives us one number. Next, we define the _successor_ of a number. If $n$ represents a number, then its successor is the set that contains $\{n\}$ and all elements in $n$. 

<p>This means that the successor of $0$ is the set containing $0 = \oc{\{\}}$. We can give this successor the name $\gc{1}$. The successor of $\gc{1}$ is the set containing $\gc{1}$ and all elements in $\gc{1} = \gc{\{\oc{0}\}}$. Naming this successor $\bc{2}$, we get $\bc{2} = \bc{\{\gc{1}, \oc{0}\}} = \bc{\{\gc{\{\oc{\{\}}\}}, \oc{\{\}}\}}$.
</p> 

Try to complete the process for a few more numbers. You'll see that each number is defined as the set of all natural numbers that proceed it. 

This solves a particular problem with defining set theory before numbers: defining cardinality. Above, we defined cardinality as the amount of things in the set. We can't do that if numbers haven't been defined yet. Instead we can use the idea of a **one-to-one correspondence**. 

<p>For instance, assume that all natural numbers up to 9 have been defined. We can then say that the set $\{5, 7, 9 \}$ has the same cardinality as the set $3 = \{\oc{0}, \gc{1}, \bc{2}\}$ because we can match up each of their elements and have none left over. For instance:</p>

$$
5 \leftrightarrow \oc{0}\;\;\; 7\leftrightarrow \gc{1} \;\;\; 9 \leftrightarrow \bc{2} \p
$$

This is what we call a one-to-one correspondence. Whenever there is a one to one correspondence between two sets, they have the same cardinality. We can then name that cardinality by the number (that is, the set representing the number) which also has that cardinality. For instance

$$
\left |\{5, 7, 9\} \right| = |3| = 3 \p
$$

<aside markdown="1">One benefit of this approach is that it transfers to infinite sets. Using one-to-one correspondences, we can study whether all infinite sets have the same cardinality, or if there are perhaps differents kinds of infinities. We'll discuss this in a later article.
</aside>

## Other operations on sets

### Equality

### Union, intersection and complement

## Set builder notation
