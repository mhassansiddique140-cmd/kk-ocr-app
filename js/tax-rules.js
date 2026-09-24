/*
 * Income tax slabs for Pakistan (Income Tax Ordinance 2001, First Schedule).
 * Each slab: { upTo, fixed, rate } — tax = fixed + rate * (income - previous upTo).
 * Update this file each budget; the calculators read everything from here.
 */
(function (root) {
  var TAX_RULES = {
    'FY 2025-26': {
      salaried: {
        slabs: [
          { upTo: 600000, fixed: 0, rate: 0 },
          { upTo: 1200000, fixed: 0, rate: 0.01 },
          { upTo: 2200000, fixed: 6000, rate: 0.11 },
          { upTo: 3200000, fixed: 116000, rate: 0.23 },
          { upTo: 4100000, fixed: 346000, rate: 0.30 },
          { upTo: Infinity, fixed: 616000, rate: 0.35 }
        ],
        surcharge: { above: 10000000, rate: 0.09 }
      },
      business: {
        slabs: [
          { upTo: 600000, fixed: 0, rate: 0 },
          { upTo: 1200000, fixed: 0, rate: 0.15 },
          { upTo: 1600000, fixed: 90000, rate: 0.20 },
          { upTo: 3200000, fixed: 170000, rate: 0.30 },
          { upTo: 5600000, fixed: 650000, rate: 0.40 },
          { upTo: Infinity, fixed: 1610000, rate: 0.45 }
        ],
        surcharge: { above: 10000000, rate: 0.10 }
      }
    },
    'FY 2024-25': {
      salaried: {
        slabs: [
          { upTo: 600000, fixed: 0, rate: 0 },
          { upTo: 1200000, fixed: 0, rate: 0.05 },
          { upTo: 2200000, fixed: 30000, rate: 0.15 },
          { upTo: 3200000, fixed: 180000, rate: 0.25 },
          { upTo: 4100000, fixed: 430000, rate: 0.30 },
          { upTo: Infinity, fixed: 700000, rate: 0.35 }
        ],
        surcharge: { above: 10000000, rate: 0.10 }
      },
      business: {
        slabs: [
          { upTo: 600000, fixed: 0, rate: 0 },
          { upTo: 1200000, fixed: 0, rate: 0.15 },
          { upTo: 1600000, fixed: 90000, rate: 0.20 },
          { upTo: 3200000, fixed: 170000, rate: 0.30 },
          { upTo: 5600000, fixed: 650000, rate: 0.40 },
          { upTo: Infinity, fixed: 1610000, rate: 0.45 }
        ],
        surcharge: { above: 10000000, rate: 0.10 }
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = TAX_RULES;
  else root.TAX_RULES = TAX_RULES;
})(this);
