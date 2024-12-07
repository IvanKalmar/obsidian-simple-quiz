```quiz
{
	"sources": [
		"Kanji.md"
	]
}
```

```quizjs
function kanjiToCard(kanji, pool) {
	return {
		id: kanji.kanji,
		question: {
			left: [
				kanji.kanji, 
				...kanji.meanings
			],
			right: [
				...kanji.readings.hiragana,
				//...kanji.readings.katakana
			]
		},
		pool: pool,
		tags: [`JLPT ${kanji.jlpt}`],
		notReversible: true
	}
}


(async () => {
	const kanjiJSONFile = app.vault.getAbstractFileByPath("kanji.json");
	const kanji = JSON.parse(await app.vault.read(kanjiJSONFile));
	
	
	// Add JLPT 4 and 5 
	kanji.filter((kanji) => {
		return (kanji.jlpt.toString() == "5") || (kanji.jlpt.toString() == "4");
	}).forEach((kanji) => {
		fc.addCard(kanjiToCard(kanji, `JLPT ${kanji.jlpt}`));
	});
	
	
	// Add from table
	const kanjiMdFile = app.vault.getFileByPath("Kanji.md");
	const table = Document.parseHTMLUnsafe(
		await app.vault.read(kanjiMdFile)
	).querySelectorAll(
		"table[id='current']"
	)[0];
	
	const tableKanji = Array.from(table.rows).slice(1).map((row) => {
		return row.cells[1].getText() // Kanji
	});

	kanji.filter((kanji) => {
		return tableKanji.contains(kanji.kanji);
	}).forEach((kanji) => {
		fc.addCard(kanjiToCard(kanji, `Current`));
	});
	
	fc.commit();
}) ();
```

<table id="current">  
<caption>Current</caption>
<tr>  
	<th>JLPT</th>
	<th>漢字</th>  
	<th>訓読み</th>  
	<th>音読み</th>  
	<th>Meanings</th>  
	<th>Example</th>  
</tr> 
<tr>
	<td>4</td>
	<td>使</td>
	<td>づか.い, つか.い, つか.う</td>
	<td>シ</td>
	<td>Пользоваться</td>
	<td>使う、つかう ― Использовать</td>
</tr>
<tr>
	<td>3</td>
	<td>曲</td>
	<td>ま.がる, ま.げる</td>
	<td>キョク, キョ</td>
	<td>Мелодия, Изгиб</td>
	<td>曲がる、まがる ― Поворачивать</td>
</tr>
<tr>
	<td>1</td>
	<td>頑</td>
	<td>かたく</td>
	<td>ガン</td>
	<td>Stubborn</td>
	<td>頑張る、がんばる ― Стараться</td>
</tr>
<tr>
	<td>2</td>
	<td>張</td>
	<td>は.り, ば.り, は.る</td>
	<td>チョウ, チョ</td>
	<td>Натягивать</td>
	<td>頑張る、がんばる ― Стараться</td>
</tr>
<tr>
	<td>4</td>
	<td>帰</td>
	<td>かえ.す, おく.る, かえ.る</td>
	<td>キ</td>
	<td>Возвращаться</td>
	<td>帰る、かえる ― Идти домой</td>
</tr>
<tr>
	<td>2</td>
	<td>床</td>
	<td>とこ, ゆか</td>
	<td>ショ, ショウ</td>
	<td>Пол, Постель</td>
	<td></td>
</tr>
<tr>
	<td>3</td>
	<td>初</td>
	<td>はじ.め, はじ.めて, はつ</td>
	<td>ショ</td>
	<td>Начало, Первый</td>
	<td></td>
</tr>
</table>

```dataviewjs
const table = dv.el("table", "", {});

table.createEl("caption", {
	text: "JLPT 4"
});

const th = table.createEl("tr");
th.createEl("th", { text: "JLPT" });
th.createEl("th", { text: "漢字" });
th.createEl("th", { text: "訓読み" });
th.createEl("th", { text: "音読み" });
th.createEl("th", { text: "Meanings" });

const tFile = app.vault.getAbstractFileByPath("kanji.json");
const kanji = JSON.parse(await app.vault.read(tFile))
	.filter(kanji => kanji.jlpt.toString() == "4")
	.map((kanji) => {
		const tr = table.createEl("tr");
		tr.createEl("td", { text: kanji.jlpt });
		tr.createEl("td", { text: kanji.kanji });
		tr.createEl("td", { text: kanji.kun_yomi.join(", ") });
		tr.createEl("td", { text: kanji.on_yomi.join(", ") });
		tr.createEl("td", { text: kanji.meanings.join(", ") });
	});
```

```dataviewjs
const table = dv.el("table", "", {});

table.createEl("caption", {
	text: "JLPT 5"
});

const th = table.createEl("tr");
th.createEl("th", { text: "JLPT" });
th.createEl("th", { text: "漢字" });
th.createEl("th", { text: "訓読み" });
th.createEl("th", { text: "音読み" });
th.createEl("th", { text: "Meanings" });

const tFile = app.vault.getAbstractFileByPath("kanji.json");
const kanji = JSON.parse(await app.vault.read(tFile))
	.filter(kanji => kanji.jlpt.toString() == "5")
	.map((kanji) => {
		const tr = table.createEl("tr");
		tr.createEl("td", { text: kanji.jlpt });
		tr.createEl("td", { text: kanji.kanji });
		tr.createEl("td", { text: kanji.kun_yomi.join(", ") });
		tr.createEl("td", { text: kanji.on_yomi.join(", ") });
		tr.createEl("td", { text: kanji.meanings.join(", ") });
	});
```
