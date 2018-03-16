/*
*
*
*       Complete the API routing below
*
*
*/

"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function(req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum !== null && initUnit === null) {
      res.status(400).send("invalid unit");
    } else if (initNum === null && initUnit !== null) {
      res.status(400).send("invalid number");
    } else if (initNum === null && initUnit === null) {
      res.status(400).send("invalid number and unit");
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(
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
