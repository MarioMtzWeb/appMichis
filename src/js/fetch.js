export const asyncFetch = async (url, config) => {
        const res = await fetch(url, config);
        const data = await res.json();

        if(!res.ok) throw {
            status: res.status,
            message: res.statusText
        };

        return data;
}