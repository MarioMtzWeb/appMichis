import { asyncFetch } from "./fetch.js";
import { API_URL } from "./api.js";

const d = document;
const queryParameters = [
    '?limit=4',
].join('');

const $containerMichis = d.querySelector('.containerMichis');
const $fragment = d.createDocumentFragment();

export const reload = async () => {
    try{
        const data = await asyncFetch(`${API_URL}/images/search${queryParameters}`);

        data.map(el => {
            const $figure = d.createElement('figure');
            const $img = d.createElement('img');
            const $button = d.createElement('button');
            const $name = d.createElement('h3');
            
            $figure.classList.add('card-michi');
            $img.classList.add('img-randomMichi');
            $button.classList.add('btn-randomMichi__btn');
            $button.classList.add('add');
            
            $figure.appendChild($img);
            $figure.appendChild($button);
            
            $button.textContent = '⭐';
            $img.src = el.url;
            $button.id = el.id;
            $button.title = 'Add Favorites'

            $fragment.appendChild($figure);
        });

        $containerMichis.innerHTML = '';
        $containerMichis.appendChild($fragment);

    }catch(e){
        let message = e.message || "Ocurrio un error";

        $containerMichis.innerHTML = `<h2 class="title error">${message} : ${e.status}</h2>`;   
    }
    
}