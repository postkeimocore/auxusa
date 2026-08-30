/* AUX USA / In Use Redesign v1.0
   Rebuilds In Use around situation-led discovery and repeated related-product modules.
   Copy source: user-approved Japanese structure; Working English is layout copy only.
*/
(function(){
  const sceneData={
    en:[
      {
        id:'use-cooking',number:'01',label:'COOKING',
        title:'Use the tong that fits the food and the way you cook.',
        body:'Lift noodles, turn meat and vegetables, or take fried food out of the oil. Even when the action is simply “gripping,” the shape that feels easiest to use changes with the food and the cooking method.',
        image:'Cooking scene: pan / noodles / meat or vegetables / hand + AUX',
        collection:'cook',cta:'View COOK',
        products:[
          ['Sturdy Noodle Tongs','Made to grip and lift noodles.'],
          ['Frying Tongs','Grip fried food while letting excess oil drain.'],
          ['Rest-Easy Yakiniku Tongs','Made to pick up thin slices of meat.']
        ]
      },
      {
        id:'use-plating',number:'02',label:'PLATING',
        title:'Adjust not only what you pick up, but exactly where it lands.',
        body:'Move pasta or salad onto a plate, refine the position of ingredients, or add sauce together with the food. In plating, control over where the food lands matters as much as the grip itself.',
        image:'Plating scene: finished plate / hand + AUX / precise placement',
        collection:'serve',cta:'View SERVE',
        products:[
          ['Plating Tongs','Made for fine adjustments in placement.'],
          ['Sauce-Scooping Sturdy Tongs','Plate food together with sauce.'],
          ['Fingertip Server Tongs','Easy to use for salad and pasta.']
        ]
      },
      {
        id:'use-serving',number:'03',label:'SERVING',
        title:'Serve with a tong that fits the food and the dish.',
        body:'Portion salad, pasta and shared dishes at the table. Choose a tong that feels natural for the size of the dish and the food you want to pick up.',
        image:'Serving scene: shared dishes / table / hand + AUX',
        collection:'serve',cta:'View SERVE',
        products:[
          ['Fingertip Server Tongs','Made for serving from larger shared dishes.'],
          ['Portioning Tongs','Pick up small pieces and thin foods more easily.'],
          ['Sauce-Scooping Sturdy Tongs','Serve larger foods together with sauce.']
        ]
      },
      {
        id:'use-small',number:'04',label:'SMALL FOODS',
        title:'Pick up small things that full-size tongs make awkward.',
        body:'Pickles, berries, garnishes and tea bags call for a different scale. These compact tongs are easier to use inside small bowls and jars and around smaller foods.',
        image:'Small foods scene: pickles / berries / garnish / tea / small vessel',
        collection:'table',cta:'View TABLE',
        products:[
          ['Rice Accompaniment Tongs','Compact enough for small bowls and jars.'],
          ['Mini Fingertip Tongs','Pick up small things like an extension of your fingers.'],
          ['Portioning Tongs','Made to pick up smaller ingredients.']
        ]
      }
    ],
    ja:[
      {
        id:'use-cooking',number:'01',label:'COOKING',
        title:'食材と調理方法に合ったトングを使う。',
        body:'麺を持ち上げる、肉や野菜を返す、揚げ物を取り出す。同じ「つかむ」作業でも、食材や調理方法によって使いやすい形は異なります。',
        image:'撮影：調理シーン / フライパン・麺・肉や野菜・手＋AUX',
        collection:'cook',cta:'COOKを見る',
        products:[
          ['しっかりめんトング','麺をつかんで持ち上げやすい'],
          ['あげものトング','つかみながら油を切れる'],
          ['おきラク焼き肉トング','薄い肉をつかみやすい']
        ]
      },
      {
        id:'use-plating',number:'02',label:'PLATING',
        title:'料理を置く位置まで調整しやすく。',
        body:'パスタやサラダを皿へ移す、食材の位置を整える、料理と一緒にソースを添える。盛り付けでは、つかむだけでなく、料理を置く位置まで調整できることが重要です。',
        image:'撮影：盛り付け / 完成皿・手＋AUX・細かな位置調整',
        collection:'serve',cta:'SERVEを見る',
        products:[
          ['もりつけトング','細かな位置を調整しやすい'],
          ['ソースもすくえるガッシリトング','食材とソースを一緒に盛り付けられる'],
          ['ゆびさきサーバートング','サラダやパスタを盛り付けやすい']
        ]
      },
      {
        id:'use-serving',number:'03',label:'SERVING',
        title:'料理や器に合ったトングで取り分ける。',
        body:'サラダやパスタ、大皿料理を食卓で取り分ける。料理の大きさや、つかみたい食材に合わせて使いやすいトングを選べます。',
        image:'撮影：取り分け / 大皿料理・食卓・手＋AUX',
        collection:'serve',cta:'SERVEを見る',
        products:[
          ['ゆびさきサーバートング','大皿料理を取り分けやすい'],
          ['トリワケトング','小さなものや薄い食材もつまみやすい'],
          ['ソースもすくえるガッシリトング','大きな食材をソースごと取り分けられる']
        ]
      },
      {
        id:'use-small',number:'04',label:'SMALL FOODS',
        title:'大きなトングでは扱いにくいものを、つまんで取り出す。',
        body:'ピクルスやベリー、薬味、ティーバッグなど、小さなものを扱う場面。小さな器や瓶の中でも使いやすい、コンパクトなトングを紹介します。',
        image:'撮影：小さな食材 / ピクルス・ベリー・薬味・お茶・小さな器',
        collection:'table',cta:'TABLEを見る',
        products:[
          ['ごはんのおともトング','小鉢や瓶の中でも使いやすい'],
          ['ミニゆびさきトング','小さなものを指の代わりにつかめる'],
          ['トリワケトング','小さな食材をつまみやすい']
        ]
      }
    ]
  };

  const intro={
    en:{
      heroLabel:'In use',
      heroTitle:'Start with the situation, then find the tool.',
      heroBody:'Cooking, plating, serving and small foods each ask for a different kind of control. Explore AUX by the moment you want to make easier.',
      exploreLabel:'Explore by situation',
      exploreTitle:'Four situations. Four ways to choose the right tong.',
      jumps:[
        ['01','COOKING','Cook with the shape that fits the food.','Cooking / pan / noodles / meat or vegetables'],
        ['02','PLATING','Control where the food lands.','Plating / finished dish / precise placement'],
        ['03','SERVING','Match the tong to the food and serving dish.','Serving / shared table / large plate'],
        ['04','SMALL FOODS','Use a smaller tool for smaller foods.','Small foods / jar / bowl / tea']
      ],
      closeLabel:'Explore the tools',
      closeTitle:'Find the tong that fits the situation.',
      closeBody:'Move from a familiar use case into the product or collection designed around it.',
      shop:'Shop All',why:'Why AUX'
    },
    ja:{
      heroLabel:'使用シーン',
      heroTitle:'使う場面から、合うトングを探す。',
      heroBody:'調理、盛り付け、取り分け、小さな食材。それぞれの場面で必要な使いやすさからAUXの商品を探せます。',
      exploreLabel:'使う場面から探す',
      exploreTitle:'4つの場面から、使いやすいトングを選ぶ。',
      jumps:[
        ['01','調理する','食材と調理方法に合った形を選ぶ。','撮影：調理 / フライパン・麺・肉や野菜'],
        ['02','盛り付ける','料理を置く位置まで調整しやすく。','撮影：盛り付け / 完成皿・細かな位置調整'],
        ['03','取り分ける','料理や器に合ったトングで取り分ける。','撮影：取り分け / 大皿料理・食卓'],
        ['04','小さな食材を扱う','大きなトングでは扱いにくいものに。','撮影：小さな食材 / 瓶・小鉢・お茶']
      ],
      closeLabel:'商品を見る',
      closeTitle:'使う場面に合ったトングを探す。',
      closeBody:'使用シーンから、商品やCOOK・SERVE・TABLEの各カテゴリへ進めます。',
      shop:'商品一覧を見る',why:'AUXについて'
    }
  };

  function activeLocale(){
    const query=new URLSearchParams(location.search).get('lang');
    if(query==='ja'||query==='en') return query;
    try{ return typeof wireframeLocale!=='undefined' ? wireframeLocale : 'ja'; }catch(_){ return 'ja'; }
  }

  function relatedProductCard(product){
    return `<article class="inuse-related-card clickable" data-go="pdp"><div class="inuse-related-img"></div><div class="inuse-related-title">${product[0]}</div><p>${product[1]}</p></article>`;
  }

  function sceneSection(scene){
    return `<section class="inuse-scene" id="${scene.id}">
      <div class="inuse-scene-visual"><span class="photo-label">${scene.image}</span></div>
      <div class="inuse-scene-copy">
        <div class="eyebrow">${scene.label}</div>
        <h2 class="display h2">${scene.title}</h2>
        <p class="lead">${scene.body}</p>
        <div class="inuse-related-grid">${scene.products.map(relatedProductCard).join('')}</div>
        <div class="inuse-scene-cta"><a class="btn" data-go="${scene.collection}">${scene.cta}</a></div>
      </div>
    </section>`;
  }

  function inUseRedesign(){
    const locale=activeLocale();
    const copy=intro[locale];
    const scenes=sceneData[locale];
    return `${chrome('/pages/in-use','In Use','Visual wireframe: situation → related tools → collection')}
      <div class="page">
        <section class="why-hero"><div class="eyebrow">${copy.heroLabel}</div><h1 class="display h1">${copy.heroTitle}</h1><p class="lead">${copy.heroBody}</p></section>
        <section class="section compact inuse-explore"><div class="eyebrow">${copy.exploreLabel}</div><h2 class="display h2">${copy.exploreTitle}</h2><div class="use-jump-grid">${copy.jumps.map((item,i)=>`<div class="use-jump clickable" data-anchor="${scenes[i].id}"><span class="use-photo-label">${item[3]}</span><div class="eyebrow">${item[0]}</div><h3 class="h3">${item[1]}</h3><p>${item[2]}</p></div>`).join('')}</div></section>
        ${scenes.map(sceneSection).join('')}
        <section class="section cool"><div class="brand-intro"><div class="eyebrow">${copy.closeLabel}</div><h2 class="display h2">${copy.closeTitle}</h2><p class="lead">${copy.closeBody}</p><div class="row action-row" style="justify-content:center"><a class="btn black" data-go="shop">${copy.shop}</a><a class="btn" data-go="why">${copy.why}</a></div></div></section>
      </div>${footer()}`;
  }

  pages.inuse.render=inUseRedesign;
  if(current==='inuse') render(current,{updateUrl:false});
})();
