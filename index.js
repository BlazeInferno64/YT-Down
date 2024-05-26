const express = require('express');
const app = express();
const path = require("path");
const PORT = 8000;

const apiRoute = require("./routes/routes");

var customHeaders = (req, res, next) => {
    res.set("X-Powered-By", "YT-Down Servers");
    next();
}

app.enable("trust proxy")

app.use("/api", apiRoute)

app.use(express.static(path.join(__dirname, "public")))

app.all("*", customHeaders);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.all("*",(req, res) => {
    res.status(404).send(`404 not found!`);
})


app.listen(PORT, () => {
    console.log(`Server is live at port: ${PORT}`)
})