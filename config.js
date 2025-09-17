// ===================================================
// HAUPTKONFIGURATION - IMKEREI TRINKAUS
// ===================================================
const IMKEREI_CONFIG = {
    // GRUNDDATEN
    business: {
        name: "Imkerei Trinkaus",
        owner: "Max Trinkaus", 
        slogan: "Natürlicher Honig aus der Region seit 1995",
        founded: "1995",
        description: "Seit über 25 Jahren führen wir unsere Imkerei mit Leidenschaft und Respekt vor der Natur."
    },

    // KONTAKTDATEN - Hier alles zentral pflegen!
    contact: {
        street: "Musterstraße 123",
        zip: "12345",
        city: "Musterstadt", 
        phone: "+49 (0) 123 456789",
        email: "info@imkerei-trinkaus.de",
        website: "https://imkereitrinkaus.github.io/Imkerei-trinkaus",
        fullAddress: function() {
            return `${this.street}, ${this.zip} ${this.city}`;
        }
    },

    // ÖFFNUNGSZEITEN
    hours: {
        weekdays: "Mo-Fr: 9:00-18:00 Uhr",
        saturday: "Sa: 9:00-14:00 Uhr", 
        sunday: "So: Geschlossen",
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
        experience: "25+",
        hives: "45", 
        honeyPerYear: "1500kg"
    },

    // VERSAND & SHOP
    shipping: {
        cost: 4.90,
        freeFrom: 30.00,
        deliveryTime: "2-3 Werktage",
        paymentMethods: "Rechnung, Überweisung"
    },

    // SOCIAL MEDIA (leer lassen wenn nicht vorhanden)
    social: {
        facebook: "", // z.B. "https://facebook.com/imkerei.trinkaus"
        instagram: "", // z.B. "https://instagram.com/imkerei_trinkaus"
        youtube: "", // z.B. "https://youtube.com/@imkereitrinkaus"
    },

    // BILDER - Optimale Größen für beste Performance
    images: {
        logo: "trinkaus-logo.png", // 200x200px, PNG mit transparentem Hintergrund
        heroImage: "hero-honey.jpg", // 800x600px, JPG, max 150KB
        aboutImage: "imker-portrait.jpg", // 600x400px, JPG, max 100KB
        favicon: "favicon.ico" // 32x32px, ICO Format
    }
};
