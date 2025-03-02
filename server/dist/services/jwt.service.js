"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const util_1 = require("util");
const keys_1 = require("../keys");
const jwt = require('jsonwebtoken');
const signAsync = (0, util_1.promisify)(jwt.sign);
const verifyAsync = (0, util_1.promisify)(jwt.verify);
let JWTService = class JWTService {
    constructor(jwtSecret, jwtExpiresIn) {
        this.jwtSecret = jwtSecret;
        this.jwtExpiresIn = jwtExpiresIn;
    }
    async verifyToken(token) {
        if (!token) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token: 'token' is null`);
        }
        let userProfile;
        try {
            // decode user profile from token
            const decryptedToken = await verifyAsync(token, this.jwtSecret);
            // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
            userProfile = Object.assign({ id: '', name: '' }, { id: decryptedToken.id, name: decryptedToken.name });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token: ${error.message}`);
        }
        return userProfile;
    }
    async generateToken(userProfile) {
        if (!userProfile) {
            throw new rest_1.HttpErrors.Unauthorized('Error generating token: userProfile is null');
        }
        // Generate a JSON Web Token
        let token;
        try {
            token = await signAsync(userProfile, this.jwtSecret, {
                expiresIn: this.jwtExpiresIn,
            });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error encoding token: ${error}`);
        }
        return token;
    }
};
exports.JWTService = JWTService;
exports.JWTService = JWTService = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(keys_1.TokenServiceBindings.TOKEN_SECRET)),
    tslib_1.__param(1, (0, context_1.inject)(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN)),
    tslib_1.__metadata("design:paramtypes", [String, String])
], JWTService);
//# sourceMappingURL=jwt.service.js.map