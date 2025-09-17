// ===================================================
// NEWS INDEX - ÜBERSICHT ALLER ARTIKEL
// ===================================================
const NEWS_INDEX = [
    {
        id: "schwarmzeit-2024",
        title: "Erfolgreiche Schwarmzeit 2024",
        excerpt: "Dieses Jahr konnten wir 8 neue Bienenvölker durch natürliche Schwärme gewinnen. Erfahren Sie mehr über unsere Schwarmfangmethoden...",
        date: "2024-09-15",
        category: "Bienenpflege",
        image: "news-schwarmzeit.jpg",
        featured: true,
        author: "Max Trinkaus",
        readTime: "3 min",
        tags: ["Schwarm", "Völkervermehrung", "Imkerei"],
        status: "published", // published, draft, archived
        file: "news/schwarmzeit-2024.js"
    },
    {
        id: "sommerernte-2024",
        title: "Reiche Sommerernte dank gutem Wetter",
        excerpt: "Der warme Sommer bescherte uns eine außergewöhnlich gute Honigernte. Über 400kg bester Blütenhonig konnten wir einfahren...",
        date: "2024-08-28",
        category: "Ernte",
        image: "news-honig-ernte.jpg",
        featured: false,
        author: "Max Trinkaus",
        readTime: "4 min",
        tags: ["Ernte", "Honig", "Sommer"],
        status: "published",
        file: "news/sommerernte-2024.js"
    },
    {
        id: "bienenschutz-projekt-2024",
        title: "Neues Bienenschutzprojekt gestartet",
        excerpt: "Gemeinsam mit der Gemeinde haben wir ein Blühstreifen-Projekt initiiert. 5 Hektar neue Bienenweide entstehen...",
        date: "2024-07-10",
        category: "Umweltschutz",
        image: "news-bienenschutz.jpg",
        featured: false,
        author: "Max Trinkaus",
        readTime: "2 min",
        tags: ["Umweltschutz", "Blühstreifen", "Gemeinde"],
        status: "published",
        file: "news/bienenschutz-projekt-2024.js"
    },
    {
        id: "imkerkurs-herbst-2024",
        title: "Imkerkurs für Anfänger - Anmeldung offen",
        excerpt: "Ab Oktober bieten wir wieder unseren beliebten Anfängerkurs an. 8 Termine mit Theorie und Praxis...",
        date: "2024-06-22",
        category: "Bildung",
        image: "news-imkerkurs.jpg",
        featured: false,
        author: "Max Trinkaus",
        readTime: "3 min",
        tags: ["Kurs", "Anfänger", "Bildung"],
        status: "archived", // Wird automatisch ins Archiv verschoben
        file: "news/imkerkurs-herbst-2024.js"
    },
    {
        id: "fruehjahrsarbeiten-2024",
        title: "Frühjahrsarbeiten in der Imkerei",
        excerpt: "Der Frühling ist da und unsere Bienen erwachen aus der Winterruhe. Zeit für die ersten wichtigen Arbeiten am Bienenstand...",
        date: "2024-03-15",
        category: "Bienenpflege",
        image: "news-fruehjahr.jpg",
        featured: false,
        author: "Max Trinkaus",
        readTime: "5 min",
        tags: ["Frühling", "Völkerkontrolle", "Bienenpflege"],
        status: "archived", // Älter als 6 Monate → Archiv
        file: "news/fruehjahrsarbeiten-2024.js"
    },
    {
        id: "wintervorbereitung-2023",
        title: "Bienen fit für den Winter machen",
        excerpt: "Die kalte Jahreszeit steht vor der Tür. Jetzt heißt es, unsere Bienenvölker optimal auf den Winter vorzubereiten...",
        date: "2023-11-08",
        category: "Bienenpflege",
        image: "news-winter.jpg",
        featured: false,
        author: "Max Trinkaus",
        readTime: "6 min",
        tags: ["Winter", "Völkerpflege", "Varroa"],
        status: "archived",
        file: "news/wintervorbereitung-2023.js"
    }
];

// Funktionen für News-Verwaltung
const NewsManager = {
    // ⭐ NUR DIE LETZTEN 2 AKTUELLEN NEWS ANZEIGEN
    getCurrentNews: function(limit = 2) {  // ← Geändert von 3 auf 2
        const current = NEWS_INDEX
            .filter(news => news.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
        return current;
    },

    // Archivierte News (alle anderen published + archived)
    getArchivedNews: function() {
        const published = NEWS_INDEX
            .filter(news => news.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(2); // Alles nach den ersten 2

        const archived = NEWS_INDEX
            .filter(news => news.status === 'archived')
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        return [...published, ...archived];
    },

    // Alle veröffentlichten News
    getAllPublishedNews: function() {
        return NEWS_INDEX
            .filter(news => news.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // News nach Kategorie
    getNewsByCategory: function(category) {
        return NEWS_INDEX
            .filter(news => news.category === category && news.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // News nach Tags
    getNewsByTag: function(tag) {
        return NEWS_INDEX
            .filter(news => news.tags.includes(tag) && news.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // Einzelne News laden
    loadNewsArticle: async function(newsId) {
        const newsItem = NEWS_INDEX.find(news => news.id === newsId);
        if (!newsItem) return null;

        try {
            // Dynamisch die News-Datei laden
            const module = await import(`./${newsItem.file}`);
            return {
                ...newsItem,
                content: module.ARTICLE_CONTENT
            };
        } catch (error) {
            console.error(`Fehler beim Laden des Artikels ${newsId}:`, error);
            return null;
        }
    }
};