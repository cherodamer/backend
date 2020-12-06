// Import the main express file as a function
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const initPassportStrategy = require('./passport-config');

// Invoke express
const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// Configure express to use passport
server.use(passport.initialize());

// confugure passport to use pasport-jwt
initPassportStrategy(passport);

const dbString = "mongodb+srv://admin:Kiptoo2012@cluster0.mog7x.mongodb.net/test?retryWrites=true&w=majority";

mongoose
    .connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log('db is connected')
        }
    )
    .catch(
        (error) => {
            console.log('db is NOT connected. An error occured.', error)
        }
    )


server.get(
    '/', // http://www.apple.com/
    (req, res) => {
        res.send("<h1>Welcome to Home</h1>")
    }
);

//User Route
server.use(
    '/users',
    UserRoutes

);

// Products route
server.use(
    '/products',
    passport.authenticate('jwt', {session: false}),
    ProductRoutes

);



server.get(
    '*',
    (req, res) => {
        res.send('<h1>404</h1>')
    }
);


// Connects a port number on the server
server.listen(
    3001, 
    ()=>{
        console.log('server is running on http://localhost:3001');
    }
);




// server.get(
//     '/',
//     (req, res) => {
//         res.send("<h1>Welcome</h1>")
//     }
// );

// server.get(
//     '/about',
//     (req, res) => {
//         res.send("<h1>About</h1>")
//     }
// );
// server.get(
//     '/contact',
//     (req, res) => {
//         res.send("<h1>Contact Us</h1>")
//     }
// );
// server.get(
//     '/privacy-policy',
//     (req, res) => {
//         res.send("<h1> view Privacy Policy</h1>")
//     }
// );
// server.get(
//     '/products',
//     (req, res) => {
//         res.send("<h1>Our Products</h1>")
//     }
// );

// server.get(
//     '*',
//     (req, res) => {
//         res.send("<h1>404</h1>")
//     }
// );
