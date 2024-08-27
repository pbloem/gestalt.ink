{% raw %}

# Gaussian diffusion

<blockquote>“If [Thomas Edison] had a needle to find in a haystack, he would not stop to reason where it was most likely to be, but would proceed at once with the feverish diligence of a bee, to examine straw after straw until he found the object of his search. &hellip; Just a little theory and calculation would have saved him ninety percent of his labor.”
&mdash;Nikola Tesla
</blockquote> 

In the first part of this series, we built a diffusion model purely based on intuition. The model we ended up with worked pretty well as a proof-of-concept, and with a few months of trial and error, we may well have been able to beef this up to a competitive generative model capable of, for instance, generating realistic images of human faces. With that, it's a legitimate question why we need any more math than this. There's a lot of it coming up, so it's worth justifying. 

<aside markdown="1">Machine Learning occasionally falls into a trap of theory for theory's sake. Or, to put it differently, making a simple idea overly complex by analyzing it from every angle we can think of. I think we should at least be able to say at the end, what practical benefits we got out of it. If they don't outweigh the added complexity, then maybe the extra analysis wasn't worth it.   
</aside>

So, what kind of benefits do we usually get out of adding mathematical complexity? I can think of a few potential benefits.

* **It will constrain our search space.** With only appeals to intuition to work with, there is a vast amount of approaches to try. Intuition, more often that not, fails us, and the only way we can find out whether we are on the right track is to experiment. Often, as Tesla reminds us, a little reason and analysis can provide us with a clearer picture of where to look. It will give us both good starting points and tell us to avoid certain avenues. In the case of diffusion models, analysis can tell us that Gaussian noise is a good choice to build on, and it will allow us to derive diffusion from a loss that we actually want to optimize, rather than the arbitrary choice we made earlier.
* **It will provide new perspectives.** With analysis, we can often see connections between methods that look, on the surface, entirely different in nature. Once such a connection has been made, whatever we know about method A can be carried over to method B. In the case of Diffusion models, for instance, we can find a similarity to denoising score matching models. We will discuss this in a later part of this series, but it will build on the foundation we lay here.
* **It will expand our search space** Ok, this sounds like a little bit of a contradiction to my earlier point, but it's all about what you're trying to achieve. If you're trying to get a basic idea to work as well as possible, it helps to _constrain_ your search space. If you're stuck with a model that works well, but that has some downsides you'd like to fix, analysis can help you to see opportunities that weren't obvious before. In the case of diffusion models, we'll look at methods for faster sampling. We arrived at one approach (the denoising/renoising algorithm) purely by intuitive means. But more options are available if we dig into the math. We will take this approach in the next part of this series, when we discuss the DDIM sampling method.   

With that, let's get started. As noted above, the main innovation we will introduce is to replace the binomial noise we've used so far by _Gaussian noise_. That is, noise from a multivariate normal distribution.

To make this precise, let's say our images consist of $h \times w$ pixels with three color channels per pixel. That means we use $3hw$ numbers to describe each image. A Gaussian in $3hw$ dimensions will give us some noise to add to each number.

The basic principle is the same as before. We assume we are given a dataset if images. We will take an image $\x$ form the data, and add a little noise from some Gaussian in $h\cdot w\cdot 3$ dimensions, giving us a corrupted image $\z_1$. Then we will add a little more noise from the same distribution giving us a more corrupted version of the image $\z_2$ and so on, until after $T$ steps, we get an image $\z_T$.

-- Another diagram of the diffusion process.

As we saw in our naive diffusion algorithm, we have two main requirements for $\z_T$. First, all information about the original image $\x$ should be removed. One way to state that more precisely is that the resulting distribution on $\z_T$ should be independent of what image $\x$ we started with. Second, the distribution we get on $\z_T$ should be _known_, and it should be easy to sample from.

A simple way to achieve both goals is to choose our noise in such a way that the process converges to the standard normal distribution $N(\zero, \I)$ as the number of steps grows. That is, starting with some image $\x$ and applying our diffusion process should be equivalent to just sampling from $N(\zero, \I)$. Or approximately equivalent, for large enough $T$. If it's impossible to tell from a given $\z_T$ whether it was sampled from the standard normal distribution or from the diffusion process, we can be sure that there is no information about the original image left, and of course the standard normal distribution is easy to sample from. 

It will take a little analysis to figure out how to do this, but it will give us a very simple, uncomplicated prior on $\z_T$

## Diffusion with a constant noise distribution

To start with, we'll figure out how to do this with a simple, mostly constant noise distribution. That is, at every step $\z_t$ we will add some noise with a particular mean, chosen to ensure we converge to the right target, and a constant covariance. Moreover, we will simplify things by only using _spherical_ Gaussians. That is, we pick a single scalar variance $\bc{\sigma}$ and set $\bc{\Sig} = \bc{\sigma}^2\I$. 

<aside>Don't read too much into the square. This will help us later on, but for now, you can just think of $\bc{\sigma}^2$ as a slightly odd-looking name we give to some number we pick to scale the identity matrix by.    
</aside>

The result is that the Gaussian we use is a uniformly scaled version of the standard Gaussian. Therefore, like the standard Gaussian, all its contour lines will be circles (or hyperspheres, in higher dimensions), it will have the same variance in all directions, and all the elements of the resulting noise vectors will be independent of one another.

--- image. for some mean and sigma


<aside>Since all our Gaussians are spherical, we'll use the shorthand $N(\bmu, \bc{\sigma}^2) = N(\bmu, \bc{\sigma}^2)$ in the rest of this article. That is, even though we use a scalar variance, we are talking about multivariate Gaussians.
</aside>

Under these assumptions, one step in our noise process looks like this:

$$
\z_{t+1} \leftarrow \z_{t} + \g \hspace{2em} \text{with}\; \g \sim N(\oc{\bmu}, \bc{\sigma}^2\I) \p
$$

[Remember](gaussians) that any affine transformation of Gaussian noise itself produces Gaussian noise. In this case, adding $\z_{t}$ to the Gaussian noise vect $\g$ just shifts the mean. That means that we could describe the same update rule by 

$$
\z_{t+1} \sim N(\z_{t} + \oc{\bmu}, \bc{\sigma}^2\I) \p
$$

That is, instead of adding some noise to our previous image, we just sample $\z_{t+1}$ directly from some distribution, whose <span class="oc">mean</span> is inspired by $\z_t$. 

Now, how do we ensure that this process converges to $N(\zero, \I)$ at we increase $t$? First, the means should gradually move towards $\zero$. A simple way to achieve this is to subtract, at every step, a small proportion, say $0.1$, of the line between $\z_t$ and $\zero$. This line is the vector $\z_t$, so we should set $\oc{\bmu} = - 0.1\z_t $. With that the mean of our distribution for $\z_{t+1}$ becomes $\z_{t} + \oc{\bmu} = \kc{\z_t - 0.1\z_t} = \rc{0.9}\z_t$.

More generally, we pick some value $\rc{\gamma}$ , which should be between $0$ and $1$ and write our rule as

$$
\z_{t+1} \sim N(\rc{\gamma} \z_{t}, \bc{\sigma}^2\I) \p
$$

That is, starting with $\z_0 = \x$, at every step we sample $\z_t$ from the previous Gaussian, and then define the next Gaussian to sample from based on this sample.

The fundamental process at work here is that we are taking one Gaussian sample $\a$ and making it the mean of another Gaussian sample $\b$. Take a minute to consider what the distribution on $\b$ as a result of this whole process is. That is, if we marginalize over all possible samples we could take for $\a$, what is the shape of the distribution on $\b$? What we saw earlier, is that the result is another Gaussian.

<aside>In the diffusion process, we scale $\a$ first and then perform the second sampling step. But scaling is an affine operation, so we know that the distribution on the scaled $\a$ is Gaussian.  
</aside>

This means that if we set up our diffusion process like this, we will have a Gaussian at every step $\z_t$. Not just for a _fixed value_ of $\z_{t-1}$, but also if we consider all possible values of $\z_{t-1}$. In short both $p(\z_t \mid \z_{t-1})$ and $p(\z_t)$ are Gaussians.

Note that we haven't proved yet that $\z_t$ converges to mean $\zero$. We have defined a process where at every step $\z_t$ we sample from a Gaussian, and the result we get informs the parameters of the next Gaussian we sample from. The scaling by $\rc{\gamma}$ seems a reasonable way to pull the resulting distribution towards the origin, but quite what distribution we end up with at $\z_T$, we'll have to figure out by careful analysis.  

-- image 

Next, what should we do with $\bc{\sigma}$? We want the result of this chain of samples to converge to a covariance of $\I$, so the combination of all these $\bc{\sigma}$ should somehow converge to a variance of 1 in each direction. To work out this out, let's see what we can figure out about the distribution that our process converges to with what we have defined out so far. Let's look at the first two steps.

$$\begin{align*}
\z_1 &\leftarrow N(\rc{\gamma}\x, \bc{\sigma}^2\I) \\
\z_2 &\leftarrow N(\rc{\gamma}\z_1, \bc{\sigma}^2\I)
\end{align*}$$

Since every Gaussian is just an affine transformation of standard Gaussian noise, we can replace these with transformations of Gaussian noise as well. As we saw in the previous part, if $\s \sim N(\zero, \I)$, and $\y = \bc{\A}\s + \oc{\t}$, then $\y \sim N(\oc{\t}, \bc{\A\A}T)$. 

If we rewrite the first rule as 

$$
\z_1 \leftarrow N(\rc{\gamma}\x, \bc{\sigma\I}(\bc{\I\sigma})^T)
$$

we see that we can apply the rule in reverse to rewrite it as the transformation of some standard Gaussian noise $\s_1$:

$$
\z_1 = \bc{\sigma}\kc{\I}\s_1 + \rc{\gamma} \x = \bc{\sigma}\s_1 + \rc{\gamma} \x \p
$$

And, likewise, for a _different_ vector $\s_2$ of standard Gaussian noise: 

$$
\z_2 = \bc{\sigma}\s_2 + \rc{\gamma} \z_1\p
$$

With this perspective, it's easy to fold two steps of the algorithm into one:

$$\begin{align*}
\z_2 &= \bc{\sigma}\s_2 + \rc{\gamma} \z_1 \\ 
& = \bc{\sigma}\s_2 + \rc{\gamma} (\bc{\sigma}\s_1 + \rc{\gamma} \x)\\ 
&= \bc{\sigma}\s_2 + \rc{\gamma}\bc{\sigma}\s_1 + \rc{\gamma}^2 \x \p
\end{align*}$$

Now we can apply [another fact we know about Gaussians](...): that when we take the sum of Gaussian random variables with variances $a$ and $b$, we get another Gaussian with variance $a + b$. 

In the expression above, the first two terms represent zero-mean Gaussians with variances $\bc{\sigma}$ and $\rc{\gamma}\bc{\sigma}$ respectively. We can replace these with a single Gaussian with variance $\sqrt{\bc{\sigma}^2 + \rc{\gamma}^2\bc{\sigma}^2}$. In other words:

$$
\bc{\sigma}\s_2 + \rc{\gamma}\bc{\sigma}\s_1 = \sqrt{\bc{\sigma}^2 + \rc{\gamma}^2\bc{\sigma}^2}\s 
$$

where $\s$ is standard Gaussian noise. With that, we get 

$$
\z_2 = \sqrt{\bc{\sigma}^2 + \rc{\gamma}^2\bc{\sigma}^2}\s + \rc{\gamma}^2\x  = N(\rc{\gamma}^2\x, (\bc{\sigma}^2 + \rc{\gamma}^2\bc{\sigma}^2)\I)\p 
$$

Repeating the process for $\z_3$ we get 

$$\begin{align*}
\z_3 &= \bc{\sigma}\s_3 + \rc{\gamma} \z_2 \\
&= \bc{\sigma}\s_3 + \rc{\gamma} (\sqrt{\bc{\sigma}^2 + \rc{\gamma}^2\bc{\sigma}^2}\s_2 + \rc{\gamma}^2\x) \\
&= \bc{\sigma}\s_3 + \rc{\gamma} \sqrt{\bc{\sigma}^2 + \rc{\gamma}^2\bc{\sigma}^2} \s_2 + \rc{\gamma}^3\x \\
&= \sqrt{\bc{\sigma}^2 + \rc{\gamma}^2 \bc{\sigma}^2 + \rc{\gamma}^4\bc{\sigma}^2} \s   + \rc{\gamma}^3\x \p
\end{align*}$$

<aside>Whenever we combine two terms containing standard noise, we first square the scalar values in front of the standard noise, then sum them, and then take the square root of the sum. 
</aside>

From this, we can make an educated guess of what the general formula looks like for $\z_t$. First, we note that we always get another Gaussian: every time we take another step, we get another term with standard Gaussian noise, which we can combine with the term we already have. The $\x$ term, representing the mean is just multiplied by another $\rc{\gamma}$. 

On the $\s$-term, we get a square root with a sum in it, with terms ranging from $\bc{\sigma}^2\rc{\gamma}^0$ to $\bc{\sigma}^2\rc{\gamma}^{2(t-1)}$.

So, we can expect the variable $\z_t$ to be described by

$$
\z_t = \sqrt{\sum_{i=0}^{t-1}\bc{\sigma}^2\rc{\gamma}^{2i}}\s + \rc{\gamma}^t\x =  \sqrt{\bc{\sigma}^2\sum_{i=o}^{t-n}\rc{\gamma}^{2i}}\s + \rc{\gamma}^t\x \p
$$

This already shows one great benefit that we were after. To sample $\z_t$, we don't have to go through the whole noising process step by step. We can simply work out two scalars required for a given $t$, and sample directly from the distribution above.

But we aren't finished yet. The question was, what should we set $\bc{\sigma}^2$ and $\rc{\gamma}$ to, so that as we increase $t$, the distribution above goes to $N(\zero, \I)$? To get the mean to zero, the answer is pretty intuitive: for any $\rc{\gamma}< 1$, the factor $\rc{\gamma}^t$ goes to zero with $t$, so eventually the $\x$ term will disappear.

<aside>We can see the choice of $\rc{\gamma}$ as a hyperparameter for our noising process. If we set it close to 1, it will take many small steps for the process to converge. This will make it easier for the neural network to learn to invert these steps, but it will also be more costly. If we move it closer to 0, we remove more information from $\x$ in each step, but inverting the steps will be more challenging. 
</aside>

The trickier question is, given that we have chosen some $\rc{\gamma}$, how do we set $\sigma$ so that the covariance of our final distribution is $\I$? To achieve this, the factor 

$$
\bc{\sigma} \sqrt{ \sum_{i=o}^{t-1}\rc{\gamma}^{2i} } 
$$

should go to 1 as $t$ increases. This means we need to solve: 

$$\begin{align*}
\frac{1}{\bc{\sigma}} &= \sqrt{ \sum_{i=o}^{t-1}\rc{\gamma}^{2i} }\\
\frac{1}{\bc{\sigma}^2} &= \sum_{i=0}^{\infty}\left(\rc{\gamma}^2\right)^i \p
\end{align*}$$

The right-hand side is a [geometric series](...) in the variable $\rc{\gamma}' = \rc{\gamma}^2$, which is equal to $\frac{1}{1-\rc{\gamma}'}$. That means we get

$$\begin{align*}
\frac{1}{\bc{\sigma}^2} &= \frac{1}{1-\rc{\gamma}^2} \\
\bc{\sigma}^2 &=1-\rc{\gamma}^2 \p
\end{align*}$$

So, with that, we have our answer. We can pick any $0 < \rc{\gamma} < 1$ and use $\bc{\sigma} = 1 - \rc{\gamma}^2$. That is, we use the diffusion step

$$
\z_{t+1} \sim N\left (\rc{\gamma}\z_t, 1-\rc{\gamma}^2\right)
$$

What we have shown is that as $t$ increases, the distribution on $\z_t$ converges to  $N(\zero, \I)$.

<aside>In the literature, the diffusion process is more commonly built on a parameter $\gc{\beta}$, with the diffusion step defined as $\z_{t+1} \sim N(\sqrt{1- \gc{\beta}}\z_t, \gc{\beta})$. This is equivalent to our derivation above, with $\rc{\gamma} = \sqrt{1-\gc{\beta}}$. 
</aside>

With this noising process in place, we can immediately compute a noisy image $\z_t$ for any stage of the noising process, without having to go through the previous $t-1$ steps first. All we need to do is to compute:

$$
\z_t = \left(1-\rc{\gamma}^2\right) \sqrt{\sum_{i=0}^{t-1}\rc{\gamma}^{2i}}\s + \rc{\gamma}^t\x \p
$$

This equation shows us the two main parts of the image we see during the noising process, the _signal_, which is the original image $\x$, and the _noise_ which is provides by the $\s$-term. The corrupted image $\z_t$ that we see is a weighted sum of <span class="oc">signal</span> and <span class="bc">noise</span>.  

<p>$$
\z_t = \underbrace{ \bc{ \left(1-{\gamma}^2\right) \sqrt{ \sum_{i=0}^{t-1}{\gamma}^{2i} }}}_{ \bc{\text{noise}} }\s + \underbrace{ \oc{\gamma^t} }_{ \oc{\text{signal}} }\x \p
$$</p>

Note that the signal goes from 1 to 0, as the noise goes from 0 to 1. The fraction between the two, the signal-to-noise ratio is often used to express how far along in the process we are, and will come up as an important hyperparameter later on.

### Noise _schedules_

In practice, we may want to take steps of different sizes, at different points along the noising process. In particular, it seems to be a good idea to take bigger steps in the noisier regime, and smaller steps when the picture becomes more defined.

<aside>One way to think about this is that when we're denoising, the first steps are responsible for generating the broad details, like the outline of a face. One step with a UNet is likely sufficient to generate a lot of this. The later steps fill in a lot of detail, like the precise direction of every lock of hair, which requires more randomness, and more separate steps. 
</aside>

To achieve this, we can change the single value $\rc{\gamma}$ to a sequence of values $\rc{\gamma}_t$ so that at step $t$ we have 

$$
\z_t \sim N(\rc{\gamma_t}\z_{t-1} \mid \bc{\sigma_t}^2) \p
$$

As before, we'll define the variance by its own parameter, this time also differing over the schedule, and then we'll try find a way to set this, given $\rc{\gamma_t}$, that ensures that $\z_t$ converges to a standard normal distribution.

First, let's expand the distribution on $\z_t$ for the first three steps to see if we can spot a pattern.

$$\begin{align*}
\z_1 &= \rc{\gamma_1} \x + \bc{\sigma_1}\s \\
\z_2 &= \rc{\gamma_2} \z_1 + \bc{\sigma_2}\s = \kc{ \gamma_2 \left(\gamma_1 \x + \sigma_1\s' \right) + \sigma_2\s'' } \\
&= \rc{\gamma_1}\rc{\gamma_2}\x + \sqrt{ \bc{\sigma_1}^2\rc{\gamma_2}^2 + \bc{\sigma_2}^2 }\s \\
\z_3 &= \rc{\gamma_2} \z_2 + \bc{\sigma_2}\s \\
     &= \rc{\gamma_1\gamma_2\gamma_3}\x + \sqrt{\bc{\sigma_1}^2\rc{\gamma_2}^2\rc{\gamma_3}^2 + \bc{\sigma_2}^2\rc{\gamma_3}^2 + \bc{\sigma_3}^2 } \\
\z_4
     &= \rc{\gamma_1\gamma_2\gamma_3}\x + \sqrt{\bc{\sigma_1}^2\rc{\gamma_2}^2\rc{\gamma_3}^2\rc{\gamma_4}^2 + \bc{\sigma_2}^2\rc{\gamma_3}^2\rc{\gamma_4}^2 + \bc{\sigma_3}^2\rc{\gamma_4}^2 + \bc{\sigma_4}^2} \p

\end{align*}$$
 
For the multiplier in the $\x$-term, the pattern is simple: each iteration multiplies by $\rc{\gamma_t}$, so we just get the product of all $\rc{\gamma_t}$'s so far. Now, for the $\s$-term. Remember that we need this multiplier to converge to $1$. What should we set each $\bc{\sigma_t}$ to? We'll allow ourselves a lucky guess, and try to see if the answer we got previously, $\bc{\sigma} = 1 - \rc{\gamma}^2$ works here as well. With that, the pattern becomes:

$$
(1 - \rc{\gamma_1}^2)^2\rc{\gamma_2}^2\rc{\gamma_3}^2\rc{\gamma_4}^2 + (1 - \rc{\gamma_2}^2)\rc{\gamma_3}^2\rc{\gamma_4}^2 + (1 - \rc{\gamma_3}^2)^2\rc{\gamma_4}^2 + (1- \rc{\gamma_4}^2) \p
$$

That is, each term is the product of $\rc{\gamma_t}^2$'s from $i$ to $t$, where $i$ moves up one place each term, and the first factor is $1-\rc{\gamma_t}^2$ instead of $\rc{\gamma_t}_2$.

Now, remember that we need this sum to converge to $1$ as we extend the pattern. Why should this be the case? This becomes clear when we _multiply out the brackets_. Putting each term in the sum above on its own line, we get:

$$\begin{align*}
\rc{\gamma_2}^2\rc{\gamma_3}^2\rc{\gamma_4}^2 &- \rc{\gamma_1}^2\rc{\gamma_2}^2\rc{\gamma_3}^2\rc{\gamma_4}^2 \\ 
\rc{\gamma_3}^2\rc{\gamma_4}^2 &- \rc{\gamma_2}^2\rc{\gamma_3}^2\rc{\gamma_4}^2 \\
\rc{\gamma_4}^2 &- \rc{\gamma_3}^2\rc{\gamma_4}^2 \\
1 &- \rc{\gamma_4}^2 \p
\end{align*}$$
 
Note the pattern: when we multiply out each term, we get one negative sequence, and one positive sequence which is one element shorter. This means that the positive term is each line is equal to the negative term in the next line. Canceling all these out we are left with 

$$
1 - \rc{\gamma_1}^2\rc{\gamma_2}^2\rc{\gamma_3}^2\rc{\gamma_4}^2
$$

or, if we expand the sum further with 

$$
1 - \rc{\gamma_1}^2\rc{\gamma_2}^2\cdots\rc{\gamma_t}^2 \p
$$

If we choose our schedule so that the second term goes to zero, then we can set $\bc{\sigma}^2 = 1 - \rc{\gamma}$, and be sure that our diffusion process will converge to $N(\zero, I)$. 

<aside>Schedules are usually chosen so that $\rc{\gamma_t}$ is between 0 and 1 and strictly decreases with every step. This is sufficient to ensure that the product over all $\rc{\gamma_t}$ goes to zero.  
</aside>

So, setting $\bc{\sigma_t}^2 = 1 - \rc{\gamma_t}^2$ ensure that we converge to the standard Gaussian. With that, we can work out the definition of $\z_t$ in terms of $\x$ and a standard noise vector $\s$. We will introduce the variable $\rc{\bar\gamma_t}$ for the signal, and $\rc{\sigma_t}$ for the noise. This gives us 

$$
\z_t = \rc{\bar\gamma_t}\x + \rc{\bar\sigma_t}\s
$$

with 

$$
\rc{\bar\gamma_t} = \rc{\gamma_1}\rc{\gamma_2}\cdots \rc{\gamma_t}
$$

and

$$\begin{align*}
\rc{\bar\sigma_t}^2 &= \kc{(1 - {\gamma_1}^2){\gamma_2}^2\;\cdots\;{\gamma_t}^2\; +\; (1 - {\gamma_2}^2){\gamma_3}\;\cdots\;{\gamma_t} \;+\; \ldots + 1 - {\gamma_t}^2} \\
&= 1 - \rc{\gamma_1}^2\rc{\gamma_2}^2\cdots\rc{\gamma_t}^2 = 1 - \rc{\bar\gamma_t}^2
\end{align*}$$

-- plot 2D Gaussians for 3 different noise schedules


## Setting up the denoising process

That's what the noising process looks like under Gaussian diffusion. How about the _denoising_ process? We could proceed the same way as we did with the Bernoulli noise: simply sample $\z_t$ from $\x$ and then train a neural network to predict either $\z_{t-1}$ from it or $x$. After the network is trained, we can proceed by sampling $\z_T$ and then predicting $\z_{T-1}$ from it, and then $\z_{t-2}$ from that, and so on, until we get a prediction for $\x$.

<aside>If the network is trained to predict $\z_{t-1}$ from $\z_t$, we get this sequence of predictions directly. If we train it to predict $\x$, we can use the denoising/renoising algorithm. 
</aside>

All of that, however, is a little unprincipled. With Gaussian diffusion we can work from _first principles_. Instead of making some arbitrary prediction, we take our whole denoising process, from sampling $\z_T \sim N(\zero, \I)$, through all the denoising steps to our sampled $\x$, as a single probability distribution $p_\oc{\theta}$. When we sample from this distribution, we get image $\x$ with probability density $p_{\oc\theta}(\x)$, where $\oc{\theta}$ is some data structure containing all the parameters of our denoising neural network $f$.  

With this, we can use the [maximum likelihood principle] to state directly what we want to achieve. For a given dataset, we want to maximize the log-likelihood of our data. That is, we want to choose $\oc{\theta}$ to maximize the quantity

$$
\sum_{\x \in \text{Data}} \text{log } p_\oc{\theta}(\x) \p
$$

This doesn't _directly_ give us a usable loss function, but we can get there with a little analysis.

The first question we have to answer is, given a sample $\z_{t+1}$, what do we want to predict? We must choose between predicting $\x$ and predicting $\z_t$, but there is also the question of predicting single values for these, or _distributions on them_. If our neural network can predict some value $\z_t$, it can also predict a normal distribution centered on $\z_t$, with some variance around it. This is much more realistic. The actual $\z_t$ used in the noising process was partly noise. Mostly noise in the case of high $t$. By definition, noise is not something we can predict. The best we can do with noise is to predict the parameters of the distribution that produced it. 

To be principled, let's look at what the ideal distribution we would like to predict. If we call the distributions that produce our noisy samples $q$, we can state the noising process as 

$$
q(\z_{t+1}\mid \z_{t}) = N(\z_{t+1}\mid \rc{\gamma}\z_{t}, (1-\rc{\gamma})^2\I) \p
$$

Then, the ideal distribution we'd like to know for the backward process is.
$$
q(\z_t\mid {\z_t+1}) \p
$$

This is the opposite direction from how we've defined things, assuming that we ended up with $\z_{t+1}$, what's the most likely place we came from? With Bayes' rule, we can get an idea of what this distribution looks like.

$$
q(\z_t\mid {\z_t+1}) =  q(\z_{t+1}\mid \z_{t}) \cdot \bc{\frac{q(\z_t)}{q(\z_t+1)}} \p
$$

That first factor is a Gaussian, but the <span class="bc">second factor</span> isn't. In fact at $t=0$, the numerator is $q(\z_0) = p(\x)$---the data distribution---which we may assume is highly complex.

What we can say, however, is that so long as we keep our step size small, this is a distribution that can be well-approximated by a Gaussian. If $\z_t$ and $\z_{t+1}$ are close together, and $q$ is relatively smooth, then the densities of $\z_t$ and $\z_{t+1}$ under $q$ will not be very different. In that case, that  <span class="bc">second factor</span> will be close to <span class="bc">1</span> and $q(\z_t\mid {\z_t+1})$ will look roughly Gaussian.

<p>We use this argument to justify approximating $q(\z_t\mid {\z_t+1})$ with a Gaussian: one produced by our neural network. That is, instead of making our network output a prediction $\z_t$, we make it output the parameters $\oc{\bmu}_\oc{\theta}$ and $\bc{\bsig}_\oc{\theta}$, which are tensors of the same size as our images. We then learn an approximation of the probability $q(\z_t\mid {\z_t+1})$ with the Gaussian</p> 

$$
p_\theta(\z_t \mid \z_{t+1}) = N(\z_t \mid \oc{\mu_\theta}, \text{diag}(\bc{\bsig}_\oc{\theta})) 
$$

Note that we don't use a spherical Gaussian in this case, as we do in the noising process, with a single uniform variance in all directions. Instead, we specify a variance _per dimension_. This gives us a variance _vector_ $\bsig$ of the same size as the mean. The covariance matrix is a diagonal matrix, with $\bsig$ along the diagonal.

<aside>We assume in this notation that the images $\z_t$ and the parameters $\bmu$ and $\bsig$ are flattened out into vectors. In the practical implementation, that's usually not necessary, and we can keep them all as tensors of $3 \times h \times w$.
</aside>

With this model in place, we can start deriving our loss function. Since we're looking for somthing to minimize, we'll focus on the _negative_ log-likelihood. We'll also work on the likelihood of a single instance $\x$. The loss over the whole data, or a batch, is then just the sum of the negative log-likelihoods of the individual instances. 

The first steps are as follows. Note that we're focusing in $p_\oc{\theta(\x)}$, the probability of seeing $\x$ under the model with its current parameters $\oc{\theta}$. We'll leave out the subscript for clarity.

$$\begin{align*} 
\kc{- \text{log}}\; p(\x) &= \kc{- \text{log}}\; \int_{\z_1 \ldots \z_T} p(\x, \z_1, \ldots, \z_T) \;d \z_1 \ldots \z_T \\
\end{align*}$$

Here, we work in our latent variables $\z_1$ through $\z_T$. The total probability of seeing $\x$ is the combination of all possible paths from a sample from $\z_T$ to $\x$, weighted by all possible samples $\z_T$. In a discrete setting, we would sum over all possible ways of doing this, but since this is a continuous space, we integrate all possible ways.

<aside>Don't worry if you don't know much about integrals in multiple dimensions, like this. We will only manipulate stuff inside the integral and then turn it into an expectation. All you need to understand is what it represents, not how to solve it.
</aside>

Next, we use [the chain rule of probability](...) to break our joint probability $p(\x, \z_1, \ldots \z_T)$ into a sequence of probabilities of each $\z_t$ conditioned on the $\z$'s before it. Since $\z_t$ only depends on $\z_{t-1}$, we can remove the rest from the conditional, giving us

$$
p(\x, \z_1, \ldots ,\z_t) = p(\x\mid \z_1) \;p(\z_1\mid \z_2)\;\cdots\; p(\z_{T-1}\mid \z_T) \; p(\z_T) \p
$$
 
These factors are the things we've actually set our network up to predict, so we can tell we're getting closer to a usable loss. Next, we need to work in the actual noising process $q$. 

Note that, so far all we've said is that our denoising process should be likely to produce the data. We haven't said that it should follow the reverse of our noising process, or even that it should take the existince of the noising process into account. This is one prespective on Gaussian diffusion: we're not actually trying to mimic the (reverse) noising process, we just want to maximize the data laikelihood. We are going to _bring in_ the noising process $q$ as something to help guide the model, and to make our loss function tractable.

To bring in the noising process, we simply multiply inside the integral by

$$
\frac{\rc{q}(\z_1, \ldots, \z_T\mid \x)}{\rc{q}(\z_1, \ldots, \z_T\mid \x)} \p
$$

There isn't much intuition here: just that this is allowed, since it equals 1, and after we do it, we can rewrite to something that works for us.

With these two steps, our loss looks like this

$$\begin{align*} 
\kc{- \text{log}}\; \gc{p}(\x) =\kc{- \text{log}}\; \int_{\hat\z} \frac{\rc{q}(\z_1, \ldots, \z_T\mid \x)}{\rc{q}(\z_1, \ldots, \z_T\mid \x)} \gc{p}(\z_T) \prod_{t=1}^{T} \gc{p}(\z_{t-1}\mid \z_{t}) \; \;d \hat\z \\
\end{align*}$$

Where $\hat\z$ represents the whole sequence of latent variables (excluding $\x$) and we use the convention that $\z_0 = \x$.

We use the chain rule of probability again on the $\rc{q}$ in the denominator, conditioning each $\z_t$ on the one _before_ it: 

$$
\rc{q}(\z_1, \ldots, \z_T\mid \x) =  \rc{q}(\z_1 \mid \x) \, \rc{q}(\z_2 \mid \z_2)  \; \cdots\; \rc{q}(\z_T \mid \z_{T-1}) \p  
$$

Working this in to the product over the $\gc{p}$'s we are left with

$$\begin{align*} 
\kc{- \text{log}}\; \gc{p}(\x) =\kc{- \text{log}}\; \int_{\hat\z} \rc{q}(\hat \z \mid \x) \,\gc{p}(\z_T)\, \prod_{t=1}^{T} \frac{\gc{p}(\z_{t-1}\mid \z_t)}{\rc{q}(\z_t \mid \z_{t-1})} \; \;d \hat\z \p \\
\end{align*}$$

Note that this is now  an _expectation_ under the distribution $\rc{q}(\hat\z\mid \x)$. This perspective helps a lot to see where we're going. We have  

$$\begin{align*} 
\kc{- \text{log}}\; \gc{p}(\x) =\kc{- \text{log}}\; {\Large {E}}_{\hat\z \sim \rc{q}(\hat\z \mid \x)} \,\gc{p}(\z_T)\, \prod_{t=1}^{T} \frac{\gc{p}(\z_{t-1}\mid \z_t)}{\rc{q}(\z_t \mid \z_{t-1})} \p \\
\end{align*}$$

The key thing that we've achieved is that this is an expectation under a distribution we can sample from. Given some $\x$, we can easily sample from $\rc{q}(\z_1, \ldots \z_T \mid \x)$ since that is just sampling for our noising process. What's more, the other factors, we can also compute easily: 
* $\gc{p}(\z_T)$ is a standard Gaussian. Or at least, close enough for high $T$.
* $\gc{p}(\z_{t-1}\mid \z_t)$ is the Gaussian that our neural network gives us if we feed it $\z_t$.
* $\rc{q}(\z_t \mid \z_{t-1})$ is the Gaussian for one sampling step of our noising process, which we've worked out already.

In short, we're getting pretty close to a loss function that we can approximate. We can get an estimate of the expectation by averaging some samples from $\rc{q}(\hat\z\mid \x)$, and for each sample, we can compute all the factors inside. 

<aside>This is called a <em>Monte Carlo</em> estimate. For any expectation $E_{\x \sim p} f(\x)$ we can get an unbiased estimate by taking a bunch of samples of $\x$ from $p$ and averaging the resulting values of $f(\x)$. It's essentially what you do when you average any quantity over a sample. 
</aside>

The next big issue is the logarithm. If we estimate the expectation by an average and then take a logarithm, the estimate will no longer be unbiased. Instead we want to move the logarithm into the expectation. The expectation is a weighted integral. We can't move a logarithm inside an integral without changing the value. We can however, use [Jensen's inequality]() to show that by moving the logarithm inside the expectation we are increasing the value. 

$$\begin{align*} 
- \text{log}\; {\Large {E}}_{\hat\z \sim \rc{q}(\hat\z \mid \x)} \,\gc{p}(\z_T)\, \prod_{t=1}^{T} \frac{\gc{p}(\z_{t-1}\mid \z_t)}{\rc{q}(\z_t \mid \z_{t-1})}\;\leq\;- {\Large {E}}_{\hat\z \sim \rc{q}(\hat\z \mid \x)} \,\text{log}\, \,\gc{p}(\z_T)\, \prod_{t=1}^{T} \frac{\gc{p}(\z_{t-1}\mid \z_t)}{\rc{q}(\z_t \mid \z_{t-1})}\p \\
\end{align*}$$

This gives us a _bounded loss_. The idea is that he thing on the left, which we want to minimize but can't estimate easily, is bounded from above by the thing on the right, which we can actually estimate easily. This means that if we minimize the right-hand side, we are also forcing the left-hand side down. This only works if the bound is tight enough, but it appears to work for diffusion.

Ok, so now we have an expectation we can estimate, framed in terms of probabilities we can compute. However, many of these probabilities, like $\gc{p}(\z_T)$ and $\rc{q}(\cdot)$ are from functions that we don't control: changing the parameters $\oc{\theta}$ of our neural network won't affect them. By working the logarithm inside the multiplications, we can break the expectation up into a sum of expectations. 

$$\begin{align*} 
&- {\Large {E}}_{\hat\z \sim \rc{q}(\hat\z \mid \x)} \,\text{log}\, \,\gc{p}(\z_T)\, \prod_{t=1}^{T} \frac{\gc{p}(\z_{t-1}\mid \z_t)}{\rc{q}(\z_t \mid \z_{t-1})} = \\
& \kc{- {\Large {E}}_{\hat\z} \,\text{log}\, \,p(\z_T)} - \sum_{t=1}^{T} {\Large {E}}_{\hat\z}  \,\text{log}\,\gc{p}(\z_{t-1}\mid \z_t) \kc{\;- \sum_{t=1}^{T} \text{log} \, {\Large {E}}_{\hat\z}  q(\z_t \mid \z_{t-1}) } \p
\end{align*}$$

So, as we look for the minimum under $\oc{\theta}$, this middle term is all we need to worry about. If we pick a random term in this sum to optimize for, and then approximate the expectation with a single sample, we get the following algorithm:

<ul>
<li> Given $\x$, </li>
<li> sample $t \sim U(1, T)$ (a random term), </li>
<li> sample $\z_t \sim N(\rc{\bar\gamma_t}\x, \rc{\bar\sigma_t})$ and likewise for $\z_{t-1}$ </li>
<li> perform one step of gradient descent on the loss $- \text{log }\gc{p}_\theta(\z_{t-1} \mid \z_{\t})$. </li>
</ul>

Here $\gc{p}$ is our neural network, which takes $\z_t$ as input, and produces a Gaussian distribution. We try to set the parameters fo our network so that the log-density of the point $\z_t$ is as high as possible.

If we open up the definition of $N$, we see that this is very close to what we were doing already. For instance, if we were to fix the output variance, and only have the network predict a mean $\oc{\bmu_\theta}$, we would get 

<p>$$
- \text{log } \gc{p}_\oc{\theta}(\z_{t} \mid \z_{t+1}) \propto \| \z_t - \oc{\bmu_\theta}\|^2 \p
$$</p>

In other words, we're back to minimizing the squared distance between the predicted and the obeserved $\z_t$. But this time, we started with a principled objective. As T.S. Elliot said: "the end of all our exploring will be to arrive where we started, and know the place for the first time."

This is broadly what the first published diffusion models used for their loss. And it worked to an extent, but it turned out that the variance of the estimate of this middle term was very high. That means that we would either need to take more samples, or average over very large batches, to get good gradients. 

The solution came from realizing that if we combine the second and third terms in the derivation above, we get  

$$
- \sum_{t=1}^{T} {\Large {E}}_{\hat\z \sim \rc{q}(\hat\z \mid \x)}  \, \text{log } \frac{ \gc{p}(\z_{t-1}\mid \z_t)}{ \rc{q}(\z_t \mid \z_{t-1}) } \p
$$

This looks a bit like a [KL divergence](...). It's not quite there yet, since the $\rc{q}$ in the denominator is not the same as the one we are sampling from in the expectation, but perhaps with a little extra analysis, we can get there.

Why would we want to? Because the KL divergence essentially expresses how different two distributions are. If we can compare the true distribution $\rc{q}$ to the prediction distribution $\gc{p}$, that should give us a lot more information than comparing a _sample_ from $\rc{q}$ to the prediction distribution. The more we sample, the more variance we get, so this should help us reduce the variance.  

### Reversing $\rc{q}$

If we want something to compare $\gc{p}(\z_t \mid \z_{t+1})$ to, we'll need to find a way to flip round $\rc{q}$.
What I mean by that is that we defined $\rc{q}(\z_{t+1}\mid\z_t)$, in the noising direction, but we need it in the opposite direction.

Reversing conditionals is what [Bayes' theorem](...) does for us. Applying here gives us

$$
\rc{q}(\z_t\mid\z_{t+1}) = \rc{q}(\z_t\mid\z_{t+1}) \frac{\rc{q}(\z_{t+1})}{\rc{q}(\z_t)} \p  
$$

Can we compute all three factors? The first follows from our definition, so that's easy, but the other two are tricky. You see, $\rc{q}(\z_t)$ is the probability that we see the vector $\z_t$ after sampling some $\x$ from our data distribution, and performing $t$ steps of diffusion. If we want to give the answer _regardless of what $\x$ we used_, we somehow need to consider all possible $\x$ and their probabilities under the data distribution. The data distribution first of all a highly complex object, and second of all, no known to us. In short, this direction doesn't seem fruitful.  

<aside>We have the dataset, of course, as a sample from the data distribution, but we were trying to get away from sampling.</aside>

Instead, we will make things easier for ourselves by _conditioning_ on $\x$. We worked out already that if $\x$ is given, then we can define the distribution on $\z_t$ directly as a Gaussian whose mean is a function of $x$:

$$
\z_t \sim N(\rc{\bar\gamma_t}\x,  \rc{\bar\sigma_t}^2) \p
$$

So, if we get $\rc{q}$ to be conditioned on $\x$, then our Bayes' rule might work out more favorably. To do that, we'll need to take a few steps back in our derivation. After stating the maximum likelihood objective and doing some rewriting, we got 

<p>$$
- \text{log } \gc{p}_\oc{\theta}(\x) \leq \large{E_{\rc{q}(\hat\z \mid \x)}} \frac{\gc{p}(\hat\z \mid \x)}{\rc{q}(\hat \z \mid \x)} \gc{p}(\z_T)
$$</p>

For both the numerator and the denominator, we used the chain rule of probability to break this probability up into the separate sampling steps. To illustrate for a short sample $\x, \z_1, \z_2, \z_3$, that looks like 

<p>$$\begin{align*}
\rc{q}(\z_1, \z_2, \z_3 \mid \x) &=  \rc{q}(\z_3 \mid \z_1, \z_2,\x) \rc{q}(\z_2 \mid \z_1,  \x) \rc{q}(\z_1 \mid \x) \\
&= \rc{q}(\z_3 \mid \z_2) \rc{q}(\z_2 \mid \z_1) \rc{q}(\z_1 \mid \x) \p
\end{align*}$$</p>

In the first line, we decompose the joint probability on all $\z$'s by conditioning each $\z$ on all the ones before it. 

<aside>You can do this by simply applying the rule $p(a, b) = p(a \mid b)p(b)$ over and over again. It works on any joint probability and in any order.
</aside>

In the second line, we use what we know about our diffusion process: that once we know the value of the sample $\z_2$, the probability on $\z_3$ is determined. It doesn't matter if, when we sampled $\z_2$, $\z_1$ was over here or over there. We got the sample we did, and we can now forget about $\z_1$. Put mathematically, $\rc{q}(\z_3 \mid \z_2, \z_1, \x) = \rc{q}(\z_3 \mid \z_2)$.

<aside>This is often referred to as the <em>Markov property</em> of the diffusion process.
</aside>

Now, we can remove all those variables from the conditional, but we don't have to. As we saw before, it can actually help us to keep the $\x$ where it is. So, instead, we do

<p>$$\begin{align*}
\rc{q}(\z_1, \z_2, \z_3 \mid \x) 
&= \rc{q}(\z_3 \mid \z_2, \x) \rc{q}(\z_2 \mid \z_1, \x) \rc{q}(\z_1 \mid \x) \p
\end{align*}$$</p>

With that, we go back to our loss function, and decompose the joints distributions $\gc{p}$ and $\rc{q}$. We only keep $\x$ in the conditional on the $\rc{q}$ side. 

<p>$$
- \text{log } \gc{p}_\oc{\theta}(\x) \leq \large{E_{\rc{q}(\hat\z \mid \x)}} \prod_{t=1}^T \frac{\gc{p}(\z_{t-1} \mid \z_{t})}{\rc{q}(z_{t} \mid \z_{t-1}, \x)} \gc{p}(\z_T) \p
$$</p>

We can now return to our original question, can we reverse the order of $\rc{q}$ so that the top and bottom distributions become more similar? Bayes rule gives us

$$
\rc{q}(\z_t\mid\z_{t-1}, \x) = \rc{q}(\z_{t-1}\mid\z_t, \x) \frac{\rc{q}(\z_{t} \mid \x)}{\rc{q}(\z_{t-1}\mid \x)} \p
$$

Now, all three factors are known. The first is defined by our diffusion process---in fact we have two definitions now, in terms of $\x$ or in terms of $\z_t$. The other two, we worked out above: $\rc{q}(\z_t\mid \x) = N(\rc{\bar\gamma_t}\z_t, \rc{\bar\sigma_t}^2)$, and likewise for $\z_{t-1}$.

It turns out, however, that not only can we compute $\rc{q}(\z_t\mid\z_{t-1}, \x)$, it's actually a Gaussian. 

## Common extensions

That's the basic idea of Gaussian diffusion: the foundation behind almost all diffusion models in use today. Of course, most  of them add a few tricks. We'll finish up by going through the most important ones.

### Different noise schedules

#### Finishing exactly at $N(\zero, \I)$, instead of nearby

### Noise prediction

### $v$-prediction

### SNR scaling

### Latent diffusion

-- image

## References

Papers
* [Luo 2022]


Blog posts
* [Weng 2021]

## Appendix

### Closed form for $\rc{q}(\z_{t-1} \mid \z_t, \x)$

I'm not going to lie, this one took me a while to wrap my head around. At one point, I was convinced I'd found a mistake in the whole modern derivation of diffusion (which somehow managed to work extremely well in many multi-million dollar models). 

<aside>As it happens, I had a little blind spot in my elementary algebra called "completing the square".</aside> 

Another aspect of the issue is that all derivations of this fact---including those by Luo (2022), and Weng (2021)---seem to be a little sloppy in the way they treat vectors: multiplying them together and squaring them as if they were scalars. For this reason, this derivation may be a little over-elaborate, but I felt that the thing should be done properly somewhere. 

Note also that I'm using a non-standard notation in terms of $\rc{\gamma}$ and $\rc{\sigma}$ in this article. If you want to translate this to the conventional notation with $\gc{\alpha}$ and $\gc{\beta}$, use
* $\gc{\beta_t} = 1 - \rc{\gamma_t}^2$,
* $\gc{\alpha_t} = \rc{\gamma}^2$,
* $\gc{\bar\alpha_t} = \rc{\bar\gamma_t}^2 $,
* $\rc{\bar\sigma_t}^2 = 1 - \rc{\bar\gamma_t}^2 = 1 - \rc{\bar\alpha_t}$.

<div class="theorem"><strong class="gc">Reversing $\rc{\q}$.</strong> Given the diffusion process $\rc{q}(\z_1, \ldots, \z_T \mid \x)$ as defined above, the distribution 
$$
\rc{q}(\z_{t-1} \mid \z_t, \x)
$$

is Gaussian, with <span class="bc">variance</span>

$$
\frac{ \rc{\bar\sigma_{t-1}}^2 }{ \rc{\bar\sigma_{t}}^2} (1 - \rc{\gamma_t}^2)
$$

and <span class="oc">mean</span> 

$$\frac{1}{\rc{\gamma_t}} \left( \z_T - 
  \frac{ 1-\rc{\gamma_t}^2 }{\rc{\bar\sigma_t}}
  \s_t
\right)
$$

where $\s_t$ is the noise vector that was used to generate $\z_t$.
</div>
<div class="proof" markdown="1"><span class="kc">Proof.</span> We first _reverse_ the given distribution using Bayes rule.

$$
\rc{q}(\z_{t-1} \mid \z_t, \x) = \rc{q}(\z_{t} \mid \z_{t-1}, \x) \frac{\rc{q}(\z_{t-1} \mid \x)}{\rc{q}(\z_{t} \mid \x)} \p
$$

As noted in the body of the article, all three factors on the right-hand-side are know. Specifically

$$\begin{align*}
\rc{q}(\z_{t} \mid \z_{t-1}, \x) &= \rc{q}(\z_{t} \mid \z_{t-1}) = N(\z_t \mid \rc{\gamma_t}\z_{t-1}, 1- \rc{\gamma_t}^2) \\
\rc{q}(\z_{t-1} \mid \x) &= N(\z_{t-1} \mid \rc{\bar \gamma_t}\x, \rc{\bar\sigma_t}^2) \\
\rc{q}(\z_{t} \mid \x) &= N(\z_{t} \mid \rc{\bar \gamma_t}\x, \rc{\bar\sigma_t}^2)
\end{align*}$$

<aside>Note the bars: the diffusion in terms of $\z_{t-1}$ is defined with the hyperparameter $\rc{\gamma_t}$, but the diffusion in terms of $\x$ is defined in terms of $\rc{bar\gamma_t}$ and $\rc{\bar\sigma_t}$, which are functions of the sequence $\rc{\gamma_1}\ldots \rc{\gamma_t}$.
</aside>

<p>Note that a Gaussian $N(\a\mid \oc{\b}, \bc{\sigma^2})$ is proportional to $\text{exp }-\frac{1}{2} \frac{\|\a - \oc{\b}\|^2}{\bc{\sigma^2}}$. We will use this to simplify our formula.
</p>

We write

<p>$$\begin{align*}
&\text{log }\rc{q}(\z_{t} \mid \z_{t-1}, \x) \frac{\rc{q}(\z_{t-1} \mid \x)}{\rc{q}(\z_{t} \mid \x)}  \\

& = \text{log } N(\z_t \mid \rc{\gamma_t}\z_{t-1}, 1- \rc{\gamma_t}^2) + \text{log } N(\z_{t-1} \mid \rc{\bar \gamma_t}\x, \rc{\bar\sigma_t}^2) - \text{log } N(\z_{t} \mid \rc{\bar \gamma_t}\x, \rc{\bar\sigma_t}^2) \\

&= -\frac{1}{2}\left [ \frac{ \|\z_t-\rc{\gamma_t}\z_{t-1}\|^2 }{ 1-\rc{\gamma_t}^2 } 
   + 
         \frac{ \|\z_{t-1}-\rc{\bar\gamma_{t-1}}\x\|^2 }{ \rc{\bar\sigma_{t-1}}^2 }
   - 
         \frac{ \|\z_t -\rc{\bar\gamma_{t}}\x\|^2}{ \rc{\bar\sigma_{t}}^2 } \right ] \kc{\;+\;c}
\end{align*}$$</p>

where $\kc{c}$ is some constant value that does not depend on $\z_{t-1}$.

<p>Now, note that we can expand the squared norm $\|\a + \b\|^2$ into $\a^T\a - 2\a^T\b + \b^T\b$. If we do this to the three norms above, we get three dot products each (nine in total), each scaled by some combination of our hyperparameters.  
</p>

We will perform this expansion, but we will collect any dot product that doesn't involve $\z_{t-1}$, the value for which we're computing the density, into the term $\kc{c}$. That is, we get a new constant $\kc{c}$ which may depend on the conditionals $\z_t$ and $\x$, but not on $\z_{t-1}$. 

The result is 

<p>$$\begin{align*}
&\text{log } \rc{q}(\z_{t} \mid \z_{t-1}, \x) \\
&= \kc{-\frac{1}{2}}  \left [ 
          \frac{ \rc{\gamma_t}^2 }{ 1-\rc{\gamma_t}^2 }                      {\z_{t-1}}^T \z_{t-1}
    \;+\; \frac{ 1 }{ \rc{\bar\sigma_{t-1}}^2 }                      {\z_{t-1}}^T \z_{t-1}
    \;-\; \frac{ 2\rc{\gamma_t} }{ 1-\rc{\gamma_t}^2 }          {\z_{t}}^T   \z_{t-1} 
    \;-\; \frac{ 2\rc{\bar\gamma_{t-1}} }{\rc{\bar\sigma_{t-1}}^2 }   \x^T        \z_{t-1}
\right ] \kc{\; +\; c} \\
&= \kc{-\frac{1}{2}}  \left [ 
          \left(\frac{ \rc{\gamma_t}^2 }{ 1-\rc{\gamma_t}^2 }+\frac{ 1 }{ \rc{\bar\sigma_{t-1}}^2 }\right) {\z_{t-1}}^T \z_{t-1} +2
          \left(\frac{ \rc{\gamma_t} }{ 1-\rc{\gamma_t}^2 }\z_t +  \frac{ \rc{\bar\gamma_{t-1}} }{\rc{\bar\sigma_{t-1}}^2 }\x\right)^T   \z_{t-1} 
\right ] \kc{\; +\; c} \p \\
\end{align*}$$</p>

The result is a quadratic vector equation in $\z_{t-1}$. To put this in a standard form, we will define 

$$\begin{align*}
\gc{a} &=  \frac{ \rc{\gamma_t}^2 }{ 1-\rc{\gamma_t}^2 }+\frac{ 1 }{ \rc{\bar\sigma_{t-1}}^2 } \\
\gc{\A} &=  \gc{a}\I \\
\gc{\b} &= - 2\frac{ \rc{\gamma_t} }{ 1-\rc{\gamma_t}^2 }\z_t -  2\frac{ \rc{\bar\gamma_{t-1}} }{\rc{\bar\sigma_{t-1}}^2 }\x \p
\end{align*}$$

With this, our equation simplifies to 

<p>$$\kc{-\frac{1}{2}}  \left [ \z_{t-1} \gc{\A}\z_{t-1} + \gc{\b} ^T\z_{t-1} \right] \kc{\; +\; c} \p$$</p>

This is the standard form for a quadratic matrix equation. We can now [complete the square](). The matrix version of completing the square tells us that this is equivalent to 

$$ \kc{-\frac{1}{2}}  \left [ (\z_{t-1}-\bc{\h}) \gc{\A}(\z_{t-1}-\bc{\h}) + \bc{k} \right] \kc{\; +\; c} \p$$

with 

$$ \bc{\h} = -\frac{1}{2}\gc{\A}^{-1}\gc{\b} =- \frac{1}{2\gc{a}} \gc{\b}
$$

and some constant scalar value $\bc{k}$. We don't need to worry about the value of $\bc{k}$, since we can absorb it into $\kc{c}$.

Filling in, and rewriting, we get 

$$\begin{align*} 
\text{log } \rc{q}(\z_{t} \mid \z_{t-1}, \x) 
&= \kc{-\frac{1}{2}} \gc{a} \left [ (\z_{t-1} + \frac{1}{2\gc{a}}\gc{\b})^T(\z_{t-1} + \frac{1}{2\gc{a}}\gc{\b}) \right] \kc{\; +\; c} \\
&= \kc{-\frac{1}{2}} \frac{1}{\bc{\tilde \sigma_t}^2} \| \z_{t-1} - \oc{\tilde\bmu_t} \|^2 \kc{\; +\; c}
\end{align*}$$

with 

$$\begin{align*}
\bc{\tilde\sigma_t}^2 &= \frac{1}{\gc{a}} & \text{ and }\\ 
\oc{\tilde\bmu_t} &= - \frac{1}{2\gc{a}}\gc{\b} \p
\end{align*}$$

<p>This proves the first result: $\rc{q}(\z_{t} \mid \z_{t-1}, \x)$ is proportional to $\text{exp }\kc{-\frac{1}{2}} \frac{1}{\bc{\tilde \sigma}} \| \z_{t-1} - \oc{\tilde\bmu} \|^2$, which shows that it is a spherical Gaussian.</p>

To work out the canonical forms for the <span class="oc">mean</span> and <span class="bc">variance</span>, we can simplify them a little. First for $\gc{a}$

$$\begin{align*}
\gc{a} &= \frac{ \rc{\gamma_t}^2 }{ 1-\rc{\gamma_t}^2 }+\frac{ 1 }{ \rc{\bar\sigma_{t-1}}^2 } \\
&=  \frac{\rc{\gamma_t}^2\rc{\bar\sigma_{t-1}}^2 +1 - \rc{\gamma_t}^2 }{ \rc{\bar\sigma_{t-1}}^2 (1 - \rc{\gamma_t}^2) } \p
\end{align*}$$

Now, remember how $\rc{\sigma_{t-1}}^2$ is defined: a sum with $t-1$ terms, where the $i$-th term is

$$
(1 - \rc{\gamma_i}^2)\rc{\gamma_{i+1}}^2 \cdots \rc{\gamma_{t-1}}^2 \p
$$

If we multiply this sum with $\rc{\gamma_t}$ and add $1-\gamma_{t}^2$ on the end, it exactly fits the definition of $\rc{\bar\sigma_t}$. This gives us 

$$\begin{align*}
\gc{a} &= \frac{ \rc{\bar\sigma_t}^2 }{ \rc{\bar\sigma_{t-1}}^2 (1 - \rc{\gamma_t}^2) }
\end{align*}$$

 and thus
 
$$\begin{align*}
\bc{\tilde\sigma_t}^2 = \frac{1}{\gc{a}} = \frac{ \rc{\bar\sigma_{t-1}}^2 }{ \rc{\bar\sigma_{t}}^2} (1 - \rc{\gamma_t}^2) \p
\end{align*}$$

Next, we look at the mean. This one gets a little hairy, but it dopes ultimately reduce down to quite a clean expression.

<p>$$\begin{align*}
\oc{\tilde\bmu} &= - \frac{1}{2}\gc{\b}\;\cdot\;\frac{1}{\gc{a}} \\
&= \left (
\frac{ \rc{\gamma_t} }{ 1-\rc{\gamma_t}^2 }\z_t + \frac{ \rc{\bar\gamma_{t-1}} }{\rc{\bar\sigma_{t-1}}^2 }\x
\right)\;\cdot\;\frac{ \rc{\bar\sigma_{t-1}}^2 }{ \rc{\bar\sigma_{t}}^2} (1 - \rc{\gamma_t}^2) \\
&= 
\frac{ \rc{\gamma_t} \rc{\bar\sigma_{t-1}}^2\kc{(1 - {\gamma_t}^2}) }{ \kc{(1-{\gamma_t}^2)}\rc{\bar\sigma_{t}}^2 }\z_t + 
\frac{ \rc{\bar\gamma_{t-1}}\kc{\bar\sigma_{t-1}^2}(1 - \rc{\gamma_t}^2) }{\kc{\bar\sigma_{t-1}^2}\rc{\bar\sigma_{t}}^2 }\x
 \\
&= 
\frac{\rc{\gamma_t} (1 - \rc{\bar\gamma_{t-1}}^2)}{1 - \rc{\bar\gamma_t}^2}\z_t \;+\;
\frac{\rc{\bar\gamma_{t-1}} (1-\rc{\gamma_t}^2 ) }{1-\rc{\bar\gamma_t}^2}\x \\
&=
\gc{\frac{1}{\gamma_t}} \frac{ \gc{ {\gamma_t}^2} (1 - \rc{\bar\gamma_{t-1}}^2) }{ 1 - \rc{\bar\gamma_t}^2 } \z_t \;+\;
\gc{\frac{1}{\gamma_t}}  \frac{\overbrace{\gc{\gamma_t}\rc{\bar\gamma_{t-1}}}^{\rc{\bar\gamma_t}}  (1-\rc{\gamma_t}^2 ) }{1-\rc{\bar\gamma_t}^2}\x \\
&=
\frac{1}{\rc{\gamma_t}}\left( \frac{ \rc{\gamma_t}^2 (1 - \rc{\bar\gamma_{t-1}}^2) }{ 1 - \rc{\bar\gamma_t}^2 } \z_t \;+\;
  \frac{\rc{\bar\gamma_{t}}  (1-\rc{\gamma_t}^2 ) }{1-\rc{\bar\gamma_t}^2}\x \right)
\end{align*}$$</p>

In line ... we use that fact that $\rc{\bar\sigma_t}^2 = 1 - \rc{\bar\gamma_t}^2$. Next it turns out that we can get rid of $\x$ by adding in the noise $\s_t$ that was used to generate $z_t$ in the diffusion process. Remember that we can write $\z_t$ as:

$$
\z_t = \rc{\bar\gamma}_t\z_{t-1} \rc{\bar\sigma_t}\s_t
$$

where we have given the standard noise a subscript $t$ to emphasize that this refers ot a specific noise vector sampled during the diffusion process. Rewriting to isolate $\x$, we get 

$$
\x = \frac{1}{\rc{\bar\gamma_t}}(\z_T - \rc{\sigma_t}\s_t) \p
$$

Plugging this into the expression above, and rewriting $\rc{\bar\sigma_t} = \sqrt{1 - \rc{\bar\gamma_t}^2}$, we get 

<p>$$\begin{align*}
\oc{\tilde\bmu} &= \frac{1}{\rc{\gamma_t}} \left[
  \frac{ \rc{\gamma_t}^2 (1 - \rc{\bar\gamma_{t-1}}^2) }{ 1 - \rc{\bar\gamma_t}^2 } \z_t \;+\;
  \frac{\rc{\bar\gamma_{t}}  (1-\rc{\gamma_t}^2 ) }{1-\rc{\bar\gamma_t}^2}
  \frac{1}{\rc{\bar\gamma_t}}\left(\z_T - \sqrt{1 - \rc{\bar\gamma_t}^2}\s_t\right)
\right] \\
&= 
\frac{1}{\rc{\gamma_t}} \left[\left (
  \frac{ \rc{\gamma_t}^2 (1 - \rc{\bar\gamma_{t-1}}^2) }{ 1 - \rc{\bar\gamma_t}^2 } +
  \frac{\kc{\bar\gamma_{t}}  (1-\rc{\gamma_t}^2 ) }{1-\rc{\bar\gamma_t}^2}
  \frac{1}{\kc{\bar\gamma_t}}\right) \z_T - 
  \frac{ \kc{\bar\gamma_{t}}  (1-\rc{\gamma_t}^2 )\sqrt{1 - \rc{\bar\gamma_t}^2} }{(1-\rc{\bar\gamma_t}^2)}\frac{1}{\kc{\bar\gamma_t}}
  \s_t
\right] \\
&= 
\frac{1}{\rc{\gamma_t}} \left[\left (
  \frac{ \kc{{\gamma_t}^2} - \overbrace{ \rc{\gamma_t}^2 \rc{\bar\gamma_{t-1}}^2}^{\rc{\bar\gamma_t}^2} + 1-\kc{{\gamma_t}^2} }{ 1 - \rc{\bar\gamma_t}^2 }
  \right) \z_T - 
  \frac{ 1-\rc{\gamma_t}^2 }{ \sqrt{1-\rc{\bar\gamma_t}^2} }
  \s_t 
\right] \\
&= 
\frac{1}{\rc{\gamma_t}} \left[ \z_T - 
  \frac{ 1-\rc{\gamma_t}^2 }{\sqrt{1-\rc{\bar\gamma_t}^2}}
  \s_t
\right] = \frac{1}{\rc{\gamma_t}} \left( \z_T - 
  \frac{ 1-\rc{\gamma_t}^2 }{\rc{\bar\sigma_t}}
  \s_t
\right)
\end{align*}$$</p>

Which is the canonical form for the mean.<span class="qed"></span>
</div>

{% endraw %}