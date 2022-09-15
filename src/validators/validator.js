const mongoose = require("mongoose")

const isValidShortName = function (value) {
    if (
        typeof value === "string" &&
        value.trim().length > 0 &&
        /^[a-z]*$/.test(value)
    )
        return true;
    return false;
};

const isValidLink = function (value) {
    if (typeof value === "string" &&
        value.trim().length > 0 &&
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/.test(value)
    )
        return true;
    return false;
};

const isValidBody = function (body) {
    return Object.keys(body).length > 0;
};

const isValidFullName = function (value) {
    if (
        typeof value === "string" &&
        value.trim().length > 0 &&
        /^[a-zA-Z, ]*$/.test(value)

    )
        return true;
    return false;
};

const isValidEmail = function (email) {
    if (
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
    ) return true;
    return false
};

const isValidMobile = function (mobile) {
    if (
        /^[0-9]{10}$/.test(mobile)
    ) return true;
    return false;
};

const isValidObjectId = function (id) {
    return mongoose.isValidObjectId(id)
};

const isValidObject = function (object) {
    if (typeof object === "object" && object !== null && object !== undefined) return true;
    return false;
};

const isValidArray = function (array) {
    if (array.length > 0 && array !== null && array !== undefined) return true;
    return false;
};

module.exports = {
    isValidShortName,
    isValidLink,
    isValidBody,
    isValidFullName,
    isValidEmail,
    isValidMobile,
    isValidObjectId,
    isValidObject,
    isValidArray
}