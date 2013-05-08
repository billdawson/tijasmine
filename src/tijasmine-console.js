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
	this.reportRunnerStarting = function(runner) {
		var suites = runner.topLevelSuites(),
			i = 0,
			suite;


		for (; i < suites.length; i++) {
			suite = suites[i];
			console.log("=====================");
			console.log("Suite: " + suite.id);
			console.log("Description: " + suite.description);
		}
	};

	this.reportRunnerResults = function(runner) {
		console.log("If I knew what I was doing, I'd report results");
		console.log("Failure count: " + runner.results().failedCount);
		// Presumably this is where I could call finishCallback);
	};

	this.reportSuiteResults = function(suite) {
		console.log("If I knew what I was doing, I'd report SUITE results");
	};

	this.reportSpecResults = function(spec) {
		console.log("If I knew what I was doing, I'd report SPEC results");
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
		finishCallback && finishCallback({
			failed: failureCount,
			passed: passedCount
		});
	};
}

exports.ConsoleReporter2 = ConsoleReporter2;
exports.ConsoleReporter = ConsoleReporter;
