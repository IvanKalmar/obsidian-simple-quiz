```quiztoday
{
	"minify": true
}
```

```quiz
{
	"sources": [
		"Table.md"
	]
}
```

```quizjs
(async () => {
	const tableFile = app.vault.getFileByPath("Table.md");
	const table = Document.parseHTMLUnsafe(
		await app.vault.read(tableFile)
	).querySelectorAll(
		"table[id='example-words']"
	)[0];
	
	Array.from(table.rows).slice(1).map((row) => {
		return {
			"漢字": row.cells[0].getText(),
			"仮名": row.cells[1].getText(),
		}
	}).forEach((word) => {
		fc.addCard({
			id: `${word['漢字']}-${word['仮名']}`,
			question: {
				left: [
					word['漢字']
				],
				right: [
					word['仮名']
				]
			},
			pool: "Words",
			tags: ["Names"]
		});
	})

	fc.commit();
}) ();
```

<table id="example-words" style="width: 100%; --table-cell-vertical-alignment: middle;">  
	<tr>
        <th>漢字</th>
        <th>仮名</th>
    </tr>
    <tr>
	    <th>山下</th>
		<td>やました</td>
    </tr>
	<tr>
		<th>山口</th>
		<td>やまぐち</td>
	</tr>
	<tr>
		<th>広瀬</th>
		<td>ひろせ</td>
	</tr>
	<tr>
		<th>香美</th>
		<td>こうみ</td>
	</tr>
	<tr>
		<th>上田</th>
		<td>うえだ</td>
	</tr>
	<tr>
		<th>秋成]</th>
		<td>あきなり</td>
	</tr>
	<tr>
		<th>初音</th>
		<td>はつね</td>
	</tr>
</table>
