var request = require("request"),
    assert = require('assert'),
    appServer = require("../app.js"),
    base_url = "http://localhost:5000";

describe("Calculator API Tests", function() {

  describe("GET /add endpoint validation", function() {
    it("should successfully add two positive integers", function(done) {
      request.get(base_url + '/add?a=5&b=7', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 12);
        done();
      });
    });

    it("should correctly handle decimal addition", function(done) {
      request.get(base_url + '/add?a=2.5&b=3.7', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 6.2);
        done();
      });
    });

    it("should fail when expecting wrong sum for negative numbers", function(done) {
      request.get(base_url + '/add?a=-10&b=-5', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        // This will fail - expecting wrong result
        assert.strictEqual(json.result, -10); // Should be -15
        done();
      });
    });

    it("should fail when expecting incorrect zero handling", function(done) {
      request.get(base_url + '/add?a=0&b=0', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        // This will fail - expecting wrong result
        assert.strictEqual(json.result, 1); // Should be 0
        done();
      });
    });

    it("should handle large number addition correctly", function(done) {
      request.get(base_url + '/add?a=999999&b=1', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 1000000);
        done();
      });
    });

    it("should return 400 for missing parameter b", function(done) {
      request.get(base_url + '/add?a=10', function(error, response, body) {
        assert.ifError(error);
        assert.equal(400, response.statusCode);
        const json = JSON.parse(body);
        assert.ok(json.error);
        done();
      });
    });

    it("should return 400 for non-numeric input", function(done) {
      request.get(base_url + '/add?a=hello&b=world', function(error, response, body) {
        assert.ifError(error);
        assert.equal(400, response.statusCode);
        const json = JSON.parse(body);
        assert.ok(json.error);
        done();
      });
    });

    it("should fail expecting wrong status code for valid request", function(done) {
      request.get(base_url + '/add?a=1&b=1', function(error, response, body) {
        assert.ifError(error);
        // This will fail - expecting wrong status
        assert.equal(404, response.statusCode); // Should be 200
        done();
      });
    });
  });

  describe("addNumbers core function tests", function() {
    it("should correctly subtract negative from positive", function() {
      assert.strictEqual(appServer.addNumbers(-3, 8), 5);
    });
    
    it("should fail when expecting wrong result for double negatives", function() {
      // This will fail - expecting wrong result
      assert.strictEqual(appServer.addNumbers(-2, -3), 5); // Should be -5
    });
    
    it("should properly throw error for invalid string input", function() {
      assert.throws(() => appServer.addNumbers('invalid', 5), /Arguments must be numbers/);
    });

    it("should handle zero addition correctly", function() {
      assert.strictEqual(appServer.addNumbers(42, 0), 42);
    });
  });

  after(function(){
    appServer.close();
  });
});
