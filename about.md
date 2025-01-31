# About

<blockquote>
No matter what I study, I can see patterns. I see the gestalt, the melody within the notes, in everything: mathematics and science, art and music, psychology and sociology. <br/>
&mdash;Ted Chiang, Understand
</blockquote>

Gestalt.ink is a collection of explainers and general knowledge articles written by me, [Peter Bloem](http://peterbloem.nl).

It is intended as a slowly growing and highly incomplete repository of general knowledge, focusing on mathematics, machine learning and physics. Its first aim is to provide an overview which is more or less encyclopedic in style and which allows the reader to jump in at arbitrary points. Each topic is discussed using minimal preliminaries, and with the required preliminaries spelled out explicitly.

<aside>The phrase <em>encyclopedic</em> refers to the intended tone and use. I rarely get the time to write, so there will probably only ever be articles on a small and arbitrary selection of subjects.
</aside>

The second aim, and this is where the name comes from, is to provide understanding through different perspectives. Often, a subject like eigenvectors is explained using one derivation only. For instance: an eigenvector is a vector whose direction doesn't change. While this is accurate and useful, there are many different ways to arrive at the same idea, and many different contexts in which eigenvectors can be used. A true understanding of what eigenvectors are, comes only after you've followed a few of these derivations.

This is what we'll call a _gestalt understanding_: the understanding you get only from having seen different perspectives on the same thing.

A complete article will aim to provide such an understanding in a self-contained way. We'll always start with an executive summary, so if all you need is the basics, you can get them quickly. But, ideally, the longer you keep reading, the more insight you get.

## Guiding principles

The following principles guide our approach to most subjects.
* **Short to long.** The assumption is always that somebody is reading with a purpose. They want to understand some subject in order to use it (possibly in some other gestalt article, possibly somewhere else). This doesn't mean no long, careful explanations, it just means they should be preceded by shorter ones.
* **Minimal and explicit dependencies.** We will minimize as much as possible, how much you already need to know to understand an explanation. We will make all dependencies explicit, ideally including links to other articles. Where necessary we will re-explain required concepts in the context of the current article.
* **From concrete to abstract.** We will start with the most concrete form of something. For instance, we will explain linear algebra subjects using real-valued elements, abstracting to complex numbers or to general fields only later. This doesn't mean we don't deal in abstractions, just that we start with concrete examples and then abstract.
* **Alternative perspectives.** For topics that are well-covered elsewhere, we will try to offer a different way of looking at them. That is, we will not pretend that other text books and tutorials don't exist. Instead, we will focus on what hasn't been said about these topics yet.
* **No payment, no distractions** These articles will be free, there will be no ads, and they will be served in clean, minimal HTML.

## FAQ

**What fonts/typefaces do you use? How can I use them?**

The mathematical typeface is called **[Euler](https://en.wikipedia.org/wiki/AMS_Euler)**. It was designed by Hermann Zapf, and commisioned by Donald Knuth who made the original Tex. Zapf was inspired by the way mathematicians actually write: not italic, like in the standard LaTeX typeface, PC Modern, but upright, so that each character fits inside a clear separate bounding box. I think this makes Euler much more legible than PC Modern, which, due to its italic style has the characters overlapping into the bounding boxes of adjacent characters.

In LaTeX documents you can switch to Euler with a simple `\usepackage{eulervm}`. On the web, using MathJax, [Euler is included by default](https://mrinalcs.github.io/config-mathjax).

The only thing to be aware of when using Euler is that it pairs terribly with the default LaTeX typeface. For this reason you should switch the default typeface as well. There are many options that work well, including Georgia and Palatino.

In my articles and here on Gestalt, I use **[Charter](https://en.wikipedia.org/wiki/Bitstream_Charter)** a beautiful typeface by the great Matthew Carter, who is also responsible for Georgia and Verdana. It is available in LaTeX with `\usepackage{charter}` and on the web through [a simple set of free web fonts](https://practicaltypography.com/charter.html).

**How do you make your figures and plots?**

Plots are made with matplotlib. For an example, see [this notebook](https://github.com/pbloem/gestalt.ink/blob/main/notebooks/gaussians.ipynb), which was used for the article on Gaussians. I save them to SVG, or in rare cases to high-res PNG.

Diagrams are made in Keynote (the Apple alternative to Powerpoint). I export them to PDF and then convert the PDF to SVG with a command-line tool called [pdf2svg](https://github.com/dawbarton/pdf2svg). 

_However_, I'd like to note that in both cases, the tool is the least important aspect of making the figures look the way they do. If you like the look, and would like to do something similar, then there is no need to start investigating Keynote. I only use it because I have made a lot of slides for my lectures, so I can use it very efficiently.  

Almost everything that makes the articles look the way they do has nothing to do with the tools. Most of the time I have to fight the tool quite hard to achieve the look I'm going for. 

So, if you want to achieve a similar look in your own articles, the main thing is to stick to the basic principles of good figure design. I think the most important things I do are:
* **Remove redundant ink.** This is the main principle of [Edward Tufte](https://en.wikipedia.org/wiki/Edward_Tufte)'s philosophy of data visualization. If you can remove it and the meaning of your figure doesn't change, then remove it. A simple example is the lines that matplotlib puts to the top and the right of each plot. The first thing I always to is to remove them. See the notebook for an example. The best way to learn about Tufte's philosophy is to buy his books, but there are some [good resources online](https://www.darkhorseanalytics.com/blog/data-looks-better-naked/) that will help you get the basic idea quickly.
* **Make things line up meaningfully.** This is sometimes called designing _[to a grid](https://en.wikipedia.org/wiki/Grid_(graphic_design))_. It's fancy design talk for the basic idea that things look nice when they line up. One simple example is the left margin of the text. This creates a very prominent line, so things in your figure should line up with that. It's not that difficult to make things line up. More difficult is to make things line up _meaningfully_: this is especially true in diagrams. For example, make sure that the things you want people to compare with each other line up.  
* **Be consistent.** One thing I did was to pick a color scheme for the website, consisting of a red, green, blue, orange and purple, together with a lighter shade for each. I then had to import these colors into my site's CSS, into matplotlib and into Keynote. This is hard work, and most people don't bother, but I find that these kind of tricks significantly improve the cohesion and lessen the cognitive load.
* **Be mindful of information hierarchy** Have a clear idea of what the relative importance of each element is, and make the important things more prominent. You can make things more prominent by making them bigger, but also by putting more whitespace around them, and making sure their color has high contrast to the background.
* **Sweat the details.** The colors are an example of this. Another example is exporting everything to SVG. This is a little extra work. It would be easier to use PNG, like most websites. However, the difference in sharpness is quite remarkable, especially on modern high-resolution screens.
* **Design with pencil and paper.** Almost all the above are achieved not because of your tools, but despite them. You have to fight to make your tool make the picture look the way you want. This incentivices you to be lazy. To accept the default colors and typefaces, because they are right there. To not line things up or remove ink, because it isn't clear how you would do that. To fight this pressure to compromise (and we all compromize, ultimately), it helps to come up with the way the picture should look in a different medium. Ideally one with very different constraints, such as pencil and paper. This way, you come up with what you want first, and when your tool fights you when the time comes to implement the figure, you will know you need to fight back.   

These are just same starting pointers. The main takeaway is that if you want to take this sort of thing seriously, it's a process. You start with a commitment to making things look clean and attractive, and then you start learning how to do it. You read blogs and follow designers on social media and you buy books on various related topics. The good news is that the basics are relatively simple, and if you commit to learning them you will pick up the first 80% of good design with 20% of the total effort. The rest is a lifelong journey.
