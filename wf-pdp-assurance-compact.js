/* AUX USA / PDP compact purchase assurance */
(function(){
  function isJA(){
    try{return wireframeLocale==='ja'}catch(_){return new URLSearchParams(location.search).get('lang')==='ja'}
  }
  function applyCompactAssurance(){
    if(current!=='pdp') return;
    const box=document.querySelector('.restored-pdp-page .purchase-assurance');
    if(!box) return;
    const ja=isJA();
    box.classList.add('purchase-assurance-compact');
    box.innerHTML=`
      <button type="button" data-go="shipping" class="purchase-assurance-link">${ja?'配送':'Shipping'} <span aria-hidden="true">→</span></button>
      <button type="button" data-go="returns" class="purchase-assurance-link">${ja?'返品':'Returns'} <span aria-hidden="true">→</span></button>
      <div class="purchase-assurance-link purchase-assurance-static">${ja?'関税・税金':'Duties & Taxes'} <span aria-hidden="true">→</span></div>`;
  }
  const previousRender=render;
  render=function(id,opts={updateUrl:true}){
    previousRender(id,opts);
    applyCompactAssurance();
  };
  applyCompactAssurance();
})();
