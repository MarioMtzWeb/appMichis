import { asyncFetch } from "./fetch.js";
import { reloadFavorites } from "./getFavorites.js";
import { API_URL , API_KEY} from "./api.js";

export const addFavorites = async (idImage) => {
    const data = await asyncFetch(`${API_URL}/favourites`, {
        "method": "POST",
        "headers": {
            "x-api-key": `${API_KEY}`,
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            image_id: idImage,
        })
    });
    
    reloadFavorites();
}

