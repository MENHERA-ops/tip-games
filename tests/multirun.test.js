// Run: node --test
const test = require("node:test");
const assert = require("node:assert");
const { multiRun, tallyText } = require("../shared.js");

const tick = () => new Promise(r => setTimeout(r, 5));

test("multi-run plays N rounds and totals them", async () => {
  let plays = 0, total = null;
  const amts = [12, 40, 8];
  const run = multiRun({gap:0, play(){ const a = amts[plays++]; setTimeout(()=>run.done(a), 0); }, onTotal(sum, res){ total = {sum, res}; }});
  run.setCount(3);
  run.start();
  while(run.running) await tick();
  assert.strictEqual(plays, 3);
  assert.deepStrictEqual(total, {sum:60, res:[12, 40, 8]});
  assert.strictEqual(tallyText(total.res), "$12 + $40 + $8 = $60");
});

test("stopping mid-run ends after the current round", async () => {
  let plays = 0, total = null;
  const run = multiRun({gap:0, play(){ plays++; }, onTotal(sum, res){ total = {sum, res}; }});
  run.setCount(5);
  run.start();
  run.done(5); await tick();   // round 2 starts
  run.stop();                  // mid-round: finish once it reports
  assert.strictEqual(run.running, true);
  run.done(7);
  assert.strictEqual(run.running, false);
  assert.strictEqual(plays, 2);
  assert.deepStrictEqual(total, {sum:12, res:[5, 7]});
});

test("a game that can't start ends the run", () => {
  const run = multiRun({play: () => false});
  run.setCount(3);
  run.start();
  assert.strictEqual(run.running, false);
});
