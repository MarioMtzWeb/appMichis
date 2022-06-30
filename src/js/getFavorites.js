import { asyncFetch } from "./fetch.js";
import { API_URL , API_KEY} from "./api.js";

const d = document;

const $containerMichis = d.querySelector('.michis-favoritos');
const $fragment = d.createDocumentFragment();

let settings = {
    "method": "GET",
    "headers": {
      "x-api-key": `${API_KEY}`
    }
}

export const reloadFavorites = async () => {

    const data = await asyncFetch(`${API_URL}/favourites`, settings);

    data.map(el => {
        const $figure = d.createElement('figure');
        const $img = d.createElement('img');
        const $button = d.createElement('button');
        
        $figure.classList.add('card-michi');
        $img.classList.add('img-randomMichi');
        $button.classList.add('btn-randomMichi__btn');
        $button.classList.add('delete');
        
        $figure.appendChild($img);
        $figure.appendChild($button);
        
        $button.textContent = '🗑️';
        $img.src = el.image.url;
        $button.id = el.id;
        $button.title = 'Delete Cat';

        $fragment.appendChild($figure);
    });

    $containerMichis.innerHTML = '';
    $containerMichis.appendChild($fragment);
};