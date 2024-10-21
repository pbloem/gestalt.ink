---
title: Gram matrix
---

status: stub

# Gram matrix

The **Gram matrix** of a matrix $\gc{\M}$ is the matrix

$$
\gc{\M}^T\gc{\M} \p
$$

This is very common matrix. It is, for example, used to express the coavarance of a distribution, or the sample covariance of a dataset.

The Gram matrix is guaranteed to be positive semi-definite. If the columns of $\gc{\M}$ are linearly independent, then the Gram matrix is positive definite, and therefore invertible. If the columns are not linealy independent, the Gram matrix is singular.