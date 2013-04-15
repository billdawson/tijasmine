/*
   Copyright (c) 2013 Bill Dawson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/*
   This is a variation on the jasmine core boot.js:
   https://github.com/pivotal/jasmine/blob/edc2bfae93208ebf30824a2842f06b543f82fc10/lib/jasmine-core/boot.js
   which is:

   Copyright (c) 2008-2013 Pivotal Labs

   with the following license (MIT):

		Permission is hereby granted, free of charge, to any person obtaining
		a copy of this software and associated documentation files (the
		"Software"), to deal in the Software without restriction, including
		without limitation the rights to use, copy, modify, merge, publish,
		distribute, sublicense, and/or sell copies of the Software, and to
		permit persons to whom the Software is furnished to do so, subject to
		the following conditions:

		The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
		LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
		OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
		WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/


var jasmine = require("./jasmine").jasmine,
	env = jasmine.getEnv(),
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

// path param can be varargs or array and each path
// should point to JS module (without .js extension).
exports.addSpecModules = function(paths) {
	if (Array.isArray(paths)) {
		specFiles = specFiles.concat(paths);
	} else {
		specFiles = specFiles.concat(Array.prototype.slice.call(arguments));
	}
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

exports.infect = function(infectee) {
  extend(infectee, jasmineInterface);
};

