var tijasmine = require("/tijasmine/tijasmine"),
	reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();

tijasmine.addSpecModules("/specs/myspec", "/specs/myotherspec", "/specs/jasmineIntro");
tijasmine.addReporter(reporter);
tijasmine.execute();
