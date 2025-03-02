import { RequestBodyObject } from '@loopback/rest';
export declare const UserProfileSchema: {
    type: string;
    required: string[];
    properties: {
        id: {
            type: string;
        };
        email: {
            type: string;
        };
        name: {
            type: string;
        };
    };
};
export declare const CredentialsRequestBody: RequestBodyObject;
