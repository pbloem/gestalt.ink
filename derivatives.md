---
title: Derivatives
---

# Derivatives

## Summary

Derivatives are a way to talk about how quickly the value of a function changes for different input values. For instance, if we look at the function

$$
\bc{x}^2
$$

near the input value $\bc{x}=0$, the output changes very slowly. A small change like adding $\oc{0.1}$, results in a change to the output of $0.01$. However, at $\bc{x} = 10$, the same change of adding $\oc{0.1}$ results in an output of $(10+ \oc{0.1})^2 \kc{ = 100 + 2\cdot10\cdot0.01 + 0.001 = }102.01$, a difference of 2.01. 

The derivative captures this rate of change: we divide how much the output changes by  <span class="oc">how much we changed the input</span>. The result is the change in output _proportional to the change in the input_.

To make this quantity independent of the exact change to the input, we make the amount we add smaller and smaller, and study what the derivative converges to. This can be done precisely using the language of [limits](/limits).

Derivatives have many, many applications. The most every-day use is probably in the definition of _speed_: speed is defined as the amount of change to your position, divided by an amount of change in time. Hence, _kilometers per hour_, the amount of kilometers you moved, divided by the number of hours you were moving for. Note that we usually talk about the speed _at a single moment_. To do this we make the difference in time as small as we can (a tiny fraction of an hour) and measure the distance traveled in that small amount of time. The resulting speed in kilometers per hour tells you how far you would move, if you kept moving at that speed for an hour.

Another place where derivatives crop up is in training _machine learning models_. The basic algorithm that underpins all training of machine learning models like these is fundamentally based on the idea of derivatives.

# Resources

* [This lecture](https://mlvu.github.io/preliminaries/) from my machine learning course contains [a section](https://mlvu.github.io/preliminaries/#slide-058) that introduces derivatives step by step.