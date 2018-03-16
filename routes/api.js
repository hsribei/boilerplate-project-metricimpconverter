/*
*
*
*       Complete the API routing below
*
*
*/

"use strict";

var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function(req, res) {
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);

    if (initNum !== null && initUnit === null) {
      res.status(400).send("invalid unit");
    } else if (initNum === null && initUnit !== null) {
      res.status(400).send("invalid number");
    } else if (initNum === null && initUnit === null) {
      res.status(400).send("invalid number and unit");
    } else {
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });
    }
  });
};
