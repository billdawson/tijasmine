## tijasmine Version 0.1

A [jasmine][1] implementation for Appcelerator Titanium prepared originally by
[Bill Dawson][10].

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

- Somewhere in your app code you'll want to kick it all off with code such as:

        
		var tijasmine = require("/tijasmine/tijasmine"),
			reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();

		tijasmine.addSpecModules("/specs/myspec", "/specs/myotherspec");
		tijasmine.addReporter(reporter);
		tijasmine.execute();

## Notes

- It's based on the 2.0 alpha of `jasmine`, which seemed fine for me.

- The console reporter is the only reporter. Fork me and add more!

- As of version 0.1 this has **NOT** been tested on anything other than Titanium
  Android (not iOS).  Try it out on iOS and if it fails feel free to send a pull
  request with a fix or leave an [Issue][9].
    
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
[9]: issues
[10]: http://billdawson.com
