const wineRoutes = (app, fs) => {

    const _ = require('lodash');
    const dataPath = './data/wines.json';

    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    app.get('/wines', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if(err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });

    app.get('/wines/:lotCode', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if(err) {
                throw err;
            }
            const stats = JSON.parse(data);
            const wineInfo = stats.find(wine => wine.lotCode === req.params.lotCode);
            if (!wineInfo) {
              const err = new Error('Wine not found');
              err.status = 404;
              throw err;
            }
            res.json(wineInfo);
        });
    });

    app.get('/getYearBreakdown/:lotCode', (req, res) => {
        readFile(data => { 
            const wineInfo = data.find(wine => wine.lotCode === req.params.lotCode);
            let breakDownObject = { breakDownType: "year" };
            let component = wineInfo.components;
            let uniqueComponents =  _.uniqBy(component, function(p){ return p.year; });
            let orderedComponents = _.sortBy(uniqueComponents, o => o.percentage).reverse();
            let pickComponents  = _.map(orderedComponents, o => _.pick(o, ['percentage', 'year']));
            let renameKeyComponents = pickComponents.map(({year,...rest}) => ({key:year,...rest}));
            breakDownObject.breakDown = renameKeyComponents;
            res.json(breakDownObject);
        },
            true);
    });

    app.get('/getVarietyBreakdown/:lotCode', (req, res) => {
        readFile(data => { 
            const wineInfo = data.find(wine => wine.lotCode === req.params.lotCode);
            let breakDownObject = { breakDownType: "variety" };
            let component = wineInfo.components;
            let uniqueComponents =  _.uniqBy(component, function(p){ return p.variety; });
            let orderedComponents = _.sortBy(uniqueComponents, o => o.percentage).reverse();
            let pickComponents  = _.map(orderedComponents, o => _.pick(o, ['percentage', 'variety']));
            let renameKeyComponents = pickComponents.map(({variety,...rest}) => ({key:variety,...rest}));
            breakDownObject.breakDown = renameKeyComponents;
            res.json(breakDownObject);
        },
            true);
    });

    app.get('/getRegionBreakdown/:lotCode', (req, res) => {
        readFile(data => { 
            const wineInfo = data.find(wine => wine.lotCode === req.params.lotCode);
            let breakDownObject = { breakDownType: "region" };
            let component = wineInfo.components;
            let uniqueComponents =  _.uniqBy(component, function(p){ return p.region; });
            let orderedComponents = _.sortBy(uniqueComponents, o => o.percentage).reverse();
            let pickComponents  = _.map(orderedComponents, o => _.pick(o, ['percentage', 'region']));
            let renameKeyComponents = pickComponents.map(({region,...rest}) => ({key:region,...rest}));
           breakDownObject.breakDown = renameKeyComponents;
           res.json(breakDownObject);
        },
            true);
    });

    app.get('/getYearAndVarietyBreakdown/:lotCode', (req, res) => {
        readFile(data => { 
            const wineInfo = data.find(wine => wine.lotCode === req.params.lotCode);
            let breakDownObject = { breakDownType: "year and variety" };
            let component = wineInfo.components;
            let uniqueComponents =  _.uniqBy(component, function(p){ return p.year && p.variety; });
            let orderedComponents = _.sortBy(uniqueComponents, o => o.percentage).reverse();
            let pickComponents  = _.map(orderedComponents, o => _.pick(o, ['percentage', 'year', 'variety']));
            pickComponents.map((item) => {
                let key = item.year + ' ' + item.variety;
                return item.key = key
            });
            breakDownObject.breakDown = pickComponents;
            res.json(breakDownObject);
        },
            true);
    });
};

module.exports = wineRoutes;