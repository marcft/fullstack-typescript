"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
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
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const isArray = (param) => {
    return Array.isArray(param);
};
const isEntry = (param) => {
    if (!param || typeof param !== 'object') {
        return false;
    }
    return true;
};
const parseEntries = (entries) => {
    if (!isArray(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    for (const entry of entries) {
        if (!isEntry(entry)) {
            throw new Error('Incorrect entries');
        }
    }
    return entries;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        return {
            name: parseString(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: 'entries' in object ? parseEntries(object.entries) : [],
        };
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.default = toNewPatient;
