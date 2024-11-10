---
Title: Overfitting
---

# Overfitting

Overfitting is a crucial concept in machine learning. It happens when a model performs very well on the data it has been trained on, but very poorly on any new data. Speaking metaphorically, an overfitting model has _remembered_ all the training data, but it has _learned_ nothing. You can compare this to a student who memorizes the answers to the practice exam without understanding any of it. They will get a perfect score on the practice exam, but they will do terribly on the real exam.

The opposite of overfitting is _generalization_: learning something that transfers beyond the data you've trained on. The simplest type is generalization to the _test data_: this is data that has been taken from the exact same source as the <span class="gc">training data</span>, but withheld from the model until training is finished. If the model does well on the <span class="bc">test data</span>, it has generalized and learned something from its <span class="gc">training data</span>.

The difference between the performance on the <span class="gc">training data</span> and the performance on the <span class="bc">test data</span> is called the _generalization gap_. The main aim of machine learning is to make the generalization gap as small as possible. 

## <span class="oc">Validation</span> data

Usually, we don't just train a single machine learning model. We want to try a bunch of different models, and for each model we want to different bunch of settings. For example, we might want to try a naive Bayes model, and try it with different smoothing values, and then we want to try a neural network, and test the neural network with different learning rates.

These are called _hyperparameters_: the settings of the model that we don't learn from the data but choose ourselves. 

<aside>You can think of the choice of model (naive Bayes or neural network) as just another hyperparameter.
</aside>

The problem is that if we test all of these variations on the <span class="bc">test data</span>, and then pick the one that does best, we are in danger of overfitting again. One way of thinking about this is that we are ourselves functioning as a learning algorithm for the hyperparameters: trying different ones, and fitting them to the data by observing how well they work. The problem is that we're fitting them to the <span class="bc">test data</span>. That means that if we do well on the test data after a lot of hyperparameter tuning, we have no way of telling whether we've somehow overfit the training data, or learned things that are likely to generalize to new settings.

You may think that there is little danger of this: there aren't many hyperparameters, so they don't offer a lot of freedom to "store" all the specific details of the test data that won't generalize to new data. And this is basically true. It's why, for a long time, machine learning worked just with <span class="bc">test</span> and <span class="gc">training data</span>. However, this changes when datasets became benchmarks. Consider the famous [MNIST data set](https://yann.lecun.com/exdb/mnist/). The website shows a _long_ list of models that at one time or another held the record. 

This shows that we're no longer talking about just tuning a learning rate or a weight decay parameter. Whole archtectural additions to neural networks are tested and compared on single datasets. After decades of this, we are in serious danger of overfitting. Put differently, are we building architectures that do well specifically on MNIST, or are we building architectures that do well on generic computer vision tasks?    

One part of the solution is to do your hyperparameter tuning on the <span class="gc">training data</span>. That doesn't mean you evaluate on the data you've trained on, it means that you split your training data into two pieces, and withhold one. The withheld part is called your <span class="oc">validation data</span>.

Then, you check how well different hyperparameters settings are doing by training on the <span class="gc">remaining training data</span> and evaluating on the <span class="oc">validation data</span>. You never touch your test data throughout the whole process of hyperparameter tuning.

Only when you are finished, and you have made your final choice of model, you run one last evaluation on your <span class="bc">test data</span>.   

<figure class="centering">
<img src="/images/validation.svg" class="full">
</figure>

<aside>When you run this final evaluation, you usually train on the combination of your <span class="gc">training data</span> and <span class="oc">validation data</span>, but in some cases this is not allowed. If you're working with a standard machine learning benchmark, you should check the original instructions that the benchmark came with.  
</aside>

It's important to understand that using a validation set will help you detect overfitting, but it won't prevent overfitting. If you do a huge amount of very specific hyperparameter tuning, you will still overfit, but you will overfit on the <span class="oc">validation set</span>. You can then find out that this has happened by evaluating on the <span class="bc">test set</span>, but ideally, of course, the overfitting shouldn't happen at all. 

How to make sure that there is no overfitting is more of an art than a science at the moment. As a first rule, you should keep your hyperparameter choices relatively simple and not tune your network too much. another helpful trick is to tune on multiple datasets at the same time, and keep the hyperparameters the same between datasets as much as possible. 

<aside markdown="1">You can also see overfitting as an instance of multiple testing. This perspective is explained in [the third lecture of the MLVU course](https://mlvu.github.io/evaluation). 
</aside>

## Out-of-distribution

Beyond the test data, we can also think about how our model generalizes to data that doesn't come from _exactly_ the same source that our training data came from. This is called _out-of-distribution (OOD)_ performance. It's usually very important to keep in mind. Imagine, for example, that you are building a spam classifier for email. You start by getting a large dataset of emails which have been categorized into ham and spam. You withhold some of them for your test data and then start training.

Once you get good performance on your test data, you will probably want to _deploy_ your model. For example, build it into an email client to automatically move suspected spam to the spam directory. In that setting, your model won't see the exact same _kind_ of emails that you saw in training. For one thing, the user will probably not be one of the users from whom you collected the training data. For another, the dataset is probably at least a few years old and the trends in spam email will have changed. 

In short, the data you see after you've finished tuning and training your model will be at least a little different from your training setting. This means that your model always needs to generalize _beyond_ the test data. How much it needs to generalize depends on your setting. In some cases, like the spam problem, it might just be minor changes. In others, there might be massive shifts: like whole new classes of objects that weren't seen before.

Consider, for instance, an object detection task, where one class of objects is "bikes", and in the training data we only see bicycles, but not motorcycles. Then, we evaluate the model in a setting where there are also motorcycles, which should be classified as "bikes" as well. There are many similarities--two wheels, one rider a seat and handlebars---but many differences as well motorbikes have engines, their riders wear full-face helmets, and they will be seen on the highway. It depends entirely on context which differences a model should ignore and which it should latch on to. For this reason, out-of-distribution learning is an active area of research.

## Further reading

The business of overfitting and generalization is also discussed in [the opening lecture of the MLVU course on machine learning](https://mlvu.github.io/introduction/#video-107). The need for a <span class="oc">validation set</span> is explained in more detail [in the third lecture](https://mlvu.github.io/evaluation). 





