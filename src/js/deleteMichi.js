import { asyncFetch } from "./fetch.js";
import { API_URL , API_KEY} from "./api.js";
import { reloadFavorites } from "./getFavorites.js";


export const deleteMichi = async (id) => {
    const data = await asyncFetch(`${API_URL}/favourites/${id}`, {
            "method": "DELETE",
            "headers": {
                "x-api-key": `${API_KEY}`,
                "content-type": "application/json"
            },
    });
    reloadFavorites();
}