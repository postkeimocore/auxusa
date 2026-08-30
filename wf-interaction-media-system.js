/* AUX USA / Interaction & Media System v1.0
   Applies semantic media components after every page render without changing
   content meaning or page order.
*/
(function(){
  const renderBeforeInteractionMedia=render;

  function ensurePhotoLabel(host,text){
    if(!host || host.querySelector(':scope > .photo-label')) return;
    const label=document.createElement('span');
    label.className='photo-label';
    label.textContent=text;
    host.prepend(label);
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

    /* In Use previously placed a separate editorial image immediately after a
       text-only hero. The hero itself now owns that image, so the duplicate
       visual block is removed. */
    if(current==='inuse'){
      document.querySelector('.inuse-editorial-hero')?.remove();
    }
  }

  function decoratePrefooterImageCta(){
    const eligible=new Set(['cook','serve','table','pdp','inuse']);
    if(!eligible.has(current)) return;

    const sections=[...document.querySelectorAll('.page > section.section')];
    const target=sections.at(-1);
    if(!target) return;

    target.classList.add('prefooter-image-cta');
    const labelMap={
      cook:'Pre-footer background image: COOK tool in use / kitchen movement',
      serve:'Pre-footer background image: SERVE tool / finished dish / shared table',
      table:'Pre-footer background image: TABLE tool / tabletop / small foods',
      pdp:'Pre-footer background image: Fingertip Tongs in a natural tabletop use scene',
      inuse:'Pre-footer background image: multiple AUX tools / use-led product discovery'
    };
    ensurePhotoLabel(target,labelMap[current]);
  }

  function decorate(){
    document.querySelectorAll('.btn').forEach(btn=>btn.classList.add('cta-btn'));
    decorateImageHero();
    decoratePrefooterImageCta();
  }

  render=function(id,opts={updateUrl:true}){
    renderBeforeInteractionMedia(id,opts);
    decorate();
  };

  decorate();
})();
