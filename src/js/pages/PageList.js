import { API_KEY } from "../config.js";
import { createLoader, showLoader, hideLoader } from "../utils/loader.js";

const PageList = (argument = '') => {
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');

        const displayResults = (articles) => {
            const resultsContent = articles.map((article) => `
                <article class="cardGame" data-id="${article.id}">
                    <img src="${article.background_image}" alt="Image de couverture du jeu ${article.name}" class="card-image">
                    <h1>${article.name}</h1>
                    <h2>${article.released}</h2>
                    <button class="more-info">Plus d'info</button>
                </article>
            `).join('');

            const resultsContainer = document.querySelector('.page-list .articles');
            resultsContainer.innerHTML = resultsContent;

            document.querySelectorAll('.cardGame').forEach(card => {
              card.addEventListener('click', (event) => {
                const articleId = event.currentTarget.dataset.id;
                window.location.hash = `pagedetail/${articleId}`;
              });
            });

            hideLoader(); // Masque le loader une fois les articles chargés
        };

        const fetchList = (url, argument) => {
            showLoader(); // Affiche le loader avant de commencer la requête

            const delayPromise = new Promise((resolve) => {
                setTimeout(() => resolve(), 1000); // Simule un délai de 1.5s
            });

            const fetchPromise = fetch(url + (argument ? `&search=${argument}` : ''))
                .then((response) => response.json());

            Promise.all([fetchPromise, delayPromise]).then(([responseData]) => {
                displayResults(responseData.results);
            });
        };

        fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
    };

    const render = () => {
        createLoader(); // Assure que le loader est ajouté au DOM
        document.querySelector('#pageContent').innerHTML = `
            <section class="page-list">
                <div class="articles"></div>
            </section>
        `;
        preparePage();
    };

    render();
};

export default PageList;
