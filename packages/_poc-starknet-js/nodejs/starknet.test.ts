const { createAccount } = require("./starknet");

test("createAccount", () => {
  expect(createAccount()).toBe(5);
});
