# Verification Loops and Effective Prompting

## Verification: The Highest-Leverage Practice

The single highest-leverage thing to do: tell Claude how to check its own work. Without verification, Claude writes code and hopes. With it, Claude writes code, tests it, and iterates until the tests pass.

### Without Verification

- One shot, hope it works
- Claude writes code, then stops
- Bugs only show up during manual testing
- Time spent fixing what Claude missed

### With Verification

- Self-correcting loop
- Claude writes, tests, and fixes iteratively
- Errors caught before they surface
- Dramatically higher first-attempt success rate

## Verification Patterns

### Pattern 1: Test-Driven Verification

Include test requirements directly in the prompt:

```
Add a login page. Write tests for email validation, wrong password,
and successful login. Run the tests and make sure they pass.
```

```
Refactor the database module to use connection pooling. Run npm test
after each change. All 47 existing tests must still pass.
```

### Pattern 2: Type-Check Verification

Use the compiler as a verification loop:

```
After editing TypeScript files, always run tsc --noEmit
```

Add this to CLAUDE.md to make it automatic for every session.

### Pattern 3: Linter Verification

```
Run npm run lint after changes. Fix any violations before proceeding.
```

### Pattern 4: Visual Verification

```
Fix the sidebar overlapping main content on mobile. Verify by checking
that no element wider than 100vw exists using document.querySelector
in the browser console.
```

Use the Claude-in-Chrome extension for UI testing, iterating until it looks right and functions correctly.

### Pattern 5: The "Go Fix It" Pattern

When something breaks, do not over-explain. Just say "go fix it" and trust the verification loop that was set up. Claude fixes most bugs by itself when it has tests to run against.

### Pattern 6: Make Claude Your Reviewer

```
Grill me on these changes and don't make a PR until I pass your test.
```

```
Prove to me this works.
```

```
Diff between main and this feature branch and review thoroughly.
```

## Prompt Vagueness vs. Specificity

Vague prompts produce vague results. The more specific the prompt about scope, sources, patterns, and symptoms, the better Claude performs. Think of it like briefing a new contractor: smart, but needs context for good work.

### The Four Dimensions of Specificity

#### 1. Scope

**Too broad:** "Improve the API"

**Scoped:** "Add rate limiting to POST /api/users. 100 requests per minute per IP. Return 429 with retry-after header."

#### 2. Sources

**Unanchored:** "Write a migration script"

**Anchored:** "Write a migration from the old schema in db/v1.sql to the new one in db/v2.sql. Handle the user.role column becoming a separate roles table."

#### 3. Patterns

**No guidance:** "Add error handling"

**With patterns:** "Add error handling following the pattern in src/api/orders.ts. Use the AppError class. Log to Sentry. Return standard error shapes."

#### 4. Symptoms

**Minimal:** "The app crashes sometimes"

**Detailed:** "The app crashes when loading the dashboard after login. Stack trace points to useEffect in Dashboard.tsx:47. Only happens when the user has no recent orders."

### Prompting Tips

- **Use voice dictation.** Speaking is three times faster than typing, and prompts get much more detailed. On macOS, hit the function key twice to activate.
- **Include verification in every prompt.** End prompts with "Run tests and make sure they pass" or equivalent.
- **Name files explicitly.** "Update src/auth/login.ts" not "update the login code."
- **Reference existing patterns.** "Follow the pattern in src/api/orders.ts" gives Claude a concrete example to follow.

## Feeding Rich Content

Claude Code is not limited to text prompts. The richer the input, the less Claude needs to guess.

### @-References

Type `@filename` to add a file directly to context. Works with URLs too: `@https://...` fetches and includes the page content.

```
Read @src/auth/login.ts and @src/auth/types.ts and explain the login flow.
```

### Images

Drag-and-drop screenshots, mockups, or error messages into the prompt. Claude reads images natively.

```
[Paste a screenshot of the design mockup]
Build this exact layout. Match the spacing, colors, and typography.
```

### Pipes

Pipe output from any shell command directly into Claude:

```bash
# Pipe git diff for code review
git diff main | claude "Review this diff for bugs"

# Pipe test failures for debugging
npm test 2>&1 | claude "Fix the failing tests"

# Pipe logs for analysis
tail -100 /var/log/app.log | claude "What's causing these errors?"
```

### Combining Input Types

Combine multiple input types for maximum context:

```
Read @src/api/routes.ts and @https://api.example.com/openapi.json.
Generate a TypeScript client that matches the OpenAPI spec.
Follow the patterns in the existing routes file.
Run tsc --noEmit to verify types are correct.
```

## Verification + Prompting Checklist

For every prompt:
- [ ] Is the scope clearly defined?
- [ ] Are specific files and paths named?
- [ ] Is there a pattern to follow?
- [ ] Is verification included (tests, linter, type-check)?
- [ ] Are edge cases or symptoms described precisely?

For CLAUDE.md:
- [ ] Are verification commands documented?
- [ ] Are common patterns referenced?
- [ ] Are style rules that differ from defaults listed?
