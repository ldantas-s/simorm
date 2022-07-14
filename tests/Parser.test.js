const Parser = require("../src/Parser");

describe("isValid", () => {
  const parser = new Parser();

  it("should return true when method is valid and is lower caser", () => {
    expect(parser.isValid("create")).toBeTruthy();
  });

  it("should return true when method is valid and is uppercase", () => {
    expect(parser.isValid("CREATE")).toBeTruthy();
  });

  it("should return false when the argument does not exist", () => {
    expect(parser.isValid("anyMethod")).toBeFalsy();
  });

  it("should return false when the argument is falsy", () => {
    expect(parser.isValid(null)).toBeFalsy();
  });
});

