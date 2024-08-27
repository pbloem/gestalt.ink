---
title: Diffusion models
summary: ""
---

# Diffusion models

**Diffusion models** are a remarkably effective approach to generative modeling. In the field of image generation almost all the recently released, headline-grabbing models like DALL&middot;E 2 and 3, Midjourney and Stable Diffusion, are diffusion models.

* toc
{:toc}


## Summary

Diffusion models are based on a very simple idea. Take an image from your dataset, and add a little noise to it. Then add some more noise and some more noise and so on, until at the end, all the information in the original image has disappeared. All we are left with is an image of _pure noise_.

Next, train a neural network to _reverse_ this proces. Given a noisy image at any stage, its job is to predict what the slightly less noisy image was that came before. 

Once the network has been trained successfully, we can use it to _sample_. We generate an image of pure noise, and feed it to the network to "remove" some of the noise. Then we feed the resulting image to the network again, to remove some more of the noise and so on. 

Even though the noise we started with didn't come from adding noise to an existing image---we just sampled pure noise---since the network is trained to remove noise, it will start to insert realistic image detail in place of the noise it removes.

<aside>To keep things concrete, we will stick mostly to the task of generative modeling for images, which is what diffusion models are most famous for. However, the same principles have been applied to many other domains, like audio, natural langauge and graphs. 
</aside>

#### [part 1: Naive diffusion](./naive-diffusion)
The basic idea behind diffusion is as simple as that. If you understand how neural networks work, it doesn't require any further mathematics to implement a basic diffusion model. We will call this basic, math-free approach _naive diffusion_. We'll start there and build a fully functioning diffusion model without any mathematical analysis, appealing only to intuition.

#### [part 2: Understanding Gaussians*](./gaussians)
Next, we'll see how adding in some mathematics can make our life easier. The primary ingredient here, is the use of _Gaussian noise_, that is, noise coming from a Gaussian, or _normal_ distribution. Gaussians have many useful properties, which we will detail below, which allow us to analyze the diffusion process mathematically. The math can be a little hairy at times, but as we will see, it often results in algorithms that are both simpler, and more efficient.

If you feel you already have a strong grasp of Gaussians and how they behave, you can safely skip this step.

#### [part 3: Gaussian diffusion](./gaussian-diffusion)

This is the foundation of almost all visual diffusion models today. The key idea is to corrupt your images with Gaussian noise. The result is that, with a little analysis, we can make our algorithm more simple, and more powerful in many places.

#### [part 4: DDIM sampling](./ddim)

Then, we will look at **DDIM sampling**: a new sampling approach for diffusion models that helps to mitigate some of its downsides. Specifically, DDIM sampling can reduce the time it takes to get a good sample out of a diffusion model, and it can give us a latent space in which we can smoothly interpolate, the same way we do with GANs and VAEs. 

#### [part 4: Guided diffusion](./guided-diffusion)

Finally, we'll look at **guided diffusion**. Diffusion that is based on some condition given to the model, like a class, or even a short natural language description. Guided diffusion is what image generation models use to generate images based on user descriptions in models like DALL&middot;E, MidJourney and Stable Diffusion.




### A Gaussian diffusion process

## DDIM sampling and continuous-time diffusion

### DDIM sampling

### Continuous time diffusion

## Guidance

### Score models

### Classifier guidance

### Classifier-free guidance

## Further reading

## References

[CoordConv]

## Appendix