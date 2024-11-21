# Simple Quiz
![Obsidian](https://img.shields.io/badge/Obsidian-%23483699.svg?style=for-the-badge&logo=obsidian&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) <img src="https://img.shields.io/static/v1?label=License&message=MIT&color=3DDC84&style=for-the-badge" /> <img src="https://img.shields.io/static/v1?label=Version&message=0.1.1&color=3DDC84&style=for-the-badge" /> <br/><br/>
Quiz plugin for [Obsidian](https://obsidian.md). <br/>
Allows you to easily create sets of flashcards for repetition. <br/>
Currently only flashcards with manual input are supported.


## Definition
### Card fields
```json5
{
	id: "uniqueID",  // Card unique id, if empty create automatically;
	title: "title",  // Card title;
	question: {
		left: ['Question', ...],  // Left question options;
		right: ['Answer', ...]  // Right question options;
	},
	pool: "pool",  // Card pool;
	tags: ["tag1", "tag2", ...],  // Array of tags;
	defaultSide: "left",  // If card not reversible, then that side will be considered questions;
	notReversible: true  // If card reversible, then the questions and answers will switch places;
}
```

### JSON
Defining a card using json
~~~
```quizjson
[
  {
	"question": {
		"left": ["question1", "subQuestion1"],
		"right": ["answer1", "answer2", "answer3"]
	},
	"pool": "testPool1",
	"tags": ["exampleTag1", "exampleTag2", "exampleTag3"],
	"notReversible": true
  }
]
```
~~~
Renders to
<p align="center">
	<img src="images/preview_json.png" style="width: 80%;"/>
</p>

### JS
Defining a card using js. <br/>
Must be enabled from settings. <br/>
The `fs` object is available in the code, through which the loading occurs. <br/>
	The `addCard` method gets a card object. 
	After adding all the necessary cards, `commit` is called.


~~~
```quizjs

for(let i = 0; i < 100; i++) {
	fc.addCard({
		question: {
			left: [`question${i}`],
			right: [`answer${i}`]
		},
		pool: "testPool2",
		tags: [`exampleTag${i}`]
	});
}

fc.commit();
```
~~~

Renders to
<p align="center">
	<img src="images/preview_js.png" style="width: 80%;"/>
</p>

<b>See more at examples</b>


## Running quiz
You can start a quiz for a set of cards from their placeholder. <br/>
Or, you can run a quiz for all cards from the side menu, or by command `Simple Quiz:Run quiz!`. </br>
In the menu that opens, you can select specific cards to repeat, or by pools or by tags. </br>
You can also specify how many cards out of the total number will be shown at a time. </br>
Cards are sorted by percentage of successful answers. </br>
<p align="center">
	<img src="images/selection.png" style="width: 80%;"/>
</p>

## TODO
- [ ] Add new card types
  - [ ] Manually cards
  - [ ] Matching cards
  - [ ] Option select cards
- [ ] Add images to cards
- [ ] Add statistics charts  

## Manually installing the plugin
- Copy over `main.js`, `styles.css`, `manifest.json`, to `<vault>/.obsidian/plugins/simple-quiz/`.
