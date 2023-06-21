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
app.get('/images', (req, res) => {
    var file = req.query.path;
    file = file.split('/');
    res.sendFile(path_1.default.join(__dirname, '/public', 'images', file[0], file[1]));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//190-J8-02
