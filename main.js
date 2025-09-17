// ===================================================
// HAUPTSKRIPT - GENERIERT ALLE INHALTE AUTOMATISCH
// ===================================================

// Warten bis DOM und alle Konfigurationsdateien geladen sind
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Lade Website-Inhalte...');

    // Prüfen ob alle Konfigurationen verfügbar sind
    if (typeof IMKEREI_CONFIG === 'undefined' || 
        typeof PRODUCTS_DATA === 'undefined' || 
        typeof NEWS_DATA === 'undefined' || 
        typeof CONTENT_DATA === 'undefined') {
        console.error('❌ Konfigurationsdateien nicht vollständig geladen!');
        return;
    }

    // Alle Bereiche generieren
    generateNavigation();
    generateHero();
    generateProducts();
    generateShop();
    generateNews();
    generateAbout();
    generateBees();
    generateContact();
    generateLegal();
    generateFooter();

    // Funktionalitäten aktivieren
    initializeInteractions();
    initializeOrderForm();

    console.log('✅ Website erfolgreich generiert!');
});

// NAVIGATION GENERIEREN
function generateNavigation() {
    const navbar = document.getElementById('navbar');
    const nav = CONTENT_DATA.navigation;

    navbar.innerHTML = `
        <div class="nav-container">
            <div class="nav-logo">
                <img src="${IMKEREI_CONFIG.images.logo}" alt="${IMKEREI_CONFIG.business.name} Logo" class="logo-img">
                <span class="nav-title">${IMKEREI_CONFIG.business.name}</span>
            </div>
            <div class="nav-menu" id="nav-menu">
                <div class="nav-item"><a href="#home" class="nav-link">${nav.home}</a></div>
                <div class="nav-item"><a href="#products" class="nav-link">${nav.products}</a></div>
                <div class="nav-item"><a href="#about" class="nav-link">${nav.about}</a></div>
                <div class="nav-item"><a href="#news" class="nav-link">${nav.news}</a></div>
                <div class="nav-item"><a href="#bees" class="nav-link">${nav.bees}</a></div>
                <div class="nav-item"><a href="#contact" class="nav-link">${nav.contact}</a></div>
                <div class="nav-item"><a href="#shop" class="nav-link nav-cta">${nav.shop}</a></div>
            </div>
            <div class="nav-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    `;
}

// HERO BEREICH GENERIEREN
function generateHero() {
    const hero = document.getElementById('home');
    const content = CONTENT_DATA.hero;

    hero.innerHTML = `
        <div class="hero-content">
            <h1 class="hero-title">${content.title}</h1>
            <p class="hero-subtitle">${content.subtitle}</p>
            <div class="hero-buttons">
                <a href="#products" class="btn btn-primary">${content.buttonPrimary}</a>
                <a href="#about" class="btn btn-secondary">${content.buttonSecondary}</a>
            </div>
        </div>
        <div class="hero-image">
            <img src="${IMKEREI_CONFIG.images.heroImage}" alt="Frischer Honig" class="hero-img">
        </div>
    `;
}

// PRODUKTE GENERIEREN
function generateProducts() {
    const title = document.getElementById('products-title');
    const grid = document.getElementById('products-grid');

    title.textContent = 'Unser Honig-Sortiment';

    grid.innerHTML = PRODUCTS_DATA.map(product => `
        <div class="product-card ${!product.inStock ? 'out-of-stock' : ''}">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-details">
                <span class="price">€${product.price.toFixed(2)}</span>
                <span class="size">${product.size}</span>
            </div>
            ${product.inStock ? 
                `<a href="#shop" class="btn btn-product" data-product="${product.name}" data-price="${product.price}">Bestellen</a>` :
                `<span class="btn btn-disabled">Ausverkauft</span>`
            }
        </div>
    `).join('');
}

// SHOP GENERIEREN
function generateShop() {
    const container = document.getElementById('shop-container');
    const shop = CONTENT_DATA.shop;
    const shipping = IMKEREI_CONFIG.shipping;

    container.innerHTML = `
        <h2 class="section-title">${shop.title}</h2>
        <div class="shop-content">
            <div class="order-info">
                <h3>${shop.subtitle}</h3>
                <ul class="order-steps">
                    ${shop.steps.map(step => `<li><i class="fas fa-check-circle"></i> ${step}</li>`).join('')}
                </ul>

                <div class="shipping-info">
                    <h4><i class="fas fa-truck"></i> ${shop.shippingTitle}</h4>
                    <p><strong>Versandkosten:</strong> €${shipping.cost.toFixed(2)} (ab €${shipping.freeFrom.toFixed(2)} versandkostenfrei)</p>
                    <p><strong>Lieferzeit:</strong> ${shipping.deliveryTime}</p>
                    <p><strong>Zahlung:</strong> ${shipping.paymentMethods}</p>
                </div>
            </div>

            <form class="order-form" id="orderForm">
                <h3>Ihre Bestellung</h3>

                <div class="form-section">
                    <h4>Honig auswählen:</h4>
                    <div class="product-selection" id="product-selection"></div>
                </div>

                <div class="order-summary">
                    <div class="summary-row">
                        <span>Zwischensumme:</span>
                        <span id="subtotal">€0,00</span>
                    </div>
                    <div class="summary-row">
                        <span>Versandkosten:</span>
                        <span id="shipping-cost">€${shipping.cost.toFixed(2)}</span>
                    </div>
                    <div class="summary-row total">
                        <span><strong>Gesamtsumme:</strong></span>
                        <span id="total"><strong>€${shipping.cost.toFixed(2)}</strong></span>
                    </div>
                </div>

                <div id="customer-form"></div>

                <button type="submit" class="btn btn-primary btn-large">
                    <i class="fas fa-paper-plane"></i> Bestellung absenden
                </button>
            </form>
        </div>
    `;

    // Produktauswahl für Shop generieren
    generateShopProducts();
    generateCustomerForm();
}

// SHOP PRODUKTE GENERIEREN
function generateShopProducts() {
    const selection = document.getElementById('product-selection');

    selection.innerHTML = PRODUCTS_DATA.filter(p => p.inStock).map(product => `
        <div class="product-option">
            <label class="product-label">
                <input type="checkbox" name="products" value="${product.name}" data-price="${product.price}">
                <span class="checkmark"></span>
                <div class="product-info">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">€${product.price.toFixed(2)}</span>
                </div>
            </label>
            <div class="quantity-control">
                <label>Anzahl:</label>
                <input type="number" name="qty_${product.id}" min="0" max="20" value="0" class="qty-input">
            </div>
        </div>
    `).join('');
}

// KUNDENFORMULAR GENERIEREN
function generateCustomerForm() {
    const form = document.getElementById('customer-form');

    form.innerHTML = `
        <div class="form-section">
            <h4>Ihre Kontaktdaten:</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label for="firstName">Vorname *</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Nachname *</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
                <div class="form-group">
                    <label for="email">E-Mail *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Telefon</label>
                    <input type="tel" id="phone" name="phone">
                </div>
            </div>
        </div>

        <div class="form-section">
            <h4>Lieferadresse:</h4>
            <div class="form-grid">
                <div class="form-group full-width">
                    <label for="street">Straße, Hausnummer *</label>
                    <input type="text" id="street" name="street" required>
                </div>
                <div class="form-group">
                    <label for="zip">PLZ *</label>
                    <input type="text" id="zip" name="zip" required>
                </div>
                <div class="form-group">
                    <label for="city">Ort *</label>
                    <input type="text" id="city" name="city" required>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h4>Besondere Wünsche oder Anmerkungen:</h4>
            <div class="form-group">
                <textarea id="notes" name="notes" rows="4" placeholder="Haben Sie besondere Wünsche oder Fragen zu Ihrer Bestellung?"></textarea>
            </div>
        </div>

        <div class="form-section">
            <div class="checkbox-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="privacy" required>
                    <span class="checkmark"></span>
                    Ich habe die <a href="#datenschutz" class="link">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu. *
                </label>
            </div>
            <div class="checkbox-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="newsletter">
                    <span class="checkmark"></span>
                    Ich möchte den Newsletter mit Informationen zu neuen Ernten und Angeboten erhalten.
                </label>
            </div>
        </div>
    `;
}

// NEWS GENERIEREN
function generateNews() {
    const title = document.getElementById('news-title');
    const grid = document.getElementById('news-grid');

    title.textContent = 'Aktuelles aus unserer Imkerei';

    // Sortiere News nach Datum (neueste zuerst)
    const sortedNews = NEWS_DATA.sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.innerHTML = sortedNews.map((article, index) => `
        <article class="news-card ${article.featured ? 'featured' : ''}">
            <div class="news-image">
                <img src="${article.image}" alt="${article.title}" class="news-img">
                ${index === 0 ? '<div class="news-badge">Neu</div>' : ''}
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">
                        <i class="fas fa-calendar"></i> 
                        ${new Date(article.date).toLocaleDateString('de-DE')}
                    </span>
                    <span class="news-category">${article.category}</span>
                </div>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.excerpt}</p>
                <a href="#" class="news-link" onclick="showFullArticle(${article.id})">
                    Weiterlesen <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// ABOUT GENERIEREN
function generateAbout() {
    const container = document.getElementById('about-container');
    const about = CONTENT_DATA.about;
    const stats = IMKEREI_CONFIG.stats;

    container.innerHTML = `
        <div class="about-content">
            <h2 class="section-title">${about.title}</h2>
            <div class="about-grid">
                <div class="about-text">
                    <p>${about.text1}</p>
                    <p>${about.text2}</p>

                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number">${stats.experience}</div>
                            <div class="stat-label">${about.statsLabels.experience}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${stats.hives}</div>
                            <div class="stat-label">${about.statsLabels.hives}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${stats.honeyPerYear}</div>
                            <div class="stat-label">${about.statsLabels.honey}</div>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <img src="${IMKEREI_CONFIG.images.aboutImage}" alt="Imker bei der Arbeit" class="about-img">
                </div>
            </div>
        </div>
    `;
}

// BEES GENERIEREN
function generateBees() {
    const container = document.getElementById('bees-container');
    const bees = CONTENT_DATA.bees;

    container.innerHTML = `
        <h2 class="section-title">${bees.title}</h2>
        <div class="bees-content">
            <div class="bee-info-grid">
                ${bees.cards.map(card => `
                    <div class="bee-info-card">
                        <i class="${card.icon} bee-icon"></i>
                        <h3>${card.title}</h3>
                        <p>${card.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// CONTACT GENERIEREN
function generateContact() {
    const container = document.getElementById('contact-container');
    const contact = IMKEREI_CONFIG.contact;
    const hours = IMKEREI_CONFIG.hours;
    const newsletter = CONTENT_DATA.newsletter;

    container.innerHTML = `
        <h2 class="section-title">Kontakt</h2>
        <div class="contact-content">
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="contact-details">
                        <h3>Adresse</h3>
                        <p>${contact.street}<br>${contact.zip} ${contact.city}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <div class="contact-details">
                        <h3>Telefon</h3>
                        <p>${contact.phone}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <div class="contact-details">
                        <h3>E-Mail</h3>
                        <p>${contact.email}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-clock"></i>
                    <div class="contact-details">
                        <h3>Öffnungszeiten</h3>
                        <p>${hours.display()}</p>
                    </div>
                </div>
            </div>

            <div class="newsletter">
                <h3>${newsletter.title}</h3>
                <p>${newsletter.subtitle}</p>
                <form class="newsletter-form">
                    <input type="email" placeholder="${newsletter.placeholder}" class="newsletter-input" required>
                    <button type="submit" class="btn btn-primary">${newsletter.button}</button>
                </form>
            </div>
        </div>
    `;
}

// LEGAL GENERIEREN (Impressum & Datenschutz)
function generateLegal() {
    generateImpressum();
    generateDataProtection();
}

function generateImpressum() {
    const container = document.getElementById('impressum-container');
    const business = IMKEREI_CONFIG.business;
    const contact = IMKEREI_CONFIG.contact;
    const legal = IMKEREI_CONFIG.legal;

    container.innerHTML = `
        <h2 class="section-title">Impressum</h2>
        <div class="legal-content">
            <div class="legal-section">
                <h3>Angaben gemäß § 5 TMG</h3>
                <p>
                    <strong>${business.name}</strong><br>
                    ${business.owner}<br>
                    ${contact.street}<br>
                    ${contact.zip} ${contact.city}
                </p>
            </div>

            <div class="legal-section">
                <h3>Kontakt</h3>
                <p>
                    <strong>Telefon:</strong> ${contact.phone}<br>
                    <strong>E-Mail:</strong> ${contact.email}
                </p>
            </div>

            <div class="legal-section">
                <h3>Umsatzsteuer-ID</h3>
                <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>
                    ${legal.ustId}
                </p>
            </div>

            <div class="legal-section">
                <h3>Berufsbezeichnung und berufsrechtliche Regelungen</h3>
                <p>
                    Berufsbezeichnung: Imker<br>
                    Zuständige Kammer: ${legal.chamber}<br>
                    Verliehen durch: ${legal.country}
                </p>
            </div>

            <div class="legal-section">
                <h3>Redaktionell verantwortlich</h3>
                <p>
                    ${business.owner}<br>
                    ${contact.street}<br>
                    ${contact.zip} ${contact.city}
                </p>
            </div>

            <div class="legal-section">
                <h3>EU-Streitschlichtung</h3>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br>
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
            </div>

            <div class="legal-section">
                <h3>Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h3>
                <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </div>
        </div>
    `;
}

function generateDataProtection() {
    const container = document.getElementById('datenschutz-container');
    const business = IMKEREI_CONFIG.business;
    const contact = IMKEREI_CONFIG.contact;

    container.innerHTML = `
        <h2 class="section-title">Datenschutzerklärung</h2>
        <div class="legal-content">
            <div class="legal-section">
                <h3>1. Datenschutz auf einen Blick</h3>
                <h4>Allgemeine Hinweise</h4>
                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

                <h4>Datenerfassung auf dieser Website</h4>
                <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
                <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
            </div>

            <div class="legal-section">
                <h3>2. Hosting</h3>
                <p>Wir hosten die Inhalte unserer Website bei GitHub Pages. Anbieter ist die GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA (nachfolgend GitHub).</p>
                <p>Wenn Sie unsere Website besuchen, erfasst GitHub verschiedene Logfiles inklusive Ihrer IP-Adressen. Details hierzu entnehmen Sie der Datenschutzerklärung von GitHub: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement</a>.</p>
            </div>

            <div class="legal-section">
                <h3>3. Allgemeine Hinweise und Pflicht­informationen</h3>
                <h4>Hinweis zur verantwortlichen Stelle</h4>
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <p>
                    ${business.owner}<br>
                    ${contact.street}<br>
                    ${contact.zip} ${contact.city}<br>
                    Telefon: ${contact.phone}<br>
                    E-Mail: ${contact.email}
                </p>
            </div>

            <div class="legal-section">
                <h3>4. Datenerfassung auf dieser Website</h3>
                <h4>Bestellformular</h4>
                <p>Wenn Sie über unser Bestellformular Honig bestellen, erfassen und verarbeiten wir Ihre Daten zur Abwicklung der Bestellung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
            </div>

            <div class="legal-section">
                <h3>5. Newsletter</h3>
                <p>Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse. Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit widerrufen.</p>
            </div>

            <div class="legal-section">
                <h3>6. Ihre Rechte</h3>
                <p>Sie haben folgende Rechte:</p>
                <ul>
                    <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                    <li>Recht auf Berichtigung unrichtiger Daten</li>
                    <li>Recht auf Löschung Ihrer Daten</li>
                    <li>Recht auf Einschränkung der Datenverarbeitung</li>
                    <li>Recht auf Datenübertragbarkeit</li>
                    <li>Widerspruchsrecht gegen die Verarbeitung</li>
                    <li>Beschwerderecht bei der Aufsichtsbehörde</li>
                </ul>
            </div>
        </div>
    `;
}

// FOOTER GENERIEREN
function generateFooter() {
    const footer = document.getElementById('footer');
    const business = IMKEREI_CONFIG.business;
    const social = IMKEREI_CONFIG.social;
    const footerContent = CONTENT_DATA.footer;
    const nav = CONTENT_DATA.navigation;

    // Social Links nur anzeigen wenn vorhanden
    const socialLinks = [];
    if (social.facebook) socialLinks.push(`<a href="${social.facebook}" class="social-link"><i class="fab fa-facebook"></i></a>`);
    if (social.instagram) socialLinks.push(`<a href="${social.instagram}" class="social-link"><i class="fab fa-instagram"></i></a>`);
    if (social.youtube) socialLinks.push(`<a href="${social.youtube}" class="social-link"><i class="fab fa-youtube"></i></a>`);

    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>${business.name}</h4>
                    <p>${business.slogan}</p>
                    ${socialLinks.length > 0 ? `<div class="social-links">${socialLinks.join('')}</div>` : ''}
                </div>
                <div class="footer-section">
                    <h4>${footerContent.quickLinks}</h4>
                    <ul class="footer-links">
                        <li><a href="#home">${nav.home}</a></li>
                        <li><a href="#products">${nav.products}</a></li>
                        <li><a href="#news">${nav.news}</a></li>
                        <li><a href="#shop">${nav.shop}</a></li>
                        <li><a href="#contact">${nav.contact}</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>${footerContent.legal}</h4>
                    <ul class="footer-links">
                        <li><a href="#impressum">${footerContent.imprint}</a></li>
                        <li><a href="#datenschutz">${footerContent.privacy}</a></li>
                        <li><a href="#agb">${footerContent.terms}</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ${business.name}. Alle Rechte vorbehalten.</p>
            </div>
        </div>
    `;
}

// INTERAKTIONEN INITIALISIEREN
function initializeInteractions() {
    // Mobile Navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling
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

    // Navbar auf Scroll
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

    // Animationen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer für Elemente
    setTimeout(() => {
        document.querySelectorAll('.product-card, .contact-item, .news-card, .bee-info-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);
}

// BESTELLFORMULAR INITIALISIEREN 
function initializeOrderForm() {
    setTimeout(() => {
        const orderForm = document.getElementById('orderForm');
        if (!orderForm) return;

        const productCheckboxes = document.querySelectorAll('input[name="products"]');
        const qtyInputs = document.querySelectorAll('.qty-input');
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping-cost');
        const totalEl = document.getElementById('total');

        const shipping = IMKEREI_CONFIG.shipping;

        // Produktauswahl von Produktkarten
        document.querySelectorAll('.btn-product').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const product = this.getAttribute('data-product');

                document.getElementById('shop').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                setTimeout(() => {
                    const checkbox = document.querySelector(`input[value="${product}"]`);
                    const productId = PRODUCTS_DATA.find(p => p.name === product)?.id;
                    const qtyInput = document.querySelector(`input[name="qty_${productId}"]`);

                    if (checkbox && qtyInput) {
                        checkbox.checked = true;
                        qtyInput.value = Math.max(1, parseInt(qtyInput.value));
                        updateOrderSummary();

                        const productOption = checkbox.closest('.product-option');
                        productOption.style.backgroundColor = 'var(--honey-cream)';
                        setTimeout(() => {
                            productOption.style.backgroundColor = '';
                        }, 2000);
                    }
                }, 500);
            });
        });

        // Bestellsumme aktualisieren
        function updateOrderSummary() {
            let subtotal = 0;

            productCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const price = parseFloat(checkbox.dataset.price);
                    const product = PRODUCTS_DATA.find(p => p.name === checkbox.value);
                    const qtyInput = document.querySelector(`input[name="qty_${product.id}"]`);
                    const qty = parseInt(qtyInput.value) || 0;

                    subtotal += price * qty;
                }
            });

            const shippingCost = subtotal >= shipping.freeFrom ? 0 : shipping.cost;
            const total = subtotal + shippingCost;

            subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
            shippingEl.textContent = subtotal >= shipping.freeFrom ? 'kostenlos' : `€${shippingCost.toFixed(2)}`;
            totalEl.innerHTML = `<strong>€${total.toFixed(2)}</strong>`;

            if (subtotal >= shipping.freeFrom && subtotal < shipping.freeFrom + 0.5) {
                showNotification('🎉 Versandkostenfrei!', 'success');
            }
        }

        // Event Handlers
        productCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const product = PRODUCTS_DATA.find(p => p.name === this.value);
                const qtyInput = document.querySelector(`input[name="qty_${product.id}"]`);

                if (this.checked && parseInt(qtyInput.value) === 0) {
                    qtyInput.value = 1;
                } else if (!this.checked) {
                    qtyInput.value = 0;
                }

                updateOrderSummary();
            });
        });

        qtyInputs.forEach(input => {
            input.addEventListener('input', function() {
                const qty = parseInt(this.value) || 0;
                const productId = this.name.replace('qty_', '');
                const product = PRODUCTS_DATA.find(p => p.id === productId);
                const checkbox = document.querySelector(`input[value="${product.name}"]`);

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

            productCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const product = PRODUCTS_DATA.find(p => p.name === checkbox.value);
                    const qtyInput = document.querySelector(`input[name="qty_${product.id}"]`);
                    const qty = parseInt(qtyInput.value) || 0;

                    if (qty > 0) {
                        selectedProducts.push({
                            name: product.name,
                            price: product.price,
                            quantity: qty,
                            total: (product.price * qty).toFixed(2)
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
            const phone = formData.get('phone');
            const address = `${formData.get('street')}, ${formData.get('zip')} ${formData.get('city')}`;
            const notes = formData.get('notes');

            let emailBody = `Neue Honig-Bestellung für ${IMKEREI_CONFIG.business.name}\n`;
            emailBody += `Bestellung von: ${customerName}\n\n`;
            emailBody += `BESTELLTE PRODUKTE:\n==================\n`;

            let orderTotal = 0;
            selectedProducts.forEach(product => {
                emailBody += `${product.quantity}x ${product.name} à €${product.price.toFixed(2)} = €${product.total}\n`;
                orderTotal += parseFloat(product.total);
            });

            const shippingCost = orderTotal >= shipping.freeFrom ? 0 : shipping.cost;
            const finalTotal = orderTotal + shippingCost;

            emailBody += `\nZwischensumme: €${orderTotal.toFixed(2)}\n`;
            emailBody += `Versandkosten: ${shippingCost === 0 ? 'kostenlos' : '€' + shippingCost.toFixed(2)}\n`;
            emailBody += `GESAMTSUMME: €${finalTotal.toFixed(2)}\n\n`;

            emailBody += `KUNDENDATEN:\n=============\n`;
            emailBody += `Name: ${customerName}\nE-Mail: ${email}\nTelefon: ${phone || 'nicht angegeben'}\nLieferadresse: ${address}\n\n`;

            if (notes) {
                emailBody += `BESONDERE WÜNSCHE:\n==================\n${notes}\n\n`;
            }

            emailBody += `Newsletter: ${formData.get('newsletter') ? 'Ja' : 'Nein'}\n`;
            emailBody += `Datum: ${new Date().toLocaleDateString('de-DE')}`;

            const subject = `Honig-Bestellung von ${customerName} - €${finalTotal.toFixed(2)}`;
            const mailtoLink = `mailto:${IMKEREI_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            window.location.href = mailtoLink;

            showNotification('📧 Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die Bestellung ab!', 'success');

            setTimeout(() => {
                orderForm.reset();
                updateOrderSummary();
            }, 2000);
        });

        updateOrderSummary();
    }, 500);
}

// HILFSFUNKTIONEN
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; z-index: 10000;
        background: ${type === 'success' ? 'var(--honey-gold)' : type === 'error' ? '#e74c3c' : 'var(--honey-amber)'};
        color: white; padding: 15px 25px; border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2); font-weight: 600;
        max-width: 350px; animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function showFullArticle(articleId) {
    const article = NEWS_DATA.find(a => a.id === articleId);
    if (!article) return;

    // Hier können Sie ein Modal oder eine separate Seite für den vollständigen Artikel implementieren
    alert(`Vollständiger Artikel: ${article.title}\n\n${article.content.replace(/<[^>]*>/g, '')}`);
}

// CSS Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .out-of-stock {
        opacity: 0.6;
    }
    .btn-disabled {
        background: #ccc !important;
        cursor: not-allowed !important;
        color: #666 !important;
    }
`;
document.head.appendChild(style);