export const SAMPLE_FORM_DATA = {
  fields: [
    {
      type: 'text',
      name: 'number',
      label: 'Prüfberichtsnummer',
      span: 3,
      required: true,
      readOnly: false,
      hidden: false,
    },
    {
      type: 'date',
      name: 'reportdate',
      label: 'Datum Prüfbericht',
      span: 3,
      required: true
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Produktbeschreibung',
      lines: 2,
      span: 6,
    },
    {
      type: 'subtitle',
      label: 'Lieferanteninformationen',
      name: 'supplierinformation'
    },
    {
      type: 'date',
      name: 'deliverydatestart',
      label: 'Lieferbeginn',
      span: 3,
    },
    {
      type: 'date',
      name: 'deliverydateend',
      label: 'Lieferende',
      span: 3,
    },
    {
      type: 'autocomplete',
      name: 'supplierId',
      label: 'Lieferant',
      span: 2,
      options: []
    },
    {
      type: 'date',
      name: 'deliverydate',
      label: 'Lieferdatum',
      span: 2,
    },
    {
      type: 'select',
      name: 'transportation',
      label: 'Transportmittel',
      options: [
        {
          label: '',
          value: ''
        },
        {
          label: 'LKW',
          value: 'truck'
        },
        {
          label: 'Traktor plus Anhänger',
          value: 'tractor'
        },
        {
          label: 'Schiff',
          value: 'ship'
        },
        {
          label: 'Bahn',
          value: 'train'
        },
        {
          label: 'BigBag',
          value: 'bigbag'
        },
        {
          label: 'Sackware',
          value: 'bag'
        }
      ],
      span: 2
    },
    {
      type: 'subtitle',
      label: 'Angaben zur Partie'
    },
    {
      type: 'text',
      name: 'article',
      label: 'Artikelnummer',
      span: 3
    },
    {
      type: 'text',
      name: 'amount',
      label: 'Menge (to)',
      span: 3
    },
    {
      type: 'select',
      name: 'deliveredAs',
      label: 'Geliefert als',
      options: [
        {
          label: 'Einzelfuttermittel',
          value: 'singleFeed'
        },
        {
          label: 'Mischfuttermittel',
          value: 'mixFeed'
        }
      ],
      span: 3
    },
    {
      type: 'select',
      name: 'deliveredTo',
      label: 'Geliefert an',
      options: [
        {
          label: 'Wiederverkäufer',
          value: 'reseller'
        },
        {
          label: 'Landwirt',
          value: 'farmer'
        }
      ],
      span: 3
    },
    {
      type: 'checkbox',
      name: 'quarantine',
      label: 'Quarantäne im eigenen Werk',
      span: 3
    },
    {
      type: 'checkbox',
      name: 'silopart',
      label: 'Teil einer Silopartie',
      span: 3
    },
    {
      type: 'checkbox',
      name: 'partlydelivered',
      label: 'Teilmenge verarbeitet und nicht ausgeliefert',
      span: 3
    },
    {
      type: 'checkbox',
      name: 'singlefeed',
      label: 'Einzelfuttermittel verarbeitet und ausgeliefert',
      span: 3
    },
    {
      type: 'subtitle',
      label: 'Analyseergebnis'
    },
    {
      type: 'analyticalresult'
    }
    // {
    //   type: 'checkbox',
    //   name: 'orientationValue',
    //   label: 'GO+ Orientierungswert überschritten',
    //   span: 3
    // },
    // {
    //   type: 'checkbox',
    //   name: 'limitValue',
    //   label: 'Grenzwert (RHmVO) überschritten',
    //   span: 3
    // },
    // {
    //   type: 'textarea',
    //   name: 'limitDescription',
    //   label: 'Überschrittene Grenzwerte inkl. Ergebnis',
    //   lines: 4,
    //   span: 6,
    //   condition: {
    //     property: 'orientationValue',
    //     value: true
    //   }
    // },
  ]
};
