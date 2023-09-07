import axios from 'axios';
const baseUrl = process.env.VUE_APP_BASE_URL;
async function GetContacts() {
  return await axios.get( baseUrl + '/api/contact/get');
}

async function GetBy_ID(id) {
    return await axios.get( baseUrl + '/api/contact/search/id/' + id);
}

async function AddContact(contact) {
    return await axios.post( baseUrl + '/api/contact/add', contact);
}

async function UpdateContact(contact) {
    return await axios.put( baseUrl + '/api/contact/update/' + contact.id, contact);
}

async function SoftDeleteContact(id) {
    return await axios.put( baseUrl + '/api/contact/soft_delete/' + id);
}

async function HardDeleteContact(id) {
    return await axios.delete( baseUrl + '/api/contact/hard_delete/' + id);
}

export  { GetContacts, GetBy_ID, AddContact, UpdateContact, SoftDeleteContact, HardDeleteContact };