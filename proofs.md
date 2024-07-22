---
title: Proofs

---

* toc
{:toc}

# Proofs

## Summary

A **proof** is a mathematical argument. The aim of a proof is to create a sequence of statements that is so precise, that any mathematician with sufficient understanding cannot disagree that each assertion must follow from what comes before it, and therefore that the final conclusion must hold true. 

A rigorous proof aims to make the business of reasoning an entirely _mechanical_ process: the more rigorous a proof is the less we need to appeal to our intuitions. We can simply apply the rules that we know to check that each step follows from the last. 

Proofs are the main form in which we present and record mathematical truths. Compare this to physics. A physicist must prove that a statement is true by conducting a careful experiment. By contrast, a mathematician must prove that a statement is true by writing a rigorous proof and having their colleagues check it carefully.

<!-- 
We will discuss the following topics in this article.
* Levels of rigour
* Assumptions and axioms
* Different types of proof, including
  * Proof by contradiction
  * Proof by induction
 -->

## What does a proof look like?

A proof starts out with a statement of the thing we want to show is true. This is usually called the _theorem_, but for less important results, we may use _lemma_ or _proposition_.

It's important to state the theorem as precisely as we can. 

After the theorem, we write the proof. This can be written entirely in natural language, or entirely in mathematical symbols, but it's usually a combination of the two. 

<aside>In rare cases, neither. We'll show an example of this later.</aside>

Let's start with an example of a very simple theorem with a proof. Imagine that you are idly adding some even numbers together (as you do). You try:

$$\begin{align*}
8 + 2 &= 10 \\
4 + 2 &= 6 \\
10 +4 &= 4 
\end{align*}$$

You notice that the result is always an even number. You wonder if this is always true. Now, some people might be content to try a bunch more examples, and if they all check out, conclude that two even numbers together pretty much always seem to yield an even number. 

This is not the mathematical mindset. It's not precise enough. It doesn't undeniably show that this is definitely always true. What about huge numbers, so big that you could never add them together in a human lifetime? What about unusual numbers, that you are unlikely to pick at random? In short, there is a difference between trying a few examples, and proving something to be absolutely true for all possible cases. The latter is what mathematicians try to do.

<aside>This is not an abundance of caution. There are many statements that are true for pretty much any random example you might pick, but untrue for special cases that you won't find unless you look for them.
</aside>

To prove that two even numbers _always_ sum to another even number, we first need to state our problem very precisely. 

We start with a _definition_ of exactly what it means for a number to be even. You may have heard this defined as "being divisble by 2 without remainder", but that is a bit of an involved definition, we'd need to make precise what these remainders are, and so on. A neater definition uses multiplication, rather than division:

<div class="theorem proof-omitted" markdown="1"><strong>Definition.</strong>
A [natural number](/numbers) $\gc{n}$ is _even_ [if and only if](/iff) there exists another natural number $\bc{m}$ so that $\gc{n} = 2\bc{m}$.
</div> 

<aside markdown="1">The natural numbers are the "counting numbers" $0, 1, 2, \ldots$
</aside>

We can now state the theorem.

<div class="theorem proof-omitted" markdown="1"><strong>Theorem.</strong>
The sum of two even numbers is even.
</div>

The statement of the theorem is pretty simple, but that's only possible because we took the time to precisely define what we mean by "even." Now, we can write a proof.

<div class="proof" markdown="1"><strong>Proof.</strong> Let $\rc{a}$ and $\bc{b}$ be any two even numbers. From the definition of "evenness" above, this tells us there are numbers $\rc{c}$ and $\bc{d}$ so that 

$$\begin{align*}
\rc{a} = 2\rc{c} \\
\bc{b} = 2\bc{d} \p \\
\end{align*}$$

This means that for their sum we have 

$$\begin{align*}
\rc{a} + \bc{b} &= 2\rc{c} + 2\bc{d} \\
 &= 2(\rc{c} + \bc{d}) \p \\
\end{align*}$$

That is, the sum $\rc{a} + \bc{b}$ is some natural number $\rc{c} + \bc{d}$ times 2, which means that it must be even.
<span class="qed"></span>
</div>

The symbol □, the _tombstone_, tells you where the proof ends.

<aside markdown="1">
In older texts, you often see the initialism Q.E.D. instead, which stands for _quod erat demonstrandum_, or "which was to be demonstrated." 
</aside>

The structure of this proof is hopefully simple enough to be obvious. In the first line we pick two specific numbers $\rc{a}$ and $\bc{b}$, but we only assume that they are even. Any other properties they may have, we ignore. Therefore, whatever we conclude about them (in this case that their sum is even) must hold for all pairs of even numbers.

<aside>One ever-present danger is that you make an additional assumption somewhere in your proof without noticing that you've done so. This is probably the most common way in which seemingly correct proofs turn out to be flawed. 
</aside>

<!-- 
<aside>The idea is that most proofs start with the assumptions and end by deriving the statement of the proof. In our case you could read "$\rc{a} + \bc{b}$ must be even, which was to be demonstrated".
</aside>
 -->

The main aim of proofs is to be _rigorous_. That is, to be so precise that nobody with a rational mind following your argument could disagree. This means that when you write a proof you should try as hard as possible to:
* **State explicitly what you are going to prove**.
* **State explicitly everything you assume to be true.** For example in our case, we make the assumption that the sum of two natural numbers is a natural number. We could make our proof even more rigorous by stating this explicitly (either before or inside the proof), or even by proving it first.
* **State explicitly how you define all your objects and their properties.** For example, we make it clear that $\rc{a}$ and $\bc{b}$ are even natural numbers. We also state explicitly what it means for a number to be even. This is a property that most people understand very intuitively, but by giving an explicit definition in the form of an equation $\gc{n} = 2\bc{m}$, we can use this equation in the proof.
* **Go through your argument in small steps.** Work out everything you need to establish and how it might follow from what you already know to be true. For anything that sounds vague or unsubstantiated, think hard about how you can make it more precise. Often, this involves break large steps of reasoning into smaller steps, and working from the precise langauge of your definitions.

<aside>Some people see this as a black-and-white distinction. Something is either rigorous enough to be a proof, or it's not a proof at all. I think it's better to think of it as a spectrum: proofs can always be made more rigorous, and the level of rigour that is called for is determined by the context. More on this later.
</aside>

If you are asked to come up with a proof, this is usually a good place to start: write down everything you are allowed to assume, and try to write down as precisely as possible, what it is you are trying to prove. 

## Proofs and axioms

Proofs began somewhere in ancient Greece in the period between 600 and 300 BCE when people began studying geometry in detail.

At first, these were just disconnected arguments: if you assume that A and B are true, then I can show you through pure argumentation that also C must be true.

Here is an example from the time. A mathematician, philosopher and diplomat called Thales proved that if you draw a triangle in a circle by connecting the two ends of the diameter up to any other point $\bc{C}$ on the circle, you get a right angle at $\bc{C}$.

<figure class="half center">
<img src="/images/proofs/thales-statement.svg" class="half">
</figure>

This is now called _Thales's theorem_.

His proof built on two other facts. 
1. That the angles in any triangle add up to 180 degrees.
2. In a triangle with two sides <span class="rc">the same length</span> (an _isosceles_ triangle), the <span class="gc">two angles on the remaining side</span> are the same.

<figure class="center">
<img src="/images/proofs/thales-preliminaries.svg" class="two-thirds">
<figcaption>The two facts that the proof of Thales's theorem builds on.
</figcaption>
</figure>

If you assume these two things are true, Thales showed, you can prove that the angle $\bc{C}$ on the triangle that we inscribed on the circle is a right angle.

<aside markdown="1">Thales had _also_ proved 1 and 2 from other assumptions, but to study Thales's theorem in isolation, we will simply state that if you _assume_ that statements 1. and 2. are true, then we can prove that Thales's theorem holds.
</aside>

Here is the proof.

<div class="theorem"><strong>Thales's theorem</strong><br>
Let $A$ and $B$ be the ends of a diameter drawn on a circle, and let $X$ be any other point on the circle. Then the triangle made by the points $A$, $B$ and $C$ has a right angle at $C$.
</div>
<div class="proof" markdown="1"><strong>Proof.</strong> Call the center of the circle $O$, and draw a line from $O$ to $\bc{C}$. The distances from <span class="gc">$O$ to $A$</span>, <span class="rc">$O$ to $B$</span> and <span class="bc">$O$ to $C$</span> are all equal, so we can note that the triangles made by $\gc{AOC}$ and $\rc{BOC}$ are both isosceles triangles.

<figure class="half center">
<img src="/images/proofs/thales-proof.svg" class="two-thirds">
</figure>

This tells us that in in each of these two two triangles, the two angles that touch the circle are equal (using assumption 2). We've marked these as $\gc{a}$ and $\rc{b}$ in the diagram.

Using assumption 1, we can now add up all the angles in the larger triangle $AB\bc{C}$ to 

$$\begin{align*}
\gc{a} + (\gc{a} + \rc{b}) + \rc{b} &= 180\deg \\
2\gc{a} + 2\rc{b} &= 180\deg \\
2(\gc{a} + \rc{b}) &= 180\deg \\
\gc{a} + \rc{b} &= 90\deg \p\\
\end{align*}$$

Which proves that the angle at $\bc{C}$, which is equal to $\rc{a} + \gc{b}$, is $90\deg$. <span class="qed"></span> 
</div>

<aside>None of Thales's writing survives, so we don't know if this is the proof he used, but it is said that he used these two assumptions, so if we accept that, it's likely that this is how he did it. 
</aside>

This sort of thing took off and people began to write and publish proofs, usually gathering a certain amount of fame if they were the first to prove something. 

The problem with this approach is that you quickly get circular arguments, especially in a community of mathematicatians working independently from one another at different sides of the Mediterranean sea. 

You may get one person proving that A is true if you assume B and another proving that B is true if you assume A. Has either of them actually proved anything of value? What if we have a vast collection of proofs? How do we make sure we not are actually building the whole of mathematics on a foundation of circular reasoning?

Around 300 BCE, a man called Euclid came along, and created the basic approach that was to underpin mathematics for the next couple of millenia (and counting): the _axiomatic_ approach to proofs.

Euclid's idea was to isolate as small a set of assumptions as possible, and to build the rest of geometry on that set of assumptions one proof at a time. These assumptions he called _axioms_. If you've never seen them, here are Euclid's five axioms for geometry (taken from [Wikipedia](https://en.wikipedia.org/wiki/Axiom)).

1. It is possible to draw a straight line from any point to any other point.
2. It is possible to extend a line segment continuously in both directions.
3. It is possible to describe a circle with any center and any radius.
4. It is true that all right angles are equal to one another.
5. Two lines that are parallel to the same line are also parallel to each other.

<aside>I've replaced the fifth axiom (the parallel postulate) with a slightly simpler equivalent than the one that Euclid used.
</aside>

Clearly, these don't exist in a vacuum. Before we can understand what is meant by these statements, we need to define certain concepts like lines, points, parallelism and so on. Surrounding the axioms are a large number of definitions. But the definitions are just names for things. The axioms are the only things we are _asked_ to agree on. Everything else will be proved.

<!-- Euclid also included five "common notions" such as _The whole is greater than the part_, which described a kind of higher level of common sense required for reasoning about geometry. -->

Once Euclid had his axioms set up, he could begin the task of building up the results of geometry one at a time. It's likely that he re-used many proofs that were already known. For instance, he could have re-used Thales' proof, but only after first proving the two assumptions required. 

Using this approach, Euclid wrote a set of 13 volumes called _Elements_, putting the whole of geometry on a solid foundation.

<aside>The two assumptions we used above are propositions 32 and 5 in Book 1 of the Elements respectively. Thales's theorem is proved as part of proposition 31 in Book 3.
</aside>

To Euclid, these axioms were properties of the world. Things that were so obviously true that no sane man should doubt them. These days, however, we tend to think of axioms more as _assumptions_. 

If you make the _assumption_ that Euclid's five axioms are true, then the whole of Euclidean geometry must follow: from the pyhagorean theorem to the impossibility of squaring the circle. But you can also make different assumptions. It is, for instance, possible to change the fifth axiom to something else, and to build up a different, non-Euclidean, geometry. 

<aside>For instance, the geometry that describes shapes on the surface of a sphere like the Earth.
</aside>

This is the role that axioms play today. For a given set of axioms, we figure out, by writing proofs, what the consequences are. Then, we change the axioms and we see how the set of theorems we can prove changes as a result. 

For instance, modern [set theory](/set-theory) is based on a set of 9 axioms called the Zermelo-Fraenkel (ZF) axioms. There is a tenth axiom, called the _Axiom of choice_, which fundamentally changes the theorems you can derive, adding some quite counterintuitive results.

All this is just to say that most people no longer tend to think of axioms as _truths_. They are more like the parameters of a mathematical landscape. If they are well chosen, we get a consistent, and interesting mathematical landscape, but we can always change them, and see how the landscape changes as a result.

## Some methods of proof

Any kind of argument can be a proof. It doesn't have to follow a pre-established pattern. So long as it's sufficiently rigorous, you're free to do what you like.

However, a couple of common patterns have emerged, that are often used. It's important to be aware of these. Firstly, because it's a useful toolkit to have when you try to write your own proofs. A very common thing to do when you start trying to prove something is simply to say "well, let's try a _proof by contradiction_, and see how far that gets me." For simple theorems, that's often all you need.

The second reason to be aware of these common approaches is that it's required to _read_ many proofs. Because these approaches are so common, an author will often state up front something like "Assume towards a contradition that &hellip;" or "We prove the theorem by induction." After this, they will follow a strict pattern without explaining the reasoning behind it. If you're not familiar with the pattern they are referring to, it's almost impossible to follow what is happening.

Let's look at the most important patterns.

### Direct proof

This is the simplest form of proof: it's when we can get to the result just by filling in certain definitions of other known results.

As an example let's look at a result from linear algebra. Assume the following:
1. A square matrix $\rc{\A}$ is _invertible_ if and only if there is another matrix, called $\rc{\A}^{-1}$, so that $\rc{\A}\rc{\A}^{-1}$ is equal to a special matrix $\I$ called the _identity matrix_.
2. If $\rc{\A}\rc{\A}^{-1} = \I$, then  $\rc{\A}^{-1}\rc{\A} = \I$.

<aside>If you haven't delved into linear algebra yet, don't worry. Just take it as read that there are things called matrices, which you can multiply together, and that these two properties apply. You should still be able to follow the proof.</aside>

With this we can prove 
<div class="theorem" markdown="1"><strong>Theorem.</strong>
If $\rc{\A}$ is invertible, then $\rc{\A}^{-1}$ is invertible too, with $(\rc{\A}^{-1})^{-1} = \rc{\A}$.
</div>
<div class="proof" markdown="1"><strong>Proof.</strong>
To show that $\rc{\A}^{-1}$ is invertible, by (1) we must show that there is some matrix $\bc{\B}$ such that $\rc{\A}^{-1}\bc{\B} = \I$. By (2) this is the case for $\bc{\B} = \rc{\A}$.
<span class="qed"></span>
</div>

The simplicity of direct proofs can often be deceiving. The fact that something follows directly from what is assumed or established is not always a sign that the proof was easy. Often, the work is in setting up the assumptions and definitions just right, so that the proof follows almost automatically.

### Proof by contradiction

A _proof by contradiction_ is the first method that will take a little bit of getting used to. To set things up, consider the following scenario.

Jack is arrested by the police. They have camera footage of a burglar who looks like Jack breaking into a shop, drinking a carton of milk from the shop fridge and leaving with the contents of the cash register. Jack protests. He says: <span class="bc">I am extremely allergic to milk. If that had been me, I would now be in hospital.</span>

The method that Jack uses to prove his innocence is an instance of proof by contradiction. Let's spell it out to look a bit more like it does in mathematical proofs.

<div class="theorem"><strong>Theorem.</strong> Jack is not the burglar in the camera footage.
</div>
<div class="proof" markdown="1"><strong>Proof.</strong> Assume that Jack were the burglar in the camera footage. If this were the case, then it follows that Jack would have drunk a whole carton of milk. Since Jack is severly allergic to milk, it then follows he would be in hospital for several days. 

This, however contradicts our knowledge that Jack is healthy and in the police station.
</div>

The structure is as follows: to prove that $X$ is true, we assume the opposite: that $X$ is _false_. We then derive from this assumption a statement that is known to be false. This shows that $X$ must be true, for if it were any other way, we would be forced to accept something we know to be false.

This argument structure is sometimes called a _reductio ad absurdum_: we assume the opposite of the theorem and show that it leads irrevocably to absurd consequences. If we want to avoid these absurdities (specifically, something being false that we know to be true), then we had better accept that the theorem is true. 

Here is an example of a mathematical proof by contradiction. We'll first define prime numbers.

<div class="theorem proof-omitted"><strong>Definition</strong> A prime number is a natural number that is divisible only by 1 and itself.
</div>

<aside>That is, 30 is not prime because it is divisible by 5, 3 and 2, but 17 is prime because we can only divide it by 1 or by 17.
</aside>

<div class="theorem"><strong>Theorem.</strong> There is no largest prime number.
</div>
<div class="proof" markdown="1"><strong>Proof.</strong> 
<span class="bc">Assume towards a contradiction</span> that there is a largest prime number $\gc{n}$. 

Let $p$ be the product of all prime numbers up to and including $\gc{n}$ (i.e all prime numbers, under our assumption).

Now take the number $p+1$. Since it's larger than $\gc{n}$, it can't be prime and it must be divisible by some number $q > 1$. If $q$ is not prime, $q$ must be divisible by some number larger than $1$, which $p+1$ must then also be divisible by. If we keep going, we will find a prime number $\rc{r} > 1$ which divides $p+1$. 

Since $\rc{r}$ is a prime number it is among the numbers we multiplied to make $p$ so it divides both $p$ and $p + 1$. Subtracting one divisor from the other, we get 

$$
\frac{p+1}{\rc{r}} - \frac{p}{\rc{r}} = \frac{p+1 - p}{\rc{r}} = \frac{1}{\rc{r}} \p
$$

On the left hand side, both terms are natural numbers, so the right hand side must also be a natural number. This implies $\rc{r} = 1$, which contradicts what we know about $\rc{r}$.
<span class="qed"></span>
</div>

This is may be the first proof in this article that takes a little bit of time to figure out, if you're not used to reading proofs. Don't be disheartened by this. The experience of proofs is different from the experience of reading other texts. Expect to spend plenty of time on figuring out each sentence. It's often good to have pencil and paper at the ready to draw diagrams for yourself, and to try each statement on some specific examples.

For instance, if you struggle with this proof, try replacing the initial assumption with the assumption that 17 is the largest prime. This will help you remove some of the abstractness of the proof and make it more explicit what's going on.

### Proof by induction

Proof by induction is another one of those patterns that takes a little getting used to. It is an essential method of proof, however: it almost always crops up when we have an enumeration of an infinite number of things, like all natural numbers, and we want to prove that a property holds for all of them.

Let's say we want to prove that every number is either odd or even. The idea is that we separate this into two statements:
* **The base case** The property holds for the first member of the set. In this case, $0$, which is even.
* **The induction step** _If we assume that the property holds for a number $n$_, then we prove that it also holds for the number $n+ 1$. In our example, we are given that $\gc{n}$ is either odd or even. If $\gc{n}$ is odd, $\gc{n}+1$ must be even and vice versa, which proves that $\gc{n} + 1$ must be either odd or even.

The idea is that if we have proved these two things, the result immediately follows for all $n$. The base case tells us the theorem is true for $n=0$. Then, using the indictive step together with the base case proves that the theorem is true for $n=1$. Knowing this, we can apply the inductive step _again_, to show that the theorem is true for $n=2$ and so on. 

Inductive proofs always use the natural numbers, but they aren't always _about_ the natural numbers. To show this, here is a simple inductive proof about trees.

Let's start with the basics about trees. Trees are [graphs](/graphs) that look like this.

-- image [indicate the "stump", root is level 1]

We can arrange trees in _levels_. The nodes at level $n+1$ are the children of a node at level $n$, called their parent. The node at level 1 is called the _root_. Every node except the root is always connected to one parent in the level above. It may be connected to some children in the level below. A connection is called an _edge_. The nodes on the highest level are called the leaves.

It turns out that if you follow these rules, the following are always true of any tree.
* They are <span class="rc">connected</span>: that is, there is a path between any two nodes.
* They have <span class="bc">no cycles</span>: that is, there is only _one_ path between any two nodes.

In fact, the implication goes both ways: if the above two properties are true of a graph, the graph is a tree.

<!-- 
It turns out, if these two properties are true for any graph, it is a tree. 
<aside>One subtle point is the choice of the root node. If you want to draw a tree like we did above with the nodes 
</aside>
 -->


<aside>I'm breaking my own rule about being precise in definitions here. I could define all this much better, but this is an article about proofs, not about trees.
</aside>

Now, to our proof.

<div class="theorem" markdown="1"><h5>Theorem.</h5> A tree with $\gc{n}$ nodes has $\gc{n}-1$ edges.
</div>
<div class="proof" markdown="1"><h5>Proof.</h5> We prove this by induction.

<!-- 
 on the number of nodes $\gc{n}$ in the tree.
<aside markdown="1">Induction "on the number of nodes $\gc{n}$" means that $\gc{n}$ wil be the variable we use for the induction. That is, $gc{n}=1$ will be our base case, and our induction step will go from $\gc{n}$ to $\gc{n}+1$.
</aside>
 -->

**The base case.** If $\gc{n} = 1$, there is only one possible tree: the stump. This has $0$ edges, which is equal to $\gc{n}-1$.

**The induction step.** We will assume that the theorem holds for $\gc{n}$, and show that this implies that it holds for $\gc{n}+1$. That is, we will prove that _if_ all trees with $\gc{n}$ nodes have $\gc{n}-1$ edges, _then_ all trees with $\gc{n}+1$ nodes have $\gc{n}$ edges.

Let $T$ be any tree with $\gc{n}+1$ nodes. Remove one edge $e$ between a leaf $l$ and its parent. This causes the leaf to become disconnected from the graph (a leaf has no children, and is allowed only one edge to a parent). In addition, no further nodes become disconnected, because the leaf is not connected to any other nodes than its parent, and the parent is either the root node, or connected to its parent.

-- image

We can also show that the remainder $R$ is a tree: that is it is <span class="rc">connected</span> and <span class="bc">acyclic</span>. 

<span class="rc">First, that it is connected</span>: the tree was connected before the removal, which means there was a path between any two nodes. For $R$ to be disconnected after the removal, there would have to be a pair of nodes $(a, b)$, neither of which is $l$, between which there was a path before the removal, but not after. For this to happen $e$ would have to be on the path, which implies $a$ or $b$ remains connected to $l$ after the removal. This contradicts the fact that $l$ is a leaf.

<span class="bc">To show that $R$ must be acyclic</span>, assume towards a contradiction that $R$ has a cycle. Mark it, and add $e$ back in, recovering $T$. Since all the edges in the cycle are still there, $T$ must be cyclic, which contradicts the fact that it's a tree.

In conclusion, $R$ is a tree, and it has exactly one fewer node than $T$. This means that the inductive assumption applies: we are allowed to assume that the theorem applies to every graph with $\gc{n}$ nodes. This tells us that $R$ has $\gc{n}-1$ edges. Since we removed one edge to make $R$ from $T$, $T$ must have $\gc{n}$ edges.<span class="qed"></span>
</div>

One common mistake people make in writing this kind of proof, is to do the induction over one specific tree. For instance, to make the assumption about the first $n$ levels of a specific tree. 

The key to the power of this proof method is in _the inductive assumption_, that is the bit of the inductuve step that we assume. In the whole proof, we only ever need to prove that this holds for a single, often very simple case (the base case). For the rest we can make the inductive assumption as broad and general as possible. In our case, it says that the property we are interested doesn't just hold for some subgraph of some tree we're working with, it says that it holds for absolutely every single tree of a certain size. 

<aside>Of course, it's no free lunch: the implication for $\gc{n}+1$, which we do have to prove, has to have the exact same structure as the assumption we make for $\gc{n}$, so the broader we make the assumption, the broader the implication becomes.
</aside>

To show the subtlety in applying induction correctly, here is [a famous example](https://en.wikipedia.org/wiki/All_horses_are_the_same_color) of an incorrect proof by induction, taken from [2].

<div class="theorem false"><h5>Theorem.</h5> All horses are the same color.
</div>
<div class="proof" markdown="1"><h5>Proof.</h5> We will prove this by induction on sets of horses of size $\gc{n}$.

**Base case.** If we have a set of horses of size $\gc{n} = 1$, then clearly all horses in the set are the same color.

**Inductive step.** We assume that in all sets of horses of size $\gc{n}-1$, the horses are all the same color, and we will prove that the same holds for sets of horses of size $\gc{n}$.

Assume we are given a set $H$ of $\gc{n}$ horses. Exclude one horse $\rc{h_1}$. The remainder $H - \rc{h_1}$ contains $\gc{n}-1$ horses, so they must all be the same color. Pick another horse $\bc{h_2}$, and note that $H - \bc{h_2}$ must also all be the same color. 

Since $\rc{h_1}$ is in the second set and $\rc{h_2}$ is in the first, $\rc{h_1}$ and $\bc{h_2}$ must also be of the same color, proving that all horses in $H$ are of the same color.
</div>

This proof is obviously incorrect, but the mistake is subtle. See if you can find it. One trick is to make the induction explicit. Turn the inductive step into an explicit proof, for for $\gc{n} =2$, then for $\gc{n} =3$ and so on. This is not just a good way to help you understand proof by induction, it can also help you to debug induction proofs.

<p>If we do that here, we get into trouble pretty quickly. Let $\gc{n} = 2$. To help us find the problem, we'll let $H$ contain one white and one black horse. Let's say the horses $\rc{h_1}$ and $\bc{h_2}$ which we exclude, are the white horse and the black horse respectively. The inductive assumption holds perfectly: the remainders are of size $\gc{n}=1$, and so only contain horses of the same color. 
</p>

The problem is in the final step of the proof. When we say 

<div class="proof">
Since $\rc{h_1}$ is in the second set and $\bc{h_2}$ is in the first, $\rc{h_1}$ and $\bc{h_2}$ must also be of the same color, proving that all horses in $H$ are of the same color.
</div>

<p>we are implicitly assuming that the two remainders $H-\rc{h_1}$ and $H - \bc{h_2}$ have a horse $h_3$ in common. If this were the case, then $\rc{h_1}$ and $\bc{h_2}$ would have to be the same color, because they would each be the same color as $h_3$. And indeed, for all cases $\gc{n}> 3$, there is such a third horse.</p>

But, for the case $\gc{n}=2$, the two remainders are disjoint and the inductive step fails.

I suppose there are a few takeaways here. First is that proof by induction can be a slippery business. It's easy to make implicit assumptions. More specifically, here the lesson is that when you think about the inductive step, you shouldn't just focus on the high er steps of the ladder. Make sure the first few steps after the base case work. They're the most crucial.

Finally, note the importance of _checking your own proof_. Just because you've reached the end, and all the individual steps seem fine, doesn't mean there aren't mistakes left to find. One way, is to go from the generic to the specific. Pick some concrete examples and walk through your proof. See what each of your assertions mean for this specific example.

### Proof by construction

Most theorems state that some property is true for all elements of a set. For instance, _all numbers are either odd or even_. For such a theorem, we cannot provide a proof by just giving a few examples of numbers that are odd or even. We can <em>dis</em>prove the theorem if we find a number that is neither, but for a proof we need another approach.

For some theorems, the situation is reversed. They assert that there _is_ a member of a set with a certain property. In that case, proving the theorem is as simple as finding one example and <em>dis</em>proving the theorem can no longer be done by any one example.

Here is an example of a single proof by example in the area of graphs. 

<div class="theorem proof-omitted" markdown="1"><h5>Definition.</h5> A graph is _hamiltonian_ if it contains a cycle that visits every node exactly once.
</div>

<div class="theorem" markdown="1"><h5>Theorem.</h5> There exist graphs that are not hamiltonian, but that become hamiltonian if any one node is removed.
</div>
<div class="proof"><h5>Proof.</h5>

<figure class="half center">
<img src="/images/proofs/petersen-graph.svg" />
</figure>

</div>

Graphs like these are called _hypo-hamiltonian_. This one is known as the [Petersen graph](https://en.wikipedia.org/wiki/Petersen_graph).

<aside markdown="1">If the purely visual approach is a bit to cryptic for you: the image top left shows the graph. To the right shows why there is no hamilonian cycle. One of the edges connecting the inner and outer ring must be in the cycle (rotate the graph so that that one is at the top). The next edge in the cycle can go left or right in the pentagram (flip it so that that one is to the right). The cycle must now trace out the pentagram and exit bottom left. At this point we miss a node whether we go left or right. The bottom pictures removing one node always yields a hamiltonian. If the removed node is in the outer ring, rotate the graph so that it is at the top, and see the example on the left. If it's in the inner ring, do the same for the example on the right. 
</aside>

### Non-constructive proofs

The notion of constructiveness of proofs runs quite deep. It's possible to prove that certain things exist without giving an explicit example. This is called a non-constructive proof. Here's an example, after Dov Jarden [1].

<div class="theorem" markdown="1"><strong>Theorem.</strong> It is possible for $\gc{c} = {\rc{a}}^\bc{b}$ to be a [rational number](/numbers), even when $\rc{a}$ and $\bc{b}$ are both irrational.
</div>
<div class="proof" markdown="1"><strong>Proof.</strong> Let $\rc{a} = \bc{b} = \sqrt{2}$, and note that $\sqrt{2}$ is irrational.

If $\gc{c}$ is rational, it the theorem is confirmed.

If $\gc{c}$ is irrational, then 

$$\begin{align*}
\gc{c}^\sqrt{2} &= \left({\rc{a}}^\bc{b} \right)^\sqrt{2}\\
&= \left(\sqrt{2}^\sqrt{2}\right)^\sqrt{2} = \sqrt{2}^{\,\sqrt{2}\sqrt{2}} = {\sqrt{2}}^{\,2} \\
&= 2 \p
\end{align*}$$

Since $\gc{c}$ and $\sqrt{2}$ are both irrational and $\gc{c}^\sqrt{2} = 2$ this proves the theorem. <span class="qed"></span>
</div>

Throughout the proof, we never find out whether $\gc{c} = \sqrt{2}^\sqrt{2}$ is rational, and we never get an explicit example for what irrational values we should set $\rc{a}$ and $\bc{b}$ to so that ${\rc{a}}^\bc{b}$ becomes rational. Yet, we can conclude by the end that such a pair of numbers must exist.

## How to find a proof

As an exercise, let's take a simple theorem, and see what the process might be by which we arrive at a proof. With a bit of insight, you may find a much more clever route to a proof that we take, here, but the idea of this section is to show the normal process in all it's messiness.

Here's the theorem.

<div class="theorem proof-omitted">
<h5>Theorem.</h5> For any natural number $\gc{n} \times \gc{n} - \gc{n}$ is an even number.
</div>

<!-- 

<aside>A natural number is one of the numbers $0, 1, 2, 3, \ldots$ and an even number is one that we can divide by $2$, i.e. $0, 2, 4, 6, 8, \ldots$</aside>
 -->

If this is true, then for any natural number $\gc{n}$ we pick, we get an even number and if it is false, we should be able to find some number for which $\gc{n}^2 - \gc{n}$ is an odd number.

So, how do we prove this? In high school maths, students (possibly driven but not caring too much about maths and rigour), may just try the formula for a few examples, say:

* $0 \times 0 - 0 = 0$,
* $1 \times 1 - 1 = 0$,
* $3 \times 3 - 3 = 6$,
* $11 \times 11 - 10 = 110$

and try to get away with presenting this as an anwser.

All of these are even (0 counts as even), so the theorem looks pretty good. But this is of course not a _proof_ that the statement holds for all possible natural numbers. No matter how many we check, we can't check them all. There are infinitely many of them, and our lives are finite.

That doesn't mean that this isn't a good exercise. For one thing, trying a few numbers helps us get a feel for the mechanics of the formula $\gc{n}^2 - \gc{n}$. For another thing if the statement is false, we can prove it this way. For that, we only need one counterexample. If we're lucky, we can find the counterexample and show that the theorem is actually false.

<aside>If we're unlucky, the counter-example does exist, but it's huge and we'll never find it, even if we look for it with a computer.
</aside>

So, how do we come up with a proof? This is the big hurdle for any mathematician starting out. You understand the proof statement, you understand what's expected of you, you just have no idea how to get started. 

As you learn, you build up a toolkit. A set of general strategies and attack patterns you can apply to a problem. More importantly, you learn to get used to this feeling of having nothing to hold on to yet. You learn that it takes a while to internalize a problem. Just because you have no idea now, doesn't mean you won't have any ideas in ten minutes, or an hour from now.

So you do things like try the computation for a few examples, maybe draw some visualizations of the problem, try to rewrite the statement in another form and so on. If you just spend some time doing that, you can usually find a way in.

In this case, let's start with an algebraic approach. If the number $\gc{n}^2 - \gc{n}$ is even, that means that we can write it as $2\bc{m}$, where $\bc{m}$ is another natural number. That is, we can write

$$
\gc{n}^2 - \gc{n} = 2\bc{m}
$$

with $\gc{n}$ and $\bc{m}$ natural numbers. In the hope of sparking some ideas, we could try rewriting this statement a little. Here are some options

<p>$$\begin{align*}
\gc{n}^2 &= 2\bc{m} + \gc{n} \\
\gc{n} &= \sqrt{2\bc{m} + \gc{n}} \\
\bc{m} &= \frac{\gc{n}^2 - \gc{n}}{2} = \frac{\gc{n}^2}{2} - \frac{\gc{n}}{2} \p\\
\end{align*}$$</p>

Let's look at that last line. A term like $\gc{n}/2$ is interesting. If $\gc{n}$ is an odd number, then this is not a natural number, but something ending in $\rc{.5}$. In order for $\bc{m}$ to still be a natural number, the term $\gc{n}^2/2$ should _also_ have $\rc{.5}$ after the decimal. This happens if $\gc{n}^2$ is odd too. If we try a few examples of odd numbers this seems to check: $3^2 = 9, 5^2= 25, 7^2=49$. It may be that the square of an odd number is always odd.

If $\gc{n}$ is even, then the term $\gc{n}/2$ is a natural number. This means that the term $\gc{n}^2$ should also be a natural number if $\bc{m}$ is going to be a natural number. Again, we can check for a few even numbers that the square seems to commonly be even $2^2 = 4, 6^2 = 36, 8^2 = 64$. 

So all we have to do is show that **odd numbers always have odd squares and even numbers always have even squares**. We've reframed our problem into a hopefully simpler problem. This is called a **lemma**: a statement for which we can provide a proof, which is used as a stepping stone to proving a theorem.

<aside>What's called a lemma and what's called a theorem is a choice of the author. There's no clear distinction.
</aside>

<div class="theorem proof-omitted">
<h5>Lemma.</h5> For any natural number $\gc{n}$, if $\gc{n}$ is even, then $\gc{n}^2$ is even and if $\gc{n}$ is odd then $\gc{n}^2$ is odd.
</div>

We know that if we can prove this lemma, we can prove our theorem. But where do we start with the lemma?

For the theorem, we tried two strategies: computing some examples, and rewriting the statement with algebra. For this lemma, we already computed some examples. Let's try our other strategy.

If $\gc{n}$ is even, then we can write $\gc{n} = 2\rc{k}$ for some natural number $\rc{k}$. What we would like to show, is that $\gc{n}^2$ is also even, or in other words, can be written as $\gc{n}^2 = 2\bc{m}$ for some natural number $\bc{m}$. With a little rewriting we get 

<p>$$\begin{align*}
\gc{n}^2 &= (2\rc{k})^2 \\
         &= 4\rc{k}^2 \p \\
\end{align*}$$</p>

We know that $\rc{k}$ is a natural number, so $\rc{k}^2$ must be one too. That means that if we take $\bc{m} = 2 \rc{k}^2$, we get $\gc{n}^2 = 2\bc{m}$ with $\bc{m}$ a natural number.

This tells us that $\gc{n}$ being even means $\gc{n}^2$ is even. What about the other part of the lemma? We can first try the same appraoch. If $n$ is odd then we _can't_ write $\gc{n} = 2\rc{k}$ for some natural number $\rc{k}$. This kind of statement is a little more complex to build on. 

A simpler approach is to take the previous proof and reverse the direction: we try to prove that if $\gc{n}^2$ is even, then $\gc{n}$ must be even too. This means that $\gc{n}^2$ is even if _and only if_ $\gc{n}$ is even. The result is that we can conclude that $\gc{n}^2$ must be odd if $\gc{n}$ is odd.

So, we assume that $\gc{n}^2$ is even. This means it can be written as $2\bc{m}$ for a natural number $\bc{m}$: $\gc{n}^2 = 2\bc{m}$. From this, we want to get to the result that $\gc{n} = 2\rc{k}$. 

I can't find a simpple way to do this algebraically, so let's get back to our previous strategy: computing specific examples. In the case of, say $4 \times 4 = 16$. How does the fact that $16$ is even imply that $4$ is even? What is it about the mechanics of the calculation that makes this happen?

We can see this more clearly if we break the multiplication up into a repeated addition:

$$
\oc{4} + \oc{4} + \rc{4} + \rc{4} = \oc{8} + \rc{8}
$$

In this case, we have an even number of terms, so it's clear that we can break $16$ in two by breaking the terms in two equal parts of $4 + 4$ each. Is this always the case? In general we get, under our assumption:

$$
\gc{n}  + \gc{n} + \ldots + \gc{n} = \bc{m} + \bc{m}
$$

where the number of terms on the left hand side is $\gc{n}$. We want to show that if $\bc{m}$ is even, $\gc{n}$ must be even too. What if it isn't? In that case we get a middle term of $\gc{n}$. Since all terms put together are $2\bc{m}$, $\bc{m}$ must be equal to all terms to one side of the middle one, plus half of <span class="gc">the middle term</span>. That is, we should be able to write

$$
\oc{n + \ldots + n} + \gc{n} + \rc{n + \ldots + n} = \oc{m} + \rc{m} \p
$$

but if that's true then this middle $\gc{n}$ should be divisible by $2$. If it isn't, then the two $\bc{m}$'s on the right hand side won't be natural numbers. In other words the $\bc{m}$'s are only natural numbers if $n$ is even.

<aside>Note that the <span class="oc">orange</span> and <span class="rc">red</span> parts are both equal to $(\gc{n}-1)/2$ terms of $\gc{n}$, or $\frac{\gc{n} - 1}{2}\gc{n}$. 
</aside>

To recap, this shows that if $\gc{n}^2$ is even, $\gc{n}$ is even, which implies that if $\gc{n}^2$ isn't even, then $\gc{n}$ isn't even. That proves the second part of our lemma. 

Ok, so that is technically a proof, but it isn't very neat. We arrived at our conclusions by a long and winding road. Instead of writing all of that down, we usually tighten things up a bit. How to do that depends on your audience. 

In our case, we might write the result something like this:

<div class="theorem">
<h5>Lemma.</h5> For a natural number $\gc{n}$, $\gc{n}^2$ is even if and only if $\gc{n}$ is even.
</div>
<div class="proof" markdown="1"><h5>Proof.</h5>Assume that $\gc{n}$ is even. Then for a natural number $\rc{k}$

$$\begin{align}
\gc{n}^2 &= (2\rc{k})^2 = 4\rc{k}^2 = 2\bc{m} \;\;\text{with } \bc{m} = 2\rc{k}^2
\end{align}$$

Since $\rc{k}$ is a natural number, $\bc{m}$ is as well, showing that $\gc{n}$ being even implies $\gc{n}^2$ being even.

In the other direction: assume that $\gc{n}^2$ is even. To show that $\gc{n}$ must be even, assume towards a contradiction that it is odd. Note that $\gc{n} - 1$ must be even. Then 

$$\begin{align*}
\gc{n}^2 &= (\gc{n}-1)\gc{n} + \gc{n} \\
&=\frac{\gc{n}-1}{2} \gc{n} + \frac{\gc{n}-1}{2} \gc{n} + \gc{n} \p
\end{align*}$$

In the last line, we have two terms representing the same whole number (so they sum to an even number) plus one representing an odd number ($\gc{n}$). The result is an odd number, which contradicts what we've assumed about $\gc{n}^2$
<span class="qed"></span>
</div>

&nbsp;

<div class="theorem">
<h5>Corollary.</h5> For a natural number $\gc{n}$, $\gc{n}^2$ is odd if and only if $\gc{n}$ is odd.
</div>
<div class="proof"><h5>Proof. </h5> This follows directly from the lemma above.
<span class="qed"></span></div>

<aside markdown="1">A _corollary_ is a proposition that follows almost directly from one just proven.
</aside>

<div class="theorem">
<h5>Theorem.</h5> For a natural number $\gc{n}$, $\gc{n}^2 - \gc{n}$ is even.
</div>
<div class="proof" markdown="1"><h5>Proof.</h5> If $\gc{n}$ is even, then by the lemma, both terms are even, and subtracting one even number from another yields an even number: $2\bc{m} - 2\bc{m'} = 2(\bc{m} - \bc{m'})$.

If $\gc{n}$ is odd, then by the corollary, both terms are odd, and subtracting one odd number from another yields an even number. Let $k$ and $k'$ be odd:

$$\begin{align*} 
k - k' &= \bc{k + 1} - \bc{k' - 1} + 1 - 1 & \text{note that the blue terms are even} \\
&= 2(m - m') + 1 - 1 & \text{first term is even} \p
\end{align*}$$

Which proves the theorem.
<span class="qed"></span>
</div>

&nbsp;

These proofs show the same basic structure of our derivation above. Note however that they are written down in reverse order from how we discovered them and that we've been a lot more precise. We've also fleshed out some details that we took for granted in our original reasoning, such as the fact that two even numbers sum to another even number, and we've made some things more compact, like phrasing the lemma in a single "if and only if". instead of two implications.

Gauss called this process "removing the scaffolding around the cathedral." We've arrived at a proof through a complicated route, and before we write it down, we tidy it up, so that we can provide something simple, direct and clear to the reader.

The downside of removing the scaffolding, is that it becomes very hard to see how the cathedral was built. As a student, when you see a proof like the one above, you may think that the author proceeded in the order it was written down. They saw the proof statement, realized that they would need these two lemmas and proceeded to prove them in this fashion. You have to do a little proof writing of your own to realize how far removed the original insight can be from the thing that's written down.

<aside>If you're cynically-minded, you could even posit that some mathematicians do this on purpose. It can be quite good for your reputation if your proofs look like no sane human could possibly have come up with them.</aside>

The good news is that increasingly, people are doing their best to write proofs that include the scaffolding. This is especially useful in educational contexts. You can do this for instance, by spelling out a "proof idea" before the main body of the proof: some informal language that shows, among other things, how a mortal mind might come up with this line of reasoning. 

Another way of doing this is simply to find a proof structure that is most aligned to intuitive ideas. There are usually many ways to prove something, and if you keep looking you can usually find a proof that isn't just correct, but also intuitive. The downside is that it's less likely to make people think of you as a genius, even though it's more work to find the proof.

## On rigour

When I began writing proofs in university, it took me a long time to understand what was expected of me. Often I would get my homework back simply with the comments "this is not a proof." I came to mathematics by way of AI, so I had never been properly trained in writing proofs, and the exact form that was expected of me was always a bit mysterious. If I asked for feedback, there was the usual spiel about being very precise, writing down your assumptions and what the statement was that you wanted to prove, and so on. Ultimately I still found it quite hard to pin down exactly where the point was when a loose argument became a proof, or at least enough of a proof to satisfy my lecturers and TAs.

Looking back, this is a subtle question, and I don't think it is quite fair to pretend that the distinction is entirely black and white. Or that it should be obvious to people starting out.

To illustrate, let's go back to the statement we proved above with hard work and lots of algebra: that $\gc{n}^2 - \gc{n}$ is always even.

Here is a famous "proof without words" for the same fact.

<figure class="center half">
<img src="/images/proofs/visual-proof.svg" class="half">
</figure>

Without stating any assumptions, or using any mathematical notation, this picture does the same thing we did in the whole of the previous section.

<aside>If you don't see the connection, the idea is that $\gc{n}^2$ is the number of cells in an $\gc{n}$ by $\gc{n}$ grid. If we remove the diagonal from this grid we are left with $\gc{n}^2-\gc{n}$ cells. We are also left with a shape that is perfectly symmetrical: it has as many cells left below the diagonal as above, so $\gc{n}^2-\gc{n}$ must be even.</aside>

If this had been my assignment in university, and I had sent in just the image as a proof, would I have passed? It's certainly a lot more elegant and to the point than the several paragraphs we wrote above. It also depends a lot on the reader whether they see what you are getting at. 

I suppose it depends on the teacher. Strictly speaking, this image does not represent a proof: it doesn't state its assumptions, it doesn't specify how the elements of the image map to the elements of the proof statement, it doesn't tell us how to interpret the image, or what reasoning steps to follow. Even worse, taken at face value it only proves the theorem for the case $\gc{n}=5$. For other values of $\gc{n}$ we must figure out how the idea generalizes for ourselves.

In short, this image does everything our teachers in university tell us we shouldn't do when we are writing proofs. And, yet, it isn't too difficult to imagine a TA smiling at this, giving me the benefit of the doubt, and allowing some partial credit. So what's going on here?

The first part of the puzzle is that proofs come in different levels of rigour. This is why it's unfair to tell students that things either are or aren't a proof. The truth is that a line of reasoning can have a certain amount of rigour and completeness, and how much of this is required depends a lot _on the context_. 

I think this was in part responsible for my confusion. The writers of textbooks and teachers in in theirs lessons often prefer short proofs. This has many reasons. Sometimes it's just to save space when they have a lot of material to get through. Sometimes it's a way to help you focus on the main idea, without too much technical detail cluttering things up. And sometimes the aim is to make you do part of the work, instead of spelling out every detail. 

The proofs you write for your homework have a very different context. There, you are expected to write very long and detailed proofs, and to leave no steps for the reader to figure out.

The unfortunate consequence is that when you are a student, the type of proof you see most often is not the type of proof you are supposed to write. Your teacher expects you to write long, elaborate proofs, showing that every step is true beyond a doubt, but when they show you the proofs they've written, they will leave all this detail out.

Yet another context is research papers. There, proofs are often short because it's a communication between skilled researchers. You leave out the steps that you expect your colleagues can fill in for themselves. This is a tricky business: leaving out steps is a great way to hide that you didn't bother to really prove something properly. It can be quite difficult to figure out what your readers expect you to spell out, and what they expect you to skip.

When you write your own proofs, the main way to prevent this is to write the long version first, and then to shorten it. That is, feel free to leave things out, but only after you have shown to yourself that you could make these steps explicit if you had to. 

<!-- 
This is usually what mathematicians do when they write short proofs: they give you the key ideas, and they leave out things that are relatively obvious, at least to colleagues working in the same field.
 -->

What you can leave out is a social convention. People like to think of proofs, and mathematics in general, as entirely non-social constructs: platonic ideals that exist above or outside of the day-to-day vagueries of social norms. I'll let you make up your own mind about that. However, what is undeniable is that the way we write about those constructs is _highly_ social. Every time you choose to omit something from a proof you are implicitly asking your reader to trust you. To trust that you did the work, even though you didn't write it down. To trust that you didn't make a mistake in the part you're skipping over. In return you trust that they are smart enough to fill in the blanks for themselves.

This doesn't just require trust, it requires understanding. Just like with any piece of writing, you need to have a clear idea of who your reader is, what their skills are, and what background knowledge they'll possess. 

<aside>This is why things are so difficult as a student. Your reader is a teacher. They will give you no benefit of the doubt, because you haven't proved yourself yet. You are expected to write the whole proof in all its glorious detail. Moreover, it's very difficult to understand the mind of your teacher, because of the imbalance of experience. Perhaps they will find certain part of your proof trivial and certain parts key. But how would you know? If you want to play it safe, you'd better write the whole thing out in full. The only thing I wish people has told me when I was a student, is that this means your proofs will look nothing like the ones in the textbook. 
</aside>

You may ask what lies at the extreme end of the spectrum. Can any proof be made indefinitely more precise. Can every step be divided up into further substeps? I think a good benchmark for the most rigorous proof, is the idea of a **formalized proof**. These are proofs that are written in such a strict and formalized language, one that looks a lot like a programming language, that a machine can, with no intelligence or intuition, through simple mechanical chaining of rules, verify that the conclusion follows follows from the chain of reasoning.

Writing formalized proofs is not for the faint of heart. These proofs can grow very long, and many things are almost impossible to do in these systems. But if you want the ultimate verification that your proof is correct beyond a shadow of doubt, this as close as you'll get.
 
However, the dividing line between something that gets you a passing grade and something that is apprently "not a proof" is not just about sufficient rigour. My teachers at university did not find my answers sufficiently rigorous, but they probably would refer to the image above as a "visual proof." Part of the answer is context, but part of it is also that the visual proof above shows that you have cracked the _central_ puzzle. It doesn't serve as a full and rigorous proof, but it does get to the heart of the problem. The nice thing about visual proofs is that they eliminate all the window dressing, the really allow you to see what the key insight behind the proof is. 

It's a bit like a master painter setting out the broad strokes of a composition in 15 minutes, and leaving the details for their assistant to finish over the next days. The assistant did all the work, but the strokes that the master painted form the essence of the painting.

<aside>That's what the master would say, at least.
</aside>

Clearly, that kind of distinction is very subtle, and far too subjective for the purposes of a homework exercise. When you are starting out writing proofs, I suggest you simply write the most completely and rigorous proof you can. Over time, you will start to see the wood for the trees, and you will begin to separate the main idea from the admin and the housekeeping. 

The more you practice, the more you will gravitate towards judiciously leaving things out. Partly to economize on space, partly to help readers focus on the main idea. You may even try flourishes like visual proofs. But such flourishes must be _earned_. You can do that when you have shown that you are not hiding anything in the parts of the proof you leave out. You should, in principle, always have the full rigorous proof worked out in your head, before you decide which parts to put on paper.

## Further resources

Much has been written on proofs, and how to write them. Here are some books I recommend, if you really want to dig in. They provide more detail on different proofs than I have given here, and many of them provide some exercises as well.

**[Proof and the art of mathematics](https://jdh.hamkins.org/proof-and-the-art-of-mathematics/)** Joel David Hamkins. This is a very readable beginner's guid to proof. Like in this article, most of the proofs are in intuitive areas like basic properties of natural numbers, or geometries. Hamkins doesn't just set out the basic principles, he also goes into detail, showing different ways to prove the same thing and general, and provides general good habits that you should try to develop as you write your own proofs. 

**[How to solve it](https://en.wikipedia.org/wiki/How_to_Solve_It)**, George Pólya. Presented as a basic problem solving manual, but many of the problems are mathematical in nature.

**[How to prove it: a structured approach](https://doi.org/10.1017/9781108539890 )**, Daniel Velleman. This one is more of a detailed manual. It provides throrough discussions of preliminaries like set theory and logic. You can find [a preview here](https://www.book2look.com/book/9781108424189).

## References

[1] Jarden, D. (1953). A simple proof that a power of an irrational number to an irrational exponent may be rational. Scr. Math, 19, 229.

[2]  Cohen, Joel E. (1961). [On the nature of mathematical proof](http://komplexify.com/math/humor_pure/NatureOfMathematicalProof.html). Opus.. Reprinted in A Random Walk in Science (R. L. Weber, ed.), Crane, Russak & Co., 1973.
