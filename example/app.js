var tijasmine = require("/tijasmine/tijasmine"),
	reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();

tijasmine.addSpecModule("/specs/myspec");
tijasmine.addReporter(reporter);
tijasmine.execute();
