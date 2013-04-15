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

function ConsoleReporter() {
	var failureCount = 0;

	this.jasmineStarted = function(options) { };

	this.suiteStarted = function(result) {
		console.log("-------------------------");
		console.log(result.fullName + ":");
	};

	this.suiteDone = function(result) { };

	this.specStarted = function(result) { };

	this.specDone = function(result) {
		var expectation;

		if (result.status == "passed") {
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
	};
}

exports.ConsoleReporter = ConsoleReporter;
