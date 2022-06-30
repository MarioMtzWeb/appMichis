import { reload } from './randomMichi.js';
import { reloadFavorites } from './getFavorites.js';
import { addFavorites } from './postFavorites.js';
import { deleteMichi } from './deleteMichi.js';
const d = document;

d.addEventListener('DOMContentLoaded', e => {
    reload();
    reloadFavorites();
});

d.addEventListener('click', e => {

    if(e.target.matches('.container-btns__btn')) reload();

    if(e.target.matches('.add')) addFavorites(e.target.id);


    if(e.target.matches('.delete')) deleteMichi(e.target.id);

});
