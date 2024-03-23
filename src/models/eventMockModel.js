const { events } = require('../mock/eventMock');
function getEventsByName(name) {
    return events.find(event => event.title === name);
}

function getEventsByPartialName(name) {
    return events.filter(event => event.title.includes(name));
}

function getAllEvents() {
    return events;
}

function addEvents(event) {
    events.push(event);
}
module.exports = {  
    getEventsByName,
    getEventsByPartialName,
    getAllEvents,
    addEvents
};