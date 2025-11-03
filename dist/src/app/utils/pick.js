"use strict";
//['page','limit','sortBy','sortOrder']
Object.defineProperty(exports, "__esModule", { value: true });
/*

    const filters = pick(req.query, appointmentFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

*/
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.default = pick;
