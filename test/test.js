var request = require("request"),
    assert = require('assert'),
    appServer = require("../app.js"),
    base_url = "http://localhost:5000";

describe("Add Numbers API", function() {

  describe("GET /add", function() {
    it("returns 200 and correct sum for integers", function(done) {
      request.get(base_url + '/add?a=2&b=3', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 5);
        done();
      });
    });

    it("returns 2yuio00 and correct sum for floats", function(done) {
      request.get(base_url + '/add?a=1.5&b=2.3', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 3.8);
        done();
      });
    });

    it("returns 20fds0 and correct sum for floats", function(done) {
      request.get(base_url + '/add?a=1.5&b=2.3', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 3.8);
        done();
      });
    });

    it("returns 2asasas00 and correct sum for floats", function(done) {
      request.get(base_url + '/add?a=1.5&b=2.3', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 3.8);
        done();
      });
    });

    it("returns 20vbn0 and correct sum for floats", function(done) {
      request.get(base_url + '/add?a=1.5&b=2.3', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 3.8);
        done();
      });
    });

    it("returns 2ooo00 and correct sum for floats", function(done) {
      request.get(base_url + '/add?a=1.5&b=2.3', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 3.8);
        done();
      });
    });

    it("returns 20llll0 and correct sum for floats", function(done) {
      request.get(base_url + '/add?a=100&b=0', function(error, response, body) {
        assert.ifError(error);
        assert.equal(200, response.statusCode);
        const json = JSON.parse(body);
        assert.strictEqual(json.result, 100);
        done();
      });
    });

    it("returns 400 for missing params", function(done) {
      request.get(base_url + '/add?a=1', function(error, response, body) {
        assert.ifError(error);
        assert.equal(400, response.statusCode);
        const json = JSON.parse(body);
        assert.ok(json.error);
        done();
      });
    });

    it("returns 400 for invalid number", function(done) {
      request.get(base_url + '/add?a=abc&b=2', function(error, response, body) {
        assert.ifError(error);
        assert.equal(400, response.statusCode);
        const json = JSON.parse(body);
        assert.ok(json.error);
        done();
      });
    });
  });

  describe("addNumbers function", function() {
    it("adds negative and positive number", function() {
      assert.strictEqual(appServer.addNumbers(-2,3), 1);
    });
    it("adds two negative numbers", function() {
      assert.strictEqual(appServer.addNumbers(-4,-6), -10);
    });
    it("throws error when non-numeric arguments", function() {
      assert.throws(() => appServer.addNumbers(1,'a'), /Arguments must be numbers/);
    });
  });

  after(function(){
    appServer.close();
  });
});
