"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getAllPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatientsData = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (!patient) {
        throw new Error(`Patient with id: "${id}" does not exist`);
    }
    return patient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getAllPatients,
    getNonSensitivePatientsData,
    getPatientById,
    addPatient,
};
