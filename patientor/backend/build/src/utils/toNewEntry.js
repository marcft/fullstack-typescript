"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (param) => {
    // With !param we also prevent param = ''
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing field');
    }
    return param;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const parseDiagnosisCodes = (array) => {
    if (!array || !Array.isArray(array)) {
        throw new Error('Incorrect diagnosis codes');
    }
    // We will just trust the data to be in correct format
    return array;
};
const isType = (param) => {
    const type = param;
    if (type === 'Hospital' ||
        type === 'OccupationalHealthcare' ||
        type === 'HealthCheck') {
        return true;
    }
    // TypeScript will warn us if there's a new type that is not handled
    ((_unreachable) => { })(type);
    return false;
};
const parseType = (type) => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing type');
    }
    return type;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (typeof healthCheckRating !== 'number' ||
        !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return healthCheckRating;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        throw new Error('Incorrect or missing sickLeave');
    }
    if ('startDate' in sickLeave && 'endDate' in sickLeave) {
        return {
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate),
        };
    }
    throw new Error('Incorrect data: some fields are missing');
};
const parseDischarge = (discharge) => {
    if (!discharge || typeof discharge !== 'object') {
        throw new Error('Incorrect or missing sickLeave');
    }
    if ('date' in discharge && 'criteria' in discharge) {
        return {
            date: parseDate(discharge.date),
            criteria: parseString(discharge.criteria),
        };
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewBaseEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object &&
        'date' in object &&
        'specialist' in object &&
        'type' in object) {
        return {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: parseType(object.type),
            diagnosisCodes: 'diagnosisCodes' in object
                ? parseDiagnosisCodes(object.diagnosisCodes)
                : [],
        };
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewHealthCheckEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    const baseEntry = toNewBaseEntry(object);
    if (baseEntry.type !== 'HealthCheck') {
        throw new Error('Not a HealthCheckEntry');
    }
    if ('healthCheckRating' in object) {
        return Object.assign(Object.assign({}, baseEntry), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewOccupationalHealthcareEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    const baseEntry = toNewBaseEntry(object);
    if (baseEntry.type !== 'OccupationalHealthcare') {
        throw new Error('Not a OccupationalHealthcareEntry');
    }
    if ('employerName' in object) {
        const entry = Object.assign(Object.assign({}, baseEntry), { employerName: parseString(object.employerName) });
        if ('sickLeave' in object) {
            return Object.assign(Object.assign({}, entry), { type: 'OccupationalHealthcare', sickLeave: parseSickLeave(object.sickLeave) });
        }
        return Object.assign(Object.assign({}, entry), { type: 'OccupationalHealthcare' });
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewHospitalEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    const baseEntry = toNewBaseEntry(object);
    if (baseEntry.type !== 'Hospital') {
        throw new Error('Not a HospitalEntry');
    }
    if ('discharge' in object) {
        return Object.assign(Object.assign({}, baseEntry), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('type' in object) {
        const entryType = parseType(object.type);
        switch (entryType) {
            case 'HealthCheck':
                return toNewHealthCheckEntry(object);
            case 'OccupationalHealthcare':
                return toNewOccupationalHealthcareEntry(object);
            case 'Hospital':
                return toNewHospitalEntry(object);
            default:
                ((value) => {
                    throw new Error(`Unhandled discriminated NewEntry type: ${value}`);
                })(entryType);
        }
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.default = toNewEntry;
