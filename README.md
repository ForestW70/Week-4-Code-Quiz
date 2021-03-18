# Forest Wilson - Homework 4 - Code Quiz

Are you able to complete the worlds hardest coding quiz? To score with high marks, use your knowledge about types of code, code trivia, and general useless knowledge, becuase coming up with questions is hard! If you have done better than a previous session,  you can submit your highscore to display until you submit a new higher score.

## Comments

Writing out the JS to this one took much longer than I thought it would be so there were some visual aspects that I wanted to include such as indicators telling you you're correct and a more descriptive end screen if you did not win or get highscore, but I'm happy with how the looks work in this application.

I know that one of the critera of the homework was to be able to implement a leaderboard to which you can add your highscore + name to, but I had an issue figuring out how to submit the same type of data in the local storage but under different names, or rather storing more than one highscore without deleting another. I decided to just opt for a display highscore feature that will store and show the current highscore. If your score is higher than that it will replace the value, but if it is lower in value it does not replace.

Would have also liked to add a value in the highscore object that displays time left when you submitted your highscore, but I'll have to save that for the future.

<!-- note to self: do not use highscore as an attribute, especially if you cant spell. You will have a bad time. -->

## bugs

when you get a new score that is equivilent to your current highscore, it will replace even though it is not a higher score. something with my Number.parse opperator I imagine.

## Screenshots

![start screen](./assets/images/first-screen.png)
![Active screen](./assets/images/quiz-in-progress.png)

## Relevant links

[live site](https://forestw70.github.io/hw4codequiz/)
[repo](https://github.com/ForestW70/hw4codequiz)