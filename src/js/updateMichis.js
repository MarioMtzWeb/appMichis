import { asyncFetch } from './fetch.js';
import { addFavorites } from './postFavorites.js';
import { API_URL, API_KEY } from './api.js';
const d = document;

export function showFiles(files) {
    
    //Si solo el un elemento
    if(files.length === undefined) {
        
        processFile(files);
    } else {
        //Recorremos todo el arreglo si son muchas imagenes
        for(let file of files){

            processFile(file);
        }
    }
}

function processFile(file) {
    
    //Veo de que tipo archivo
    const docType = file.type;
    
    //Tipos de datos aceptados
    const validExtension = [
        'image/jpeg',
        'image/jpg',
        'image/ṕng', 
        'image/gif'
    ];

    if(validExtension.includes(docType)){
        //Archivo valido
        //console.log("Archivo valido :D", file);
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', e => {
            //console.log(id);
            const fileUrl = fileReader.result;
            const image = `
                <div id="${id}" class="file-container">
                    <img src="${fileUrl}" alt="${file.name}" />
                    <div>
                        <span>${file.name}</span>
                        <span class="status-text">
                            Loading...
                        </span>
                    </div>
                </div>
            `; 

            const html = d.querySelector(".preview").innerHTML;
            d.querySelector('.preview').innerHTML = image + html;
        });

        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    } else {
        //Archivo no valido
        d.querySelector('.drop-area').insertAdjacentHTML('afterend', `
            <div class="file-error failure">
                <span>"Archivo no valido"</span>
            </div>
        `)

        setTimeout(() => {
            d.querySelector('.file-error').remove();
        }, 3000);
    }
}

async function uploadFile(file, id) {
    const formData = new FormData();
    formData.append("file", file);
    try{
        const res = await asyncFetch(`${API_URL}/images/upload`, {
            method: 'POST',
            headers: {
                'X-API-KEY': `${API_KEY}`
            },
            body: formData
        });

        const res2 = await addFavorites(res.id);

        d.querySelector(`#${id} .status-text`).innerHTML =  `
            <span class="success"> Archivo Subido correctamente...</span>
        `;

    }catch(e){

        d.querySelector(`#${id} .status-text`).innerHTML =  `
            <span class="failure"> El archivo no se pudo subir...</span>
        `;
    } finally{ 

        setTimeout(() => {
            d.querySelector('.file-container').remove();
        }, 5000);
    }
}