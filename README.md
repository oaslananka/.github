# oaslananka shared GitHub policy

`renovate-config.json` is the shared Renovate baseline consumed as:

`github>oaslananka/.github:renovate-config`

The shared layer is intentionally conservative: seven-day routine release quarantine, two new PRs per hour, five concurrent PRs, digest pinning, weekly lockfile maintenance, and Dependency Dashboard approval for majors. It does not enable automerge and it does not choose between Dependabot and Renovate for vulnerability PR ownership.

Repository configs own product-specific schedules, protected packages, security-update ownership, labels, generated-artifact tasks, and merge routing.
