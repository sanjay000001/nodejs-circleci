var request = require("request"),
    assert = require('assert'),
    helloWorld = require("../app.js"),
    base_url = "http://localhost:5000/";

describe("Welcome to CI/CD Server", function() {

  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        helloWorld.close();
        done();
      });
    });
  });

  describe("welcomeMessage", function (){
    it("Validate Message", function(){
      var res = helloWorld.welcomeMessage();
      var message = "Welcome to CI/CD 101 using CircleCI!";
      assert.equal(res, message);
    });  
  });

  // Tests for addNumbers
  describe("addNumbers", function() {
    it("adds two positive numbers", function() {
      assert.strictEqual(helloWorld.addNumbers(2,3), 5);
    });
    it("adds negative and positive number", function() {
      assert.strictEqual(helloWorld.addNumbers(1,1), 2);
    });
    it("adds two negative numbers", function() {
      assert.strictEqual(helloWorld.addNumbers(-4,-6), -10);
    });
    it("adds floating point numbers", function() {
      assert.strictEqual(helloWorld.addNumbers(1.5,2.3), 3.8);
    });
    it("throws error when non-numeric arguments", function() {
      assert.throws(() => helloWorld.addNumbers(1,'a'), /Arguments must be numbers/);
    });
  });
});
