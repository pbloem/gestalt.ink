---
title: Dirac delta
---

status: stub

# Dirac delta

The **Dirac delta** is a function (of sorts) that helps us---amond other things---to define a constant probability distribution in the language of probability densities. The simplest way to think about it is as a limit: take a [Gaussian](gaussians) distribution in one dimension and shrink the variance to 0. 

As the variance gets closer and closer to zero, you get a taller and taller peak, centering all the probabilitly mass closer and closer to a single point. The "distribution" that this process converges to is the Dirac delta. A density function that is zero everywhere and $\infty$ at a single point.

The Dirac delta can be hard to work with. If you need it, an alternative is to use a Gaussian with some small variance $\bc{\sigma}$, and then to take the limit as $\bc{\sigma} \to 0$. 