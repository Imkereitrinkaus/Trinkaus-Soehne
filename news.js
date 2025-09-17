// ===================================================
// NEWS & BLOG BEITRÄGE
// ===================================================
const NEWS_DATA = [
    {
        id: 1,
        title: "Erfolgreiche Schwarmzeit 2024",
        excerpt: "Dieses Jahr konnten wir 8 neue Bienenvölker durch natürliche Schwärme gewinnen. Erfahren Sie mehr über unsere Schwarmfangmethoden und wie wir unsere Völker vermehren...",
        content: `
            <p>Die Schwarmzeit 2024 war außergewöhnlich erfolgreich für unsere Imkerei. Durch aufmerksame Beobachtung und schnelles Handeln konnten wir insgesamt 8 natürliche Schwärme einfangen und zu neuen, gesunden Völkern entwickeln.</p>

            <h3>Was ist ein Bienenschwarm?</h3>
            <p>Ein Schwarm entsteht, wenn ein Bienenvolk zu groß wird und sich teilt. Die alte Königin verlässt mit etwa der Hälfte der Arbeiterinnen den Stock, um ein neues Zuhause zu finden.</p>

            <h3>Unsere Schwarmfang-Methoden</h3>
            <ul>
                <li>Schwarmfangkästen in optimaler Höhe (3-4 Meter)</li>
                <li>Lockstoffe aus alten Waben</li>
                <li>Schnelle Reaktion bei Schwarmalarmen</li>
            </ul>

            <p>Diese natürliche Vermehrung stärkt die Vitalität unserer Bienenvölker und trägt zur nachhaltigen Imkerei bei.</p>
        `,
        date: "2024-09-15",
        category: "Bienenpflege",
        image: "news-schwarmzeit.jpg", // 600x400px, JPG, max 80KB
        featured: true,
        author: "Max Trinkaus"
    },
    {
        id: 2,
        title: "Reiche Sommerernte dank gutem Wetter",
        excerpt: "Der warme Sommer bescherte uns eine außergewöhnlich gute Honigernte. Über 400kg bester Blütenhonig konnten wir einfahren...",
        content: `
            <p>Die diesjährige Sommerernte übertraf alle Erwartungen. Mit über 400 Kilogramm hochwertigem Blütenhonig können wir auf eine der besten Ernten der letzten Jahre zurückblicken.</p>

            <h3>Perfekte Bedingungen</h3>
            <p>Die Kombination aus ausreichend Regen im Frühjahr und sonnigen Sommertagen schuf ideale Bedingungen für eine reiche Blütentracht.</p>

            <h3>Qualität steht im Vordergrund</h3>
            <p>Trotz der Menge haben wir keine Abstriche bei der Qualität gemacht. Jeder Honig wird schonend kalt geschleudert und sorgfältig geprüft.</p>
        `,
        date: "2024-08-28", 
        category: "Ernte",
        image: "news-honig-ernte.jpg", // 600x400px, JPG, max 80KB
        featured: false,
        author: "Max Trinkaus"
    },
    {
        id: 3,
        title: "Neues Bienenschutzprojekt gestartet",
        excerpt: "Gemeinsam mit der Gemeinde haben wir ein Blühstreifen-Projekt initiiert. 5 Hektar neue Bienenweide entstehen...",
        content: `
            <p>Unser neues Bienenschutzprojekt nimmt Fahrt auf! In Zusammenarbeit mit der Gemeinde und lokalen Landwirten schaffen wir 5 Hektar neue Blühflächen.</p>

            <h3>Vielfältige Blütenpracht</h3>
            <p>Die Blühstreifen werden mit einer speziellen Mischung aus heimischen Wildblumen und Kräutern eingesät, die den Bienen von Frühjahr bis Herbst Nahrung bieten.</p>

            <h3>Gemeinsam für Bienen</h3>
            <p>Das Projekt zeigt, wie Imker, Landwirte und Gemeinde gemeinsam zum Schutz unserer Bienen beitragen können.</p>
        `,
        date: "2024-07-10",
        category: "Umweltschutz", 
        image: "news-bienenschutz.jpg", // 600x400px, JPG, max 80KB
        featured: false,
        author: "Max Trinkaus"
    },
    {
        id: 4,
        title: "Imkerkurs für Anfänger - Anmeldung offen",
        excerpt: "Ab Oktober bieten wir wieder unseren beliebten Anfängerkurs an. 8 Termine mit Theorie und Praxis...",
        content: `
            <p>Sie interessieren sich für die Imkerei? Unser Anfängerkurs vermittelt alle wichtigen Grundlagen für den Einstieg in dieses faszinierende Hobby.</p>

            <h3>Kursinhalte</h3>
            <ul>
                <li>Biologie der Honigbiene</li>
                <li>Völkerführung durchs Bienenjahr</li>
                <li>Honig ernten und verarbeiten</li>
                <li>Krankheiten erkennen und behandeln</li>
                <li>Praktische Arbeiten am Bienenstand</li>
            </ul>

            <h3>Kursdetails</h3>
            <p><strong>Start:</strong> Oktober 2024<br>
            <strong>Dauer:</strong> 8 Termine à 3 Stunden<br>
            <strong>Kosten:</strong> €120 pro Person<br>
            <strong>Anmeldung:</strong> ${IMKEREI_CONFIG.contact.email}</p>
        `,
        date: "2024-06-22",
        category: "Bildung",
        image: "news-imkerkurs.jpg", // 600x400px, JPG, max 80KB
        featured: false,
        author: "Max Trinkaus"
    }
];