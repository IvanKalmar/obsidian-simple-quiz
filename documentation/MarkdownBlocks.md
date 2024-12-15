# `quiztoday`
Daily stats:
- Current streak days count;
- Number of repeated cards in current day;
- Number of quizzes in current day;
- Week streak; 


~~~
```quiztoday
{
	"minify": true,
	"hideCounters": false
}
```
~~~

Arguments: 
- minify: Hides the frame, title, and icon;
- hideCounters: Hides the counter of days, cards and quizzes; 


# `quizcharts`
Global stats:
- Number of repeated cards for each day of the month;
- Number of cards by status
- Progression of card statuses for each day of the year
~~~
```quizcharts
{
	"minify": true,
	"sources": [
		"test/"
	]
}
```
~~~

Arguments:
- minify: Hides the frame, title, and icon;
- sources: List of files or directories from where to get cards;


# `quiz`

Place a repetition frame directly in the note.

~~~
```quiz
{
	"sources": [
		"Kanji.md"
	],
	"hideTitle": true
}
```
~~~

Arguments:
- sources: List of files or directories from where to get cards;
- hideTitle: Hides block title;
