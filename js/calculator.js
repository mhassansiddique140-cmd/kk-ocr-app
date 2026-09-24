/* Pure tax calculation functions — no DOM access, so they can be unit tested in Node. */
(function (root) {
  function slabTax(income, slabs) {
    var lower = 0;
    for (var i = 0; i < slabs.length; i++) {
      var s = slabs[i];
      if (income <= s.upTo) return s.fixed + s.rate * (income - lower);
      lower = s.upTo;
    }
    return 0;
  }

  /*
   * rule: one entry from TAX_RULES[year] (salaried or business).
   * Returns annual and monthly figures, rounded to whole rupees.
   */
  function calculateTax(annualIncome, rule) {
    var income = Math.max(0, Number(annualIncome) || 0);
    var base = slabTax(income, rule.slabs);
    var surcharge = rule.surcharge && income > rule.surcharge.above ? base * rule.surcharge.rate : 0;
    var total = Math.round(base + surcharge);
    return {
      income: income,
      baseTax: Math.round(base),
      surcharge: Math.round(surcharge),
      annualTax: total,
      monthlyTax: Math.round(total / 12),
      netIncome: income - total,
      monthlyNet: Math.round((income - total) / 12),
      effectiveRate: income > 0 ? total / income : 0
    };
  }

  var api = { slabTax: slabTax, calculateTax: calculateTax };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TaxCalc = api;
})(this);
