const _homeWithStrategyFixes = home;
home = function(){
  const html = _homeWithStrategyFixes();
  const restoredHero = `<section class="hero"><div class="hero-stage"><div class="hero-copy"><div class="eyebrow">Featured tool / TABLE</div><h1 class="display h1">Fingertip Tongs</h1><p class="lead">Precise control for small foods, plating and everyday tabletop use.</p>${ja('FVは代表商品を主役にする。商品名・用途・使用価値を見せ、各カルーセルから該当PDPへ直接誘導する。')}<div class="row" style="margin-top:28px"><a class="btn black" data-go="pdp">View Product</a><a class="btn ghost" data-go="inuse" data-target="use-small">See in use</a></div></div><div class="hero-visual clickable" data-go="pdp"><span class="photo-label">FVカルーセル：代表商品の使用シーン／商品導線</span></div><div class="hero-pages"><span class="on"></span><span></span><span></span></div></div><span class="ref">REF: Material / layout reference only</span><div class="anno">FVのデザイン構成は前案に戻し、内容だけをブランド訴求から商品訴求へ変更。カルーセルごとに商品名・用途・PDP導線を切り替える想定。</div></section>`;
  return html.replace(/<section class="hero product-hero">[\s\S]*?<\/section>/, restoredHero);
};
