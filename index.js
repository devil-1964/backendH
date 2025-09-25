const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const offerRoutes=require("./routes/offerRoute")
const leadsRoutes=require("./routes/leadsRoute")
const scoreRoutes=require("./routes/scoreRoute")
const downloadRoutes=require("./routes/downloadRoute")

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/test", (req, res) => {
    res.render('test');
});




app.use('/offer', offerRoutes);
app.use('/leads', leadsRoutes);
app.use('/', scoreRoutes);
app.use("/download", downloadRoutes);




app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 


