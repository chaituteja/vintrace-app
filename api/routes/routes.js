const wineRoutes = require('./wines')
const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('Welcome to Wines API Server');
    });

    wineRoutes(app, fs);
};

module.exports = appRouter;