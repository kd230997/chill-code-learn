---
description: Performs a comprehensive review of current changes, including logic, security, and automated testing.
---

## Goal
To ensure that all staged or recent changes meet the project's quality standards, are free of obvious bugs, and do not break existing functionality.

## Steps
1. **Analyze Context:** Identify all files modified in the current branch or staged for commit. 
2. **Logic & Security Audit:** - Check for "code smells" (complexity, dry violations).
   - Scan for security risks (hardcoded secrets, unsanitized inputs).
   - Ensure the logic aligns with existing architectural patterns in the codebase.
3. **Automated Verification:**
   - Attempt to run the project's test suite (e.g., `npm test`, `pytest`, or `go test`).
   - If tests fail, summarize the failures and suggest specific fixes.
4. **Style Check:** Verify compliance with the rules defined in `.agent/rules/`.
5. **Generate Artifact:** Create a "Review Summary" artifact that categorizes findings into:
   - 🔴 **Critical:** Logic errors or breaking changes.
   - 🟡 **Warning:** Suggestions for optimization or style.
   - 🟢 **Positive:** Good implementations or clever solutions.

## Constraints
- Do not suggest changes that are purely subjective (e.g., "I prefer X over Y") unless they violate a defined Rule.
- Focus on the **intent** of the code, not just the syntax.
- If the code is perfect, explicitly state "No issues found" and explain why.