import listCountry from './templates/list-country.hbs'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEll = document.querySelector('#search-box');
const ulList = document.querySelector('.country-list');
const divInfo = document.querySelector('.country-info');

inputEll.addEventListener('input', debounce(onSearch,DEBOUNCE_DELAY));

function onSearch(event) {
    const name = event.target.value.trim();
    
    if (!name) {
        return;
    }
    fetchCountries(name)
        .then(data => {
            if (data.length >= 10) {
                clerListCard();
                clearCardCountri();
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                
            } else if (data.length >= 2 && data.length <= 10) {
                
                createListCountry(data)
                clerListCard();
            } else if (data.length === 1) {
                clearCardCountri();
              return divInfo.insertAdjacentHTML('beforeend',createCardCountry(data)) 
                
            }
           
        }).catch(onFenchError);
}
 
function createCardCountry(data) {
    const { capital, flags, languages, name, population } = data[0]; 
    const capitalCities = capital.join(", "); 
    const languagesList = Object.values(languages).join(", "); 
    return `
                <div class="list_item">
                    <img class="flag"
                        src="${flags.png}"
                        alt="${name.common}"
                        width="100"
                    />
                    <h2 class="name">${name.official}</h2>
                </div>
                <p class="descrItem"><b><span class="description">Capital:</span></b> ${capitalCities}</p>
                <p class="descrItem"><b><span class="description">Population:</span></b> ${population}</p>
                <p class="descrItem"><b><span class="description">Languages:</span></b> ${languagesList}</p>
            `;
}

function createListCountry(data) {
    const markupList = listCountry(data);
    divInfo.innerHTML = markupList;
}

function onFenchError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

function clerListCard() {
    ulList.innerHTML = "";
}

function clearCardCountri() {
    divInfo.innerHTML = "";
}