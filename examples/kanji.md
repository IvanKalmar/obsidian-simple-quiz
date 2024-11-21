
```quizjs

(async () => {
	const file = this.app.vault.getFileByPath("kanji.md");
	const fileContent = await app.vault.read(file);
	const document = Document.parseHTMLUnsafe(fileContent);
	const table = document.getElementsByTagName("table")[0];
	const rows = table.getElementsByTagName("tr");

	// Skip header
	for(let i = 1; i < rows.length; i++) {
		const row = rows[i].getElementsByTagName("td");
		const jlpt = row[0].getText();
		const kanji = row[1].getText();
		const meanings = row[2].getText().split(",").map(t => t.trim());
		const readingsOn = row[3].getText().split(",").map(t => t.trim());
		const readingsKun = row[4].getText().split(",").map(t => t.trim());
		fc.addCard({
			id: kanji,  // Kanji as id
			question: {
				left: [
					kanji,
					...meanings
				],
				right: [
					...readingsOn,
					...readingsKun
				]
			},
			pool: "Kanji",
			tags: [`JLPT ${jlpt}`],  // JLPT as tag
			notReversible: true  // Ask only readings
		});
	}
	
	fc.commit();
})()

```


<table>
	<tr>
		<th>JLPT</th>
		<th>Kanji</th>
		<th>Meanings</th>
		<th>Readings On</th>
		<th>Readings Kun</th>
	</tr>
	<tr>
		<td>5</td>
		<td>一</td>
		<td>один</td>
		<td>イツ, イチ</td>
		<td>ひと.つ, ひと</td>
	</tr>
	<tr>
		<td>5</td>
		<td>二</td>
		<td>два</td>
		<td>ニ, ジ</td>
		<td>ふたた.び, ふた, ふた.つ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>三</td>
		<td>три</td>
		<td>ゾウ, サン</td>
		<td>み, みっ.つ, み.つ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>四</td>
		<td>четыре</td>
		<td>シ</td>
		<td>よ, よっ.つ, よん, よ.つ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>五</td>
		<td>пять</td>
		<td>ゴ</td>
		<td>いつ, いつ.つ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>六</td>
		<td>шесть</td>
		<td>リク, ロク</td>
		<td>むい, む.つ, む, むっ.つ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>七</td>
		<td>семь</td>
		<td>シチ</td>
		<td>なな.つ, なの, なな</td>
	</tr>
	<tr>
		<td>5</td>
		<td>八</td>
		<td>восемь</td>
		<td>ハチ</td>
		<td>やっ.つ, や.つ, よう, や</td>
	</tr>
	<tr>
		<td>5</td>
		<td>九</td>
		<td>девять</td>
		<td>キュ, キュウ, ク</td>
		<td>ここの, ここの.つ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>十</td>
		<td>десять</td>
		<td>ジュ, ジュウ, ジッ, ジュッ</td>
		<td>とお, と</td>
	</tr>
	<tr>
		<td>5</td>
		<td>人</td>
		<td>человек</td>
		<td>ニン, ジン</td>
		<td>り, と, ひと</td>
	</tr>
	<tr>
		<td>5</td>
		<td>今</td>
		<td>сейчас</td>
		<td>キン, コン</td>
		<td>いま</td>
	</tr>
	<tr>
		<td>5</td>
		<td>日</td>
		<td>солнце, день</td>
		<td>ジツ, ニチ</td>
		<td>ひ, か, び</td>
	</tr>
	<tr>
		<td>5</td>
		<td>週</td>
		<td>неделя</td>
		<td>シュウ, シュ</td>
		<td></td>
	</tr>
	<tr>
		<td>5</td>
		<td>月</td>
		<td>месяц, луна</td>
		<td>ゲツ, ガツ</td>
		<td>つき</td>
	</tr>
	<tr>
		<td>5</td>
		<td>年</td>
		<td>возраст, год</td>
		<td>ネン</td>
		<td>とし</td>
	</tr>
	<tr>
		<td>5</td>
		<td>中</td>
		<td>середина, в течение, во время, внутри</td>
		<td>チュウ, チュ</td>
		<td>あた.る, うち, なか</td>
	</tr>
	<tr>
		<td>5</td>
		<td>山</td>
		<td>гора</td>
		<td>セン, サン</td>
		<td>やま</td>
	</tr>
	<tr>
		<td>5</td>
		<td>川</td>
		<td>река</td>
		<td>セン</td>
		<td>かわ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>左</td>
		<td>лево</td>
		<td>シャ, サ</td>
		<td>ひだり</td>
	</tr>
	<tr>
		<td>5</td>
		<td>右</td>
		<td>право</td>
		<td>ウ, ユー, ユウ</td>
		<td>みぎ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>大</td>
		<td>большой</td>
		<td>ダイ, タイ</td>
		<td>おお.いに, おお.きい, おお</td>
	</tr>
	<tr>
		<td>5</td>
		<td>木</td>
		<td>дерево</td>
		<td>ボク, モク</td>
		<td>き, こ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>本</td>
		<td>книга, источник, этот, истинный</td>
		<td>ホン</td>
		<td>もと</td>
	</tr>
	<tr>
		<td>5</td>
		<td>水</td>
		<td>вода</td>
		<td>スイ</td>
		<td>みず</td>
	</tr>
	<tr>
		<td>5</td>
		<td>火</td>
		<td>огонь</td>
		<td>カ</td>
		<td>ひ, ほ, び</td>
	</tr>
	<tr>
		<td>5</td>
		<td>父</td>
		<td>отец</td>
		<td>フ</td>
		<td>ちち</td>
	</tr>
	<tr>
		<td>5</td>
		<td>母</td>
		<td>мать</td>
		<td>ボ</td>
		<td>も, はは</td>
	</tr>
	<tr>
		<td>5</td>
		<td>耳</td>
		<td>ухо</td>
		<td>ジ</td>
		<td>みみ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>口</td>
		<td>язык/речь, рот, уста, отверстие</td>
		<td>コウ, コー, ク</td>
		<td>くち</td>
	</tr>
	<tr>
		<td>5</td>
		<td>休</td>
		<td>отдых</td>
		<td>キュ, キュウ</td>
		<td>やす.める, やす.まる, やす.む</td>
	</tr>
	<tr>
		<td>5</td>
		<td>何</td>
		<td>что</td>
		<td>カ</td>
		<td>なに, なん</td>
	</tr>
	<tr>
		<td>5</td>
		<td>入</td>
		<td>вход</td>
		<td>ニュ, ジュ, ニュウ</td>
		<td>い.れる, い.り, い.れ, はい.る, い.る</td>
	</tr>
	<tr>
		<td>5</td>
		<td>上</td>
		<td>верх</td>
		<td>ジョ, シャン, ジョウ, ショウ</td>
		<td>のぼ.る, うえ, あ.げる, かみ, うわ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>前</td>
		<td>впереди, до</td>
		<td>ゼン</td>
		<td>まえ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>下</td>
		<td>низ</td>
		<td>ゲ, カ</td>
		<td>した, さ.げる, しも, お.りる, さ.がる, くだ.さる, もと</td>
	</tr>
	<tr>
		<td>5</td>
		<td>千</td>
		<td>тысяча</td>
		<td>セン</td>
		<td>ち</td>
	</tr>
	<tr>
		<td>5</td>
		<td>午</td>
		<td>полдень</td>
		<td>ゴ</td>
		<td>うま</td>
	</tr>
	<tr>
		<td>5</td>
		<td>友</td>
		<td>друг</td>
		<td>ユウ, ユー</td>
		<td>とも</td>
	</tr>
	<tr>
		<td>5</td>
		<td>古</td>
		<td>старый</td>
		<td>コ</td>
		<td>ふる.す, ふる.い</td>
	</tr>
	<tr>
		<td>5</td>
		<td>名</td>
		<td>имя, название</td>
		<td>ミョウ, ミョ, メイ</td>
		<td>な</td>
	</tr>
	<tr>
		<td>5</td>
		<td>国</td>
		<td>страна</td>
		<td>コク</td>
		<td>くに</td>
	</tr>
	<tr>
		<td>5</td>
		<td>外</td>
		<td>исключение, иностранный, снаружи</td>
		<td>ゲ, ガイ</td>
		<td>はず.れる, はず.す, そと, ほか</td>
	</tr>
	<tr>
		<td>5</td>
		<td>女</td>
		<td>женщина</td>
		<td>ニョ, ジョ, ニョウ</td>
		<td>おんな, め</td>
	</tr>
	<tr>
		<td>5</td>
		<td>男</td>
		<td>мужчина</td>
		<td>ダン, ナン</td>
		<td>おとこ, お</td>
	</tr>
	<tr>
		<td>5</td>
		<td>子</td>
		<td>детёныш, ребёнок</td>
		<td>ス, ツ, シ</td>
		<td>ね, こ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>学</td>
		<td>наука, учиться</td>
		<td>ガク</td>
		<td>まな.ぶ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>生</td>
		<td>рождаться, студент, жизнь</td>
		<td>ショウ, ショ, セイ</td>
		<td>う.まれる, い.ける, い.かす, い.きる, は.やす</td>
	</tr>
	<tr>
		<td>5</td>
		<td>小</td>
		<td>маленький</td>
		<td>ショ, ショウ</td>
		<td>ちい.さい, こ, お, さ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>書</td>
		<td>писать</td>
		<td>ショ</td>
		<td>か.く, が.き</td>
	</tr>
	<tr>
		<td>5</td>
		<td>毎</td>
		<td>каждый</td>
		<td>マイ</td>
		<td>ごと.に, ごと</td>
	</tr>
	<tr>
		<td>5</td>
		<td>先</td>
		<td>далее, впереди, предыдущий, кончик, опережение, некоторое время назад</td>
		<td>セン</td>
		<td>さき, ま.ず</td>
	</tr>
	<tr>
		<td>5</td>
		<td>会</td>
		<td>собрание, встреча</td>
		<td>カイ, エ</td>
		<td>あつ.まる, あ.う, あ.わせる</td>
	</tr>
	<tr>
		<td>5</td>
		<td>万</td>
		<td>десять тысяч</td>
		<td>バン, マン</td>
		<td>よろず</td>
	</tr>
	<tr>
		<td>5</td>
		<td>円</td>
		<td>круглый</td>
		<td>エン</td>
		<td>まど.か, まる, まる.い, まど</td>
	</tr>
	<tr>
		<td>5</td>
		<td>出</td>
		<td>выход</td>
		<td>シュ, スイ, シュツ</td>
		<td>で.る, だ.す, で, い.でる</td>
	</tr>
	<tr>
		<td>5</td>
		<td>分</td>
		<td>доля, понимать, минута</td>
		<td>フン, ブン, ブ</td>
		<td>わ.かる, わ.かれる, わ.ける, わ.け</td>
	</tr>
	<tr>
		<td>5</td>
		<td>北</td>
		<td>север</td>
		<td>ホク</td>
		<td>きた</td>
	</tr>
	<tr>
		<td>5</td>
		<td>半</td>
		<td>половина</td>
		<td>ハン</td>
		<td>なか.ば</td>
	</tr>
	<tr>
		<td>5</td>
		<td>南</td>
		<td>юг</td>
		<td>ナ, ナン</td>
		<td>みなみ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>土</td>
		<td>почва, земля</td>
		<td>ド, ト</td>
		<td>つち</td>
	</tr>
	<tr>
		<td>5</td>
		<td>多</td>
		<td>много</td>
		<td>タ</td>
		<td>まさ.に, おお.い, まさ.る</td>
	</tr>
	<tr>
		<td>5</td>
		<td>天</td>
		<td>небеса, природа, погода</td>
		<td>テン</td>
		<td>あま, あめ, あまつ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>安</td>
		<td>безопасный, дешёвый, спокойный</td>
		<td>アン</td>
		<td>やす, やす.い, やす.まる</td>
	</tr>
	<tr>
		<td>5</td>
		<td>少</td>
		<td>немного, юность, мало</td>
		<td>ショ, ショウ</td>
		<td>すこ.し, すく.ない</td>
	</tr>
	<tr>
		<td>5</td>
		<td>店</td>
		<td>магазин</td>
		<td>テン</td>
		<td>みせ, たな</td>
	</tr>
	<tr>
		<td>5</td>
		<td>後</td>
		<td>сзади, после</td>
		<td>コウ, コー, ゴ</td>
		<td>うしろ, おく.れる, のち, あと, うし.ろ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>手</td>
		<td>рука</td>
		<td>ズ, シュ</td>
		<td>て, た</td>
	</tr>
	<tr>
		<td>5</td>
		<td>新</td>
		<td>новый</td>
		<td>シン</td>
		<td>あたら.しい, あら.た, あら</td>
	</tr>
	<tr>
		<td>5</td>
		<td>時</td>
		<td>время, час</td>
		<td>ジ</td>
		<td>どき, とき</td>
	</tr>
	<tr>
		<td>5</td>
		<td>来</td>
		<td>приходить</td>
		<td>ライ, タイ</td>
		<td>きた.す, きた.る, く.る</td>
	</tr>
	<tr>
		<td>5</td>
		<td>東</td>
		<td>восток</td>
		<td>トー, トウ</td>
		<td>ひがし</td>
	</tr>
	<tr>
		<td>5</td>
		<td>校</td>
		<td>школа</td>
		<td>コウ, キョウ, コー</td>
		<td></td>
	</tr>
	<tr>
		<td>5</td>
		<td>気</td>
		<td>духовная сила, дух, энергия, воздух</td>
		<td>キ, ケ</td>
		<td>いき</td>
	</tr>
	<tr>
		<td>5</td>
		<td>白</td>
		<td>белый, невинность, невиновность</td>
		<td>ハク, ビャク, ビャ</td>
		<td>しら, しろ, しろ.い</td>
	</tr>
	<tr>
		<td>5</td>
		<td>百</td>
		<td>сто</td>
		<td>ビャク, ヒャ, ヒャク</td>
		<td>もも</td>
	</tr>
	<tr>
		<td>5</td>
		<td>目</td>
		<td>глаз</td>
		<td>ボク, モク</td>
		<td>ま, め</td>
	</tr>
	<tr>
		<td>5</td>
		<td>社</td>
		<td>святилище, компания, общество</td>
		<td>シャ</td>
		<td>やしろ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>空</td>
		<td>пустота, небо</td>
		<td>クウ, クー</td>
		<td>そら, から, あ.ける, あ.き, あ.く</td>
	</tr>
	<tr>
		<td>5</td>
		<td>立</td>
		<td>вставать, стоять</td>
		<td>リットル, リツ, リュウ</td>
		<td>た.て, た.てる, た.つ, た.ち</td>
	</tr>
	<tr>
		<td>5</td>
		<td>聞</td>
		<td>слышать</td>
		<td>モン, ブン</td>
		<td>き.く, き.こえる</td>
	</tr>
	<tr>
		<td>5</td>
		<td>花</td>
		<td>цветок</td>
		<td>ケ, カ</td>
		<td>はな</td>
	</tr>
	<tr>
		<td>5</td>
		<td>行</td>
		<td>идти</td>
		<td>ギョウ, ギョ, アン, コウ, コー</td>
		<td>い.き, い.く, ゆ.き, おこな.う, ゆ.く</td>
	</tr>
	<tr>
		<td>5</td>
		<td>西</td>
		<td>запад</td>
		<td>ス, セイ, サイ</td>
		<td>にし</td>
	</tr>
	<tr>
		<td>5</td>
		<td>見</td>
		<td>видеть</td>
		<td>ケン</td>
		<td>み.る, み.える, み.せる</td>
	</tr>
	<tr>
		<td>5</td>
		<td>言</td>
		<td>сказать</td>
		<td>ゲン, ゴン</td>
		<td>い.う, こと</td>
	</tr>
	<tr>
		<td>5</td>
		<td>話</td>
		<td>разговор</td>
		<td>ワ</td>
		<td>はな.す, はなし</td>
	</tr>
	<tr>
		<td>5</td>
		<td>語</td>
		<td>язык, слово</td>
		<td>ゴ</td>
		<td>かた.らう, かた.る</td>
	</tr>
	<tr>
		<td>5</td>
		<td>読</td>
		<td>читать</td>
		<td>トク, トウ, ドク</td>
		<td>よ.む</td>
	</tr>
	<tr>
		<td>5</td>
		<td>買</td>
		<td>покупать</td>
		<td>バイ</td>
		<td>か.う</td>
	</tr>
	<tr>
		<td>5</td>
		<td>足</td>
		<td>нога</td>
		<td>ソク</td>
		<td>た.る, た.す, あし, た.りる</td>
	</tr>
	<tr>
		<td>5</td>
		<td>車</td>
		<td>машина, колёсное транспортное средство, повозка</td>
		<td>シャ</td>
		<td>くるま</td>
	</tr>
	<tr>
		<td>5</td>
		<td>道</td>
		<td>дорога, область искусства</td>
		<td>ドウ, トウ, ドー</td>
		<td>みち</td>
	</tr>
	<tr>
		<td>5</td>
		<td>金</td>
		<td>деньги, золото</td>
		<td>キン, コン, ゴン</td>
		<td>かね, がね, かな</td>
	</tr>
	<tr>
		<td>5</td>
		<td>長</td>
		<td>начальник, длинный</td>
		<td>チョウ, チョ</td>
		<td>おさ, なが.い</td>
	</tr>
	<tr>
		<td>5</td>
		<td>間</td>
		<td>промежуток, комната</td>
		<td>ケン, カン</td>
		<td>あいだ, ま, あい</td>
	</tr>
	<tr>
		<td>5</td>
		<td>雨</td>
		<td>дождь</td>
		<td>ウ</td>
		<td>あま, あめ, さめ</td>
	</tr>
	<tr>
		<td>5</td>
		<td>電</td>
		<td>электричество</td>
		<td>デン</td>
		<td></td>
	</tr>
	<tr>
		<td>5</td>
		<td>食</td>
		<td>еда</td>
		<td>ショク, ジキ, ショ</td>
		<td>く.らう, は.む, た.べる, く.う</td>
	</tr>
	<tr>
		<td>5</td>
		<td>飲</td>
		<td>пить</td>
		<td>イン, オン</td>
		<td>の.み, の.む</td>
	</tr>
	<tr>
		<td>5</td>
		<td>駅</td>
		<td>вокзал</td>
		<td>エキ</td>
		<td></td>
	</tr>
	<tr>
		<td>5</td>
		<td>高</td>
		<td>высокий</td>
		<td>コウ, コー</td>
		<td>たか, だか.まる, たか.い</td>
	</tr>
	<tr>
		<td>5</td>
		<td>魚</td>
		<td>рыба</td>
		<td>ギョ</td>
		<td>うお, さかな, ざかな</td>
	</tr>
	<tr>
		<td>4</td>
		<td>力</td>
		<td>сила</td>
		<td>リイ, リョ, リキ, リョク</td>
		<td>りき.む, ちから</td>
	</tr>
	<tr>
		<td>4</td>
		<td>夕</td>
		<td>вечер</td>
		<td>セキ</td>
		<td>ゆう</td>
	</tr>
	<tr>
		<td>4</td>
		<td>工</td>
		<td>ремесло</td>
		<td>ク, コウ, グ, コー</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>元</td>
		<td>начало, основа, исток</td>
		<td>ガン, ゲン</td>
		<td>もと</td>
	</tr>
	<tr>
		<td>4</td>
		<td>止</td>
		<td>остановиться</td>
		<td>シ</td>
		<td>と.める, や.む, と.まる, ど.まり</td>
	</tr>
	<tr>
		<td>4</td>
		<td>引</td>
		<td>тянуть</td>
		<td>イン</td>
		<td>ひ.き, ひ.ける, ひ.く, び.き</td>
	</tr>
	<tr>
		<td>4</td>
		<td>牛</td>
		<td>корова</td>
		<td>ギュ, ギュウ</td>
		<td>うし</td>
	</tr>
	<tr>
		<td>4</td>
		<td>区</td>
		<td>район</td>
		<td>オウ, コウ, ク</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>犬</td>
		<td>собака</td>
		<td>ケン</td>
		<td>いぬ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>不</td>
		<td>не (говоря о чём-то плохом)</td>
		<td>フ, ブ</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>文</td>
		<td>фраза, письменность, текст, культура</td>
		<td>モン, ブン</td>
		<td>ふみ, あや</td>
	</tr>
	<tr>
		<td>4</td>
		<td>方</td>
		<td>направление, квадрат, способ</td>
		<td>ホー, ホウ</td>
		<td>がた, かた</td>
	</tr>
	<tr>
		<td>4</td>
		<td>心</td>
		<td>сердце, центр, чувство, сердцевина</td>
		<td>シン</td>
		<td>ごころ, こころ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>切</td>
		<td>резать</td>
		<td>セツ, サイ</td>
		<td>ぎ.り, き.り, き.る, き.れる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>太</td>
		<td>большой, великий, толстый</td>
		<td>タイ, タ</td>
		<td>ふと.る, ふと.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>代</td>
		<td>эпоха, плата, менять местами</td>
		<td>ダイ, タイ</td>
		<td>よ, か.わる, かわ.る, かわ.り</td>
	</tr>
	<tr>
		<td>4</td>
		<td>台</td>
		<td>возвышение, подставка</td>
		<td>ダイ, タイ</td>
		<td>うてな, つかさ, われ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>世</td>
		<td>эпоха, мир, поколение</td>
		<td>セ, ソウ, セイ</td>
		<td>さんじゅう, よ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>正</td>
		<td>справедливый, правильный, верный</td>
		<td>ショウ, ショ, セイ</td>
		<td>ただ.しい, ただ.す, まさ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>田</td>
		<td>рисовое поле</td>
		<td>デン</td>
		<td>た</td>
	</tr>
	<tr>
		<td>4</td>
		<td>冬</td>
		<td>зима</td>
		<td>トー, トウ</td>
		<td>ふゆ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>民</td>
		<td>народ</td>
		<td>ミン</td>
		<td>たみ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>用</td>
		<td>дело, использовать</td>
		<td>ヨウ, ヨー</td>
		<td>もち.いる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>兄</td>
		<td>старший брат</td>
		<td>キョウ, ケイ</td>
		<td>あに</td>
	</tr>
	<tr>
		<td>4</td>
		<td>以</td>
		<td>префикс направления, посредством</td>
		<td>イ</td>
		<td>もっ.て</td>
	</tr>
	<tr>
		<td>4</td>
		<td>去</td>
		<td>уходить</td>
		<td>コ, キョ</td>
		<td>さ.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>仕</td>
		<td>служить, делать</td>
		<td>シ, ジ</td>
		<td>つか.える</td>
	</tr>
	<tr>
		<td>4</td>
		<td>市</td>
		<td>город (крупный), рынок</td>
		<td>シ</td>
		<td>いち</td>
	</tr>
	<tr>
		<td>4</td>
		<td>広</td>
		<td>широкий</td>
		<td>コウ, コー</td>
		<td>ひろ.める, ひろ.い, ひろ.まる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>主</td>
		<td>хозяин</td>
		<td>シュウ, シュ, ス</td>
		<td>おも, ぬし, あるじ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>写</td>
		<td>копировать</td>
		<td>シャ, ジャ</td>
		<td>うつ.る, うつ.し, うつ, うつ.す</td>
	</tr>
	<tr>
		<td>4</td>
		<td>字</td>
		<td>знак, буква</td>
		<td>ジ</td>
		<td>あざな, な, あざ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>自</td>
		<td>личный, свободный, свой, сам</td>
		<td>シ, ジ</td>
		<td>みずか.ら, おの.ずから</td>
	</tr>
	<tr>
		<td>4</td>
		<td>考</td>
		<td>размышлять</td>
		<td>コウ, コー</td>
		<td>かんが.え, かんが.える</td>
	</tr>
	<tr>
		<td>4</td>
		<td>合</td>
		<td>соединять, подходить</td>
		<td>ゴー, カッ, ガッ, ゴウ</td>
		<td>あ.い, あ.う, あ.わす</td>
	</tr>
	<tr>
		<td>4</td>
		<td>光</td>
		<td>сияние, свет</td>
		<td>コウ, コー</td>
		<td>ひか.る, ひかり</td>
	</tr>
	<tr>
		<td>4</td>
		<td>好</td>
		<td>нравиться</td>
		<td>コウ, コー</td>
		<td>よ.い, い.い, す.く, この.む</td>
	</tr>
	<tr>
		<td>4</td>
		<td>死</td>
		<td>смерть</td>
		<td>シ</td>
		<td>し.ぬ, し.に</td>
	</tr>
	<tr>
		<td>4</td>
		<td>回</td>
		<td>вращать, раз</td>
		<td>カイ, エ</td>
		<td>まわ.す, まわ.り, まわ.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>有</td>
		<td>быть, иметь</td>
		<td>ウ, ユー, ユウ</td>
		<td>あ.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>同</td>
		<td>вышеупомянутый, одинаковый</td>
		<td>ドウ, ドー</td>
		<td>おな.じ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>肉</td>
		<td>телесный, мясо, физический</td>
		<td>ニク</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>色</td>
		<td>секс, цвет, любовь</td>
		<td>シキ, ショク, ショ</td>
		<td>いろ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>早</td>
		<td>рано, быстро</td>
		<td>サッ, ソウ, ソー</td>
		<td>はや.まる, はや.い, はや</td>
	</tr>
	<tr>
		<td>4</td>
		<td>地</td>
		<td>почва, земля</td>
		<td>ジ, チ</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>池</td>
		<td>пруд, водоем</td>
		<td>チ</td>
		<td>いけ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>村</td>
		<td>деревня</td>
		<td>ソン</td>
		<td>むら</td>
	</tr>
	<tr>
		<td>4</td>
		<td>体</td>
		<td>вещество, корпус, тело</td>
		<td>テイ, タイ</td>
		<td>からだ, かたち</td>
	</tr>
	<tr>
		<td>4</td>
		<td>町</td>
		<td>город (небольшой)</td>
		<td>チョウ, チョ</td>
		<td>まち</td>
	</tr>
	<tr>
		<td>4</td>
		<td>低</td>
		<td>низкий</td>
		<td>テイ</td>
		<td>ひく.い, ひく.まる, ひく.める</td>
	</tr>
	<tr>
		<td>4</td>
		<td>弟</td>
		<td>ученик, младший брат</td>
		<td>ダイ, テイ, デ</td>
		<td>おとうと</td>
	</tr>
	<tr>
		<td>4</td>
		<td>走</td>
		<td>бежать</td>
		<td>ソウ, ソー</td>
		<td>はし.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>赤</td>
		<td>красный</td>
		<td>セキ, シャク</td>
		<td>あか, あか.らむ, あか.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>図</td>
		<td>план, карта, чертёж</td>
		<td>ズ, ト</td>
		<td>はか.る, え</td>
	</tr>
	<tr>
		<td>4</td>
		<td>究</td>
		<td>исследовать</td>
		<td>キュ, キュウ, ク</td>
		<td>きわ.める</td>
	</tr>
	<tr>
		<td>4</td>
		<td>声</td>
		<td>голос</td>
		<td>ショウ, セイ</td>
		<td>こえ, こわ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>売</td>
		<td>продавать</td>
		<td>バイ</td>
		<td>う.れる, う.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>別</td>
		<td>расставаться, другой, отделяться</td>
		<td>ベツ</td>
		<td>わか.れる, わ.ける</td>
	</tr>
	<tr>
		<td>4</td>
		<td>医</td>
		<td>доктор</td>
		<td>イ</td>
		<td>い.する, い.やす, くすし</td>
	</tr>
	<tr>
		<td>4</td>
		<td>近</td>
		<td>близкий</td>
		<td>キン, コン</td>
		<td>ちか.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>私</td>
		<td>личный, свой, я</td>
		<td>シ</td>
		<td>わたし, わたくし</td>
	</tr>
	<tr>
		<td>4</td>
		<td>作</td>
		<td>создавать</td>
		<td>サク, サ</td>
		<td>づく.り, つく.る, つく.り</td>
	</tr>
	<tr>
		<td>4</td>
		<td>住</td>
		<td>проживать, жить</td>
		<td>ジュ, ジュウ, ヂュウ, チュウ</td>
		<td>す.まう, ず.まい, す.む</td>
	</tr>
	<tr>
		<td>4</td>
		<td>者</td>
		<td>человек, некто</td>
		<td>シャ</td>
		<td>もの</td>
	</tr>
	<tr>
		<td>4</td>
		<td>事</td>
		<td>дело, обстоятельство</td>
		<td>ズ, ジ</td>
		<td>つか.える, こと, つか.う</td>
	</tr>
	<tr>
		<td>4</td>
		<td>使</td>
		<td>пользоваться</td>
		<td>シ</td>
		<td>づか.い, つか.い, つか.う</td>
	</tr>
	<tr>
		<td>4</td>
		<td>始</td>
		<td>начинаться</td>
		<td>シ</td>
		<td>はじ.める, はじ.まる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>姉</td>
		<td>старшая сестра</td>
		<td>シ</td>
		<td>あね, はは</td>
	</tr>
	<tr>
		<td>4</td>
		<td>英</td>
		<td>Англия, талант</td>
		<td>エイ</td>
		<td>はなぶさ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>京</td>
		<td>столица</td>
		<td>キン, ケイ, キョウ, キョ</td>
		<td>みやこ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>画</td>
		<td>черта, рисовать, картина</td>
		<td>エ, ガ, カイ, カク</td>
		<td>えが.く, かぎ.る, かく.する</td>
	</tr>
	<tr>
		<td>4</td>
		<td>妹</td>
		<td>младшая сестра</td>
		<td>マイ</td>
		<td>いもうと</td>
	</tr>
	<tr>
		<td>4</td>
		<td>味</td>
		<td>вкус</td>
		<td>ミ</td>
		<td>あじ.わう, あじ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>服</td>
		<td>одежда, подчинение</td>
		<td>フク</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>物</td>
		<td>вещь</td>
		<td>モツ, ブツ</td>
		<td>もの</td>
	</tr>
	<tr>
		<td>4</td>
		<td>歩</td>
		<td>шагать</td>
		<td>フ, ホ, ブ</td>
		<td>ある.く, あゆ.む</td>
	</tr>
	<tr>
		<td>4</td>
		<td>門</td>
		<td>ворота, школа, род</td>
		<td>モン</td>
		<td>と, かど</td>
	</tr>
	<tr>
		<td>4</td>
		<td>夜</td>
		<td>ночь</td>
		<td>ヤ</td>
		<td>よる, よ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>明</td>
		<td>яркий, мудрость, очевидный</td>
		<td>ミョウ, ミン, ミョ, メイ</td>
		<td>あ.かり, あか.るい</td>
	</tr>
	<tr>
		<td>4</td>
		<td>林</td>
		<td>роща</td>
		<td>リン</td>
		<td>はやし</td>
	</tr>
	<tr>
		<td>4</td>
		<td>青</td>
		<td>голубой, синий</td>
		<td>ショウ, セイ</td>
		<td>あお.い, あお</td>
	</tr>
	<tr>
		<td>4</td>
		<td>所</td>
		<td>учреждение, место</td>
		<td>ショ</td>
		<td>どころ, ところ, とこ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>注</td>
		<td>запись, наливать, заказ</td>
		<td>チュウ, チュ</td>
		<td>つ.ぐ, さ.す, そそ.ぐ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>知</td>
		<td>знать</td>
		<td>チ</td>
		<td>し.らせる, し.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>昼</td>
		<td>день (дневное время)</td>
		<td>チュウ, チュ</td>
		<td>ひる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>茶</td>
		<td>беспорядок, чай</td>
		<td>チャ, サ</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>待</td>
		<td>ждать</td>
		<td>タイ</td>
		<td>ま.ち, ま.つ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>洗</td>
		<td>мыть, стирать</td>
		<td>セン</td>
		<td>あら.う</td>
	</tr>
	<tr>
		<td>4</td>
		<td>送</td>
		<td>провожать, посылать</td>
		<td>ソウ, ソー</td>
		<td>おく.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>品</td>
		<td>качество чего-либо, товар</td>
		<td>ヒン, ホン</td>
		<td>しな</td>
	</tr>
	<tr>
		<td>4</td>
		<td>洋</td>
		<td>океан</td>
		<td>ヨウ, ヨー</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>便</td>
		<td>почта, выделения, удобство</td>
		<td>ベン, ビン</td>
		<td>たよ.り</td>
	</tr>
	<tr>
		<td>4</td>
		<td>風</td>
		<td>обычаи, манера, ветер, вид</td>
		<td>フ, フウ, フー</td>
		<td>かざ, かぜ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>発</td>
		<td>вырабатывать, выявлять, отправляться, развивать, испускать</td>
		<td>ハツ, ホツ</td>
		<td>あば.く, た.つ, おこ.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>度</td>
		<td>градус, величина, раз</td>
		<td>タク, ド, ト</td>
		<td>たび, た.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>映</td>
		<td>отражаться</td>
		<td>エイ</td>
		<td>うつ.る, は.える, うつ.す</td>
	</tr>
	<tr>
		<td>4</td>
		<td>海</td>
		<td>море</td>
		<td>カイ</td>
		<td>うみ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>界</td>
		<td>граница, мир, физ. поле</td>
		<td>カイ</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>屋</td>
		<td>дом, крыша</td>
		<td>オク</td>
		<td>や</td>
	</tr>
	<tr>
		<td>4</td>
		<td>音</td>
		<td>звук</td>
		<td>イン, オン, -ノン</td>
		<td>ね, おと</td>
	</tr>
	<tr>
		<td>4</td>
		<td>急</td>
		<td>спешить</td>
		<td>キュ, キュウ</td>
		<td>いそ.ぎ, いそ.ぐ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>計</td>
		<td>мерить</td>
		<td>ケイ</td>
		<td>はか.る, はか.らう</td>
	</tr>
	<tr>
		<td>4</td>
		<td>建</td>
		<td>строить</td>
		<td>コン, ケン</td>
		<td>た.て, だ.て, た.てる, た.つ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>研</td>
		<td>точить, изучать</td>
		<td>ケン</td>
		<td>と.ぐ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>県</td>
		<td>префектура</td>
		<td>ケン</td>
		<td>か.ける</td>
	</tr>
	<tr>
		<td>4</td>
		<td>思</td>
		<td>думать</td>
		<td>シ</td>
		<td>おもえら.く, おも.う, おぼ.す</td>
	</tr>
	<tr>
		<td>4</td>
		<td>乗</td>
		<td>возводить в степень, ехать, умножать</td>
		<td>ジョ, ジョウ, ショウ</td>
		<td>の.る, の.せる, の.り</td>
	</tr>
	<tr>
		<td>4</td>
		<td>重</td>
		<td>тяжёлый</td>
		<td>チョウ, ジュ, ジュウ, チョ</td>
		<td>おも.い, え, おも.なう, おも.り, かさ.ねる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>春</td>
		<td>страсть, эротика, весна</td>
		<td>シュ, シュン</td>
		<td>はる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>室</td>
		<td>комната</td>
		<td>シツ</td>
		<td>むろ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>持</td>
		<td>держать, иметь</td>
		<td>ジ</td>
		<td>も.つ, も.ち, も.てる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>首</td>
		<td>шея, главный</td>
		<td>シュ</td>
		<td>くび</td>
	</tr>
	<tr>
		<td>4</td>
		<td>秋</td>
		<td>осень</td>
		<td>シュウ, シュ</td>
		<td>とき, あき</td>
	</tr>
	<tr>
		<td>4</td>
		<td>借</td>
		<td>брать взаймы</td>
		<td>シャ, シャク</td>
		<td>か.りる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>弱</td>
		<td>слабый</td>
		<td>ジャク, ジャ</td>
		<td>よわ.まる, よわ.る, よわ.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>紙</td>
		<td>бумага</td>
		<td>シ</td>
		<td>かみ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>帰</td>
		<td>возвращаться</td>
		<td>キ</td>
		<td>かえ.す, おく.る, かえ.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>起</td>
		<td>просыпаться, начинаться, подниматься</td>
		<td>キ</td>
		<td>お.こる, お.こす, お.きる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>夏</td>
		<td>лето</td>
		<td>ゲ, ガ, カ</td>
		<td>なつ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>家</td>
		<td>суффикс для людей, дом</td>
		<td>カ, ケ</td>
		<td>いえ, うち, や</td>
	</tr>
	<tr>
		<td>4</td>
		<td>院</td>
		<td>учреждение, парламент</td>
		<td>イン</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>員</td>
		<td>член, работник, сотрудник</td>
		<td>イン</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>病</td>
		<td>болеть</td>
		<td>ビョウ, ビョ, ヘイ</td>
		<td>や.み, や.む, やまい</td>
	</tr>
	<tr>
		<td>4</td>
		<td>勉</td>
		<td>стараться</td>
		<td>ベン</td>
		<td>つと.める</td>
	</tr>
	<tr>
		<td>4</td>
		<td>特</td>
		<td>особый</td>
		<td>トク</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>旅</td>
		<td>путешествие</td>
		<td>リョ</td>
		<td>たび</td>
	</tr>
	<tr>
		<td>4</td>
		<td>料</td>
		<td>материал, оплата</td>
		<td>リョ, リョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>真</td>
		<td>усиляющий префикс, правда, прямой, честный</td>
		<td>シン</td>
		<td>ま, まこと</td>
	</tr>
	<tr>
		<td>4</td>
		<td>通</td>
		<td>проезжать, проходить, знаток, улица, общепринятый</td>
		<td>ツ, ツー, ツウ</td>
		<td>とお.る, とお.り, かよ.う</td>
	</tr>
	<tr>
		<td>4</td>
		<td>鳥</td>
		<td>птица</td>
		<td>チョウ, チョ</td>
		<td>とり</td>
	</tr>
	<tr>
		<td>4</td>
		<td>転</td>
		<td>переходить во что-нибудь, катиться, падать</td>
		<td>テン</td>
		<td>ころ.がる, ころ.げる</td>
	</tr>
	<tr>
		<td>4</td>
		<td>族</td>
		<td>семья, племя</td>
		<td>ゾク</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>進</td>
		<td>продвигаться</td>
		<td>シン</td>
		<td>すす.む, すす.める</td>
	</tr>
	<tr>
		<td>4</td>
		<td>理</td>
		<td>теория, принцип, управление чем-то, закон, разум</td>
		<td>リ</td>
		<td>ことわり</td>
	</tr>
	<tr>
		<td>4</td>
		<td>野</td>
		<td>дикий, поле</td>
		<td>ヤ, ショ</td>
		<td>の</td>
	</tr>
	<tr>
		<td>4</td>
		<td>問</td>
		<td>вопрос</td>
		<td>モン</td>
		<td>と.う, とん, と.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>都</td>
		<td>город, столица</td>
		<td>ツ, ト</td>
		<td>みやこ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>堂</td>
		<td>зал</td>
		<td>ドウ, ドー</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>動</td>
		<td>двигаться</td>
		<td>ドウ, ドー</td>
		<td>うご.く, うご.かす</td>
	</tr>
	<tr>
		<td>4</td>
		<td>悪</td>
		<td>плохой</td>
		<td>アク, オ</td>
		<td>にく.い, あ.し, わる, わる.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>強</td>
		<td>сильный</td>
		<td>ゴー, キョウ, ゴウ, キョ</td>
		<td>つよ.める, つよ.まる, つよ.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>教</td>
		<td>преподавать, учить</td>
		<td>キョウ, キョ</td>
		<td>おそ.わる, おし.える</td>
	</tr>
	<tr>
		<td>4</td>
		<td>産</td>
		<td>рождать, имущество</td>
		<td>サン</td>
		<td>む.す, う.む, う.まれる, うぶ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>黒</td>
		<td>чёрный</td>
		<td>コク</td>
		<td>くろ.ずむ, くろ, くろ.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>菜</td>
		<td>закуска, овощи, зелень</td>
		<td>サイ</td>
		<td>な</td>
	</tr>
	<tr>
		<td>4</td>
		<td>終</td>
		<td>конец</td>
		<td>シュウ, シュ</td>
		<td>お.える, お.わる, おわ.る</td>
	</tr>
	<tr>
		<td>4</td>
		<td>習</td>
		<td>учиться</td>
		<td>シュウ, シュ, ジュ</td>
		<td>なら.う, なら.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>集</td>
		<td>собирать</td>
		<td>シュウ, シュ</td>
		<td>つど.う, あつ.まる, あつ.める</td>
	</tr>
	<tr>
		<td>4</td>
		<td>場</td>
		<td>физ. поле, место, рынок</td>
		<td>チョウ, ジョ, ジョウ</td>
		<td>ば</td>
	</tr>
	<tr>
		<td>4</td>
		<td>寒</td>
		<td>холодный</td>
		<td>カン</td>
		<td>さむ.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>軽</td>
		<td>лёгкий</td>
		<td>ケイ</td>
		<td>かろ.やか, かる.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>運</td>
		<td>судьба, двигаться, удача, перевозить</td>
		<td>ウン</td>
		<td>はこ.ぶ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>開</td>
		<td>открывать</td>
		<td>カイ</td>
		<td>ひら.ける, ひら.き, ひら.く, あ.く</td>
	</tr>
	<tr>
		<td>4</td>
		<td>飯</td>
		<td>варёный рис, еда</td>
		<td>ハン</td>
		<td>めし</td>
	</tr>
	<tr>
		<td>4</td>
		<td>答</td>
		<td>ответ</td>
		<td>トー, トウ</td>
		<td>こた.える, こた.え</td>
	</tr>
	<tr>
		<td>4</td>
		<td>森</td>
		<td>лес</td>
		<td>シン</td>
		<td>もり</td>
	</tr>
	<tr>
		<td>4</td>
		<td>暑</td>
		<td>горячий, жаркий</td>
		<td>ショ</td>
		<td>あつ.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>朝</td>
		<td>утро</td>
		<td>チョウ, チョ</td>
		<td>あさ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>貸</td>
		<td>одалживать</td>
		<td>タイ</td>
		<td>か.す, か.し</td>
	</tr>
	<tr>
		<td>4</td>
		<td>着</td>
		<td>надевать, прилипать, носить, прибывать</td>
		<td>チャ, ジャク, チャク</td>
		<td>き.せる, ぎ, つ.く, き.る, き.せ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>短</td>
		<td>короткий, недостаток</td>
		<td>タン</td>
		<td>みじか.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>働</td>
		<td>работа</td>
		<td>リュク, リョク, ドウ, リキ, ドー, ロク</td>
		<td>はたら.く</td>
	</tr>
	<tr>
		<td>4</td>
		<td>楽</td>
		<td>удовольствие, музыка</td>
		<td>ゴウ, ラク, ガク</td>
		<td>たの.しむ, たの.しい, この.む</td>
	</tr>
	<tr>
		<td>4</td>
		<td>暗</td>
		<td>тёмный</td>
		<td>アン</td>
		<td>くら.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>意</td>
		<td>намерение, мысль, смысл</td>
		<td>イ</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>遠</td>
		<td>далёкий</td>
		<td>エン, オン</td>
		<td>とお.い</td>
	</tr>
	<tr>
		<td>4</td>
		<td>漢</td>
		<td>китайский, суффикс для людей (чаще неодобрительный)</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>業</td>
		<td>дело, промышленность</td>
		<td>ゴー, ギョウ, ギョ, ゴウ</td>
		<td>わざ</td>
	</tr>
	<tr>
		<td>4</td>
		<td>試</td>
		<td>испытание</td>
		<td>シ</td>
		<td>こころ.みる, ため.す</td>
	</tr>
	<tr>
		<td>4</td>
		<td>銀</td>
		<td>серебро</td>
		<td>ギン</td>
		<td>しろがね</td>
	</tr>
	<tr>
		<td>4</td>
		<td>歌</td>
		<td>песня</td>
		<td>カ</td>
		<td>うた.う, うた</td>
	</tr>
	<tr>
		<td>4</td>
		<td>説</td>
		<td>объяснять, убеждать, теория</td>
		<td>ゼイ, セツ</td>
		<td>と.く</td>
	</tr>
	<tr>
		<td>4</td>
		<td>質</td>
		<td>качественность, качество, материя, характер</td>
		<td>シツ, シチ, チ</td>
		<td>ただ.す, わりふ, たち, もと</td>
	</tr>
	<tr>
		<td>4</td>
		<td>館</td>
		<td>общественное здание</td>
		<td>カン</td>
		<td>たて, やかた</td>
	</tr>
	<tr>
		<td>4</td>
		<td>親</td>
		<td>родство, родитель, дружба, близость</td>
		<td>シン</td>
		<td>した.しむ, した.しい, おや</td>
	</tr>
	<tr>
		<td>4</td>
		<td>頭</td>
		<td>голова</td>
		<td>ズ, トー, トウ, ト</td>
		<td>かぶり, あたま, かしら, がしら</td>
	</tr>
	<tr>
		<td>4</td>
		<td>薬</td>
		<td>лекарство</td>
		<td>ヤク</td>
		<td>くすり</td>
	</tr>
	<tr>
		<td>4</td>
		<td>曜</td>
		<td>день недели</td>
		<td>ヨウ, ヨー</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>題</td>
		<td>заглавие, тема</td>
		<td>ダイ</td>
		<td></td>
	</tr>
	<tr>
		<td>4</td>
		<td>顔</td>
		<td>лицо</td>
		<td>ガン</td>
		<td>かお</td>
	</tr>
	<tr>
		<td>4</td>
		<td>験</td>
		<td>испытывать, опыт, проверять</td>
		<td>ゲン, ケン</td>
		<td>ためし, あかし, ため.す, しるし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>丸</td>
		<td>круг</td>
		<td>ガン</td>
		<td>まる, まる.い, まる.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>久</td>
		<td>продолжительный, долгий</td>
		<td>キュ, キュウ, ク</td>
		<td>ひさ.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>才</td>
		<td>талант</td>
		<td>サイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>支</td>
		<td>расходы, отделение/филиал, поддерживать</td>
		<td>シ</td>
		<td>つか.える, か.う, ささ.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>戸</td>
		<td>дверь</td>
		<td>コ</td>
		<td>と</td>
	</tr>
	<tr>
		<td>3</td>
		<td>欠</td>
		<td>недоставать</td>
		<td>ケン, ケツ</td>
		<td>か.く, か.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>王</td>
		<td>правитель</td>
		<td>オウ, -ノウ, オー</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>化</td>
		<td>изменяться, превращаться</td>
		<td>ケ, カ</td>
		<td>ば.ける, ば.かす, ふ.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>内</td>
		<td>внутри</td>
		<td>ダイ, ナイ</td>
		<td>うち</td>
	</tr>
	<tr>
		<td>3</td>
		<td>反</td>
		<td>анти-, против</td>
		<td>ハン, ホ, タン, ホン</td>
		<td>かえ.す, そ.る, そ.らす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>比</td>
		<td>сравнивать</td>
		<td>ヒ</td>
		<td>くら.べる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>夫</td>
		<td>муж</td>
		<td>フ, フウ, ブ</td>
		<td>おっ, おっと, そ.れ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>仏</td>
		<td>Будда</td>
		<td>フツ, ブツ</td>
		<td>ほとけ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>毛</td>
		<td>шерсть, волосы</td>
		<td>モウ, モー</td>
		<td>け</td>
	</tr>
	<tr>
		<td>3</td>
		<td>予</td>
		<td>заранее</td>
		<td>ヨ, シャ</td>
		<td>あらかじ.め</td>
	</tr>
	<tr>
		<td>3</td>
		<td>由</td>
		<td>причина</td>
		<td>ユ, ユー, ユイ, ユウ</td>
		<td>よし, よ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>未</td>
		<td>ещё не</td>
		<td>ビ, ミ</td>
		<td>ま.だ, いま.だ, ひつじ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>布</td>
		<td>ткань</td>
		<td>フ</td>
		<td>ぬの</td>
	</tr>
	<tr>
		<td>3</td>
		<td>包</td>
		<td>обёртывать, заворачивать</td>
		<td>ホー, ホウ</td>
		<td>くる.む, つつ.む</td>
	</tr>
	<tr>
		<td>3</td>
		<td>末</td>
		<td>конец, последний, окончание, порошок</td>
		<td>バツ, マツ</td>
		<td>すえ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>平</td>
		<td>ровный, плоский, простой, обычный</td>
		<td>ビョウ, ヒョウ, ヘイ</td>
		<td>だいら, ひら.たい, たい.ら, ひら</td>
	</tr>
	<tr>
		<td>3</td>
		<td>辺</td>
		<td>берег, окрестности, граница</td>
		<td>ヘン</td>
		<td>べ, ほと.り, あた.り</td>
	</tr>
	<tr>
		<td>3</td>
		<td>氷</td>
		<td>лёд</td>
		<td>ヒョ, ヒョウ</td>
		<td>こおり, ひ, こお.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>付</td>
		<td>присоединять</td>
		<td>フ</td>
		<td>つ.ける, づ.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>皮</td>
		<td>кожа</td>
		<td>ヒ</td>
		<td>かわ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>犯</td>
		<td>crime</td>
		<td>ハン, ボン</td>
		<td>おか.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>必</td>
		<td>неизбежный, обязательный</td>
		<td>ヒツ</td>
		<td>かなら.ず</td>
	</tr>
	<tr>
		<td>3</td>
		<td>石</td>
		<td>камень</td>
		<td>セキ, コク, シャク</td>
		<td>いし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>他</td>
		<td>другой</td>
		<td>タ</td>
		<td>ほか</td>
	</tr>
	<tr>
		<td>3</td>
		<td>打</td>
		<td>ударять</td>
		<td>ダアス, ダ</td>
		<td>う.つ, う.ち, ぶ.つ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>加</td>
		<td>добавлять</td>
		<td>カ</td>
		<td>くわ.える, くわ.わる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>可</td>
		<td>возможный, одобрять</td>
		<td>コク, カ</td>
		<td>べ.し, べ.き</td>
	</tr>
	<tr>
		<td>3</td>
		<td>央</td>
		<td>центр</td>
		<td>オウ, オー</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>刊</td>
		<td>publish</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>玉</td>
		<td>драгоценный камень</td>
		<td>ギョク, ギョ</td>
		<td>だま, たま</td>
	</tr>
	<tr>
		<td>3</td>
		<td>旧</td>
		<td>старое, прошлое</td>
		<td>キュ, キュウ</td>
		<td>もと, ふる.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>号</td>
		<td>знак, номер</td>
		<td>ゴー, ゴウ</td>
		<td>さけ.ぶ, よびな</td>
	</tr>
	<tr>
		<td>3</td>
		<td>皿</td>
		<td>тарелка</td>
		<td>ベイ</td>
		<td>さら</td>
	</tr>
	<tr>
		<td>3</td>
		<td>札</td>
		<td>ярлык, бирка</td>
		<td>サツ</td>
		<td>ふだ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>史</td>
		<td>история</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>失</td>
		<td>неудача, терять</td>
		<td>シツ</td>
		<td>うしな.う, う.せる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>示</td>
		<td>указывать на что-либо, показывать</td>
		<td>シ, ジ</td>
		<td>しめ.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>申</td>
		<td>докладывать, говорить</td>
		<td>シン</td>
		<td>さる, もう.し, もう.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>礼</td>
		<td>вежливость, церемония, благодарность, поклон</td>
		<td>レイ, ライ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>令</td>
		<td>вежливый префикс, указывающий на родство, приказ</td>
		<td>レイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>列</td>
		<td>ряд</td>
		<td>レ, レツ</td>
		<td>つら.なる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>老</td>
		<td>старость</td>
		<td>ロー, ロウ</td>
		<td>お.いる, ふ.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>式</td>
		<td>церемония, стиль, формула</td>
		<td>シキ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>州</td>
		<td>провинция, мель</td>
		<td>シュウ, シュ, ス</td>
		<td>す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>寺</td>
		<td>буддийский храм</td>
		<td>ジ</td>
		<td>てら</td>
	</tr>
	<tr>
		<td>3</td>
		<td>次</td>
		<td>следующий</td>
		<td>シ, ジ</td>
		<td>つぎ, つ.ぐ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>守</td>
		<td>защищать</td>
		<td>シュ, ス</td>
		<td>まも.る, まも.り, もり</td>
	</tr>
	<tr>
		<td>3</td>
		<td>糸</td>
		<td>нить</td>
		<td>シ</td>
		<td>いと</td>
	</tr>
	<tr>
		<td>3</td>
		<td>在</td>
		<td>быть, существовать</td>
		<td>ザイ</td>
		<td>あ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>再</td>
		<td>повторный</td>
		<td>サイ, サ</td>
		<td>ふたた.び</td>
	</tr>
	<tr>
		<td>3</td>
		<td>向</td>
		<td>направление</td>
		<td>コウ, コー</td>
		<td>む.く, む.い, む.き, む.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>交</td>
		<td>обмениваться, смешивать, отношения, пересекаться</td>
		<td>コウ, コー</td>
		<td>まじ.える, まじ.わる, ま.じる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>血</td>
		<td>кровь</td>
		<td>ケツ</td>
		<td>ち</td>
	</tr>
	<tr>
		<td>3</td>
		<td>件</td>
		<td>дело, происшествие</td>
		<td>ケン</td>
		<td>くだん</td>
	</tr>
	<tr>
		<td>3</td>
		<td>共</td>
		<td>вместе</td>
		<td>キョウ, キョ</td>
		<td>とも, とも.に, ども</td>
	</tr>
	<tr>
		<td>3</td>
		<td>曲</td>
		<td>мелодия, изгиб</td>
		<td>キョク, キョ</td>
		<td>ま.がる, ま.げる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>各</td>
		<td>каждый</td>
		<td>カク</td>
		<td>おのおの</td>
	</tr>
	<tr>
		<td>3</td>
		<td>印</td>
		<td>печать, знак</td>
		<td>イン</td>
		<td>じるし, しる.す, しるし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>因</td>
		<td>причина</td>
		<td>イン</td>
		<td>よ.る, ちな.む</td>
	</tr>
	<tr>
		<td>3</td>
		<td>羽</td>
		<td>перо</td>
		<td>ウ</td>
		<td>は, わ, はね</td>
	</tr>
	<tr>
		<td>3</td>
		<td>団</td>
		<td>группа, объединение</td>
		<td>トン, ダン</td>
		<td>まる.い, かたまり</td>
	</tr>
	<tr>
		<td>3</td>
		<td>竹</td>
		<td>бамбук</td>
		<td>チク</td>
		<td>たけ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>仲</td>
		<td>отношения, посредник</td>
		<td>チュウ, チュ</td>
		<td>なか</td>
	</tr>
	<tr>
		<td>3</td>
		<td>虫</td>
		<td>насекомое</td>
		<td>キ, チュウ, チュ</td>
		<td>むし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>兆</td>
		<td>признак, триллион</td>
		<td>チョウ, チョ</td>
		<td>きざ.し, きざ.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>伝</td>
		<td>вдоль, передаваться</td>
		<td>テン, デン</td>
		<td>つた.える, つた.わる, つた.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>当</td>
		<td>данный, выполнять обязанности, правильный, этот</td>
		<td>トー, トウ</td>
		<td>あ.たり, あ.てる, あ.たる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>成</td>
		<td>расти, становиться, результат, образовывать</td>
		<td>ジョウ, セイ</td>
		<td>な.る, な.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>全</td>
		<td>целый</td>
		<td>ゼン</td>
		<td>すべ.て, まっ.く, まった.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>争</td>
		<td>борьба, спор</td>
		<td>ソウ, ソー</td>
		<td>いか.でか, あらそ.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>任</td>
		<td>доверять, поручать, назначать</td>
		<td>ニン</td>
		<td>まか.せる, まか.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>米</td>
		<td>рис</td>
		<td>メエトル, マイ, ベイ</td>
		<td>よね, こめ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>両</td>
		<td>оба</td>
		<td>リョ, リョウ</td>
		<td>てる, ふたつ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>利</td>
		<td>острый, прибыль, выгода</td>
		<td>リ</td>
		<td>き.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>余</td>
		<td>избыток</td>
		<td>ヨ</td>
		<td>あま.り, あま.す, あま.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>防</td>
		<td>resist</td>
		<td>ボウ</td>
		<td>ふせ.ぐ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>役</td>
		<td>роль, служба</td>
		<td>ヤク, エキ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>返</td>
		<td>ответ, возвращать</td>
		<td>ヘン</td>
		<td>かえ.す, かえ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>判</td>
		<td>судить</td>
		<td>ハン, バン</td>
		<td>わか.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>臣</td>
		<td>подданный</td>
		<td>シン, ジン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>身</td>
		<td>тело</td>
		<td>シン</td>
		<td>み</td>
	</tr>
	<tr>
		<td>3</td>
		<td>折</td>
		<td>сгибать, момент, ломать</td>
		<td>セツ</td>
		<td>お.り, おり, お.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>努</td>
		<td>каторга</td>
		<td>ド</td>
		<td>つと.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>投</td>
		<td>бросать</td>
		<td>トー, トウ</td>
		<td>な.げる, な.げ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>対</td>
		<td>противоположный</td>
		<td>ツイ, タイ</td>
		<td>こた.える, そろ.い, あいて</td>
	</tr>
	<tr>
		<td>3</td>
		<td>束</td>
		<td>пучок, связка</td>
		<td>ソク</td>
		<td>たば.ねる, つか, たば</td>
	</tr>
	<tr>
		<td>3</td>
		<td>谷</td>
		<td>долина</td>
		<td>コク</td>
		<td>きわ.まる, たに</td>
	</tr>
	<tr>
		<td>3</td>
		<td>位</td>
		<td>ранг, позиция, настолько</td>
		<td>イ</td>
		<td>ぐらい, くらい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>囲</td>
		<td>окружать</td>
		<td>イ</td>
		<td>かこ.い, かこ.む, かこ.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>完</td>
		<td>завершение, безупречный, совершенный</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>角</td>
		<td>угол</td>
		<td>カク</td>
		<td>つの, かど</td>
	</tr>
	<tr>
		<td>3</td>
		<td>快</td>
		<td>выздоровление, приятный</td>
		<td>カイ</td>
		<td>こころよ.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>改</td>
		<td>менять, переделывать</td>
		<td>カイ</td>
		<td>あらた.める, あらた.まる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>技</td>
		<td>навык</td>
		<td>ギ</td>
		<td>わざ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>局</td>
		<td>офис</td>
		<td>キョク, キョ</td>
		<td>つぼね</td>
	</tr>
	<tr>
		<td>3</td>
		<td>君</td>
		<td>ты</td>
		<td>クン</td>
		<td>ぎみ, きみ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>均</td>
		<td>level</td>
		<td>キン</td>
		<td>なら.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>形</td>
		<td>образ, форма</td>
		<td>ケイ, ギョウ, ギョ</td>
		<td>がた, かた, なり, かたち</td>
	</tr>
	<tr>
		<td>3</td>
		<td>決</td>
		<td>решать</td>
		<td>ケツ</td>
		<td>き.まる, さ.く, き.める, ぎ.め</td>
	</tr>
	<tr>
		<td>3</td>
		<td>芸</td>
		<td>искусство, мастерство</td>
		<td>ゲイ, ウン</td>
		<td>のり, う.える, わざ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>求</td>
		<td>искать, требовать</td>
		<td>キュ, グ, キュウ</td>
		<td>もと.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>希</td>
		<td>редкий, надежда</td>
		<td>キ, ケ</td>
		<td>まれ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>告</td>
		<td>сообщать</td>
		<td>コク</td>
		<td>つ.げる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>材</td>
		<td>хлам</td>
		<td>ザイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>坂</td>
		<td>холм</td>
		<td>ハン</td>
		<td>さか</td>
	</tr>
	<tr>
		<td>3</td>
		<td>似</td>
		<td>похожий</td>
		<td>ジ</td>
		<td>ひ.る, に.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>児</td>
		<td>дитя</td>
		<td>ニ, ジ, ゲイ, -っこ</td>
		<td>こ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>状</td>
		<td>письмо, форма, положение</td>
		<td>ジョ, ジョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>初</td>
		<td>начало, первый</td>
		<td>ショ</td>
		<td>はじ.め, はじ.めて, はつ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>助</td>
		<td>помощь</td>
		<td>ジョ</td>
		<td>たす.ける, たす.かる, す.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>労</td>
		<td>труд</td>
		<td>ロウ</td>
		<td>ろう.する, いたわ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>冷</td>
		<td>холодный</td>
		<td>レイ</td>
		<td>ひ.える, さ.める, ひ.や, つめ.たい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>例</td>
		<td>пример</td>
		<td>レイ</td>
		<td>たと.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>和</td>
		<td>мягкий, гармония, японский</td>
		<td>オ, カ, ワ</td>
		<td>なご.む, やわ.らぐ, やわ.らげる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>述</td>
		<td>высказывать</td>
		<td>ジュ, ジュツ</td>
		<td>の.べる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>承</td>
		<td>наследовать, соглашаться</td>
		<td>ショ, ショウ</td>
		<td>う.ける, うけたまわ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>招</td>
		<td>beckon</td>
		<td>ショウ</td>
		<td>まね.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>実</td>
		<td>реальность</td>
		<td>シツ, ジツ</td>
		<td>まこと, みの.る, み, まことに</td>
	</tr>
	<tr>
		<td>3</td>
		<td>取</td>
		<td>брать</td>
		<td>シュ</td>
		<td>と.る, とり, と.り</td>
	</tr>
	<tr>
		<td>3</td>
		<td>治</td>
		<td>управлять, лечить</td>
		<td>ジ, チ</td>
		<td>なお.す, おさ.まる, おさ.める, なお.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>受</td>
		<td>подвергаться, принимать</td>
		<td>ジュ</td>
		<td>う.ける, う.かる, う.け</td>
	</tr>
	<tr>
		<td>3</td>
		<td>周</td>
		<td>окружность</td>
		<td>シュウ, シュ</td>
		<td>まわ.り</td>
	</tr>
	<tr>
		<td>3</td>
		<td>妻</td>
		<td>жена</td>
		<td>サイ</td>
		<td>つま</td>
	</tr>
	<tr>
		<td>3</td>
		<td>参</td>
		<td>приходить, участвовать, идти, посетить</td>
		<td>シン, サン</td>
		<td>まい, まじわる, まい.る, みつ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>枝</td>
		<td>ветвь</td>
		<td>シ</td>
		<td>えだ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>刷</td>
		<td>печатать</td>
		<td>サツ</td>
		<td>ず.り, す.る, は.く, ずり</td>
	</tr>
	<tr>
		<td>3</td>
		<td>効</td>
		<td>эффект</td>
		<td>コウ, コー</td>
		<td>なら.う, き.く, ききめ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>幸</td>
		<td>счастье</td>
		<td>コウ, コー</td>
		<td>さち, しあわ.せ, さいわ.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>固</td>
		<td>твёрдый</td>
		<td>コ</td>
		<td>かた.まる, かた.い, かた.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>季</td>
		<td>сезон</td>
		<td>キ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>岸</td>
		<td>берег</td>
		<td>ガン</td>
		<td>きし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>岩</td>
		<td>горная порода, скала</td>
		<td>ガン</td>
		<td>いわ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>泣</td>
		<td>плакать</td>
		<td>キュ, キュウ</td>
		<td>な.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>協</td>
		<td>сотрудничество</td>
		<td>キョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>居</td>
		<td>проживать, находиться</td>
		<td>コ, キョ</td>
		<td>い.る, い, お.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>苦</td>
		<td>страдать</td>
		<td>ク</td>
		<td>ぐる.しい, にが.い, くる.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>具</td>
		<td>инструмент</td>
		<td>グ</td>
		<td>つぶさ.に, そな.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>果</td>
		<td>выполнять, результат, фрукт</td>
		<td>カ</td>
		<td>はた.す, は.たす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>河</td>
		<td>река</td>
		<td>カ</td>
		<td>かわ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>官</td>
		<td>орган чувств, чиновник</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>委</td>
		<td>комитет, поручать</td>
		<td>イ</td>
		<td>ゆだ.ねる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>易</td>
		<td>торговля, лёгкий, гадание</td>
		<td>エキ, イ</td>
		<td>やす.い, やさ.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>育</td>
		<td>растить, воспитывать</td>
		<td>イク</td>
		<td>はぐく.む, そだ.つ, そだ.てる, そだ.ち</td>
	</tr>
	<tr>
		<td>3</td>
		<td>泳</td>
		<td>плавать</td>
		<td>エイ</td>
		<td>およ.ぐ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>直</td>
		<td>правильный, прямой</td>
		<td>チョク, ジカ, ジキ, チョ</td>
		<td>なお.す, ただ.ちに, なお.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>定</td>
		<td>определять</td>
		<td>テイ, ジョ, ジョウ</td>
		<td>さだ.める, さだ.か, さだ.まる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>底</td>
		<td>дно</td>
		<td>テイ</td>
		<td>そこ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>的</td>
		<td>суффикс для образования прилагательных, цель</td>
		<td>テキ</td>
		<td>まと</td>
	</tr>
	<tr>
		<td>3</td>
		<td>性</td>
		<td>пол, натура, характер</td>
		<td>ショウ, ショ, セイ</td>
		<td>さが</td>
	</tr>
	<tr>
		<td>3</td>
		<td>昔</td>
		<td>в старину, прошлое</td>
		<td>セキ, シャク</td>
		<td>むかし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>制</td>
		<td>строй, система, ограничивать, контроль</td>
		<td>セイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>卒</td>
		<td>выпускаться</td>
		<td>ソツ, シュツ</td>
		<td>お.える, お.わる, そっ.する</td>
	</tr>
	<tr>
		<td>3</td>
		<td>非</td>
		<td>неправильный, плохой, не</td>
		<td>ヒ</td>
		<td>あら.ず</td>
	</tr>
	<tr>
		<td>3</td>
		<td>波</td>
		<td>волна</td>
		<td>ハ</td>
		<td>なみ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>板</td>
		<td>плита, доска</td>
		<td>ハン, バン</td>
		<td>いた</td>
	</tr>
	<tr>
		<td>3</td>
		<td>版</td>
		<td>издание</td>
		<td>ハン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>念</td>
		<td>мысль</td>
		<td>ネン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>武</td>
		<td>военный</td>
		<td>ム, ブ</td>
		<td>たけ.し</td>
	</tr>
	<tr>
		<td>3</td>
		<td>表</td>
		<td>поверхность, выражать, таблица</td>
		<td>ヒョ, ヒョウ</td>
		<td>おもて, あらわ.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>命</td>
		<td>приказ, жизнь</td>
		<td>ミョウ, メイ</td>
		<td>いのち</td>
	</tr>
	<tr>
		<td>3</td>
		<td>府</td>
		<td>префектура, правительство</td>
		<td>フ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>放</td>
		<td>отпускать</td>
		<td>ホー, -っぱな.し, ホウ</td>
		<td>はな.す, はな.つ, はな.れる, ほう.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>法</td>
		<td>религия, мат. операции, метод, закон</td>
		<td>ホー, ホッ, ホウ, フラン, ハッ</td>
		<td>のり</td>
	</tr>
	<tr>
		<td>3</td>
		<td>油</td>
		<td>масло</td>
		<td>ユ, ユウ</td>
		<td>あぶら</td>
	</tr>
	<tr>
		<td>3</td>
		<td>勇</td>
		<td>храбрость</td>
		<td>ユウ</td>
		<td>いさ.む</td>
	</tr>
	<tr>
		<td>3</td>
		<td>要</td>
		<td>требоваться, важный, суть, быть нужным</td>
		<td>ヨウ, ヨー</td>
		<td>い.る, かなめ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>負</td>
		<td>нести на себе, минус</td>
		<td>フ</td>
		<td>ま.ける, ま.かす, お.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>迷</td>
		<td>замешательство, заблудиться</td>
		<td>メイ</td>
		<td>まよ.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>約</td>
		<td>сокращать, обещание, приблизительно</td>
		<td>ヤク</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>面</td>
		<td>поверхность, лицо, грань, сторона</td>
		<td>メン, ベン</td>
		<td>おもて, おも, つら</td>
	</tr>
	<tr>
		<td>3</td>
		<td>変</td>
		<td>странный, изменяться, происшествие, несчастный случай</td>
		<td>ヘン</td>
		<td>か.える, か.わり, か.わる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>飛</td>
		<td>летать</td>
		<td>ヒ</td>
		<td>と.ぶ, と.ばす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>美</td>
		<td>красивый, прекрасный</td>
		<td>ビ, ミ</td>
		<td>うつく.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>独</td>
		<td>в одиночку, один</td>
		<td>トク, ドク</td>
		<td>ひと.り</td>
	</tr>
	<tr>
		<td>3</td>
		<td>則</td>
		<td>правила</td>
		<td>ソク</td>
		<td>のっと.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>相</td>
		<td>взаимный</td>
		<td>ショウ, ソウ, ショ, ソー</td>
		<td>あい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>草</td>
		<td>трава</td>
		<td>ソウ, ソー</td>
		<td>ぐさ, くさ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>祖</td>
		<td>основатель, предок</td>
		<td>ソ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>信</td>
		<td>доверие, сигнал, сообщение</td>
		<td>シン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>政</td>
		<td>политика</td>
		<td>ショウ, セイ</td>
		<td>まつりごと, まん</td>
	</tr>
	<tr>
		<td>3</td>
		<td>星</td>
		<td>звезда, небесное тело, мишень</td>
		<td>ショウ, セイ</td>
		<td>ほし, ぼし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>点</td>
		<td>место, точка, пункт</td>
		<td>テン</td>
		<td>つ.く, つ.ける, た.てる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>追</td>
		<td>преследовать, прогонять, следовать</td>
		<td>ツイ</td>
		<td>お.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>単</td>
		<td>единичный, простой, отдельный</td>
		<td>タン</td>
		<td>ひとえ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>炭</td>
		<td>уголь</td>
		<td>タン</td>
		<td>すみ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>退</td>
		<td>отступать</td>
		<td>タイ</td>
		<td>しりぞ.ける, しりぞ.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>栄</td>
		<td>процветание</td>
		<td>ヨウ, エイ</td>
		<td>ば.え, は.え, さか.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>科</td>
		<td>преступление, отделение, отрасль</td>
		<td>カ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>活</td>
		<td>живой, активный</td>
		<td>カツ</td>
		<td>い.ける, い.きる, い.かす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>胃</td>
		<td>желудок</td>
		<td>イ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>級</td>
		<td>ранг, уровень</td>
		<td>キュ, キュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>軍</td>
		<td>армия</td>
		<td>グン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>係</td>
		<td>главный</td>
		<td>ケイ</td>
		<td>がかり, かかり, かか.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>型</td>
		<td>модель</td>
		<td>ケイ</td>
		<td>がた, かた</td>
	</tr>
	<tr>
		<td>3</td>
		<td>客</td>
		<td>гость, клиент</td>
		<td>キャク, カク, キャ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>逆</td>
		<td>обратный, неблагоприятный</td>
		<td>ギャク, ギャ, ゲキ</td>
		<td>さか.らう, さか, さか.さ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>限</td>
		<td>ограничивать</td>
		<td>ゲン</td>
		<td>かぎ.り, かぎ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>厚</td>
		<td>rich</td>
		<td>コウ</td>
		<td>あか, あつ.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>指</td>
		<td>палец, указывать</td>
		<td>シ</td>
		<td>さ.し, ゆび, さ.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>昨</td>
		<td>прошлый (о времени)</td>
		<td>サク</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>祝</td>
		<td>праздновать</td>
		<td>シュウ, シュク</td>
		<td>いわ.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>神</td>
		<td>ками</td>
		<td>シン, ジン</td>
		<td>かん, かみ, こう</td>
	</tr>
	<tr>
		<td>3</td>
		<td>査</td>
		<td>investigate</td>
		<td>サ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>省</td>
		<td>министерство</td>
		<td>ショウ, セイ</td>
		<td>かえり.みる, はぶ.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>酒</td>
		<td>алкоголь, сакэ</td>
		<td>シュ</td>
		<td>さけ, さか</td>
	</tr>
	<tr>
		<td>3</td>
		<td>笑</td>
		<td>улыбка, смех</td>
		<td>ショ, ショウ</td>
		<td>え.む, わら.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>消</td>
		<td>гасить, тушить, исчезать</td>
		<td>ショ, ショウ</td>
		<td>き.える, け.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>師</td>
		<td>учитель, суффикс лица по профессии, духовное лицо</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>財</td>
		<td>wealth</td>
		<td>ゾク, サイ, ザイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>殺</td>
		<td>убить</td>
		<td>サツ, セツ, サイ</td>
		<td>ごろ.し, ころ.す, そ.ぐ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>差</td>
		<td>разница, префикс 差し</td>
		<td>サ</td>
		<td>さ.す, さ.し</td>
	</tr>
	<tr>
		<td>3</td>
		<td>残</td>
		<td>остаток</td>
		<td>サン, ザン</td>
		<td>のこ.る, のこ.す, そこな.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>航</td>
		<td>круиз</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>根</td>
		<td>корень</td>
		<td>コン</td>
		<td>ね</td>
	</tr>
	<tr>
		<td>3</td>
		<td>個</td>
		<td>индивидуальный</td>
		<td>コ, カ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>候</td>
		<td>климат, симптом</td>
		<td>コウ, コー</td>
		<td>そうろう</td>
	</tr>
	<tr>
		<td>3</td>
		<td>庫</td>
		<td>хранилище, склад</td>
		<td>コ, ク</td>
		<td>くら</td>
	</tr>
	<tr>
		<td>3</td>
		<td>記</td>
		<td>записывать</td>
		<td>キ</td>
		<td>しる.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>訓</td>
		<td>инструкция</td>
		<td>クン, キン</td>
		<td>くん.ずる, よ.む, おし.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>害</td>
		<td>вред</td>
		<td>ガイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>格</td>
		<td>стандарт, статус, падеж, характер</td>
		<td>キャク, コウ, カク, ゴウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>荷</td>
		<td>багаж, ноша, груз</td>
		<td>カ</td>
		<td>に</td>
	</tr>
	<tr>
		<td>3</td>
		<td>帯</td>
		<td>лента, носить при себе, пояс</td>
		<td>タイ</td>
		<td>おび, お.びる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>島</td>
		<td>остров</td>
		<td>トー, トウ</td>
		<td>しま</td>
	</tr>
	<tr>
		<td>3</td>
		<td>庭</td>
		<td>сад, двор</td>
		<td>テイ</td>
		<td>にわ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>徒</td>
		<td>ученик, человек, последователь, группа людей, напрасный</td>
		<td>ト</td>
		<td>あだ, いたずら</td>
	</tr>
	<tr>
		<td>3</td>
		<td>席</td>
		<td>помещение, посещение, место для сидения</td>
		<td>セキ</td>
		<td>むしろ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>息</td>
		<td>дыхание</td>
		<td>ソク</td>
		<td>いき</td>
	</tr>
	<tr>
		<td>3</td>
		<td>造</td>
		<td>изготовлять</td>
		<td>ゾー, ゾウ</td>
		<td>づく.り, つく.る, つく.り</td>
	</tr>
	<tr>
		<td>3</td>
		<td>孫</td>
		<td>внук</td>
		<td>ソン</td>
		<td>まご</td>
	</tr>
	<tr>
		<td>3</td>
		<td>速</td>
		<td>быстрый</td>
		<td>ソク</td>
		<td>はや.い, すみ.やか, はや.める, はや</td>
	</tr>
	<tr>
		<td>3</td>
		<td>能</td>
		<td>способность, эффект, действие</td>
		<td>ノー, ノウ</td>
		<td>よ.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>配</td>
		<td>распределять</td>
		<td>ハイ</td>
		<td>くば.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>倍</td>
		<td>дважды</td>
		<td>バイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>破</td>
		<td>преодолевать, разрушать, ломать</td>
		<td>ハ</td>
		<td>やぶ.れる, やぶ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>馬</td>
		<td>лошадь</td>
		<td>バ</td>
		<td>ま, うま</td>
	</tr>
	<tr>
		<td>3</td>
		<td>浴</td>
		<td>купаться</td>
		<td>ヨク</td>
		<td>あ.びせる, あ.びる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>容</td>
		<td>облик, содержать, допускать</td>
		<td>ヨウ, ヨー</td>
		<td>い.れる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>流</td>
		<td>течение</td>
		<td>ル, リュウ, リュ</td>
		<td>なが.す, なが.れる, なが.れ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>留</td>
		<td>останавливать, задерживать</td>
		<td>ル, リュウ, リュ</td>
		<td>とど.める, と.める, と.まる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>連</td>
		<td>соединение, группа, брать с собой, компания</td>
		<td>レン</td>
		<td>つら.ねる, つ.れる, つら.なる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>陸</td>
		<td>земля</td>
		<td>ロク, リク</td>
		<td>おか</td>
	</tr>
	<tr>
		<td>3</td>
		<td>率</td>
		<td>rate</td>
		<td>ソツ, リツ, シュツ</td>
		<td>ひき.いる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>略</td>
		<td>abbreviation</td>
		<td>リャク</td>
		<td>おか.す, おさ.める, ほぼ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>望</td>
		<td>желание, надежда</td>
		<td>モウ, ボー, ボウ</td>
		<td>もち, のぞ.む</td>
	</tr>
	<tr>
		<td>3</td>
		<td>務</td>
		<td>дела, долг, обязанности</td>
		<td>ム</td>
		<td>つと.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>敗</td>
		<td>неудача</td>
		<td>ハイ</td>
		<td>やぶ.れる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>部</td>
		<td>часть, экземпляр, отделение, отдел</td>
		<td>ブ</td>
		<td>べ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>副</td>
		<td>вице-</td>
		<td>フク</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>婦</td>
		<td>дама</td>
		<td>フ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>側</td>
		<td>сторона</td>
		<td>ソク</td>
		<td>そば, がわ, かわ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>組</td>
		<td>команда</td>
		<td>ソ</td>
		<td>く.む, ぐみ, くみ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>責</td>
		<td>пытать, упрекать, ответственность</td>
		<td>セキ</td>
		<td>せ.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>接</td>
		<td>соединять, соприкасаться</td>
		<td>セツ, ショウ</td>
		<td>つ.ぐ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>船</td>
		<td>корабль</td>
		<td>セン</td>
		<td>ふね, ふな</td>
	</tr>
	<tr>
		<td>3</td>
		<td>商</td>
		<td>торговать</td>
		<td>ショ, ショウ</td>
		<td>あきな.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>設</td>
		<td>establish</td>
		<td>セツ</td>
		<td>もう.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>雪</td>
		<td>снег</td>
		<td>セツ</td>
		<td>ゆき</td>
	</tr>
	<tr>
		<td>3</td>
		<td>清</td>
		<td>чистый</td>
		<td>シン, ショウ, セイ</td>
		<td>きよ.まる, きよ.い, きよ.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>深</td>
		<td>глубокий</td>
		<td>シン</td>
		<td>ぶか.い, ふか.まる, ふか.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>得</td>
		<td>получать, прибыль, понимать</td>
		<td>トク</td>
		<td>う.る, え.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>第</td>
		<td>указывающий на порядковый номер, префикс перед числами</td>
		<td>ダイ, テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>停</td>
		<td>останавливаться</td>
		<td>テイ</td>
		<td>と.める, と.まる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>断</td>
		<td>отрезать, заключение, прерывать, утверждение</td>
		<td>ダン</td>
		<td>ことわ.る, さだ.める, た.つ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>貨</td>
		<td>груз</td>
		<td>カ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>液</td>
		<td>fluid</td>
		<td>エキ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>移</td>
		<td>меняться, перемещаться</td>
		<td>イ</td>
		<td>うつ.る, うつ.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>経</td>
		<td>управлять, проходить</td>
		<td>キョウ, ケイ</td>
		<td>へ.る, た.つ, たていと</td>
	</tr>
	<tr>
		<td>3</td>
		<td>規</td>
		<td>rule</td>
		<td>キ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>寄</td>
		<td>подходить, приближаться</td>
		<td>キ</td>
		<td>よ.る, よ.り, よ.せる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>許</td>
		<td>разрешать</td>
		<td>キョ</td>
		<td>ゆる.す, もと</td>
	</tr>
	<tr>
		<td>3</td>
		<td>球</td>
		<td>шар</td>
		<td>キュ, キュウ</td>
		<td>たま</td>
	</tr>
	<tr>
		<td>3</td>
		<td>救</td>
		<td>спасение</td>
		<td>キュウ</td>
		<td>すく.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>険</td>
		<td>крутой, опасный</td>
		<td>ケン</td>
		<td>けわ.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>現</td>
		<td>реальность, появляться, нынешний</td>
		<td>ゲン</td>
		<td>あらわ.れる, あらわ.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>混</td>
		<td>смешивать</td>
		<td>コン</td>
		<td>ま.ざる, ま.じる, ま.じり</td>
	</tr>
	<tr>
		<td>3</td>
		<td>祭</td>
		<td>фестиваль</td>
		<td>サイ</td>
		<td>まつ.り, まつ.る, まつり</td>
	</tr>
	<tr>
		<td>3</td>
		<td>細</td>
		<td>маленький, детальный, тонкий</td>
		<td>サイ</td>
		<td>こま.か, ほそ.い, ほそ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>術</td>
		<td>искусство, умение</td>
		<td>ジュ, ジュツ</td>
		<td>すべ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>宿</td>
		<td>гостиница</td>
		<td>シュ, シュク</td>
		<td>やど, やど.す, やど.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>章</td>
		<td>значок, глава (например, книги), эмблема</td>
		<td>ショ, ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>常</td>
		<td>постоянный, обычный</td>
		<td>ジョ, ジョウ</td>
		<td>つね, とこ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>情</td>
		<td>чувства, обстоятельства</td>
		<td>ジョ, ジョウ, セイ</td>
		<td>なさ.け</td>
	</tr>
	<tr>
		<td>3</td>
		<td>植</td>
		<td>сажать, сеять</td>
		<td>ショク, ショ</td>
		<td>う.える, う.わる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>順</td>
		<td>согласие</td>
		<td>ジュン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>象</td>
		<td>объект, явление, слон</td>
		<td>ゾー, ショウ, ショ, ゾウ</td>
		<td>かたど.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>焼</td>
		<td>жарить</td>
		<td>ショ, ショウ</td>
		<td>や.く, や.き</td>
	</tr>
	<tr>
		<td>3</td>
		<td>勝</td>
		<td>побеждать</td>
		<td>ショ, ショウ</td>
		<td>が.ち, か.つ, まさ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>歯</td>
		<td>зуб</td>
		<td>シ</td>
		<td>は, よわい.する, よわい, よわ.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>最</td>
		<td>самый</td>
		<td>シュ, サイ</td>
		<td>もっと.も, もっ.も, つま</td>
	</tr>
	<tr>
		<td>3</td>
		<td>散</td>
		<td>разбрасывать</td>
		<td>サン</td>
		<td>ち.らす, ち.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>港</td>
		<td>порт, гавань</td>
		<td>コウ, コー</td>
		<td>みなと</td>
	</tr>
	<tr>
		<td>3</td>
		<td>検</td>
		<td>examine</td>
		<td>ケン</td>
		<td>しら.べる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>湖</td>
		<td>озеро</td>
		<td>コ</td>
		<td>みずうみ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>期</td>
		<td>период времени</td>
		<td>キ, ゴ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>喜</td>
		<td>радоваться</td>
		<td>キ</td>
		<td>よろこ.ばす, よろこ.ぶ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>結</td>
		<td>соединять, узел, формировать</td>
		<td>ケチ, ケツ</td>
		<td>ゆ.う, むす.ぶ, ゆ.わえる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>景</td>
		<td>пейзаж, вид, состояние</td>
		<td>ケイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>給</td>
		<td>зарплата, снабжать</td>
		<td>キュ, キュウ</td>
		<td>たも.う, たま.う, たま.え</td>
	</tr>
	<tr>
		<td>3</td>
		<td>雲</td>
		<td>облако</td>
		<td>ウン</td>
		<td>くも, ぐも</td>
	</tr>
	<tr>
		<td>3</td>
		<td>営</td>
		<td>manage</td>
		<td>エイ</td>
		<td>いとな.む, いとな.み</td>
	</tr>
	<tr>
		<td>3</td>
		<td>温</td>
		<td>тёплый, температура</td>
		<td>オン</td>
		<td>あたた.かい, あたた.か</td>
	</tr>
	<tr>
		<td>3</td>
		<td>過</td>
		<td>проходить, превышать, ошибка</td>
		<td>カ</td>
		<td>す.ぎる, す.ぎ, あやま.ち</td>
	</tr>
	<tr>
		<td>3</td>
		<td>絵</td>
		<td>картина</td>
		<td>カイ, エ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>階</td>
		<td>уровень, ступень, этаж</td>
		<td>カイ</td>
		<td>きざはし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>覚</td>
		<td>чувство, помнить, просыпаться, ощущение</td>
		<td>カク</td>
		<td>おぼ.える, さ.ます, さ.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>貯</td>
		<td>экономить</td>
		<td>チョ</td>
		<td>た.める, たくわ.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>達</td>
		<td>достигать, суффикс множественного числа, доставлять</td>
		<td>タツ, ダ, タチ</td>
		<td>たち</td>
	</tr>
	<tr>
		<td>3</td>
		<td>測</td>
		<td>fathom</td>
		<td>ソク</td>
		<td>はか.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>童</td>
		<td>ребёнок</td>
		<td>ドウ, ドー</td>
		<td>わらべ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>等</td>
		<td>класс, суффикс множественного числа, равный, разряд</td>
		<td>トー, トウ, ラ</td>
		<td>など, ら, ひと.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>湯</td>
		<td>горячая вода</td>
		<td>トー, トウ</td>
		<td>ゆ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>登</td>
		<td>взбираться</td>
		<td>チョウ, トー, トウ, ト, ドウ, ショウ</td>
		<td>のぼ.る, あ.がる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>程</td>
		<td>распорядок, расстояние, мера, степень</td>
		<td>テイ</td>
		<td>ほど</td>
	</tr>
	<tr>
		<td>3</td>
		<td>絶</td>
		<td>абсолютный, прекращаться</td>
		<td>ゼツ</td>
		<td>た.つ, た.やす, た.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>然</td>
		<td>так, суффикс признака</td>
		<td>ゼン, ネン</td>
		<td>しか.し, しか, さ, しか.り</td>
	</tr>
	<tr>
		<td>3</td>
		<td>富</td>
		<td>богатство</td>
		<td>フ, フウ</td>
		<td>と.む, とみ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>復</td>
		<td>repeating</td>
		<td>フク</td>
		<td>また</td>
	</tr>
	<tr>
		<td>3</td>
		<td>費</td>
		<td>расходы</td>
		<td>ヒ</td>
		<td>つい.える, つい.やす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>番</td>
		<td>охрана, номер, очерёдность</td>
		<td>バン</td>
		<td>つが.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>悲</td>
		<td>печальный</td>
		<td>ヒ</td>
		<td>かな.しむ, かな.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>筆</td>
		<td>кисть</td>
		<td>ヒツ</td>
		<td>ふで</td>
	</tr>
	<tr>
		<td>3</td>
		<td>備</td>
		<td>оборудовать, готовиться, запасать</td>
		<td>ビ</td>
		<td>そな.える, そな.わる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>貿</td>
		<td>trade</td>
		<td>ボウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>無</td>
		<td>ничего, без</td>
		<td>ム, ブ</td>
		<td>な.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>報</td>
		<td>отплачивать, сообщение, известие</td>
		<td>ホー, ホウ</td>
		<td>むく.いる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>満</td>
		<td>полный</td>
		<td>バン, マン</td>
		<td>み.つ, み.ちる, み.たす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>量</td>
		<td>объём, вес, измерять, количество</td>
		<td>リョ, リョウ</td>
		<td>はか.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>遊</td>
		<td>путешествовать, играть, развлекаться</td>
		<td>ユウ, ユー, ユ</td>
		<td>あそ.ぶ, あそ.ばす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>落</td>
		<td>юмор, посёлок, падать</td>
		<td>ラク</td>
		<td>お.ちる, お.ち, お.とす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>陽</td>
		<td>солнце, ян</td>
		<td>ヨウ, ヨー</td>
		<td>ひ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>葉</td>
		<td>листва, лист</td>
		<td>ヨウ, ヨー</td>
		<td>は</td>
	</tr>
	<tr>
		<td>3</td>
		<td>税</td>
		<td>tax</td>
		<td>ゼイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>路</td>
		<td>дорога, путь</td>
		<td>ロ, ル</td>
		<td>みち, じ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>豊</td>
		<td>bountiful</td>
		<td>ホウ, ブ</td>
		<td>とよ, ゆた.か</td>
	</tr>
	<tr>
		<td>3</td>
		<td>夢</td>
		<td>сон, мечта</td>
		<td>ム, ボウ</td>
		<td>ゆめ.みる, ゆめ, くら.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>農</td>
		<td>сельское хозяйство</td>
		<td>ノー, ノウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>続</td>
		<td>продолжаться</td>
		<td>ショク, ゾク, コウ, キョウ</td>
		<td>つぐ.ない, つづ.く, つづ.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>損</td>
		<td>loss</td>
		<td>ソン</td>
		<td>そこ.なう, そこな.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>想</td>
		<td>мысль, представлять</td>
		<td>ソ, ソウ, ソー</td>
		<td>おも.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>戦</td>
		<td>сражение, война</td>
		<td>セン</td>
		<td>たたか.う, おのの.く, いくさ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>勢</td>
		<td>мощь, сила, ход событий, энергия</td>
		<td>ゼイ, セイ</td>
		<td>はずみ, いきお.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>数</td>
		<td>цифра, число</td>
		<td>サク, シュ, スウ, ス, スー, ソク</td>
		<td>かず, かぞ.える, しばしば</td>
	</tr>
	<tr>
		<td>3</td>
		<td>置</td>
		<td>класть</td>
		<td>チ</td>
		<td>お.く, お.き</td>
	</tr>
	<tr>
		<td>3</td>
		<td>鉄</td>
		<td>железо</td>
		<td>テツ</td>
		<td>くろがね</td>
	</tr>
	<tr>
		<td>3</td>
		<td>感</td>
		<td>чувство</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>解</td>
		<td>разгадывать, развязывать, расторгать, разбирать, понимать</td>
		<td>ゲ, カイ</td>
		<td>と.かす, と.く, と.ける</td>
	</tr>
	<tr>
		<td>3</td>
		<td>園</td>
		<td>сад</td>
		<td>エン</td>
		<td>その</td>
	</tr>
	<tr>
		<td>3</td>
		<td>愛</td>
		<td>любовь</td>
		<td>アイ</td>
		<td>いと.しい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>塩</td>
		<td>соль</td>
		<td>エン</td>
		<td>しお</td>
	</tr>
	<tr>
		<td>3</td>
		<td>極</td>
		<td>крайняя степень, полюса</td>
		<td>キョク, ゴク, キョ</td>
		<td>きわ.まる, きわ.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>禁</td>
		<td>prohibition</td>
		<td>キン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>罪</td>
		<td>кара, вина, преступление</td>
		<td>ザイ</td>
		<td>つみ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>資</td>
		<td>ресурсы, средства, капитал</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>準</td>
		<td>стандарт, полу</td>
		<td>ジュン, ジュ</td>
		<td>じゅん.じる, じゅん.ずる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>種</td>
		<td>биол. вид, семя</td>
		<td>シュ</td>
		<td>ぐさ, たね</td>
	</tr>
	<tr>
		<td>3</td>
		<td>雑</td>
		<td>грубый, беспорядок, всякие</td>
		<td>ゾー, ザツ, ゾウ</td>
		<td>まじ.える, まじ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>際</td>
		<td>край</td>
		<td>サイ</td>
		<td>きわ, ぎわ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>算</td>
		<td>считать</td>
		<td>サン</td>
		<td>そろ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>察</td>
		<td>инспектировать, предполагать</td>
		<td>サツ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>構</td>
		<td>конструкция</td>
		<td>コウ, コー</td>
		<td>かま.う, かま.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>関</td>
		<td>иметь отношение, барьер, застава</td>
		<td>カン</td>
		<td>せき, かか.わる, ぜき</td>
	</tr>
	<tr>
		<td>3</td>
		<td>境</td>
		<td>обстоятельства, граница, состояние</td>
		<td>キョウ, ケイ, キョ</td>
		<td>さかい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>漁</td>
		<td>рыбачить</td>
		<td>リョウ, ギョ</td>
		<td>あさ.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>演</td>
		<td>выступать</td>
		<td>エン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>慣</td>
		<td>accustomed</td>
		<td>カン</td>
		<td>な.れる, な.らす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>管</td>
		<td>труба</td>
		<td>カン</td>
		<td>くだ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>銅</td>
		<td>copper</td>
		<td>ドウ</td>
		<td>あかがね</td>
	</tr>
	<tr>
		<td>3</td>
		<td>適</td>
		<td>suitable</td>
		<td>テキ</td>
		<td>かな.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>精</td>
		<td>дух, старание, очищать, тщательность</td>
		<td>ショウ, シヤウ, セイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>製</td>
		<td>manufacture</td>
		<td>セイ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>静</td>
		<td>тихий, спокойный</td>
		<td>ジョウ, セイ</td>
		<td>しず, しず.まる, しず.か</td>
	</tr>
	<tr>
		<td>3</td>
		<td>像</td>
		<td>статуя, изображение</td>
		<td>ゾー, ゾウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>増</td>
		<td>increase</td>
		<td>ゾウ</td>
		<td>ふ.やす, ふ.える, ま.し, ま.す</td>
	</tr>
	<tr>
		<td>3</td>
		<td>総</td>
		<td>whole</td>
		<td>ソウ</td>
		<td>すべ.て, ふさ, す.べて</td>
	</tr>
	<tr>
		<td>3</td>
		<td>鼻</td>
		<td>нос</td>
		<td>ビ</td>
		<td>はな</td>
	</tr>
	<tr>
		<td>3</td>
		<td>複</td>
		<td>duplicate</td>
		<td>フク</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>鳴</td>
		<td>мычать и т. д., звучать, щебетать, чирикать</td>
		<td>メイ</td>
		<td>な.る, な.く, な.らす</td>
	</tr>
	<tr>
		<td>3</td>
		<td>綿</td>
		<td>cotton</td>
		<td>メン</td>
		<td>わた</td>
	</tr>
	<tr>
		<td>3</td>
		<td>様</td>
		<td>вид, положение</td>
		<td>ヨウ, ヨー, ショウ</td>
		<td>さま, さん</td>
	</tr>
	<tr>
		<td>3</td>
		<td>領</td>
		<td>territory</td>
		<td>リョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>緑</td>
		<td>зелёный</td>
		<td>リョ, リョク, ロク</td>
		<td>みどり</td>
	</tr>
	<tr>
		<td>3</td>
		<td>練</td>
		<td>практика, тренироваться</td>
		<td>レン</td>
		<td>ね.る, ね.り</td>
	</tr>
	<tr>
		<td>3</td>
		<td>歴</td>
		<td>последовательно, биография</td>
		<td>レキ, レッキ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>輪</td>
		<td>колесо</td>
		<td>リン</td>
		<td>わ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>編</td>
		<td>вязать, составлять</td>
		<td>ヘン</td>
		<td>あ.み, あ.む</td>
	</tr>
	<tr>
		<td>3</td>
		<td>箱</td>
		<td>коробка</td>
		<td>ソウ</td>
		<td>はこ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>熱</td>
		<td>горячий</td>
		<td>ネツ</td>
		<td>あつ.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>選</td>
		<td>выбирать</td>
		<td>セン</td>
		<td>えら.ぶ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>線</td>
		<td>линия</td>
		<td>セン</td>
		<td>すじ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>導</td>
		<td>guide</td>
		<td>ドウ</td>
		<td>みちび.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>談</td>
		<td>рассказ, беседа, разговор</td>
		<td>ダン</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>調</td>
		<td>темп, музыкальный тон, исследовать, налаживать</td>
		<td>チョウ, チョ</td>
		<td>しら.べ, ととの.う, しら.べる</td>
	</tr>
	<tr>
		<td>3</td>
		<td>横</td>
		<td>бок, горизонтальный</td>
		<td>オウ, オー</td>
		<td>よこ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>確</td>
		<td>достоверный, определённый</td>
		<td>コウ, カク</td>
		<td>たし.かめる, たし.か</td>
	</tr>
	<tr>
		<td>3</td>
		<td>課</td>
		<td>раздел</td>
		<td>カ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>器</td>
		<td>инструмент, способности, сосуд</td>
		<td>キ</td>
		<td>うつわ</td>
	</tr>
	<tr>
		<td>3</td>
		<td>賛</td>
		<td>approve</td>
		<td>サン</td>
		<td>たす.ける, たた.える</td>
	</tr>
	<tr>
		<td>3</td>
		<td>賞</td>
		<td>награда</td>
		<td>ショウ</td>
		<td>ほ.める</td>
	</tr>
	<tr>
		<td>3</td>
		<td>機</td>
		<td>момент, состояние человека, механизм</td>
		<td>キ</td>
		<td>はた</td>
	</tr>
	<tr>
		<td>3</td>
		<td>橋</td>
		<td>мост</td>
		<td>キョウ, キョ</td>
		<td>はし</td>
	</tr>
	<tr>
		<td>3</td>
		<td>築</td>
		<td>fabricate</td>
		<td>チク</td>
		<td>きず.く</td>
	</tr>
	<tr>
		<td>3</td>
		<td>積</td>
		<td>оценка, нагромождать</td>
		<td>セキ</td>
		<td>つ.もり, つ.もる, づ.み, つ.む</td>
	</tr>
	<tr>
		<td>3</td>
		<td>輸</td>
		<td>transport</td>
		<td>ユ, シュ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>録</td>
		<td>расшифровка</td>
		<td>ロク</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>績</td>
		<td>exploits</td>
		<td>セキ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>講</td>
		<td>lecture</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>職</td>
		<td>должность</td>
		<td>ショク, ショ, ソク</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>観</td>
		<td>осматривать, взгляд, вид</td>
		<td>カン</td>
		<td>しめ.す, み.る</td>
	</tr>
	<tr>
		<td>3</td>
		<td>額</td>
		<td>amount</td>
		<td>ガク</td>
		<td>ひたい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>類</td>
		<td>сорт, сходство</td>
		<td>ルイ</td>
		<td>たぐ.い</td>
	</tr>
	<tr>
		<td>3</td>
		<td>願</td>
		<td>желать, просить</td>
		<td>ガン</td>
		<td>ねが.う, ねがい</td>
	</tr>
	<tr>
		<td>3</td>
		<td>識</td>
		<td>сознание, знание</td>
		<td>シキ</td>
		<td></td>
	</tr>
	<tr>
		<td>3</td>
		<td>競</td>
		<td>подражание</td>
		<td>ケイ, キョウ</td>
		<td>せ.る, きそ.う</td>
	</tr>
	<tr>
		<td>3</td>
		<td>議</td>
		<td>предложение, обсуждение</td>
		<td>ギ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>了</td>
		<td>конец, понимать</td>
		<td>リョ, リョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>与</td>
		<td>предоставлять, давать, участвовать</td>
		<td>ヨ</td>
		<td>あずか.る, あた.える</td>
	</tr>
	<tr>
		<td>2</td>
		<td>亡</td>
		<td>смерть, покойный</td>
		<td>モウ, ボー, ボウ</td>
		<td>な.い, ほろ.びる, な.き</td>
	</tr>
	<tr>
		<td>2</td>
		<td>干</td>
		<td>сухой</td>
		<td>カン</td>
		<td>ひ.る, ほ.し, ぼ.し, ほ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>介</td>
		<td>посредничать</td>
		<td>カイ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>互</td>
		<td>mutually</td>
		<td>ゴ</td>
		<td>たが.い, かたみ.に</td>
	</tr>
	<tr>
		<td>2</td>
		<td>公</td>
		<td>общественный</td>
		<td>コウ, ク, コー</td>
		<td>おおやけ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>双</td>
		<td>pair</td>
		<td>ソウ</td>
		<td>ならぶ, ふた, たぐい, ふたつ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>片</td>
		<td>кусок, односторонний, один предмет из нескольких</td>
		<td>ヘン</td>
		<td>かた</td>
	</tr>
	<tr>
		<td>2</td>
		<td>匹</td>
		<td>equal</td>
		<td>ヒツ</td>
		<td>ひき</td>
	</tr>
	<tr>
		<td>2</td>
		<td>払</td>
		<td>усилительный суффикс, платить, чистить</td>
		<td>フツ, ヒツ, ホツ</td>
		<td>はら.い, ばら.い, はら.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>幼</td>
		<td>infancy</td>
		<td>ヨウ</td>
		<td>おさな.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>庁</td>
		<td>government office</td>
		<td>チョウ, テイ</td>
		<td>やくしょ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>占</td>
		<td>fortune telling</td>
		<td>セン</td>
		<td>うらな.う, し.める</td>
	</tr>
	<tr>
		<td>2</td>
		<td>込</td>
		<td>переполненный, вкладывать, включать</td>
		<td></td>
		<td>こ.む, こ.み</td>
	</tr>
	<tr>
		<td>2</td>
		<td>冊</td>
		<td>книга, том</td>
		<td>サク, サツ</td>
		<td>ふみ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>司</td>
		<td>управлять, ведать</td>
		<td>シ</td>
		<td>つかさど.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>処</td>
		<td>место, распоряжаться, наказание</td>
		<td>ショ</td>
		<td>ところ, お.る, こ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>収</td>
		<td>получать, собирать, сжимать, доход</td>
		<td>シュウ, シュ</td>
		<td>おさ.める, おさ.まる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>召</td>
		<td>вызывать</td>
		<td>ショ, ショウ</td>
		<td>め.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>巨</td>
		<td>гигантский</td>
		<td>キョ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>甘</td>
		<td>сладкий</td>
		<td>カン</td>
		<td>あま.える, あま.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>圧</td>
		<td>pressure</td>
		<td>エン, オウ, アツ</td>
		<td>お.す, おさ.える, へ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>永</td>
		<td>вечный</td>
		<td>エイ</td>
		<td>なが.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>衣</td>
		<td>одеяние</td>
		<td>エ, イ</td>
		<td>きぬ, ころも, ぎ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>汚</td>
		<td>грязный</td>
		<td>オ</td>
		<td>けが.す, きたな.い, けが.れる, よご.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>汗</td>
		<td>sweat</td>
		<td>カン</td>
		<td>あせ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>危</td>
		<td>опасный</td>
		<td>キ</td>
		<td>あぶ.ない, あや.うい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>宇</td>
		<td>eaves</td>
		<td>ウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>灰</td>
		<td>ashes</td>
		<td>カイ</td>
		<td>はい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>仮</td>
		<td>ненастоящий, временный, предполагаемый</td>
		<td>ケ, カ</td>
		<td>かり</td>
	</tr>
	<tr>
		<td>2</td>
		<td>叫</td>
		<td>кричать</td>
		<td>キョウ, キョ</td>
		<td>さけ.ぶ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>机</td>
		<td>desk</td>
		<td>キ</td>
		<td>つくえ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>吸</td>
		<td>сосать, высасывать, курить</td>
		<td>キュ, キュウ</td>
		<td>す.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>舟</td>
		<td>лодка</td>
		<td>シュウ, シュ</td>
		<td>ふね, ぶね, ふな</td>
	</tr>
	<tr>
		<td>2</td>
		<td>宅</td>
		<td>home</td>
		<td>タク</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>存</td>
		<td>полагать, существовать</td>
		<td>ゾン, ソン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>忙</td>
		<td>busy</td>
		<td>モウ, ボウ</td>
		<td>せわ.しい, いそが.しい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>灯</td>
		<td>свет, лампа</td>
		<td>トー, トウ</td>
		<td>ひ, とも.す, ともしび, ほ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>肌</td>
		<td>texture</td>
		<td>キ</td>
		<td>はだ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>否</td>
		<td>negate</td>
		<td>ヒ</td>
		<td>いや, いな</td>
	</tr>
	<tr>
		<td>2</td>
		<td>抜</td>
		<td>превосходить, вытаскивать, проходить насквозь</td>
		<td>ハイ, バツ, ハツ</td>
		<td>ぬ.く, ぬ.き, ぬ.ける</td>
	</tr>
	<tr>
		<td>2</td>
		<td>沈</td>
		<td>тонуть, погружаться</td>
		<td>チン, ジン</td>
		<td>しず.める, しず.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>戻</td>
		<td>возвращать</td>
		<td>レイ</td>
		<td>もど.す, もど.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>坊</td>
		<td>суффикс лица, мальчик, монах</td>
		<td>ボッ, ボー, ボウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>兵</td>
		<td>солдат</td>
		<td>ヒョウ, ヘイ</td>
		<td>つわもの</td>
	</tr>
	<tr>
		<td>2</td>
		<td>麦</td>
		<td>зерновые</td>
		<td>バク</td>
		<td>むぎ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>批</td>
		<td>criticism</td>
		<td>ヒ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>乱</td>
		<td>беспорядок, злоупотребление</td>
		<td>ラン, ロン</td>
		<td>みだ.る, みだ.す, みだ.れる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>卵</td>
		<td>egg</td>
		<td>ラン</td>
		<td>たまご</td>
	</tr>
	<tr>
		<td>2</td>
		<td>忘</td>
		<td>забывать</td>
		<td>ボー, ボウ</td>
		<td>わす.れる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>良</td>
		<td>хороший</td>
		<td>リョ, リョウ</td>
		<td>よ.い, い.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>伸</td>
		<td>растягиваться</td>
		<td>シン</td>
		<td>の.ばす, の.びる, の.べる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>辛</td>
		<td>spicy</td>
		<td>シン</td>
		<td>づら.い, から.い, つら.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>吹</td>
		<td>дуть</td>
		<td>スイ</td>
		<td>ふ.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>床</td>
		<td>пол, постель</td>
		<td>ショ, ショウ</td>
		<td>とこ, ゆか</td>
	</tr>
	<tr>
		<td>2</td>
		<td>条</td>
		<td>линия, параграф, статья, пункт</td>
		<td>チョウ, ジョ, ジョウ, デキ</td>
		<td>えだ, すじ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>志</td>
		<td>намерение</td>
		<td>シ, シリング</td>
		<td>こころざし, こころざ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>伺</td>
		<td>pay respects</td>
		<td>シ</td>
		<td>うかが.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>困</td>
		<td>затруднение</td>
		<td>コン</td>
		<td>こま.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>含</td>
		<td>include</td>
		<td>ガン</td>
		<td>ふく.める, ふく.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>更</td>
		<td>обновлять, ещё</td>
		<td>コウ, コー</td>
		<td>ふ.ける, さら, さら.に, ふ.かす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>迎</td>
		<td>welcome</td>
		<td>ゲイ</td>
		<td>むか.える</td>
	</tr>
	<tr>
		<td>2</td>
		<td>貝</td>
		<td>ракушка</td>
		<td>バイ</td>
		<td>かい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>応</td>
		<td>реагировать, отвечать</td>
		<td>オウ, -ノウ, ヨウ, オー</td>
		<td>こた.える, あた.る, まさに</td>
	</tr>
	<tr>
		<td>2</td>
		<td>押</td>
		<td>надавить</td>
		<td>オウ, オー</td>
		<td>お.さえる, お.す, おさ.える, お.っ, お.し</td>
	</tr>
	<tr>
		<td>2</td>
		<td>欧</td>
		<td>Europe</td>
		<td>オウ</td>
		<td>は.く, うた.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>延</td>
		<td>prolong</td>
		<td>エン</td>
		<td>の.べ, の.びる, の.べる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>依</td>
		<td>reliant</td>
		<td>エ, イ</td>
		<td>よ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>拡</td>
		<td>broaden</td>
		<td>コウ, カク</td>
		<td>ひろ.がる, ひろ.める, ひろ.げる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>価</td>
		<td>цена, ценность</td>
		<td>ケ, カ</td>
		<td>あたい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>券</td>
		<td>ticket</td>
		<td>ケン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>肩</td>
		<td>плечо</td>
		<td>ケン</td>
		<td>かた</td>
	</tr>
	<tr>
		<td>2</td>
		<td>呼</td>
		<td>звать</td>
		<td>コ</td>
		<td>よ.ぶ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>肯</td>
		<td>agreement</td>
		<td>コウ</td>
		<td>がえんじ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>祈</td>
		<td>pray</td>
		<td>キ</td>
		<td>いの.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>供</td>
		<td>предоставлять</td>
		<td>ク, グ, クウ, キョウ, キョ</td>
		<td>とも, そな.える, ども</td>
	</tr>
	<tr>
		<td>2</td>
		<td>況</td>
		<td>положение</td>
		<td>キョウ, キョ</td>
		<td>おもむき, まし.て, いわ.んや</td>
	</tr>
	<tr>
		<td>2</td>
		<td>刺</td>
		<td>колоть</td>
		<td>シ</td>
		<td>さ.し, さし, さ.す, さ.さる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>刻</td>
		<td>гравировать, время</td>
		<td>コク</td>
		<td>きざ.み, きざ.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>昇</td>
		<td>rise up</td>
		<td>ショウ</td>
		<td>のぼ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>若</td>
		<td>молодой</td>
		<td>ニャク, ジャク, ニャ, ジャ</td>
		<td>も.しくは, わか.い, も.しくわ, わか</td>
	</tr>
	<tr>
		<td>2</td>
		<td>姓</td>
		<td>surname</td>
		<td>ショウ, セイ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>担</td>
		<td>shouldering</td>
		<td>タン</td>
		<td>かつ.ぐ, にな.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>宙</td>
		<td>mid-air</td>
		<td>チュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>怖</td>
		<td>страшный</td>
		<td>フ, ホ</td>
		<td>こわ.い, こわ.がる, お.じる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>並</td>
		<td>расставлять, ряд, обычный</td>
		<td>ホウ, ヘイ</td>
		<td>なら.ぶ, なみ, なら.べる, な.み</td>
	</tr>
	<tr>
		<td>2</td>
		<td>沸</td>
		<td>seethe</td>
		<td>フツ</td>
		<td>わ.かす, わ.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>宝</td>
		<td>treasure</td>
		<td>ホウ</td>
		<td>たから</td>
	</tr>
	<tr>
		<td>2</td>
		<td>抱</td>
		<td>питать чувства, обнимать</td>
		<td>ホー, ホウ</td>
		<td>かか.える, いだ.く, だ.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>枚</td>
		<td>счётное слово для плоских предметов</td>
		<td>バイ, マイ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>泥</td>
		<td>mud</td>
		<td>デイ, ナイ, デ, ニ</td>
		<td>どろ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>毒</td>
		<td>яд</td>
		<td>ドク</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>突</td>
		<td>неожиданно, ударять</td>
		<td>トツ, カ</td>
		<td>つ.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>届</td>
		<td>заявлять, уведомлять, доставлять</td>
		<td>カイ</td>
		<td>とど.く, とど.ける, とど.け</td>
	</tr>
	<tr>
		<td>2</td>
		<td>彼</td>
		<td>он, тот</td>
		<td>ヒ</td>
		<td>かれ, か.の, かの</td>
	</tr>
	<tr>
		<td>2</td>
		<td>拝</td>
		<td>worship</td>
		<td>ハイ</td>
		<td>おろが.む, おが.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>杯</td>
		<td>counter for cupfuls</td>
		<td>ハイ</td>
		<td>さかずき</td>
	</tr>
	<tr>
		<td>2</td>
		<td>泊</td>
		<td>overnight</td>
		<td>ハク</td>
		<td>と.める, と.まる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>到</td>
		<td>прибытие</td>
		<td>トー, トウ</td>
		<td>いた.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>乳</td>
		<td>milk</td>
		<td>ニュウ</td>
		<td>ちち, ち</td>
	</tr>
	<tr>
		<td>2</td>
		<td>逃</td>
		<td>убежать, сбежать</td>
		<td>トー, トウ</td>
		<td>に.げる, のが.れる, に.がす, のが.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>背</td>
		<td>противоречить, спина, сзади, рост</td>
		<td>ハイ</td>
		<td>そむ.く, せい, せ, そむ.ける</td>
	</tr>
	<tr>
		<td>2</td>
		<td>畑</td>
		<td>поле</td>
		<td></td>
		<td>ばたけ, はたけ, はた</td>
	</tr>
	<tr>
		<td>2</td>
		<td>怒</td>
		<td>сердиться, гнев</td>
		<td>ヌ, ド</td>
		<td>いか.る, おこ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>珍</td>
		<td>rare</td>
		<td>チン</td>
		<td>たから, めずら.しい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>保</td>
		<td>заботиться, ручаться, сохранять, поддерживать</td>
		<td>ホ, ホウ</td>
		<td>たも.つ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>秒</td>
		<td>секунда</td>
		<td>ビョウ, ビョ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>封</td>
		<td>seal</td>
		<td>フウ, ホウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>律</td>
		<td>rhythm</td>
		<td>レツ, リツ, リチ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>柱</td>
		<td>столб</td>
		<td>チュウ, チュ</td>
		<td>はしら</td>
	</tr>
	<tr>
		<td>2</td>
		<td>段</td>
		<td>стадия, ступень</td>
		<td>タン, ダン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>城</td>
		<td>крепость, замок</td>
		<td>ジョ, ジョウ</td>
		<td>しろ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>専</td>
		<td>specialty</td>
		<td>セン</td>
		<td>もっぱ.ら</td>
	</tr>
	<tr>
		<td>2</td>
		<td>泉</td>
		<td>родник</td>
		<td>セン</td>
		<td>いずみ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>浅</td>
		<td>мелкий</td>
		<td>セン</td>
		<td>あさ.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>柔</td>
		<td>tender</td>
		<td>ジュウ, ニュウ</td>
		<td>やわ.らか, やわ.らかい, やわ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>拾</td>
		<td>поднимать, подбирать</td>
		<td>シュウ, シュ, ジュウ</td>
		<td>ひろ.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>咲</td>
		<td>blossom</td>
		<td>ショウ</td>
		<td>ざき, さ.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>紅</td>
		<td>алый</td>
		<td>コウ, ク, コー</td>
		<td>べに, くれない, あか.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>香</td>
		<td>аромат</td>
		<td>コウ, キョウ, コー</td>
		<td>か, かお.る, かお.り</td>
	</tr>
	<tr>
		<td>2</td>
		<td>砂</td>
		<td>песок</td>
		<td>シャ, サ</td>
		<td>すな</td>
	</tr>
	<tr>
		<td>2</td>
		<td>狭</td>
		<td>cramped</td>
		<td>コウ, キョウ</td>
		<td>せま.い, せば.まる, せば.める</td>
	</tr>
	<tr>
		<td>2</td>
		<td>挟</td>
		<td>pinch</td>
		<td>キョウ, ショウ</td>
		<td>はさ.まる, はさ.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>荒</td>
		<td>бурный, заброшенный, грубый</td>
		<td>コウ, コー</td>
		<td>あ.れる, あら, あ.らす, あら.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>郊</td>
		<td>outskirts</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>故</td>
		<td>обстоятельства</td>
		<td>コ</td>
		<td>ゆえ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>枯</td>
		<td>wither</td>
		<td>コ</td>
		<td>か.れる, か.らす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>皆</td>
		<td>всё, все</td>
		<td>カイ</td>
		<td>みな, みんな</td>
	</tr>
	<tr>
		<td>2</td>
		<td>革</td>
		<td>leather</td>
		<td>カク</td>
		<td>かわ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>看</td>
		<td>watch over</td>
		<td>カン</td>
		<td>み.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>巻</td>
		<td>том, свёртывать</td>
		<td>ケン, カン</td>
		<td>まき, ま.き, ま.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>案</td>
		<td>план, идея</td>
		<td>アン</td>
		<td>つくえ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>軒</td>
		<td>край крыши, дом</td>
		<td>ケン</td>
		<td>のき</td>
	</tr>
	<tr>
		<td>2</td>
		<td>原</td>
		<td>луг</td>
		<td>ゲン</td>
		<td>はら</td>
	</tr>
	<tr>
		<td>2</td>
		<td>恵</td>
		<td>favor</td>
		<td>ケイ, エ</td>
		<td>めぐ.み, めぐ.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>降</td>
		<td>снеге), спускаться, сдаваться, идти (о дожде</td>
		<td>コウ, ゴ, コー</td>
		<td>ふ.り, ふ.る, お.りる, お.ろす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>胸</td>
		<td>грудь</td>
		<td>キョウ, キョ</td>
		<td>むね, むな</td>
	</tr>
	<tr>
		<td>2</td>
		<td>恐</td>
		<td>страх</td>
		<td>キョウ, キョ</td>
		<td>おそ.る, おそ.れる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>座</td>
		<td>сидеть, место для сидения</td>
		<td>ザ</td>
		<td>すわ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>耕</td>
		<td>земледение</td>
		<td>コウ, コー</td>
		<td>たがや.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>骨</td>
		<td>кость</td>
		<td>コツ</td>
		<td>ほね</td>
	</tr>
	<tr>
		<td>2</td>
		<td>脂</td>
		<td>fat</td>
		<td>シ</td>
		<td>あぶら</td>
	</tr>
	<tr>
		<td>2</td>
		<td>修</td>
		<td>учиться, чинить</td>
		<td>シュウ, シュ</td>
		<td>おさ.める, おさ.まる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>純</td>
		<td>беспримесный, чистый</td>
		<td>ジュン, ジュ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>将</td>
		<td>командир, генерал</td>
		<td>ソウ, ショ, ショウ</td>
		<td>まさ.に, ひきい.る, まさ, はた</td>
	</tr>
	<tr>
		<td>2</td>
		<td>捜</td>
		<td>search</td>
		<td>シュウ, シュ, ソウ</td>
		<td>さが.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>除</td>
		<td>exclude</td>
		<td>ジョ, ジ</td>
		<td>のぞ.く, よ.け</td>
	</tr>
	<tr>
		<td>2</td>
		<td>針</td>
		<td>needle</td>
		<td>シン</td>
		<td>はり</td>
	</tr>
	<tr>
		<td>2</td>
		<td>値</td>
		<td>цена, величина</td>
		<td>チ</td>
		<td>ね, あたい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>恥</td>
		<td>стыд</td>
		<td>チ</td>
		<td>は.じる, は.じらう, はじ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>畜</td>
		<td>livestock</td>
		<td>チク</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>涙</td>
		<td>слезы</td>
		<td>レイ, ルイ</td>
		<td>なみだ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>恋</td>
		<td>любовь (романтическая)</td>
		<td>レン</td>
		<td>こ.う, こい.しい, こい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>粉</td>
		<td>мука</td>
		<td>フン, デシメートル</td>
		<td>こな, こ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>浮</td>
		<td>плавающий, нестабильный, плавать</td>
		<td>フ</td>
		<td>う.かぶ, む, う.かれる, う.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>疲</td>
		<td>exhausted</td>
		<td>ヒ</td>
		<td>づか.れ, つか.らす, つか.れる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>被</td>
		<td>incur</td>
		<td>ヒ</td>
		<td>おお.う, かぶ.る, こうむ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>途</td>
		<td>путь</td>
		<td>ト</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>捕</td>
		<td>catch</td>
		<td>ホ</td>
		<td>と.る, と.らわれる, と.らえる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>眠</td>
		<td>спать</td>
		<td>ミン</td>
		<td>ねむ.い, ねむ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>娘</td>
		<td>дочь</td>
		<td>ジョウ</td>
		<td>むすめ, こ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>埋</td>
		<td>bury</td>
		<td>マイ</td>
		<td>う.まる, う.もれる, う.める</td>
	</tr>
	<tr>
		<td>2</td>
		<td>展</td>
		<td>expand</td>
		<td>テン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>倒</td>
		<td>падать, валиться</td>
		<td>トー, トウ</td>
		<td>たお.す, だお.れ, たお.れる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>党</td>
		<td>political party</td>
		<td>トウ</td>
		<td>むら, なかま</td>
	</tr>
	<tr>
		<td>2</td>
		<td>凍</td>
		<td>frozen</td>
		<td>トウ</td>
		<td>こご.る, こご.える, こお.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>般</td>
		<td>generally</td>
		<td>ハン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>悩</td>
		<td>trouble</td>
		<td>ノウ</td>
		<td>なや.ます, なや.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>盗</td>
		<td>steal</td>
		<td>トウ</td>
		<td>ぬす.み, ぬす.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>脳</td>
		<td>brain</td>
		<td>ドウ, ノウ</td>
		<td>のうずる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>猫</td>
		<td>кошка</td>
		<td>ビョウ, ビョ</td>
		<td>ねこ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>軟</td>
		<td>soft</td>
		<td>ナン</td>
		<td>やわ.らか, やわ.らかい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>販</td>
		<td>marketing</td>
		<td>ハン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>訪</td>
		<td>посещать</td>
		<td>ホー, ホウ</td>
		<td>おとず.れる, と.う, たず.ねる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>符</td>
		<td>token</td>
		<td>フ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>貧</td>
		<td>poor</td>
		<td>ビン, ヒン</td>
		<td>まず.しい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>閉</td>
		<td>закрывать</td>
		<td>ヘイ</td>
		<td>し.める, と.ざす, と.じる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>粒</td>
		<td>grains</td>
		<td>リュウ</td>
		<td>つぶ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>涼</td>
		<td>refreshing</td>
		<td>リョウ</td>
		<td>すず.やか, すず.しい, すず.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>欲</td>
		<td>желание, жадность</td>
		<td>ヨク</td>
		<td>ほっ.する, ほ.しい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>翌</td>
		<td>forthcoming</td>
		<td>ヨク</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>郵</td>
		<td>mail</td>
		<td>ユウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>紹</td>
		<td>introduce</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>頂</td>
		<td>place on the head</td>
		<td>チョウ</td>
		<td>いただ.く, いただき</td>
	</tr>
	<tr>
		<td>2</td>
		<td>著</td>
		<td>автор, примечательный</td>
		<td>チャク, チョ</td>
		<td>いちじる.しい, あらわ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>張</td>
		<td>натягивать</td>
		<td>チョウ, チョ</td>
		<td>は.り, ば.り, は.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>袋</td>
		<td>sack</td>
		<td>ダイ, タイ</td>
		<td>ふくろ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>探</td>
		<td>искать, разведывать</td>
		<td>タン</td>
		<td>さが.す, さぐ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>掃</td>
		<td>sweep</td>
		<td>シュ, ソウ</td>
		<td>は.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>窓</td>
		<td>окно</td>
		<td>ソウ, ス, ソー</td>
		<td>てんまど, まど, けむだし</td>
	</tr>
	<tr>
		<td>2</td>
		<td>授</td>
		<td>обучать, даровать</td>
		<td>ジュ</td>
		<td>さず.ける, さず.かる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>捨</td>
		<td>выбрасывать</td>
		<td>シャ</td>
		<td>す.てる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>婚</td>
		<td>брак</td>
		<td>コン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>採</td>
		<td>pick</td>
		<td>サイ</td>
		<td>と.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>済</td>
		<td>уплачивать, окончиться, помогать</td>
		<td>サイ, セイ</td>
		<td>す.まない, ずみ, ず.み, す.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>偶</td>
		<td>accidentally</td>
		<td>グウ</td>
		<td>たま</td>
	</tr>
	<tr>
		<td>2</td>
		<td>掘</td>
		<td>dig</td>
		<td>クツ</td>
		<td>ほ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>康</td>
		<td>мир</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>健</td>
		<td>здоровый</td>
		<td>ケン</td>
		<td>すこ.やか</td>
	</tr>
	<tr>
		<td>2</td>
		<td>異</td>
		<td>отличаться</td>
		<td>イ</td>
		<td>こと.なる, こと, け</td>
	</tr>
	<tr>
		<td>2</td>
		<td>黄</td>
		<td>жёлтый</td>
		<td>コウ, オウ, オー, コー</td>
		<td>き, こ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>乾</td>
		<td>dry</td>
		<td>ケン, カン</td>
		<td>かわ.かす, かわ.く, ほ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>基</td>
		<td>foundation</td>
		<td>キ</td>
		<td>もと, もとい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>域</td>
		<td>range</td>
		<td>イキ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>械</td>
		<td>хитроумное изобретение</td>
		<td>カイ</td>
		<td>かせ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>菓</td>
		<td>confectionery</td>
		<td>カ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>割</td>
		<td>соотношение величин, разделять, уступать, делить</td>
		<td>カツ</td>
		<td>わり, わ.れる, さ.く, わ.り, わ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>換</td>
		<td>interchange</td>
		<td>カン</td>
		<td>か.える, か.わる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>奥</td>
		<td>глубь</td>
		<td>オク, オウ, オー</td>
		<td>くま, おく, おく.まる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>偉</td>
		<td>admirable</td>
		<td>イ</td>
		<td>えら.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>越</td>
		<td>пересекать</td>
		<td>オツ, エツ</td>
		<td>ご.し, こ.える, こ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>敬</td>
		<td>уважать</td>
		<td>キョウ, ケイ</td>
		<td>うやま.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>減</td>
		<td>decrease</td>
		<td>ゲン</td>
		<td>へ.らす, へ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>雇</td>
		<td>employ</td>
		<td>コ</td>
		<td>やと.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>硬</td>
		<td>stiff</td>
		<td>コウ</td>
		<td>かた.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>御</td>
		<td>уважительный префикс</td>
		<td>ギョ, ゴ</td>
		<td>お, おん, み</td>
	</tr>
	<tr>
		<td>2</td>
		<td>隅</td>
		<td>corner</td>
		<td>グウ</td>
		<td>すみ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>勤</td>
		<td>diligence</td>
		<td>キン, ゴン</td>
		<td>づと.め, つと.める, つと.まる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>喫</td>
		<td>consume</td>
		<td>キツ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>湿</td>
		<td>damp</td>
		<td>シュウ, シツ</td>
		<td>しめ.る, うるお.う, しめ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>詞</td>
		<td>poetry</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>畳</td>
		<td>tatami mat</td>
		<td>チョウ, ジョウ</td>
		<td>かさ.なる, たた.む, たたみ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>装</td>
		<td>упаковка, наряд, снаряжать</td>
		<td>ショウ, ソウ, ソー</td>
		<td>よそお.い, よそお.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>善</td>
		<td>правильный, добро</td>
		<td>ゼン</td>
		<td>よ.い, い.い, よ.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>晴</td>
		<td>ясная погода</td>
		<td>セイ</td>
		<td>は.れる, は.らす, は.れ, ば.れ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>尊</td>
		<td>уважать, почитать</td>
		<td>ソン</td>
		<td>たっ.い, とうと.い, たっと.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>替</td>
		<td>обмен</td>
		<td>タイ</td>
		<td>か.え, か.える, か.わる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>超</td>
		<td>transcend</td>
		<td>チョウ</td>
		<td>こ.える, こ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>遅</td>
		<td>поздний, медленный</td>
		<td>チ</td>
		<td>おく.らす, おく.れる, おそ.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>絡</td>
		<td>entwine</td>
		<td>ラク</td>
		<td>から.む, から.まる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>湾</td>
		<td>gulf</td>
		<td>ワン</td>
		<td>いりえ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>腕</td>
		<td>рука (от плеча до кисти), умение</td>
		<td>ワン</td>
		<td>うで</td>
	</tr>
	<tr>
		<td>2</td>
		<td>幅</td>
		<td>breadth</td>
		<td>フク</td>
		<td>はば</td>
	</tr>
	<tr>
		<td>2</td>
		<td>普</td>
		<td>обычный, всеобщий</td>
		<td>フ</td>
		<td>あまねし, あまね.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>評</td>
		<td>оценка, критика, обсуждение</td>
		<td>ヒョ, ヒョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>帽</td>
		<td>cap</td>
		<td>モウ, ボウ</td>
		<td>おお.う, ずきん</td>
	</tr>
	<tr>
		<td>2</td>
		<td>補</td>
		<td>supplement</td>
		<td>ホ</td>
		<td>おぎな.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>募</td>
		<td>recruit</td>
		<td>ボ</td>
		<td>つの.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>棒</td>
		<td>rod</td>
		<td>ボウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>晩</td>
		<td>поздний, вечер</td>
		<td>バン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>鈍</td>
		<td>dull</td>
		<td>ドン</td>
		<td>にぶ, にぶ.る, にぶ.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>塔</td>
		<td>pagoda</td>
		<td>トウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>筒</td>
		<td>cylinder</td>
		<td>トウ</td>
		<td>つつ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>痛</td>
		<td>боль</td>
		<td>ツー, ツウ</td>
		<td>いた.ましい, いた.い, いた.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>渡</td>
		<td>переправляться</td>
		<td>ト</td>
		<td>わた.る, わた.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>殿</td>
		<td>суффикс доно, дворец</td>
		<td>テン, デン</td>
		<td>どの, との</td>
	</tr>
	<tr>
		<td>2</td>
		<td>塗</td>
		<td>paint</td>
		<td>ト</td>
		<td>まみ.れる, ぬ.る, ぬ.り</td>
	</tr>
	<tr>
		<td>2</td>
		<td>賃</td>
		<td>fare</td>
		<td>チン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>福</td>
		<td>счастье, удача</td>
		<td>フク</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>腹</td>
		<td>живот</td>
		<td>フク</td>
		<td>はら</td>
	</tr>
	<tr>
		<td>2</td>
		<td>零</td>
		<td>zero</td>
		<td>レイ</td>
		<td>こぼ.れる, ぜろ, こぼ.す</td>
	</tr>
	<tr>
		<td>2</td>
		<td>裏</td>
		<td>изнанка, оборотная сторона</td>
		<td>リ</td>
		<td>うら</td>
	</tr>
	<tr>
		<td>2</td>
		<td>溶</td>
		<td>melt</td>
		<td>ヨウ</td>
		<td>と.かす, と.く, と.ける</td>
	</tr>
	<tr>
		<td>2</td>
		<td>預</td>
		<td>deposit</td>
		<td>ヨ</td>
		<td>あず.かる, あず.ける</td>
	</tr>
	<tr>
		<td>2</td>
		<td>暖</td>
		<td>warmth</td>
		<td>ノン, ダン</td>
		<td>あたた.かい, あたた.か</td>
	</tr>
	<tr>
		<td>2</td>
		<td>節</td>
		<td>экономить, узел, отрезок времени, сустав, мотив</td>
		<td>セチ, セツ</td>
		<td>のっと, ぶし, ふし</td>
	</tr>
	<tr>
		<td>2</td>
		<td>寝</td>
		<td>ложиться спать</td>
		<td>シン</td>
		<td>ね.る, い.ぬ, ね.かす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>蒸</td>
		<td>foment</td>
		<td>ジョウ, セイ</td>
		<td>む.す, む.らす, む.れる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>触</td>
		<td>прикасаться, объявлять, трогать</td>
		<td>ショク, ショ</td>
		<td>さわ.る, さわ, ふ.れる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>照</td>
		<td>светить, сопоставлять, прицеливание</td>
		<td>ショ, ショウ</td>
		<td>て.れる, て.る, て.らす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>署</td>
		<td>government office</td>
		<td>ショ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>辞</td>
		<td>resign</td>
		<td>ジ</td>
		<td>や.める, いな.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>腰</td>
		<td>поясница</td>
		<td>ヨウ, ヨー</td>
		<td>こし</td>
	</tr>
	<tr>
		<td>2</td>
		<td>歳</td>
		<td>возраст, год</td>
		<td>サイ, セイ</td>
		<td>とし, よわい, とせ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>詰</td>
		<td>набивать, упакованный</td>
		<td>キツ, キチ</td>
		<td>づ.め, つ.まる, つ.め, つ.める</td>
	</tr>
	<tr>
		<td>2</td>
		<td>靴</td>
		<td>shoes</td>
		<td>カ</td>
		<td>くつ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>群</td>
		<td>группа, толпа</td>
		<td>グン</td>
		<td>むら, む.れる, む.れ, むら.がる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>傾</td>
		<td>lean</td>
		<td>ケイ</td>
		<td>かたむ.ける, かたむ.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>鉱</td>
		<td>mineral</td>
		<td>コウ</td>
		<td>あらがね</td>
	</tr>
	<tr>
		<td>2</td>
		<td>違</td>
		<td>ошибаться, отличаться</td>
		<td>イ</td>
		<td>ちが.う, ちが.える, ちが.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>煙</td>
		<td>дым</td>
		<td>エン</td>
		<td>けむり, けむ.る, けむ.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>較</td>
		<td>contrast</td>
		<td>コウ, カク</td>
		<td>くら.べる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>誤</td>
		<td>mistake</td>
		<td>ゴ</td>
		<td>あやま.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>疑</td>
		<td>сомневаться, подозревать</td>
		<td>ギ</td>
		<td>うたが.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>誌</td>
		<td>document</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>緒</td>
		<td>чувство, начало</td>
		<td>ショ, チョ</td>
		<td>お, いとぐち</td>
	</tr>
	<tr>
		<td>2</td>
		<td>憎</td>
		<td>hate</td>
		<td>ゾウ</td>
		<td>にく.い, にく.らしい, にく.む</td>
	</tr>
	<tr>
		<td>2</td>
		<td>層</td>
		<td>stratum</td>
		<td>ソウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>踊</td>
		<td>jump</td>
		<td>ヨウ</td>
		<td>おど.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>暮</td>
		<td>сумерки</td>
		<td>ボ</td>
		<td>く.れる, く.らす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>滴</td>
		<td>drip</td>
		<td>テキ</td>
		<td>したた.る, しずく</td>
	</tr>
	<tr>
		<td>2</td>
		<td>認</td>
		<td>одобрять, признавать</td>
		<td>ニン</td>
		<td>みと.める, したた.める</td>
	</tr>
	<tr>
		<td>2</td>
		<td>髪</td>
		<td>волосы (на голове)</td>
		<td>ハツ</td>
		<td>かみ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>暴</td>
		<td>насилие</td>
		<td>バク, ボー, ボウ</td>
		<td>あば.れる, あば.く</td>
	</tr>
	<tr>
		<td>2</td>
		<td>標</td>
		<td>указатель</td>
		<td>ヒョウ</td>
		<td>しるべ, しるし</td>
	</tr>
	<tr>
		<td>2</td>
		<td>膚</td>
		<td>skin</td>
		<td>フ</td>
		<td>はだ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>舞</td>
		<td>танец</td>
		<td>ブ</td>
		<td>まい, ま.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>論</td>
		<td>рассуждать, теория</td>
		<td>ロン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>蔵</td>
		<td>кладовая, склад</td>
		<td>ゾー, ソウ, ゾウ</td>
		<td>おさ.める, かく.れる, くら</td>
	</tr>
	<tr>
		<td>2</td>
		<td>駐</td>
		<td>stop-over</td>
		<td>チュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>震</td>
		<td>землетрясение, дрожать, трястись</td>
		<td>シン</td>
		<td>ふる.える, ふる.う</td>
	</tr>
	<tr>
		<td>2</td>
		<td>諸</td>
		<td>различные, все, многие</td>
		<td>ショ</td>
		<td>もろ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>劇</td>
		<td>интенсивный, драма, пьеса</td>
		<td>ゲキ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>権</td>
		<td>власть, права</td>
		<td>ケン, ゴン</td>
		<td>はか.る, かり, おもり</td>
	</tr>
	<tr>
		<td>2</td>
		<td>億</td>
		<td>сто миллионов</td>
		<td>オク</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>鋭</td>
		<td>pointed</td>
		<td>エイ</td>
		<td>するど.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>賢</td>
		<td>intelligent</td>
		<td>ケン</td>
		<td>かしこ.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>整</td>
		<td>приводить в порядок</td>
		<td>セイ</td>
		<td>ととの.う, ととの.える</td>
	</tr>
	<tr>
		<td>2</td>
		<td>操</td>
		<td>maneuver</td>
		<td>ソウ, サン</td>
		<td>みさお, あやつ.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>頼</td>
		<td>полагаться, поручать, просить</td>
		<td>ライ</td>
		<td>たよ.る, たの.む, たの.もしい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>壁</td>
		<td>стена</td>
		<td>ヘキ</td>
		<td>かべ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>磨</td>
		<td>grind</td>
		<td>マ</td>
		<td>みが.く, す.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>薄</td>
		<td>недостаточный, слабый, тонкий</td>
		<td>ハク</td>
		<td>うす.い, うす.める, うす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>燃</td>
		<td>burn</td>
		<td>ネン</td>
		<td>も.える, も.す, も.やす</td>
	</tr>
	<tr>
		<td>2</td>
		<td>濃</td>
		<td>concentrated</td>
		<td>ノウ</td>
		<td>こ.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>曇</td>
		<td>cloudy weather</td>
		<td>ドン</td>
		<td>くも.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>優</td>
		<td>актёр, изящный, превосходный</td>
		<td>ユウ, ユー, ウ</td>
		<td>まさ.る, すぐ.れる, やさ.しい</td>
	</tr>
	<tr>
		<td>2</td>
		<td>齢</td>
		<td>age</td>
		<td>レイ</td>
		<td>とし, よわ.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>療</td>
		<td>heal</td>
		<td>リョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>燥</td>
		<td>parch</td>
		<td>ソウ</td>
		<td>はしゃ.ぐ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>濯</td>
		<td>laundry</td>
		<td>タク</td>
		<td>ゆす.ぐ, すす.ぐ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>環</td>
		<td>ring</td>
		<td>カン</td>
		<td>わ</td>
	</tr>
	<tr>
		<td>2</td>
		<td>簡</td>
		<td>простота</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>贈</td>
		<td>presents</td>
		<td>ソウ, ゾウ</td>
		<td>おく.る</td>
	</tr>
	<tr>
		<td>2</td>
		<td>難</td>
		<td>порицать, бедствие, трудный</td>
		<td>ナン</td>
		<td>むずか.しい, かた.い, がた.い</td>
	</tr>
	<tr>
		<td>2</td>
		<td>爆</td>
		<td>взрыв</td>
		<td>バク</td>
		<td>は.ぜる</td>
	</tr>
	<tr>
		<td>2</td>
		<td>臓</td>
		<td>внутренности</td>
		<td>ゾー, ゾウ</td>
		<td>はらわた</td>
	</tr>
	<tr>
		<td>2</td>
		<td>警</td>
		<td>полиция, сторожить</td>
		<td>ケイ</td>
		<td>いまし.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>乙</td>
		<td>младший, второй</td>
		<td>イツ, オツ</td>
		<td>きのと, おと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>丁</td>
		<td>чётный, лист</td>
		<td>チョウ, チン, トウ, テイ, チ, チョ</td>
		<td>ひのと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>刀</td>
		<td>катана</td>
		<td>トー, トウ</td>
		<td>そり, かたな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>又</td>
		<td>опять</td>
		<td>ユウ</td>
		<td>また.の, また</td>
	</tr>
	<tr>
		<td>1</td>
		<td>凡</td>
		<td>mediocre</td>
		<td>ハン, ボン</td>
		<td>おうよ.そ, およ.そ, すべ.て</td>
	</tr>
	<tr>
		<td>1</td>
		<td>寸</td>
		<td>сун (3.03 см), малый</td>
		<td>スン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>及</td>
		<td>достигать, упоминать</td>
		<td>キュ, キュウ</td>
		<td>およ.び, および, およ.ぶ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>弓</td>
		<td>лук (оружие)</td>
		<td>キュ, キュウ</td>
		<td>ゆみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>己</td>
		<td>сам</td>
		<td>コ, キ</td>
		<td>おのれ, つちのと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>士</td>
		<td>воин, благородный муж</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>丈</td>
		<td>крепкий, здоровый, высота</td>
		<td>ジョ, ジョウ</td>
		<td>だけ, たけ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>刃</td>
		<td>blade</td>
		<td>ニン, ジン</td>
		<td>き.る, やいば, は</td>
	</tr>
	<tr>
		<td>1</td>
		<td>冗</td>
		<td>superfluous</td>
		<td>ジョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>升</td>
		<td>мера ёмкости</td>
		<td>ショ, ショウ</td>
		<td>ます</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尺</td>
		<td>мера длины, сяку</td>
		<td>シャ, シャク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>氏</td>
		<td>фамилия, род</td>
		<td>シ</td>
		<td>うじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>幻</td>
		<td>phantasm</td>
		<td>ゲン</td>
		<td>まぼろし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>孔</td>
		<td>cavity</td>
		<td>コウ</td>
		<td>あな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>凶</td>
		<td>злодей, несчастье</td>
		<td>キョウ, キョ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>斤</td>
		<td>кин (~600 грамм)</td>
		<td>キン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>井</td>
		<td>колодец</td>
		<td>ショウ, セイ</td>
		<td>い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>刈</td>
		<td>reap</td>
		<td>カイ, ガイ</td>
		<td>か.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>仁</td>
		<td>kindness</td>
		<td>ニン, ニ, ジン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>斗</td>
		<td>ковш, то (18 л)</td>
		<td>トウ, ト</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>爪</td>
		<td>claw</td>
		<td>ソウ</td>
		<td>つめ, つま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>屯</td>
		<td>тонна (сокращение от 噸), военный лагерь</td>
		<td>トン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>弔</td>
		<td>condolences</td>
		<td>チョウ</td>
		<td>とむら.う, とぶら.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>丹</td>
		<td>cinnabar</td>
		<td>タン</td>
		<td>に</td>
	</tr>
	<tr>
		<td>1</td>
		<td>勿</td>
		<td>не (при запрещении)</td>
		<td>モチ, ボツ, ブツ</td>
		<td>なか.れ, なし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尤</td>
		<td></td>
		<td>ユウ</td>
		<td>もっと.も, とが.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>厄</td>
		<td>unlucky</td>
		<td>ヤク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>匂</td>
		<td>scent</td>
		<td></td>
		<td>にお.い, にお.う, にお.わせる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>乏</td>
		<td>scarce</td>
		<td>ボウ</td>
		<td>とぼ.しい, とも.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>丙</td>
		<td>third class</td>
		<td>ヘイ</td>
		<td>ひのえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>弁</td>
		<td>различать, клапан, платить, лепесток, речь</td>
		<td>ベン, ヘン</td>
		<td>わきま.える, わ.ける, はなびら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尼</td>
		<td>nun</td>
		<td>ニ</td>
		<td>あま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>矛</td>
		<td>алебарда</td>
		<td>ム, ボウ</td>
		<td>ほこ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>矢</td>
		<td>стрела</td>
		<td>シ</td>
		<td>や</td>
	</tr>
	<tr>
		<td>1</td>
		<td>旦</td>
		<td>новый день</td>
		<td>タン, ダン</td>
		<td>あきら, あき.らか, ただし, あさ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>只</td>
		<td>бесплатно, только, просто</td>
		<td>シ</td>
		<td>ただ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>叩</td>
		<td></td>
		<td>コウ</td>
		<td>すぎ, たた.く, はた.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>凸</td>
		<td>convex</td>
		<td>トツ</td>
		<td>でこ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>斥</td>
		<td>reject</td>
		<td>セキ</td>
		<td>しりぞ.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>仙</td>
		<td>hermit</td>
		<td>セント, セン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>瓦</td>
		<td>tile</td>
		<td>ガ</td>
		<td>ぐらむ, かわら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>凹</td>
		<td>concave</td>
		<td>オウ</td>
		<td>くぼ.む, ぼこ, へこ.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>丘</td>
		<td>hill</td>
		<td>キュウ</td>
		<td>おか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>句</td>
		<td>фраза</td>
		<td>ク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>甲</td>
		<td>панцирь, броня</td>
		<td>コウ, カン, カ, コー</td>
		<td>きのえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>玄</td>
		<td>непостижимый, неочищенный</td>
		<td>ゲン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>巧</td>
		<td>adroit</td>
		<td>コウ</td>
		<td>たく.み, たく.む, うま.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>功</td>
		<td>достижение</td>
		<td>コウ, ク</td>
		<td>いさお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>穴</td>
		<td>дыра</td>
		<td>ケツ</td>
		<td>あな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>叱</td>
		<td></td>
		<td>シツ, シチ</td>
		<td>しか.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>囚</td>
		<td>captured</td>
		<td>シュウ</td>
		<td>とら.われる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>汁</td>
		<td>soup</td>
		<td>ジュウ</td>
		<td>つゆ, しる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尻</td>
		<td>ягодицы</td>
		<td>コウ</td>
		<td>しり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>丼</td>
		<td>bowl of food</td>
		<td>セイ, タン, トン, ショウ</td>
		<td>どんぶり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>匠</td>
		<td>artisan</td>
		<td>ショウ</td>
		<td>たくみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>巡</td>
		<td>patrol</td>
		<td>ジュン</td>
		<td>めぐ.る, めぐ.り</td>
	</tr>
	<tr>
		<td>1</td>
		<td>旬</td>
		<td>10-day period (of the month)</td>
		<td>ジュン, シュン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>充</td>
		<td>наполнять, заполнять</td>
		<td>ジュ, ジュウ</td>
		<td>あ.てる, み.たす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>芝</td>
		<td>turf</td>
		<td>シ</td>
		<td>しば</td>
	</tr>
	<tr>
		<td>1</td>
		<td>朱</td>
		<td>vermilion</td>
		<td>シュ</td>
		<td>あけ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>至</td>
		<td>наиболее</td>
		<td>シ</td>
		<td>いた.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>旨</td>
		<td>delicious</td>
		<td>シ</td>
		<td>むね, うま.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>后</td>
		<td>queen</td>
		<td>コウ, ゴ</td>
		<td>きさき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>江</td>
		<td>бухта</td>
		<td>コウ, コー</td>
		<td>え</td>
	</tr>
	<tr>
		<td>1</td>
		<td>此</td>
		<td></td>
		<td>シ</td>
		<td>こ.の, こ.れ, ここ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>刑</td>
		<td>punish</td>
		<td>ケイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>仰</td>
		<td>смотреть вверх</td>
		<td>コウ, ギョウ, ギョ</td>
		<td>お.っしゃる, あお.ぐ, おお.せ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>朽</td>
		<td>decay</td>
		<td>キュウ</td>
		<td>く.ちる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>吉</td>
		<td>удача</td>
		<td>キツ, キチ</td>
		<td>よし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>企</td>
		<td>plan</td>
		<td>キ</td>
		<td>くわだ.てる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>缶</td>
		<td>tin can</td>
		<td>カン</td>
		<td>かま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>芋</td>
		<td>potato</td>
		<td>ウ</td>
		<td>いも</td>
	</tr>
	<tr>
		<td>1</td>
		<td>扱</td>
		<td>handle</td>
		<td>ショウ</td>
		<td>あつか.い, あつか.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>伊</td>
		<td></td>
		<td>イ</td>
		<td>かれ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>舌</td>
		<td>язык</td>
		<td>ゼツ</td>
		<td>した</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尽</td>
		<td>exhaust</td>
		<td>ジン, サン</td>
		<td>づ.くし, つ.くす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>迅</td>
		<td>swift</td>
		<td>ジン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>壮</td>
		<td>энергичный, молодой, величественный</td>
		<td>ソウ, ソー</td>
		<td>さかん</td>
	</tr>
	<tr>
		<td>1</td>
		<td>吐</td>
		<td>тошнить</td>
		<td>ト</td>
		<td>つ.く, は.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>吊</td>
		<td></td>
		<td>チョウ</td>
		<td>つる.す, つ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>羊</td>
		<td>овца</td>
		<td>ヨウ, ヨー</td>
		<td>ひつじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>吏</td>
		<td>чиновник, должностное лицо</td>
		<td>リ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>劣</td>
		<td>inferiority</td>
		<td>レツ</td>
		<td>おと.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>妄</td>
		<td>delusion</td>
		<td>モウ, ボウ</td>
		<td>みだ.りに</td>
	</tr>
	<tr>
		<td>1</td>
		<td>朴</td>
		<td>crude</td>
		<td>ボク</td>
		<td>ほう, ほお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>弐</td>
		<td>two (falsification prevention)</td>
		<td>ニ, ジ</td>
		<td>そえ, ふた.つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>如</td>
		<td>усилительный суффикс, подобно</td>
		<td>ニョ, ジョ</td>
		<td>ごと.し</td>
	</tr>
	<tr>
		<td>1</td>
		<td>伐</td>
		<td>fell</td>
		<td>ボチ, バツ, ハツ, カ</td>
		<td>う.つ, そむ.く, き.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>帆</td>
		<td>sail</td>
		<td>ハン</td>
		<td>ほ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>妃</td>
		<td>queen</td>
		<td>ヒ</td>
		<td>きさき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>伏</td>
		<td>prostrated</td>
		<td>フク</td>
		<td>ふ.す, ふ.せる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>肘</td>
		<td>elbow</td>
		<td>チュウ</td>
		<td>ひじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>扶</td>
		<td>aid</td>
		<td>フ</td>
		<td>たす.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>芳</td>
		<td>perfume</td>
		<td>ホウ</td>
		<td>かんば.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>邦</td>
		<td>home country</td>
		<td>ホウ</td>
		<td>くに</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尾</td>
		<td>хвост</td>
		<td>ビ</td>
		<td>お</td>
	</tr>
	<tr>
		<td>1</td>
		<td>伯</td>
		<td>chief</td>
		<td>ハク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>伴</td>
		<td>consort</td>
		<td>ハン, バン</td>
		<td>ともな.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尿</td>
		<td>urine</td>
		<td>ニョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>妊</td>
		<td>pregnancy</td>
		<td>ニン, ジン</td>
		<td>はら.む, みごも.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>忍</td>
		<td>endure</td>
		<td>ニン</td>
		<td>しの.ぶ, しの.ばせる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>把</td>
		<td>grasp</td>
		<td>ハ, ワ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>妨</td>
		<td>disturb</td>
		<td>ボウ</td>
		<td>さまた.げる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>吠</td>
		<td></td>
		<td>ベイ, ハイ</td>
		<td>ほえ.る, ほ.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>没</td>
		<td>drown</td>
		<td>モツ, ボツ</td>
		<td>ない, おぼ.れる, しず.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>妙</td>
		<td>таинственный, странный, чудесный</td>
		<td>ミョウ, ミョ, ビョウ</td>
		<td>たえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>励</td>
		<td>encourage</td>
		<td>レイ</td>
		<td>はげ.ます, はげ.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>呂</td>
		<td>ванна, звучание</td>
		<td>ロ, リョ</td>
		<td>せぼね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>抑</td>
		<td>repress</td>
		<td>ヨク</td>
		<td>おさ.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>里</td>
		<td>родной город, деревня</td>
		<td>リ</td>
		<td>さと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>呈</td>
		<td>display</td>
		<td>テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>廷</td>
		<td>courts</td>
		<td>テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>豆</td>
		<td>бобы</td>
		<td>ズ, トー, トウ</td>
		<td>まめ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>那</td>
		<td>употребляется фонетически, что</td>
		<td>ナ, ダ</td>
		<td>なんぞ, なに, いかん</td>
	</tr>
	<tr>
		<td>1</td>
		<td>択</td>
		<td>choose</td>
		<td>タク</td>
		<td>えら.ぶ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>沢</td>
		<td>обилие, болото</td>
		<td>タク</td>
		<td>さわ, うるお.い, うるお.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>即</td>
		<td>немедленно</td>
		<td>ソク</td>
		<td>つ.く, つ.ける, すなわ.ち</td>
	</tr>
	<tr>
		<td>1</td>
		<td>汰</td>
		<td>luxury</td>
		<td>タイ, タ</td>
		<td>よな.げる, にご.る, おご.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>妥</td>
		<td>gentle</td>
		<td>ダ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>芯</td>
		<td>core</td>
		<td>シン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>杉</td>
		<td>криптомерия</td>
		<td>サン</td>
		<td>すぎ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>亜</td>
		<td>под- (обычно имеет отношение к биологии, суб-, химии или географии)</td>
		<td>アシア, ア</td>
		<td>つ.ぐ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>壱</td>
		<td>one (Falsification prevention)</td>
		<td>イツ, イチ</td>
		<td>ひとつ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>沖</td>
		<td>open sea</td>
		<td>チュウ</td>
		<td>ちゅう.する, おきつ, おき, わく</td>
	</tr>
	<tr>
		<td>1</td>
		<td>我</td>
		<td>эго, я</td>
		<td>ガ</td>
		<td>われ, わ, わが, わ.が</td>
	</tr>
	<tr>
		<td>1</td>
		<td>戒</td>
		<td>commandment</td>
		<td>カイ</td>
		<td>いまし.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>肝</td>
		<td>liver</td>
		<td>カン</td>
		<td>きも</td>
	</tr>
	<tr>
		<td>1</td>
		<td>岐</td>
		<td>branch off</td>
		<td>ギ, キ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>忌</td>
		<td>mourning</td>
		<td>キ</td>
		<td>い.み, い.まわしい, い.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>却</td>
		<td>instead</td>
		<td>キャク</td>
		<td>かえ.って, しりぞ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>汽</td>
		<td>пар</td>
		<td>キ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>狂</td>
		<td>сумасшедший</td>
		<td>キョウ, キョ</td>
		<td>くる.おしい, くる.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>吟</td>
		<td>versify</td>
		<td>ギン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>系</td>
		<td>родословная, система</td>
		<td>ケイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>克</td>
		<td>overcome</td>
		<td>コク</td>
		<td>か.つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>攻</td>
		<td>нападать, изучать, атаковать</td>
		<td>コウ, コー</td>
		<td>せ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>坑</td>
		<td>pit</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>孝</td>
		<td>сыновний долг</td>
		<td>コウ, キョウ, コー</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>抗</td>
		<td>confront</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>呉</td>
		<td>давать</td>
		<td>ゴ</td>
		<td>く.れる, くれ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>沙</td>
		<td>песок</td>
		<td>シャ, サ</td>
		<td>よなげる, すな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>災</td>
		<td>disaster</td>
		<td>サイ</td>
		<td>わざわ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>佐</td>
		<td>старший офицер</td>
		<td>サ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>寿</td>
		<td>longevity</td>
		<td>シュウ, ジュ, ス</td>
		<td>ことほ.ぐ, ことぶき, ことぶ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>秀</td>
		<td>превосходить</td>
		<td>シュウ, シュ</td>
		<td>ひい.でる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>序</td>
		<td>preface</td>
		<td>ジョ</td>
		<td>ついで, つい.で</td>
	</tr>
	<tr>
		<td>1</td>
		<td>抄</td>
		<td>extract</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>肖</td>
		<td>сходство</td>
		<td>ショ, ショウ</td>
		<td>あやか.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尚</td>
		<td>почитать, ещё</td>
		<td>ショ, ショウ</td>
		<td>なお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>松</td>
		<td>сосна</td>
		<td>ショ, ショウ</td>
		<td>まつ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>沼</td>
		<td>marsh</td>
		<td>ショウ</td>
		<td>ぬま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>宗</td>
		<td>религия, предок</td>
		<td>シュウ, シュ, ソウ, ソー</td>
		<td>むね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>呪</td>
		<td>проклятие</td>
		<td>シュウ, ジュ, シュ</td>
		<td>のろ.い, まじな.う, まじな.い, のろ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>邪</td>
		<td>дурной, злой</td>
		<td>ジャ</td>
		<td>よこし.ま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>叔</td>
		<td>uncle</td>
		<td>シュク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>舎</td>
		<td>здание</td>
		<td>セキ, シャ</td>
		<td>やど.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>肢</td>
		<td>limb</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>昆</td>
		<td>descendants</td>
		<td>コン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>忽</td>
		<td></td>
		<td>コツ</td>
		<td>たちま.ち, ゆるが.せ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>祉</td>
		<td>welfare</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>侍</td>
		<td>waiter</td>
		<td>シ, ジ</td>
		<td>さむらい, はべ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>弦</td>
		<td>тетива, струна</td>
		<td>ゲン</td>
		<td>つる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>股</td>
		<td>crotch</td>
		<td>コ</td>
		<td>もも, また</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拘</td>
		<td>arrest</td>
		<td>コウ</td>
		<td>かか.わる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>茎</td>
		<td>stalk</td>
		<td>キョウ, ケイ</td>
		<td>くき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>屈</td>
		<td>yield</td>
		<td>クツ</td>
		<td>かが.める, かが.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>径</td>
		<td>диаметр</td>
		<td>ケイ</td>
		<td>みち, さしわたし, こみち</td>
	</tr>
	<tr>
		<td>1</td>
		<td>享</td>
		<td>receive</td>
		<td>コウ, キョウ</td>
		<td>う.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拒</td>
		<td>repel</td>
		<td>ゴ, キョ</td>
		<td>こば.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拠</td>
		<td>foothold</td>
		<td>コ, キョ</td>
		<td>よ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>宜</td>
		<td>best regards</td>
		<td>ギ</td>
		<td>よろ.しい, よろ.しく</td>
	</tr>
	<tr>
		<td>1</td>
		<td>奇</td>
		<td>странный, необыкновенный</td>
		<td>キ</td>
		<td>く.しき, くし, あや.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拐</td>
		<td>kidnap</td>
		<td>カイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>劾</td>
		<td>censure</td>
		<td>ガイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>芽</td>
		<td>бутон</td>
		<td>ガ</td>
		<td>め</td>
	</tr>
	<tr>
		<td>1</td>
		<td>怪</td>
		<td>загадочный, подозрительный</td>
		<td>カイ, ケ</td>
		<td>あや.しむ, あや.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>岳</td>
		<td>point</td>
		<td>ガク</td>
		<td>たけ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>於</td>
		<td></td>
		<td>ヨ, オ</td>
		<td>より, お.ける, おい.て, ああ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>往</td>
		<td>минувший, движение</td>
		<td>オウ, オー</td>
		<td>いにしえ, さき.に, い.く, ゆ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>殴</td>
		<td>assault</td>
		<td>オウ</td>
		<td>なぐ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>岡</td>
		<td>холм</td>
		<td>コウ</td>
		<td>おか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>佳</td>
		<td>excellent</td>
		<td>カ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>沿</td>
		<td>run alongside</td>
		<td>エン</td>
		<td>ぞ.い, そ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>炎</td>
		<td>воспаление, пламя</td>
		<td>エン</td>
		<td>ほのお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>宛</td>
		<td>allocate</td>
		<td>エン</td>
		<td>あて, あ.てる, づつ, あたか.も</td>
	</tr>
	<tr>
		<td>1</td>
		<td>或</td>
		<td></td>
		<td>ワク, コク, イキ</td>
		<td>あるいは, あるい, あ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>枢</td>
		<td>hinge</td>
		<td>シュ, スウ</td>
		<td>からくり, とぼそ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>炊</td>
		<td>cook</td>
		<td>スイ</td>
		<td>だ.き, た.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>垂</td>
		<td>droop</td>
		<td>スイ</td>
		<td>た.れる, た.らす, た.れ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拙</td>
		<td>bungling</td>
		<td>セツ</td>
		<td>つたな.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>析</td>
		<td>chop</td>
		<td>セキ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>斉</td>
		<td>все вместе, единообразие</td>
		<td>サイ, セイ</td>
		<td>そろ.う, ひと.しく, ひと.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>征</td>
		<td>subjugate</td>
		<td>セイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>其</td>
		<td></td>
		<td>ギ, キ, ゴ</td>
		<td>そ.の, そ.れ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>阻</td>
		<td>thwart</td>
		<td>ソ</td>
		<td>はば.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>狙</td>
		<td>aim at</td>
		<td>ソ, ショ</td>
		<td>ねら.う, ねら.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拓</td>
		<td>clear (the land)</td>
		<td>タク</td>
		<td>ひら.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>卓</td>
		<td>eminent</td>
		<td>タク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>忠</td>
		<td>loyalty</td>
		<td>チュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>抽</td>
		<td>pluck</td>
		<td>チュウ</td>
		<td>ひき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>奈</td>
		<td>what</td>
		<td>ダイ, ナ, ナイ</td>
		<td>からなし, いかん</td>
	</tr>
	<tr>
		<td>1</td>
		<td>抵</td>
		<td>resist</td>
		<td>テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>坪</td>
		<td>two-mat area</td>
		<td>ヘイ</td>
		<td>つぼ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>邸</td>
		<td>residence</td>
		<td>テイ</td>
		<td>やしき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>迭</td>
		<td>transfer</td>
		<td>テツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>典</td>
		<td>церемония</td>
		<td>デン, テン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>炉</td>
		<td>hearth</td>
		<td>ロ</td>
		<td>いろり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>岬</td>
		<td>headland</td>
		<td>コウ</td>
		<td>みさき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>免</td>
		<td>увольнять, освобождать, прощать</td>
		<td>メン</td>
		<td>まぬか.れる, まぬが.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>茂</td>
		<td>overgrown</td>
		<td>モ</td>
		<td>しげ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>盲</td>
		<td>blind</td>
		<td>モウ</td>
		<td>めくら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>房</td>
		<td>камера, помещение</td>
		<td>ボー, ボウ</td>
		<td>ふさ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>肪</td>
		<td>obese</td>
		<td>ボウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>牧</td>
		<td>порода</td>
		<td>ボク</td>
		<td>まき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>奔</td>
		<td>bustle</td>
		<td>ホン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>抹</td>
		<td>rub</td>
		<td>マツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>枕</td>
		<td>pillow</td>
		<td>シン, チン</td>
		<td>まくら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拍</td>
		<td>clap</td>
		<td>ハク, ヒョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>迫</td>
		<td>наседать</td>
		<td>ハク</td>
		<td>せま.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>肥</td>
		<td>fertilizer</td>
		<td>ヒ</td>
		<td>こ.やし, こ.える, こえ, こ.やす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>披</td>
		<td>expose</td>
		<td>ヒ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>泌</td>
		<td>ooze</td>
		<td>ヒツ, ヒ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>奉</td>
		<td>observance</td>
		<td>ホウ, ブ</td>
		<td>たてまつ.る, まつ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>泡</td>
		<td>bubbles</td>
		<td>ホウ</td>
		<td>あわ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>併</td>
		<td>join</td>
		<td>ヘイ</td>
		<td>あわ.せる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>苗</td>
		<td>seedling</td>
		<td>ビョウ, ミョウ</td>
		<td>なえ, なわ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>附</td>
		<td>вариант знака 付</td>
		<td>フ</td>
		<td>つ.く, つ.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>侮</td>
		<td>scorn</td>
		<td>ブ</td>
		<td>あなず.る, あなど.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>枠</td>
		<td>frame</td>
		<td></td>
		<td>わく</td>
	</tr>
	<tr>
		<td>1</td>
		<td>茹</td>
		<td></td>
		<td>ニョ, ジョ</td>
		<td>ゆ.でる, う.でる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>郎</td>
		<td>молодой мужчина</td>
		<td>ロー, ロウ, リョウ</td>
		<td>おとこ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>眉</td>
		<td>eyebrow</td>
		<td>ビ, ミ</td>
		<td>まゆ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>柄</td>
		<td>узор, телосложение, рукоятка</td>
		<td>ヘイ</td>
		<td>え, つか, がら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>赴</td>
		<td>proceed</td>
		<td>フ</td>
		<td>おもむ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>卑</td>
		<td>lowly</td>
		<td>ヒ</td>
		<td>いや.しい, いや.しむ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>派</td>
		<td>командировка, школа, группа, секта</td>
		<td>ハ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>肺</td>
		<td>lung</td>
		<td>ハイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>胞</td>
		<td>placenta</td>
		<td>ホウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>盆</td>
		<td>basin</td>
		<td>ボン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>某</td>
		<td>so-and-so</td>
		<td>ボウ</td>
		<td>なにがし, それがし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>冒</td>
		<td>risk</td>
		<td>ボウ</td>
		<td>おか.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>殆</td>
		<td></td>
		<td>サイ, タイ</td>
		<td>あやうい, ほとん.ど, ほとほと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>柳</td>
		<td>willow</td>
		<td>リュウ</td>
		<td>やなぎ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>厘</td>
		<td>thousandth</td>
		<td>リン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>幽</td>
		<td>seclude</td>
		<td>ユウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>訂</td>
		<td>revise</td>
		<td>テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>津</td>
		<td>гавань</td>
		<td>シン</td>
		<td>つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>亭</td>
		<td>pavilion</td>
		<td>チン, テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>帝</td>
		<td>sovereign</td>
		<td>テイ</td>
		<td>みかど</td>
	</tr>
	<tr>
		<td>1</td>
		<td>剃</td>
		<td></td>
		<td>テイ</td>
		<td>す.る, まい, そ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>貞</td>
		<td>upright</td>
		<td>テイ</td>
		<td>さだ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>峠</td>
		<td>mountain peak</td>
		<td></td>
		<td>とうげ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>洞</td>
		<td>den</td>
		<td>ドウ</td>
		<td>ほら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>衷</td>
		<td>inmost</td>
		<td>チュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>挑</td>
		<td>challenge</td>
		<td>チョウ</td>
		<td>いど.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>勅</td>
		<td>imperial order</td>
		<td>チョク</td>
		<td>いまし.める, みことのり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>胎</td>
		<td>womb</td>
		<td>タイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>胆</td>
		<td>gall bladder</td>
		<td>タン</td>
		<td>きも</td>
	</tr>
	<tr>
		<td>1</td>
		<td>奏</td>
		<td>play music</td>
		<td>ソウ</td>
		<td>かな.でる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>促</td>
		<td>stimulate</td>
		<td>ソク</td>
		<td>うなが.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>耐</td>
		<td>resistant</td>
		<td>タイ</td>
		<td>た.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>怠</td>
		<td>neglect</td>
		<td>タイ</td>
		<td>おこた.る, なま.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>俗</td>
		<td>vulgar</td>
		<td>ゾク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>荘</td>
		<td>villa</td>
		<td>ソウ, チャン, ショウ</td>
		<td>おごそ.か, ほうき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>牲</td>
		<td>animal sacrifice</td>
		<td>セイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>宣</td>
		<td>proclaim</td>
		<td>セン</td>
		<td>のたむ.う, のたま.わく</td>
	</tr>
	<tr>
		<td>1</td>
		<td>窃</td>
		<td>stealth</td>
		<td>セツ</td>
		<td>ひそ.か, ぬす.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>染</td>
		<td>окрашивать</td>
		<td>セン</td>
		<td>そ.める, し.みる, そ.まる, ぞめ, ぞ.め</td>
	</tr>
	<tr>
		<td>1</td>
		<td>甚</td>
		<td>чрезвычайно</td>
		<td>ジン</td>
		<td>はなは.だ, はなは.だしい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>是</td>
		<td>правильность, именно так, политика</td>
		<td>シ, ゼ</td>
		<td>これ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>哀</td>
		<td>pathetic</td>
		<td>アイ</td>
		<td>あわ.れむ, あわ.れ, かな.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>威</td>
		<td>intimidate</td>
		<td>イ</td>
		<td>おど.し, おど.す, おど.かす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>為</td>
		<td>делать</td>
		<td>イ</td>
		<td>す.る, な.る, たり, ため, な.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>姻</td>
		<td>matrimony</td>
		<td>イン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>疫</td>
		<td>epidemic</td>
		<td>ヤク, エキ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>架</td>
		<td>rack</td>
		<td>カ</td>
		<td>か.かる, か.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>卸</td>
		<td>wholesale</td>
		<td>シャ</td>
		<td>おろ.し, おろし, おろ.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>垣</td>
		<td>hedge</td>
		<td>エン</td>
		<td>かき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>冠</td>
		<td>crown</td>
		<td>カン</td>
		<td>かんむり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>括</td>
		<td>fasten</td>
		<td>カツ</td>
		<td>くく.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>悔</td>
		<td>repent</td>
		<td>カイ</td>
		<td>く.いる, くや.しい, く.やむ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>咳</td>
		<td></td>
		<td>カイ, ガイ</td>
		<td>せき, しわぶ.く, せ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>紀</td>
		<td>летопись</td>
		<td>キ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>軌</td>
		<td>rut</td>
		<td>キ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>虐</td>
		<td>tyrannize</td>
		<td>ギャク</td>
		<td>しいた.げる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>糾</td>
		<td>twist</td>
		<td>キュウ</td>
		<td>ただ.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>峡</td>
		<td>gorge</td>
		<td>コウ, キョウ</td>
		<td>はざま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>契</td>
		<td>pledge</td>
		<td>ケイ</td>
		<td>ちぎ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>皇</td>
		<td>император</td>
		<td>コウ, オウ, コー</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>垢</td>
		<td></td>
		<td>コウ, ク</td>
		<td>あか, はじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>孤</td>
		<td>orphan</td>
		<td>コ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>恒</td>
		<td>constancy</td>
		<td>コウ</td>
		<td>つね, つねに</td>
	</tr>
	<tr>
		<td>1</td>
		<td>洪</td>
		<td>deluge</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>拷</td>
		<td>torture</td>
		<td>ゴウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>弧</td>
		<td>arc</td>
		<td>コ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>姿</td>
		<td>облик</td>
		<td>シ</td>
		<td>すがた</td>
	</tr>
	<tr>
		<td>1</td>
		<td>施</td>
		<td>carry out</td>
		<td>シ, セ</td>
		<td>ほどこ.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>恨</td>
		<td>rancor</td>
		<td>コン</td>
		<td>うら.む, うら.めしい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>砕</td>
		<td>smash</td>
		<td>サイ</td>
		<td>くだ.ける, くだ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>削</td>
		<td>plane</td>
		<td>サク</td>
		<td>はつ.る, けず.る, そ.ぐ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>拶</td>
		<td>be imminent</td>
		<td>サツ</td>
		<td>せま.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>狩</td>
		<td>hunt</td>
		<td>シュ</td>
		<td>か.る, が.り, か.り</td>
	</tr>
	<tr>
		<td>1</td>
		<td>俊</td>
		<td>genius</td>
		<td>シュン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>臭</td>
		<td>stinking</td>
		<td>シュウ</td>
		<td>にお.う, くさ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>昭</td>
		<td>сиять</td>
		<td>ショ, ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>叙</td>
		<td>confer</td>
		<td>ジョ</td>
		<td>ついで, つい.ず</td>
	</tr>
	<tr>
		<td>1</td>
		<td>盾</td>
		<td>shield</td>
		<td>ジュン</td>
		<td>たて</td>
	</tr>
	<tr>
		<td>1</td>
		<td>浄</td>
		<td>clean</td>
		<td>ジョウ, セイ</td>
		<td>きよ.い, きよ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>侵</td>
		<td>encroach</td>
		<td>シン</td>
		<td>おか.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>唇</td>
		<td>губы</td>
		<td>シン</td>
		<td>くちびる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>娠</td>
		<td>with child</td>
		<td>シン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>振</td>
		<td>трясти</td>
		<td>シン</td>
		<td>ふ.り, ぶ.り, ふ.る, ぶ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>浸</td>
		<td>immersed</td>
		<td>シン</td>
		<td>ひた.る, ひた.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>症</td>
		<td>symptoms</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>准</td>
		<td>quasi-</td>
		<td>ジュン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>徐</td>
		<td>gradually</td>
		<td>ジョ</td>
		<td>おもむ.ろに</td>
	</tr>
	<tr>
		<td>1</td>
		<td>宵</td>
		<td>wee hours</td>
		<td>ショウ</td>
		<td>よい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>祥</td>
		<td>auspicious</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>称</td>
		<td>appellation</td>
		<td>ショウ</td>
		<td>あ.げる, とな.える, たた.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>従</td>
		<td>следовать, подчиняться</td>
		<td>ジュ, ジュウ, ショウ</td>
		<td>したが.える, より, したが.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>疾</td>
		<td>rapidly</td>
		<td>シツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>殉</td>
		<td>martyrdom</td>
		<td>ジュン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>珠</td>
		<td>pearl</td>
		<td>シュ</td>
		<td>たま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>殊</td>
		<td>particularly</td>
		<td>シュ</td>
		<td>こと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>酌</td>
		<td>bartending</td>
		<td>シャク</td>
		<td>く.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>射</td>
		<td>излучать, стрелять</td>
		<td>シャ</td>
		<td>い.る, さ.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>唆</td>
		<td>tempt</td>
		<td>サ</td>
		<td>そそのか.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>宰</td>
		<td>superintend</td>
		<td>サイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>剤</td>
		<td>dose</td>
		<td>スイ, ザイ, セイ</td>
		<td>かる, けず.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>桟</td>
		<td>scaffold</td>
		<td>セン, サン</td>
		<td>かけはし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蚕</td>
		<td>silkworm</td>
		<td>テン, サン</td>
		<td>かいこ, こ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>剛</td>
		<td>sturdy</td>
		<td>ゴウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>栽</td>
		<td>plantation</td>
		<td>サイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>索</td>
		<td>cord</td>
		<td>サク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>桜</td>
		<td>сакура</td>
		<td>オウ, ヨウ, オー</td>
		<td>さくら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>娯</td>
		<td>recreation</td>
		<td>ゴ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>悟</td>
		<td>enlightenment</td>
		<td>ゴ</td>
		<td>さと.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>倹</td>
		<td>frugal</td>
		<td>ケン</td>
		<td>つづまやか, つま.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>兼</td>
		<td>совмещать, одновременно</td>
		<td>ケン</td>
		<td>か.ねる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>剣</td>
		<td>меч</td>
		<td>ケン</td>
		<td>つるぎ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>貢</td>
		<td>tribute</td>
		<td>コウ, ク</td>
		<td>みつ.ぐ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>郡</td>
		<td>округ</td>
		<td>グン</td>
		<td>こうり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>桑</td>
		<td>mulberry</td>
		<td>ソウ</td>
		<td>くわ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>恭</td>
		<td>respect</td>
		<td>キョウ</td>
		<td>うやうや.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>脅</td>
		<td>threaten</td>
		<td>キョウ</td>
		<td>おびや.かす, おど.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>挙</td>
		<td>поднимать</td>
		<td>キョ</td>
		<td>あ.がる, あ.げる, こぞ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>宮</td>
		<td>принцесса, храм, принц, дворец</td>
		<td>グー, グウ, ク, キュ, クウ, キュウ</td>
		<td>みや</td>
	</tr>
	<tr>
		<td>1</td>
		<td>飢</td>
		<td>hungry</td>
		<td>キ</td>
		<td>う.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>既</td>
		<td>previously</td>
		<td>キ</td>
		<td>すで.に</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鬼</td>
		<td>о́ни</td>
		<td>キ</td>
		<td>おに</td>
	</tr>
	<tr>
		<td>1</td>
		<td>陥</td>
		<td>collapse</td>
		<td>カン</td>
		<td>おちい.る, おとしい.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>華</td>
		<td>великолепие, цветок</td>
		<td>ケ, カ</td>
		<td>はな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蚊</td>
		<td>mosquito</td>
		<td>ブン</td>
		<td>か</td>
	</tr>
	<tr>
		<td>1</td>
		<td>株</td>
		<td>stocks</td>
		<td>シュ</td>
		<td>かぶ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>釜</td>
		<td>kettle</td>
		<td>フ</td>
		<td>かま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>核</td>
		<td>nucleus</td>
		<td>カク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>恩</td>
		<td>grace</td>
		<td>オン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>俺</td>
		<td>я (исп. мужчинами)</td>
		<td>エン</td>
		<td>おれ, われ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>益</td>
		<td>benefit</td>
		<td>ヤク, エキ</td>
		<td>ま.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>悦</td>
		<td>ecstasy</td>
		<td>エツ</td>
		<td>よろこ.ばす, よろこ.ぶ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>宴</td>
		<td>banquet</td>
		<td>エン</td>
		<td>うたげ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>浦</td>
		<td>bay</td>
		<td>ホ</td>
		<td>うら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>挨</td>
		<td>push open</td>
		<td>アイ</td>
		<td>ひら.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>凄</td>
		<td>uncanny</td>
		<td>サイ, セイ</td>
		<td>さむ.い, すご.い, すさ.まじい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>粋</td>
		<td>chic</td>
		<td>スイ</td>
		<td>いき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>衰</td>
		<td>decline</td>
		<td>スイ</td>
		<td>おとろ.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>辱</td>
		<td>embarrass</td>
		<td>ジョク</td>
		<td>はずかし.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>陣</td>
		<td>camp</td>
		<td>ジン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>扇</td>
		<td>fan</td>
		<td>セン</td>
		<td>おうぎ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>栓</td>
		<td>plug</td>
		<td>セン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>逝</td>
		<td>departed</td>
		<td>セイ</td>
		<td>ゆ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>隻</td>
		<td>только один, счётное слово для судов</td>
		<td>セキ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>挿</td>
		<td>insert</td>
		<td>ソウ</td>
		<td>さ.す, はさ.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>泰</td>
		<td>peaceful</td>
		<td>タイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>袖</td>
		<td>sleeve</td>
		<td>シュウ</td>
		<td>そで</td>
	</tr>
	<tr>
		<td>1</td>
		<td>倉</td>
		<td>склад</td>
		<td>ソウ, ソー</td>
		<td>くら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>素</td>
		<td>усилительный префикс, хим. элемент, основа, простой</td>
		<td>ソ, ス</td>
		<td>もと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>租</td>
		<td>tariff</td>
		<td>ソ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>託</td>
		<td>consign</td>
		<td>タク</td>
		<td>かこつ.ける, かこ.つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>逐</td>
		<td>pursue</td>
		<td>チク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>秩</td>
		<td>regularity</td>
		<td>チツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>致</td>
		<td>навлекать, завлекать</td>
		<td>チ</td>
		<td>いた.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>透</td>
		<td>transparent</td>
		<td>トウ</td>
		<td>す.く, す.かす, す.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>討</td>
		<td>chastise</td>
		<td>トウ</td>
		<td>う.つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>桃</td>
		<td>peach tree</td>
		<td>トウ</td>
		<td>もも</td>
	</tr>
	<tr>
		<td>1</td>
		<td>匿</td>
		<td>hide</td>
		<td>トク</td>
		<td>かくま.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>胴</td>
		<td>trunk</td>
		<td>ドウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>逓</td>
		<td>relay</td>
		<td>テイ</td>
		<td>たがいに, かわ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>哲</td>
		<td>philosophy</td>
		<td>テツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>唐</td>
		<td>T'ang</td>
		<td>トウ</td>
		<td>から</td>
	</tr>
	<tr>
		<td>1</td>
		<td>倫</td>
		<td>ethics</td>
		<td>リン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>竜</td>
		<td>дракон</td>
		<td>リュウ, ロウ, リョウ, リュ</td>
		<td>たつ, いせ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>朗</td>
		<td>melodious</td>
		<td>ロウ</td>
		<td>あき.らか, ほが.らか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>烈</td>
		<td>ardent</td>
		<td>レツ</td>
		<td>はげ.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>剖</td>
		<td>divide</td>
		<td>ボウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>紋</td>
		<td>family crest</td>
		<td>モン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>耗</td>
		<td>decrease</td>
		<td>カウ, コウ, モウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>脈</td>
		<td>вены</td>
		<td>ミャク</td>
		<td>すじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>紡</td>
		<td>spinning</td>
		<td>ボウ</td>
		<td>つむ.ぐ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>梅</td>
		<td>абрикос</td>
		<td>バイ</td>
		<td>うめ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>這</td>
		<td></td>
		<td>シャ, ゲン</td>
		<td>この, は.い, は.う, むか.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>俳</td>
		<td>actor</td>
		<td>ハイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>納</td>
		<td>settlement</td>
		<td>ナッ, ナ, トウ, ナン, ノウ</td>
		<td>おさ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>秘</td>
		<td>тайна, секрет</td>
		<td>ヒ</td>
		<td>かく.す, ひそ.か, ひ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>班</td>
		<td>corps</td>
		<td>ハン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>畔</td>
		<td>paddy-ridge</td>
		<td>ハン</td>
		<td>あぜ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>倣</td>
		<td>emulate</td>
		<td>ホウ</td>
		<td>なら.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>俸</td>
		<td>salary</td>
		<td>ホウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>砲</td>
		<td>cannon</td>
		<td>ホウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>峰</td>
		<td>summit</td>
		<td>ホウ</td>
		<td>みね, ね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>陛</td>
		<td>majesty</td>
		<td>ヘイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>姫</td>
		<td>девушка, принцесса</td>
		<td>キ</td>
		<td>ひめ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>紐</td>
		<td></td>
		<td>ジュウ, チュウ</td>
		<td>ひも</td>
	</tr>
	<tr>
		<td>1</td>
		<td>俵</td>
		<td>straw bag</td>
		<td>ヒョウ</td>
		<td>たわら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>浜</td>
		<td>seacoast</td>
		<td>ヒン</td>
		<td>はま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>敏</td>
		<td>cleverness</td>
		<td>ビン</td>
		<td>さとい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>紛</td>
		<td>distract</td>
		<td>フン</td>
		<td>まぎ.れる, まぎ.れ, まぎ.らす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>浪</td>
		<td>wandering</td>
		<td>ロウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>脇</td>
		<td>aside</td>
		<td>キョウ</td>
		<td>わけ, わき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>瓶</td>
		<td>flower pot</td>
		<td>ビン</td>
		<td>かめ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>票</td>
		<td>бюллетень</td>
		<td>ヒョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>描</td>
		<td>рисовать</td>
		<td>ビョウ, ビョ</td>
		<td>か.く, えが.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>偏</td>
		<td>partial</td>
		<td>ヘン</td>
		<td>かたよ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>崩</td>
		<td>crumble</td>
		<td>ホウ</td>
		<td>くず.れ, くず.す, くず.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>舶</td>
		<td>liner</td>
		<td>ハク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>排</td>
		<td>repudiate</td>
		<td>ハイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>陪</td>
		<td>obeisance</td>
		<td>バイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>粘</td>
		<td>sticky</td>
		<td>ネン</td>
		<td>ねば.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>培</td>
		<td>cultivate</td>
		<td>バイ</td>
		<td>つちか.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>堀</td>
		<td>ditch</td>
		<td>クツ</td>
		<td>ほり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>麻</td>
		<td>конопля, паралич</td>
		<td>マ, マア</td>
		<td>あさ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>密</td>
		<td>плотный, секретный, подобный</td>
		<td>ミツ</td>
		<td>ひそ.か</td>
	</tr>
	<tr>
		<td>1</td>
		<td>猛</td>
		<td>fierce</td>
		<td>モウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>訳</td>
		<td>причина, перевод</td>
		<td>ヤク</td>
		<td>わけ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>累</td>
		<td>accumulate</td>
		<td>ルイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>隆</td>
		<td>hump</td>
		<td>リュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>陵</td>
		<td>mausoleum</td>
		<td>リョウ</td>
		<td>みささぎ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>猟</td>
		<td>game-hunting</td>
		<td>レフ, リョウ</td>
		<td>か.る, かり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>悠</td>
		<td>неторопливо</td>
		<td>ユウ, ユー</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>唯</td>
		<td>единственный, только</td>
		<td>イ, ユイ</td>
		<td>ただ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>庸</td>
		<td>commonplace</td>
		<td>ヨウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>悼</td>
		<td>lament</td>
		<td>トウ</td>
		<td>いた.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>笛</td>
		<td>флейта, свист</td>
		<td>テキ</td>
		<td>ふえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>添</td>
		<td>annexed</td>
		<td>テン</td>
		<td>そ.う, も.える, そ.える, も.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>偵</td>
		<td>spy</td>
		<td>テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>壷</td>
		<td></td>
		<td>コ</td>
		<td>つぼ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>釣</td>
		<td>angling</td>
		<td>チョウ</td>
		<td>つ.り, つ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>豚</td>
		<td>pork</td>
		<td>トン</td>
		<td>ぶた</td>
	</tr>
	<tr>
		<td>1</td>
		<td>陶</td>
		<td>pottery</td>
		<td>トウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>彫</td>
		<td>carve</td>
		<td>チョウ</td>
		<td>ほ.る, ぼ.り</td>
	</tr>
	<tr>
		<td>1</td>
		<td>帳</td>
		<td>книга для записей</td>
		<td>チョウ, チョ</td>
		<td>とばり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>窒</td>
		<td>plug up</td>
		<td>チツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>眺</td>
		<td>смотреть</td>
		<td>チョウ, チョ</td>
		<td>なが.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>陳</td>
		<td>exhibit</td>
		<td>チン</td>
		<td>ひ.ねる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>逮</td>
		<td>apprehend</td>
		<td>タイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>脱</td>
		<td>уклоняться, раздеваться</td>
		<td>ダツ</td>
		<td>ぬ.ぐ, ぬ.げる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蛋</td>
		<td></td>
		<td>タン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>淡</td>
		<td>thin</td>
		<td>タン</td>
		<td>あわ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>粗</td>
		<td>coarse</td>
		<td>ソ</td>
		<td>あら, あら.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>爽</td>
		<td>refreshing</td>
		<td>ソウ</td>
		<td>あき.らか, たがう, さわ.やか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>措</td>
		<td>set aside</td>
		<td>ソ</td>
		<td>お.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>曽</td>
		<td>пра, раньше</td>
		<td>ゾウ, ソ, ソウ, ソー</td>
		<td>すなわち, かつ, かつて</td>
	</tr>
	<tr>
		<td>1</td>
		<td>曹</td>
		<td>cadet</td>
		<td>ソウ, ゾウ</td>
		<td>ともがら, つかさ, へや</td>
	</tr>
	<tr>
		<td>1</td>
		<td>巣</td>
		<td>гнездо</td>
		<td>ソウ</td>
		<td>す.くう, す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>惜</td>
		<td>pity</td>
		<td>セキ</td>
		<td>お.しい, お.しむ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>崇</td>
		<td>adore</td>
		<td>スウ</td>
		<td>あが.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>盛</td>
		<td>накладывать, процветать</td>
		<td>ジョウ, セイ</td>
		<td>さか.る, さか.ん, も.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>旋</td>
		<td>rotation</td>
		<td>セン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>推</td>
		<td>infer</td>
		<td>スイ</td>
		<td>お.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>据</td>
		<td>set</td>
		<td>キョ</td>
		<td>す.わる, す.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>酔</td>
		<td>пьяный</td>
		<td>スイ</td>
		<td>よ.い, よ, よ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>尉</td>
		<td>military officer</td>
		<td>イ, ジョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>陰</td>
		<td>shade</td>
		<td>イン</td>
		<td>かげ, かげ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>逸</td>
		<td>deviate</td>
		<td>イツ</td>
		<td>そ.らす, はぐ.れる, そ.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>殻</td>
		<td>husk</td>
		<td>バイ, カク, コク</td>
		<td>から, がら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>掛</td>
		<td>усилительный суффикс, вешать, суффикс незаконченности</td>
		<td>カイ, ケイ</td>
		<td>か.ける, か.け</td>
	</tr>
	<tr>
		<td>1</td>
		<td>勘</td>
		<td>intuition</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>郭</td>
		<td>enclosure</td>
		<td>カク</td>
		<td>くるわ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>喝</td>
		<td>hoarse</td>
		<td>カツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>渇</td>
		<td>thirst</td>
		<td>カツ</td>
		<td>かわ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>崖</td>
		<td>cliff</td>
		<td>ゲ, ガイ, ギ</td>
		<td>がけ, はて, きし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>涯</td>
		<td>horizon</td>
		<td>ガイ</td>
		<td>はて</td>
	</tr>
	<tr>
		<td>1</td>
		<td>眼</td>
		<td>глаза</td>
		<td>ガン, ゲン</td>
		<td>まなこ, め</td>
	</tr>
	<tr>
		<td>1</td>
		<td>患</td>
		<td>afflicted</td>
		<td>カン</td>
		<td>わずら.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>貫</td>
		<td>pierce</td>
		<td>カン</td>
		<td>つらぬ.く, ぬ.く, ぬき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>偽</td>
		<td>falsehood</td>
		<td>ギ, カ</td>
		<td>にせ, いつわ.る, いつわ.り</td>
	</tr>
	<tr>
		<td>1</td>
		<td>脚</td>
		<td>leg</td>
		<td>キャク, カク, キャ</td>
		<td>あし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>虚</td>
		<td>void</td>
		<td>コ, キョ</td>
		<td>むな.しい, うつ.ろ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>菌</td>
		<td>germ</td>
		<td>キン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>郷</td>
		<td>родина, деревня</td>
		<td>ゴー, キョウ, ゴウ, キョ</td>
		<td>さと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>啓</td>
		<td>disclose</td>
		<td>ケイ</td>
		<td>ひら.く, さと.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>菊</td>
		<td>chrysanthemum</td>
		<td>キク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>掲</td>
		<td>put up (a notice)</td>
		<td>ケイ</td>
		<td>かか.げる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>渓</td>
		<td>mountain stream</td>
		<td>ケイ</td>
		<td>たに, たにがわ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蛍</td>
		<td>lightning-bug</td>
		<td>ケイ</td>
		<td>ほたる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>頃</td>
		<td>время</td>
		<td>キョウ, ケイ</td>
		<td>ごろ, しばら.く, ころ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>控</td>
		<td>withdraw</td>
		<td>コウ</td>
		<td>ひか.え, ひか.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>惨</td>
		<td>wretched</td>
		<td>ザン, サン</td>
		<td>むご.い, いた.む, みじ.め</td>
	</tr>
	<tr>
		<td>1</td>
		<td>執</td>
		<td>tenacious</td>
		<td>シュウ, シツ</td>
		<td>と.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>視</td>
		<td>зрение, смотреть</td>
		<td>シ</td>
		<td>み.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>崎</td>
		<td>мыс</td>
		<td>キ</td>
		<td>さき, さい, みさき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>紺</td>
		<td>dark blue</td>
		<td>コン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>彩</td>
		<td>coloring</td>
		<td>サイ</td>
		<td>いろど.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>斎</td>
		<td>purification</td>
		<td>サイ</td>
		<td>つつし.む, ものいみ, とき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>惚</td>
		<td></td>
		<td>コツ</td>
		<td>ほけ.る, ほ.れる, ぼ.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>赦</td>
		<td>pardon</td>
		<td>シャ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>斜</td>
		<td>diagonal</td>
		<td>シャ</td>
		<td>はす, なな.め</td>
	</tr>
	<tr>
		<td>1</td>
		<td>釈</td>
		<td>explanation</td>
		<td>セキ, シャク</td>
		<td>ゆる.す, とく, す.てる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>寂</td>
		<td>loneliness</td>
		<td>セキ, ジャク</td>
		<td>さび.しい, さび.れる, さび</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蛇</td>
		<td>snake</td>
		<td>ヤ, ダ, イ, ジャ</td>
		<td>へび</td>
	</tr>
	<tr>
		<td>1</td>
		<td>粛</td>
		<td>solemn</td>
		<td>シュク, スク</td>
		<td>つつし.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>淑</td>
		<td>graceful</td>
		<td>シュク</td>
		<td>しと.やか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>渋</td>
		<td>astringent</td>
		<td>シュウ, ジュウ</td>
		<td>しぶ.る, しぶ.い, しぶ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>訟</td>
		<td>sue</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>梢</td>
		<td></td>
		<td>ショウ</td>
		<td>くすのき, こずえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>渉</td>
		<td>ford</td>
		<td>ショウ</td>
		<td>わた.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>庶</td>
		<td>commoner</td>
		<td>ショ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>唱</td>
		<td>мелодия</td>
		<td>ショウ</td>
		<td>とな.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>剰</td>
		<td>surplus</td>
		<td>ジョウ</td>
		<td>あまつさえ, あま.り, あま.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>紳</td>
		<td>sire</td>
		<td>シン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>尋</td>
		<td>разыскивать</td>
		<td>ジン</td>
		<td>たず.ねる, ひろ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>硝</td>
		<td>nitrate</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>殖</td>
		<td>augment</td>
		<td>ショク</td>
		<td>ふ.やす, ふ.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>掌</td>
		<td>manipulate</td>
		<td>ショウ</td>
		<td>てのひら, たなごころ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>循</td>
		<td>sequential</td>
		<td>ジュン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>焦</td>
		<td>char</td>
		<td>ショウ</td>
		<td>こ.げる, こ.がす, こ.がれる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>晶</td>
		<td>sparkle</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>証</td>
		<td>свидетельство, документ</td>
		<td>ショ, ショウ</td>
		<td>あかし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>詔</td>
		<td>imperial edict</td>
		<td>ショウ</td>
		<td>みことのり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>粧</td>
		<td>cosmetics</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>就</td>
		<td>concerning</td>
		<td>シュウ, ジュ</td>
		<td>つ.く, つ.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>衆</td>
		<td>массы, народ</td>
		<td>シュウ, シュ</td>
		<td>おお.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>軸</td>
		<td>axis</td>
		<td>ジク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>煮</td>
		<td>boil</td>
		<td>シャ</td>
		<td>に, に.える, に.やす, に.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>詐</td>
		<td>lie</td>
		<td>サ</td>
		<td>いつわ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>裁</td>
		<td>judge</td>
		<td>サイ</td>
		<td>た.つ, さば.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>紫</td>
		<td>purple</td>
		<td>シ</td>
		<td>むらさき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>滋</td>
		<td>nourishing</td>
		<td>ジ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>傘</td>
		<td>umbrella</td>
		<td>サン</td>
		<td>かさ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>策</td>
		<td>scheme</td>
		<td>サク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>慌</td>
		<td>волноваться</td>
		<td>コウ</td>
		<td>あわ.ただしい, あわ.てる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>項</td>
		<td>paragraph</td>
		<td>コウ</td>
		<td>うなじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>絞</td>
		<td>strangle</td>
		<td>コウ</td>
		<td>し.める, しぼ.る, し.まる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>喧</td>
		<td></td>
		<td>ケン</td>
		<td>やかま.しい, かまびす.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>圏</td>
		<td>sphere</td>
		<td>ケン</td>
		<td>かこ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>堅</td>
		<td>strict</td>
		<td>ケン</td>
		<td>かた.い, がた.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>喉</td>
		<td>throat</td>
		<td>コウ</td>
		<td>のど</td>
	</tr>
	<tr>
		<td>1</td>
		<td>遇</td>
		<td>interview</td>
		<td>グウ</td>
		<td>あ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>琴</td>
		<td>музыкальный инструмент, кото</td>
		<td>キン</td>
		<td>こと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>筋</td>
		<td>смысл, мускул, сюжет</td>
		<td>キン</td>
		<td>すじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>暁</td>
		<td>daybreak</td>
		<td>キョウ, ギョウ</td>
		<td>さと.る, あかつき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>僅</td>
		<td>a wee bit</td>
		<td>キン, ゴン</td>
		<td>わずか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>距</td>
		<td>long-distance</td>
		<td>キョ</td>
		<td>へだ.たる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>閑</td>
		<td>leisure</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>欺</td>
		<td>deceit</td>
		<td>ギ</td>
		<td>あざむ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>棋</td>
		<td>chess piece</td>
		<td>キ</td>
		<td>ご</td>
	</tr>
	<tr>
		<td>1</td>
		<td>稀</td>
		<td></td>
		<td>キ, ケ</td>
		<td>まれ, まばら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>貴</td>
		<td>ценный, знатный</td>
		<td>キ</td>
		<td>たっ.い, とうと.い, たっと.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>敢</td>
		<td>daring</td>
		<td>カン</td>
		<td>あ.えない, あ.えて, あ.えず</td>
	</tr>
	<tr>
		<td>1</td>
		<td>棺</td>
		<td>coffin</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>款</td>
		<td>goodwill</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>喚</td>
		<td>звать, кричать</td>
		<td>カン</td>
		<td>わめ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>堪</td>
		<td>withstand</td>
		<td>タン, カン</td>
		<td>たま.る, こ.らえる, た.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>揮</td>
		<td>brandish</td>
		<td>キ</td>
		<td>ふる.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>幾</td>
		<td>сколько</td>
		<td>キ</td>
		<td>いく.ら, いく, いく.つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賀</td>
		<td>congratulations</td>
		<td>ガ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>椅</td>
		<td>chair</td>
		<td>イ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>街</td>
		<td>улица</td>
		<td>カイ, ガイ</td>
		<td>まち</td>
	</tr>
	<tr>
		<td>1</td>
		<td>渦</td>
		<td>whirlpool</td>
		<td>カ</td>
		<td>うず</td>
	</tr>
	<tr>
		<td>1</td>
		<td>握</td>
		<td>держать, схватывать</td>
		<td>アク</td>
		<td>にぎ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>援</td>
		<td>aid</td>
		<td>エン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>詠</td>
		<td>recitation</td>
		<td>エイ</td>
		<td>よ.む, うた.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>随</td>
		<td>follow</td>
		<td>ズイ</td>
		<td>まにまに, したが.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>遂</td>
		<td>consummate</td>
		<td>スイ</td>
		<td>と.げる, つい.に</td>
	</tr>
	<tr>
		<td>1</td>
		<td>酢</td>
		<td>vinegar</td>
		<td>サク</td>
		<td>す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>診</td>
		<td>checkup</td>
		<td>シン</td>
		<td>み.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>葬</td>
		<td>interment</td>
		<td>ソウ</td>
		<td>ほうむ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>属</td>
		<td>belong</td>
		<td>ゾク, ショク</td>
		<td>つく, さかん, やから</td>
	</tr>
	<tr>
		<td>1</td>
		<td>惰</td>
		<td>lazy</td>
		<td>ダ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>揃</td>
		<td></td>
		<td>セン</td>
		<td>そろ.える, そろ.い, そろ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>堕</td>
		<td>degenerate</td>
		<td>ダ</td>
		<td>お.ちる, くず.す, くず.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>疎</td>
		<td>alienate</td>
		<td>ソ, ショ</td>
		<td>まば.ら, うと.む, うと.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>喪</td>
		<td>miss</td>
		<td>ソウ</td>
		<td>も</td>
	</tr>
	<tr>
		<td>1</td>
		<td>創</td>
		<td>create</td>
		<td>ソウ, ショウ</td>
		<td>きず, はじ.める, つく.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>訴</td>
		<td>sue</td>
		<td>ソ</td>
		<td>うった.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>弾</td>
		<td>играть на муз. инструменте, пуля, упругость, снаряд, осуждать</td>
		<td>タン, ダン</td>
		<td>ひ.き, ひ.く, はず.む, たま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>棚</td>
		<td>shelf</td>
		<td>ホウ</td>
		<td>たな, だな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>隊</td>
		<td>отряд</td>
		<td>タイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>塚</td>
		<td>hillock</td>
		<td>チョウ</td>
		<td>づか, つか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>棟</td>
		<td>ridgepole</td>
		<td>トウ</td>
		<td>むね, むな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>痘</td>
		<td>pox</td>
		<td>トウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>統</td>
		<td>управлять, объединять</td>
		<td>トー, トウ</td>
		<td>ほび.る, す.べる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>堤</td>
		<td>dike</td>
		<td>テイ</td>
		<td>つつみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>提</td>
		<td>propose</td>
		<td>チョウ, ダイ, テイ</td>
		<td>さ.げる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>貼</td>
		<td>paste</td>
		<td>チョウ, テン</td>
		<td>つ.く, は.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>搭</td>
		<td>board</td>
		<td>トウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>揚</td>
		<td>hoist</td>
		<td>ヨウ</td>
		<td>あ.がる, あ.げる, あ.げ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>揺</td>
		<td>трястись, качаться</td>
		<td>ヨウ, ヨー</td>
		<td>ゆ.る, ゆ.らぐ, ゆ.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>雄</td>
		<td>величественный, самец</td>
		<td>ユウ, ユー</td>
		<td>お, おん, おす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>湧</td>
		<td>boil</td>
		<td>ユウ, ヨウ, ユ</td>
		<td>わ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>猶</td>
		<td>furthermore</td>
		<td>ユウ, ユ</td>
		<td>なお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>裕</td>
		<td>обильный</td>
		<td>ユウ, ユー</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>嵐</td>
		<td>storm</td>
		<td>ラン</td>
		<td>あらし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>塁</td>
		<td>bases</td>
		<td>ライ, スイ, ルイ</td>
		<td>とりで</td>
	</tr>
	<tr>
		<td>1</td>
		<td>痢</td>
		<td>diarrhea</td>
		<td>リ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>硫</td>
		<td>sulphur</td>
		<td>リュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>廊</td>
		<td>коридор</td>
		<td>ロー, ロウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>裂</td>
		<td>рвать</td>
		<td>レツ</td>
		<td>ぎ.れ, さ.く, さ.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>愉</td>
		<td>pleasure</td>
		<td>ユ</td>
		<td>たの.しむ, たの.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>貰</td>
		<td></td>
		<td>シャ, セイ</td>
		<td>もら.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>婿</td>
		<td>bridegroom</td>
		<td>セイ</td>
		<td>むこ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>媒</td>
		<td>mediator</td>
		<td>バイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>覗</td>
		<td>подглядывать</td>
		<td>シ</td>
		<td>のぞ.く, うかが.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>廃</td>
		<td>abolish</td>
		<td>ハイ</td>
		<td>すた.れる, すた.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>博</td>
		<td>азартная игра, эрудиция</td>
		<td>ハク, バク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>筈</td>
		<td></td>
		<td>カツ</td>
		<td>やはず, はず</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蛮</td>
		<td>barbarian</td>
		<td>バン</td>
		<td>えびす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>扉</td>
		<td>дверь</td>
		<td>ヒ</td>
		<td>とびら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>傍</td>
		<td>наблюдатель, сбоку</td>
		<td>ボー, ボウ</td>
		<td>おか, はた, わき, かたわ.ら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>遍</td>
		<td>everywhere</td>
		<td>ヘン</td>
		<td>あまね.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>塀</td>
		<td>fence</td>
		<td>ベイ, ヘイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>雰</td>
		<td>atmosphere</td>
		<td>フン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>惑</td>
		<td>очарование, растерянность</td>
		<td>ワク</td>
		<td>まど.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>壺</td>
		<td></td>
		<td>コ</td>
		<td>つぼ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賄</td>
		<td>bribe</td>
		<td>ワイ</td>
		<td>まかな.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>碗</td>
		<td></td>
		<td>ワン</td>
		<td>こばち</td>
	</tr>
	<tr>
		<td>1</td>
		<td>墓</td>
		<td>grave</td>
		<td>ボ</td>
		<td>はか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>飽</td>
		<td>sated</td>
		<td>ホウ</td>
		<td>あ.きる, あ.かす, あ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>搬</td>
		<td>conveyor</td>
		<td>ハン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>微</td>
		<td>микро, тонкий, мелкий</td>
		<td>ビ</td>
		<td>かす.か</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鉢</td>
		<td>bowl</td>
		<td>ハチ, ハツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>煩</td>
		<td>anxiety</td>
		<td>ハン, ボン</td>
		<td>わずら.う, わずら.わす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>頒</td>
		<td>partition</td>
		<td>ハン</td>
		<td>わか.つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>漠</td>
		<td>vague</td>
		<td>バク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>盟</td>
		<td>alliance</td>
		<td>メイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>滅</td>
		<td>гибнуть, разрушаться, неразумный</td>
		<td>メツ</td>
		<td>ほろ.びる, ほろ.ぶ, ほろ.ぼす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>幕</td>
		<td>curtain</td>
		<td>バク, マク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>廉</td>
		<td>bargain</td>
		<td>レン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>鈴</td>
		<td>small bell</td>
		<td>リン, レイ</td>
		<td>すず</td>
	</tr>
	<tr>
		<td>1</td>
		<td>楼</td>
		<td>watchtower</td>
		<td>ロウ</td>
		<td>たかどの</td>
	</tr>
	<tr>
		<td>1</td>
		<td>虜</td>
		<td>captive</td>
		<td>ロ, リョ</td>
		<td>とりく, とりこ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>溜</td>
		<td></td>
		<td>リュウ</td>
		<td>たま.る, た.める, た.まる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>裸</td>
		<td>naked</td>
		<td>ラ</td>
		<td>はだか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>雷</td>
		<td>thunder</td>
		<td>ライ</td>
		<td>かみなり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>酪</td>
		<td>dairy products</td>
		<td>ラク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>誉</td>
		<td>reputation</td>
		<td>ヨ</td>
		<td>ほ.める, ほま.れ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>頓</td>
		<td>suddenly</td>
		<td>トツ, トン</td>
		<td>つまず.く, にわか.に, とん.と</td>
	</tr>
	<tr>
		<td>1</td>
		<td>艇</td>
		<td>rowboat</td>
		<td>テイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>督</td>
		<td>coach</td>
		<td>トク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>腸</td>
		<td>кишечник</td>
		<td>チョウ</td>
		<td>はらわた</td>
	</tr>
	<tr>
		<td>1</td>
		<td>跳</td>
		<td>прыгать</td>
		<td>チョウ, チョ</td>
		<td>と.び, と.ぶ, は.ねる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>馳</td>
		<td></td>
		<td>ジ, チ</td>
		<td>は.せる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蓄</td>
		<td>amass</td>
		<td>チク</td>
		<td>たくわ.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>滝</td>
		<td>waterfall</td>
		<td>ロウ, ソウ</td>
		<td>たき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>痴</td>
		<td>stupid</td>
		<td>チ</td>
		<td>し.れる, おろか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>稚</td>
		<td>immature</td>
		<td>ジ, チ</td>
		<td>おさない, いとけない, おくて</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嘆</td>
		<td>sigh</td>
		<td>タン</td>
		<td>なげ.く, なげ.かわしい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>僧</td>
		<td>буддийский монах</td>
		<td>ソウ, ソー</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>塑</td>
		<td>model</td>
		<td>ソ</td>
		<td>でく</td>
	</tr>
	<tr>
		<td>1</td>
		<td>践</td>
		<td>tread</td>
		<td>セン</td>
		<td>ふ.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>禅</td>
		<td>Zen</td>
		<td>ゼン, セン</td>
		<td>しずか, ゆず.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>滞</td>
		<td>stagnate</td>
		<td>テイ, タイ</td>
		<td>とどこお.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賊</td>
		<td>burglar</td>
		<td>ゾク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>腎</td>
		<td>kidney</td>
		<td>ジン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>睡</td>
		<td>drowsy</td>
		<td>スイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>裾</td>
		<td>cuff</td>
		<td>コ, キョ</td>
		<td>すそ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>跡</td>
		<td>tracks</td>
		<td>セキ</td>
		<td>あと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>摂</td>
		<td>vicarious</td>
		<td>セツ, ショウ</td>
		<td>おさ.める, かね.る, と.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>聖</td>
		<td>holy</td>
		<td>ショウ, セイ</td>
		<td>ひじり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>誠</td>
		<td>sincerity</td>
		<td>セイ</td>
		<td>まこと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鉛</td>
		<td>lead</td>
		<td>エン</td>
		<td>なまり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>猿</td>
		<td>monkey</td>
		<td>エン</td>
		<td>さる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>禍</td>
		<td>calamity</td>
		<td>カ</td>
		<td>わざわい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嫁</td>
		<td>marry into</td>
		<td>カ</td>
		<td>とつ.ぐ, よめ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>該</td>
		<td>above-stated</td>
		<td>ガイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>暇</td>
		<td>spare time</td>
		<td>カ</td>
		<td>いとま, ひま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>隔</td>
		<td>isolate</td>
		<td>カク</td>
		<td>へだ.てる, へだ.たる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>滑</td>
		<td>slippery</td>
		<td>コツ, カツ</td>
		<td>なめ.らか, すべ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>褐</td>
		<td>brown</td>
		<td>カツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>勧</td>
		<td>советовать, побуждать, поощрять</td>
		<td>ケン, カン</td>
		<td>すす.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>雅</td>
		<td>gracious</td>
		<td>ガ</td>
		<td>みや.び</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嘩</td>
		<td></td>
		<td>ケ, カ</td>
		<td>かまびす.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蓋</td>
		<td>cover</td>
		<td>カイ, ガイ, コウ</td>
		<td>おお.う, かさ, ふた, けだ.し</td>
	</tr>
	<tr>
		<td>1</td>
		<td>塊</td>
		<td>clod</td>
		<td>カイ, ケ</td>
		<td>つちくれ, かたまり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>慨</td>
		<td>rue</td>
		<td>ガイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>頑</td>
		<td>stubborn</td>
		<td>ガン</td>
		<td>かたく</td>
	</tr>
	<tr>
		<td>1</td>
		<td>寛</td>
		<td>tolerant</td>
		<td>カン</td>
		<td>ゆる.やか, ひろ.い, くつろ.ぐ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>幹</td>
		<td>tree-trunk</td>
		<td>カン</td>
		<td>みき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>棄</td>
		<td>abandon</td>
		<td>キ</td>
		<td>す.てる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>義</td>
		<td>справедливость, принцип, смысл, долг, честь</td>
		<td>ギ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>愚</td>
		<td>foolish</td>
		<td>グ</td>
		<td>おろ.か</td>
	</tr>
	<tr>
		<td>1</td>
		<td>隙</td>
		<td>fissure</td>
		<td>ケキ, キャク, ゲキ</td>
		<td>す.く, す.かす, すき, ひま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>傑</td>
		<td>greatness</td>
		<td>ケツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>継</td>
		<td>inherit</td>
		<td>ケイ</td>
		<td>つ.ぐ, まま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>携</td>
		<td>portable</td>
		<td>ケイ</td>
		<td>たずさ.わる, たずさ.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>碁</td>
		<td>Go</td>
		<td>ゴ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>誇</td>
		<td>boast</td>
		<td>コ</td>
		<td>ほこ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>源</td>
		<td>исток</td>
		<td>ゲン</td>
		<td>みなもと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嫌</td>
		<td>не любить</td>
		<td>ゲン, ケン</td>
		<td>きら.う, いや, きら.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>献</td>
		<td>offering</td>
		<td>コン, ケン</td>
		<td>たてまつ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>絹</td>
		<td>silk</td>
		<td>ケン</td>
		<td>きぬ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>遣</td>
		<td>посылать, отправлять</td>
		<td>ケン</td>
		<td>づか.い, つか.う, つか.わす, つか.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>溝</td>
		<td>gutter</td>
		<td>コウ</td>
		<td>みぞ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鼓</td>
		<td>drum</td>
		<td>コ</td>
		<td>つづみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嗣</td>
		<td>heir</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>飼</td>
		<td>domesticate</td>
		<td>シ</td>
		<td>か.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>慈</td>
		<td>mercy</td>
		<td>ジ</td>
		<td>いつく.しむ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>詩</td>
		<td>стих</td>
		<td>シ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>載</td>
		<td>ride</td>
		<td>サイ</td>
		<td>の.る, の.せる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>搾</td>
		<td>squeeze</td>
		<td>サク</td>
		<td>しぼ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>債</td>
		<td>bond</td>
		<td>サイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>催</td>
		<td>sponsor</td>
		<td>サイ</td>
		<td>もよう.す, もよお.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蒔</td>
		<td></td>
		<td>シ, ジ</td>
		<td>まく, う.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>腫</td>
		<td>tumor</td>
		<td>シュ, ショウ</td>
		<td>く.む, は.れ, は.れる, は.らす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>愁</td>
		<td>distress</td>
		<td>シュウ</td>
		<td>うれ.える, うれ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>酬</td>
		<td>repay</td>
		<td>シュウ, シュ, トウ</td>
		<td>むく.いる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>詳</td>
		<td>detailed</td>
		<td>ショウ</td>
		<td>くわ.しい, つまび.らか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>傷</td>
		<td>рана</td>
		<td>ショ, ショウ</td>
		<td>いた.む, いた.める, きず</td>
	</tr>
	<tr>
		<td>1</td>
		<td>奨</td>
		<td>exhort</td>
		<td>ソウ, ショウ</td>
		<td>すす.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>飾</td>
		<td>decorate</td>
		<td>ショク</td>
		<td>かざ.り, かざ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>慎</td>
		<td>humility</td>
		<td>シン</td>
		<td>つつし.む, つつし.み, つつし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>障</td>
		<td>hurt</td>
		<td>ショウ</td>
		<td>さわ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>銃</td>
		<td>ружьё</td>
		<td>ジュ, ジュウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>彰</td>
		<td>patent</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>塾</td>
		<td>cram school</td>
		<td>ジュク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>需</td>
		<td>demand</td>
		<td>ジュ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>遮</td>
		<td>intercept</td>
		<td>シャ</td>
		<td>さえぎ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>魂</td>
		<td>soul</td>
		<td>コン</td>
		<td>たましい, たま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>雌</td>
		<td>feminine</td>
		<td>シ</td>
		<td>めん, めす, め</td>
	</tr>
	<tr>
		<td>1</td>
		<td>磁</td>
		<td>magnet</td>
		<td>ジ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>漆</td>
		<td>lacquer</td>
		<td>シツ</td>
		<td>うるし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>酸</td>
		<td>acid</td>
		<td>サン</td>
		<td>す.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>綱</td>
		<td>hawser</td>
		<td>コウ</td>
		<td>つな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>酵</td>
		<td>fermentation</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>豪</td>
		<td>overpowering</td>
		<td>ゴウ</td>
		<td>えら.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>穀</td>
		<td>cereal</td>
		<td>コク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>酷</td>
		<td>cruel</td>
		<td>コク</td>
		<td>ひど.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>獄</td>
		<td>prison</td>
		<td>ゴク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>駆</td>
		<td>мчаться, прогонять, ехать верхом</td>
		<td>ク</td>
		<td>か.る, か.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鞄</td>
		<td></td>
		<td>ハク, ホウ, ビョウ</td>
		<td>かばん</td>
	</tr>
	<tr>
		<td>1</td>
		<td>旗</td>
		<td>государственный флаг</td>
		<td>キ</td>
		<td>はた</td>
	</tr>
	<tr>
		<td>1</td>
		<td>概</td>
		<td>outline</td>
		<td>ガイ</td>
		<td>おうむ.ね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>閣</td>
		<td>tall</td>
		<td>カク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>箇</td>
		<td>counters for things</td>
		<td>コ, カ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>寡</td>
		<td>widow</td>
		<td>カ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>餌</td>
		<td>bait</td>
		<td>ニ, ジ</td>
		<td>え, えさ, もち, えば</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嘘</td>
		<td></td>
		<td>コ, キョ</td>
		<td>ふ.く, うそ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>隠</td>
		<td>прятать</td>
		<td>イン, オン</td>
		<td>かく.し, かく.れる, かく.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>稲</td>
		<td>rice plant</td>
		<td>テ, トウ</td>
		<td>いね, いな</td>
	</tr>
	<tr>
		<td>1</td>
		<td>維</td>
		<td>fiber</td>
		<td>イ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>誓</td>
		<td>vow</td>
		<td>セイ</td>
		<td>ちか.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>遭</td>
		<td>encounter</td>
		<td>ソウ</td>
		<td>あ.う, あ.わせる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>態</td>
		<td>состояние</td>
		<td>タイ</td>
		<td>わざ.と</td>
	</tr>
	<tr>
		<td>1</td>
		<td>駄</td>
		<td>вьюк, скверный</td>
		<td>ダ, タ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>噌</td>
		<td></td>
		<td>ソ, ソウ, ショウ</td>
		<td>かまびす.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>銭</td>
		<td>деньги, монета</td>
		<td>ゼン, セン</td>
		<td>ぜに, すき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>漸</td>
		<td>steadily</td>
		<td>ゼン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>端</td>
		<td>начало, конец, прямой, край</td>
		<td>タン</td>
		<td>は, ばた, はな, はた, はし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>奪</td>
		<td>rob</td>
		<td>ダツ</td>
		<td>うば.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>徴</td>
		<td>indications</td>
		<td>チョウ, チ</td>
		<td>しるし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嫡</td>
		<td>legitimate wife</td>
		<td>テキ, チャク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>漬</td>
		<td>pickling</td>
		<td>シ</td>
		<td>つ.ける, つ.かる, づ.け, づけ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>徳</td>
		<td>добродетель, нравственность</td>
		<td>トク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>摘</td>
		<td>pinch</td>
		<td>テキ</td>
		<td>つ.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>誘</td>
		<td>entice</td>
		<td>ユウ, イウ</td>
		<td>さそ.う, いざな.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>僚</td>
		<td>colleague</td>
		<td>リョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>暦</td>
		<td>calendar</td>
		<td>レキ</td>
		<td>こよみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>膜</td>
		<td>membrane</td>
		<td>マク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>僕</td>
		<td>я (исп. мальчиками и юношами)</td>
		<td>ボク</td>
		<td>しもべ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>墨</td>
		<td>black ink</td>
		<td>ボク</td>
		<td>すみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>銘</td>
		<td>inscription</td>
		<td>メイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>模</td>
		<td>imitation</td>
		<td>ボ, モ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>慢</td>
		<td>ridicule</td>
		<td>マン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>漫</td>
		<td>cartoon</td>
		<td>マン</td>
		<td>みがりに</td>
	</tr>
	<tr>
		<td>1</td>
		<td>網</td>
		<td>netting</td>
		<td>モウ</td>
		<td>あみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>罰</td>
		<td>penalty</td>
		<td>バツ, ハツ, バチ</td>
		<td>ばっ.する</td>
	</tr>
	<tr>
		<td>1</td>
		<td>閥</td>
		<td>clique</td>
		<td>バツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>碑</td>
		<td>tombstone</td>
		<td>ヒ</td>
		<td>いしぶみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>寧</td>
		<td>rather</td>
		<td>ネイ</td>
		<td>むし.ろ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賑</td>
		<td></td>
		<td>シン</td>
		<td>にぎ.やか, にぎ.わい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>慕</td>
		<td>pining</td>
		<td>ボ</td>
		<td>した.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>腐</td>
		<td>rot</td>
		<td>フ</td>
		<td>くさ.れる, くさ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>漂</td>
		<td>drift</td>
		<td>ヒョウ</td>
		<td>ただよ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>漏</td>
		<td>leak</td>
		<td>ロウ</td>
		<td>も.れる, も.らす, も.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>敷</td>
		<td>стелить</td>
		<td>フ</td>
		<td>し.き, し.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賓</td>
		<td>V.I.P.</td>
		<td>ヒン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>撫</td>
		<td></td>
		<td>フ, ブ</td>
		<td>な.でる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>噴</td>
		<td>erupt</td>
		<td>フン</td>
		<td>ふ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>墳</td>
		<td>tomb</td>
		<td>フン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>憤</td>
		<td>aroused</td>
		<td>フン</td>
		<td>いきどお.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>膝</td>
		<td>knee</td>
		<td>シツ</td>
		<td>ひざ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賦</td>
		<td>levy</td>
		<td>フ, ブ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>舗</td>
		<td>pavement</td>
		<td>ホ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>穂</td>
		<td>колос</td>
		<td>スイ</td>
		<td>ほ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>幣</td>
		<td>cash</td>
		<td>ヘイ</td>
		<td>ぬさ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>弊</td>
		<td>abuse</td>
		<td>ヘイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>褒</td>
		<td>praise</td>
		<td>ホウ</td>
		<td>ほ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>縄</td>
		<td>straw rope</td>
		<td>ジョウ</td>
		<td>ただ.す, なわ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>輩</td>
		<td>товарищ</td>
		<td>ハイ</td>
		<td>ともがら, やかい, やから, ばら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賠</td>
		<td>compensation</td>
		<td>バイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>罷</td>
		<td>quit</td>
		<td>ヒ</td>
		<td>まか.り, や.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>盤</td>
		<td>tray</td>
		<td>バン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>箸</td>
		<td>chopsticks</td>
		<td>チャク, チョ</td>
		<td>はし</td>
	</tr>
	<tr>
		<td>1</td>
		<td>黙</td>
		<td>молчать</td>
		<td>ボク, モク</td>
		<td>だま.る, もだ.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>魅</td>
		<td>fascination</td>
		<td>ミ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>撲</td>
		<td>slap</td>
		<td>ボク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>頬</td>
		<td>щека</td>
		<td>キョウ</td>
		<td>ほお, ほほ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>範</td>
		<td>pattern</td>
		<td>ハン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>摩</td>
		<td>chafe</td>
		<td>マ</td>
		<td>ま.する, す.る, さ.する</td>
	</tr>
	<tr>
		<td>1</td>
		<td>霊</td>
		<td>дух</td>
		<td>レイ, リョウ</td>
		<td>たま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>寮</td>
		<td>dormitory</td>
		<td>リョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>履</td>
		<td>footgear</td>
		<td>リ</td>
		<td>は.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>慮</td>
		<td>prudence</td>
		<td>リョ</td>
		<td>おもんぱか.る, おもんぱく.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>憂</td>
		<td>melancholy</td>
		<td>ユウ</td>
		<td>うれ.える, うれ.い, う.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>窯</td>
		<td>kiln</td>
		<td>ヨウ</td>
		<td>かま</td>
	</tr>
	<tr>
		<td>1</td>
		<td>養</td>
		<td>питание, растить, разводить, выращивать</td>
		<td>ヨウ, ヨー, リョウ</td>
		<td>やしな.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>敵</td>
		<td>враг</td>
		<td>テキ</td>
		<td>かな.う, かたき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>徹</td>
		<td>penetrate</td>
		<td>テツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>撤</td>
		<td>remove</td>
		<td>テツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>賭</td>
		<td>gamble</td>
		<td>ト</td>
		<td>か.ける, かけ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>締</td>
		<td>tighten</td>
		<td>テイ</td>
		<td>し.まり, し.まる, し.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>墜</td>
		<td>crash</td>
		<td>ツイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>踏</td>
		<td>ступать</td>
		<td>トー, トウ</td>
		<td>ふ.まえる, ふ.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>憧</td>
		<td>desire</td>
		<td>ドウ, トウ, ショウ</td>
		<td>あこが.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蝶</td>
		<td></td>
		<td>チョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>潮</td>
		<td>tide</td>
		<td>チョウ</td>
		<td>うしお, しお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>諾</td>
		<td>consent</td>
		<td>ダク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>鋳</td>
		<td>casting</td>
		<td>シュウ, シュ, イ, チュウ</td>
		<td>い.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>誰</td>
		<td>кто</td>
		<td>スイ</td>
		<td>だれ, たれ, た</td>
	</tr>
	<tr>
		<td>1</td>
		<td>誕</td>
		<td>born</td>
		<td>タン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>遷</td>
		<td>transition</td>
		<td>セン</td>
		<td>うつ.る, うつ.す, みやこがえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>槽</td>
		<td>vat</td>
		<td>ソウ</td>
		<td>ふね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>請</td>
		<td>solicit</td>
		<td>シン, ショウ, セイ</td>
		<td>こ.う, う.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>潜</td>
		<td>submerge</td>
		<td>セン</td>
		<td>もぐ.る, ひそ.む, かく.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>澄</td>
		<td>lucidity</td>
		<td>チョウ</td>
		<td>す.ます, す.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>噂</td>
		<td></td>
		<td>ソン</td>
		<td>うわさ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>慰</td>
		<td>consolation</td>
		<td>イ</td>
		<td>なぐさ.む, なぐさ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>影</td>
		<td>силуэт, тень</td>
		<td>エイ</td>
		<td>かげ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>謁</td>
		<td>audience</td>
		<td>エツ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>閲</td>
		<td>review</td>
		<td>エツ</td>
		<td>けみ.する</td>
	</tr>
	<tr>
		<td>1</td>
		<td>縁</td>
		<td>родство, связь, узы</td>
		<td>エン, -ネン</td>
		<td>ふちど.る, ゆかり, よすが, ふち</td>
	</tr>
	<tr>
		<td>1</td>
		<td>遺</td>
		<td>bequeath</td>
		<td>イ, ユイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>稼</td>
		<td>earnings</td>
		<td>カ</td>
		<td>かせ.ぐ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>潟</td>
		<td>lagoon</td>
		<td>セキ</td>
		<td>がた, かた</td>
	</tr>
	<tr>
		<td>1</td>
		<td>噛</td>
		<td></td>
		<td>コウ, ゴウ</td>
		<td>か.む, か.じる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>餓</td>
		<td>starve</td>
		<td>ガ</td>
		<td>う.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嬉</td>
		<td></td>
		<td>キ</td>
		<td>うれ.しい, たの.しむ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>歓</td>
		<td>delight</td>
		<td>カン</td>
		<td>よろこ.ぶ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>監</td>
		<td>надзор</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>緩</td>
		<td>slacken</td>
		<td>カン</td>
		<td>ゆる.やか, ゆる.い, ゆる.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>窮</td>
		<td>hard up</td>
		<td>キョウ, キュウ</td>
		<td>きわ.まる, きわ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>輝</td>
		<td>radiance</td>
		<td>キ</td>
		<td>かがや.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>儀</td>
		<td>церемония, манеры</td>
		<td>ギ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>戯</td>
		<td>frolic</td>
		<td>ゲ, ギ</td>
		<td>ざ.れる, たわむ.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>勲</td>
		<td>meritorious deed</td>
		<td>クン</td>
		<td>いさお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>慶</td>
		<td>jubilation</td>
		<td>ケイ</td>
		<td>よろこ.び</td>
	</tr>
	<tr>
		<td>1</td>
		<td>潔</td>
		<td>undefiled</td>
		<td>ケツ</td>
		<td>いさぎよ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>緊</td>
		<td>tense</td>
		<td>キン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>稿</td>
		<td>draft</td>
		<td>コウ</td>
		<td>したがき, わら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>撃</td>
		<td>нападать, стрелять</td>
		<td>ゲキ</td>
		<td>う.つ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>暫</td>
		<td>temporarily</td>
		<td>ザン</td>
		<td>しばら.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>撒</td>
		<td></td>
		<td>サツ, サン</td>
		<td>ま.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>賜</td>
		<td>grant</td>
		<td>シ</td>
		<td>たま.う, たまわ.る, たも.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>撮</td>
		<td>snapshot</td>
		<td>サツ</td>
		<td>ど.り, つま.む, と.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>趣</td>
		<td>gist</td>
		<td>シュ</td>
		<td>おもむ.く, おもむき</td>
	</tr>
	<tr>
		<td>1</td>
		<td>熟</td>
		<td>ripen</td>
		<td>ジュク</td>
		<td>う.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>潤</td>
		<td>wet</td>
		<td>ジュン</td>
		<td>うるお.す, うるお.う, うる.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>遵</td>
		<td>abide by</td>
		<td>ジュン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>衝</td>
		<td>collide</td>
		<td>ショウ</td>
		<td>つ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嘱</td>
		<td>entrust</td>
		<td>ショク</td>
		<td>しょく.する, たの.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>審</td>
		<td>examine</td>
		<td>シン</td>
		<td>つぶさ.に, つまび.らか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>壌</td>
		<td>lot</td>
		<td>ジョウ</td>
		<td>つち</td>
	</tr>
	<tr>
		<td>1</td>
		<td>嬢</td>
		<td>lass</td>
		<td>ジョウ</td>
		<td>むすめ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>獣</td>
		<td>животное, зверь</td>
		<td>ジュ, ジュウ</td>
		<td>けもの, けだもの</td>
	</tr>
	<tr>
		<td>1</td>
		<td>縦</td>
		<td>vertical</td>
		<td>ジュウ</td>
		<td>たて</td>
	</tr>
	<tr>
		<td>1</td>
		<td>儒</td>
		<td>Confucian</td>
		<td>ジュ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>樹</td>
		<td>деревья</td>
		<td>ジュ</td>
		<td>き</td>
	</tr>
	<tr>
		<td>1</td>
		<td>諮</td>
		<td>consult with</td>
		<td>シ</td>
		<td>はか.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>錯</td>
		<td>confused</td>
		<td>サク, シャク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>激</td>
		<td>яростный</td>
		<td>ゲキ</td>
		<td>はげ.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>憲</td>
		<td>constitution</td>
		<td>ケン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>墾</td>
		<td>ground-breaking</td>
		<td>コン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>鋼</td>
		<td>steel</td>
		<td>コウ</td>
		<td>はがね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>衡</td>
		<td>equilibrium</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>凝</td>
		<td>congeal</td>
		<td>ギョウ</td>
		<td>こ.る, こご.らす, こ.らす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>興</td>
		<td>процветать, возрождать, развлечение</td>
		<td>キョ, コウ, キョウ, コー</td>
		<td>おこ.す, おこ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>稽</td>
		<td>consider</td>
		<td>ケイ</td>
		<td>とど.める, かんが.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>憩</td>
		<td>recess</td>
		<td>ケイ</td>
		<td>いこ.う, いこ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>薫</td>
		<td>fragrant</td>
		<td>クン</td>
		<td>かお.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>還</td>
		<td>send back</td>
		<td>カン</td>
		<td>かえ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>憾</td>
		<td>remorse</td>
		<td>カン</td>
		<td>うら.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>懐</td>
		<td>pocket</td>
		<td>カイ, エ</td>
		<td>ふところ, なつ.かしい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>壊</td>
		<td>разрушать</td>
		<td>カイ, エ</td>
		<td>こわ.れる, こわ.す, やぶ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>獲</td>
		<td>seize</td>
		<td>カク</td>
		<td>え.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>穏</td>
		<td>calm</td>
		<td>オン</td>
		<td>おだ.やか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>憶</td>
		<td>память</td>
		<td>オク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>衛</td>
		<td>защита</td>
		<td>エイ, エ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>緯</td>
		<td>horizontal</td>
		<td>イ</td>
		<td>ぬき, よこいと</td>
	</tr>
	<tr>
		<td>1</td>
		<td>薦</td>
		<td>recommend</td>
		<td>セン</td>
		<td>すす.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>錠</td>
		<td>lock</td>
		<td>ジョウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>濁</td>
		<td>voiced</td>
		<td>ダク, ジョク</td>
		<td>にご.す, にご.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>壇</td>
		<td>podium</td>
		<td>タン, ダン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>糖</td>
		<td>sugar</td>
		<td>トウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>篤</td>
		<td>fervent</td>
		<td>トク</td>
		<td>あつ.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>謎</td>
		<td>riddle</td>
		<td>ベイ, メイ</td>
		<td>なぞ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>謡</td>
		<td>noh chanting</td>
		<td>ヨウ</td>
		<td>うた.い, うた.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>諭</td>
		<td>rebuke</td>
		<td>ユ</td>
		<td>さと.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>融</td>
		<td>dissolve</td>
		<td>ユウ</td>
		<td>と.かす, と.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>擁</td>
		<td>embrace</td>
		<td>ヨウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>隣</td>
		<td>соседний</td>
		<td>リン</td>
		<td>とな.る, となり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>錬</td>
		<td>tempering</td>
		<td>レン</td>
		<td>ね.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>膨</td>
		<td>swell</td>
		<td>ボウ</td>
		<td>ふく.らむ, ふく.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>謀</td>
		<td>conspire</td>
		<td>ム, ボウ</td>
		<td>はか.る, はかりごと, たばか.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>繁</td>
		<td>luxuriant</td>
		<td>ハン</td>
		<td>しげ.く, しげ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>縛</td>
		<td>truss</td>
		<td>バク</td>
		<td>しば.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>避</td>
		<td>evade</td>
		<td>ヒ</td>
		<td>よ.ける, さ.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>縫</td>
		<td>sew</td>
		<td>ホウ</td>
		<td>ぬ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>奮</td>
		<td>stirred up</td>
		<td>フン</td>
		<td>ふる.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>髭</td>
		<td></td>
		<td>シ</td>
		<td>くちひげ, ひげ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>頻</td>
		<td>repeatedly</td>
		<td>ヒン</td>
		<td>しき.りに</td>
	</tr>
	<tr>
		<td>1</td>
		<td>濡</td>
		<td></td>
		<td>ニュ, ジュ</td>
		<td>ぬら.す, ぬれ.る, ぬ.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>翼</td>
		<td>wing</td>
		<td>ヨク</td>
		<td>つばさ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>覧</td>
		<td>perusal</td>
		<td>ラン</td>
		<td>み.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鍋</td>
		<td>pot</td>
		<td>カ</td>
		<td>なべ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>謄</td>
		<td>mimeograph</td>
		<td>トウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>瞳</td>
		<td>зрачок</td>
		<td>ドウ, トウ, ドー</td>
		<td>ひとみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>聴</td>
		<td>слушать</td>
		<td>チョウ, テイ, チョ</td>
		<td>き.く, ゆる.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鍛</td>
		<td>forge</td>
		<td>タン</td>
		<td>きた.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鮮</td>
		<td>fresh</td>
		<td>セン</td>
		<td>あざ.やか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>霜</td>
		<td>frost</td>
		<td>ソウ</td>
		<td>しも</td>
	</tr>
	<tr>
		<td>1</td>
		<td>繊</td>
		<td>slender</td>
		<td>セン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>闇</td>
		<td>тьма, чёрный рынок</td>
		<td>オン, アン</td>
		<td>やみ, くら.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>轄</td>
		<td>control</td>
		<td>カツ</td>
		<td>くさび</td>
	</tr>
	<tr>
		<td>1</td>
		<td>霞</td>
		<td></td>
		<td>ゲ, カ</td>
		<td>かす.む, かすみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>擬</td>
		<td>mimic</td>
		<td>ギ</td>
		<td>まが.い, もど.き</td>
	</tr>
	<tr>
		<td>1</td>
		<td>犠</td>
		<td>sacrifice</td>
		<td>ギ, キ</td>
		<td>いけにえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>謹</td>
		<td>discreet</td>
		<td>キン</td>
		<td>つつし.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>矯</td>
		<td>rectify</td>
		<td>キョウ</td>
		<td>た.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>購</td>
		<td>subscription</td>
		<td>コウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>謙</td>
		<td>self-effacing</td>
		<td>ケン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>鍵</td>
		<td>key</td>
		<td>ケン</td>
		<td>かぎ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>厳</td>
		<td>strict</td>
		<td>ゲン, ゴン</td>
		<td>おごそ.か, きび.しい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>擦</td>
		<td>grate</td>
		<td>サツ</td>
		<td>す.る, こす.る, す.れる, ず.れ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>懇</td>
		<td>sociable</td>
		<td>コン</td>
		<td>ねんご.ろ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>謝</td>
		<td>извиняться, благодарить</td>
		<td>シャ</td>
		<td>あやま.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>縮</td>
		<td>shrink</td>
		<td>シュク</td>
		<td>ちぢ.まる, ちぢ.む, ちぢ.める</td>
	</tr>
	<tr>
		<td>1</td>
		<td>醜</td>
		<td>ugly</td>
		<td>シュウ</td>
		<td>しこ, みにく.い</td>
	</tr>
	<tr>
		<td>1</td>
		<td>礁</td>
		<td>reef</td>
		<td>ショウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>償</td>
		<td>reparation</td>
		<td>ショウ</td>
		<td>つぐな.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>醤</td>
		<td></td>
		<td>ショウ</td>
		<td>ひしお</td>
	</tr>
	<tr>
		<td>1</td>
		<td>織</td>
		<td>ткать</td>
		<td>シキ, ショク, ショ</td>
		<td>おり, お.り, お.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>瞬</td>
		<td>мгновение, миг</td>
		<td>シュ, シュン</td>
		<td>またた.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鎖</td>
		<td>chain</td>
		<td>サ</td>
		<td>くさり, とざ.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>顕</td>
		<td>appear</td>
		<td>ケン</td>
		<td>あらわ.れる, あきらか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>襟</td>
		<td>collar</td>
		<td>キン</td>
		<td>えり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>騎</td>
		<td>equestrian</td>
		<td>キ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>穫</td>
		<td>harvest</td>
		<td>カク</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>騒</td>
		<td>суетиться, шуметь</td>
		<td>ソウ, ソー</td>
		<td>うれい, さわ.ぐ, さわ.がしい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>繕</td>
		<td>darning</td>
		<td>ゼン</td>
		<td>つくろ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>礎</td>
		<td>cornerstone</td>
		<td>ソ</td>
		<td>いしずえ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鎮</td>
		<td>tranquilize</td>
		<td>チン</td>
		<td>しず.める, おさえ, しず.まる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>懲</td>
		<td>penal</td>
		<td>チョウ</td>
		<td>こ.りる, こ.らしめる, こ.らす</td>
	</tr>
	<tr>
		<td>1</td>
		<td>藤</td>
		<td>глициния</td>
		<td>トー, ドウ, トウ</td>
		<td>ふじ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>闘</td>
		<td>борьба, состязание</td>
		<td>トー, トウ</td>
		<td>たたか.う, あらそ.う</td>
	</tr>
	<tr>
		<td>1</td>
		<td>濫</td>
		<td>excessive</td>
		<td>ラン</td>
		<td>みだ.りに, みだ.りがましい</td>
	</tr>
	<tr>
		<td>1</td>
		<td>離</td>
		<td>расставаться, отделяться</td>
		<td>リ</td>
		<td>はな.す, はな.れる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>臨</td>
		<td>lookover</td>
		<td>リン</td>
		<td>のぞ.む</td>
	</tr>
	<tr>
		<td>1</td>
		<td>糧</td>
		<td>provisions</td>
		<td>ロウ, リョウ</td>
		<td>かて</td>
	</tr>
	<tr>
		<td>1</td>
		<td>翻</td>
		<td>flip</td>
		<td>ハン, ホン</td>
		<td>ひるがえ.す, ひるがえ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>繭</td>
		<td>cocoon</td>
		<td>ケン</td>
		<td>きぬ, まゆ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>癒</td>
		<td>healing</td>
		<td>ユ</td>
		<td>いや.す, い.える</td>
	</tr>
	<tr>
		<td>1</td>
		<td>藩</td>
		<td>clan</td>
		<td>ハン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>覆</td>
		<td>capsize</td>
		<td>フク</td>
		<td>おお.う, くつがえ.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>癖</td>
		<td>mannerism</td>
		<td>ヘキ</td>
		<td>くせ.に, くせ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>簿</td>
		<td>register</td>
		<td>ボ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>譜</td>
		<td>musical score</td>
		<td>フ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>覇</td>
		<td>hegemony</td>
		<td>ハク, ハ</td>
		<td>はたがしら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>霧</td>
		<td>fog</td>
		<td>ブ, ム, ボウ</td>
		<td>きり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>麗</td>
		<td>изящный, восхитительный, прекрасный</td>
		<td>レイ</td>
		<td>うるわ.しい, うら.らか</td>
	</tr>
	<tr>
		<td>1</td>
		<td>羅</td>
		<td>gauze</td>
		<td>ラ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>蘇</td>
		<td></td>
		<td>ソ, ス</td>
		<td>よみがえ.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>藻</td>
		<td>seaweed</td>
		<td>ソウ</td>
		<td>も</td>
	</tr>
	<tr>
		<td>1</td>
		<td>瀬</td>
		<td>rapids</td>
		<td>ライ</td>
		<td>せ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>髄</td>
		<td>marrow</td>
		<td>ズイ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>韻</td>
		<td>rhyme</td>
		<td>イン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>鏡</td>
		<td>зеркало</td>
		<td>キョウ, ケイ, キョ</td>
		<td>かがみ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>繰</td>
		<td>winding</td>
		<td>ソウ</td>
		<td>く.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鶏</td>
		<td>chicken</td>
		<td>ケイ</td>
		<td>にわとり, とり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鯨</td>
		<td>whale</td>
		<td>ゲイ</td>
		<td>くじら</td>
	</tr>
	<tr>
		<td>1</td>
		<td>蹴</td>
		<td>kick</td>
		<td>シュウ, シュク</td>
		<td>け.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>譲</td>
		<td>defer</td>
		<td>ジョウ</td>
		<td>ゆず.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>醸</td>
		<td>brew</td>
		<td>ジョウ</td>
		<td>かも.す</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鐘</td>
		<td>bell</td>
		<td>ショウ</td>
		<td>かね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>懸</td>
		<td>suspend</td>
		<td>ケン, ケ</td>
		<td>か.かる, か.ける</td>
	</tr>
	<tr>
		<td>1</td>
		<td>護</td>
		<td>охранять, защищать</td>
		<td>ゴ</td>
		<td>まも.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>響</td>
		<td>эхо</td>
		<td>キョウ, キョ</td>
		<td>ひび.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>籍</td>
		<td>enroll</td>
		<td>セキ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>騰</td>
		<td>inflation</td>
		<td>トウ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>欄</td>
		<td>column</td>
		<td>ラン</td>
		<td>てすり</td>
	</tr>
	<tr>
		<td>1</td>
		<td>露</td>
		<td>роса, на открытом воздухе, Россия</td>
		<td>ロ, ロウ</td>
		<td>つゆ</td>
	</tr>
	<tr>
		<td>1</td>
		<td>躍</td>
		<td>leap</td>
		<td>ヤク</td>
		<td>おど.る</td>
	</tr>
	<tr>
		<td>1</td>
		<td>魔</td>
		<td>волшебство, демон</td>
		<td>マ</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>艦</td>
		<td>военный корабль</td>
		<td>カン</td>
		<td></td>
	</tr>
	<tr>
		<td>1</td>
		<td>顧</td>
		<td>look back</td>
		<td>コ</td>
		<td>かえり.みる</td>
	</tr>
	<tr>
		<td>1</td>
		<td>襲</td>
		<td>атаковать</td>
		<td>シュウ, シュ</td>
		<td>おそ.う, かさ.ね</td>
	</tr>
	<tr>
		<td>1</td>
		<td>驚</td>
		<td>удивляться</td>
		<td>キョウ, キョ</td>
		<td>おどろ.かす, おどろ.く</td>
	</tr>
	<tr>
		<td>1</td>
		<td>鑑</td>
		<td>specimen</td>
		<td>カン</td>
		<td>かがみ, かんが.みる</td>
	</tr>
</table>
