const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//import crud function from contact_controller
const contact_controller = require('./controller/Contact_Controller/crud.js');
router.get('/', (req, res) => {
    res.send('Hello World from ROUTES.JS!');
})
router.use('/contact',contact_controller)
module.exports = router;