/*
 * Variation on the jasmine core boot.js:
 * https://github.com/pivotal/jasmine/blob/edc2bfae93208ebf30824a2842f06b543f82fc10/lib/jasmine-core/boot.js
 * which is:
 * Copyright (c) 2008-2013 Pivotal Labs
 */


var jasmine = require("./jasmine").jasmine,
	env = jasmine.getEnv();
	specFiles = [],
	jasmineInterface;

var jasmineInterface = {
    describe: function(description, specDefinitions) {
      return env.describe(description, specDefinitions);
    },

    xdescribe: function(description, specDefinitions) {
      return env.xdescribe(description, specDefinitions);
    },

    it: function(desc, func) {
      return env.it(desc, func);
    },

    xit: function(desc, func) {
      return env.xit(desc, func);
    },

    beforeEach: function(beforeEachFunction) {
      return env.beforeEach(beforeEachFunction);
    },

    afterEach: function(afterEachFunction) {
      return env.afterEach(afterEachFunction);
    },

    expect: function(actual) {
      return env.expect(actual);
    },

    pending: function() {
      return env.pending();
    },

    addMatchers: function(matchers) {
      return env.addMatchers(matchers);
    },

    spyOn: function(obj, methodName) {
      return env.spyOn(obj, methodName);
    },

    clock: env.clock,
    setTimeout: env.clock.setTimeout,
    clearTimeout: env.clock.clearTimeout,
    setInterval: env.clock.setInterval,
    clearInterval: env.clock.clearInterval,

    jsApiReporter: new jasmine.JsApiReporter(jasmine)
};

env.addReporter(jasmineInterface.jsApiReporter);
env.catchExceptions(true); // Default. Alternatives?

function extend(destination, source) {
	for (var property in source) destination[property] = source[property];
	return destination;
}

exports.addSpecModule = function(path) {
	specFiles.push(path);
};

exports.execute = function() { 
	var mod,
		self = this;
	specFiles.forEach(function(path) {
		require(path);
	});
	env.execute();
};

exports.addReporter = function(reporter) {
	env.addReporter(reporter);
};

exports.pollute = function(infectee) {
  extend(infectee, jasmineInterface);
};

