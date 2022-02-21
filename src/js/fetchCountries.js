export { fetchCountries };
const BASE_URL = 'https://restcountries.com/v3.1';
// const searchParams = new URLSearchParams({
//     fields: "name,capital,population,flags,languages",
// });

function fetchCountries(nameCoutry) {
    return fetch(`${BASE_URL}/name/${nameCoutry}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
    });
}