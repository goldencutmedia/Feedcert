"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsRequestBody = exports.UserProfileSchema = void 0;
exports.UserProfileSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
    },
};
const CredentialsSchema = {
    type: 'object',
    required: ['id', 'password'],
    properties: {
        id: { type: 'string' }, // ID ist ein String (z. B. ObjectID)
        password: { type: 'string' }, // Passwort ist ein String
        userId: { type: 'string' }, // UserID ist ein String (z. B. ObjectID)
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': {
            schema: CredentialsSchema,
        },
    },
};
//# sourceMappingURL=user-controller.specs.js.map