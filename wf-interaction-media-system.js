/* AUX USA / Interaction & Media System v1.2
   Applies semantic media / interaction components after every page render
   without changing page order.
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
  }

  function normalizeCollectionFeatured(){
    if(!['cook','serve','table'].includes(current)) return;
    const section=document.querySelector('.featured-two')?.closest('section.section');
    if(!section) return;

    section.classList.add('collection-featured-tools');
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

  function decorate(){
    document.querySelectorAll('.btn').forEach(btn=>btn.classList.add('cta-btn'));
    normalizeHeader();
    normalizeHomeComponents();
    normalizeCollectionFeatured();
    decorateImageHero();
    decoratePrefooterImageCta();
    decorateWhyBackToTools();
    removeInternalOnlyNotes();
    decoratePdpGalleryArrows();
  }

  render=function(id,opts={updateUrl:true}){
    renderBeforeInteractionMedia(id,opts);
    decorate();
  };

  decorate();
})();
