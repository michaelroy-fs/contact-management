// create a test for the contact api from ../controller/contact_controller/crud.js
// test the contact api for the following:
// 1. create a contact
// 2. get all contacts
// 3. get a contact by id
// 4. update a contact by id
// 5. delete a contact by id

const request = require('supertest');
const app = require('../app.js');
const Contact = require('../models/contact');

describe('Test Jest Hello World', () => {
    test('this should get a "Hello World from ROUTES.JS!"',()=>{
        return request(app).get('/api').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('Hello World from ROUTES.JS!');
        })
    })
});

describe('Test Contact API', () => {
    //* This will test the get all non-deleted contacts
    test('this should get all contacts',()=>{
        return request(app).get('/api/contact/get').then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
    //* This will test the get all deleted contacts
    test('this should get all deleted contacts',()=>{
        return request(app).get('/api/contact/get_deleted').then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
    //* This will test the add contact
    test('this should create a contact',()=>{
        return request(app).post('/api/contact/add').send({
            name: 'qweqweqweqwe',
            email: 'test@gmail.com',
            address: 'Test Address',
            contact_no: '09090909090'
        }).then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('Contact added successfully');
            //* This Deletes the contact that was just added
            request(app).get('/api/contact/get').then(response => {
                let hard_delete_id = response.body[response.body.length-1].id;
                if(hard_delete_id>1){
                    request(app).delete(`/api/contact/hard_delete/${hard_delete_id}`).then(response => {
                        expect(response.statusCode).toBe(200);
                        expect(response.text).toBe('Contact Deleted successfully');
                    })
                }
            })
        })
    })
    //* This will test the update contact
    test('this should update a contact',()=>{
        return request(app).put('/api/contact/update/1').send({
            name: 'Test Change',
            email: 'change@gmail.com',
            address: 'Test Change',
            contact_no: '09090909090'
        }).then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('Contact updated successfully');
        })
    })
    //* This will test the soft delete contact
    test('this should soft delete a contact',()=>{
        return request(app).put('/api/contact/soft_delete/1').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('Contact Deleted successfully');
        })
    })
});