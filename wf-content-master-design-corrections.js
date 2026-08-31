/* AUX USA / Content Master design corrections
   Keeps approved visual components when Content Master changes copy only.
   Explicit design changes remain opt-in.
*/
(function(){
  function isJA(){
    try{return wireframeLocale==='ja'}catch(_){return new URLSearchParams(location.search).get('lang')==='ja'}
  }
  function t(ja,en){return isJA()?ja:en}

  function ensureCorrectionStyles(){
    if(document.getElementById('content-master-design-corrections-style')) return;
    const style=document.createElement('style');
    style.id='content-master-design-corrections-style';
    style.textContent=`
      .restored-home-hero .action-row{flex-wrap:nowrap!important;gap:8px!important}
      .restored-home-hero .action-row .btn{width:auto!important;min-width:0!important;padding-left:16px!important;padding-right:16px!important;gap:10px!important;white-space:nowrap!important}
      .master-collection-about-aux .balanced-cta-row{gap:16px!important;column-gap:16px!important;row-gap:16px!important;flex-wrap:wrap!important}
      .master-collection-about-aux .balanced-cta-row .btn{flex:0 0 auto!important}
      .restored-pdp-page .pdp-value-grid.restored-primary-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
      .restored-pdp-page .pdp-value-card,.restored-pdp-page .pdp-value-card.main{grid-template-rows:360px auto!important}
      .restored-pdp-page .pdp-proof-layout.equalized{margin-top:40px!important}
      .restored-pdp-page .restored-pdp-specs-extra{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin-top:1px;background:var(--border);border:1px solid var(--border)}
      .restored-pdp-page .restored-pdp-specs-extra>div{background:var(--surface);padding:16px 24px;min-height:72px}
      .restored-pdp-page .restored-pdp-specs-extra b{display:block;font:500 12px/16px var(--sans);letter-spacing:.06em;color:var(--text-muted);margin-bottom:8px}
      .restored-pdp-page .restored-pdp-specs-extra span{font:400 16px/24px var(--sans);color:var(--text)}
      .restored-pdp-page .master-pdp-compare{background:var(--base)}
      .restored-pdp-page .restored-related-products>.h2{margin-bottom:40px!important}
      .restored-pdp-page .pdp-brand-copy .action-row{margin-top:32px}
      @container (max-width:1040px){
        .restored-pdp-page .pdp-value-grid.restored-primary-grid{grid-template-columns:1fr!important}
        .restored-pdp-page .restored-pdp-specs-extra{grid-template-columns:1fr}
      }
    `;
    document.head.appendChild(style);
  }

  function restoreHomeHero(){
    const currentHero=document.querySelector('.master-home-hero');
    if(!currentHero) return;
    const section=document.createElement('section');
    section.className='hero product-hero restored-home-hero';
    section.innerHTML=`<div class="product-hero-stage">
      <div class="product-hero-visual clickable" data-go="pdp"><img class="wf-photo" src="assets/wireframe/small-food-transfer.webp" alt=""><span class="photo-label">${t('撮影：代表商品＋手＋身近な料理の使用シーン','Featured product + hand + familiar food')}</span></div>
      <div class="product-hero-panel">
        <div class="product-hero-top"><div class="eyebrow">TABLE</div><span class="product-hero-index">01 / 03</span></div>
        <h1 class="display h1">${t('商品名','Product Name')}</h1>
        <p class="lead">${t('その商品の主な使用価値を1フレーズで説明する。','One short phrase describing the product’s primary use value.')}</p>
        <div class="row action-row"><a class="btn black" data-go="pdp">${t('商品を見る','View Product')}</a><a class="btn ghost" data-go="inuse" data-target="use-small">${t('使用シーンを見る','Explore In Use')}</a></div>
        <div class="product-hero-bottom"><div class="pager"><span class="on"></span><span></span><span></span></div></div>
      </div>
    </div>`;
    currentHero.replaceWith(section);
  }

  function restoreHomeAuxFeature(){
    const currentSection=document.querySelector('.master-aux-feature:not(.master-why-feature)');
    if(!currentSection) return;
    const section=document.createElement('section');
    section.className='section compact restored-home-aux-feature';
    section.innerHTML=`<div class="home-precision-module">
      <div class="home-precision-copy">
        <div class="eyebrow">${t('AUXの特徴','AUX FEATURES')}</div>
        <h2 class="display h2">${t('食材や使い方に合わせて、形を変える。','Different shapes for different foods and tasks.')}</h2>
        <p class="lead">${t('麺をつかみやすい先端、油を切れる穴、小さな食材を扱いやすいサイズなど、商品ごとに形状が異なります。','Tips shaped for noodles, holes that drain oil, compact sizes for small foods—each product has a different shape for its purpose.')}</p>
        <div class="row action-row"><a class="btn" data-go="why">${t('AUXについて詳しく見る','Learn About AUX')}</a></div>
      </div>
      <div class="home-precision-collage">
        <div class="home-precision-visual main"><img class="wf-photo" src="assets/wireframe/product-tip-macro-dark.webp" alt=""><span class="photo-label">${t('撮影：複数商品の形状差 / 麺用の先端','Shape comparison / noodle-focused tip')}</span></div>
        <div class="home-precision-visual"><img class="wf-photo" src="assets/wireframe/product-tip-tomato-macro.webp" alt=""><span class="photo-label">${t('撮影：複数商品の形状差 / 油を切れる形状','Shape comparison / draining form')}</span></div>
        <div class="home-precision-visual"><img class="wf-photo" src="assets/wireframe/product-pair-minimal.webp" alt=""><span class="photo-label">${t('撮影：複数商品の形状差 / コンパクトサイズ','Shape comparison / compact size')}</span></div>
      </div>
    </div>`;
    currentSection.replaceWith(section);
  }

  function restoreWhyAuxFeature(){
    const currentSection=document.querySelector('.master-why-feature');
    if(!currentSection) return;
    const section=document.createElement('section');
    section.className='section compact restored-why-aux-feature';
    section.innerHTML=`<div class="why-collage">
      <div class="why-art a"><span class="photo-label">${t('撮影：麺用の先端形状','Noodle-focused tip')}</span></div>
      <div class="why-art b"><span class="photo-label">${t('撮影：油を切る形状','Draining holes / frying form')}</span></div>
      <div class="why-art c"><span class="photo-label">${t('撮影：小さな食材向けのコンパクト形状','Compact form / small foods')}</span></div>
      <div class="why-art d"><span class="photo-label">${t('撮影：複数商品の形状差','Shape comparison across AUX tools')}</span></div>
      <div class="why-center">
        <div class="eyebrow">${t('AUXの特徴','AUX FEATURES')}</div>
        <h2 class="display h2">${t('食材や使い方に合わせて、形を変える。','Different shapes for different foods and tasks.')}</h2>
        <p class="lead">${t('麺をつかみやすい先端、油を切れる穴、小さな食材を扱いやすいサイズなど、商品ごとに形状が異なります。','Tips shaped for noodles, holes that drain oil, compact sizes for small foods—each product has a different shape for its purpose.')}</p>
      </div>
    </div>`;
    currentSection.replaceWith(section);
  }

  function fixHomeUseArrows(){
    if(current!=='home') return;
    document.querySelectorAll('.master-home-use .master-card-arrow').forEach(arrow=>{arrow.textContent='→'});
  }

  function shortenInUseJumpCopy(){
    if(current!=='inuse') return;
    const ja=[
      '麺を持ち上げる、食材を返す、揚げ物を取り出す。',
      '料理を皿へ移す、食材の位置を整える、ソースを添える。',
      'サラダやパスタ、大皿料理を食卓で取り分ける。',
      'ピクルスやベリー、オリーブ、ティーバッグなどを扱う。'
    ];
    const en=[
      'Lift noodles, turn food, or remove fried foods.',
      'Move food to the plate, adjust placement, or add sauce.',
      'Serve salads, pasta, and shared dishes at the table.',
      'Pick up pickles, berries, olives, or tea bags.'
    ];
    const copy=isJA()?ja:en;
    document.querySelectorAll('.inuse-explore .use-jump-grid .use-jump > p').forEach((p,i)=>{if(copy[i]) p.textContent=copy[i]});
  }

  function fixTableUSContext(){
    if(current!=='table' || !isJA()) return;
    const heroBody=document.querySelector('.master-collection-hero-copy > .lead');
    if(heroBody) heroBody.textContent='ピクルス、ベリー、オリーブ、ティーバッグなど、大きなトングでは扱いにくいものに。';
    const aboutBody=document.querySelector('.master-collection-about > .lead');
    if(aboutBody) aboutBody.textContent='小さな器や瓶の中でも使いやすい、コンパクトなトングを中心に紹介します。';
    const cards=[...document.querySelectorAll('.master-collection-about .master-use-value-card')];
    const content=[
      ['小さな食材','ピクルス、ベリー、オリーブなどをつまむ。'],
      ['小さな器・瓶','小さな食材を、器や瓶から取り出す。'],
      ['ティー・食卓','ティーバッグや小さな食材を扱う。']
    ];
    cards.forEach((card,i)=>{
      if(!content[i]) return;
      const h=card.querySelector('.h3');
      const p=card.querySelector('p');
      if(h) h.textContent=content[i][0];
      if(p) p.textContent=content[i][1];
    });
  }

  function normalizeCollectionCtas(){
    if(!['cook','serve','table'].includes(current)) return;
    const row=document.querySelector('.master-collection-about-aux .action-row');
    if(row) row.classList.add('balanced-cta-row');
    if(!isJA()) return;
    const buttons=[...document.querySelectorAll('.master-collection-about-aux .action-row .btn')];
    buttons.forEach(btn=>{
      btn.style.width='256px';
      btn.style.minWidth='256px';
      btn.style.maxWidth='256px';
    });
  }

  function initRestoredPdpGallery(){
    const gallery=document.querySelector('.restored-pdp-gallery');
    if(!gallery || gallery.dataset.ready==='true') return;
    const stageShot=gallery.querySelector('.pdp-gallery-stage .pdp-gallery-shot');
    const thumbs=[...gallery.querySelectorAll('.pdp-gallery-thumb')];
    const labels=isJA()?[
      '撮影：商品全体 / 無地背景 / 形が一目で分かる',
      '撮影：使用シーン / 手＋小さな食材',
      '撮影：先端と食材の接点 / マクロ',
      '撮影：手・皿・食卓とのサイズ感'
    ]:[
      'Primary product shot / clean background / full silhouette',
      'Use shot / hand + small food',
      'Macro / tip + food contact point',
      'In scale / hand + plate + table'
    ];
    const select=(index)=>{
      if(!stageShot) return;
      stageShot.className=`pdp-gallery-shot main media-${index}`;
      const label=stageShot.querySelector('.photo-label');
      if(label) label.textContent=labels[index];
      thumbs.forEach((btn,i)=>btn.classList.toggle('active',i===index));
      gallery.dataset.index=String(index);
    };
    thumbs.forEach((btn,i)=>btn.addEventListener('click',()=>select(i)));
    gallery.querySelectorAll('.pdp-gallery-nav').forEach(btn=>btn.addEventListener('click',()=>{
      const currentIndex=Number(gallery.dataset.index||0);
      const delta=btn.classList.contains('prev')?-1:1;
      select((currentIndex+delta+thumbs.length)%thumbs.length);
    }));
    select(0);
    gallery.dataset.ready='true';
  }

  function restorePdpDesign(){
    if(current!=='pdp') return;
    const page=document.querySelector('.page.master-page');
    if(!page || page.dataset.restoredPdp==='true') return;
    const compare=document.querySelector('.master-pdp-compare');
    const compareHTML=compare?compare.outerHTML:'';
    const ja=isJA();
    const featureCopy=ja?[
      ['細かな食材を扱いやすい先端','小さな食材をつまむ場面で、食材に触れる位置を見ながら扱いやすい形状。','撮影：先端と小さな食材の接点'],
      ['小さな動作に合わせた形','細かな盛り付けや卓上の作業で扱いやすい、コンパクトな全体形状。','撮影：手に持ったときの全体形状'],
      ['食卓で使いやすいサイズ','小皿や食卓まわりでも大きすぎないサイズ感。','撮影：手・小皿・食卓とのサイズ感']
    ]:[
      ['Fine contact for small foods','A finer contact area makes it easier to work around small ingredients.','Tip + small-food contact'],
      ['A form for smaller movements','A compact overall shape suited to precise plating and tabletop tasks.','Overall form in hand'],
      ['A scale that fits the table','Sized to feel natural around small dishes and finished food.','Hand + small dish + table scale']
    ];
    const primaryCards=ja?[
      ['小さな食材','小さな食材をつまむ。','撮影：小さな食材をつまむ使用シーン'],
      ['盛り付け','細かな位置を調整しながら盛り付ける。','撮影：盛り付け / 完成皿＋手'],
      ['食卓','小皿や食卓で取り分ける。','撮影：食卓 / 小皿＋手']
    ]:[
      ['Small Foods','Pick up smaller foods with more control.','Small-food use scene'],
      ['Plating','Make small placement adjustments on the plate.','Plating / finished dish + hand'],
      ['At the Table','Serve from smaller dishes at the table.','Tabletop / small dish + hand']
    ];
    page.classList.add('restored-pdp-page');
    page.dataset.restoredPdp='true';
    page.innerHTML=`
      <div class="pdp-top-ux restored-pdp-top">
        <div class="pdp-gallery-ux restored-pdp-gallery">
          <div class="pdp-gallery-stage">
            <div class="pdp-gallery-shot main media-0"><span class="photo-label">${t('撮影：商品全体 / 無地背景 / 形が一目で分かる','Primary product shot / clean background / full silhouette')}</span></div>
            <button type="button" class="pdp-gallery-nav prev" aria-label="Previous product image">←</button>
            <button type="button" class="pdp-gallery-nav next" aria-label="Next product image">→</button>
          </div>
          <div class="pdp-gallery-thumbs">${[0,1,2,3].map(i=>`<button type="button" class="pdp-gallery-thumb media-${i}${i===0?' active':''}" aria-label="View product image ${i+1}"><span class="pdp-gallery-thumb-index">0${i+1}</span></button>`).join('')}</div>
        </div>
        <div class="buybox">
          <div class="eyebrow">TABLE</div>
          <h1 class="display h2">${t('指先トング','Fingertip Tongs')}</h1>
          <a class="review-jump" href="#reviews">★★★★★ <span>${t('レビュー','Reviews')}</span></a>
          <div class="price-big">$—</div>
          <p class="lead">${t('小さな食材や細かな盛り付けに使いやすい、コンパクトなトング。','Light, precise tongs for small foods, plating, and everyday tabletop use.')}</p>
          <div class="divider"></div>
          <div class="tiny">${t('数量','Quantity')}</div>
          <div class="qty"><span>−</span><span>1</span><span>＋</span></div>
          <button class="add">${t('カートに追加','ADD TO CART')}</button>
          <div class="purchase-assurance">
            <button data-go="shipping"><b>${t('配送','Shipping')}</b><span>${t('配送日数・送料','Delivery timing & costs')} →</span></button>
            <button data-go="returns"><b>${t('返品','Returns')}</b><span>${t('返品ポリシー','Return policy')} →</span></button>
            <div><b>${t('関税・税金','Duties & taxes')}</b><span>${t('購入前に最終条件を表示','Final terms shown before purchase')}</span></div>
          </div>
          <a class="compare-jump" href="#compare-tools">${t('近い用途の商品と比較する ↓','Compare similar AUX tools ↓')}</a>
          <div class="divider"></div>
          <div class="tiny">${t('ステンレス鋼 / 日本製 / お手入れ詳細 +','Stainless steel / Made in Japan / Care details +')}</div>
        </div>
      </div>

      <section class="section restored-pdp-primary-use">
        <div class="pdp-value-head"><div class="eyebrow">${t('主な使用価値','PRIMARY USE')}</div><h2 class="display h2">${t('小さな食材を、狙った位置で扱いやすく。','More control for small foods and precise placement.')}</h2><p class="lead">${t('小さな食材をつまむ、盛り付ける、食卓で取り分けるなど、細かな作業に使いやすいサイズと形状です。','A compact shape for picking up small foods, precise plating, and lighter tabletop serving tasks.')}</p></div>
        <div class="pdp-value-grid restored-primary-grid">${primaryCards.map((c,i)=>`<article class="pdp-value-card${i===0?' main':''}"><div class="pdp-value-visual"><span class="photo-label">${c[2]}</span></div><div class="pdp-value-copy"><h3 class="h3">${c[0]}</h3><p>${c[1]}</p></div></article>`).join('')}</div>
      </section>

      <section class="section soft restored-pdp-features"><div class="pdp-proof-head"><div class="eyebrow">${t('商品の特徴','PRODUCT FEATURES')}</div><h2 class="display h2">${t('形とサイズを、細かな作業に合わせる。','Shape and scale designed for smaller tasks.')}</h2></div><div class="pdp-proof-layout equalized">${featureCopy.map((f,i)=>`<article class="pdp-proof-equal-card"><div class="pdp-proof-equal-visual"><span class="photo-label">${f[2]}</span></div><div class="pdp-proof-equal-copy"><div class="eyebrow">0${i+1}</div><h3 class="h3">${f[0]}</h3><p>${f[1]}</p></div></article>`).join('')}</div></section>

      <section class="section compact cool restored-pdp-specs"><div class="eyebrow">${t('商品仕様・お手入れ','SPECIFICATIONS & CARE')}</div><h2 class="display h2">${t('商品仕様','Product Details')}</h2><div class="specs"><div class="spec"><b>${t('サイズ','Size')}</b><small>—</small></div><div class="spec"><b>${t('重量','Weight')}</b><small>—</small></div><div class="spec"><b>${t('材質','Material')}</b><small>${t('ステンレス鋼','Stainless steel')}</small></div><div class="spec"><b>${t('原産国','Country of Origin')}</b><small>${t('日本','Japan')}</small></div></div><div class="restored-pdp-specs-extra"><div><b>${t('食洗機対応','Dishwasher Safe')}</b><span>—</span></div><div><b>${t('お手入れ','Care')}</b><span>—</span></div><div><b>${t('使用上の注意','Precautions')}</b><span>—</span></div></div></section>

      ${compareHTML}

      <section class="section soft" id="reviews"><div class="eyebrow">${t('レビュー','REVIEWS')}</div><h2 class="display h2">${t('お客様のレビュー','Customer Reviews')}</h2><div class="review-shell"><div class="review-overview"><div class="review-placeholder-score">— / 5</div><div class="stars-line">★★★★★</div><p>${t('レビューが入ると、評価サマリーと分布をここに表示します。','Rating summary and distribution appear here when review data is available.')}</p><a class="btn">${t('レビューを書く','Write a review')}</a></div><div class="review-placeholder-list"><article class="review-placeholder"><div class="meta">★★★★★<br>${t('[購入者]','[Verified buyer]')}<br>${t('[日付]','[Date]')}</div><div><b>${t('[レビュータイトル]','[Review title]')}</b><p>${t('[レビュー本文]','[Customer review text]')}</p></div></article><article class="review-placeholder"><div class="meta">★★★★★<br>${t('[購入者]','[Verified buyer]')}<br>${t('[日付]','[Date]')}</div><div><b>${t('[レビュータイトル]','[Review title]')}</b><p>${t('[レビュー本文]','[Customer review text]')}</p></div></article></div></div></section>

      <section class="section dark restored-pdp-about"><div class="pdp-brand-trust"><div class="pdp-brand-visual"><span class="photo-label">${t('撮影：燕三条の製造・金属加工・仕上げ','Tsubame-Sanjo manufacturing / metalworking / finish')}</span></div><div class="pdp-brand-copy"><div class="eyebrow">${t('AUXについて','ABOUT AUX')}</div><h2 class="display h2">${t('日本の金属加工技術を生かした、精密なつくり。','Made with Japanese precision.')}</h2><p class="lead">${t('AUXの製品は新潟・燕三条で製造されています。培われてきた金属加工の技術を生かし、細かな形状や仕上げまで丁寧につくられています。','AUX products are made in Tsubame-Sanjo, Niigata. Long-established metalworking expertise shapes every detail, from form to finish.')}</p><div class="row action-row"><a class="btn" data-go="why">${t('AUXについて詳しく見る','Learn About AUX')}</a></div></div></div></section>

      <section class="section compact restored-related-products"><h2 class="display h2">${t('関連商品','Related Products')}</h2><div class="product-strip">${[1,2,4,5].map(i=>productCard(i)).join('')}</div></section>
    `;
    initRestoredPdpGallery();
  }

  function applyCorrections(){
    ensureCorrectionStyles();
    if(current==='home'){
      restoreHomeHero();
      restoreHomeAuxFeature();
      fixHomeUseArrows();
    }
    if(current==='why') restoreWhyAuxFeature();
    shortenInUseJumpCopy();
    fixTableUSContext();
    normalizeCollectionCtas();
    restorePdpDesign();
  }

  const previousRender=render;
  render=function(id,opts={updateUrl:true}){
    previousRender(id,opts);
    applyCorrections();
  };
  applyCorrections();
})();
