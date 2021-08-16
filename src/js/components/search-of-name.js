import ApiServise from '../services/services';
import { showAlert, showError } from '../utils/pnotify';
import createsDownloadList from '../utils/img-render-list';
import eventsListTpl from '../../templates/card-list.hbs';
import getRefs from '../refs/get-refs';

const refs = getRefs();

const apiServise = new ApiServise();

refs.butnModal.addEventListener('click', onSearchOfName);

async function onSearch() {
    try {
    const events = await apiServise.fetchEvent({})

    if(!events.length) {
        //   тут треба вивести помилку пошуку
        return showError('no results were found for this request')
    }

    renderEventList(events);
   
    } catch (error) {
        fetchError();
  }


}

function renderEventList(events) {
    refs.renderPresentation.innerHTML = '';
    const newFetchEventList = createsDownloadList(events);
    refs.cardEvent.innerHTML = eventsListTpl(newFetchEventList);
    
}

function fetchError(error) {
    
    showError('no results were found for this request')
}

function onSearchOfName(e){
 
    if(e.target.classList.contains("modal-btn")){
     apiServise.query = e.target.getAttribute("name");
     refs.backdrop.classList.add("backdrop--hiden");
     refs.body.classList.remove('body-scroll-stop');
     onSearch()
    }
     }
     
 
