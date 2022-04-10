//Express setup
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fetch = require('node-fetch');
const mongoose = require('mongoose');


// Connecting DB
require('dotenv').config();
const db = require('./config/db');
db();


// Models
// let User = require('./models/User');
let Game = require('./models/Game');
let Card = require('./models/Card');


//Body Parser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Template engine
const { engine } = require('express-handlebars');
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
}));
app.set('view engine', 'hbs');
app.set("views", "./views");
app.use('/public', express.static(path.join(__dirname, 'public')));


//**********//
// **PAGES**//
//**********//


// Feature menu
app.get('/', (req, res) => {
    const page = {
        title: "Feature Menu"
    };

    res.status(200).render('index', {
        page: page,
    });
});


// Profile page as owner
app.get('/profile', async (req, res) => {
    const user = "testuser";
    const page = {
        title: "My Profile"
    };

    const card = await Card.find({}).lean();

    res.status(200).render('profile', {
        page: page,
        user: user,
        card: card,
    });
});

// Profile page as guest
app.get('/viewprofile', async (req, res) => {
    const user = "testuser";
    const page = {
        title: `${user}'s Profile`
    };

    const card = await Card.find({}).lean();

    res.status(200).render('viewprofile', {
        page: page,
        user: user,
        card: card,
    });
});


// Add game card
app.get('/profile/add-game', async(req, res) => {
    const page = {
        title: "New Game"
    };

    const api_url = `https://jefftc72.github.io/Data/games.json`;
    const response = await fetch(api_url);
    const chars = await response.json();

    res.status(200).render('add-games', {
        page: page,
        chars: chars,
    });
});

app.post('/profile/add-game', async(req, res) => {
    const api_url = `https://jefftc72.github.io/Data/games.json`;
    const response = await fetch(api_url);
    const chars = await response.json();
    
    const input = req.body;
    let char1img;
    let char2img;
    let char3img;

    chars.forEach(element => {
        if(element.character == input.char1){
            char1img = element.img
            
        }
    });
    chars.forEach(element => {
        if(element.character == input.char2){
            char2img = element.img
            
        }
    });
    chars.forEach(element => {
        if(element.character == input.char3){
            char3img = element.img
            
        }
    });
    
    const form = {
        game: input.game,
        character1: input.char1,
        character2: input.char2,
        character3: input.char3,
        character1img: char1img,
        character2img: char2img,
        character3img: char3img,
        rank: input.rank,
        hoursplayed: input.hoursplayed,
    };

    const card = new Card(form);

    card.save((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/profile');
        }
    });
});


// Edit / Delete game cards
app.get('/profile/edit-game/:id', async(req, res) => {
    const page = {
		title: "Edit Game"
	};
	
	const card = await Card.findById(req.params.id).populate("character1 character2 character3").lean();
    const api_url = `https://jefftc72.github.io/Data/games.json`;
    const response = await fetch(api_url);
    const chars = await response.json();
	
	// console.log(user);
	res.status(200).render('edit-games', { 
		page: page,
		card: card,
        chars: chars,
	});
});

app.post('/profile/edit-game/:id', async(req, res) => {
    const api_url = `https://jefftc72.github.io/Data/games.json`;
    const response = await fetch(api_url);
    const chars = await response.json();
    
    const input = req.body;
    let char1img;
    let char2img;
    let char3img;

    chars.forEach(element => {
        if(element.character == input.char1){
            char1img = element.img
            
        }
    });
    chars.forEach(element => {
        if(element.character == input.char2){
            char2img = element.img
            
        }
    });
    chars.forEach(element => {
        if(element.character == input.char3){
            char3img = element.img
            
        }
    });
    await Card.findByIdAndUpdate(req.params.id, {
        character1: input.char1,
        character2: input.char2,
        character3: input.char3,
        character1img: char1img,
        character2img: char2img,
        character3img: char3img,
        rank: input.rank,
        hoursplayed: input.hoursplayed,
    }).exec();

    res.redirect('/profile')
});

app.post('/profile/delete-game/:id', async(req,res) => {
    await Card.deleteOne({ _id: req.params.id }).lean();
    res.redirect('/profile')
});


//server start
app.listen(PORT, () => {
    console.log('server started')
});