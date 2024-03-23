const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    const id = req.query.id;
    const name = req.query.name || 'No name';
    const output = `id: ${id} and name: ${name}`;
    
    res.send(output);
  });
  //add path varialbe
  router.get('/:id/name/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    res.send(`id: ${id} and name: ${name}`);
  });
  
  
  router.post('/', (req, res) => {
    const obj = req.body;
    const id = obj.id;
    const name = obj.name;
    res.send(`id: ${id} and name: ${name}`);
  });
  
  module.exports = router;