//create class with name contact email and adress

class Contact {
    constructor(id,name, email, address, contact_no,update_date,create_date,deleted_date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.contact_no = contact_no;
        this.update_date = update_date;
        this.create_date = create_date;
        this.deleted_date = deleted_date;
    }
}

module.exports = Contact;
