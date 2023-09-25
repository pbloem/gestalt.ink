---
Title: Quadratics in linear algebra
---

# Quadratics in linear algebra

<div class="prel">preliminaries:</div>
* [Linear algebra](linear-algebra)

<div class="prel">status:</div>
* work in progress

A **quadratic** or **quadratic function** is a [polynomial](polynomial) whose highest-order term is a square. For instance $f(x) = 3x^2 + x -3$ is a quadratic.

Quadratics of more than one variable are polynomial functions in which each term is the product of at most two of the inputs, possibly the same input twice. For instance, in the quadratic

$f(x, y) =\kc{2}xy + \kc{3}x^2 - \kc{4}y^2 + \kc{3}x + \kc{8}$

the first term contains the product of both inputs, and the second and third term contain one of the inputs twice. 

Quadratics are of particular interest in linear algebra, because they can be modeled by a matrix. We already know how a linear function of multiple variables can be modeled by a matrix $\bc{\A}$. We combine the inputs into a vector $\x$ and compute $\bc{\A}\x$ giving us a vector of all the output variables.

In the case of a quadratic function, we create $\x$ in the same way, and we require $\bc{\A}$ to be a square matrix. We then compute the value

$\x^T\bc{\A}\x \p$

This may look a little mysterious, but it's just a concise way of writing second-order polynomials in multiple variables. For instance,

<p>$$
\x^T\begin{pmatrix}\rc{2}& \bc{3}\\ \gc{4}& \oc{5} \end{pmatrix}\x = \rc{2}{x_1}^2 + \bc{3}x_2 x_1  + \gc{4} x_1x_2 + \oc{5}{x_2}^2 \p
$$</p>

Note the following about this definition:
* While $\bc{\A}\x$ describes a linear function with multiples inputs and outputs, $\x^T\bc{\A}\x$ can only describe a function from multiple inputs to a single scalar output.

We are used to thinking about the _operation of a matrix_ on a vector. How does the quadratic form relate to this operation? One way to think about it is to realize that the quadratic form is the [dot product](dot-product) of the input of this operation $\x$, with the output $\bc{\A}\x$. 

One thing the dot product measures is how much two vectors point in the same direction. If a vector $\x$ leads to a low value for the quadratic $\x^T\bc{\A}\x$, then it may be because $\bc{\A}$ rotates it to poin t in a different direction. 

<aside>Another option is that the magnitude is changed: the dot product is the product of the angle between the two vectors and their magnitudes. If $\bc{\A}$ keeps the direction intact, but shrinks the magnitude, the quadratic form will also be low.</aside>

To help you understanding, consider the following quadratic forms
* What does the quadratic form of the identity matrix compute? Which vectors give largevalues, and which give small?
* What does the quadratic form of a diagonal matrix look like if you write out an an explicit polynomial of all the scalar inputs?

# Visualization: the unit circle

...

# Ellipses and matrix square roots

...