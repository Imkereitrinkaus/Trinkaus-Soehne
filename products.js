// ===================================================
// PRODUKTE KONFIGURATION
// ===================================================
const PRODUCTS_DATA = [
    {
        id: "bluetenhonig",
        name: "Blütenhonig",
        price: 8.50,
        size: "500g Glas",
        description: "Mild-aromatischer Honig von verschiedenen Blüten unserer Region. Perfekt zum Süßen von Tee oder aufs Brot.",
        image: "blueten-honig.jpg", // 400x300px, JPG, max 50KB
        inStock: true,
        featured: true
    },
    {
        id: "waldhonig", 
        name: "Waldhonig",
        price: 9.50,
        size: "500g Glas",
        description: "Kräftiger Honig aus dem heimischen Wald - reich an Mineralstoffen und mit würzigem Aroma.",
        image: "wald-honig.jpg", // 400x300px, JPG, max 50KB
        inStock: true,
        featured: false
    },
    {
        id: "akazienhonig",
        name: "Akazienhonig", 
        price: 10.50,
        size: "500g Glas",
        description: "Heller, milder Honig - perfekt für Kinder und Honig-Einsteiger. Kristallisiert sehr langsam.",
        image: "akazien-honig.jpg", // 400x300px, JPG, max 50KB
        inStock: true,
        featured: false
    },
    {
        id: "rapshonig",
        name: "Rapshonig",
        price: 8.00, 
        size: "500g Glas",
        description: "Cremiger, heller Honig mit mildem Geschmack. Naturbelassen und kalt geschleudert.",
        image: "rapshonig.jpg", // 400x300px, JPG, max 50KB
        inStock: true,
        featured: false
    },
    {
        id: "lindenhonig",
        name: "Lindenhonig",
        price: 11.00,
        size: "500g Glas", 
        description: "Aromatischer Honig mit charakteristischem Geschmack. Besonders beliebt bei Kennern.",
        image: "lindenhonig.jpg", // 400x300px, JPG, max 50KB
        inStock: false, // Ausverkauft
        featured: false
    },
    {
        id: "wabenhonig",
        name: "Wabenhonig",
        price: 15.00,
        size: "Wabenstück ca. 300g",
        description: "Honig direkt aus der Wabe - ein besonderes Erlebnis mit natürlichem Wachs zum Kauen.",
        image: "wabenhonig.jpg", // 400x300px, JPG, max 50KB
        inStock: true,
        featured: true
    }
];