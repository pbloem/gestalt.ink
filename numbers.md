---
title: Numbers
summary: "You know what numbers are. We start learning about numbers in math long before we learn to define things rigorously. 

The result is that the concept of numbers is one of those that we have to "come back to" after we've learned a bit of math, in order to treat them with a bit more deference and see how they should be defined properly."
---

# Numbers

<div class="prel">preliminaries:</div>
* [set theory](/set-theory)

## Summary

You know what numbers are. Numbers are probably the first aspect of mathematics most of us learn about. We learn about them long before we start being rigorous.

The result is that "numbers" as a concept is so intuitive to us, that it takes an active mental effort to make our assumptions about them explicit. This is necessary, however, to define them properly. We must, as they say, unlearn what we've learned.

To understand basic university-level mathematics, we don't need to dig too deep into the different types of numbers that exist. We just need four families of numbers. For each we describe the _set_ of all possible numbers with a capital letter in blackboard script like $\mathbb N$, $\mathbb Z$, $\mathbb Q$ or $\mathbb R$. 

We will discuss:

* The <span class="oc">natural numbers</span> $\oc{\mathbb N}$: $0, 1, 2, 3, \ldots$ (sometimes defined without $0$ included).
* The <span class="gc">integers</span> $\gc{\mathbb Z}$: $\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots$ That is, the natural numbers together with their negative counterparts.
* The <span class="bc">rational numbers</span> $\bc{\mathbb Q}$: Numbers like $\frac{22}{400}$, $-\frac{1}{2}$. Anything that can be written as one integer divided by another integer
* The <span class="rc">real numbers</span> $\rc{\mathbb R}$: Any number that can be written as a decimal like $675.1233\ldots$, with potentially infinitely many numbers after the decimal point.

<aside>Note that it isn't the <em>representation</em> that's important here. The number $0.5$ is written in a decimal expansion, so it's a real number, but it can also be written as $\frac{1}{2}$ so it's also a rational number.
</aside>

The main thing you'll need to remember is what these four families are, how they are defined and some of the subtleties about them. One thing we'll give away right now is that these are all subsets of each other: every <span class="oc">natural</span> number is an <span class="gc">integer</span>, every <span class="gc">integer</span> is a <span class="bc">rational</span> number and every <span class="bc">rational</span> number is a <span class="rc">real</span> number. 

They are also _strict subsets_: there are <span class="rc">real</span> numbers that aren't <span class="bc">rational</span> numbers, there are <span class="bc">rational</span> numbers that aren't <span class="gc">integers</span> and there are <span class="gc">integers</span> that aren't <span class="oc">natural</span> numbers.

Or, more compactly:

$$
\oc{\mathbb N} \subset \gc{\mathbb Z} \subset \bc{\mathbb Q} \subset \rc{\mathbb R} \p
$$

## <span class="oc">The natural numbers</span>

The **natural numbers** are also called the **counting numbers**. They are a set of numbers we use for talking about amounts of things. Apples seem to be the canonical example. I can have $0$ apples, or $1$ apple, or $2$ apples and so on. 

They are also called the _whole numbers_, because we do not, for the moment, cut our apples into chunks. The numbers can only be used to count quantities of whole objects. Other than that, any amount you can have of something is a natural number.

<aside>Whether $0$ is contained in the natural numbers is a bone of contention among mathematicians. Some people define $\oc{\mathbb N}$ to include $0$ and some don't. In these articles, I'll try to stick with the convention that $0$ is included. </aside>

If you're writing your own math where this is relevant, it's best to define $\oc{\mathbb N}$ explicitly to avoid any ambiguity.

In the article on [set theory](/set-theory), we explained how to represent the natural numbers using just the language of set theory and nothing else. To summarize:

* The number $0$ is represented by the empty set $\{\}$.
* For any number, we define its _successor_ as the set containing all numbers below it.

You can use natural numbers perfectly well without thinking of them as sets, but it's nice to know that there is a rigorous definition for them that makes sense. With this we can start to define the operations on the natural numbers we alrady know.

* The _successor operation_ is just picking the next natural number along. We could write it as $n+ 1$, except we've not defined addition yet. From the definition, we can see that the succesor operation is always defined for any natural number.
* We can define _adddition_ as repeating the successor operation a given number of times. Starting with a natural number like $\rc{4}$, we can apply the successor operation <span class="bc">three times</span>. The result is $\rc{4} + \bc{3} = 7$. Note that this is something we can also do the other way around: start with the number $\rc{3}$ and apply the successor operation <span class="bc">four times</span>. It turns out that these result in the same number, so the operation of addition is symmetrical $(\rc{4} + \bc{3} = \bc{3} + \rc{4})$, but the _definition_ is asymmetrical.
* Since repeating the successor operation worked well for us, maybe we can repeat the addition operation as well. This gives us _multiplication_ Take the action of applying the successor operation three times ($\bc{+3}$) and repeat it <span class="gc">five times</span>. The number you end up adding is equal to $\bc{3} \times \gc{5}$. Again, the definition is not symmetric, but we can prove that $\bc{3} \times \gc{5} = \gc{5} \times \bc{3}$.
* Applying the same trick again, we can see what happens if we repeatedly multiply a number. Take the multiplication by $\gc{5}$ form the previous definition and repeat it <span class="oc">three times</span>. The result, of course, is exponentiation: $\gc{5}^\oc{3}$.

<aside markdown="1">If we keep doing the same thing we get more obscure operations like "tetration".
</aside>

The key thing about these operations is that they are always defined on natural numbers. The successor function is always defined by definition: if we apply it to a natural number, the result is always another natural number. The addition is just repeated application of the successor function, so it should also always result in another natural number. Multiplication is repeated addition, so it's always defined and so on for exponentiation and tetration.

## <span class="gc">The integers</span>

## <span class="bc">The rationals</span>

<!-- 
$$
\bc{\mathbb Q} = \{ \frac{a}{b} \mid a, b \in \gc{\mathbb Z}\} \p
$$
 -->
  
* Note that pi, e, sqrt are not rationals.

## <span class="rc">The reals</span>

The real numbers are where our definitions get a little hairy. It took mathematicians a while to work out exactly how to construct the real numbers, even though people had already been using them implicity for hundreds of years.

The simplest way to think of them is in terms of decimal expansions. For instance, the number $\pi$ can be written as 

$$
3.141592 \ldots
$$

The sequence of digits after the decimal can be expanded further to make this representation more precise. If we allow ourselves to use infinite sequences of digits, then the reals are those numbers that can be written as a finite sequence of digits before the decimal point, and an infinite sequence after. 

<aside>The inifinite sequence doesn't have to be as complex as it is in the case of $\pi$. For instance, the rational number $\frac{1}{2}$ can be written as $0.5000\ldots$.
</aside>

Like with the <span class="bc">rationals</span>, we do end up with some doubles: the number 1 can be written as $1.000\ldots$ or as $0.999\ldots$. If we inspect these carefully, after making rigorous definitions, we find that they refer to the same number. However, if we accept that such equivalent representations exist, we can think of set of reals very naturally as all numbers that can be expressed in this manner.

If it makes you uncomfortable to define a set of numbers based on something as unpredictiable and poorly defined as an infinite sequence, then you are in good company. A proper definition of the reals would be more careful than this. As a result, it's also a bit more involved. 

To define the reals more rigorously, we can work with _approximations_. Take, for instance, the number $\sqrt{2}$. In a room with sides of 1 meter, this is the distance from one corner to the corner opposite.

-- image

First things first: can we express $p$ as a <span class="bc">rational number</span>? This is one of those classic problems. For many people, the first proof they ever see. If you haven't seen it before, here it is.

<div class="theorem">
$\sqrt{2} \notin \bc{\mathbb Q}$.
</div>
<div class="proof" markdown="1">
Assume [towards a contradiction](/proofs) that $\sqrt{2}$ _can_ be written as a rational. That is we assume that there are integers $\bc{p}$ and $\rc{q}$ so that 

$$
\frac{\bc{p}}{\rc{q}} = \sqrt{2}
$$

or, equivalently

$$
\frac{\bc{p}^2}{\rc{q}^2} = 2 \p
$$

We can also assume that whoever provided us with this rational expression of $\sqrt{2}$ took the trouble to give us an irreducible fraction. That is, $\bc{p}$ and $\rc{q}$ have no common divisor: we cannot simplify the fraction $\frac{\bc{p}}{\rc{q}}$. 

We can now rewrite:

$$\begin{align*}
\bc{p}^2 &= 2\rc{q}^2} \\
\frac{1}{2}\bc{p}\bc{p} &= \rc{q}\rc{q}} \p \\
\end{align*}$$




<span class="qed"></span>
</div>



## Breaking out of the reals

If you've been paying attention, you should have noticed a pattern. We defined the natural numbers, and some operations that were defined on all of them. Then, looking at the inverses of these operations, we were forced to "break out" of the natural numbers. The inverse of addition broke us out into the integers. The inverse of multiplication broke us out into the rationals. 

Finally, the inverse of the square root broke us out of the rationals. Here, we took a shortcut. Instead of just adding the radicals to the rationals, we defined a number system from scratch that contained the radicals, the rationals and many other numbers. 

Is this the end of the line? Are there inverses that will break us out of the reals, into a new, even greater universe? The answer is yes, and we don't even need a new operation. We can stick with the humble square, but force it to result in a negative number. That is, what is the number $x$ such that 

$$
x \times x  = -1 \p
$$

With high-school math, your intuition will tell you that there is "no such number". 

<aside>This is simply because a positive number multiplied by itself yields a positive number, so we can eliminate all positive numbers, and a negative number multiplied by itself also yields a positive number so we can eliminate those as well. Finally $0$ multiplied by itself yields $0$, and when we eliminate that, we have no real numbers left over.
</aside>

But with the benefit of the more precise definitions we've developed above, we can say that "there is no such <span class="rc">real number</span>". What if we just assume that $x$ does exist, in some larger family of numbers? We can give it a name, and start doing some math to see if this assumption holds, and leads to a working set of numbers.

The conclusion is that it does. The resulting set of numbers are called the **complex numbers** $\mathbb Q$, which we will discuss in [a later article](/complex-numbers). 
