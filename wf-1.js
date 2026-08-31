const products=[
  ['Fingertip Tongs','TABLE','Fine control for small foods'],
  ['Noodle Tongs','COOK','Grip and lift noodles cleanly'],
  ['Serving Tongs','SERVE','Plate and serve with control'],
  ['Frying Tongs','COOK','Handle fried foods precisely'],
  ['Sauce Serving Tongs','SERVE','Grip and scoop in one move'],
  ['Small Table Tongs','TABLE','For tea, sides and tabletop use'],
  ['Product 07','COOK','Product description placeholder'],
  ['Product 08','SERVE','Product description placeholder'],
  ['Product 09','TABLE','Product description placeholder'],
  ['Product 10','COOK','Product description placeholder'],
  ['Product 11','SERVE','Product description placeholder'],
  ['Product 12','TABLE','Product description placeholder'],
  ['Product 13','COOK','Product description placeholder']
];
const searchIcon=`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l5 5"></path></svg>`;
const cartIcon=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2h9.8l2-7.2H7"></path><circle cx="9" cy="19" r="1.2"></circle><circle cx="17" cy="19" r="1.2"></circle></svg>`;
function ja(text){return `<p class="ja-note">説明用：${text}</p>`}
function pic(cls='',label='撮影予定：使用シーン'){return `<div class="visualbox ${cls}"><span class="photo-label">${label}</span></div>`}
function productCard(i,target='pdp'){const p=products[i]||products[i%products.length];return `<article class="product-card clickable" data-go="${target}"><div class="product-img ${i%3===1?'warm':i%3===2?'cool':''}"></div><div class="product-name">${p[0]}</div><div class="product-sub">${p[2]}</div><div class="price">$—</div></article>`}
function header(){return `<div class="site-header"><div class="logo" data-go="home">AUX</div><div class="header-right"><nav class="globalnav"><button data-go="shop">SHOP</button><button data-go="cook">COOK</button><button data-go="serve">SERVE</button><button data-go="table">TABLE</button><button data-go="inuse">IN USE</button><button data-go="why">WHY AUX</button></nav><div class="actions"><button class="action-item">${searchIcon}<span>Search</span></button><button class="action-item">${cartIcon}<span>Cart (0)</span></button></div></div></div>`}
function footer(){return `<footer class="site-footer"><div class="footer-grid"><div><div class="footer-logo" data-go="home">AUX</div><p style="font-size:9px;color:#999;max-width:280px">Precise tools for everyday cooking, serving and the table.</p></div><div class="footer-col"><b>Shop</b><span data-go="shop">Shop All</span><span data-go="cook">COOK</span><span data-go="serve">SERVE</span><span data-go="table">TABLE</span></div><div class="footer-col"><b>Discover</b><span data-go="inuse">In Use</span><span data-go="why">Why AUX</span></div><div class="footer-col"><b>Support</b><span data-go="faq">FAQ</span><span data-go="shipping">Shipping</span><span data-go="returns">Returns</span><span data-go="contact">Contact</span></div></div></footer>`}
function chrome(route,title,meta){return `<div class="browser-chrome"><span class="traffic"></span><span class="traffic"></span><span class="traffic"></span><div class="address">aux-usa.com${route}</div></div>${header()}<div class="page-meta"><b>${title}</b>　${meta||''}</div>`}
