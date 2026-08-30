/* AUX USA / Interaction & Media System v1.5
   Applies semantic media / interaction components after every page render
   without changing page order or Content Master copy.
*/
(function(){
  const renderBeforeInteractionMedia=render;

  function localeIsJA(){
    return typeof wireframeLocale!=='undefined' && wireframeLocale==='ja';
  }

  function ensurePhotoLabel(host,text){
    if(!host || host.querySelector(':scope > .photo-label')) return;
    const label=document.createElement('span');
    label.className='photo-label';
    label.textContent=text;
    host.prepend(label);
  }

  function normalizeHeader(){
    document.querySelectorAll('.site-header .action-item span').forEach(span=>{
      const text=span.textContent.trim();
      if(/^(Cart|カート)/i.test(text)) span.textContent=`${localeIsJA()?'カート':'Cart'} ❶`;
    });
  }

  function normalizeHomeComponents(){
    if(current!=='home') return;

    const featuredSection=[...document.querySelectorAll('.page > section.section')]
      .find(section=>section.querySelector('.slider-foot') && section.querySelector('.product-strip'));
    featuredSection?.querySelector(':scope > .eyebrow')?.remove();

    const featureLink=document.querySelector('.home-use-feature .use-link');
    if(featureLink){
      featureLink.innerHTML=`${localeIsJA()?'この使い方を見る':'See this use'} <span class="arr">→</span>`;
    }

    const categoryLabels=[
      'Category background image: COOK / cooking movement / pan + food',
      'Category background image: SERVE / plating or shared dish',
      'Category background image: TABLE / tabletop + small foods'
    ];
    document.querySelectorAll('.cat-grid .cat').forEach((card,index)=>{
      card.classList.add('home-category-image-card');
      ensurePhotoLabel(card,categoryLabels[index]||'Category background image');
    });
  }

  function normalizeCollectionFeatured(){
    if(!['cook','serve','table'].includes(current)) return;
    const section=document.querySelector('.featured-two')?.closest('section.section');
    if(!section) return;

    section.classList.add('collection-featured-tools');

    /* Content Master owns the user-facing section label/copy. The legacy
       renderer used "Featured tools", but v1 FIX specifies Featured Products /
       代表商品. Keep only the layout class when a master page is active. */
    if(document.querySelector('.master-page')) return;

    section.querySelector(':scope > .eyebrow')?.remove();
    const heading=section.querySelector(':scope > .h2');
    if(heading) heading.textContent=localeIsJA()?'注目の商品':'Featured tools';
  }

  function decorateImageHero(){
    if(current!=='inuse' && current!=='why') return;
    const hero=document.querySelector('.why-hero');
    if(!hero) return;
    hero.classList.add('image-overlay-hero');
    ensurePhotoLabel(
      hero,
      current==='inuse'
        ? 'Hero background image: hand + AUX + familiar food / natural US kitchen context'
        : 'Hero background image: AUX in use / product + hand + precise movement'
    );

    if(current==='inuse') document.querySelector('.inuse-editorial-hero')?.remove();
  }

  function decoratePrefooterImageCta(){
    const eligible=new Set(['cook','serve','table','pdp','inuse']);
    if(!eligible.has(current)) return;

    const sections=[...document.querySelectorAll('.page > section.section')];
    const target=sections.at(-1);
    if(!target) return;

    target.classList.add('prefooter-image-cta','centered-prefooter',`prefooter-${current}`);
    if(current==='inuse') target.classList.add('inuse-prefooter');

    const labelMap={
      cook:'Pre-footer background image: COOK tool in use / kitchen movement',
      serve:'Pre-footer background image: SERVE tool / finished dish / shared table',
      table:'Pre-footer background image: TABLE tool / tabletop / small foods',
      pdp:'Pre-footer background image: Fingertip Tongs in a natural tabletop use scene',
      inuse:'Pre-footer background image: multiple AUX tools / use-led product discovery'
    };
    ensurePhotoLabel(target,labelMap[current]);

    target.querySelectorAll('.action-row').forEach(row=>{
      if(row.querySelectorAll('.btn').length===2) row.classList.add('balanced-cta-row');
    });
  }

  function decorateEditorialImageBands(){
    if(current==='home'){
      const sections=[...document.querySelectorAll('.page > section.section')];
      const target=sections.at(-1);
      if(target){
        target.classList.add('prefooter-image-cta','centered-prefooter','home-why-image-band');
        ensurePhotoLabel(target,'Background image: AUX tool in use / precise hand movement / natural kitchen context');
      }
    }

    if(current==='why'){
      const split=document.querySelector('.page > section.section.dark .split.reverse');
      const target=split?.closest('section.section');
      if(target){
        target.classList.add('prefooter-image-cta','centered-prefooter','why-japanese-precision-image-band');
        ensurePhotoLabel(target,'Background image: Tsubame-Sanjo / metalworking / production / inspection');
      }
    }
  }

  function decorateWhyBackToTools(){
    if(current!=='why') return;
    const strip=document.querySelector('.brand-intro .product-strip');
    const section=strip?.closest('section.section');
    if(!section) return;
    section.classList.add('why-back-tools');
    section.querySelectorAll('.action-row').forEach(row=>{
      if(row.querySelectorAll('.btn').length===2) row.classList.add('balanced-cta-row');
    });
  }

  function removeInternalOnlyNotes(){
    document.querySelectorAll('.manufacturing-note').forEach(node=>node.remove());
  }

  function decoratePdpGalleryArrows(){
    if(current!=='pdp') return;
    const stage=document.querySelector('.pdp-gallery-stage');
    const thumbs=document.querySelector('.pdp-gallery-thumbs');
    if(!stage || !thumbs || stage.dataset.navReady==='true') return;

    const makeButton=(direction,label,character)=>{
      const button=document.createElement('button');
      button.type='button';
      button.className=`pdp-gallery-nav ${direction}`;
      button.setAttribute('aria-label',label);
      button.textContent=character;
      button.addEventListener('click',()=>{
        const items=[...thumbs.querySelectorAll('.pdp-gallery-thumb')];
        if(!items.length) return;
        let index=items.findIndex(item=>item.classList.contains('active'));
        if(index<0) index=0;
        const delta=direction==='prev'?-1:1;
        const next=(index+delta+items.length)%items.length;
        items[next].click();
        items[next].scrollIntoView({block:'nearest',inline:'nearest'});
      });
      return button;
    };

    stage.append(
      makeButton('prev','Previous product image','←'),
      makeButton('next','Next product image','→')
    );
    stage.dataset.navReady='true';
  }

  function addIntentionalBreak(selector,plain,html){
    const node=document.querySelector(selector);
    if(!node || node.textContent.trim()!==plain || node.querySelector('.intentional-break')) return;
    node.innerHTML=html;
  }

  function normalizeTextLayout(){
    if(['cook','serve','table'].includes(current)){
      const valueSection=[...document.querySelectorAll('.page > section.section')]
        .find(section=>section.querySelector('.collection-benefits'));
      valueSection?.classList.add('collection-value-copy');

      const precisionSection=[...document.querySelectorAll('.page > section.section.soft')]
        .find(section=>section.querySelector('.split') && section.querySelector('[data-go="why"]') && section.querySelector('[data-go="inuse"]'));
      if(precisionSection){
        precisionSection.classList.add('collection-precision-copy');
        precisionSection.querySelector('.split')?.classList.add('collection-precision-layout');
      }
    }

    if(current==='inuse'){
      document.querySelector('.image-overlay-hero')?.classList.add('wide-hero-copy');
      document.querySelector('.inuse-prefooter')?.classList.add('wide-prefooter-copy');
    }

    if(current==='why'){
      document.querySelector('.image-overlay-hero')?.classList.add('wide-hero-copy');
      document.querySelector('.why-back-tools')?.classList.add('wide-prefooter-copy');
    }

    if(current==='pdp'){
      document.querySelector('.pdp-value-head')?.classList.add('pdp-reading-head');
      document.querySelector('.pdp-proof-head')?.classList.add('pdp-reading-head');
      document.querySelector('#compare-tools')?.classList.add('pdp-compare-reading');
      document.querySelector('.pdp-explore-band')?.classList.add('pdp-wide-explore');

      if(!localeIsJA()){
        addIntentionalBreak(
          '.pdp-value-head .h2',
          'Control where the movement gets small.',
          'Control where the movement<br class="intentional-break">gets small.'
        );
        addIntentionalBreak(
          '.pdp-value-head .lead',
          'Fingertip Tongs are designed for placing, picking up and serving smaller foods with a clear view of where the tool meets the food.',
          'Fingertip Tongs are designed for placing, picking up and serving smaller foods<br class="intentional-break">with a clear view of where the tool meets the food.'
        );
        addIntentionalBreak(
          '.pdp-proof-head .h2',
          'The difference is built into the contact point, overall form and proportion.',
          'The difference is built into the contact point,<br class="intentional-break">overall form and proportion.'
        );
        addIntentionalBreak(
          '.pdp-proof-head .lead',
          'Use product-specific facts and close visual evidence here. Avoid repeating generic “precision” claims that are not tied to this product.',
          'Use product-specific facts and close visual evidence here.<br class="intentional-break">Avoid repeating generic “precision” claims that are not tied to this product.'
        );
        addIntentionalBreak(
          '#compare-tools > .lead',
          'Similar forms can solve different movements. Compare only the attributes that meaningfully change the choice.',
          'Similar forms can solve different movements.<br class="intentional-break">Compare only the attributes that meaningfully change the choice.'
        );
      }
    }
  }

  function decorate(){
    document.querySelectorAll('.btn').forEach(btn=>btn.classList.add('cta-btn'));
    normalizeHeader();
    normalizeHomeComponents();
    normalizeCollectionFeatured();
    decorateImageHero();
    decoratePrefooterImageCta();
    decorateEditorialImageBands();
    decorateWhyBackToTools();
    removeInternalOnlyNotes();
    decoratePdpGalleryArrows();
    normalizeTextLayout();
  }

  render=function(id,opts={updateUrl:true}){
    renderBeforeInteractionMedia(id,opts);
    decorate();
  };

  decorate();
})();
