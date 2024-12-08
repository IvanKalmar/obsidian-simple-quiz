# `quiztoday`
Shows stats, current strak, weekly stats, number of repeated cards and number of quizzes for the current day.

~~~
```quiztoday
{
	"minify": true
}
```
~~~

Arguments: 
- minify: Hides the frame, title, and icon;
- hideCounters: Hides the counter of days, cards and quizzes; 


# `quiz`

Includes a repetition module directly in the note.

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
