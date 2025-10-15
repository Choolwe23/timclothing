// product-detail.js
(function(){
  // Simple cart helper used across pages
  window.Cart = window.Cart || (function(){
    const KEY = 'tim_cart_v1';
    function load(){
      try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e){ return []; }
    }
    function save(cart){ localStorage.setItem(KEY, JSON.stringify(cart)); }
    function get(){ return load(); }
    function add(item){
      const cart = load();
      const existing = cart.find(i => i.id === item.id);
      if(existing){ existing.qty += item.qty; }
      else { cart.push(item); }
      save(cart);
      // update cart count in header if available
      const total = cart.reduce((s,i)=>s+i.qty,0);
      const el = document.querySelector('.cart-count'); if(el) el.textContent = total;
      return cart;
    }
    return { get, add };
  })();

  function formatPrice(n){
    return window.Currency ? window.Currency.format(n) : 'K' + Number(n).toFixed(2);
  }

  function findProductById(id){
    // Look for a globally available products array
    if(window.GLOBAL_PRODUCTS && Array.isArray(window.GLOBAL_PRODUCTS)){
      return window.GLOBAL_PRODUCTS.find(p => String(p.id) === String(id));
    }
    // Try Products from shop.js: it exports ProductsPage in module form but not globally; fallback to creating a temporary list
    if(window.products && Array.isArray(window.products)){
      return window.products.find(p => String(p.id) === String(id));
    }
    // As last resort, if index.js defined products on a Page instance, we try to read from DOM dataset or window
    // Otherwise, return null
    return null;
  }

  function init(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const nameEl = document.getElementById('product-name');
    const priceEl = document.getElementById('product-price');
    const originalEl = document.getElementById('product-original');
    const descEl = document.getElementById('product-description');
    const imgEl = document.getElementById('product-main-image');
    const qtyEl = document.getElementById('product-qty');
    const addBtn = document.getElementById('add-to-cart');

    if(!id){ nameEl.textContent = 'Product not found'; return; }

    // Wait for window.GLOBAL_PRODUCTS to be available (index/shop may load later)
    function renderWhenReady(){
      const product = findProductById(id);
      if(product){
        nameEl.textContent = product.name;
        priceEl.textContent = formatPrice(product.price);
        originalEl.textContent = product.originalPrice ? formatPrice(product.originalPrice) : '';
        descEl.textContent = product.description || '';
        imgEl.src = product.image || '';
        imgEl.alt = product.name;

        addBtn.addEventListener('click', () => {
          const qty = parseInt(qtyEl.value) || 1;
          window.Cart.add({ id: product.id, name: product.name, price: product.price, qty });
          // small animation feedback
          addBtn.textContent = 'Added ✓';
          setTimeout(()=> addBtn.textContent = 'Add to Cart', 1200);
        });

        // Preload image
        const img = new Image(); img.src = product.image;
      } else {
        // retry a few times if products not loaded
        if(window._productDetailRetries === undefined) window._productDetailRetries = 0;
        if(window._productDetailRetries < 10){ window._productDetailRetries++; setTimeout(renderWhenReady, 200); }
        else { nameEl.textContent = 'Product not found'; }
      }
    }

    renderWhenReady();
  }

  document.addEventListener('DOMContentLoaded', init);
})();