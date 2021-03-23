const express = require('express');
const env = require('dotenv');
const dataAccess = require('./dataaccess/dataaccess');
env.config();

const app = express();
const PORT = process.env.PORT || 8080;

//#region router
const authRouter = require('./routers/auth.router');
//#endregion

//#region middleware
const authMiddleware = require('./middlewares/auth.middleware');
//#endregion

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Connected"
    })
});

// app.use('/admin/api', authMiddleware.authAdmin,);

app.use('/admin', authRouter);
app.use('/guest/api', authMiddleware.authGuest, authRouter);


app.listen(PORT, (res) => {
    console.log(`App listening on port ${PORT}`);
})