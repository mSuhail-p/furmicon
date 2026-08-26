# Furmicon — Step-by-Step Development Tasks

> IMPORTANT: These tasks must be completed **one at a time**.
>
> After completing each task, STOP and wait for the user to verify it.
> Do NOT begin the next task automatically.
>
> Workflow:
> **Task 1 → User verifies → Task 2 → User verifies → Task 3 → User verifies → Task 4 → User verifies → Task 5**

---

## Task 1 — MongoDB & Database Stability

- [x] Inspect the existing Furmicon project and understand its current backend/database architecture.
- [x] Reproduce the current MongoDB-related problem.
- [x] Identify the actual root cause before making changes.
- [x] Inspect MongoDB connection configuration and environment variables.
- [x] Inspect the database name and connection lifecycle.
- [x] Inspect existing MongoDB/Mongoose models and schemas.
- [x] Inspect important database queries and operations.
- [x] Check for duplicate connections, connection leaks, invalid queries, schema mismatches, and incorrect environment-variable usage.
- [x] Check database-related error handling.
- [x] Fix the MongoDB problem at its root.
- [x] Do not replace MongoDB or unnecessarily redesign the database architecture.
- [x] Do not delete existing data or perform destructive migrations unless absolutely necessary.
- [x] Do not hardcode MongoDB credentials.
- [x] Run the backend and verify that the MongoDB connection succeeds.
- [x] Verify the important existing database operations.
- [x] Check for MongoDB-related runtime errors after the fix.
- [x] Run relevant existing tests/checks if available.

### STOP POINT

After Task 1 is complete:

- [x] Explain the root cause.
- [x] Explain exactly what was changed.
- [x] List important files changed.
- [x] Give exact steps for the user to run and verify MongoDB.
- [x] Mention any environment variables/configuration the user must check.
- [x] Mention any remaining issue.


**STOP. Do not start Task 2 until the user explicitly confirms that Task 1 is verified.**

---

## Task 2 — OTP & Email / Nodemailer Reliability

- [x] Inspect the complete existing OTP flow.
- [x] Reproduce the current OTP problem.
- [x] Determine the actual root cause instead of assuming Nodemailer is responsible.
- [x] Check OTP generation.
- [x] Check OTP storage.
- [x] Check OTP expiry.
- [x] Check OTP verification.
- [x] Check OTP resend logic.
- [x] Check Nodemailer configuration.
- [x] Check SMTP configuration.
- [x] Check email-related environment variables.
- [x] Check backend and frontend error handling.
- [x] Fix the actual root cause.
- [x] Ensure OTPs are securely generated.
- [x] Ensure OTPs expire correctly.
- [x] Prevent expired OTPs from being reused.
- [x] Prevent verified OTPs from being reused.
- [x] Implement safe resend behavior.
- [x] Handle email/SMTP failures correctly.
- [x] Provide useful user-facing OTP error messages.
- [x] Never expose email credentials, OTP secrets, or other sensitive values to the frontend or logs.
- [x] Verify the OTP flow as far as the available local environment allows.

### STOP POINT

After Task 2 is complete:

- [x] Explain the root cause.
- [x] Explain exactly what was changed.
- [x] List important files changed.
- [x] Give exact steps for the user to verify OTP/email functionality.
- [x] Mention any external SMTP/email configuration that still needs manual verification.
- [x] Mention any remaining issue.

**STOP. Do not start Task 3 until the user explicitly confirms that Task 2 is verified.**

---

## Task 3 — Backend & API Stability

- [ ] Inspect the backend for remaining important errors.
- [ ] Review API routes.
- [ ] Review controllers/services where applicable.
- [ ] Review request validation.
- [ ] Review authentication-related backend logic.
- [ ] Review API error handling.
- [ ] Review API response consistency.
- [ ] Review environment-variable usage.
- [ ] Review security-sensitive operations.
- [ ] Reproduce important backend/runtime problems before fixing them.
- [ ] Fix genuine backend/API problems at their root.
- [ ] Do not rewrite working architecture unnecessarily.
- [ ] Do not introduce unnecessary dependencies.
- [ ] Verify important API flows.
- [ ] Verify frontend/backend communication.
- [ ] Check for runtime errors and failed API requests.

### STOP POINT

After Task 3 is complete:

- [ ] Explain the problems found.
- [ ] Explain the fixes.
- [ ] List important files changed.
- [ ] Give exact verification steps.
- [ ] Mention any remaining issue.

**STOP. Do not start Task 4 until the user explicitly confirms that Task 3 is verified.**

---

## Task 4 — UI/UX Improvement & Polish

- [x] Review the complete Furmicon UI.
- [x] Identify inconsistent, unfinished, confusing, or visually weak areas.
- [x] Improve spacing and layout where necessary.
- [x] Improve typography and visual hierarchy.
- [x] Improve buttons and interactive elements.
- [x] Improve forms and form validation feedback.
- [x] Improve cards and reusable UI components where necessary.
- [x] Improve navigation and overall consistency.
- [x] Improve authentication screens.
- [x] Improve OTP screens.
- [x] Improve loading states.
- [x] Improve error states.
- [x] Improve success states.
- [x] Improve empty states.
- [x] Check mobile responsiveness.
- [x] Check tablet responsiveness.
- [x] Check desktop layouts.
- [x] Make the application feel like one coherent product.
- [x] Preserve Furmicon's existing identity and purpose.
- [x] Do not completely redesign the application.
- [x] Do not remove working functionality.
- [x] Avoid unnecessary animations and visual effects.
- [x] Check browser console errors after the UI changes.
- [x] Check important screens and user flows.

### STOP POINT

After Task 4 is complete:

- [x] Explain the UI/UX improvements.
- [x] List important files/components changed.
- [x] Give exact steps for the user to verify the UI.
- [x] Mention any remaining UI issue.

**STOP. Do not start Task 5 until the user explicitly confirms that Task 4 is verified.**

---

## Task 5 — Final Testing & Production Readiness

- [ ] Perform a final review of the complete Furmicon project.
- [ ] Test MongoDB connection.
- [ ] Test important database operations.
- [ ] Test authentication.
- [ ] Test OTP generation.
- [ ] Test OTP verification.
- [ ] Test invalid OTP handling.
- [ ] Test expired OTP handling.
- [ ] Test OTP resend.
- [ ] Test email/SMTP failure handling.
- [ ] Test important backend APIs.
- [ ] Test frontend/backend communication.
- [ ] Test frontend error handling.
- [ ] Test loading and success states.
- [ ] Test responsive layouts.
- [ ] Verify important existing features still work.
- [ ] Run available tests.
- [ ] Run available lint checks.
- [ ] Run available type checks.
- [ ] Run the production build.
- [ ] Check browser console errors.
- [ ] Check failed network requests.
- [ ] Remove unnecessary debug logs.
- [ ] Remove temporary fixes and obvious dead code where safe.
- [ ] Check that secrets and credentials are not committed.
- [ ] Check for obvious deployment/configuration problems.
- [ ] Do not claim something is fixed unless it has actually been verified.

### FINAL STOP

After Task 5 is complete, provide a final report containing:

- Problems discovered
- Root causes
- Fixes made
- Important files changed
- Tests/checks performed
- MongoDB status
- OTP/email status
- Backend/API status
- UI/UX improvements
- Production build status
- Remaining issues
- Any manual deployment or external-service configuration still required

**STOP. Do not make additional changes unless the user asks for them.**
