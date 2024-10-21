---
title: Diagonal matrics
---

# Diagonal matrix

A **diagonal matrix** is a matrix with non-zero values only on the diagonal. For example

$$
\begin{pmatrix} 
\gc{1} & \kc{0} & \kc{0} \\
\kc{0} & \gc{2} & \kc{0} \\
\kc{0} & \kc{0} & \gc{3} \\
\end{pmatrix}
\p
$$

The term "diagonal matrix" usually refers to a square matrix, but it can also be used to refer to a non-suqare matrix. The matrix will then have some columns or rows that consist of only zeros. For example:

$$
\begin{pmatrix} 
\gc{1} & \kc{0} & \kc{0} & \kc{0} \\
\kc{0} & \gc{2} & \kc{0} & \kc{0} \\
\kc{0} & \kc{0} & \gc{3} & \kc{0} \\
\end{pmatrix}
\text{ or}
\begin{pmatrix} 
\gc{1} & \kc{0} & \kc{0} \\
\kc{0} & \gc{2} & \kc{0} \\
\kc{0} & \kc{0} & \gc{3} \\
\kc{0} & \kc{0} & \kc{0} \\
\end{pmatrix}
\p
$$

Square diagonal matrices are a useful concept for many reason. This is primarily because their behavior is simple to understand. For example

* Multiplying a square diagonal matrix $\gc{\D}$ by a vector $\x$ is equivalent to multiplys each element $x_i$ of $\x$ by the scalar $\gc{D}_{ii}$
* Geometrically, this corresponds to the operation of stretching along the $i$-th axis by a factor of $\gc{D}_{ii}$.
* The [eigenvalues](./eigenvalues) of a geometric matrix are equal to the values on the diagonal.

## $\text{diag}(\cdot)$

The operator $\text{diag}(\cdot)$ is used to construct a diagonal matrix, or to read the diagonal from a matrix, depending on whether the argument is a vector or a matrix.

If the argument is a matrix $\bc{\A}$ (diagonal or otherwise), then $\text{diag}(\bc{\A})$ refers to the vector $\bc{\a}$ for which the $i$-th element is the element $\bc{A}_{ii}$ of the matrix. That is, the operator slices the diagonal out of the matrix and returns the result as a vector 

<p>$$[\text{diag}(\bc{\A})]_i = \bc{A}_{ii} \p$$</p>

If the argument is a vector $\bc{\a}$, say of dimension $n$ then $\text{diag}(\bc{\a})$ refers to the diagonal $n \times n$ matrix with the elements of $\bc{\a}$ along the diagonal.

<p>$$[\text{diag}(\bc{\a})]_{ii} = \bc{a}_{i} \p$$</p>
