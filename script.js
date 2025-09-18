document.addEventListener('DOMContentLoaded', () => {
  // ---- MOBILE NAVIGATION ----
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Menü schließen sobald ein Link angeklickt wird
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  // ---- BESTELLFORMULAR INTERAKTION ----
  const productCheckboxes = document.querySelectorAll('input[name="products"]');
  const qtyInputs = document.querySelectorAll('.qty-input');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');

  const SHIPPING_COST = 4.90;
  const FREE_SHIPPING_FROM = 30.00;

  function updateOrderSummary() {
    let subtotal = 0;

    productCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const price = parseFloat(checkbox.dataset.price);
        const productKey = checkbox.value.toLowerCase().replace(/\s/g, '');
        const qtyInput = document.querySelector(`input[name="qty_${productKey}"]`);
        const qty = qtyInput ? parseInt(qtyInput.value) || 0 : 0;
        subtotal += price * qty;
      }
    });

    const shippingCost = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
    const total = subtotal + shippingCost;

    if(subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if(shippingEl) shippingEl.textContent = shippingCost === 0 ? 'kostenlos' : `€${shippingCost.toFixed(2)}`;
    if(totalEl) totalEl.innerHTML = `<strong>€${total.toFixed(2)}</strong>`;
  }

  // Checkbox steuert Menge, Menge steuert Checkbox
  productCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const productKey = checkbox.value.toLowerCase().replace(/\s/g, '');
      const qtyInput = document.querySelector(`input[name="qty_${productKey}"]`);
      if (checkbox.checked && qtyInput && parseInt(qtyInput.value) === 0) {
        qtyInput.value = 1;
      } else if (!checkbox.checked && qtyInput) {
        qtyInput.value = 0;
      }
      updateOrderSummary();
    });
  });

  qtyInputs.forEach(input => {
    input.addEventListener('input', () => {
      const qty = parseInt(input.value) || 0;
      const productKey = input.name.replace('qty_', '').toLowerCase();
      const checkbox = Array.from(productCheckboxes).find(cb => cb.value.toLowerCase().replace(/\s/g, '') === productKey);
      if (checkbox) {
        checkbox.checked = qty > 0;
      }
      updateOrderSummary();
    });
  });

  updateOrderSummary();

  // ---- SMOOTH SCROLL FÜR NAVIGATION ----
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if(targetElement) {
        const offsetTop = targetElement.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

});
