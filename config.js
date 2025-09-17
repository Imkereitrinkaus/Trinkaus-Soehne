// ===================================================
// HAUPTKONFIGURATION - IMKEREI TRINKAUS
// ===================================================
const IMKEREI_CONFIG = {
    // GRUNDDATEN
    business: {
        name: "Trinkaus & Söhne",
        owner: "Björn Trinkaus", 
        slogan: "Honig aus Witten-Heven und der Region seit 2016",
        founded: "2016",
        description: "Seit fast 10 Jahren führen wir unsere Imkerei mit Leidenschaft und Respekt vor der Natur."
    },

    // KONTAKTDATEN - Hier alles zentral pflegen!
    contact: {
        street: "Am Stämmsich Busch 32",
        zip: "58455",
        city: "Witten", 
        phone: "+49 (0) 176 21712753",
        email: "info@imkerei-trinkaus.de",
        website: "https://imkereitrinkaus.github.io/Imkerei-trinkaus",
        fullAddress: function() {
            return `${this.street}, ${this.zip} ${this.city}`;
        }
    },

    // ÖFFNUNGSZEITEN
    hours: {
        weekdays: "Mo-Fr: nach tel. Vereinbarung",
        saturday: "Sa: nach tel. Vereinbarung", 
        sunday: "So: Haustürgeschäft nach Vereinbarung",
        display: function() {
            return `${this.weekdays}<br>${this.saturday}`;
        }
    },

    // RECHTLICHE DATEN
    legal: {
        ustId: "DE123456789", // Ihre echte USt-ID
        chamber: "Landwirtschaftskammer Baden-Württemberg",
        country: "Deutschland"
    },

    // STATISTIKEN
    stats: {
        experience: "~10",
        hives: "15", 
        honeyPerYear: "300kg"
    },

    // VERSAND & SHOP
    shipping: {
        cost: 6,90,
        freeFrom: 30.00,
        deliveryTime: "2-3 Werktage",
        paymentMethods: "Rechnung, Überweisung"
    },

    // SOCIAL MEDIA (leer lassen wenn nicht vorhanden)
    social: {
 
    },

    // BILDER - Optimale Größen für beste Performance
    images: {
        logo: "trinkaus-logo.png", // 200x200px, PNG mit transparentem Hintergrund
        heroImage: "hero-honey.jpg", // 800x600px, JPG, max 150KB
        aboutImage: "imker-portrait.jpg", // 600x400px, JPG, max 100KB
        favicon: "favicon.ico" // 32x32px, ICO Format
    }
};
