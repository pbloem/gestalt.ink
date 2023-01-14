---
title: matrix multiplication

---

# Matrix multiplication

## Summary

A **matrix multiplication** is an operation that takes two matrices $\rc{\A}$ and $\gc{\B}$ as input, and results in another matrix $\bc{\C}$. 

$$
\rc{\A}\gc{\B} = \bc{\B}
$$

To compute element $i, j$ of $\bc{\C}$, we take every row of $\rc{\A}$ and every column of $\gc{\B}$, we element-wise multiply them and sum the result together. Here is an illustration:

-- im

This requires that 
* The rows of $\rc{\A}$ are as wide as the columns of $\gc{\B}$ are tall
* $\bc{\C}$ is as tall as $\rc{\A}$ and as wide as $\gc{\B}$.

If these two conditions aren't met, we cannot multiply $\rc{\A}$ by $\gc{\B}$ to produce $\bc{C}$. 


## Perspectives

- Every element is a dot product.

- The whole matrix is a sum of outer products.

- Distributing over matrix concatenation.
- 
## Commutativity