"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientsData());
});
router.get('/:id', (req, res) => {
    try {
        const patient = patientService_1.default.getPatientById(req.params.id);
        res.send(patient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(404).send(errorMessage);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, toNewPatient_1.default)(req.body);
        const response = patientService_1.default.addPatient(newPatient);
        res.json(response);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService_1.default.getPatientById(req.params.id);
        const newEntry = (0, toNewEntry_1.default)(req.body);
        const response = patientService_1.default.addEntryToPatient(newEntry, patient);
        res.json(response);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
