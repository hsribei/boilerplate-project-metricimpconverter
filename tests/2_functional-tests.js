/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("Routing Tests", function() {
    suite("GET /api/convert => conversion object", function() {
      test("Convert 10L (valid input)", function(done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "10L" })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.initNum, 10);
            assert.strictEqual(res.body.initUnit, "L");
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.strictEqual(res.body.returnUnit, "gal");
            done();
          });
      });

      test("Convert 32g (invalid input unit)", function(done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "32g" })
          .end(function(err, res) {
            assert.isAtLeast(res.status, 400);
            assert.isBelow(res.status, 500);
            assert.strictEqual(res.text, "invalid unit");
            done();
          });
      });

      test("Convert 3/7.2/4kg (invalid number)", function(done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kg" })
          .end(function(err, res) {
            assert.isAtLeast(res.status, 400);
            assert.isBelow(res.status, 500);
            assert.strictEqual(res.text, "invalid number");
            done();
          });
      });

      test("Convert 3/7.2/4kilomegagram (invalid number and unit)", function(done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kilomegagram" })
          .end(function(err, res) {
            assert.isAtLeast(res.status, 400);
            assert.isBelow(res.status, 500);
            assert.strictEqual(res.text, "invalid number and unit");
            done();
          });
      });

      test("Convert kg (no number)", function(done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "kg" })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.initNum, 1);
            assert.approximately(res.body.returnNum, 2.20462442, 0.00001);
            assert.strictEqual(res.body.returnUnit, "lbs");
            done();
          });
      });
    });
  });
});
