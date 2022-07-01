import { reload } from './randomMichi.js';
import { reloadFavorites } from './getFavorites.js';
import { addFavorites } from './postFavorites.js';
import { deleteMichi } from './deleteMichi.js';
import { showFiles } from './updateMichis.js';

const d = document;
const $dropArea = d.querySelector('.drop-area');
const $drapText = $dropArea.querySelector('h2');
const $button = $dropArea.querySelector('button');
const $input = $dropArea.querySelector('#input-file');

let files;

d.addEventListener('DOMContentLoaded', e => {
    reload();
    reloadFavorites();
});

d.addEventListener('click', e => {

    if(e.target.matches('.container-btns__btn')) reload();

    if(e.target.matches('.add')) addFavorites(e.target.id);

    if(e.target.matches('.delete')) deleteMichi(e.target.id);

    if(e.target === $button) $input.click();
});

$input.addEventListener('change', e => {
    files = $input.files;
    $dropArea.classList.add("active");
    showFiles(files);
    $dropArea.classList.remove("active");
});

$dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    $dropArea.classList.add("active");
    $drapText.textContent = 'Suelta para subir los archivos';
});

$dropArea.addEventListener('dragleave', e => {
    e.preventDefault();
    $dropArea.classList.remove("active");
    $drapText.textContent = 'Arrastra y suelta tus Michis';

});

$dropArea.addEventListener('drop', e => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    $dropArea.classList.remove("active");
});

