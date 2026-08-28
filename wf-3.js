/* Minimal boot renderer. The current In Use page is defined in wf-en-detail-overrides.js
   and refined by the active UX layer. */

function inUse(){return `${chrome('/pages/in-use','In Use','Boot renderer / current In Use renderer loads after navigation setup')}<div class="page"><section class="section"><div class="eyebrow">In use</div><h1 class="display h1">Explore AUX by situation.</h1><p class="lead">Cooking, plating, serving and tabletop use.</p></section></div>${footer()}`}
