import eventsListTpl from '../../templates/card-list.hbs';
import createsDownloadList from '../utils/img-render-list';
import getRefs from '../refs/get-refs';

const refs = getRefs();

const API_KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP';
const BASE_URL = 'https://app.ticketmaster.com';

async function fetchCountryCode(countryCode) {
    const event = await fetch(`${BASE_URL}/discovery/v2/events.json?countryCode=${countryCode}&source=universe&apikey=${API_KEY}`)
    if (!event.ok) {
       throw event;
       }
   const response = await event.json();
   console.log(response);
   return response._embedded.events;
}

// рендер списку концертів відповідно до країни

function renderCountriesList(events) {
    refs.renderPresentation.innerHTML = '';
    const newFetchEventList = createsDownloadList(events);
    
    const renderCard = eventsListTpl(newFetchEventList);
    refs.cardEvent.innerHTML = renderCard;
}

refs.button.addEventListener('click', onListOfCountriesClick);

function onListOfCountriesClick(e) {
    e.preventDefault();

    const furtherCountrySearch = e.target;
    const furtherCountryCode = furtherCountrySearch.getAttribute("name")
    console.log(furtherCountryCode);
    fetchCountryCode(furtherCountryCode)
    .then(renderCountriesList)
    .catch(error => {
        console.log(error);
    });
}


