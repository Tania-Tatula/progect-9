import EventsApiService from '../services/services.js';
const eventsApiService = new EventsApiService();
import eventsListTpl from '../../templates/card-list.hbs';
import createsDownloadList from '../utils/img-render-list';
import getRefs from '../refs/get-refs';

const refs = getRefs();
//import getPage from './get-page.js';

function onSearch() {
    try {
        fetchRefs();


    } catch (error) {}

}


onSearch()

function renderEventList(list) {
    const renderEventCard = eventsListTpl(list);
    refs.cardEvent.innerHTML = renderEventCard;
}


async function fetchRefs() {
    if (window.screen.availWidth >= 768 && window.screen.availWidth < 1280) {
        eventsApiService.changeSize(21);
    } else {
        eventsApiService.changeSize(20);
    }

    refs.renderPresentation.innerHTML = '';
    const list = await eventsApiService.fetchEvent({});
    const newFetchEventList = createsDownloadList(list);
    renderEventList(newFetchEventList);
    //getPage(eventsApiService, '', true);
}

refs.logo.addEventListener ('click', openStartPages);

function openStartPages() {

    onSearch()
}
