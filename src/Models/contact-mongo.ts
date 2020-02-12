import mongoose from 'mongoose'

interface Contact extends mongoose.Document{
    Fname: String;
    Lname: String;
    Email: String;
    Phone: String;
    Created: Date;
    Updated: Date;
}

const ContactSchema = new mongoose.Schema({
    Fname: String,
    Lname: String,
    Email: String,
    Phone: String,
    Created: Date,
    Updated:Date
})

export default mongoose.model<Contact>('contact_details', ContactSchema)
