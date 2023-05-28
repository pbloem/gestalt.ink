---
title: Proofs

---

# Proofs

## Summary

A _proof_ is a mathematical argument. The aim is to create a sequence of statements that is so precise, that any mathematician with sufficient understanding cannot disagree that each step must follow from the preceding, and therefore that the final conclusion must hold true. 

A rigorous proof aims to make the business of reasoning an entirely _mechanical_ process: the more rigorous a proof is the less we need to appeal to our intuitions. We can simply apply the rules that we know to check that each step follows from the last. 

Proofs are the primary way by which we validate and record mathematical truth. Where a physicist must prove that a statement is true by conducting a careful experiment, a mathematician must prove that a statement is true by writing a rigorous proof.

We will discuss the following topics in this article.
* Levels of rigour
* Assumptions and axioms
* Different types of proof, including
  * Proof by contradiction
  * Proof by induction

## Example

Here is an example of the sort of statement for which we might like to write a proof. We call such a statement a _theorem_.

<div class="theorem">
<strong>Theorem.</strong> For any natural number $\gc{n} \times \gc{n} - \gc{n}$ is an even number.
</div>

<aside>A natural number is one of the numbers $0, 1, 2, 3, \ldots$ and an even number is one that we can divide by $2$, i.e. $0, 2, 4, 6, 8, \ldots$</aside>

Note how precise the statement is. It should be clear that this statement is either true or false. If it is true, then for any natural number $\gc{n}$ we pick, we get an even number and if it is false, we should be able to find some number for which $\gc{n}^2 - \gc{n}$ is an odd number.

So, how do we prove this? In high school maths, students (possibly driven but not caring too much about maths and rigour), may just try the formula for a few examples, say:

* $0 \times 0 - 0 = 0$,
* $1 \times 1 - 1 = 0$,
* $3 \times 3 - 3 = 6$,
* $11 \times 11 - 10 = 110$

and try to get away with presenting this as an anwser.

All of these are even (0 counts as even), so the theorem looks pretty good. But this is of course not a _proof_ that the statement holds for all possible natural numbers. No matter how many we check, we can't check them all. There are infinitely many of them, and our lives are finite.

That doesn't mean that this isn't a good exercise. For one thing, trying a few numbers helps us get a feel for the mechanics of the formula $\gc{n}^2 - \gc{n}$. For another thing if the statement is false, we can prove it this way. For that, we only need one counterexample. If we're lucky, we can find the counterexample and get our proof.

<aside>If we're unlucky, the counter-example does exist, but it would take longer than a human lifetime to write down. 
</aside>

So, how do we come up with a proof. This is the big hurdle for any mathenmatician starting out. You understand the proof statement, you understand what's expected of you, you just have no idea how to get started. 

As you learn, you build up a toolbelt. A set of general strategies and attack patterns you can apply to a problem. More importantly, you learn to get used to this feeling of having nothing to hold on to yet. You learn that it takes a while to internalize a problem. So you do things like try the computation for a few examples, maybe draw some visualizations of the problem, try to rewrite the statement in another form and so on. If you just spend some time doing that, you can usually find a way in.

In this case, let's start with an algebraic approach. If the number $\gc{n}^2 - \gc{n}$ is even, that means that we can write it as $2\bc{m}$, where $\bc{m}$ is another natural number. That is we can write

$$
\gc{n}^2 - \gc{n} = 2\bc{m}
$$

with $\gc{n}$ and $\bc{m}$ natural numbers. In the hope of sparking some ideas, we could try rewriting this statement a little. Here are some options

<p>$$\begin{align*}
\gc{n}^2 &= 2\bc{m} + \gc{n} \\
\gc{n} &= \sqrt{2\bc{m} + \gc{n}} \\
\bc{m} &= \frac{\gc{n}^2 - \gc{n}}{2} = \frac{\gc{n}^2}{2} - \frac{\gc{n}}{2} \p\\
\end{align*}$$</p>

Let's look at that last line. A term like $n/2$ is interesting. If $n$ is an odd number, then this is not a natural number, but $1\rc{.5}$. In order for $m$ to still be a natural number, the term $\gc{n}^2/2$ should also have $\rc{.5}$ after the decimal. This happens if $\gc{n}^2$ is odd too. If we try a few examples of odd numbers, this checks out: $3^2 = 9, 5^2= 25, 7^2=49$.

If $n$ is even, then the term $\gc{n}/2$ is a natural number. This means that the term $\gc{n}^2$ should also be a natural number if $\bc{m}$ is going to be a natural number. Again, we can check for a few even numbers that the square seems to commonly be even $2^2 = 4, 6^2 = 36, 8^2 = 64$. 

So all we have to do is show that **odd numbers always have odd squares and even numbers always have even squares**. We've reframed our problem into a hopefully simpler problem. This is called a **lemma**: a statement for which we can provide a proof, which is used as a stepping stone to proving a theorem.

<aside>What's called a lemma and what's called a theorem is a choice of the author. There's no clear distinction.
</aside>

<div class="theorem">
<strong>Lemma.</strong> For any natural; number $\gc{n}$, if $\gc{n}$ is even, then $\gc{n}^2$ is even and if $\gc{n}$ is odd then $\gc{n}^2$ is odd.
</div>

We know that if we can prove this lemma, we can prove our theorem. But how do we start? 

For the theorem, we tried two strategies: computing some examples, and rewriting the statement with algebra. For this lemma, we already computed some examples. Let's try our other strategy.

If $\gc{n}$ is even, then we can write $\gc{n} = 2\rc{k}$ for some natural number $\rc{k}$. What we would like to show, is that $\gc{n}^2$ is also even, or in other words, can be written as $\gc{n}^2 = 2\bc{m}$ for some natural number $\bc{m}$. With a little rewriting we get 

<p>$$\begin{align*}
\gc{n}^2 &= (2\rc{k})^2 \\
         &= 4\rc{k}^2 \p \\
\end{align*}$$</p>

We know that $\rc{k}$ is a natural number, so $\rc{k}^2$ must be one too. That means that is we take $\bc{m} = 2 \rc{k}^2$, we get $\gc{n}^2 = 2\bc{m}$ with $\bc{m}$ a natural number.

This tells us that $\gc{n}$ being even means $\gc{n}^2$ is even. What about the other part of the lemma? We can first try the same appraoch. If $n$ is odd then we _can't_ write $\gc{n} = 2\rc{k}$ for some natural number $\rc{k}$. This kind of statement is a little more complex to build on. 

A simpler approach is to take the previous proof and reverse the direction: we try to prove that if $n^2$ is even, then $n$ must be even too. This means that $\gc{n}^2$ is even if _and only if_ $\gc{n}$ is even. The result is that we can conclude that $\gc{n}^2$ must be odd if $\gc{n}$ is odd.

So, we assume that $\gc{n}^2$ is even. This means it can be written as $2\bc{m}$ for a natural number $\bc{m}$: $\gc{n}^2 = 2\bc{m}$. From this, we want to get to the result that $\gc{n} = 2\rc{k}$. 

I can't find a way to do this algebraically, so let's get back to our previous strategy: compiting specific examples. In the case of, say $4 \times 4 = 16$. How does the fact that the square is even imply that $4$ is even. What is it about the mechanics of the calculation?

We can see this more clearly is we break the multiplication up into a repeated addition:

$$
\oc{4} + \oc{4} + \rc{4} + \rc{4} = \oc{8} + \rc{8}
$$

In this case, we have an even number of terms, so it's clear that we can break $16$ in two by break the terms in two equal parts of $4 + 4$ each. Is this always the case? In general we get, under our assumption:

$$
\gc{n}  + \gc{n} + \ldots + \gc{n} = \bc{m} + \bc{m}
$$

where the number of terms on the left hand side is $n$. We want to show that $n$ must be even. What if it isn't? In that case we get a middle term $\gc{n}$. Since all terms put together are $2\bc{m}$, $\bc{m}$ must be equal to all terms to one side of the middle one, plus half of \gc{the middle term}. I.e. we should be able to write

$$
\oc{n + \ldots + n} + \gc{n} + \rc{n + \ldots + n} = \oc{m} + \rc{m} \p
$$

but if that's true then this middle $\gc{n}$ should be divisible by $\gc{n}$. If it isn't, then the two $m$'s on the right hand side won't be natural numbers. In other words the $m$'s are only natural numbers if $n$ is even.

To recap, this shows that if $n^2$ is even, $n$ is even, which implies that if $n^2$ isn't even, then $n$ isn't even. That proves the second part of our lemma. 

Ok, so that is technically a proof, but it isn't very neat. We arrived at our conclusions by a long and winding road. Instead of writing all of that down, we usually tighten things up a bit. How to do that depends on your audience. In our case, we might write the result something like this:

<div class="theorem">
<strong>Lemma A.</strong> For a natural number $\gc{n}$, $n^2$ is even if and only if $n$ is even.
</div>
<div class="proof"><strong>Proof. </strong>Assume that $\gc{n}$ is even. Then for a natural number $\rc{k}$
<p>$$\begin{align}
\gc{n}^2 &= (2\rc{k})^2 = 4\rc{k}^2 = 2\bc{m} \;\;\text{with } \bc{m} = 2\rc{k}^2
\end{align}$$</p>
Since $\rc{k}$ is a natural number, $\bc{m}$ is as well, showing that $\gc{n}$ being even implies $\gc{n}^2$ being even.

In the other direction: assume that $\gc{n}^2$ is even. To show that $n$ must be even, assume that were odd. Let $\oc{n'} = \gc{n} - 1$ and note that it must be even. Then 
$$
\gc{n}^2 = \frac{\oc{n'}}{2}\gc{n} + n + \frac{\oc{n'}}{2}\gc{n} = 2\bc{m} \p
$$
<span class="qed"></span>
</div>

&nbsp;

<div class="theorem">
<strong>Lemma B.</strong> For a natural number $\gc{n}$, $n^2$ is odd if and only if $n$ is odd.
</div>
<div class="proof"><strong>Proof. </strong> This follows directly from Lemma A.
<span class="qed"></span></div>

&nbsp;

<div class="theorem">
<strong>Theorem.</strong> For a natural number $\gc{n}$, $\gc{n}^2 - \gc{n}$ is even.
</div>
<div class="proof"><strong>Proof.</strong> If $\gc{n}$ is even, then by Lemma A, both terms are even, and subtracting one even number from another yields an even number: $2\bc{m} - 2\bc{m'} = 2(\bc{m} - \bc{m'})$.

If $\gc{n}$ is odd, then by Lemma B, both terms are odd, and subtracting one odd number from another yields an even number. Let $k$ and $k'$ be odd:
$$\begin{align*} 
k - k' &= \bc{k + 1} - \bc{k' - 1} - 1 + 1 & \text{note that the blue terms are even} \\
&= 2(m - m') + 1 - 1 & \text{first term is even} \p
\end{align*}$$
Which proves the theorem.
<span class="qed"></span>
</div>

&nbsp;

These proofs show the same basic structure of our derivation above. Note however that they are written down in reverse order from how we discovered them and that we've been a lot more precise. We've fleshed out some details that we took for granted in our original reasoning, such as the fact that two even numbers sum to another even number.

Carl Gauss called this process "removing the scaffolding around the cathedral". We've arrived at a proof through a complicated route, and before we write it down, we tidy it up, so that we can provide something simple, direct and clear to the reader.

The downside is that it becomes very hard to see how the cathedral was built. 

<aside>This is perhaps more of a problem in math than in cathedral building. </aside>

As a student, when you see a proof like the one above, you may think that the mathematician in question proceeded in the order it was written down. They saw the proof statement, realized that they would need these two lemmas and proceeded to prove them in this fashion. You have to do a little proof writing of your own to realize how far removed the original insight can be from the thing that's written down.

<aside>If you're cynically-minded, you could even posit that some mathematicians do this on purpose. It can be quite good for your reputation if your proofs look like no sane human could possibly have come up with them.</aside>

The good news is that increasingly, people are doing their best to write proofs that include the scaffolding. This is especially useful in educational contexts. You can do this for instance, by spelling out a "proof idea" before the main body of the proof: some informal language that shows, among other things, how a mortal mind might come up with this line of reasoning. 

Another way of doing this is simply to find a proof structure that is most aligned to intuitive ideas. There are usually many ways to prove something, and if you keep looking you can usually find a proof that isn't just correct, but also intuitive. The downside is that it's less likely to make people think of you as a genius, even though it's more work to find the proof.

## On rigour

When I began writing proofs in university, it took me a long time to understand what was expected of me. Often I would get my homework back simply with the comments "this is not a proof". I came to mathematics by way of AI, so I had never been properly trained in writing proofs, and the exact form that was expecte of me was always a bit mysterious. If I asked for feedback, the was the usual spiel about being very precise, writing down your assumptions and what the statement was that you wanted to prove, but ultimately I still found it quite hard to pin down exactly where the point was when a loose argument became a proof, or at least enough of a proof to satisfy my lecturers and TAs.

Looking back, this is a subtle question, and I don't think it is quite fair to pretend that the line is entirely black and white. To illustrate, here is a famous "proof without words" for the statement that the first $n$ odd numbers $1, 3, 4, 5$ always add up to some number that can be written as $m \times m$ (with $m$ a natural number).

-- Image (dots)

If this had been my assignment in university, and I had sent in just the image, would I have passed? I suppose it depends on the teacher. Strictly speaking, this image does not represent a proof: it doesn't state its assumptions, it doesn't specify how the elements of the image map to the elements of the proof statements, it doesn't tell us how to interpret the image, or what reasoning steps to follow. In short, this is about as far short of what people tell us a proof is as we can get.

And, yet, it isn't too difficult to imagine a TA smiling at this, giving me the benefit of the doubt, and allowing some partial credit. So what's going on here?

The first part of the puzzle is that proofs come in different levels of rigour. This is why it's unfair to tell students that things either are or aren't a proof. The truth is that a line of reasoning have a certain amount of rigour and completeness, and how much of this is required depends a lot on the circumstances. 

-- Examples

I think this was in part responsible for my confusion. The writers of textbooks and teachers in in theirs lessons often prefer short proofs. This has many reasons. Sometimes it's just to save space when they have a lot of material to get through, and sometimes the aim is to make students to part of the work, instead of spelling out every detail. 

The unfortunate consequence is that when you are a student, the type of proof you see most often is not the type of proof you are supposed to write. Your teacher expects you to write long, elaborate proofs, showing that every step is true beyond a doubt, but when they do the same thing, they will leave out a lot of detail and focus on the main idea.

When you write your own proofs, the main way to prevent this is to write the long version first, and then to shorten it. That is, feel free to leave things out, but only after you have shown to yourself that you could make these steps explicit if you had to. This is usually what mathematicians do when they write short proofs: they give you the key ideas, and they leave out things that are relatively obvious, at least to colleagues working in the same field.

What you can leave out is a social convention. People like to think of proofs, and mathematics in general, as entirely non-social constructs: platonic ideals that exist above or outside of the day-to-day vagueries of social norms. I'll let you make up your own mind about that. But it's undeniable that the way we write about those constructs is _highly_ social. Every time you choose to omit something from a proof you are implicitly asking your reader to trust you. To trust that you did the work, even though you didn't write it down. To trust that you didn't make a mistake in this part. In return you trust that they are smart enough to fill in the blanks for themselves.

This doesn't just require trust, it requires understanding. Just like with any piece of writing, you need to have a clear idea of who your reader is, what their skills are, and what background knowledge they'll possess. 

<aside>This is why things are so difficult as a student. You reader is a teacher. They will give you no benefit of the doubt, because you haven't proved yourself. You are expected to write the whole proof in all its glorious detail. Moreover, it's very difficult to understand the mind of your teacher, because of the imbalance of experience. Perhaps they will find certain part of your proof trivial and certain parts key. But how would you know? If you want to play it safe, you'd better write the whole thing out in full. The only thing I wish people has told me when I was a student, is that this means your proofs will look nothing like the ones in the textbook. 
</aside>

You may ask what lies at the extreme end of the spectrum. Can any proof be made indefinitely more precise. Can every step be divided up into further substeps? I think a good benchmark for the most rigorous proof, is the idea of a **formalized proof**. These are proofs that are written in such a strict and formalized language, one that looks a lot like a programming language, that a machine can, with no intelligence or intuition, through simple mechanical chaining of rules, verify that the conclusion follows follows from the chain of reasoning.

Writing formalized proofs is not for the faint of heart. These proofs can grow very long, and many things are almost impossible to do in these systems. But if you want the ultimate verification that your proof is correct beyond a shadow of doubt, this as close as you'll get.
 
However, the dividing line between something that gets you a passing grade and something that is apprently "not a proof" is not just about sufficient rigour. 

<!-- This is all a bit waffly. Maybe tighten this up. Think about what we really want to say here.
-->

## Proofs and axioms


## Some methods of proof

### Proof by contradiction

### Proof by induction
