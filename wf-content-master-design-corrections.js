/* AUX USA / Content Master design corrections
   Keeps the approved visual components when Content Master changes copy only.
   Also applies the explicit copy corrections requested after Content v1 FIX.
*/
(function(){
  function isJA(){
    try{return wireframeLocale==='ja'}catch(_){return new URLSearchParams(location.search).get('lang')==='ja'}
  }
  function t(ja,en){return isJA()?ja:en}

  function restoreHomeHero(){
    const currentHero=document.querySelector('.master-home-hero');
    if(!currentHero) return;
    const section=document.createElement('section');
    section.className='hero product-hero restored-home-hero';
    section.innerHTML=`<div class="product-hero-stage">
      <div class="product-hero-visual clickable" data-go="pdp"><span class="photo-label">${t('撮影：代表商品＋手＋身近な料理の使用シーン','Featured product + hand + familiar food')}</span></div>
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
    const currentSection=document.querySelector('.master-home-about')?.previousElementSibling?.classList.contains('master-home-use')
      ? document.querySelector('.master-aux-feature')
      : document.querySelector('.master-aux-feature:not(.master-why-feature)');
    if(!currentSection || currentSection.classList.contains('master-why-feature')) return;
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
        <div class="home-precision-visual main"><span class="photo-label">${t('撮影：複数商品の形状差 / 麺用の先端','Shape comparison / noodle-focused tip')}</span></div>
        <div class="home-precision-visual"><span class="photo-label">${t('撮影：複数商品の形状差 / 油を切れる形状','Shape comparison / draining form')}</span></div>
        <div class="home-precision-visual"><span class="photo-label">${t('撮影：複数商品の形状差 / コンパクトサイズ','Shape comparison / compact size')}</span></div>
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
    if(!isJA() || !['cook','serve','table'].includes(current)) return;
    const buttons=[...document.querySelectorAll('.master-collection-about-aux .action-row .btn')];
    buttons.forEach(btn=>{
      btn.style.width='240px';
      btn.style.minWidth='240px';
      btn.style.maxWidth='240px';
    });
  }

  function applyCorrections(){
    if(current==='home'){
      restoreHomeHero();
      restoreHomeAuxFeature();
      fixHomeUseArrows();
    }
    if(current==='why') restoreWhyAuxFeature();
    shortenInUseJumpCopy();
    fixTableUSContext();
    normalizeCollectionCtas();
  }

  const previousRender=render;
  render=function(id,opts={updateUrl:true}){
    previousRender(id,opts);
    applyCorrections();
  };
  applyCorrections();
})();
