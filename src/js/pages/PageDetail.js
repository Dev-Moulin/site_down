import { API_KEY } from "../config.js";
import { createLoader, showLoader, hideLoader } from "../utils/loader.js";

const PageDetail = (argument = '') => {
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, '_');

        const displayGame = (gameData) => {
            const { name, released, description } = gameData;
            const articleDOM = document.querySelector(".page-detail .article");
            articleDOM.innerHTML = `
                <h1>${name}</h1>
                <p>Release date: ${released}</p>
                <p>${description}</p>
            `;
            hideLoader(); // Masque le loader après avoir affiché les détails
        };

        const fetchGame = (url, argument) => {
            showLoader(); // Affiche le loader avant de commencer la requête

            fetch(`${url}/${argument}?key=${API_KEY}`)
                .then((response) => response.json())
                .then((gameData) => {
                    displayGame(gameData);
                });
        };

        fetchGame('https://api.rawg.io/api/games', cleanedArgument);
    };

    const render = () => {
        createLoader(); // Assure que le loader est ajouté au DOM
        document.querySelector("#pageContent").innerHTML = `
            <section class="page-detail">
                <div class="article"></div>
            </section>
        `;
        preparePage();
    };

    render();
};

export default PageDetail;
