---

Title: Eigenvectors and eigenvalues

---

<h1>Eigenvectors and eigenvalues</h1>

<ul class="dep">
<li>Basics of linear algebra</li>
<li>Matrix multiplication</li>
</ul>
## Summary 

Let $\bc{\A}$ be a _square_ matrix. Multiplying a vector $\rc{\v}$ by $\bc{\A}$ results in another vector. If this vector points in the same direction as $\rc{\v}$, then we call $\rc{\v}$ an **eigenvector of $\bc{\A}$**.

As a simple visualization of eigenvectors, imagine yourself standing up, and turning about your vertical axis. While you do so point your <span class="rc">right arm</span> straight up, and your <span class="gc">left arm</span> forward. The rotation can be described by a $3 \times 3$ matrix. Your <span class="rc">right arm</span> doesn't change direction as you rotate, so that's an **eigenvector of the rotation**. Your <span class="gc">left arm</span> does change direction, so that's not an eigenvector.

## Definition

We require that $\rc{\v}$ be a nonzero vector. For $\rc{\v}$ to be an eigenvector of $\bc{\A}$, its length can change when we mulitply it by $\bc{\A}$, but its direction can't. Another way of saying this is that multiplying $\bc{\A}$ by $\rc{\v}$ is the same as _scaling_ the vector $\rc{\v}$ by some scalar, say $\bc{\lambda}$. This means we can define eigenvectors as follows. The vector $\rc{\v}$ is an eigenvector of $\bc{\A}$ if (and only if):

$$\bc{\A}\rc{\v} = \bc{\lambda}\rc{\v}
$$

where $\bc{\lambda}$ is some scalar. If $\rc{\v}$ is an eigenvector, then the corresponding scalar $\bc{\lambda}$ is its eigenvalue.

<aside>To multiply a scalar by a vector, we just multiply the scalar by each element of the vector. The effect is that the vector stretches or shrinks, but keeps pointing in the same direction.
</aside>

Note the following details about this definition:

* The vector containing all zeros always satifies the definition, but is never considered an eigenvector. The scalar $0$ can be an eigen_value_. Consider, for instance, an identity  matrix with a zeroed-out column.
* The eigenvalue can be negative.
* Not all matrices have eigenvectors. Consider for instance, a rotation matrix.
* If $\rc{\v}$ is an eigenvector, then $\rc{\v}$ multiplied by any number except 0 is also an eigenvector.
* For some matrices, all vectors are eigenvalues. Consider, for instance, the identity matrices. For other matrices, all vectors in a particular subspace are vectors. We'll learn how to characterize these situations later.


## Geometric intuition

From the definition, it's not easy to see why eigenvectors and eigenvalues are such an important concept. To understand that properly, we'll need to explore some places where the concept pops up.