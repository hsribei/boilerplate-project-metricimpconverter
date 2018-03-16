/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("Function convertHandler.getNum(input)", function() {
    test("Whole number input", function(done) {
      assert.strictEqual(convertHandler.getNum("32kg"), 32);
      done();
    });

    test("Decimal Input", function(done) {
      assert.strictEqual(convertHandler.getNum("3.14kg"), 3.14);
      done();
    });

    test("Fractional Input", function(done) {
      assert.strictEqual(convertHandler.getNum("5/2mi"), 2.5);
      done();
    });

    test("Fractional Input w/ Decimal", function(done) {
      assert.strictEqual(convertHandler.getNum("6.5/2lbs"), 3.25);
      assert.strictEqual(convertHandler.getNum("6/2.5lbs"), 2.4);
      done();
    });

    test("Invalid Input (double fraction)", function(done) {
      assert.strictEqual(convertHandler.getNum("3/1/4 gal"), null);
      done();
    });

    test("No Numerical Input", function(done) {
      assert.strictEqual(convertHandler.getNum("kg"), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      const input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      input.forEach(function(unit) {
        // without space
        assert.strictEqual(convertHandler.getUnit("3.14" + unit), unit);
        // with space
        assert.strictEqual(convertHandler.getUnit("3.14 " + unit), unit);
      });
      done();
    });

    test("Unknown Unit Input", function(done) {
      assert.strictEqual(convertHandler.getUnit("3.14N"), null);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function(unit, i) {
        assert.strictEqual(convertHandler.getReturnUnit(unit), expect[i]);
      });
      done();
    });

    test("Unknown unit", function(done) {
      assert.strictEqual(convertHandler.getReturnUnit("V"), null);
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms"
      ];
      input.forEach(function(symbol, i) {
        assert.strictEqual(convertHandler.spellOutUnit(symbol), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      // 0.1 tolerance
      assert.approximately(convertHandler.convert(5, "gal"), 18.9271, 0.1);
      done();
    });

    test("L to Gal", function(done) {
      assert.approximately(convertHandler.convert(5, "L"), 1.32086, 0.1);
      done();
    });

    test("Mi to Km", function(done) {
      assert.approximately(convertHandler.convert(5, "mi"), 8.04672, 0.1);
      done();
    });

    test("Km to Mi", function(done) {
      assert.approximately(convertHandler.convert(5, "km"), 3.10686, 0.1);
      done();
    });

    test("Lbs to Kg", function(done) {
      assert.approximately(convertHandler.convert(5, "lbs"), 2.26796, 0.1);
      done();
    });

    test("Kg to Lbs", function(done) {
      assert.approximately(convertHandler.convert(5, "kg"), 11.0231, 0.1);
      done();
    });
  });

  suite(
    "Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)",
    function() {
      test("Singular spelled-out unit name (e.g. 1 gallon)", function(done) {
        assert.strictEqual(
          convertHandler.getString(1, "gal", 3.78541, "l"),
          "1 gallon converts to 3.78541 liters"
        );

        assert.strictEqual(
          convertHandler.getString(3.78541, "l", 1, "gal"),
          "3.78541 liters convert to 1 gallon"
        );
        done();
      });

      test("Plural spelled-out unit name (e.g. 2 miles)", function(done) {
        assert.strictEqual(
          convertHandler.getString(2, "mi", 3.21868, "km"),
          "2 miles convert to 3.21868 kilometers"
        );

        assert.strictEqual(
          convertHandler.getString(3.21868, "km", 2, "mi"),
          "3.21868 kilometers convert to 2 miles"
        );
        done();
      });

      test("Round to 5 decimal places", function(done) {
        assert.strictEqual(
          convertHandler.getString(3, "lbs", 1.360776, "kg"),
          "3 pounds convert to 1.36078 kilograms"
        );
        done();
      });
    }
  );
});
