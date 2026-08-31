/* AUX USA / direct wireframe photography map
   Explicit local WebP references only. No base64, remote loading, or label inference.
*/
(function(){
  const DIR='assets/wireframe/';

  const productSet=[
    'product-pair-minimal.webp',
    'product-pair-shadow.webp',
    'product-pair-warm.webp',
    'product-lineup-marble.webp',
    'product-lineup-warm.webp'
  ];

  function setImage(el,file,position='center'){
    if(!el||!file) return;
    el.style.backgroundImage=`url("${DIR}${file}")`;
    el.style.backgroundSize='cover';
    el.style.backgroundPosition=position;
    el.style.backgroundRepeat='no-repeat';
    el.dataset.photoAsset=file;
    el.querySelectorAll(':scope > .photo-label, :scope > .use-photo-label').forEach(label=>label.style.display='none');
  }

  function one(selector,file,position){setImage(document.querySelector(selector),file,position)}
  function many(selector,files,positions=[]){
    document.querySelectorAll(selector).forEach((el,i)=>setImage(el,files[i%files.length],positions[i%positions.length]||'center'));
  }
  function indexed(selector,files){
    const els=[...document.querySelectorAll(selector)];
    files.forEach((file,i)=>setImage(els[i],file));
  }

  function categoryCards(){
    one('.master-image-nav-card[data-go="cook"]','cook-pasta.webp');
    document.querySelectorAll('.master-image-nav-card[data-go="cook"]').forEach(el=>setImage(el,'cook-pasta.webp'));
    document.querySelectorAll('.master-image-nav-card[data-go="serve"]').forEach(el=>setImage(el,'serve-salad.webp'));
    document.querySelectorAll('.master-image-nav-card[data-go="table"]').forEach(el=>setImage(el,'table-tea-bag.webp'));
    document.querySelectorAll('.master-image-nav-card[data-go="inuse"]').forEach(el=>setImage(el,'product-lineup-warm.webp'));
  }

  function productCards(){many('.product-img',productSet)}

  function applyHome(){
    one('.master-home-hero .master-photo','small-food-transfer.webp','center 45%');
    indexed('.master-aux-feature .master-shape-gallery .master-photo',[
      'product-tip-macro-dark.webp','product-tip-tomato-macro.webp','product-pair-minimal.webp'
    ]);
    productCards();
    categoryCards();
    one('.home-use-feature .home-use-visual','cook-steak-pan.webp');
    indexed('.home-use-list .home-use-row-visual',[
      'plating-scallops.webp','serving-salmon.webp','small-food-olives-wide.webp'
    ]);
    one('.master-home-about','manufacturing-inspection-lineup.webp','center 48%');
  }

  function applyShop(){
    categoryCards();
    productCards();
    one('.master-exit-image','serve-meatballs.webp');
  }

  function applyCollection(id){
    const hero={
      cook:'cook-greens-pan.webp',
      serve:'serve-salad-greens.webp',
      table:'small-food-olive-macro.webp'
    }[id];
    one('.master-collection-hero-image',hero);
    productCards();
    one('.master-collection-about-aux','manufacturing-caliper-over-shoulder.webp');
  }

  function applyInUse(){
    indexed('.use-jump',[
      'cook-frying.webp','plating-scallops.webp','serve-meatballs.webp','small-food-olives-wide.webp'
    ]);
    indexed('.inuse-scene-visual',[
      'cook-pasta.webp','plating-scallops.webp','serving-salmon.webp','small-food-transfer.webp'
    ]);
    many('.inuse-related-img',productSet);
    one('.inuse-prefooter','product-lineup-warm.webp');
  }

  function applyPdp(){
    one('.pdp-gallery-stage','product-pair-minimal.webp');
    indexed('.pdp-gallery-thumb',[
      'product-pair-minimal.webp','product-pair-shadow.webp','product-tip-tomato-macro.webp','product-tomato-scale.webp'
    ]);
    one('.master-pdp-primary-image','small-food-transfer.webp');
    indexed('.master-pdp-features .master-feature-card .master-photo',[
      'product-tip-macro-dark.webp','product-tip-tomato-macro.webp','product-tomato-scale.webp'
    ]);
    productCards();
    one('.master-pdp-about','manufacturing-caliper-close.webp');
  }

  function applyWhy(){
    indexed('.master-why-feature .master-shape-gallery .master-photo',[
      'product-tip-macro-dark.webp','product-tip-tomato-macro.webp','small-food-olive-macro.webp'
    ]);
    indexed('.master-why-design .master-feature-card .master-photo',[
      'product-tip-macro-dark.webp','product-tomato-scale.webp','product-pair-shadow.webp'
    ]);
    one('.master-why-made','manufacturing-caliper-over-shoulder.webp');
    categoryCards();
  }

  function applyWireframePhotos(id){
    if(!id) return;
    if(id==='home') applyHome();
    else if(id==='shop') applyShop();
    else if(id==='cook'||id==='serve'||id==='table') applyCollection(id);
    else if(id==='inuse') applyInUse();
    else if(id==='pdp') applyPdp();
    else if(id==='why') applyWhy();
  }

  const priorRender=render;
  render=function(id,opts={updateUrl:true}){
    priorRender(id,opts);
    applyWireframePhotos(id);
  };

  try{applyWireframePhotos(current)}catch(_){
    const requested=new URLSearchParams(location.search).get('page');
    if(requested) applyWireframePhotos(requested);
  }
})();
