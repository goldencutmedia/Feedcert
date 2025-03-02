import {RequestBodyObject, SchemaObject} from '@loopback/rest';

export const UserProfileSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: {type: 'string'},
        email: {type: 'string'},
        name: {type: 'string'},
    },
};

const CredentialsSchema: SchemaObject = {
    type: 'object',
    required: ['id', 'password'],
    properties: {
      id: {type: 'string'}, // ID ist ein String (z. B. ObjectID)
      password: {type: 'string'}, // Passwort ist ein String
      userId: {type: 'string'}, // UserID ist ein String (z. B. ObjectID)
    },
  };
  
  export const CredentialsRequestBody: RequestBodyObject = {
    description: 'The input of login function',
    required: true,
    content: {
      'application/json': {
        schema: CredentialsSchema,
      },
    },
  };