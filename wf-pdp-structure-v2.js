/* AUX USA / PDP structure alignment v3
   - Product Features contains primary use value + 2–4 product features.
   - Product Details lives inside the hero buybox below Compare similar tools.
   - About AUX remains an image-backed editorial band.
*/
(function(){
  function isJA(){
    try{return wireframeLocale==='ja'}catch(_){return new URLSearchParams(location.search).get('lang')==='ja'}
  }
  function t(ja,en){return isJA()?ja:en}

  function mergePrimaryUseAndFeatures(){
    if(current!=='pdp') return;
    const primary=document.querySelector('.restored-pdp-primary-use');
    const features=document.querySelector('.restored-pdp-features');
    if(!primary || !features || document.querySelector('.restored-pdp-product-features')) return;

    const featureCards=[...features.querySelectorAll('.pdp-proof-equal-card')].map(card=>card.outerHTML).join('');
    const section=document.createElement('section');
    section.className='section restored-pdp-product-features';
    section.innerHTML=`
      <div class="pdp-integrated-feature-intro">
        <div class="pdp-integrated-feature-visual"><span class="photo-label">${t('撮影：主な使用価値が一目で分かる使用シーン / 手＋商品＋小さな食材','Primary use-value image / hand + product + small food')}</span></div>
        <div class="pdp-integrated-feature-copy">
          <div class="eyebrow">${t('商品の特徴','PRODUCT FEATURES')}</div>
          <h2 class="display h2">${t('小さな食材を、狙った位置で扱いやすく。','More control for small foods and precise placement.')}</h2>
          <p class="lead">${t('小さな食材をつまむ、盛り付ける、食卓で取り分けるなど、細かな作業に使いやすいサイズと形状です。','A compact shape for picking up small foods, precise plating, and lighter tabletop serving tasks.')}</p>
        </div>
      </div>
      <div class="pdp-proof-layout equalized pdp-integrated-feature-grid">${featureCards}</div>
    `;
    primary.replaceWith(section);
    features.remove();
  }

  function detailsMarkup(){
    return `
      <div class="buybox-product-details-title">${t('商品詳細','Product Details')}</div>
      <div class="pdp-spec-accordion buybox-spec-accordion">
        <details>
          <summary><span>${t('サイズ・材質','Dimensions & Material')}</span><span class="pdp-spec-accordion-icon" aria-hidden="true"></span></summary>
          <div class="pdp-spec-accordion-panel"><div class="pdp-spec-accordion-grid">
            <dl class="pdp-spec-pair"><dt>${t('サイズ','Size')}</dt><dd>—</dd></dl>
            <dl class="pdp-spec-pair"><dt>${t('重量','Weight')}</dt><dd>—</dd></dl>
            <dl class="pdp-spec-pair"><dt>${t('材質','Material')}</dt><dd>${t('ステンレス鋼','Stainless steel')}</dd></dl>
          </div></div>
        </details>
        <details>
          <summary><span>${t('お手入れ','Care')}</span><span class="pdp-spec-accordion-icon" aria-hidden="true"></span></summary>
          <div class="pdp-spec-accordion-panel"><div class="pdp-spec-accordion-grid">
            <dl class="pdp-spec-pair"><dt>${t('食洗機対応','Dishwasher Safe')}</dt><dd>—</dd></dl>
            <dl class="pdp-spec-pair"><dt>${t('お手入れ','Care')}</dt><dd>—</dd></dl>
          </div></div>
        </details>
        <details>
          <summary><span>${t('原産国・使用上の注意','Origin & Precautions')}</span><span class="pdp-spec-accordion-icon" aria-hidden="true"></span></summary>
          <div class="pdp-spec-accordion-panel"><div class="pdp-spec-accordion-grid">
            <dl class="pdp-spec-pair"><dt>${t('原産国','Country of Origin')}</dt><dd>${t('日本','Japan')}</dd></dl>
            <dl class="pdp-spec-pair"><dt>${t('使用上の注意','Precautions')}</dt><dd>—</dd></dl>
          </div></div>
        </details>
      </div>`;
  }

  function moveProductDetailsIntoBuybox(){
    if(current!=='pdp') return;
    const buybox=document.querySelector('.pdp-top-ux .buybox');
    const compare=buybox?.querySelector('.compare-jump');
    if(!buybox || !compare) return;

    /* Remove the legacy one-line specification hint and its redundant divider. */
    [...buybox.querySelectorAll(':scope > .tiny')].forEach(node=>{
      const text=node.textContent.trim();
      if(/Stainless steel\s*\/\s*Made in Japan\s*\/\s*Care details/i.test(text) || /ステンレス鋼\s*\/\s*日本製\s*\/\s*お手入れ詳細/.test(text)){
        const prev=node.previousElementSibling;
        if(prev?.classList.contains('divider')) prev.remove();
        node.remove();
      }
    });

    if(!buybox.querySelector('.buybox-product-details')){
      const details=document.createElement('div');
      details.className='buybox-product-details';
      details.innerHTML=detailsMarkup();
      compare.insertAdjacentElement('afterend',details);
    }

    /* Product Details is a purchase-side disclosure, not a standalone section. */
    document.querySelector('.restored-pdp-specs')?.remove();
  }

  function convertAboutAuxToImageBand(){
    if(current!=='pdp') return;
    const section=document.querySelector('.restored-pdp-about');
    if(!section || section.classList.contains('pdp-about-image-band')) return;
    section.classList.add('prefooter-image-cta','centered-prefooter','pdp-about-image-band');

    const visual=section.querySelector('.pdp-brand-visual');
    const labelText=isJA()
      ? '背景画像：燕三条の製造・金属加工・仕上げ / 商品ディテール'
      : 'Background image: Tsubame-Sanjo manufacturing / metalworking / product detail';
    if(!section.querySelector(':scope > .photo-label')){
      const label=document.createElement('span');
      label.className='photo-label';
      label.textContent=labelText;
      section.prepend(label);
    }
    if(visual) visual.setAttribute('aria-hidden','true');
  }

  function applyPdpStructure(){
    mergePrimaryUseAndFeatures();
    moveProductDetailsIntoBuybox();
    convertAboutAuxToImageBand();
  }

  const previousRender=render;
  render=function(id,opts={updateUrl:true}){
    previousRender(id,opts);
    applyPdpStructure();
  };
  applyPdpStructure();
})();
