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

function ConsoleReporter(finishCallback) {
	var startedAt,
		// iOS logs trim left, so we lose our indentation if
		// we don't do something like this:
		logPrefix = (Ti.Platform.osname === 'iphone' ? ".  " : ""),
		separatorLength = 60,
		levelIndentation = 3,
		sep = Array(separatorLength + 1).join("-"),
		bigsep = Array(separatorLength + 1).join("="),
		failedCount = 0,
		passedCount = 0,
		runningSuite,
		failureRecaps,
		topLevelSuites;

	function isTopLevel(suite) {
		return !suite.parentSuite;
	}

	function indent(suiteOrSpec) {
		var level = 0,
			parent;

		if (suiteOrSpec.suite) {
			// spec
			return indent(suiteOrSpec.suite);
		} else {
			parent = suiteOrSpec.parentSuite;
			while (parent) {
				level++;
				parent = parent.parentSuite;
			}
			return Array(level * levelIndentation + 1).join(" ");
		}
	}

	this.reportRunnerStarting = function(runner) {
		startedAt = new Date();
		failedCount = passedCount = 0;
		failureRecaps = [];
		runningSuite = null;
		topLevelSuites = runner.topLevelSuites();
	};

	this.reportRunnerResults = function(runner) {
		if (finishCallback) {
			finishCallback({
				failed: failedCount,
				passed: passedCount,
				elapsed: ((new Date()) - startedAt)
			});
		}
		console.log(logPrefix + bigsep);
		if (failedCount) {
			// Order of log statements in iOS doesn't
			// seem to be guaranteed. I want this last.
			setTimeout(function() {
				console.error(logPrefix + "THERE WERE FAILURES!");
				console.error(logPrefix + bigsep);
				console.error(logPrefix + "Recap of failing specs:");
				console.error(logPrefix + sep);
				failureRecaps.forEach(function(txt) {
					console.error(logPrefix + txt);
				});
				console.error(logPrefix + sep);
			},30);
		} else {
			console.log(logPrefix + "Congratulations! All passed.");
		}
	};

	this.reportSuiteResults = function(suite) {
	};

	this.reportSpecStarting = function(spec) {
		var suite = spec.suite,
			topLevel = isTopLevel(suite);

		if (!runningSuite || runningSuite.id !== suite.id) {
			runningSuite = suite;
			if (topLevel) {
				console.log(logPrefix + sep);
			}
			console.log(logPrefix + indent(suite) + suite.description + ":");
		}
	};

	this.reportSpecResults = function(spec) {
		var results = spec.results(),
			item;

		console.log(logPrefix + indent(spec) + " - " + spec.description + " (" + (results.failedCount ? "FAILED" : "ok") + ")");
		passedCount += results.passedCount;
		failedCount += results.failedCount;

		if (results.items_) {
			results.items_.forEach(function(item) {
				if (!item.passed_ && item.message) {
					console.log(logPrefix + indent(spec) + " - - " + item.message);
					failureRecaps.push(spec.getFullName() + " - " + item.message);
				}
			});
		}
	};
}


// For jasmine 2, not yet released.
function ConsoleReporter2(finishCallback) {
	var failureCount = 0;
	var passedCount = 0;

	this.jasmineStarted = function(options) {
		failureCount = 0;
		passedCount = 0;
	};

	this.suiteStarted = function(result) {
		console.log("-------------------------");
		console.log(result.fullName + ":");
	};

	this.suiteDone = function(result) { };

	this.specStarted = function(result) { };

	this.specDone = function(result) {
		var expectation;

		if (result.status == "passed") {
			passedCount++;
			console.log("  -  " + result.description + " (ok)");

		} else if (result.status == "failed") {
			console.log("  -  " + result.description + " (FAILED)");
			failureCount++;
			result.failedExpectations.forEach( function(expectation) {
				console.log("  -  -  " + expectation.message);
			});
		}
	};

	this.jasmineDone = function() {
		console.log("=========================");
		if (failureCount > 0) {
			// Order of log statements in iOS doesn't
			// seem to be guaranteed. I want this last.
			setTimeout(function() {
				console.error("THERE WERE FAILURES");
			},30);
		} else {
			console.log("Congratulations! All passed.");
		}
		if (finishCallback) {
			finishCallback({
				failed: failureCount,
				passed: passedCount
			});
		}
	};
}

exports.ConsoleReporter2 = ConsoleReporter2;
exports.ConsoleReporter = ConsoleReporter;
