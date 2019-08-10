# Team Treehouse Report Card
Shows progress bars and badges for your username on teamtreehouse.com
An example of JSON, Javascript and jQuery using HTML/CSS (Bootstrap 4) interface.

![Treehouse Report Card and Badges](https://nikimolnar.uk/github/img/report_card.jpg)

## Configuration
Open the file:
```js/config.js```

###### Enter your Username
Change the userName variable from 'XXXXX' to your username, e.g. 
```
var userName = 'myUserName';
```
###### Number of Badges to Show
The default number of badges to show is
```
var showBadges = 'all';
```
You may change this to a number if you wish, e.g.
```
var showBadges = 16;
```
*Do not include the apostrophes '' if entering a number*

###### Progress Bar Minimum Value
Only subjects with a minimum points total of 1000 will show by default. You can change this to 0 to show all progress bars, or to whatever value you want, e.g.
```
var minPointsShow = 250;
