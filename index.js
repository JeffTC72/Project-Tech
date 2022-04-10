//Express setup
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
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

    const card = await Card.find({}).populate("character1 character2 character3").lean();

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

    const card = await Card.find({}).populate("character1 character2 character3").lean();

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

    const chars = await Game.find({}).lean();

    res.status(200).render('add-games', {
        page: page,
        chars:chars,
    });
});

app.post('/profile/add-game', (req, res) => {
    const input = req.body;
    const form = {
        game: input.game,
        character1: input.char1,
        character2: input.char2,
        character3: input.char3,
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
    const chars = await Game.find({}).lean();
	
	// console.log(user);
	res.status(200).render('edit-games', { 
		page: page,
		card: card,
        chars: chars,
        cardchar1: card.character1,
        cardchar2: card.character2,
        cardchar3: card.character3,
	});
});

app.post('/profile/edit-game/:id', async(req, res) => {
    const input = req.body;

    await Card.findByIdAndUpdate(req.params.id, {
        character1: input.char1,
        character2: input.char2,
        character3: input.char3,
        rank: input.rank,
        hoursplayed: input.hoursplayed,
    }).exec();

    console.log(input.char3);

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