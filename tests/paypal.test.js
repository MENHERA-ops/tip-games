// Run: node --test
const test = require("node:test");
const assert = require("node:assert");
const { paypalUrl } = require("../shared.js");

test("PayPal link carries the exact tip amount", () => {
  for(const amt of [1, 12, 12.5, 150]){
    const q = new URL(paypalUrl(amt)).searchParams;
    assert.strictEqual(q.get("amount"), String(amt));
    assert.strictEqual(q.get("business"), "GCA6LB3DXBTAU");
    assert.strictEqual(q.get("currency_code"), "USD");
  }
});
