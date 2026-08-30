/* AUX USA / Content Master v1 FIX
   Source: AUX_USA_Visual_Wireframe_Content_Master_JA.md (meaning source of truth)
           AUX_USA_Visual_Wireframe_Content_Master_EN.md (working English)
   Rebuilds the eight core pages while leaving Support pages untouched.
*/
(function(){
  function lang(){
    try{return wireframeLocale==='ja'?'ja':'en'}catch(_){return new URLSearchParams(location.search).get('lang')==='ja'?'ja':'en'}
  }
  function L(ja,en){return lang()==='ja'?ja:en}
  function cta(key){
    const map={
      product:['商品を見る','View Product'],
      inuse:['使用シーンを見る','Explore In Use'],
      aux:['AUXについて詳しく見る','Learn About AUX'],
      shop:['商品一覧を見る','Shop All Products'],
      cook:['COOKを見る','Shop COOK'],
      serve:['SERVEを見る','Shop SERVE'],
      table:['TABLEを見る','Shop TABLE']
    };
    return L(...map[key]);
  }
  function button(label,go,cls=''){return `<a class="btn ${cls}" data-go="${go}">${label}</a>`}
  function photo(label,cls=''){return `<div class="master-photo ${cls}"><span class="photo-label">${label}</span></div>`}
  function pageShell(route,title,meta,body){return `${chrome(route,title,meta)}<div class="page master-page">${body}</div>${footer()}`}

  const categoryCopy={
    cook:{label:'COOK',ja:'調理・加熱・下ごしらえに。',en:'For prep and cooking.',go:'cook'},
    serve:{label:'SERVE',ja:'盛り付け・取り分け・シェアに。',en:'For plating, serving, and sharing.',go:'serve'},
    table:{label:'TABLE',ja:'食卓で小さな食材を扱う場面に。',en:'For small foods at the table.',go:'table'}
  };
  function imageNavCard(item,extra=''){
    return `<article class="master-image-nav-card clickable ${extra}" data-go="${item.go}">
      <span class="photo-label">${L('撮影：'+item.label+'を象徴する使用シーン',item.label+' category image')}</span>
      <div class="master-image-nav-copy"><h3 class="h3">${item.label}</h3><span class="master-nav-arrow">→</span><p>${L(item.ja,item.en)}</p></div>
    </article>`;
  }
  function categoryGrid(keys=['cook','serve','table'],extra=''){return `<div class="master-category-grid ${extra}">${keys.map(k=>imageNavCard(categoryCopy[k])).join('')}</div>`}

  function sectionHead(label,title,body=''){
    return `<div class="master-section-head">${label?`<div class="eyebrow">${label}</div>`:''}<h2 class="display h2">${title}</h2>${body?`<p class="lead">${body}</p>`:''}</div>`;
  }

  function homeMaster(){
    const ja=lang()==='ja';
    const useItems=ja?[
      ['調理する','食材や調理方法に合ったトングを選ぶ。','use-cooking','撮影：調理 / 手＋食材＋AUX'],
      ['盛り付ける','料理を仕上げる作業に合ったトングを選ぶ。','use-plating','撮影：盛り付け / 手＋完成皿＋AUX'],
      ['取り分ける','料理や器に合わせて使いやすいトングを選ぶ。','use-serving','撮影：取り分け / 大皿＋食卓＋AUX'],
      ['小さな食材を扱う','一般的なトングでは大きすぎる場面に合ったトングを選ぶ。','use-small','撮影：小さな食材 / 小鉢・瓶＋AUX']
    ]:[
      ['Cooking','Choose tongs that match the food and cooking method.','use-cooking','Cooking / hand + food + AUX'],
      ['Plating','Choose tongs that fit the finishing task.','use-plating','Plating / finished dish + AUX'],
      ['Serving','Choose tongs that suit the food and serving dish.','use-serving','Serving / shared table + AUX'],
      ['Small Foods','Choose tongs for tasks where full-size tongs are too large.','use-small','Small foods / dish or jar + AUX']
    ];
    return pageShell('/', 'Home','Content Master v1 FIX',`
      <section class="master-home-hero">
        <div class="master-home-hero-visual">${photo(L('撮影：代表商品＋手＋身近な料理の使用シーン','Featured product + hand + familiar food'),'hero-photo')}</div>
        <div class="master-home-hero-copy">
          <div class="eyebrow">TABLE</div>
          <h1 class="display h1">${L('商品名','Product Name')}</h1>
          <p class="lead">${L('その商品の主な使用価値を1フレーズで説明する。','One short phrase describing the product’s primary use value.')}</p>
          <div class="action-row">${button(cta('product'),'pdp','black')}${button(cta('inuse'),'inuse')}</div>
          <div class="master-hero-pager" aria-label="Featured product pagination"><span class="active"></span><span></span><span></span></div>
        </div>
      </section>

      <section class="section master-aux-feature">
        <div class="master-shape-gallery">
          ${photo(L('撮影：複数商品の形状差 / 麺用の先端','Shape comparison / noodle-focused tip'))}
          ${photo(L('撮影：複数商品の形状差 / 油を切れる形状','Shape comparison / draining form'))}
          ${photo(L('撮影：複数商品の形状差 / コンパクトサイズ','Shape comparison / compact size'))}
        </div>
        <div class="master-feature-copy">
          <div class="eyebrow">${L('AUXの特徴','AUX FEATURES')}</div>
          <h2 class="display h2">${L('食材や使い方に合わせて、形を変える。','Different shapes for different foods and tasks.')}</h2>
          <p class="lead">${L('麺をつかみやすい先端、油を切れる穴、小さな食材を扱いやすいサイズなど、商品ごとに形状が異なります。','Tips shaped for noodles, holes that drain oil, compact sizes for small foods—each product has a different shape for its purpose.')}</p>
          <a class="master-text-link" data-go="why">${cta('aux')} →</a>
        </div>
      </section>

      <section class="section compact master-featured-products">
        <div class="row section-head-row"><h2 class="display h2">${L('おすすめの商品','Featured Products')}</h2>${button(cta('shop'),'shop')}</div>
        <div class="product-strip">${[0,1,2,3].map(i=>productCard(i)).join('')}</div>
      </section>

      <section class="section compact">
        <h2 class="display h2">${L('カテゴリから探す','Shop by Category')}</h2>
        ${categoryGrid()}
      </section>

      <section class="section master-home-use">
        <div class="row section-head-row master-use-heading"><div>${sectionHead('',L('使う場面から探す','Shop by Use'),L('調理する、盛り付ける、取り分ける、小さな食材を扱う。やりたいことから、その用途に合うAUXのトングを見つけられます。','Cooking, plating, serving, or handling small foods. Start with what you want to do and find the AUX tongs that fit.'))}</div>${button(cta('inuse'),'inuse')}</div>
        <div class="home-use-layout master-home-use-layout">
          <article class="home-use-feature clickable" data-go="inuse" data-target="${useItems[0][2]}">
            <div class="home-use-visual master-use-image"><span class="photo-label">${useItems[0][3]}</span></div>
            <div class="home-use-copy"><div class="eyebrow">${useItems[0][0]}</div><h3 class="h3">${useItems[0][1]}</h3><span class="master-card-arrow">↓</span></div>
          </article>
          <div class="home-use-list">${useItems.slice(1).map(x=>`<article class="home-use-row clickable" data-go="inuse" data-target="${x[2]}"><div class="home-use-row-visual"><span class="photo-label">${x[3]}</span></div><div class="home-use-row-copy"><div class="eyebrow">${x[0]}</div><h3 class="h3">${x[1]}</h3><span class="master-card-arrow">↓</span></div></article>`).join('')}</div>
        </div>
      </section>

      <section class="section master-image-band master-home-about">
        <span class="photo-label">${L('撮影：燕三条の製造・金属加工・仕上げ','Tsubame-Sanjo manufacturing / metalworking / finish')}</span>
        <div class="master-image-band-copy"><div class="eyebrow">${L('AUXについて','ABOUT AUX')}</div><h2 class="display h2">${L('日本の金属加工技術を生かした、精密なつくり。','Made with Japanese precision.')}</h2><p class="lead">${L('AUXの製品は新潟・燕三条で製造されています。培われてきた金属加工の技術を生かし、細かな形状や仕上げまで丁寧につくられています。','AUX products are made in Tsubame-Sanjo, Niigata. Long-established metalworking expertise shapes every detail, from form to finish.')}</p>${button(cta('aux'),'why','black')}</div>
      </section>`);
  }

  function shopMaster(){
    return pageShell('/collections/all','Shop All','Content Master v1 FIX',`
      <section class="section compact master-simple-hero"><div class="eyebrow">${L('商品一覧','SHOP ALL')}</div><h1 class="display h1">${L('すべての商品','All Products')}</h1><p class="lead">${L('AUXのキッチンツールを一覧でご覧いただけます。COOK / SERVE / TABLEのカテゴリから探すこともできます。','Browse all AUX kitchen tools. You can also shop by COOK, SERVE, or TABLE.')}</p></section>
      <section class="section compact master-shop-categories">${categoryGrid()}</section>
      <section class="section compact master-product-grid-section">
        <div class="master-filterbar"><div class="master-filter-group"><b>${L('絞り込み','FILTER')}</b>${['all','cook','serve','table'].map((x,i)=>`<button class="master-filter-chip ${i===0?'active':''}">${L(['すべて','COOK','SERVE','TABLE'][i],['All','COOK','SERVE','TABLE'][i])}</button>`).join('')}</div><div class="master-sort"><b>${L('並び替え','SORT')}</b><button>${L('おすすめ順','Featured')} ▾</button></div></div>
        <div class="grid-products">${Array.from({length:13},(_,i)=>productCard(i)).join('')}</div>
      </section>
      <section class="section master-exit-horizontal"><div class="master-exit-image"><span class="photo-label">${L('撮影：代表的な使用シーン / 手＋AUX＋料理','Use-case image / hand + AUX + food')}</span></div><div class="master-exit-copy"><div class="eyebrow">${L('使う場面から探す','SHOP BY USE')}</div><h2 class="display h2">${L('使う場面から、合うトングを探す。','Find the right tongs for the task.')}</h2><p class="lead">${L('調理する、盛り付ける、取り分ける、小さな食材を扱う。やりたいことから、その用途に合うAUXのトングを見つけられます。','Cooking, plating, serving, or handling small foods. Start with what you want to do and find the AUX tongs that fit.')}</p>${button(cta('inuse'),'inuse','black')}</div></section>`);
  }

  const collectionData={
    cook:{
      title:'COOK',subJa:'調理・加熱・下ごしらえに。',subEn:'For prep and cooking.',bodyJa:'麺を持ち上げる、食材を返す、揚げ物を取り出すなど、調理中のさまざまな作業に。',bodyEn:'For lifting noodles, turning food, removing fried foods, and other cooking tasks.',
      aboutJa:'COOKについて',aboutEn:'About COOK',aboutTitleJa:'食材や調理方法に合った商品を選ぶ。',aboutTitleEn:'Choose tongs to match the food and cooking method.',
      pointsJa:[['フライパンで','肉や野菜を返す、持ち上げる、取り出す。'],['麺・長い食材','麺をつかんで持ち上げる。'],['揚げ物','揚げ物をつかみながら油を切る。']],
      pointsEn:[['In the Pan','Turn, lift, and remove meat and vegetables.'],['Noodles & Long Foods','Grip and lift noodles.'],['Fried Foods','Grip food while draining excess oil.']], featured:[1,3], grid:[1,3,6,9]
    },
    serve:{
      title:'SERVE',subJa:'盛り付け・取り分け・シェアに。',subEn:'For plating, serving, and sharing.',bodyJa:'サラダ、パスタ、大皿料理など、料理を盛り付けたり取り分けたりする場面に。',bodyEn:'For salads, pasta, shared dishes, and other plating and serving tasks.',
      aboutJa:'SERVEについて',aboutEn:'About SERVE',aboutTitleJa:'料理を置く位置や、取り分ける量を調整しやすく。',aboutTitleEn:'Place and portion food with more control.',
      pointsJa:[['盛り付け','料理を皿へ移し、置く位置を整える。'],['取り分け','サラダやパスタ、大皿料理を必要な量だけ取り分ける。'],['ソースのある料理','食材とソースを一緒に盛り付け・取り分ける。']],
      pointsEn:[['Plating','Move food to the plate and adjust where it sits.'],['Serving','Serve the amount you need from salads, pasta, and shared dishes.'],['Sauced Dishes','Serve food and sauce together.']], featured:[2,4], grid:[2,4,7,10]
    },
    table:{
      title:'TABLE',subJa:'食卓で小さな食材を扱う場面に。',subEn:'For small foods at the table.',bodyJa:'ピクルス、ベリー、薬味、ティーバッグなど、大きなトングでは扱いにくいものに。',bodyEn:'For pickles, berries, garnishes, tea bags, and other small items that are hard to handle with full-size tongs.',
      aboutJa:'TABLEについて',aboutEn:'About TABLE',aboutTitleJa:'小さなものを扱いやすいサイズ。',aboutTitleEn:'Sized for small items.',aboutBodyJa:'小鉢や瓶の中でも使いやすい、コンパクトなトングを中心に紹介します。',aboutBodyEn:'A selection of compact tongs that work well in small dishes and jars.',
      pointsJa:[['小さな食材','ピクルス、ベリー、オリーブなどをつまむ。'],['小鉢・瓶','梅干し、らっきょう、薬味などを取り出す。'],['お茶・食卓','ティーバッグや小さな食材を扱う。']],
      pointsEn:[['Small Foods','Pick up pickles, berries, olives, and more.'],['Small Dishes & Jars','Pick up small foods and garnishes from dishes or jars.'],['Tea & Table','Handle tea bags and other small items.']], featured:[0,5], grid:[0,5,8,11]
    }
  };
  function collectionMaster(key){
    const d=collectionData[key], points=lang()==='ja'?d.pointsJa:d.pointsEn;
    return pageShell('/collections/'+key,d.title,'Content Master v1 FIX',`
      <section class="master-collection-hero"><div class="master-collection-hero-copy"><h1 class="display h1">${d.title}</h1><h2 class="master-collection-sub">${L(d.subJa,d.subEn)}</h2><p class="lead">${L(d.bodyJa,d.bodyEn)}</p></div><div class="master-collection-hero-image"><span class="photo-label">${L('撮影：'+d.title+'を象徴する使用シーン',d.title+' lifestyle / use scene')}</span></div></section>
      <section class="section master-collection-about"><div class="eyebrow">${L(d.aboutJa,d.aboutEn)}</div><h2 class="display h2">${L(d.aboutTitleJa,d.aboutTitleEn)}</h2>${d.aboutBodyJa?`<p class="lead">${L(d.aboutBodyJa,d.aboutBodyEn)}</p>`:''}<div class="collection-benefits master-use-value-grid">${points.map((p,i)=>`<article class="master-use-value-card"><span class="master-number">0${i+1}</span><h3 class="h3">${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div></section>
      <section class="section compact collection-featured-tools"><h2 class="display h2">${L('代表商品','Featured Products')}</h2><div class="featured-two">${d.featured.map(i=>productCard(i)).join('')}</div></section>
      <section class="section compact master-product-grid-section"><div class="master-filterbar"><div class="master-filter-group"><b>${L('絞り込み','FILTER')}</b><button class="master-filter-chip active">${d.title}</button></div><div class="master-sort"><b>${L('並び替え','SORT')}</b><button>${L('おすすめ順','Featured')} ▾</button></div></div><div class="grid-products">${d.grid.map(i=>productCard(i)).join('')}</div></section>
      <section class="section master-image-band master-collection-about-aux"><span class="photo-label">${L('撮影：燕三条の製造・金属加工・仕上げ','Tsubame-Sanjo manufacturing / metalworking / finish')}</span><div class="master-image-band-copy"><div class="eyebrow">${L('AUXについて','ABOUT AUX')}</div><h2 class="display h2">${L('日本の金属加工技術を生かした、精密なつくり。','Made with Japanese precision.')}</h2><p class="lead">${L('AUXの製品は新潟・燕三条で製造されています。培われてきた金属加工の技術を生かし、細かな形状や仕上げまで丁寧につくられています。','AUX products are made in Tsubame-Sanjo, Niigata. Long-established metalworking expertise shapes every detail, from form to finish.')}</p><div class="action-row balanced-cta-row">${button(cta('aux'),'why','black')}${button(cta('inuse'),'inuse')}</div></div></section>`);
  }

  const inuseData={
    ja:{heroLabel:'IN USE',heroTitle:'使う場面から、合うトングを探す。',heroBody:'調理する、盛り付ける、取り分ける、小さな食材を扱う。やりたいことから、その用途に合うAUXのトングを見つけられます。',explore:'使う場面から探す',
      jumps:[['調理する','麺を持ち上げる、食材を返す、揚げ物を取り出す。調理する食材や動作に合ったトングを選ぶ。'],['盛り付ける','料理を皿へ移す、食材の位置を整える、ソースを添える。料理を仕上げる作業に合ったトングを選ぶ。'],['取り分ける','サラダやパスタ、大皿料理を食卓で取り分ける。料理や器に合わせて使いやすいトングを選ぶ。'],['小さな食材を扱う','ピクルスやベリー、薬味、ティーバッグなど、小さなものをつまむ・取り出す。一般的なトングでは大きすぎる場面に合ったトングを選ぶ。']],
      scenes:[
        ['use-cooking','01','調理する','食材と調理方法に合ったトングを使う。','麺を持ち上げる、肉や野菜を返す、揚げ物を取り出す。食材や調理方法に合わせて、適した形のトングを選べます。','cook','COOKを見る',[['しっかりめんトング','麺をつかんで持ち上げやすい'],['あげものトング','つかみながら油を切れる'],['おきラク焼き肉トング','薄い肉をつかみやすい']]],
        ['use-plating','02','盛り付ける','料理を置く位置まで調整しやすく。','パスタやサラダを皿へ移す、食材の位置を整える、料理と一緒にソースを添える。盛り付けでは、つかむだけでなく、料理を置く位置まで調整できることが重要です。','serve','SERVEを見る',[['もりつけトング','細かな位置を調整しやすい'],['ソースもすくえるガッシリトング','食材とソースを一緒に盛り付けられる'],['ゆびさきサーバートング','サラダやパスタを盛り付けやすい']]],
        ['use-serving','03','取り分ける','料理や器に合ったトングで取り分ける。','サラダやパスタ、大皿料理を食卓で取り分ける。料理の大きさや、つかみたい食材に合わせて使いやすいトングを選べます。','serve','SERVEを見る',[['ゆびさきサーバートング','大皿料理を取り分けやすい'],['トリワケトング','小さなものや薄い食材もつまみやすい'],['ソースもすくえるガッシリトング','大きな食材をソースごと取り分けられる']]],
        ['use-small','04','小さな食材を扱う','大きなトングでは扱いにくいものを、つまんで取り出す。','ピクルスやベリー、薬味、ティーバッグなど、小さなものを扱う場面。小さな器や瓶の中でも使いやすい、コンパクトなトングを紹介します。','table','TABLEを見る',[['ごはんのおともトング','小鉢や瓶の中でも使いやすい'],['ミニゆびさきトング','小さなものを指の代わりにつかめる'],['トリワケトング','小さな食材をつまみやすい']]]
      ],exitTitle:'商品を一覧から探す',exitBody:'使いたい場面が決まっていない場合は、AUXの商品を一覧から探せます。'},
    en:{heroLabel:'IN USE',heroTitle:'Find the right tongs for the task.',heroBody:'Cooking, plating, serving, or handling small foods. Start with what you want to do and find the AUX tongs that fit.',explore:'Shop by Use',
      jumps:[['Cooking','Lift noodles, turn food, or remove fried foods. Choose tongs that match the food and cooking action.'],['Plating','Move food to the plate, adjust placement, or add sauce. Choose tongs that fit the finishing task.'],['Serving','Serve salads, pasta, and shared dishes at the table. Choose tongs that suit the food and serving dish.'],['Small Foods','Pick up or remove pickles, berries, garnishes, tea bags, and other small items. Choose tongs for tasks where full-size tongs are too large.']],
      scenes:[
        ['use-cooking','01','Cooking','Use tongs that match the food and cooking method.','Lift noodles, turn meat or vegetables, and remove fried foods. Choose a tong shape suited to the food and cooking method.','cook','Shop COOK',[['Noodle Tongs','Easy to grip and lift noodles.'],['Frying Tongs','Grip food while draining oil.'],['Meat Tongs','Easy to grip thin slices of meat.']]],
        ['use-plating','02','Plating','Place food with more control.','Move pasta or salad to the plate, adjust placement, and add sauce. For plating, it helps to control not only the grip but also where the food lands.','serve','Shop SERVE',[['Plating Tongs','Easy to make small placement adjustments.'],['Sauce-Scooping Tongs','Serve food and sauce together.'],['Fingertip Server Tongs','Easy to plate salads and pasta.']]],
        ['use-serving','03','Serving','Serve with tongs that fit the food and dish.','Serve salads, pasta, and shared dishes at the table. Choose tongs that suit the size of the food and what you need to pick up.','serve','Shop SERVE',[['Fingertip Server Tongs','Easy to serve from shared dishes.'],['Serving Tongs','Easy to pick up small or thin foods.'],['Sauce-Scooping Tongs','Serve larger foods together with sauce.']]],
        ['use-small','04','Small Foods','Pick up small items that are hard to handle with full-size tongs.','For pickles, berries, garnishes, tea bags, and other small items. Compact tongs work well in small dishes and jars.','table','Shop TABLE',[['Small Dish Tongs','Easy to use in small dishes and jars.'],['Mini Fingertip Tongs','Grip small items like using your fingertips.'],['Serving Tongs','Easy to pick up small foods.']]]
      ],exitTitle:'Browse All Products',exitBody:'If you have not decided how you want to use them yet, browse the full AUX lineup.'}
  };
  function inuseRelatedCard(p){return `<article class="inuse-related-card clickable" data-go="pdp"><div class="inuse-related-img"></div><div class="inuse-related-title">${p[0]}</div><p>${p[1]}</p></article>`}
  function inuseMaster(){
    const d=inuseData[lang()];
    return pageShell('/pages/in-use','In Use','Content Master v1 FIX',`
      <section class="why-hero master-inuse-hero"><div class="eyebrow">${d.heroLabel}</div><h1 class="display h1">${d.heroTitle}</h1><p class="lead">${d.heroBody}</p></section>
      <section class="section compact inuse-explore"><h2 class="display h2">${d.explore}</h2><div class="use-jump-grid">${d.jumps.map((j,i)=>`<article class="use-jump clickable" data-anchor="${d.scenes[i][0]}"><span class="use-photo-label">${L('撮影：'+j[0]+'の使用シーン',j[0]+' use scene')}</span><div class="eyebrow">0${i+1}</div><h3 class="h3">${j[0]}</h3><p>${j[1]}</p></article>`).join('')}</div></section>
      ${d.scenes.map((s,i)=>`<section class="inuse-scene ${i%2===1?'master-reverse':''}" id="${s[0]}"><div class="inuse-scene-visual"><span class="photo-label">${L('撮影：'+s[2]+'の大きな使用シーン',s[2]+' / large use-case image')}</span></div><div class="inuse-scene-copy"><div class="eyebrow">${s[1]} / ${s[2]}</div><h2 class="display h2">${s[3]}</h2><p class="lead">${s[4]}</p><div class="inuse-related-grid">${s[7].map(inuseRelatedCard).join('')}</div><div class="inuse-scene-cta">${button(s[6],s[5])}</div></div></section>`).join('')}
      <section class="section master-image-band inuse-prefooter"><span class="photo-label">${L('撮影：複数のAUX商品 / 商品一覧へ戻る使用シーン','Multiple AUX tools / use-led product discovery')}</span><div class="master-image-band-copy"><h2 class="display h2">${d.exitTitle}</h2><p class="lead">${d.exitBody}</p>${button(cta('shop'),'shop','black')}</div></section>`);
  }

  function pdpMaster(){
    const ja=lang()==='ja';
    const featureCopy=ja?[
      ['細かな食材を扱いやすい先端','小さな食材をつまむ場面で、食材に触れる位置を見ながら扱いやすい形状。'],
      ['小さな動作に合わせた形','細かな盛り付けや卓上の作業で扱いやすい、コンパクトな全体形状。'],
      ['食卓で使いやすいサイズ','小皿や食卓まわりでも大きすぎないサイズ感。']
    ]:[
      ['Fine contact for small foods','A finer contact area makes it easier to work around small ingredients.'],
      ['A form for smaller movements','A compact overall shape suited to precise plating and tabletop tasks.'],
      ['A scale that fits the table','Sized to feel natural around small dishes and finished food.']
    ];
    return pageShell('/products/fingertip-tongs','Product Detail','Content Master v1 FIX / product-specific copy remains working copy',`
      <div class="pdp-top-ux master-pdp-top"><div class="pdp-gallery-ux"><div class="pdp-gallery-stage"><span class="photo-label">${L('撮影：商品全体 / 無地背景 / 形が一目で分かる','Primary product shot / clean background / full silhouette')}</span></div><div class="pdp-gallery-thumbs">${[1,2,3,4].map((n,i)=>`<button class="pdp-gallery-thumb ${i===0?'active':''}"><span class="pdp-gallery-thumb-index">0${n}</span></button>`).join('')}</div></div><div class="buybox"><div class="eyebrow">TABLE</div><h1 class="display h2">${L('指先トング','Fingertip Tongs')}</h1><p class="lead">${L('小さな食材や細かな盛り付けに使いやすい、コンパクトなトング。','Light, precise tongs for small foods, plating, and everyday tabletop use.')}</p><div class="price-big">$—</div><div class="master-rating"><b>${L('レビュー評価','Review rating')}</b><span>—</span></div><div class="divider"></div><div class="tiny">${L('数量','Quantity')}</div><div class="qty"><span>−</span><span>1</span><span>＋</span></div><button class="add">${L('カートに追加','ADD TO CART')}</button><div class="purchase-assurance"><button data-go="shipping"><b>${L('配送','Shipping')}</b><span>${L('配送日数・送料','Delivery timing & costs')} →</span></button><button data-go="returns"><b>${L('返品','Returns')}</b><span>${L('返品ポリシー','Return policy')} →</span></button></div></div></div>

      <section class="section master-pdp-primary"><div class="master-pdp-primary-image"><span class="photo-label">${L('撮影：主な使用価値が分かる使用シーン','Primary use-value image')}</span></div><div class="master-pdp-primary-copy"><h2 class="display h2">${L('小さな食材を、狙った位置で扱いやすく。','More control for small foods and precise placement.')}</h2><p class="lead">${L('小さな食材をつまむ、盛り付ける、食卓で取り分けるなど、細かな作業に使いやすいサイズと形状です。','A compact shape for picking up small foods, precise plating, and lighter tabletop serving tasks.')}</p></div></section>

      <section class="section compact master-pdp-features"><div class="master-feature-card-grid">${featureCopy.map((f,i)=>`<article class="master-feature-card">${photo(L('撮影：商品特徴'+(i+1)+'のディテール','Product feature '+(i+1)+' / close detail'))}<div class="master-feature-card-copy"><h3 class="h3">${f[0]}</h3><p>${f[1]}</p></div></article>`).join('')}</div></section>

      <section class="section compact soft"><div class="eyebrow">${L('商品仕様・お手入れ','SPECIFICATIONS & CARE')}</div><h2 class="display h2">${L('商品仕様','Product Details')}</h2><div class="info-table master-spec-table">${[[L('サイズ','Size'),'—'],[L('重量','Weight'),'—'],[L('材質','Material'),L('ステンレス鋼','Stainless steel')],[L('原産国','Country of Origin'),L('日本','Japan')],[L('食洗機対応','Dishwasher Safe'),'—'],[L('お手入れ','Care'),'—'],[L('使用上の注意','Precautions'),'—']].map(x=>`<div class="info-row"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div></section>

      <section class="section master-pdp-compare" id="compare-tools"><div class="eyebrow">${L('商品を比較する','COMPARE PRODUCTS')}</div><h2 class="display h2">${L('近い用途の商品から選ぶ。','Choose between similar tools.')}</h2><div class="master-compare-grid">${[[0,L('小さな食材・細かな盛り付け','Small foods / precise plating'),L('コンパクトなサイズ','Compact scale')],[5,L('小鉢・食卓','Small dishes / tabletop'),L('卓上用途に合わせた形','Table-focused form')],[2,L('取り分け','Serving'),L('大皿料理にも使いやすいサイズ','Larger serving scale')]].map(x=>`<article class="master-compare-card">${productCard(x[0])}<dl><div><dt>${L('向いている用途','Best for')}</dt><dd>${x[1]}</dd></div><div><dt>${L('主な違い','Main difference')}</dt><dd>${x[2]}</dd></div></dl></article>`).join('')}</div></section>

      <section class="section compact soft master-reviews"><div class="eyebrow">${L('レビュー','REVIEWS')}</div><h2 class="display h2">${L('お客様のレビュー','Customer Reviews')}</h2><div class="review-placeholder"><b>${L('Shopifyの商品レビューコンポーネント','Shopify product review component')}</b></div></section>

      <section class="section master-image-band master-pdp-about"><span class="photo-label">${L('撮影：燕三条の製造・金属加工・仕上げ','Tsubame-Sanjo manufacturing / metalworking / finish')}</span><div class="master-image-band-copy"><div class="eyebrow">${L('AUXについて','ABOUT AUX')}</div><h2 class="display h2">${L('日本の金属加工技術を生かした、精密なつくり。','Made with Japanese precision.')}</h2><p class="lead">${L('AUXの製品は新潟・燕三条で製造されています。培われてきた金属加工の技術を生かし、細かな形状や仕上げまで丁寧につくられています。','AUX products are made in Tsubame-Sanjo, Niigata. Long-established metalworking expertise shapes every detail, from form to finish.')}</p>${button(cta('aux'),'why','black')}</div></section>

      <section class="section compact master-related-products"><h2 class="display h2">${L('関連商品','Related Products')}</h2><div class="product-strip">${[1,2,4,5].map(i=>productCard(i)).join('')}</div></section>`);
  }

  function whyMaster(){
    const ja=lang()==='ja';
    const designCards=ja?[
      ['食材に合った先端','麺、薄い肉、小さな食材など、扱うものに合わせて先端の形が異なります。','撮影：商品ごとの先端形状'],
      ['使う場面に合った長さ・角度','調理中や食卓など、使う場所や姿勢に合わせて長さや角度が異なります。','撮影：長さ・角度・使用姿勢'],
      ['商品ごとに異なる握り心地','商品によってしなり方や開き角度が異なり、握ったときの感覚も変わります。','撮影：手＋商品 / 握り・開き角度']
    ]:[
      ['Tips for the Food','Tip shapes vary for noodles, thin meat, small foods, and more.','Tip shapes / product comparison'],
      ['Length & Angle for the Task','Length and angle vary for cooking, table use, and different working positions.','Length / angle / working position'],
      ['A Different Grip by Product','Flex and opening angle vary by product, changing how each feels in the hand.','Hand + product / grip / opening angle']
    ];
    const nav=[
      {label:'COOK',ja:'調理・加熱・下ごしらえに。',en:'For prep and cooking.',go:'cook'},
      {label:'SERVE',ja:'盛り付け・取り分け・シェアに。',en:'For plating, serving, and sharing.',go:'serve'},
      {label:'TABLE',ja:'食卓で小さな食材を扱う場面に。',en:'For small foods at the table.',go:'table'},
      {label:'IN USE',ja:'使う場面から、合うトングを探す。',en:'Find the right tongs for the task.',go:'inuse'}
    ];
    return pageShell('/pages/why-aux','Why AUX','Content Master v1 FIX',`
      <section class="why-hero master-why-hero"><div class="eyebrow">${L('AUXについて','ABOUT AUX')}</div><h1 class="display h1">${L('新潟・燕三条でつくられる、精密なキッチンツール。','Precision kitchen tools made in Tsubame-Sanjo, Niigata.')}</h1><p class="lead">${L('AUXのトングは、食材や使い方に合わせて細部まで設計し、新潟・燕三条で製造しています。使いやすさにつながる形状と、金属加工技術による精密な仕上がりが特徴です。','AUX tongs are designed in detail around the food and task, then made in Tsubame-Sanjo, Niigata. Their practical shapes and precise finish are made possible by metalworking expertise.')}</p></section>

      <section class="section master-aux-feature master-why-feature"><div class="master-shape-gallery">${photo(L('撮影：麺用の先端形状','Noodle-focused tip'))}${photo(L('撮影：油を切る形状','Draining holes / frying form'))}${photo(L('撮影：小さな食材向けのコンパクト形状','Compact form / small foods'))}</div><div class="master-feature-copy"><div class="eyebrow">${L('AUXの特徴','AUX FEATURES')}</div><h2 class="display h2">${L('食材や使い方に合わせて、形を変える。','Different shapes for different foods and tasks.')}</h2><p class="lead">${L('麺をつかみやすい先端、油を切れる穴、小さな食材を扱いやすいサイズなど、商品ごとに形状が異なります。','Tips shaped for noodles, holes that drain oil, compact sizes for small foods—each product has a different shape for its purpose.')}</p></div></section>

      <section class="section compact master-why-design"><div class="eyebrow">${L('使いやすさにつながる設計','DESIGNED FOR USE')}</div><h2 class="display h2">${L('先端、長さや角度、握り心地。','Tips, length, angle, and grip.')}</h2><div class="master-feature-card-grid">${designCards.map(c=>`<article class="master-feature-card">${photo(c[2])}<div class="master-feature-card-copy"><h3 class="h3">${c[0]}</h3><p>${c[1]}</p></div></article>`).join('')}</div></section>

      <section class="section master-image-band master-why-made"><span class="photo-label">${L('撮影：燕三条の金属加工 / 製造 / 仕上げ','Tsubame-Sanjo metalworking / manufacturing / finish')}</span><div class="master-image-band-copy"><div class="eyebrow">${L('日本での製造','MADE IN JAPAN')}</div><h2 class="display h2">${L('日本の金属加工技術を生かした、精密なつくり。','Made with Japanese precision.')}</h2><p class="lead">${L('AUXの製品は新潟・燕三条で製造されています。培われてきた金属加工の技術を生かし、細かな形状や仕上げまで丁寧につくられています。','AUX products are made in Tsubame-Sanjo, Niigata. Long-established metalworking expertise shapes every detail, from form to finish.')}</p></div></section>

      <section class="section compact master-why-shop"><div class="eyebrow">${L('商品を探す','SHOP AUX')}</div><h2 class="display h2">${L('AUXの商品を見る。','Explore AUX Products.')}</h2><div class="master-category-grid master-four-nav">${nav.map(item=>imageNavCard(item)).join('')}</div></section>`);
  }

  pages.home.render=homeMaster;
  pages.shop.render=shopMaster;
  pages.cook.render=()=>collectionMaster('cook');
  pages.serve.render=()=>collectionMaster('serve');
  pages.table.render=()=>collectionMaster('table');
  pages.inuse.render=inuseMaster;
  pages.pdp.render=pdpMaster;
  pages.why.render=whyMaster;

  function localizeSharedChrome(){
    if(lang()!=='ja') return;
    const navLabels={shop:'商品一覧',cook:'COOK',serve:'SERVE',table:'TABLE',inuse:'使用シーン',why:'AUXについて'};
    Object.entries(navLabels).forEach(([go,text])=>{const el=document.querySelector(`.globalnav [data-go="${go}"]`);if(el) el.textContent=text;});
    document.querySelectorAll('.actions .action-item span').forEach(span=>{if(span.textContent.trim()==='Search') span.textContent='検索';});
    const tagline=document.querySelector('.site-footer .footer-grid>div:first-child p');
    if(tagline) tagline.textContent='日々の調理・盛り付け・取り分け・食卓に使うキッチンツール。';
    const cols=[...document.querySelectorAll('.site-footer .footer-col')];
    if(cols[0]){cols[0].querySelector('b').textContent='商品を探す'; const m={shop:'商品一覧',cook:'COOK',serve:'SERVE',table:'TABLE'}; Object.entries(m).forEach(([go,text])=>{const e=cols[0].querySelector(`[data-go="${go}"]`);if(e)e.textContent=text;});}
    if(cols[1]){cols[1].querySelector('b').textContent='知る'; const a=cols[1].querySelector('[data-go="inuse"]'); const b=cols[1].querySelector('[data-go="why"]'); if(a)a.textContent='使用シーン';if(b)b.textContent='AUXについて';}
    if(cols[2]){cols[2].querySelector('b').textContent='サポート'; const m={faq:'FAQ',shipping:'配送',returns:'返品',contact:'お問い合わせ'}; Object.entries(m).forEach(([go,text])=>{const e=cols[2].querySelector(`[data-go="${go}"]`);if(e)e.textContent=text;});}
  }

  const priorRender=render;
  render=function(id,opts={updateUrl:true}){
    priorRender(id,opts);
    localizeSharedChrome();
    if(!['home','shop','cook','serve','table','inuse','pdp','why'].includes(id)) return;

    // Old media decorator assumes PDP's last section is the pre-footer CTA.
    // Content Master now places Related Products after About AUX, so move the
    // image-overlay role to the actual About AUX section and restore Related Products.
    if(id==='pdp'){
      const related=document.querySelector('.master-related-products');
      if(related){
        related.classList.remove('prefooter-image-cta','centered-prefooter','prefooter-pdp');
        related.querySelector(':scope > .photo-label')?.remove();
      }
      const about=document.querySelector('.master-pdp-about');
      if(about) about.classList.add('prefooter-image-cta','centered-prefooter','master-pdp-about-band');
    }

    // Keep the alternating scene order from the approved In Use design.
    document.querySelectorAll('.inuse-scene.master-reverse').forEach(scene=>{
      const visual=scene.querySelector('.inuse-scene-visual');
      if(visual) visual.style.order='2';
    });
  };

  render(current,{updateUrl:false});
})();
