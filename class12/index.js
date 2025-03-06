const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to log request details
app.use((req, res, next) => {
    console.log("I am a middleware");
    console.log("Method:", req.method);
    console.log("Protocol:", req.protocol);
    console.log("Host:", req.get('host'));
    console.log("Original URL:", req.originalUrl);
    next(); // Pass control to the next middleware or route handler
});

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Node with Express</h1>');
});

app.get('/about', (req, res) => {
    res.json({ name: "Nehal" });
});

app.post('/login', (req, res) => {
    console.log(req.body);
    console.log("User:", req.body.user);
    console.log("Email:", req.body.email);
    res.send("User login successfully");
});

// Start server
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
