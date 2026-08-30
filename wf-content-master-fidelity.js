/* AUX USA / Content Master fidelity
   Keeps terms that intentionally differ between JA Source of Truth and EN Working Copy.
*/
(function(){
  const renderBeforeContentFidelity=render;

  function applyContentMasterFidelity(){
    if(current!=='why') return;
    let locale='en';
    try{locale=wireframeLocale}catch(_){}
    const gripBody=document.querySelector('.master-why-design .master-feature-card:nth-child(3) .master-feature-card-copy p');
    if(!gripBody) return;
    gripBody.textContent=locale==='ja'
      ? '商品によってバネ性や開き角度が異なり、握ったときの感覚も変わります。'
      : 'Flex and opening angle vary by product, changing how each feels in the hand.';
  }

  render=function(id,opts={updateUrl:true}){
    renderBeforeContentFidelity(id,opts);
    applyContentMasterFidelity();
  };

  applyContentMasterFidelity();
})();
