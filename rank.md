---

Title: Matrix rank

---

# Matrix rank

## Summary

The *rank* is a number that expresses a fundamental property of a matrix. 

It's difficult to give much intuition before the technical details, bu one interpretation is that a matrix with low rank can also be represented more simply, for instance by multiple smaller matrices, whereas a matrix that has the largest possible rank cannot easily be represented in a simpler way.

In short, low-rank matrices contain _redundant information_.

<aside>All this holds only with reference to very specific ways of representing matrices. We'll detail this below.</aside>

## Preliminaries: linear independence

To define rank, we'll first need the definition of a **linear combination**. If we have three vectors $\a$, $\b$ and $\c$ then the vector $3\a + 2\b - \c$ is a linear combination of the three. More generally, a linear combination of a set of vectors is any vector that can be created by multiply each vector by a scalar and summing them up. In the example above example the scalars were $3$, $2$ and $-1$.

<aside>The set of all linear combinations of some set of vectors is the space spanned by those vectors. For instance, two vectors that don't point in the same direction span a plane: every vector in the plane can be written as the linear combination of the two. See <a href="">bases and spans</a> for more information. 
</aside>

A set of vectors is called **linearly independent** if none of the vectors is a linear combination of the rest. This basically means that the vectors describe the space they span without redundancy. We cannot remove a vector and retain the same span.

## Definition

We'll first define two pretty straightforward concepts called the **column rank** and **row rank** of a matrix. We'll then show that, surprisingly, these are always the same, so we can just refer to the **rank** of a matrix.

Let $\bc{\M}$ be a matrix with $n$ rows and $m$ columns. If its columns are linearly independent, we say that it has rank $n$, or that it has _full column rank_. 

<aside>Essentially this means that the space spanned by the columns of $\bc{\M}$ has dimension $n$.</aside>

If $\bc{\M}$ _isn't_ full rank, it means that we can remove some of its columns without reducing the space spaned by them. The smallest number of vectors that can be used to span this space, its dimension, is the column rank of $\bc{\M}$.

One way to think of this is to find columns of $\bc{\M}$ that are linearly combinations of the other, and removing them, one by one. The number of columns you end up with is the column rank of $\bc{\M}$. 

<aside>It's easy to show that the result must always be the same, no matter the order in which you remove the columns. An explanation is in the appendix.
</aside>

The row rank is defined in exactly the same way, but for the rows of the matrix. If its rows are linearly independent, then it has rank $m$, or full row rank. If they aren't, then it's row rank is determined by the smaller number of vectors required to span the space spanned by its rows.

To summarize: if a matrix has column rank of $3$, then there are three column vectors $\a$, $\b$, and $\c$, so that every other column can be expressed as $a\a + b\b +c \c$ with some numbers $a, b, c$. The column rank of a matrix is the smallest number of columns $n$ that it can be "compressed" to in this way, and likewise for the row-rank.

### Equivalence of column and row rank

It's helpful to draw such a compression in a matrix multiplication diagram. Let's assume we have a large rectangular matrix $\gc{\M}$ with dimensions $n \times m$ and let's assume that it has column rank $3$. This means that we can pick three of its columns $\a$, $\b$ and $\c$ and represent all other columns by a set of just three numbers $a$, $b$ and $c$. 

Before we draw the diagram, note that $\a$, $\b$ and $\c$ don't actually _have_ to be columns of $\gc{\M}$. We could, for instance, scale them to unit vectors, and we could still represent all columns of $\gc{\M}$ as linear combinations. The key point is that we can express all column vectors of $\gc{\M}$ in a _basis_ of three vectors. They are all points in a 3D subspace of $\mR^n$.

Now, to our diagram. Put the three basis vectors $\a$, $\b$ and $\c$ side by side in a matrix $\bc{\B}$ of $n \times 3$. For a given column of $\gc{\M}$, we can work out what $\rc{a}$, $\rc{b}$ and $\rc{c}$ should be and put these together in a column vector $\rc{\d}$. Multiplying $\bc{\B}\rc{\d}$ gives us the linear combination $\rc{a}\a + \rc{b}\b + \rc{c}\c$, and thus reconstructs our column vector of $\gc{\M}$. If we work out all the vectors $\rc{\d}$ for all columns of $\gc{\M}$ and concatenate them as the columns of a big $3 \times m$ matrix $\rc{\D}$, then multiplying $\bc{\B}\rc{\D}$ reconstructs all columns of $\gc{\M}$. Or, put simply, $\gc{\M} = \bc{\B}\rc{\D}$.

- diagram.

<aside>This is called a <em>rank decomposition</em> of $\gc{\M}$.</aside>

Looking at this diagram, we can directly deduce one of the more magical facts of linear algebra. Imagine if we were to follow the same recipe for the row rank. We don't know the row rank, so let's call it $k$. If the row rank is $k$, there will be $k$ rows that can serve as a basis for all rows. We concatenate them into a $k \times m$ matrix $\bc{\B}'$ and work out the row vectors $\rc{\d}'$ for each row of $\gc{\M}$. Concatenating these into a matrix $\rc{\D}'$ of $n \times k$, we get $\rc{\D}'\bc{\B}' = \gc{\M}$. In other words, we get exactly the same diagram, but with the roles reversed. 

- diagram

This means that in the second diagram, we can also interpret $\rc{\D}'$ as representing $k$ column vectors and $\bc{\B}'$ as representing the scalars required to reconstruct the columns of $\gc{\M}$. And from this we can deduce directly what $k$ should be. Since $3$ is the column rank of $\gc{\M}$, it can't be less than $3$ or we would have found a representation of $\gc{\M}$ in fewer columns (and the rank is the lowest number of columsn possible). It also can't be more than $3$, because then we could go the other way around, start with the diagram for the column rank, interpret it a row rank, and we'd find a representation with fewer rows than $k$, even though $k$ is the row rank. So $k$ must be $3$.

In general, this argument shows us that the column and the row rank of any matrix _must_ be equal. We can thus drop the qualifier, and just refer to the matrix's _rank_. We can also conclude that the maximum value of the rank is $\text{min}(n, m)$. The column rank cannot exceed the number of columns, and the row rank cannot exceed the number of rows, so the minimum of these two must be the matrix rank. 

A matrix with rank equal to $\text{min}(m, n)$ is called _full rank_. A matrix that isn't full rank is called _rank deficient_.

## Examples

## Rank and invertibility

## Rank and the Singular Value decomposition

## Appendix

### Removing columns one by one.

Imagine you have a matrix $\bc{\M}$ with linearly dependent columns
