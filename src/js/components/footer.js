import getRefs from '../refs/get-refs';
import presentationHbs from "../../templates/presentation.hbs";

const refs = getRefs();

refs.futerClick.addEventListener('click', renderPresentation);

function renderPresentation() {
    refs.renderPresentation.innerHTML = presentationHbs();
    refs.cardEvent.innerHTML ='';   
}