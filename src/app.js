const express = require('express');

const app = express();

const path = require('path');

const port = process.env.PORT || 80;   // process env help at time of hosting, as we dont know what port no. will be alloted

const hbs = require('hbs');

// Static Files
const staticPath = path.join(__dirname, "../public");

// Views Directory
const view_path = path.join(__dirname, "../temp/views")

// Partial Path
const partial_path = path.join(__dirname, "../temp/partials")

// Tell express app  which Template Engine r u using
app.set("view engine", "hbs");

// We have to tell the path for views dir 
app.set("views", view_path);


// Register Partials
hbs.registerPartials(partial_path);

// built in middleWare
app.use(express.static(staticPath));

/* 
    Using static folders with nested routes in Node JS
    To access static files in subroutes in /about & /weather
*/

app.use('/about', express.static(path.join(__dirname, '../public')))

app.use('/weather', express.static(path.join(__dirname, '../public')))


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get('/weather', (req, res) => {
    res.render("weather")
})

app.get('*', (req, res) => {
    res.render("404error", {
        errorMsg: "Oooops! Page Not Found"
    });
})


app.listen(port, () => {
    console.log(`Server has satrted at port ${port}`);
})

