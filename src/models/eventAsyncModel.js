const pool = require('../config/dbPromise');

async function getAllEvents() {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM events');
        return rows;
    } catch (err) {
        console.error('Error getting events:', err);
        throw err;
    }

}
async function getEventById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
        return rows[0];
    } catch (err) {
        console.error('Error getting event:', err);
        throw err;
    }


}

async function getEventsByName(name) {
    try {
        const [row] = pool.query('SELECT * FROM events WHERE title = ?', [name]);
        return row[0];
    } catch (err) {
        console.error('Error getting events:', err);
        throw err;
    }

}

async function getEventsByPartialName(name) {
    try{
        const [rows] = await pool.query('SELECT * FROM events WHERE title LIKE ?', [`%${name}%`]);
        return rows;
    }catch(err){
        console.error('Error getting events:', err);
        throw err;
    }
    
}

async function addEvent(event) {
    const { title, date, location, description, category, time, pet_allowed, organizer } = event;
    try {
        const [result] = await pool.query('INSERT INTO events (title, date, location, description,category,time,pet_allowed,organizer) VALUES (?,?,?, ?, ?,?,?,?)',
            [title, date, location, description, category, time, pet_allowed, organizer]);
        return result.insertId;
    } catch (err) {
        console.error('Error adding event:', err);
        throw err;
    }
}
module.exports = {
    getAllEvents,
    getEventsByName,
    getEventsByPartialName,
    getEventById,
    addEvent

};
