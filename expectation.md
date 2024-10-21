---
title: Expectation
---

_This article is a stub. [These slides]( [are discussed in the preliminaries lecture](https://mlvu.github.io/preliminaries/#slide-129)) provide a detailed introduction to the basic properties of the expectation._

# Expectation

The **expectation** or **expected value** is a property of a random process that produces some numeric value. For example, the roll of a die, the amount of money you've won in the lottery this month, or the number of people who will contract COVID-19 this year. 

It is, in some sense what you can "expect to happen" even though many different outcomes are possible. Consider, for example, what happens when I go to a casino, and place 10 euros on red, on the roulette table

There are 37 outcomes, 18 of which are red, meaning I win and double my money. 18 of them are black and one is green, meaning I lose my money if the ball lands on one of those.

To compute the expectation, we take each of the three outcomes (<span class="rc">red</span>, black and <span class="gc">green</span>) and we multiply the probability of that outcome by the amount of money I gain if that outcome comes to pass, using negative amounts for cases where I lose money. For the roulette example, we get 

$$
\rc{\frac{18}{37}\times 10} + \frac{18}{37}\times -10 + \gc{\frac{1}{37} \times -10} \kc{=} \kc{- \frac{1}{37} 10} \approx -0.27 \p
$$

That is, our expected value is a loss of about 20 cents.

One way to interpret the expected value is that it's how much we win to win on average, per trial, if we try the experiment many times. The more often we try this, the more the randomness will average out, and the more our average winnings per trial will converge to the expected value.

In the case of the roulette wheel, this is important information: it tells you that if you play many times in a row, you will win some, and you will lose some, but on average, you will lose about 20 centes per time you play. So in short, even if you win occasionally, it's never worth it in the long run.

## Sources and further reading

Expectations and their properties [are discussed in the preliminaries lecture](https://mlvu.github.io/preliminaries/#slide-129) of the course [Machine Learning](https://mlvu.github.io/) at the Vrije Universiteit Amsterdam.