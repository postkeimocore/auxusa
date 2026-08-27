/* True-size Preview Mode
   Keeps the existing Working / Review View intact and removes only review chrome. */

(function(){
  const body=document.body;
  const toolbar=document.querySelector('.toolbar');
  const browser=document.getElementById('browser');
  const previewPageOrder=nav.flatMap(group=>group.items.map(([id])=>id));

  const enterButton=document.createElement('button');
  enterButton.className='toolbtn';
  enterButton.id='previewToggle';
  enterButton.type='button';
  enterButton.textContent='True-size Preview';
  enterButton.setAttribute('aria-pressed','false');

  const sitemapLink=toolbar.querySelector('a.toolbtn');
  toolbar.insertBefore(enterButton,sitemapLink||toolbar.querySelector('.grow'));

  const dock=document.createElement('div');
  dock.className='preview-dock preview-only';
  dock.setAttribute('aria-label','Preview navigation');
  dock.innerHTML=`
    <button type="button" data-preview-prev aria-label="Previous page">←</button>
    <span class="preview-page-status"></span>
    <button type="button" data-preview-next aria-label="Next page">→</button>
    <button type="button" data-preview-exit>Review View</button>
  `;
  body.appendChild(dock);

  const status=dock.querySelector('.preview-page-status');
  const prevButton=dock.querySelector('[data-preview-prev]');
  const nextButton=dock.querySelector('[data-preview-next]');

  function updateStatus(){
    const index=previewPageOrder.indexOf(current);
    const label=pages[current]?.label||current;
    status.textContent=`${label} · ${index+1}/${previewPageOrder.length}`;
    prevButton.disabled=index<=0;
    nextButton.disabled=index<0||index>=previewPageOrder.length-1;
  }

  function updateModeUrl(enabled){
    const url=new URL(location.href);
    if(enabled)url.searchParams.set('preview','1');
    else url.searchParams.delete('preview');
    history.replaceState(null,'',url);
  }

  function setPreview(enabled,{updateUrl=true}={}){
    body.classList.toggle('preview-mode',enabled);
    enterButton.classList.toggle('active',enabled);
    enterButton.setAttribute('aria-pressed',String(enabled));
    if(updateUrl)updateModeUrl(enabled);
    updateStatus();
    window.scrollTo({top:0,behavior:'instant'});
  }

  function movePage(delta){
    const index=previewPageOrder.indexOf(current);
    const nextIndex=index+delta;
    if(nextIndex<0||nextIndex>=previewPageOrder.length)return;
    render(previewPageOrder[nextIndex]);
    updateStatus();
  }

  enterButton.addEventListener('click',()=>setPreview(true));
  dock.querySelector('[data-preview-exit]').addEventListener('click',()=>setPreview(false));
  prevButton.addEventListener('click',()=>movePage(-1));
  nextButton.addEventListener('click',()=>movePage(1));

  browser.addEventListener('click',()=>requestAnimationFrame(updateStatus));

  document.addEventListener('keydown',event=>{
    if(!body.classList.contains('preview-mode'))return;
    const target=event.target;
    const tag=target?.tagName?.toLowerCase();
    const isEditing=target?.isContentEditable||tag==='input'||tag==='textarea'||tag==='select';
    if(isEditing)return;

    if(event.key==='Escape'){
      event.preventDefault();
      setPreview(false);
      enterButton.focus({preventScroll:true});
      return;
    }
    if(event.key==='ArrowLeft'){
      event.preventDefault();
      movePage(-1);
      return;
    }
    if(event.key==='ArrowRight'){
      event.preventDefault();
      movePage(1);
    }
  });

  const initialPreview=new URLSearchParams(location.search).get('preview')==='1';
  if(initialPreview)setPreview(true,{updateUrl:false});
  else updateStatus();
})();
