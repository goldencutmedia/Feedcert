import { SecuritySchemeObject, ReferenceObject } from '@loopback/openapi-v3';
export declare const OPERATION_SECURITY_SPEC: {
    jwt: never[];
}[];
export type SecuritySchemeObjects = {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};
export declare const SECURITY_SCHEME_SPEC: SecuritySchemeObjects;
