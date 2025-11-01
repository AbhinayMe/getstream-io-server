# Security Policy

This repository follows a coordinated disclosure policy. Please use the guidance below to report vulnerabilities and follow best practices when contributing.

## Supported Versions
- Security fixes are provided for the default branch (main) and the latest released version.
- Critical fixes are prioritized. Please report issues so they can be triaged.

## How to Report a Vulnerability
Preferred methods:
1. GitHub Security Advisories (recommended) — create a private security advisory.
2. Email: mindplus88@outlook.com (or use the project's configured security contact on GitHub).

Do NOT open a public issue for security problems.

Optional: sign reports with our PGP key (add PGP key here if you publish one).

## What to Include in Your Report
- Affected version(s) / branch
- Detailed description of the issue
- Step-by-step reproduction steps and minimal PoC if available
- Impact assessment (data exposure, RCE, privilege escalation, etc.)
- Any relevant logs, stack traces, or sample requests
- Optional: suggested mitigation or patch

Removing or redacting sensitive data (API keys, tokens) from logs is fine — do not include real secrets.

## Response Process and Timeline
- Acknowledgement: within 48 hours.
- Initial triage and prioritized response: within 3 business days.
- Fix timeline:
    - Critical: as soon as possible (generally within 7 days).
    - High: typically within 14 days.
    - Medium/Low: as scheduled based on severity and impact.
- We will communicate status updates and coordinate disclosure. Where applicable, we will request CVE assignment and credit the reporter unless requested otherwise.

## Coordinated Disclosure
- We follow coordinated disclosure. We will not publicly disclose vulnerabilities until a fix is available or after a reasonable embargo (typically up to 90 days) unless immediate public disclosure is required to protect users.

## Mitigations and Best Practices
- Never commit secrets or .env files to the repository.
- Rotate compromised keys immediately (Stream API keys, webhook secrets, etc.).
- Verify webhook signatures and do not log secrets or tokens.
- Use environment variables for all credentials and ensure they are excluded from source control.
- Keep dependencies up to date; enable Dependabot or other automated tooling.
- Run static analysis, type checks, and dependency audits in CI (yarn audit, Snyk, etc.).

## After a Fix
- We will publish a patched release and changelog entry with mitigation steps.
- We will notify the reporter and provide credit if they choose to be acknowledged.

Contact: security@bettermindhealth.com (or the repository’s configured GitHub security contact)

Thank you for helping keep this project secure.
