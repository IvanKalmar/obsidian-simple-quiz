<br/>

```dataviewjs

const input = dv.el(
	"input", 
	"", 
	{
		attr: { 
			type: "text",
			placeholder: "そら",
			style: "width: 100%; margin-bottom: 5px; border: none; outline: none; box-shadow: none; padding: 20px; margin-bottom: 15px;",
		} 
	}
);

const button = dv.el(
	"button", 
	"Search!",
	{
		attr: { 
			class: "CustomButton",
			style: "margin-bottom: 15px; width: 100%;",
		} 
	}
);

const container = dv.el(
	"div", 
	"",
	{
		attr: { 
			style: "width: 100%;",
		} 
	}
);

button.onclick = async () => {
	const search = input.value.trim().toLocaleLowerCase();
	if(search.length == 0) {
		return;
	}

	container.empty();
	
	const pages = Array.from(dv.pages()).map(file => {
		let page = file.file;
		if(!page.path.startsWith("Kanji")) {
			return null;
		}
		return page;
	}).filter(page => {
		return Boolean(page);
	}).reverse();
	
	const documents = await Promise.all(pages.map(async (page) => {
		return {
			title: page.name,
			document: Document.parseHTMLUnsafe(await dv.io.load(page.path))
		}
	}));

	for(const document of documents) {
		const kanjiContainer = dv.el(
			"div", 
			"",
			{
				attr: { 
					class: "kanji-container noto-sans-jp-font",
					style: "width: 100%;",
				} 
			}
		);

		let addedTitle = false;
		let emptyKanjiContainer = true;
		
		for(let kanjiItem of document.document.getElementsByClassName("kanji-item")) {
			let contains = false;
		    for(let content of getText(kanjiItem)) {

if(content.includes(search)) {
				    contains = true;
				    break;
			    }
		    }
			if(contains) {
				if(!addedTitle) {
					container.append(dv.el(
						"h1", 
						document.title
					));
					addedTitle = true;
				}
				kanjiContainer.append(kanjiItem);
				emptyKanjiContainer = false;
			}
		}

		if(!emptyKanjiContainer) {
			container.append(kanjiContainer);
		}
	}	
};



function getText(node_) {
	let textNodes = []
	function pushTextNode(node) {
	  if (node.nodeName === "#text") {
	    const nodeVal = node.nodeValue.trim();
	    if (nodeVal) {
	      textNodes.push(nodeVal);
	    }
	    return;
	  }
	  node.childNodes.forEach((childNode) => {
	    pushTextNode(childNode)
	  });
	}
	pushTextNode(node_);
	return textNodes;
}

```

<br/>

```quizjs

const pages = app.vault.getFiles().map(file => {
	if(!file.path.startsWith("Kanji")) {
		return null;
	}
	return file;
}).filter(page => {
	return Boolean(page);
}).reverse();

const documents = await Promise.all(pages.map(async (page) => {
	const content = await app.vault.read(page);
	return {
		title: page.name.replace(".md", ""),
		document: Document.parseHTMLUnsafe(content)
	}
}));

let flashcards = [];
for(const document of documents) {
	const kanjis = document.document.getElementsByClassName("kanji-item");
	for(let kanjiItem of kanjis) {
		const kanji = kanjiItem.getElementsByClassName("kanji-value")[0].innerText;
		const meanings = Array.from(kanjiItem.getElementsByClassName("kanji-item-meaning")[0].children).map(el => el.innerText.trim());
		const readings = Array.from(kanjiItem.getElementsByClassName("kanji-item-reading")[0].children).map(el => el.innerText.trim());
		flashcards.push({
			question: {
				left: [kanji, ...meanings],
				right: readings
			},
			pool: "kanji",
			tags: [document.title.toString()],
			notReversible: true
		});
	}
}

return flashcards;

```
