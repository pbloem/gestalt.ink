---
title: Proofs

---

# Proofs

## Summary

A _proof_ is a mathematical argument. The aim is to create a sequence of statements that is so precise, that any mathematician with sufficient understanding cannot disagree that each step must follow from the preceding, and therefore that the final conclusion must hold true. 

A rigorous proof aims to make the business of reasoning an entirely _mechanical_ process: the more rigorous a proof is the less we need to appeal to our intuitions. We can simply apply the rules that we know to check that each step follows from the last. 

Proofs are the primary way by which we validate and record mathematical truth. Where a physicist must prove that a statement is true by experiment, a mathematician must prove that a statement is true by writing a rigorous proof.

We will discuss the following topics in this article.
* Levels of rigour
* Assumptions and axioms
* Different types of proof, including
  * Proof by contradiction
  * Proof by induction

## Example

Here is an example of a short proof for a simple mathematical truth.

<div class="proof">
</div>

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
