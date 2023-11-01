const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'bigbluedog',
    cookie: {
        // Session will automatically expire in 10 minutes
        expires: 10 * 60 * 1000
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up the view engine and views directory
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Define the SQL query to create the database if it doesn't exist
const createDatabaseSQL = `
    CREATE DATABASE IF NOT EXISTS tech_blog_db;
`;

// Create the database and then sync Sequelize models
sequelize.query(createDatabaseSQL)
    .then(() => {
        console.log('Database created or already exists.');
        // Continue with syncing Sequelize models
        return sequelize.sync({ force: false });
    })
    .then(() => {
        app.listen(PORT, () => console.log('Now listening'));
    })
    .catch(err => {
        console.error('Error creating database or syncing Sequelize:', err);
    });

app.use(routes);
