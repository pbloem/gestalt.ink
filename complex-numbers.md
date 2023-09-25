---
title: Complex numbers
summary: ""
---

# Complex numbers

<div class="prel">preliminaries:</div>
* [numbers](/numbers)

## Summary

The **complex numbers** are a set of numbers that emerge when we assume that there is a number $i$ such that 

$$
i \times i = -1 \p
$$

With the numbers that we learn in school we cannot solve this puzzle. Any positive number mulitplied by itself yields a positive number and any negative number multiplied by itself yields a positive number. Zero multiplied by itself yields zero, and that's all the numbers we are usually told about in school.

But, if we carefully check how numbers are constructed, we see that we can often solve such puzzles just by assuming that the solution exists. We just assume that the number $i$ exists, and we see what the consequences are. If we carefully investigate, and find no contradictions, we may end up with a new set of numbers.

In this case, such an investigation leads to the complex numbers, written as $\mathbb C \p$  If we take $i$ to be a number that exists and that we can multiply by real numbers and add to real numbers, then the complex numbers are defined as any number that can be written as 

$$
\bc{r} + \rc{c}i
$$

where $\bc{r}$ and $\rc{c}$ are real numbers. 

To give you a hint of the most important ideas coming, up, we can start with how the complex numbers are usually visualized. Where the real numbers are often visualized as lying on a line, the complex numbers are often visualized as lying in a plane, called the **complex plane**. 

<figure class="half center">
<img src="/images/complex-numbers/complex-plane.svg">
</figure>

All operations like addition and multiplication that are defined for real numbers are also defined for complex numbers.  

In the real number line, the operation of addition is represented by shifting a number to the left or right. In the complex plane, it's defined as shifting a number to the left or right, or up or down, or any combination of these.

Multiplication in the real line can be visualized as strething the line out. In the complex plane multiplication is defined as a combination of stretching the plane and rotating it. 

<aside>This is all explained in detail below.</aside>

Because the idea of _rotation_ comes up so naturally in complex numbers, they are often very useful in domains where _angles_ are important. Fior instance, angles are intimately related to the sines and cosines we use to define functions that look like waves. Waves describe sound, so complex numbers are used in acoustics. Waves are a basic building block of quantum mechanics, so waves are fundamental to the definitions there.

In short, complex numbers are not as intuitive as the more familiar real numbers, but with the right perspective they are actually more natural than they seem at first.

## A cartoon history

<aside markdown="1">To build some intuition for the idea of complex numbers, we will take an informal (and possibly not fully historically correct) look at how they developed. The aim is to make the idea feel more "natural". This section can be skipped if you're in a hurry.
</aside>

Complex numbers spring from the idea that there exists a number $i$ for which $i \times i$ is $-1$. We don't know of any such number, but we simply assume that it exists, and investigate the consequences. For many people this is the point where mathematics becomes too abstract and they tune out. The idea that squares can be negative clashes too much with our intuition for what squares are. The idea that we just pretend that they can be negative and keep going, seems almost perverse.

And yet, this approach is one that humanity has followed again and again in the study of numbers. If you step back a bit, you start to see that it is actually one of the most logical and uncontroversial things to do. 

The study of numbers started somewhere before recorded history, in or before the late stone age, when early humans began counting things in earnest, and they learned to add. I have five apples, I steal three apples from you, now I have eight apples. That sort of thing.

At some point, these early humans will have solidified their concept of "numbers". It is a set of concepts (whose meaning we understand intuitively) which starts $1, 2, 3, \ldots$ and continues. If you add one number to another, you always get another number.  If the number was big, they may not have had a name for it, but a patient paleolithic human with enough time could certainly have carved the required number of tally marks into an animal bone.

The operation of addition can also be reversed. If $5 + 3$ gives $8$, then taking $5$ away from $8$ gives $3$. If I steal $5$ apples from your collection of $8$, you still have $3$ left. Thus, subtraction was born. But subtraction, the _inverse_ of addition, required some care. Where adding two numbers always yielded a new number, subtracting two numbers doesn't always yield a new number. You can't have $5 - 8$ apples, because if you have $5$ apples I can't steal more than $5$ of them.

As societies grew more complicated, financial systems developed and debt became an integral part of daily life. At some point, the following tought experiment was considered. What if $5-8$ is a number after all? We'll just give it a name and see if it makes sense to compute with it. No doubt many people were outraged by such a suggestion, protesting that it was unnatural, and an insult to whatever God they believed had designed the numbers. But simple investigation showed that if these numbers were assumed to exist, they followed simple rules and, it made sense to think of them as a kind of mirror image of the natural numbers, extending to infinity in the opposite direction. $5 - 8$ was the mirror image of $3$, so it made sense to call it "$-3$".

The skeptics might argue that this made no sense, because there is no such thing as having $-3$ apples, but the mathematicians will have countered that in other areas, such as finance, there were concepts that could be expressed very beautifully by the negative numbers. If I owe you $3$ apples, because of my earlier theft, and you steal 8 apples from me, I now owe you $-5$ apples, or rather you owe me $5$.

The same principle can be applied to multiplication. If your tribe has $8$ families, and every family is entitled to $5$ apples, you need to find $8 \times 5$ apples. Again, an operator, and any two numbers you care to multiply will give you a new number (even if you believe in negative numbers).

And again, you can do the opposite: if the harvest has yielded $48$ apples, you can work out that every family in your tribe gets $6$ of them. But again, you have to be careful about which numbers you apply the inverse to. Sometimes you get a known number, and sometimes you don't. If you have 50 apples, suddenly there is no known number that is the result of $50/8$.

But what if there was? What if we just gave $50/8$ a name and started investigating? We'd find out pretty quickly that it would make sense to think of these numbers as lying _in between_ the integers. We call these the _rational_ numbers. Whoever it was that invented the rationals must have run into less resistance than the inventor of the negative numbers; it's much easier to imagine half an apple than to imagine $-3$ of them.

The pattern is hopefully becoming clear. Let's have one more example, to really drive the point home, and also to bring us far enough into recorded history so we can actually see how people dealt with these revelations. If adding is repeated counting, and multiplication is repeated adding, then raising to a power, repeated multiplication, is the next step in the hierarchy. 

The story should be familiar at this point. Any two natural numbers $a$ and $b$ can be "exponentiated" together as $a^b$ and the result is another natural number.

The inverse operation is a b-th root, but we can stick with square roots to illustrate our point. In fact the square root of 2, the length of the diagonal of a unit square, is all we need. In this case, there is nothing abstract or perverse about the quantity $\sqrt 2$: it's the distance from one corner to the opposite in a square room with sides of 1 meter.

<figure class="centering">
<img src="/images/complex-numbers/sqrt2.svg" class="tile4"/>
<figcaption>
</figcaption>
</figure>

And yet, when people investigated, it caused great upset.

The man who gave his name to the theorem we would use to work out the above picture, Pythagoras, was the head of a cult. A cult dedicated to mathematics. They lived ascetically, much like monks would, centuries later, and dedicated themselves to the study of nature in terms of mathematics. When asked what the purpose of man was, Pythagoras answered "to observe the heavens." One fervent belief of the Pythagoreans was that number and geometry were inseperable: all geometric quantities could be expressed by (known) numbers.

The story of the Pythagoreans is a mathematical tragedy. It was one of their own, commonly identified as Hippasus of Metapontum, who showed that no rational number corresponded exactly to $\sqrt{2}$. Some aspects of geometry were outside the reach of the known numbers. According to legend, he was out at sea when he discovered this, and was promptly thrown overboard by the other Pythagoreans.

Of course, with the benefit of hindsight, we know how to manage such upsetting discoveries. We simply give the new number a name, "$\sqrt{2}$", and see if there's some place among the numbers where it makes sense to put it. In this case, somewhere between $141/100$ and $142/100$, in a space we can make infinitely small by choosing better and better rational approximations.

With this historical pattern clearly highlighted, the discovery of the complex numbers should be almost obvious. In fact, we don't even need a new operation to invert, we are still looking at square roots, but instead of applying the square root to positive integers, we apply it to _negative integers_. To take the simplest example, we'll look at  $\sqrt{-1}$. No number we know gives $-1$ when we square it, so our first instinct is to dismiss the operation. The square root is only allowed for a subset of the real-valued numbers. Just like subraction was only allowed for a subest of the natural numbers, and division was only allowed for a subset of the integers.

But, what if the number $\sqrt{-1}$ did exist? What would the consequences be?

As the previous paragraphs should illustrate, this kind of investigation is usually born out of necessity. Like a fussy child given a new food, people are consistently reluctant to accept new types of numbers. In this case, what pushed us over the edge was the study of polynomials; functions of the form: 

$$f(x) = \bc{a}x^3 + \bc{b}x^2 + \bc{c}x + \bc{d}$$ 

where the highest exponent in the sum indicates the _order_ of the polynomial.

The problem of finding the _roots_ of a polynomial, the values of $x$ for which $f(x)$ is equal to $0$ crops up in all sorts of practical problems. In some cases, this leads to squares of negative numbers, as we see when we try to solve $x^2 + 1 = 0$. This didn't worry anybody, of course, since this function lies entirely above the horizontal axis, so it's only natural that solving for the roots leads to a contradiction. 

<figure class="half center">
<img src="/images/complex-numbers/polynomials.svg">
<figcaption>The function $f(x) = x^2 + 1$ has no roots. This makes total sense, since it doesn't cross the horizontal axis.
</figcaption>
</figure>

However, when people started to work out general methods for finding the roots of _third_ order polynomials, like $x^3 - 15x - 4$, which _does_ have roots, it was found that the methods worked if one temporarily accepted $\sqrt{-1}$ as an intermediate value, which later canceled out. This is where the phrase _imaginary_ number originates. People (Descartes, to be precise) were not ready to accept these as numbers, but no one could deny their utility.

Eventually, people followed the pattern that they had followed centuries before for the integers, the rationals and all their successors. We give the new number a name, $i = \sqrt{-1}$, and we see if there's any way to relate it, geometrically, to the numbers we know.

## Operations

So, to recap, we ask the question, for what number $i$ does 

$$
i \times i = -1
$$

hold? We assume that this number exists, and that the basic rules of algebra apply to it. Let's see what we can conclude.

We'll start with addition. What happens if we add $i$ to some real number, say $3$? The simple answer is that nothing much happens. The most we can say about the new number is that it is $3 + i$. 

Multiplication then. Again $2i$ doesn't simplify in any meaningful way, so we'll just call the new number $2i$. What if we combine the two? With a few subtleties, we can rely on the basic rules of algebra to let us multiply out brackets and add things together. So, if we start with $i$, add 3 and then multiply by 2, we get:

$$\begin{align}
2(i + 3) = 2\cdot3 + 2\cdot i = \bc{6} + \rc{2}i 
\end{align}$$

Here is a very common result: we've applied a bunch of operations, involving the imaginary number $i$, and the result can be written as the combination of a real value $\bc{r}$, another real value $\rc{c}$ and $i$ as:

$$
\bc{r} + \rc{c}i \p
$$

Let's call any number that can be written in this way a _complex number_. The set of all complex numbers is written as $\mathbb C$. At this point you may be worried. What if we come up with another operation that is not defined for all complex numbers? Are we going to have to make another jump? Are we going to find ever bigger families of numbers to deal with? It turns out that in many ways, $\mathbb C$ is the end of the line. So long as we stick to algebraic operations, we can do whatever we like to complex numbers, and the result will always be well defined as another complex number.

To illustrate, let's show this for a few simple examples. Lets say we have two complex numbers $\gc{a} + \gc{b}i$ and $\oc{c} + \oc{d}i$. If we add them, we get

$$(\gc{a} + \gc{b}i) + (\oc{c} + \oc{d}i) = \gc{a} + \oc{c} + \gc{b}i + \oc{d}i = \bc{(a + c)} + \rc{(b + d)}i
$$

If we multiply them, we get

$$\begin{align}
(\gc{a} + \gc{b}i)(\oc{c} + \oc{d}i) &= \gc{a}\oc{c} + \gc{a}\oc{d}i + \gc{b}i\oc{c} + \gc{b}i\oc{d}i \\
&= (\gc{a}\oc{d} + \gc{b}\oc{d}\kc{i^2}) + (\gc{a}\oc{d} + \gc{b}\oc{c})i \\
&= \bc{ad - bd} + \rc{(ad + bc)}i \p
\end{align}$$

That is, one <span class="bc">real-valued number</span>, added to $i$ times another <span class="rc">real-valued number</span>. Note that in the second line, we can use $i^2 = -1$, because we know that $i = \sqrt{-1}$. In short, multiplying or adding any two complex numbers together gives us another complex number. 

Because each complex number can be written as the combination of two real valued numbers, it makes sense to visualize them as lying in a plane. We plot the value of the <span class="bc">real term</span> along the horizontal axis and the value of the <span class="rc">imaginary term</span> along the vertical. 

<figure class="half center">
<img src="/images/complex-numbers/complex-plane.svg">
</figure>

The real-valued numbers that we already knew are a subset of the complex numbers: those complex number for which the <span class="rc">imaginary part</span> is zero. In this picture, the real-valued numbers are on the <span class="bc">horizontal axis</span>.

Note that this is just a visualization. There is nothing _inherently_ two-dimensional about the complex numbers, except that there is a very natural mapping from $\mathbb C$ to $\mathbb R^2$. At heart, it's just a set of numbers with a bunch of operations defined for them.

The nice thing about the mapping to the plane, however, is that we can take operations like multiplication, addition and so on, and see what they look like in the plane. This way, we can build a very helpful visual intuition for how the complex numbers behave.

Let's look at the most important concepts we'll need going forward. For addition, we can build on our existing intuitions. Adding two complex numbers works the same as adding two vectors in the plane: we place the tail of one on the head of the other.

<figure class="half center">
<img src="/images/complex-numbers/addition.svg">
</figure>

The same logic shows that subtraction of complex numbers behaves as you'd expect. To compute $x - y$, we subtract the real part of $x$ from the real part of $y$ and likewise for the imaginary part. Geometrically, this corresponds to vector subtraction in the plane.

To see what multiplication looks like, we can switch to a different way of representing complex numbers. Instead of giving the Cartesian coordinates $(\bc{r}, \rc{c})$ that lead to the number $z = \bc{r} + \rc{c}i$, we use the _polar_ coordinates. We give an angle $\gc{a}$ from horizontal axis and a distance $\gc{m}$ from the origin. The angle is also called the _phase_ and the distance is called the _magnitude_ or the _modulus_. When we write a number like this, we'll use the notation $z = \gc{m}\angle \gc{a}$. To refer to the magnitude of a complex number $z$, which we'll be doing a lot, we use the notation <span>$|z|$</span>.

<figure class="half center">
<img src="/images/complex-numbers/polar.svg">
</figure>

<!-- 
<aside>This notation is not common, since there is a more elegant way to do it with powers of $e$, if you get a little deeper into complex numbers. For this post, we'll keep things simple and stick to the angle notation.
</aside>
 -->
 We call this representation of a complex number _polar notation_, and the earlier representation _Cartesian notation_.

The reason polar notation is so useful, is that multiplication looks very natural in it. To see the relation, assume that we have a number $z = \gc{m}\angle \gc{a}$. Then basic trigonometry tells us that in Cartesian notation, this number is written as $z = \bc{\gc{m}\co(\gc{a})} + \rc{\gc{m} \si(\gc{a})} i$. Let's see what happens if we take two numbers, in polar notation, and multiply them:

<p>$$\begin{align*}
 & (\gc{m} \angle \gc{a})(\oc{n} \angle \oc{b})& \\
 
 &= (\gc{m}\co(\gc{a}) + \gc{m} \si(\gc{a}) i)(\oc{n}\co(\oc{b}) + \oc{n}\si(\oc{b}) i) \\
 
 &= \gc{m}\co \gc{a} \;\oc{n} \co \oc{b} + \gc{m} \si \gc{a}\; \oc{n} \si \oc{b} + (\gc{m} \co \gc{a} \;\oc{n} \si \oc{b}  + \oc{n}\co \oc{b}\; \gc{m} \si \gc{a})i \\
 
  &= \gc{m}\oc{n} (\co \gc{a} \co \oc{b} - \si \gc{a} \si \oc{b}) + \gc{m}\oc{n} (\co \gc{a} \si \oc{b} + \co \oc{b} \si \gc{a})i  \\
  
  &= \gc{m}\oc{n} \co(\gc{a} + \oc{b}) + \gc{m}\oc{n} \si(\gc{a} + \oc{b})i  \\
  &= (\gc{m}\oc{n}) \angle (\gc{a}+ \oc{b})
\end{align*}$$</p>

In the third line, we apply the multiplication in Cartesian notation that we already worked out earlier. Then, in the fifth line, we apply some basic <a href="https://en.wikipedia.org/wiki/List_of_trigonometric_identities#Angle_sum_and_difference_identities">trigonometric sum/difference identities</a>. 

What this tells us, is that when we view complex numbers in polar coordinates, multiplication has a very natural interpretation: the angle of the result is the _sum_ of the two original angles, while the magnitude of the result is the _product_ of the two original magnitudes.

<figure class="half center">
<img src="/images/complex-numbers/multiplication.svg">
</figure>


The easiest way to define division is as the operation that _cancels out_ multipliciation. For each $z$, there should be a $z^{-1}$ so that multiplying by $z$ and then by $z^{-1}$ brings you back to where you were. Put simply $zz^{-1} = 1$. Dividing by $z$ can then be defined as multiplying by $z^{-1}$. Using the polar notation, we can see that this definition of $z^{-1}$ does the trick:

$$z^{-1} = (\gc{m}\angle \gc{a})^{-1} = \frac{1}{\gc{m}}\angle -\gc{a} \p $$

Note how this view of multiplication agrees with special cases that we already know. For real numbers, the angle is always $0$, and the magnitude is equal to the real value. Therefore, multiplying real numbers together reduces to the multiplication we already knew. 

The number $i$ is written as $1\angle90\deg$ in polar coordinates. That means that multiplying a number $z$ by $i$ keeps the magnitude of $z$ the same, but rotates it by $90$ degrees counter-clockwise. A real number multiplied by $i$ is rotated from the <span class="bc">horizontal</span> to the <span class="rc">vertical</span> axis. If we multiply by $i$ twice, we rotate $180$ degrees, which for real numbers means negating them. This makes sense too, because $z \cdot i \cdot i = z i^2 = z \cdot -1$.

Which brings us to exponentiation. Raising complex numbers to arbitrary values, including to complex ones, is an important topic, but one which we can sidestep here. All we will need is the ability to raise a complex number to a natural number. That follows very naturally from multiplication:

$$
(\gc{m} \angle \gc{a})^n = (\gc{m} \angle \gc{a})(\gc{m} \angle \gc{a}) \ldots (\gc{m} \angle \gc{a}) = \gc{m}^n \angle n\gc{a} \p
$$

Again, let's look at some special cases. If the angle is $0$, we stay on the real number line, and the operation reduces to ordinary exponentiation. If the magnitude is $1$ but the angle is nonzero, then we just rotate about the origin over the unit circle in $n$ steps of angle $a$.

<figure class="half center">
<img src="/images/complex-numbers/exponentiation.svg">
<figcaption>Exponentiation with unit magnitude.
</figcaption>
</figure>

The main thing we need, however, is not integer exponentiation, but its inverse: the $n$-th root. Given some complex number $z = m\angle a$, which other number do we raise to the power $n$ so that we end up at $z$? The answer follows directly from our polar view of the complex plane: the magnitude should be $\sqrt[n]{m}$, which is just the real-valued $n$-th root, and the angle should be $a/n$.

Let's check for $\sqrt{-1}$, which started all this business. Which number should we raise to the power 2, so that we get $-1$? The magnitude of $-1$ is $1$, so our number has magnitude $\sqrt{1} = 1$. Now we need a number with magnitude one, so that twice its angle equals $180 \deg$. This is a $90\deg$ angle, so our number is $1\angle 90\deg$, which is exactly where we find $i$.

Notice how this solves the problem we had when we were constrained to the real line. Then we had negative numbers to deal with, and the real $n$-th root does not exist for negative numbers. Now, we are only ever applying the $n$-th root to _magnitudes_, which are positive. The rest is dealt with by rotating away from the real numbers. This means that when it comes to complex numbers, we can always find some number that, when raised to $n$ gives us $z$. We call this the complex $n$-th root $\sqrt[n]{z}$.

Note however, that this is not always a _unique_ number. Let's say we raise $1\angle 10\deg$ to the power of $4$. This gives us $1\angle 40\deg$, so $1\angle 10\deg$ is a fourth root of $1\angle 40\deg$. However, if we raise $1\angle 92.5\deg$ to the power of $4$, we get $1\angle 370\deg$, which is equal to $1\angle 10\deg$ as well. Any angle $a'$ for which $a'\frac{1}{n}\,\text{mod}\;360 = a$ will give us an $n$-th root of $m\angle a$. 

How many solutions does this give us for any given number? It's easiest to visualize this if we plot the $n$-th roots of 1.

<figure class="narrow">
<img src="/images/complex-numbers/nth-roots.svg">
</figure>

For each, of course, the real value $1$ is a solution, but for the higher powers, there are additional solutions on the unit circle. For $\sqrt{1}$, for instance, multiplying $-1$ by itself rotates it buy 180 degrees to coincide with $1$. For $\sqrt[3]{1}$, we get three roots, two of which non-real. The solution with angle $120\deg$, when raised to the power of $3$ gives us an angle of $360\deg = 0\deg$. The solution with angle $240\deg$ puts the angle after cubing at $720 \deg = 0 \deg$. 

In short, every multiple of $360$: $0$, $360$, $720$, $1080$, $\ldots$, can be divided by $n$ to give us a solution. Once we get to $360n$, dividing by $n$ gets us back to a solution we've already seen, so we get $n$ unique solutions in total.

To translate this to roots of any complex number $m\angle a$, we simply scale the circle so that its radius is $\sqrt[n]{m}$ and then rotate it so that the first solution points in the direction of $a/n$.

<figure class="narrow">
<img src="/images/complex-numbers/general-root.svg">
</figure>
