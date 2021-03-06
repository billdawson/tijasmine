## tijasmine Version 1.0.0

A [jasmine][1] *1.3.1* implementation for Appcelerator Titanium prepared originally by
[Bill Dawson][10]. Inspired by [Aaron Saunders][11]'
[ci.behave.test][12].

## Usage

- Clone me and be sure to run `git submodule init && git submodule update` to
  bring down `jasmine`.  Or just grab the files mentioned in the next bullet.

- Put jasmine.js, [tijasmine.js][3], and [tijasmine-console.js][4] together
  somewhere under your Titanium project's `Resources` folder. You can run
  [build.sh -s][5] (sorry Windows
  folks) to package them nicely together and unzip that under your
  `Resources/` folder if you wish.

- Write some spec files similar to what's found under [example/specs][6]. You'll
  need to understand [jasmine][1] itself for this.  Note that at the top of the
  spec file you'll want something like:

        require("/tijasmine/tijasmine").infect(this);

  which will infect (for a good cause!) your spec module's context with the
  necessary `jasmine` functions such as `describe`, `it`, et al.

  One of the included spec files under `example/specs` is the complete set
  of tests run at the [Jasmine 1.3.1 intro page][1], so if you look at that
  one you basically get the Jasmine documentation.

- Somewhere in your app code you'll want to kick it all off with code such as:

        
		var tijasmine = require("/tijasmine/tijasmine"),
			reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();

		tijasmine.addSpecModules("/specs/myspec", "/specs/myotherspec");
		tijasmine.addReporter(reporter);
		tijasmine.execute();

## Notes

- It's based on the jasmine 1.3.1, which is not the current master branch at the jasmine project (they are working on 2.0).

- The console reporter is the only reporter. Fork me and add more!

## License

The Titanium-specific stuff is...

    Copyright (c) 2013 Bill Dawson
	http://billdawson.com

... and licensed under Apache License 2.0 (see [LICENSE.txt][7]).

Jasmine is...

    Copyright (c) 2008-2013 Pivotal Labs

... and licensed under the MIT License (see [LICENSE-jasmine.txt][8]).

[1]: http://pivotal.github.io/jasmine
[3]: src/tijasmine.js
[4]: src/tijasmine-console.js
[5]: build.sh
[6]: example/specs
[7]: LICENSE.txt
[8]: LICENSE-jasmine.txt
[9]: http://github.com/billdawson/tijasmine/issues
[10]: http://billdawson.com
[11]: http://twitter.com/aaronksaunders
[12]: http://github.com/aaronksaunders/ci.behave.test
