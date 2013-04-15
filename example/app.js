var tijasmine = require("/tijasmine/tijasmine"),
	reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();

tijasmine.addSpecModules("/specs/myspec", "/specs/myotherspec");
tijasmine.addReporter(reporter);
tijasmine.execute();
