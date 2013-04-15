function ConsoleReporter() {
	var now = function() { return new Date().getTime();},
		results = [],
		startTime,
		failureCount = 0,
		totalSpecsDefined = 0,
		failures = [];


	this.initialize = function() {
		console.log("reporter.initialize");
	};

	this.jasmineStarted = function(options) {
		totalSpecsDefined = options.totalSpecsDefined || 0;
		startTime = now();
	};

	this.suiteStarted = function(result) {
		console.log("-------------------------");
		console.log(result.fullName + ":");
	};

	this.suiteDone = function(result) {
	};

	this.specStarted = function(result) {
	};

	this.specDone = function(result) {
		var i, expectation, failCount = result.failedExpectations.length;

		if (result.status == "passed") {
			console.log("  -  " + result.description + " (ok)");
		} else if (result.status == "failed") {
			console.error("  -  " + result.description + " (FAILED)");
			failureCount++;
			for (i = 0; i < result.failedExpectations.length; i++) {
				expectation = result.failedExpectations[i];
				console.error("  -  -  " + expectation.message);
			}
		}
	};

	this.jasmineDone = function() {
		var elapsed = now() - startTime;
		console.log("=========================");
		if (failureCount > 0) {
			console.error("THERE WERE FAILURES");
		} else {
			console.log("Congratulations! All passed.");
		}
	};
}

exports.ConsoleReporter = ConsoleReporter;
