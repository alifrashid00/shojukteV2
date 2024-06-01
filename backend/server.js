import express from 'express';
import authRoutes from './routes/auth.routes.js';
import connectTOMongoDB from './db/connectTOMongoDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import { app, server } from './socket/socket.js';
import dotenv from 'dotenv';
dotenv.config();

//shahi

import path from 'path';
import { fileURLToPath } from 'url';
import fileupload from 'express-fileupload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let initial_path = path.join(__dirname, 'public');

app.use(express.static(initial_path));
app.use(fileupload());
//

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

//shahi
app.get('/event', (req, res) => {
    res.sendFile(path.join(initial_path, 'home.html'));
});
app.get('/discussions', (req, res) => {
    res.sendFile(path.join(initial_path, 'discussions.html'));
});
app.get('/anime', (req, res) => {
    res.sendFile(path.join(initial_path, 'anime.html'));
});
app.get('/games', (req, res) => {
    res.sendFile(path.join(initial_path, 'games.html'));
});
app.get('/technology', (req, res) => {
    res.sendFile(path.join(initial_path, 'technology.html'));
});
app.get('/qna', (req, res) => {
    res.sendFile(path.join(initial_path, 'qna.html'));
});
app.get('/study', (req, res) => {
    res.sendFile(path.join(initial_path, 'study.html'));
});

app.get('/upcommingEvents', (req, res) => {
    res.sendFile(path.join(initial_path, 'upcommingEvents.html'));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, 'editor.html'));
});

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let uploadPath = path.join('backend/public', 'uploads', imagename);

    // create upload
    file.mv(uploadPath, (err, result) => {
        if (err) {
            throw err;
        } else {
            // our image upload path
            res.json(`uploads/${imagename}`);
        }
    });
});

app.get('/:blog', (req, res) => {
    res.sendFile(path.join(initial_path, 'blog.html'));
});

app.use((req, res) => {
    res.json('404');
});

server.listen(5000, () => {
    connectTOMongoDB();
    console.log('server running on 5000');
});
