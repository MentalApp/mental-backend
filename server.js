
const express = require('express');
const env = require('dotenv');
const consumerInit = require('./worker/consumer');
const cors = require('cors');
env.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Connected"
    })
});

require('./routers/admin/auth.routes')(app);
require("./routers/admin/user.routes")(app);
require("./routers/admin/test.routes")(app);
require("./routers/admin/officer_test.routes")(app);

require('./routers/guest/auth.routes')(app);
require("./routers/guest/officer_test.routes")(app);
require("./routers/guest/test.routes")(app);

app.listen(PORT, (res) => {
    
    console.log(`App listening on port ${PORT}`);
})

const initWorkerService = async () => await consumerInit();

initWorkerService();