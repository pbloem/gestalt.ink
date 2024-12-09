---
title: Category theory
summary: ""
---

# Category theory

Preliminaries:
* Set theory

Status:
* This is all wrong. Ignore it. 

## Summary

**Category theory** is a mathematical language for talking about a certain kind of abstract object, called a _category_. It's a bit like set theory or group theory, in that the objects of study (sets, groups, category) are so abstract that it's hard to give a quick, intuitive idea of what it's about. However, their definition is simple, and once you properly internalize it, you see that the definition fits a lot of natural objects, especially mathematical ones.

<aside>We start with an informal, slightly incomplete definition to gives you a rough picture. We'll make this precise later. </aside>

A category consists of dots and arrows drawn between those dots. In more fancy language, these are called _objects_ and _morphisms_, but we'll stick with dots and arrows for now. This may remind you of a directed graph, and indeed a category can be drawn as a directed graph, but it comes with some extra restrictions. 

First, the arrows are labeled with types. You can think of these as relations between the dots. One relation might be <code>mother_of</code>, if the dots represent people. So far, this just gives us a special type of graph, sometimes called a knowledge graph. From one dot, there is only ever one outgoing arrow of any given type. This allows us to think of the arrow $f$ as a function from the dot $a$ it originates from, to the dot $b$ to which it points: $f(a) = b$. The set of inputs of $f$ is the set $A$ of all dots that have it as an outgoing arrow, and the set of all outputs is the set of all dots it points to $B$. If our graph is a proper category, then we can talk about composition of these functions.
For example, $g(f(a))$, or $(g \circ f)(a)$ describes a two-hop path through the graph, following dot a to dot b, and then dot $b$ to dot $$, assuming that there is a $g$ arrow between $b$ and $c$.

For every composition of two arrow types, the resulting "connection" between two dots is also an arrow in the category with a special type. This is where we start to deviate from how knowledge graphs are usually drawn. For example, if we have the relation mother_of and father_of, the composition of these two, is usually labeled grandparent, or ancestor, if it is labeled at all. In a categories, this arrow must exist, and what's more, it's a special arrow type: the mother of my father is separate from the mother of my mother or the father of my mother. All these relations get a special name, and all of them are arrows in the category. Note that we can only compose to types if the output set of one is equal to the input set of the other. 

<aside>This means it very quickly becomes impossible to draw a category of any complexity fully.
</aside>

Another place where categories are a little more elaborate than knowledge graphs are in the identity links: arrows from a dot to itself. In knowledge graphs, this link is at best implied, but very rarely included. In categories, not only is the identity link required for each dot, each dot gets an identity arrow _with its own type_. For every dot in the category, there is a special, separate relation that points from the dot to itself. We'll Call this relation $i_x$ for dot $x$.

<aside>This means that if you have a category with 5 dots, you must have at least 5 types of arrows. 
</aside>

Now we come to the two main properties of categories: unitality and associativity.

Unitality
:  When seen as a function, any identity should have the properties that $i_x \circ f = f$ and $f \circ i_x$ for every $x$ and $f$ in the category. This simply says that following an identity arrow and then another arrow of type $f$ lands you at the same dot as just following the $f$ arrow, and vice versa. 

Associativity
: If we have three arrow types, $f$, $g$ and $h$, such that $f$ can be composed with $g$ and $g$ can be composed with $h$, then $f \circ (g \circ h) = (f \circ g) \circ h$. 

For both properties, it may be hard to see how this can not be the case for a directed graph with the required properties. They key here is that most categories don't start out as a directed graph, but as a set of functions on a set of objects. What we want to check then, is if we can draw these two sets as a directed graph that forms a category. If unitality and associativity hold, then the answer is yes.

## Learning category theory

Looking at the summary above, you may wonder what the big deal is about category theory, and why it can be such a struggle to learn. The definition is just a special case of a directed graph with colors links. The main issue, for my money at least, is not that a category is such a complex object, but that category theory builds everything out of categories. Once you get to grips with the basic idea of a category, you then have to start building categories whose dots are themselves categories, of whose arrow are categories, or both. Then, as soon as you're comfortable with that idea, you'll build another category out of those categories, and so on, all the while mixing up the arrows and dots at one level of the hierarchy with the arrows and dots at all the other levels.

It's a bit like learning set theory. A set is a very simple thing, but once you start talking about sets containing other sets, you need to give yourself a little time to get to grips with that idea. This is not because the idea itself is so complicated. It's about as challenging as accepting that you can put a box inside another box. However, to really understand sets-of-sets properly takes a little practice. Is the set containing the empty set itself empty? Is it the same as the set containing two empty sets? The answer is no, but it takes while before that is obvious.

The reason, I think, is that we need to _internalize_ the idea of a set. It's not enough to understand the principle, it need to become something akin to a subroutine in our brain. It's the difference between knowing the principle of typing---I press a key and the corresponding letter appears on the screen---and being able to type while your brain is fully occupied with composing the text. 

The latter simply takes practice. There's no getting away from it. There are a lot of good explainers about category theory out there, but if you really want to learn what it's _about_, to climb the ladder of categories within categories, you need to practice. 

That is how we'll structure this article: relatively brief definitions and explainers, followed by exercises that can help you to internalize them, before we move on. For more extensive explanations, I strongly recommend Eugenia Chang's The Joy of Abstraction. 

## The proper definition of a category

