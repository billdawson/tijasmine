require("/tijasmine/tijasmine").pollute(this);

describe("My First Suite", function() {
	it("ensures that true is true", function() {
		expect(true).toEqual(true);
	});
	it("shows what a failure does", function() {
		expect(false).toEqual(true);
	});
});

describe("My Second Suite", function() {
	it("ensures that 'a' is still 'a' in this world", function() {
		expect("a").toEqual("a");
	});
	it("ensures that 'b' is still 'b' in this world", function() {
		expect("b").toEqual("b");
	});
});
