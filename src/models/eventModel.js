const conn = require('../config/db');

function getAllEvents(callback) {
    const result = conn.query('SELECT * FROM events', (err, results) => {
        if (err) {
            console.error('Error getting events:', err);
            return callback(err, null);
            
        }
        return callback(null, results);
    });
}

function getEventsByName(name, callback) {
    const sql = 'SELECT * FROM events WHERE title = ?';
    conn.query(sql, [name], (err, results) => {
        if (err) {
            console.error('Error getting events by name:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}

function getEventsByPartialName(name, callback) {
    const sql = 'SELECT * FROM events WHERE title LIKE ?';
    conn.query(sql, ['%' + name + '%'], (err, results) => {
        if (err) {
            console.error('Error getting events by partial name:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}
function getEventById(id, callback) {
    const sql = 'SELECT * FROM events WHERE id = ?';
    conn.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error getting event by id:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}
function addEvents(event, callback) {
    const sql = 'INSERT INTO events (title, date, location, description,category,time,pet_allowed,organizer) VALUES (?,?,?, ?, ?,?,?,?)';
    conn.query(sql, [event.title, event.date, event.location, event.description,event.category,event.time,event.petAllowed,event.organizer], (err, results) => {
        if (err) {
            console.error('Error adding event:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}

module.exports = {  
    getEventsByName,
    getEventsByPartialName,
    getAllEvents,
    getEventById,
    addEvents
};