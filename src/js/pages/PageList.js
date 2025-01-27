import { API_KEY } from "../config.js";

const PageList = (argument = '') => {
    const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, '-');

      const displayResults = (articles) => {
        const resultsContent = articles.map((article) => {
          return (
            `<article class="cardGame" data-id="${article.id}">
              <img src="${article.background_image}" alt="Image de couverture du jeu alt="${article.name}" class="card-image">
              <h1>${article.name}</h1>
              <h2>${article.released}</h2>
              <button class="more-info">Plus d'info</button>
            </article>`
          );
        });

        const resultsContainer = document.querySelector('.page-list .articles');
        resultsContainer.innerHTML = resultsContent.join("\n");

        // On sélectionne tous les articles (cardGame)
        const cardGames = document.querySelectorAll('.cardGame');

        cardGames.forEach(card => {
            // On ajoute un EventListener sur chaque card pour observer le "click"
            card.addEventListener('click', (event) => {
                // On récupère l'id du jeu sur la card
                const articleId = event.currentTarget.dataset.id;
                // On redirige vers la page du détail
                window.location.hash = `pagedetail/${articleId}`;
            })
        })

      };

      const fetchList = (url, argument) => {
          const finalURL = argument ? `${url}&search=${argument}` : url;
          fetch(finalURL)
              .then((response) => response.json())
              .then((responseData) => {
                  displayResults(responseData.results);
              });
      };

      fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
    };

    const render = () => {
      document.querySelector('#pageContent').innerHTML = `
            <section class="page-list">
                <div class="articles">Loading...</div>
            </section>
        `;
      preparePage();
    };

    render();
};

export default PageList;