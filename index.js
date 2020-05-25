const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const postsRouter = require('./routers/postsRouter');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
