function englishPhotoLabels(){
  document.querySelectorAll('.photo-label,.use-photo-label').forEach(el=>{
    const t=(el.textContent||'').trim();
    if(!t) return;
    const exact={
      'FVカルーセル：代表商品の使用シーン':'Featured product in use / hero image',
      '撮影予定：調理中の使用シーン':'Cooking in use',
      '盛り付け':'Plating close-up',
      '取り分け・食卓':'Serving / tabletop',
      '小さい食材・お茶':'Small foods / tea',
      'カテゴリ代表の利用シーン':'Category lifestyle / use scene',
      '商品＋利用シーン':'Product + in-use hero',
      '寄り / grip':'Close detail / grip',
      '料理の完成シーン':'Finished dish / context',
      '使用シーン':'In-use scene',
      '先端ディテール':'Tip detail / contact point',
      '手元・操作':'Hand / control',
      '食卓・完成料理':'Tabletop / finished food'
    };
    if(exact[t]){el.textContent=exact[t];return;}
    if(t.includes('先端')){el.textContent='Macro detail: tip / contact point';return;}
    if(t.includes('バネ')){el.textContent='Macro detail: spring / body';return;}
    if(t.includes('金属')||t.includes('素材')||t.includes('仕上げ')){el.textContent='Material / engineering detail';return;}
    if(t.includes('燕三条')||t.includes('製造')){el.textContent='Manufacturing / metalworking detail';return;}
    if(t.includes('盛り付け')){el.textContent='Plating / finishing movement';return;}
    if(t.includes('取り分け')){el.textContent='Serving / shared table';return;}
    if(t.includes('食卓')||t.includes('お茶')||t.includes('小さい食材')||t.includes('小菓子')){el.textContent='Tabletop use / small foods';return;}
    if(t.includes('調理')||t.includes('鍋')||t.includes('フライパン')||t.includes('麺')){el.textContent='Cooking use / close to heat';return;}
    if(/[ぁ-んァ-ン一-龯]/.test(t)) el.textContent='Planned photography / content-specific scene';
  });
}

function homeEN(){return `${chrome('/','Home','Visual wireframe: product discovery first, brand depth optional')}
<div class="page">
<section class="hero product-hero"><div class="product-hero-stage"><div class="product-hero-visual clickable" data-go="pdp"><span class="photo-label">Featured product in use / hero image</span></div><div class="product-hero-panel"><div class="product-hero-top"><div class="eyebrow">Featured tool / TABLE</div><span class="product-hero-index">01 / 03</span></div><h1 class="display h1">Fingertip Tongs</h1><p class="lead">Precise control for small foods, plating and everyday tabletop use.</p><div class="row" style="margin-top:26px"><a class="btn black" data-go="pdp">View Product</a><a class="btn ghost" data-go="inuse" data-target="use-small">See in use</a></div><div class="product-hero-bottom"><span>TABLE / Featured product</span><div class="pager"><span class="on"></span><span></span><span></span></div></div></div></div></section>
<section class="section compact"><div class="brand-intro"><div class="eyebrow">The AUX difference</div><h2 class="display h2">Made with Japanese precision.</h2><p class="lead">Thin tips, controlled spring and task-specific shapes give you more control in the small movements of cooking, serving and the table.</p><div class="row" style="justify-content:center;margin-top:24px"><a class="btn" data-go="why">Why AUX</a></div></div></section>
<section class="section"><div class="eyebrow">Featured tools</div><div class="row" style="justify-content:space-between"><div><h2 class="display h2">Tools worth reaching for.</h2></div><div class="row"><span class="arrow">←</span><span class="arrow">→</span></div></div><div class="product-strip">${[0,1,2,3].map(i=>productCard(i)).join('')}</div><div class="slider-foot"><a class="btn" data-go="shop">Shop All</a><div class="pager"><span class="on"></span><span></span><span></span></div></div></section>
<section class="section"><div class="eyebrow">Shop by category</div><h2 class="display h2">COOK, SERVE, TABLE.</h2><div class="cat-grid"><div class="cat clickable" data-go="cook"><div><div class="eyebrow">01</div><h3 class="h3">COOK</h3><p>For preparation, pans, noodles and frying.</p></div></div><div class="cat clickable" data-go="serve"><div><div class="eyebrow">02</div><h3 class="h3">SERVE</h3><p>For plating, portioning and sharing.</p></div></div><div class="cat clickable" data-go="table"><div><div class="eyebrow">03</div><h3 class="h3">TABLE</h3><p>For tabletop, tea and small foods.</p></div></div></div></section>
<section class="section soft"><div class="row" style="justify-content:space-between;align-items:end"><div><div class="eyebrow">In use</div><h2 class="display h2">See what AUX can do.</h2><p class="lead">Start with a familiar moment in the kitchen or at the table, then discover the tool designed around it.</p></div><a class="btn" data-go="inuse">Explore all In Use</a></div><div class="home-use-layout"><article class="home-use-feature clickable" data-go="inuse" data-target="use-cooking"><div class="home-use-visual"><span class="photo-label">Cooking in use</span></div><div class="home-use-copy"><div><div class="eyebrow">Cooking</div><h3 class="h3">Move food with more control.</h3><p class="lead">Lift, turn and reach near the pan without relying on an oversized pair of tongs.</p></div><span class="use-link">Explore cooking <span class="arr">→</span></span></div></article><div class="home-use-list"><article class="home-use-row clickable" data-go="inuse" data-target="use-plating"><div class="home-use-thumb"><span class="photo-label">Plating close-up</span></div><div class="home-use-row-copy"><div class="eyebrow">Plating</div><h3 class="h3">Place it exactly.</h3><p>Fine movements for finishing a plate.</p><span class="use-link">See this use <span class="arr">→</span></span></div></article><article class="home-use-row clickable" data-go="inuse" data-target="use-serving"><div class="home-use-thumb"><span class="photo-label">Serving / tabletop</span></div><div class="home-use-row-copy"><div class="eyebrow">Serving</div><h3 class="h3">Serve without overhandling.</h3><p>Portion, share and move between dishes.</p><span class="use-link">See this use <span class="arr">→</span></span></div></article><article class="home-use-row clickable" data-go="inuse" data-target="use-small"><div class="home-use-thumb"><span class="photo-label">Small foods / tea</span></div><div class="home-use-row-copy"><div class="eyebrow">Small tasks</div><h3 class="h3">When big tongs are too much.</h3><p>Tea, garnishes and small tabletop foods.</p><span class="use-link">See this use <span class="arr">→</span></span></div></article></div></div></section>
<section class="section dark"><div class="split"><div>${pic('metal','Product detail / engineering')}</div><div><div class="eyebrow">Why AUX</div><h2 class="display h2">Precision you can feel in your hand.</h2><p class="lead">Thin tips, controlled spring, balanced force and exact contact. Each detail is designed to make handling food feel more natural.</p><div class="proof-grid"><div class="proof"><b>Thin tips</b><p>Reach the exact point you intend.</p></div><div class="proof"><b>Balanced spring</b><p>Control without unnecessary force.</p></div><div class="proof"><b>Made to last</b><p>Durable stainless construction.</p></div></div><div class="row" style="margin-top:26px"><a class="btn" data-go="why">Discover Why AUX</a></div></div></div></section>
</div>${footer()}`}

const collectionENData={
  COOK:{
    tagline:'Control heat, movement and timing.',
    sub:'Purpose-built tongs for pans, noodles, frying and everyday prep.',
    valueTitle:'More control where cooking gets precise.',
    valueLead:'AUX COOK tools are shaped around the movement—not a one-size-fits-all tong.',
    scenes:[['Near the pan','Turn, lift and reposition food with a smaller, more controlled movement.'],['Noodles & long foods','Grip and lift cleanly with shapes designed around the food.'],['Frying & finishing','Move from hot oil or pan to plating with control.']],
    featured:[3,1],
    precisionTitle:'Designed around the movement.',
    precisionLead:'Tip shape, spring and proportion are tuned to the task so control comes from the tool—not extra force.'
  },
  SERVE:{
    tagline:'Plate and share with precision.',
    sub:'For plating, portioning, salads and shared dishes.',
    valueTitle:'Serve the portion, not the whole plate.',
    valueLead:'AUX SERVE tools keep the gesture light while giving you control over placement and portion size.',
    scenes:[['Plating','Place finished food with cleaner, more deliberate movement.'],['Portioning','Grip, lift and portion without overhandling the food.'],['Shared dishes','Use a scale that feels natural around the table and serving ware.']],
    featured:[2,4],
    precisionTitle:'Control comes from the details.',
    precisionLead:'Contact point, body shape and spring response work together to make serving feel more exact.'
  },
  TABLE:{
    tagline:'A smaller scale for the table.',
    sub:'For tea, small foods, side dishes and everyday tabletop use.',
    valueTitle:'When a full-size tong is too much.',
    valueLead:'TABLE explores a more compact way to handle small foods and tabletop moments with precision.',
    scenes:[['Small bites','Cheese, olives, pickles and other foods that need a smaller point of contact.'],['Tea & garnishes','Handle light, small items without bringing an oversized tool to the task.'],['Personal-scale use','A compact tong can sit naturally beside the plate for small foods and shared moments.']],
    featured:[0,5],
    precisionTitle:'Precision scaled down for the table.',
    precisionLead:'Compact proportions and fine contact make TABLE a different tool category—not simply a smaller serving tong.'
  }
};

function collectionEN(name){const d=collectionENData[name];return `${chrome('/collections/'+name.toLowerCase(),name,'Visual wireframe: category value + product discovery + engineering proof')}
<div class="page">
<div class="collection-hero"><div class="collection-copy"><div class="eyebrow">Collection</div><h1 class="display h1" style="font-size:55px">${name}</h1><p class="lead">${d.tagline}</p><p class="tiny">${d.sub}</p></div><div class="collection-visual"><span class="photo-label">${name} / category lifestyle image</span></div></div>
<section class="section compact"><div class="eyebrow">Why ${name.toLowerCase()}</div><h2 class="display h2">${d.valueTitle}</h2><p class="lead">${d.valueLead}</p>${name==='TABLE'?'<div class="tiny" style="margin-top:14px">Concept to explore: The Third Utensil / personal-scale tabletop use</div>':''}<div class="collection-benefits" style="margin-top:30px">${d.scenes.map((s,i)=>`<div class="collection-benefit"><b>0${i+1}</b><h3 class="h3" style="font-size:20px;margin:8px 0">${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div></section>
<section class="section compact"><div class="eyebrow">Featured tools</div><h2 class="display h2">Start here.</h2><div class="product-strip featured-two">${d.featured.map(i=>productCard(i)).join('')}</div><div class="filterbar"><div>ALL ${name} TOOLS　<span class="tiny">FILTER: SIZE / TASK / SHAPE</span></div><div>SORT　Featured ▾</div></div><div class="grid-products">${Array.from({length:6},(_,i)=>productCard((i+2)%products.length)).join('')}</div></section>
<section class="section soft"><div class="split"><div>${pic('metal',name+' / engineering detail')}</div><div><div class="eyebrow">Precision behind the category</div><h2 class="display h2">${d.precisionTitle}</h2><p class="lead">${d.precisionLead}</p><div class="row" style="margin-top:24px"><a class="btn black" data-go="why">Why AUX</a><a class="btn" data-go="inuse">See in use</a></div></div></div></section>
</div>${footer()}`}

pages.home.render=homeEN;
pages.cook.render=()=>collectionEN('COOK');
pages.serve.render=()=>collectionEN('SERVE');
pages.table.render=()=>collectionEN('TABLE');

const baseRenderEN=render;
render=function(id,opts={updateUrl:true}){
  baseRenderEN(id,opts);
  document.querySelectorAll('.ja-note').forEach(el=>el.remove());
  englishPhotoLabels();
};

document.getElementById('metaToggle').onclick=function(){app.classList.toggle('show-meta');this.classList.toggle('active');this.textContent=app.classList.contains('show-meta')?'Hide working notes':'Show working notes'};
function setEnglishToolbar(){
  const side=document.getElementById('sideToggle');
  if(side) side.textContent=layout.classList.contains('side-collapsed')?'Show navigation':'Hide navigation';
}
const baseToggleSideEN=toggleSide;
toggleSide=function(){baseToggleSideEN();setEnglishToolbar();};
setEnglishToolbar();
render(current,{updateUrl:false});
