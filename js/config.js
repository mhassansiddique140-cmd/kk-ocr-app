/*
 * Business settings: edit these to rebrand the site.
 * whatsappNumber uses international format with no "+" or spaces (e.g. 923001234567).
 */
var SITE_CONFIG = {
  whatsappNumber: '923000000000',
  email: 'info@example.com',

  services: [
    { id: 'return-salaried', icon: '🧾', title: 'Salaried Tax Return', desc: 'Annual income tax return and wealth statement for salaried individuals.', price: 2500 },
    { id: 'return-business', icon: '🏪', title: 'Business Tax Return', desc: 'Returns for sole proprietors, shopkeepers and freelancers.', price: 5000 },
    { id: 'ntn', icon: '🪪', title: 'NTN Registration', desc: 'Register on FBR IRIS and get your National Tax Number.', price: 1500 },
    { id: 'sales-tax', icon: '📦', title: 'Sales Tax Registration', desc: 'STRN registration and monthly sales tax returns.', price: 8000 },
    { id: 'company', icon: '🏢', title: 'Company Registration', desc: 'SECP company incorporation and tax registration.', price: 25000 },
    { id: 'notice', icon: '📨', title: 'FBR Notice Reply', desc: 'Professional replies to FBR notices and audits.', price: 5000 },
    { id: 'wealth', icon: '📊', title: 'Wealth Reconciliation', desc: 'Fix mismatches in your wealth statement from previous years.', price: 4000 },
    { id: 'overseas', icon: '✈️', title: 'Overseas Pakistanis', desc: 'Returns for non-residents with income or property in Pakistan.', price: 6000 }
  ],

  plans: [
    { name: 'Basic', price: 2500, for: 'Salaried individuals', features: ['Income tax return', 'Wealth statement', 'ATL inclusion', 'WhatsApp support'] },
    { name: 'Standard', price: 5000, for: 'Freelancers & small business', features: ['Everything in Basic', 'Business income schedule', 'Withholding tax claims', 'Priority support'], featured: true },
    { name: 'Premium', price: 12000, for: 'Complex cases', features: ['Everything in Standard', 'Multiple income sources', 'Property & capital gains', 'Dedicated consultant'] }
  ],

  faqs: [
    { q: 'Who has to file an income tax return in Pakistan?', a: 'Anyone with taxable income above the exemption limit (PKR 600,000 a year) must file. So must anyone who owns a vehicle above 1000cc, owns property, or has an NTN, even with income below the limit.' },
    { q: 'What is the deadline to file?', a: 'The usual deadline for individuals is 30 September after the tax year ends on 30 June. FBR sometimes extends it, so check the latest notification.' },
    { q: 'What are the benefits of being a filer?', a: 'Filers pay lower withholding tax on property transfers, vehicle registration, bank cash withdrawals, dividends and profit on savings. They can also get loans and visas more easily.' },
    { q: 'How do I check if I am on the Active Taxpayers List?', a: 'Send "ATL (space) your 13-digit CNIC" to 9966, or check on the FBR website\'s ATL inquiry page.' },
    { q: 'I filed late. Can I still become active?', a: 'Yes. You can file a late return, but you must pay the ATL surcharge to be added to the list for the current year.' },
    { q: 'Is my data safe?', a: 'Your documents are used only to prepare your return. This website stores nothing, and all communication happens over WhatsApp or email.' }
  ]
};
