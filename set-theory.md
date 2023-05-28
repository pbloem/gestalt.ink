---
title: Set theory
summary: "Set theory is a mathematical language used to define collections of things. It plays a central role in mathematics because it is often used as a language in which to define other mathematical concepts."
---

# Set theory

## Summary

Set theory is a mathematical language used to define collections of things. It plays a central role in mathematics because it is often used as a language in which to define other mathematical concepts.

The basic idea of sets is very simple. We first need to define a _universe of objects_. This could be all people in the Netherlands, all women who have won oscars, all natural numbers, or anything else.

<aside>We can have a finite or infinite amount of objects in our universe.
</aside>

<p>Once we have our universe defined we can form <strong>sets</strong> of things in the universe. For instance, for the universe of women who have won oscars we can form a set containing elements from that universe. A set is indicated by curly brackets $\{$ and $\}$. The simplest way to specify a set is simply to specify its contents as a list delimited by commas:</p>

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
E = \{0, 2, 4, 6, 8, \ldots\}
$$

<p>which has infinite cardinality: $|E| = \infty$.</p>

<aside>The notation used to specify $E$ is a little ambiguous, since it requires you to understand the pattern inside the brackets. We'll introduce a more precise notation later.
</aside>

For a set, like $E$, whose members have not been explicitly enumerated, we can still ask whether a particular object is in the set. For this we use the $\in$ symbol. The statement _$16$ is a member of the set $E$_ is written as:

$$
16 \in E \p
$$

To state that an element is not in a set, we use the symbol $\notin$:

$$
3 \notin E \p
$$


## Why set theory is so fundamental

Set theory is often hailed as the fundamental language of mathematics. The language in which all other domains of mathematics are ultimately defined. It's important to recognize that this is a _choice_. 

For most of history, mathematics was divided into distinct domains, like geometry, arithmetic and algebra. As time progressed, these domains became more rigorously defined. The problem was that to rigorously define the basic concepts, of say, geometry, you need some language to define those concepts in. You can define what a cube is in terms of squares and you can define what a square is in terms of lines, but at some point, you have to just accept what a line is. There have to be some ideas in geometry that can't be defined within geometry itself.

It soon began to emerge that you could use one area of mathematics to define the fundamental concepts of another. For instance, you could use arithmetic to define a space of pairs of numbers. In this space, you could then define what it means for such pairs to lie on a line, and build up geometry from there.

The problem is that you could also do it the other way around. If you start with a notion of a line segment of some standard length, you could us that to define the number 1. Laying two such segments end to end, would then define the addition 1 + 1 and define the number 2. This way, you could build up all of arithmatic on a foundation of geometry.

In short, pretty much every distinct domain of mathematics could be defined and built on top of every of every other domain. We just have to pick an order in which to build one on top of the other. And the most important choice is where to start. Which area of mathematics can we set up with minimal assumptions, and use as a foundation for everything else?

The idea of starting with set theory can be traced back to Georg Cantor and Gottlob Frege in the 19th century. It was David Hilbert who first started a serious program to actually define all mathematics in terms of set theory.

<aside markdown=1>This wasn't a smooth process. It first required a rigorous definition of set theory that didn't lead to paradoxes. We won't go into such details in this article, and stick with what is sometimes called "naive set theory." A semi-formal treatment that is sufficient understand how set theory is usually used in other fields. We'll provide some hints about these paradoxes at the end of this article.
</aside>

## Set theory in an empty universe.

The first problem we run into when we start building mathematics in set theory, is that nothing has been defined yet. We can't talk about the "universe of natural numbers" because we haven't defined numbers yet. All that has been defined are sets. What do we put inside those sets?

<p>The saving grace is that we can always define <strong>the empty set</strong>. A set of cardinality $0$. We write it like $\{\}$</p>

<aside>Sometimes the special symbol $\emptyset$ is used, but we'll use $\{\}$ here.
</aside>

<p>This gives us one object to play with. We can give it a name, like $\oc{a} =\{\}$ and, more importantly, put it in a set. We can define a new set</p>

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

You can think of this simply as using the symbol $\oc{0}$ as a name for the empty set (like we did with the symbol $\oc{a}$ before). This gives us one number. Next, we define the _successor_ of a number. If we define this correctly, the successor will simply be the next number along: the successor of $0$ is $1$, the successor of $1$ is $2$ and so on. 

We define this as follows: if the set $n$ represents a number, then its successor is the set that contains $\{n\}$ and all elements in $n$. 

<p>To start with, the only number we know about is $0 = \oc{\{\}}$. Its successor is the set <em>containing</em> $\oc{\{\}}$. We can give this successor the name $\gc{1}  = \gc{\{\oc{0}\}}$. The successor of $\gc{1}$ is the set containing $\gc{1}$ and all elements in $\gc{1}$. Naming this successor $\bc{2}$, we get $\bc{2} = \bc{\{\gc{1}, \oc{0}\}} = \bc{\{\gc{\{\oc{\{\}}\}}, \oc{\{\}}\}}$.
</p> 

Try to complete the process for a few more numbers. You'll see that each number is defined as the set of all natural numbers that proceed it. 

This solves a particular problem with defining set theory before numbers: defining cardinality. Above, we defined cardinality informally as the _number_ of things in the set. We can't do that if numbers haven't been defined yet. Instead we can use the idea of a **one-to-one correspondence**. 

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

Perhaps the most fundamental operation in set theory is that of **equality**. Let's start with the objects in our universe (if we have any). In set theory, we don't care what they are. We used female oscar winners above, but from the perspective of set theory, we don't care who or what they are: when and where they were born, what films they made, none of it matters. The only thing we care about is _identity_. Each object in our universe is equal only to itself, and not equal to any other object. 

$$
\text{MichelleYeoh} = \text{MichelleYeoh} \;\;\;\;\; \text{MichelleYeoh} \neq \text{ChloeZhao}
$$

With this notion of equality in hand, we can define when two sets are equal. Informally, two sets are equal if they contain the same elements. More formally, we can say that two sets are equal if their elements can be put into one-to-one correspondence, in such a way that the matched elements are equal. 

<p>For instance, the sets $\bc{ \left\{ \gc{ \{\oc{\{\}} \} }, \oc{\{\}} \right\} }$ and $\bc{2} = \bc{\{\oc{0}, \gc{1}\} }$ are equal, because their members can be put in the following correspondence:
</p>

$$
\oc{0} = \oc{\{\}} \;\;\;\; \gc{1} = \gc{\{\oc{\{\}}\}} \p
$$

If no such correspondence exists, two sets are not equal.

## Set operations: union, intersection and complement

A quick way of building new sets from existing ones is with unions and intersections.

A **union** of two sets $\bc{x}$ and $\rc{y}$ is simply the set that contains all elements from $\bc{x}$ and all elements from $\rc{y}$. If any elements occur in both, they occur only once in the union (since sets can only containt elements once).

A union is written with the $\cup$ symbol. For instance

<p>$$\begin{align*}
\{\oc{0}, \gc{1}, \bc{2}\} \cup \{\bc{2}, 3, 4\} &= \{\oc{0}, \gc{1}, \bc{2}, 3, 4\} \\
\{\oc{0}, \gc{1}\} \cup \{\} &= \{\oc{0}, \gc{1}\} \\
\{\oc{0}, \gc{1}, \bc{2}, \ldots\} \cup \{16, 17, 18\} &= \{\oc{0}, \gc{1}, \bc{2}, \ldots\} \p
\end{align*}$$</p>

<p><strong>question</strong>: What are the cardinalities of the following unions?</p>
<p>$$\begin{align*}
\{\oc{0}, \gc{1}, \bc{2}\} &\cup \{\bc{2}\} \\
\{\oc{0}\} &\cup \{\bc{2}\} \\
\{\oc{0}, \gc{1}, \bc{2}\} &\cup \{\bc{2}, \gc{1}, \oc{0}\} \\
\end{align*}$$</p>

An **intersection** is a kind of counterpart to a union. It also builds a new set from two given sets $\bc{x}$ and $\rc{y}$, but for an intersection, the result only includes those elements that appear in both $\bc{x}$ and $\rc{y}$. 

It is written with the $\cap$ symbol. For example 

<p>$$\begin{align*}
\{\oc{0}, \gc{1}, \bc{2}\} \cap \{\bc{2}, 3, 4\} &= \{\oc{0}, \gc{1}, \bc{2}, 3, 4\} \\
\{\oc{0}, \gc{1}\} \cap \{\} &= \{\} \\
\{\oc{0}, \gc{1}, \bc{2}, \ldots\} \cap \{16, 17, 18\} &= \{16, 17, 18\} \p
\end{align*}$$</p>

<p><strong>question</strong>: What are the cardinalities of the following intersections?</p>
<p>$$\begin{align*}
\{\oc{0}, \gc{1}, \bc{2}\} &\cap \{\bc{2}\} \\
\{\oc{0}\} &\cap \{\bc{2}\} \\
\{\oc{0}, \gc{1}, \bc{2}\} &\cap \{\bc{2}, \gc{1}, \oc{0}\} \\
\end{align*}$$</p>

The **complement** of a set $\bc{x}$ is the set of things that _aren't_ in $\bc{x}$. If the context makes it clear what the universe of objects is, then we can write the complement simply with a vertical bar: $\overline{\bc{x}}$. For instance, if we are talking about the natural numbers, then 
$$
\overline{\{2, 4, 6, 8, \ldots\}}
$$
<p>represents the odd numbers $\{0, 1, 3, 5, \ldots\}$</p>

If it is not clear from context what the universe is we can define it more precisely as the **relative complement** between two sets, also known as the **set difference**. The set difference between $\bc{x}$ and $\rc{y}$, written as 

$$
\bc{x} - \rc{y}
$$

consists of those elements that are in $\bc{x}$ minus those that are also in $\rc{y}$. For instance

<p>$$\begin{align*}
\{\oc{0}, \gc{1}, \bc{2}\} - \{\bc{2}, 3, 4\} &= \{\oc{0}, \gc{1}\} \\
\{\oc{0}, \gc{1}\} - \{\} &= \{\oc{0}, \gc{1}\} \\
\{\oc{0}, \gc{1}, \bc{2}, \ldots\} - \{16, 17, 18\} &= \{\oc{0}, \gc{1}, \bc{2}, \ldots, 15, 19, 20, \ldots\} \p
\end{align*}$$</p> 

<p><strong>question</strong>: Can we rewrite the set difference as a combination of unions and intersections? What about a union and intersection and a complement? </p>

<aside>The notation $\bc{x} / \rc{y}$ is also common for for set differences, and $\bc{x}^C$ or $\bc{x}'$ is sometimes used for complements.</aside>

## Other notions

* disjointness
: Two sets are _disjoint_ if they don't share any elements. That is if their intersection is the empty set.
* singleton
: A _singleton_ is a set of cardinality 1. The singleton _of an element_ is the set containing just that element.
* pair
: A _pair_ is any set containing two elements. Written as $\{a, b\}$
* ordered pair
: An ordered pair is also a set with two elements, but with an ordering over the two specified. That is, if the two elements are not equal, we know which one comes first and which one comes second. Written as $(a, b)$. 
* tuple
: An extension of the idea of a pair to more elements. A $4$-tuple is an ordered collection of $4$ elements, written as $(a, b, c, d)$.

<aside>There are several ways to construct an ordered pair in the language of sets. The key is to build a set out of the elements $a, b$ in such a way that we can reconstruct which is the first and which is the second element. The most common definition, called Kuratowski's method is $(a, b) = \{\{a\}, \{a, b\}\}$. That is, we store both $a, b$ as an unordered pair and the first element as a singleton. We can then define a 3-tuple as $(a, b, c) = (a, (b, c))$, a 4-tuple as $(a, b, c, d) = (a, (b, c, d))$ and so on.
</aside>

## Set builder notation

Earlier, we defined the set of even numbers with the notation

$$
\{0, 2, 4, 6, 8, \ldots \} \p
$$

This notation is fine for informal use, but it has its limitations. We can't be precise about exactly which elements are in the set, and this kind of trick may not work for all sets we'd like to define. For instance, if we try to define the prime numbers like this 

$$
\{2, 3, 5, 7, 13, \ldots\}
$$

we are asking a lot of the pattern recognition abilities of our readers.

A more precise and flexible way of specifying sets is the **set builder notation** (also know as a _comprehension_). It uses the idea that all we need to specify a set is to define its _membership_. If we can come up with a statement that is true for all things that are members of the set and false for all things that are not members of the set, we have defined the set.

For example, let's say we want to define the set of natural numbers above $31$. To test whether a number $\oc{n}$ is in this set, we can use the statement 

$$
\oc{n} > 31 \p
$$

If this statement is true, $\oc{n}$ is in the set and if it is false, it isn't. The set builder notation formalizes this idea. It looks like this.

$$
\{ \oc{n} \mid \oc{n} > 31\} \p
$$

Read out loud, this says _the set of $\oc{n}$ such that $\oc{n}$ is larger than $31$_. This notation does not specify which numbers we are considering for $\oc{n}$, in this case, the natural numbers. This is called the **domain**. To make the notation more precise, we can also specify the domain:

$$
\{ \oc{n} \in {\mathbb N} \mid \oc{n} > 31\} \p
$$

where ${\mathbb N}$ represents the set of all natural numbers ($0, 1 ,2, 3,\ldots$).

<aside>Set builder notation can be hard to use formally, especially if we're using set theory to define other areas of mathematics. It's important to realize that that kind of rigor is not usually necessary. In less formal settings, we can just use whatever language we like to the right of the bar, even natural language.
</aside>

## Relations and functions

### Relations

A **relation** is a set of pairs. For instance, we can think of the set of all female oscar winners, and the year of their birth:

<p>$$\begin{align*}
&\{\\
&\;\;(\text{ChloeZhao}, \bc{1982}), \\
&\;\;(\text{MichelleYeoh}, \bc{1962}), \\
&\;\;(\text{KatherineBigelow}, \bc{1952}), \\
&\;\;\ldots\\
&\} \p\\
\end{align*}$$</p>

Or, we could define the set of all pairs of natural numbers where subtracting one from the other yields the result 5:

$$
\{ (\bc{x}, \rc{y}) \mid \bc{x} - \rc{y} = 5\} \p
$$

<p>If the set $R$ is a relation, then instead of writing $(a, b) \in R$ and saying <em>the pair $(a, b)$ is in</em> $R$, we often write $R(a, b)$ and say the relation $R$ <em>holds for</em> $a$ and $b$.</p>

The reason is that relations often express connections between objects, and this is a more natural way to talk about connections. For instance, the following statements could in natural language could all be translated to a statement about a pair and a relation over a suitable universe:

* Mary is the mother of Douglas.
* Chloe Zhao was born in 1982.
* $\bc{2}$ is the successor of $\gc{1}$.
* 3 is smaller that 15.

If we replace the pairs in the definition of a relation by $n$-tuples, we get an **$n$-ary relation**. for instance, over the universe of all director, actors and movies, we could define the 1-ary relation, $O(\bc{x})$ that holds if person $\bc{x}$ has won an oscar, or we define the 3-ary relation $S(\bc{x}, \rc{y}, z)$ that holds if $\bc{x}$ is an actor, that starred in movie $\rc{y}$ which was directed by director $z$.

The **domain** $\text{dom }R$ of a binary relation $R$ is the set of all elements that can occur in the first position of a pair for which the relation holds. The **range** $\text{range }R $ is the set of all elements that can occur in the second position of a pair for which the relation holds.

### Functions

Chances are, if you're reading this, you already have a pretty good idea of what a function is. It's something that looks like this:

$f(\bc{x}) = \bc{x}^2 + 3\bc{x}$

and it functions a bit like a computer program, telling you how to work out an "output" $f(\bc{x})$ for a given "input" $\bc{x}$.

With what we've learned about set theory so far, we can now state the "official" definition of a function. You may be surprised to learn that it has nothing to with computation. All it is, is a set.

<aside>We haven't defined different types of numbers yet, so we'll stick to functions on the natural numbers. Functions on other sets of numbers are defined the same way.
</aside>

A **function** is a special kind of relation: a relation $F$ with the extra property that for every element $\bc{x}$ in its domain, there is one and only one element $\rc{y}$ in its range such that $F(\bc{x}, \rc{y})$.

Because of this property, we can _think of_ the function $F$ as mapping $\bc{x}$ to $\rc{y}$. For example, in the function above, we have $f(\bc{1}) = \rc{4}$, which means that $(\bc{1}, \rc{4})$ is a member of the function (which is a set of pairs). 

Or, in set theory terms: $(\bc{1}, \rc{4}) \in f$.

Note that we haven't specified anywhere how to _compute_ the function $F$. This is important to understand: for some functions, like $f$, we can compute <span class="rc">the second element</span> of a pair in $f$ given <span class="bc">its first element</span>: we can compute the input given the output. 

But _this is not necessary for a well-defined function_. It is perfectly possible to define a function that is _literally incomputable_. So long as we know that there is a unique output for every input the function is still well-defined.

<aside markdown="1">Because of this, mathematicians don't usually talk about the "input" and "output" of a function, instead using words like "argument" and "value". I think the clarity of "input" and "output" for general audiences outweighs the subtle need to think of functions as potentially noncomputable mappings, so I'll just treat them like computer programs most of the time.
</aside>

## The end of naive set theory

So, those are the basics of set theory. If you understood all the above, you have a sufficient understanding of set theory to start digging into other areas of mathematics, especially the applied ones. 

However, when mathematicians started to think about using set theory to build mathematics up from the ground level, they found that a higher level of precision was needed. In short, if we don't define very carefully what we're talking about, we can end up with some knotty problems. We'll end on an illustration of this, and leave the more formal treatment for another article.

The problem arises when we start pushing the boundaries of the set-builder notation we introduced earlier. As an example, we can ask whether a set is a member of itself. That is, for a set $\bc{x}$, is the following statement true?

$$
\bc{x} \in \bc{x} \p
$$

We've stated from the start that sets can be members of other sets, so even though the idea of a set being a member of itself seems queer, we can at least ask the question. Perhaps the answer is always _no_, and we can rest easy. 

It turns out, however, that just being able to ask the question causes a problem. You see, with the set builder notation, we can now create a new set. 

$$
R = \{\bc{x} \mid \bc{x} \notin \bc{x}\}
$$

Where the domain of $\x$ is all possible sets that we can define. $R$ is the set of all sets that do not contain themselves. If we think it's perverse for a set to contain itself, this should be a very reasonable set. In fact, it should contain all sets. Can you seem the problem that happens if $R$ contains all sets?

The problem is that if $R$ contains all sets, _it will contain $R$ as well_. $R$ will contain itself, even though we explicitly defined it only to contain sets that _don't_.

<!-- 
The problem is that $\oc{\{\}}$ is certainly in $R$. $\oc{\{\}}$ doesn't contain anything, so it doesn't contain itself, so $\oc{\{\}} \notin \oc{\{\}}$ is true, so $\oc{\{\}}$ is in $R$. That means $R$ can't be equal to $\oc{\{\}}$ because it would contain itself which $\oc{\{\}}$ doesn't.
 -->

Ok, fine. So maybe $R$ doesn't contain all sets. Maybe there are some sets outside $R$ that contain themselves. What if we allow this somehow. Does it solve the problem?

It turns out it doesn't. However we define our sets, if we can ask the question of whether a sets contains itself, we can build $R$, and _we can then ask whether $R$ contains itself_. This is the heart of the paradox. If $R$ is in $R$, it contains itself, but we defined $R$ as the set of sets that _don't_ contain themselves. If $R$ is not in $R$, it doesn't contain itself, but then should be in $R$ since we defined it as the sets that don't contain themselves.

This is known as **Russell's paradox**. It's a classic kind of self-referential paradox sometimes called an _antinomy_. It's a subtle pattern that is worth recognizing, so we'll allow ourselves to get a little side-tracked and look at some examples outside set theory.

First, here are some examples of things that _don't_ immediately cause paradoxes. Take some time to study them first.

* There is a grocer in a village who sells aftershave to every man who shaves himself (all others are shaved by the barber). Can we work out whether the grocer buys his own aftershave? 
* Some words have a meaning that also applies to the word itself, for instance: brief, grandiloquent, English, abbrev. Call these words _autological_. Is the word "autological" itself autological? 
* A [self-answering puzzle](https://puzzling.stackexchange.com/questions/37303/self-answering-puzzles/37305#37305) is a challenge to which the challenge itself is the answer. Is _Give me a self-answering puzzle_ a self answering puzzle? 

Hopefully the pattern is becoming clear: The grocer either buys his own aftershave (in which case he shaves himself) or he doesn't (in which case the barber must shave him).The word autological is itself autological, or it isn't. Both could be the case. _Give me a self-answering puzzle_ could be a self answering puzzle or not. If we define it to be one, then it is, and if we define it not to be one, then it isn't. 

Strictly speaking, these examples don't cause problems, but they should _feel_ uneasy. If a concept is well-defined, why should we be free to decide one of its fundamental consequences?

We can create the same kind of example in (naive) set theory. The set of all sets that are members of themselves:

$$
S = \{\bc{x} \mid \bc{x} \in \bc{x}\}
$$

Are there any sets in $S$? If so, is $S$ in $S$? We have the same situation as with the previous examples, if it is, it is, and if it isn't it isn't. The reason I'm specifying all these examples is that I want you to recognize that all this self-consistency is not a happy state of affairs. 

Whenever a definition like this leaves you with a "degree of freedom", two options that are both consistent, then odds are you are but one negation away from a paradox. In this case, if we change the $\in$ to an $\notin$, we get $R$, and the whole edifice of naive set theory comes crumbling down.

Here are the counter-concepts for the above three examples:
* The barber in the village shaves every man who doesn't shave himself. Who shaves the barber?
* Define _heterological_ words as those that aren't autological. Is the word heterological itself heterological? (This is known as the _Grelling–Nelson paradox_).
* _Give me something that isn't a self-answering puzzle_.

Ok, that was a bit of a detour. We were talking about set theory. How can we stop sets like $R$ existing and collapsing the foundations of mathematics? The problem is not solved if we just disallow sets that contain themselves: we saw above that even if such sets don't exist, just being able to ask the _question_ of whether they exist is enough to construct the paradox.

It turns out that we need to restrict the domain of the set builder notation. In 

$$
R = \{\bc{x} \mid \bc{x} \notin \bc{x} \}
$$

we let the domain of $\bc{x}$ be all possible sets. To be precise, we must specify this domain $D$:

$$
R = \{\bc{x} \in D \mid \bc{x} \notin \bc{x} \}
$$

and make it very precise how $D$ is constructed. 

A proper axiomatic set theory will specify exactly which types of sets are allowed as domains in the set-builder notation. The result is that we can still think about the "collection" of all sets that aren't members of themselves, but this collection is not itself a set, because the axioms of set theory do not capture it.