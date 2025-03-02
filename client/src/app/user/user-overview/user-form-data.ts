/*
  username;
  firstname: string;
  lastname: string;
  id: string;
  company: Company;
  role?: {
    id: string;
    description: string;
  };
 */

export const USER_FORM_DATA = {
  fields: [
    {
      type: 'text',
      name: 'username',
      label: 'Benutzername',
      span: 2,
      readOnly: true,
      disabled: true
    },
    {
      type: 'text',
      name: 'company',
      label: 'Goete Partner',
      span: 4,
      readOnly: true,
      disabled: true
    },
    {
      type: 'text',
      name: 'firstname',
      label: 'Vorname',
      span: 1
    },
    {
      type: 'text',
      name: 'lastname',
      label: 'Nachname',
      span: 1
    },
    {
      type: 'text',
      name: 'email',
      label: 'E-Mail Adresse',
      span: 4
    },
    {
      type: 'subtitle',
      label: 'Berechtigungen'
    },
    {
      type: 'chips',
      name: 'roles',
      label: 'Rolle',
      options: [
        {
          label: 'Standardbenutzer',
          value: 'STANDARD'
        },
        {
          label: 'Taskforcebenutzer',
          value: 'TASKFORCE'
        },
        {
          label: 'Administrator',
          value: 'ADMIN'
        }
      ],
      span: 2
    },
  ],
  buttons: ['DELETE', 'SAVE']
};
