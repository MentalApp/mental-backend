const express = require('express');
const env = require('dotenv');

env.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Connected"
    })
})
app.listen(PORT, (res) => {
    console.log(`App listening on port ${PORT}`);
})