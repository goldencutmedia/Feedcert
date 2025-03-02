"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = validateCredentials;
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Email
    if (!credentials.id || credentials.id.length <= 0) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid userid');
    }
    // Validate Password Length
    if (!credentials.password || credentials.password.length <= 0) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid password');
    }
}
//# sourceMappingURL=validator.service.js.map