// ===================================================
// EINFACHES JAVASCRIPT FÜR IMKEREI WEBSITE
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Website wird geladen...');

    // Mobile Navigation
    initMobileNavigation();

    // Smooth Scrolling
    initSmoothScrolling();

    // Bestellformular
    initOrderForm();

    // Newsletter
    initNewsletter();

    console.log('✅ Website erfolgreich geladen!');
});

// ===================================================
// MOBILE NAVIGATION
// ===================================================
function initMobileNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===================================================
// SMOOTH SCROLLING
// ===================================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#FFFFFF';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// ===================================================
// BESTELLFORMULAR
// ===================================================
function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    const productCheckboxes = document.querySelectorAll('input[name="products"]');
    const qtyInputs = document.querySelectorAll('.qty-input');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    // Versandkonfiguration
    const SHIPPING_COST = 4.90;
    const FREE_SHIPPING_FROM = 30.00;

    // Produktkarten-Links verarbeiten
    document.querySelectorAll('.btn-product').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.getAttribute('data-product');

            // Scroll to shop
            document.getElementById('shop').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });

            // Produkt vorauswählen
            setTimeout(() => {
                const checkbox = document.querySelector(`input[value="${product}"]`);
                const qtyInput = getQtyInputForProduct(product);

                if (checkbox && qtyInput) {
                    checkbox.checked = true;
                    qtyInput.value = Math.max(1, parseInt(qtyInput.value));
                    updateOrderSummary();

                    // Visual feedback
                    const productOption = checkbox.closest('.product-option');
                    productOption.style.backgroundColor = '#FFFACD';
                    setTimeout(() => {
                        productOption.style.backgroundColor = '';
                    }, 2000);
                }
            }, 500);
        });
    });

    // Helper function to get quantity input for product
    function getQtyInputForProduct(productName) {
        const productKey = productName.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]/g, '');
        return document.querySelector(`input[name="qty_${productKey}"]`);
    }

    // Bestellsumme aktualisieren
    function updateOrderSummary() {
        let subtotal = 0;

        productCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseFloat(checkbox.dataset.price);
                const productName = checkbox.value;
                const qtyInput = getQtyInputForProduct(productName);
                const qty = qtyInput ? parseInt(qtyInput.value) || 0 : 0;

                subtotal += price * qty;
            }
        });

        const shippingCost = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
        const total = subtotal + shippingCost;

        if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = subtotal >= FREE_SHIPPING_FROM ? 'kostenlos' : `€${shippingCost.toFixed(2)}`;
        if (totalEl) totalEl.innerHTML = `<strong>€${total.toFixed(2)}</strong>`;

        // Versandkostenfrei-Notification
        if (subtotal >= FREE_SHIPPING_FROM && subtotal < FREE_SHIPPING_FROM + 5) {
            showNotification('🎉 Versandkostenfrei!', 'success');
        }
    }

    // Event Handlers für Checkboxes
    productCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const productName = this.value;
            const qtyInput = getQtyInputForProduct(productName);

            if (this.checked && qtyInput && parseInt(qtyInput.value) === 0) {
                qtyInput.value = 1;
            } else if (!this.checked && qtyInput) {
                qtyInput.value = 0;
            }

            updateOrderSummary();
        });
    });

    // Event Handlers für Quantity Inputs
    qtyInputs.forEach(input => {
        input.addEventListener('input', function() {
            const qty = parseInt(this.value) || 0;
            const productName = this.name.replace('qty_', '').replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü');

            // Find matching checkbox
            const checkbox = Array.from(productCheckboxes).find(cb => 
                cb.value.toLowerCase().replace(/[^a-z0-9]/g, '') === 
                this.name.replace('qty_', '')
            );

            if (checkbox) {
                checkbox.checked = qty > 0;
            }

            updateOrderSummary();
        });
    });

    // Formular absenden
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const selectedProducts = [];

        // Ausgewählte Produkte sammeln
        productCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const productName = checkbox.value;
                const price = parseFloat(checkbox.dataset.price);
                const qtyInput = getQtyInputForProduct(productName);
                const qty = qtyInput ? parseInt(qtyInput.value) || 0 : 0;

                if (qty > 0) {
                    selectedProducts.push({
                        name: productName,
                        price: price,
                        quantity: qty,
                        total: (price * qty).toFixed(2)
                    });
                }
            }
        });

        if (selectedProducts.length === 0) {
            showNotification('⚠️ Bitte wählen Sie mindestens ein Produkt aus.', 'error');
            return;
        }

        // E-Mail erstellen
        const customerName = `${formData.get('firstName')} ${formData.get('lastName')}`;
        const email = formData.get('email');
        const phone = formData.get('phone') || 'nicht angegeben';
        const address = `${formData.get('street')}, ${formData.get('zip')} ${formData.get('city')}`;
        const notes = formData.get('notes') || '';

        let emailBody = `Neue Honig-Bestellung\n`;
        emailBody += `========================\n\n`;
        emailBody += `Kunde: ${customerName}\n`;
        emailBody += `E-Mail: ${email}\n`;
        emailBody += `Telefon: ${phone}\n`;
        emailBody += `Adresse: ${address}\n\n`;

        emailBody += `BESTELLTE PRODUKTE:\n`;
        emailBody += `==================\n`;

        let orderTotal = 0;
        selectedProducts.forEach(product => {
            emailBody += `${product.quantity}x ${product.name} à €${product.price.toFixed(2)} = €${product.total}\n`;
            orderTotal += parseFloat(product.total);
        });

        const shippingCost = orderTotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
        const finalTotal = orderTotal + shippingCost;

        emailBody += `\nZwischensumme: €${orderTotal.toFixed(2)}\n`;
        emailBody += `Versandkosten: ${shippingCost === 0 ? 'kostenlos' : '€' + shippingCost.toFixed(2)}\n`;
        emailBody += `GESAMTSUMME: €${finalTotal.toFixed(2)}\n\n`;

        if (notes) {
            emailBody += `Besondere Wünsche:\n${notes}\n\n`;
        }

        emailBody += `Newsletter: ${formData.get('newsletter') ? 'Ja' : 'Nein'}\n`;
        emailBody += `Datum: ${new Date().toLocaleDateString('de-DE')}`;

        const subject = `Honig-Bestellung von ${customerName} - €${finalTotal.toFixed(2)}`;
        const mailtoLink = `mailto:info@imkerei-trinkaus.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        // E-Mail-Programm öffnen
        window.location.href = mailtoLink;

        showNotification('📧 Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die Bestellung ab!', 'success');

        // Formular nach kurzer Zeit zurücksetzen
        setTimeout(() => {
            orderForm.reset();
            updateOrderSummary();
        }, 2000);
    });

    // Initiale Berechnung
    updateOrderSummary();
}

// ===================================================
// NEWSLETTER
// ===================================================
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = this.querySelector('.newsletter-input').value;

        if (email) {
            const subject = 'Newsletter-Anmeldung - Imkerei Trinkaus';
            const body = `Hallo,\n\nhiermit möchte ich mich für den Newsletter der Imkerei Trinkaus anmelden.\n\nE-Mail: ${email}\n\nVielen Dank!`;
            const mailtoLink = `mailto:info@imkerei-trinkaus.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
            showNotification('📧 Newsletter-Anmeldung wird geöffnet!', 'success');

            this.reset();
        }
    });
}

// ===================================================
// HILFSFUNKTIONEN
// ===================================================

function showNotification(message, type = 'info') {
    // Entferne bestehende Notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Styling
    const bgColor = type === 'success' ? '#FFD700' : type === 'error' ? '#e74c3c' : '#FFA500';
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; z-index: 10000;
        background: ${bgColor}; color: white; padding: 15px 25px;
        border-radius: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        font-weight: 600; max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Automatisch entfernen
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// CSS Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .product-option:hover {
        border-color: #FFD700 !important;
        box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3) !important;
    }

    .qty-input:focus {
        outline: none !important;
        border-color: #FFD700 !important;
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2) !important;
    }
`;
document.head.appendChild(style);