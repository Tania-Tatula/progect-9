import './components/start-page';
import './components/search-of-name';
import './components/footer';
import createsDownloadList from './utils/img-render-list';
import EventsApiService from './services/services';
import eventsListTpl from '../templates/card-list.hbs';
import getRefs from './refs/get-refs';
import './components/modal';

import './services/choose-country-api';
import { showAlert, showError } from './utils/pnotify';


import startMarkUp from '../templates/pagination/startPagination.hbs';
import endMarkUp from '../templates/pagination/endPagination.hbs';
import standardMarkUp from '../templates/pagination/standardPagination.hbs';
import PageBlock from './components/pages.js';


const refs = getRefs();

const eventsApiService = new EventsApiService();

const pageControlBody = new PageBlock();

window.addEventListener('load', onStart);
refs.pagination.addEventListener('click', onClick);


refs.searchInput.addEventListener('submit', onSearch);
refs.searchInput.addEventListener('submit', onStart);

//window.addEventListener('resize', checkScreen);

function checkScreen() {
    if (window.screen.availWidth >= 768 && window.screen.availWidth < 1280) {
        eventsApiService.changeSize(21);
    } else {
        eventsApiService.changeSize(20);
    }
}

async function onSearch(e) {

    try {
        e.preventDefault();
        checkScreen();

        eventsApiService.query = e.currentTarget.elements.query.value;

        if (eventsApiService.query === '' || !eventsApiService.query.trim()) {
            //   тут треба вивести помилку пошуку
            return fetchError(error);
        }
        // await eventsApiService.resetPage();
        await eventsApiService.changePage(1);

        await clearEvents();

        const events = await eventsApiService.fetchEvent({})
        // console.log(events);
        if (events.query === '') {
            return showAlert('Specify your request')
         }
        if(!events.length) {
            //   тут треба вивести помилку пошуку
            return showError('no results were found for this request')
        }
        

      
        
        //  await renderEventList(events)
        refs.renderPresentation.innerHTML = '';
        const newFetchEventList = createsDownloadList(events);
        await renderEventList(newFetchEventList);


        //getPage(eventsApiService, eventsApiService.query, false)

    } catch (err) {        
        fetchError()
        // showAlert('Specify your request')
    }

}

function renderEventList(events) {
    eventsMarkup(events)
    
}

function eventsMarkup(events) {
    refs.cardEvent.insertAdjacentHTML('beforeend', eventsListTpl(events));
}

function clearEvents() {
    refs.cardEvent.innerHTML = '';
}

function fetchError(error) {
    
    showError('no results were found for this request')
}

function targetCheck(targetNumber) {
    if (pageControlBody.lastNumber < 8) {
        return;
    }
    if (targetNumber >= 5 && targetNumber < pageControlBody.lastNumber - 2) {
        pageControlBody.updatePageList(targetNumber - 1, targetNumber + 1);
        pageControlBody.updateMarkUp(standardMarkUp, true);

    } else if (targetNumber >= 5 && targetNumber >= pageControlBody.lastNumber - 2 && pageControlBody.currentNumber < pageControlBody.lastNumber - 2) {
        pageControlBody.updatePageList(pageControlBody.lastNumber - 5);
        pageControlBody.updateMarkUp(endMarkUp, false);

    } else if (targetNumber < 5 && pageControlBody.currentNumber >= 5) {
        pageControlBody.updatePageList(1, 5);
        pageControlBody.updateMarkUp(startMarkUp, true);
    }
}
async function nextEvents(page) {

    try {

        await clearEvents();
        eventsApiService.changePage(page);



        const events = await eventsApiService.fetchNextEvent({})


        if (events.length === 0) {
            //   тут треба вивести помилку пошуку
            return
        }

        //  await renderEventList(events)
        const newFetchEventList = createsDownloadList(events);
        //console.log(newFetchEventList)
        await renderEventList(newFetchEventList);

    } catch (err) {
        // console.log(err);
        //   тут треба вивести помилку запиту fetch

    }

}

function resultChecking(result) {

    if (result > 1000) {
        result = 1000;

    } else if (result < 20) {
        result = 1
        return;
    }

    if (window.screen.availWidth >= 768 && window.screen.availWidth < 1280) {
        result = Math.floor(result / 21);
    } else {
        result = Math.floor(result / 20);
    }

    //console.log(result)
    return result;

}

function onClick(event) {


    const isButtonClick = event.target.classList.contains("page-button");
    if (!isButtonClick) {
        return;
    }
    const targetPageNumber = Number(event.target.textContent);
    if (targetPageNumber === pageControlBody.currentNumber) {
        return;
    }
    pageControlBody.updateCurrentPage(event.target);
    if (pageControlBody.lastNumber < 8) {
        pageControlBody.updateCurrentNumber(targetPageNumber);
    }
    if (pageControlBody.lastNumber > 7) {

        targetCheck(targetPageNumber, pageControlBody);
        pageControlBody.updatePagination();
        const newPageList = document.querySelectorAll('.page-button');
        pageControlBody.findCurrentPage(targetPageNumber, newPageList);

    }

    nextEvents(pageControlBody.currentNumber);

}

async function onStart() {
    try {

        checkScreen();
        refs.pagination.innerHTML = '';
        const pageInfo = await eventsApiService.fetchPages();
        if (!pageInfo) {
            return
        }
        const pageNum = resultChecking(pageInfo);
        pageControlBody.updateLastPage(pageNum);

        pageControlBody.createPaginationBlock();
        // console.log(pageNum)

    } catch (err) {
        console.log(err);
    }
}