import { createReadStream } from 'fs';
import { GridFSBucket } from 'mongodb';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL="mongodb+srv://Meet:1234@projecttrangsir.mhn6lqo.mongodb.net/TarangSir?retryWrites=true&w=majority";
MongoClient.connect(MONGO_URL)
    .then(async(client) => {
            console.log('Connected to MongoDB');
            const db = client.db('TarangSir');
            const bucket = new GridFSBucket(db);

            const pdfStream = createReadStream('../public/notes/NEET_physics_notes.pdf');
            const uploadStream = bucket.openUploadStream('NEET_physics_notes.pdf');
            const existingFile = await db.collection('fs.files').findOne({filename:'NEET_physics_notes.pdf',});

            if (existingFile) {
                console.error('File with the same name already exists');
                return;
            }

            pdfStream.pipe(uploadStream);

            uploadStream.on('finish', () => {
                console.log('PDF file stored in MongoDB Atlas');
                client.close();
            })})
    .catch(err => console.error('Error connecting to MongoDB', err));
