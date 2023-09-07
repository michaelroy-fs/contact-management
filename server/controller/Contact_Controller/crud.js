const router = require('express').Router();
const Contact = require('../../models/contact.js');
const fs = require('fs');
const moment = require('moment');
//create an api to add values in an array using the contact class
//* Add Contact to the JSON file
router.post('/add', (req, res) => {
    try {
        let {name,email,address,contact_no} = req.body;
        if([name,email,address,contact_no].includes(undefined)){
            throw {
                status: 400,
                object:{
                    message: 'Bad Request',
                    error: 'Incorrect payload'
                }
            }
        }
        let current_date = moment().format('YYYY-MM-DD HH:mm:ss');
        fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
            if (err) {
                throw {
                    status: 400,
                    object:{
                        message: 'Internal Server Error',
                        error: err
                    }
                }
            } else {
                let contacts = JSON.parse(data);
                let contact = new Contact(contacts.length + 1,name, email, address, contact_no,current_date ,current_date,null);
                contacts.push(contact);
                fs.writeFile('./database/contacts.json', JSON.stringify(contacts), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send('Contact added successfully');
                    }
                })
            }
        })
    } catch (error) {
        res.status(error.status).json(error.object)
    }
})

//Create an api to get all not deleted contacts from the JSON file
//* Get all contacts from the JSON file
router.get('/get', (req, res) => {
    fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            });
        } else {
            let contacts = JSON.parse(data).filter(c => c.deleted_date == null);
            res.send(contacts);
        }
    })
})

//create an api to get all soft deleted contacts from the JSON file
//* Get all soft deleted contacts from the JSON file
router.get('/get_deleted', (req, res) => {
    fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            });
        } else {
            let contacts = JSON.parse(data).filter(c => c.deleted_date !== null);
            res.send(contacts);
        }
    })
})

//Create an api to get a single contact from the JSON file
//* Get a single contact from the JSON file
router.get('/search/:props/:val', (req, res) => {
    const {props, val} = req.params;
    fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            });
        } else {
            let contacts = JSON.parse(data);
            let contact = contacts.find(c =>{
                let keys = Object.keys(c);
                if(keys.includes(props)){
                    if(['name','email','address'].includes(props)){
                        return c[props].toLowerCase().includes(val.toLowerCase())
                    }
                    else if(props==='contact_no'){
                        return c[props].includes(val)
                    }
                    else if(props==='id'){
                        return c[props]===+val
                    }
                    else{
                        return c[props]===val
                    }
                }
            });
            res.send(contact);
        }
    })
})

//Create an api to update a single contact from the JSON file
//* Update a single contact from the JSON file
router.put('/update/:id', (req, res) => {
   try {
    const id = +req.params.id;
    if(isNaN(id)){
        throw{
            status: 400,
            object:{
                message: 'Bad Request',
                error: 'Incorrect payload'
            }
        }
    }
    let {email,address,contact_no,name} = req.body;
    if([name,email,address,contact_no].includes(undefined)){
        throw {
            status: 400,
            object:{
                message: 'Bad Request',
                error: 'Incorrect payload'
            }
        }
    }
    else{
        let current_date = moment().format('YYYY-MM-DD HH:mm:ss');
    fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            });
        } else {
            let contacts = JSON.parse(data);
            let contact = contacts.find(c => c.id==id);
            contact.name = name;
            contact.email = email;
            contact.address = address;
            contact.contact_no = contact_no;
            contact.update_date = current_date;
            fs.writeFile('./database/contacts.json', JSON.stringify(contacts), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send('Contact updated successfully');
                }
            })
        }
    })
    }
   } catch (error) {
    res.status(error.status).json(error.object)
   }
})


//Create an api to soft delete a single contact from the JSON file
//* Soft delete a single contact from the JSON file
router.put('/soft_delete/:id', (req, res) => {
    try {
        const id = +req.params.id;
        if(isNaN(id)){
            throw{
                status: 400,
                object:{
                    message: 'Bad Request',
                    error: 'Incorrect payload'
                }
            }
        }
        let current_date = moment().format('YYYY-MM-DD HH:mm:ss');
        fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err
                });
            } else {
                let contacts = JSON.parse(data);
                let contact = contacts.find(c => c.id==id);
                contact.update_date = current_date;
                contact.deleted_date = current_date;
                fs.writeFile('./database/contacts.json', JSON.stringify(contacts), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send('Contact Deleted successfully');
                    }
                })
            }
        })
       } catch (error) {
        res.status(error.status).json(error.object)
       }
})

//Create an api to hard delete a single contact from the JSON file
//* Hard delete a single contact from the JSON file
router.delete('/hard_delete/:id', (req, res) => {
    try {
        const id = +req.params.id;
        if(isNaN(id)){
            throw{
                status: 400,
                object:{
                    message: 'Bad Request',
                    error: 'Incorrect payload'
                }
            }
        }
        fs.readFile('./database/contacts.json', 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err
                });
            } else {
                let contacts = JSON.parse(data);
                let contact = contacts.find(c => c.id==id);
                contacts.splice(contacts.indexOf(contact),1);
                fs.writeFile('./database/contacts.json', JSON.stringify(contacts), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send('Contact Deleted successfully');
                    }
                })
            }
        })
       } catch (error) {
        res.status(error.status).json(error.object)
       }
})




module.exports = router