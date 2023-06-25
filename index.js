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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const headers = {
    'accept-encoding': 'gzip',
    'cache-control': 'no-cache',
    connection: 'Keep-Alive',
    'content-type': 'application/json',
    product: 'llu.android',
    version: '4.7',
};
const api_endpoint = 'https://api-eu.libreview.io';
const email = "jakob.research@gmail.com";
const password = process.env.PASSWORD;
const setToken = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = { email, password };
    const response = yield fetch(api_endpoint + '/llu/auth/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(loginData)
    });
    const data = yield response.json();
    const jwt_token = data['data']['authTicket']['token'];
    headers.authorization = 'Bearer ' + jwt_token;
});
const getPatientId = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(api_endpoint + '/llu/connections', {
        method: 'GET',
        headers: headers
    });
    const data = yield response.json();
    const id = data['data'][0]['patientId'];
    return id;
});
const getPatientData = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(api_endpoint + "/llu/connections/" + patientId + "/graph", {
        method: 'GET',
        headers: headers
    });
    const data = yield response.json();
    const glucoseMeasurement = data['data']['connection']['glucoseMeasurement'];
    const graphData = data['data']['graphData'];
    console.log(graphData);
    console.log(glucoseMeasurement);
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        throw new Error("Password environment variable not set");
    }
    yield setToken(email, password);
    const patient_id = yield getPatientId();
    yield getPatientData(patient_id);
});
main();
