import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(await readFile(new URL("../renovate-config.json", import.meta.url), "utf8"));
const rules = config.packageRules ?? [];

const majorRule = rules.find((rule) => rule.matchUpdateTypes?.includes("major"));
const npmQuarantineRule = rules.find((rule) => rule.matchDatasources?.includes("npm"));

test("keeps the shared preset conservative", () => {
  assert.deepEqual(config.extends, [
    "config:best-practices",
    ":dependencyDashboard",
    ":semanticCommits",
  ]);
  assert.equal(config.timezone, "Europe/Istanbul");
  assert.equal(config.minimumReleaseAge, "7 days");
  assert.equal(config.internalChecksFilter, "strict");
  assert.equal(config.prHourlyLimit, 2);
  assert.equal(config.prConcurrentLimit, 5);
  assert.equal(config.pinDigests, true);
  assert.equal(config.prCreation, undefined);
  assert.equal(config.lockFileMaintenance?.enabled, true);
  assert.equal(config.lockFileMaintenance?.automerge, false);
  assert.ok(!rules.some((rule) => rule.automerge === true));
});

test("keeps npm on the seven-day quarantine despite best-practices defaults", () => {
  assert.equal(npmQuarantineRule?.minimumReleaseAge, "7 days");
});

test("requires dashboard approval for majors", () => {
  assert.equal(majorRule?.dependencyDashboardApproval, true);
  assert.equal(majorRule?.automerge, false);
  assert.equal(majorRule?.prPriority, -5);
});
