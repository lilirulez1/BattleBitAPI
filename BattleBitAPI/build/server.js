"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = require("./api");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '/build/public')));
app.get('/main.js', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/public', 'main.js'));
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/public', 'homepage.html'));
});
app.get('/server-browser', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/public', 'server_browser.html'));
});
app.get('/server', (req, res) => {
    const name = req.query.name;
    if (typeof name === 'string') {
        (0, api_1.getServerByName)(name).then(Server => {
            if (Server !== undefined) {
                res.send(Server);
            }
            else {
                res.status(400).send("Server does not exist.");
            }
        });
    }
    else {
        res.status(400).send("Invalid name provided.");
    }
});
app.get('/servers', (req, res) => {
    (0, api_1.getServerJson)().then(Data => {
        res.send(Data);
    });
});
app.get('/overview', (req, res) => {
    (0, api_1.getServerJson)().then(Data => {
        let totalPlayers = 0;
        let officialServers = 0;
        let day = 0;
        let night = 0;
        let maps = [];
        let gamemodes = [];
        let regions = [];
        Data.forEach(Server => {
            totalPlayers += Server.Players;
            officialServers += Server.IsOfficial ? 1 : 0;
            day += (Server.DayNight === "Day") ? 1 : 0;
            night += (Server.DayNight === "Night") ? 1 : 0;
            const existingMap = maps.find(server => server.Map === Server.Map);
            if (existingMap) {
                existingMap.Players += Server.Players;
                existingMap.Servers += 1;
                existingMap.Day += (Server.DayNight === "Day") ? 1 : 0;
                existingMap.Night += (Server.DayNight === "Night") ? 1 : 0;
            }
            else {
                maps.push({
                    Map: Server.Map,
                    Players: Server.Players,
                    Day: (Server.DayNight === "Day") ? 1 : 0,
                    Night: (Server.DayNight === "Night") ? 1 : 0,
                    Servers: 1
                });
            }
            const existingGamemode = gamemodes.find(server => server.Gamemode === Server.Gamemode);
            if (existingGamemode) {
                existingGamemode.Players += Server.Players;
                existingGamemode.Servers += 1;
            }
            else {
                gamemodes.push({
                    Gamemode: Server.Gamemode,
                    Players: Server.Players,
                    Servers: 1
                });
            }
            const existingRegion = regions.find(server => server.Region === Server.Region);
            if (existingRegion) {
                existingRegion.Players += Server.Players;
                existingRegion.Servers += 1;
            }
            else {
                regions.push({
                    Region: Server.Region,
                    Players: Server.Players,
                    Servers: 1
                });
            }
        });
        res.send({
            "server-count": Data.length,
            "player-count": totalPlayers,
            "official-servers": officialServers,
            "unofficial-servers": Data.length - officialServers,
            "maps": maps,
            "gamemodes": gamemodes,
            "regions": regions,
            "day": day,
            "night": night
        });
    });
});
app.get('/images', (req, res) => {
    var file = req.query.path;
    file = file.split('/');
    var Image = path_1.default.join(__dirname, '/public', 'images', file[0], file[1]);
    res.sendFile(Image, function (err) {
        if (err) {
            console.log(err);
            res.sendFile(path_1.default.join(__dirname, '/public', 'images', "404.png"));
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
