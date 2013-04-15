require("/tijasmine/tijasmine").infect(this);

describe("My First Suite of another spec", function() {
	it("ensures that true is true", function() {
		expect(true).toEqual(true);
	});
	it("shows what a failure does", function() {
		expect(false).toEqual(true);
	});
});

describe("My Second Suite of another spec", function() {
	it("ensures that 'a' is still 'a' in this world", function() {
		expect("a").toEqual("a");
	});
	it("ensures that 'b' is still 'b' in this world", function() {
		expect("b").toEqual("b");
	});
});
