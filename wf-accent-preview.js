/* Optional 5% accent-color preview switch. */
(function(){
  const body=document.body;
  const toolbar=document.querySelector('.toolbar');
  const previewDock=document.querySelector('.preview-dock');
  if(!body || !toolbar) return;

  function makeButton(label,extraClass=''){
    const button=document.createElement('button');
    button.type='button';
    button.className=`accent-toggle ${extraClass}`.trim();
    button.textContent=label;
    button.setAttribute('aria-pressed','false');
    button.title='Toggle AUX accent color #a8274b';
    return button;
  }

  const reviewButton=makeButton('Accent 5%','toolbtn');
  reviewButton.id='accentToggle';
  const previewToggle=document.getElementById('previewToggle');
  toolbar.insertBefore(reviewButton,previewToggle||toolbar.querySelector('a.toolbtn')||toolbar.querySelector('.grow'));

  let previewButton=null;
  if(previewDock){
    previewButton=makeButton('Accent');
    previewButton.setAttribute('aria-label','Toggle AUX accent color #a8274b');
    const localeButton=previewDock.querySelector('[data-preview-locale]');
    if(localeButton) localeButton.insertAdjacentElement('afterend',previewButton);
    else previewDock.appendChild(previewButton);
  }

  function updateUrl(enabled){
    const url=new URL(location.href);
    if(enabled) url.searchParams.set('accent','1');
    else url.searchParams.delete('accent');
    history.replaceState(null,'',url);
  }

  function syncButtons(enabled){
    [reviewButton,previewButton].filter(Boolean).forEach(button=>{
      button.classList.toggle('active',enabled);
      button.setAttribute('aria-pressed',String(enabled));
    });
  }

  function setAccent(enabled,{updateUrlParam=true}={}){
    body.classList.toggle('accent-mode',enabled);
    syncButtons(enabled);
    if(updateUrlParam) updateUrl(enabled);
  }

  function toggle(){setAccent(!body.classList.contains('accent-mode'))}
  reviewButton.addEventListener('click',toggle);
  previewButton?.addEventListener('click',toggle);

  const initialEnabled=new URLSearchParams(location.search).get('accent')==='1';
  setAccent(initialEnabled,{updateUrlParam:false});
})();
