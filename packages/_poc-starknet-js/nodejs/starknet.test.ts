import { createPrivateKey, createAccount, createSignature, createTransaction } from "./starknet";

test("createPrivateKey", () => {
  expect(createPrivateKey()).toBe("");
});

test("createAccount", () => {
  expect(createAccount()).toBe("");
});

test("createSignature", () => {
  expect(createSignature()).toBe("");
});

test("createTransaction", () => {
  expect(createTransaction()).toBe("");
});
