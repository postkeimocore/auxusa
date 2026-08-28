/* Minimal boot renderer. The current PDP is defined by wf-en-detail-overrides.js
   and wf-ux-refinement.js. Product claims must come from confirmed AUX facts only. */

function pdp(){return `${chrome('/products/fingertip-tongs','Product Detail','Boot renderer / current PDP renderer loads after navigation setup')}<div class="page"><section class="section"><div class="eyebrow">TABLE</div><h1 class="display h1">Fingertip Tongs</h1><p class="lead">Product-specific use value, confirmed form details and purchase information.</p></section></div>${footer()}`}
