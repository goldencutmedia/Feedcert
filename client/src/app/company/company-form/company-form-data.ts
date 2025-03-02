// name: string;
// person: string;
// street: string;
// nr: string;
// postalcode: string;
// city: string;
// phone: string;
// fax: string;
// email: string;
// web: string;
//
// number: string;
//
// bioControlFacility: string;
// firstAudit: Date;
// certification: Date;
// nextAudit: Date;
// control: Date;

export const COMPANY_FORM_DATA = {
  fields: [
    {
      type: 'text',
      name: 'number',
      label: 'Kundennummer (wird vergeben)',
      span: 3,
      readOnly: true,
      disabled: true
    },
    {
      type: 'text',
      name: 'name',
      label: 'Name Unternehmen',
      span: 3,
      required: true
    },
    {
      type: 'subtitle',
      label: 'Kontaktdaten'
    },
    {
      type: 'text',
      name: 'person',
      label: 'Ansprechpartner',
      span: 6,
    },
    {
      type: 'text',
      name: 'street',
      label: 'Straße & Hausnummer',
      span: 2,
    },
    {
      type: 'text',
      name: 'postalcode',
      label: 'PLZ',
      span: 2,
    },
    {
      type: 'text',
      name: 'city',
      label: 'Ort',
      span: 2,
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Telefon',
      span: 3,
    },
    {
      type: 'text',
      name: 'fax',
      label: 'Fax',
      span: 3,
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-Mail Adresse',
      span: 3,
    },
    {
      type: 'text',
      name: 'web',
      label: 'Webseite',
      span: 3,
    },
    {
      type: 'text',
      name: 'bioControlFacility',
      label: 'BIO-Kontrollnummer',
      span: 2,
    },
    {
      type: 'text',
      name: 'traderegisternumber',
      label: 'Handelsregisternummer',
      span: 2,
    },
    {
      type: 'text',
      name: 'registercourt',
      label: 'Registergericht',
      span: 2,
    },
    {
      type: 'subtitle',
      label: 'Zertifizierungsinformationen'
    },
    {
      type: 'date',
      name: 'firstAudit',
      label: 'Erstaudit erfolgt am',
      span: 3,
    },
    {
      type: 'date',
      name: 'certification',
      label: 'Zertifizierung erfolgt am',
      span: 3,
    },
    {
      type: 'date',
      name: 'nextAudit',
      label: 'Folgeaudit erfolgt am',
      span: 3,
    },
    {
      type: 'date',
      name: 'control',
      label: 'Kontrolle erfolgt am',
      span: 3,
    },
  ]
};
