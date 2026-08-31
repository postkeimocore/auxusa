/* AUX USA / simple photo placement
   Plain <img> elements only.
*/
(function(){
  const DIR='assets/wireframe/';
  const products=[
    'product-pair-minimal.webp',
    'product-pair-shadow.webp',
    'product-pair-warm.webp',
    'product-lineup-marble.webp',
    'product-lineup-warm.webp'
  ];

  function put(el,file,position='center'){
    if(!el||!file)return;
    el.querySelectorAll(':scope > .wf-direct-photo').forEach(x=>x.remove());
    el.querySelectorAll(':scope > .photo-label,:scope > .use-photo-label').forEach(x=>x.style.display='none');
    if(getComputedStyle(el).position==='static')el.style.position='relative';
    el.style.overflow='hidden';
    const img=document.createElement('img');
    img.className='wf-direct-photo';
    img.src=DIR+file;
    img.alt='';
    img.decoding='async';
    img.style.cssText=`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${position};display:block;z-index:0;`;
    el.prepend(img);
    [...el.children].forEach(child=>{
      if(child!==img){
        if(getComputedStyle(child).position==='static')child.style.position='relative';
        child.style.zIndex='1';
      }
    });
    el.dataset.photoAsset=file;
  }
  function one(sel,file,pos){put(document.querySelector(sel),file,pos)}
  function all(sel,file,pos){document.querySelectorAll(sel).forEach(el=>put(el,file,pos))}
  function list(sel,files){document.querySelectorAll(sel).forEach((el,i)=>put(el,files[i%files.length]))}

  function common(){
    list('.product-img',products);
    all('.master-image-nav-card[data-go="cook"]','cook-pasta.webp');
    all('.master-image-nav-card[data-go="serve"]','serve-salad.webp');
    all('.master-image-nav-card[data-go="table"]','table-tea-bag.webp');
    all('.master-image-nav-card[data-go="inuse"]','product-lineup-warm.webp');
  }

  function home(){
    one('.product-hero-visual','small-food-transfer.webp','center 45%');
    one('.master-home-hero .master-photo','small-food-transfer.webp','center 45%');
    list('.home-precision-visual',[
      'product-tip-macro-dark.webp','product-tip-tomato-macro.webp','product-pair-minimal.webp'
    ]);
    list('.master-aux-feature .master-shape-gallery .master-photo',[
      'product-tip-macro-dark.webp','product-tip-tomato-macro.webp','product-pair-minimal.webp'
    ]);
    one('.home-use-feature .home-use-visual','cook-steak-pan.webp');
    list('.home-use-list .home-use-row-visual',[
      'plating-scallops.webp','serving-salmon.webp','small-food-olives-wide.webp'
    ]);
    list('.home-use-list .home-use-thumb',[
      'plating-scallops.webp','serving-salmon.webp','small-food-olives-wide.webp'
    ]);
    one('.master-home-about','manufacturing-inspection-lineup.webp','center 48%');
    common();
  }

  function shop(){common();one('.master-exit-image','serve-meatballs.webp')}

  function collection(id){
    const file={cook:'cook-greens-pan.webp',serve:'serve-salad-greens.webp',table:'small-food-olive-macro.webp'}[id];
    one('.master-collection-hero-image',file);
    one('.collection-visual',file);
    one('.master-collection-about-aux','manufacturing-caliper-over-shoulder.webp');
    common();
  }

  function inuse(){
    one('.master-inuse-hero','cook-frying.webp','center 45%');
    list('.use-jump',['cook-frying.webp','plating-scallops.webp','serve-meatballs.webp','small-food-olives-wide.webp']);
    list('.inuse-scene-visual',['cook-pasta.webp','plating-scallops.webp','serving-salmon.webp','small-food-transfer.webp']);
    list('.inuse-related-img',products);
    one('.inuse-prefooter','product-lineup-warm.webp');
  }

  function pdp(){
    one('.pdp-gallery-stage','product-pair-minimal.webp');
    list('.pdp-gallery-shot',['product-pair-minimal.webp','small-food-transfer.webp','product-tip-tomato-macro.webp','product-tomato-scale.webp']);
    list('.pdp-gallery-thumb',['product-pair-minimal.webp','product-pair-shadow.webp','product-tip-tomato-macro.webp','product-tomato-scale.webp']);
    one('.master-pdp-primary-image','small-food-transfer.webp');
    one('.pdp-integrated-feature-visual','small-food-transfer.webp');
    list('.master-pdp-features .master-feature-card .master-photo',['product-tip-macro-dark.webp','product-tip-tomato-macro.webp','product-tomato-scale.webp']);
    list('.pdp-proof-equal-visual',['small-food-olive-macro.webp','product-tomato-scale.webp','table-tea-bag.webp']);
    one('.pdp-feature-image-band','small-food-transfer.webp','center 48%');
    one('.master-pdp-about','manufacturing-caliper-close.webp');
    one('.restored-pdp-about','manufacturing-inspection-lineup.webp','center 48%');
    one('.pdp-brand-visual','manufacturing-caliper-close.webp');
    common();
  }

  function why(){
    one('.master-why-hero','plating-scallops.webp','center 45%');
    list('.why-art',['product-tip-macro-dark.webp','product-tip-tomato-macro.webp','small-food-olive-macro.webp','product-lineup-marble.webp']);
    list('.master-why-feature .master-shape-gallery .master-photo',['product-tip-macro-dark.webp','product-tip-tomato-macro.webp','small-food-olive-macro.webp']);
    list('.master-why-design .master-feature-card .master-photo',['product-tip-macro-dark.webp','product-tomato-scale.webp','product-pair-shadow.webp']);
    one('.master-why-made','manufacturing-caliper-over-shoulder.webp');
    common();
  }

  function apply(id){
    if(id==='home')home();
    else if(id==='shop')shop();
    else if(['cook','serve','table'].includes(id))collection(id);
    else if(id==='inuse')inuse();
    else if(id==='pdp')pdp();
    else if(id==='why')why();
  }

  const previousRender=render;
  render=function(id,opts={updateUrl:true}){
    previousRender(id,opts);
    apply(id);
  };
  apply(current);
})();