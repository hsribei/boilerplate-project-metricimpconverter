/*
*
*
*       Complete the handler logic below
*
*
*/

const DECIMAL = String.raw`\d+\.\d+`;
const DECIMAL_OR_INTEGER = String.raw`(?:${DECIMAL}|\d+)`;
const FRACTIONAL = String.raw`${DECIMAL_OR_INTEGER}(?:/${DECIMAL_OR_INTEGER})?`;
const REGEXP_STRING = String.raw`^(\d*|${FRACTIONAL})\s*([a-zA-Z]{1,3})$`;

function ConvertHandler() {
  this.KNOWN_UNITS = {
    gal: "gallons",
    l: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms"
  };

  this.CONVERSION_PAIRS = {
    gal: "l",
    l: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs"
  };

  this.getNum = function(input) {
    const regexp = new RegExp(REGEXP_STRING);
    const match = regexp.exec(input);
    if (match) {
      // Eval deserves an explanation!
      // Yes, evalling user input is dangerous af, BUT
      // 1. it's been parsed into nothing but number-meaning strings
      // 2. it's the coolest and easiest way to turn a fraction into a number
      //    as per this answer: https://stackoverflow.com/a/7142720/105132
      // 3. this is a learning exercise and I promise I'd use the split()
      //    version in production ;)
      return match[1] === "" ? 1 : eval(match[1]);
    } else {
      return null;
    }
  };

  this.getUnit = function(input) {
    const regexp = new RegExp(REGEXP_STRING);
    const match = regexp.exec(input);
    if (match) {
      const unit = match[2].toLowerCase();
      if (Object.keys(this.KNOWN_UNITS).includes(unit)) {
        return unit;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  this.getReturnUnit = function(initUnit) {
    const res = this.CONVERSION_PAIRS[initUnit];
    return res ? res : null;
  };

  this.spellOutUnit = function(unit) {
    const res = this.KNOWN_UNITS[unit];

    return res ? res : null;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversionCoeficient = {
      gal: galToL,
      lbs: lbsToKg,
      mi: miToKm,
      l: 1 / galToL,
      kg: 1 / lbsToKg,
      km: 1 / miToKm
    };

    const returnUnit = this.getReturnUnit(initUnit);
    const result = conversionCoeficient[initUnit] * initNum;

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;

    return result;
  };
}

module.exports = ConvertHandler;
