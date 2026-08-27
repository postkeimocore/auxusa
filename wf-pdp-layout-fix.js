function enhancePdpVisualHierarchy(){
  const gallery=document.querySelector('.pdp-gallery-ux');
  if(gallery && !gallery.dataset.enhanced){
    const shots=[...gallery.querySelectorAll('.pdp-gallery-shot')];
    if(shots.length){
      const items=shots.map((shot,i)=>({html:shot.innerHTML,index:i}));
      gallery.innerHTML='';
      const stage=document.createElement('div');
      stage.className='pdp-gallery-stage';
      const active=document.createElement('div');
      active.className='pdp-gallery-shot main media-0';
      stage.appendChild(active);
      const thumbs=document.createElement('div');
      thumbs.className='pdp-gallery-thumbs';
      const selectMedia=(index)=>{
        active.className=`pdp-gallery-shot main media-${index}`;
        active.innerHTML=items[index].html;
        thumbs.querySelectorAll('.pdp-gallery-thumb').forEach((btn,i)=>btn.classList.toggle('active',i===index));
      };
      items.forEach((item,i)=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.className=`pdp-gallery-thumb media-${i}${i===0?' active':''}`;
        btn.setAttribute('aria-label',`View product image ${i+1}`);
        btn.innerHTML=`${item.html}<span class="pdp-gallery-thumb-index">0${i+1}</span>`;
        btn.addEventListener('click',()=>selectMedia(i));
        thumbs.appendChild(btn);
      });
      gallery.append(stage,thumbs);
      selectMedia(0);
      gallery.dataset.enhanced='true';
    }
  }

  const proof=document.querySelector('.pdp-proof-layout');
  if(proof && !proof.dataset.equalized){
    const source=[];
    const main=proof.querySelector('.pdp-proof-main');
    if(main){
      source.push({label:main.querySelector('.photo-label')?.textContent||'',copy:main.querySelector('.pdp-proof-main-copy')?.innerHTML||''});
    }
    proof.querySelectorAll('.pdp-proof-item').forEach(item=>{
      source.push({label:item.querySelector('.photo-label')?.textContent||'',copy:item.querySelector('.pdp-proof-copy')?.innerHTML||''});
    });
    if(source.length){
      proof.innerHTML=source.map(x=>`<article class="pdp-proof-equal-card"><div class="pdp-proof-equal-visual"><span class="photo-label">${x.label}</span></div><div class="pdp-proof-equal-copy">${x.copy}</div></article>`).join('');
      proof.classList.add('equalized');
      proof.dataset.equalized='true';
    }
  }
}

const renderBeforePdpLayoutFix=render;
render=function(id,opts={updateUrl:true}){
  renderBeforePdpLayoutFix(id,opts);
  enhancePdpVisualHierarchy();
};
enhancePdpVisualHierarchy();
