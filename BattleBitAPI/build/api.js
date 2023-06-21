"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerByName = exports.getServerJson = void 0;
function getServerJson() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://publicapi.battlebit.cloud/Servers/GetServerList");
        const response = yield res.json();
        return response;
    });
}
exports.getServerJson = getServerJson;
function getServerByName(Name) {
    return __awaiter(this, void 0, void 0, function* () {
        const Data = yield getServerJson();
        const FoundServer = Data.find(item => item.Name === Name);
        return FoundServer;
    });
}
exports.getServerByName = getServerByName;
