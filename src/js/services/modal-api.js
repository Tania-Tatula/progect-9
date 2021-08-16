const API_KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP';
const BASE_URL = 'https://app.ticketmaster.com';
export default class eventApi {
    constructor() {
        this.id = '';
    }

    async fetchEvent() {
        const event = await fetch(`https://newsuperserver.herokuapp.com/${BASE_URL}/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
     if (!event.ok) {
        throw event;
        }
    const response = await event.json();
    console.log(response);
    return response;
    }
    
    get query() {
        return this.id;
    }
    set query(newQuery) {
        this.id = newQuery;
    }
}