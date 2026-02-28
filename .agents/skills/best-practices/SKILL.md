---
name: Claude Code Best Practices
description: This skill should be used when the user asks to "apply best practices", "follow Claude Code workflow", "set up best practices", "optimize my Claude Code usage", "use the Boris workflow", "explore plan implement commit", "manage context window", "set up verification loops", "improve prompt quality", or wants guidance on Claude Code best practices, context management, verification workflows, session management, or effective prompting strategies. Based on Anthropic's official best practices combined with Boris Cherny's workflow.
version: 1.0.0
---

# Claude Code Best Practices

Comprehensive best practices for Claude Code based on Anthropic's official recommendations and Boris Cherny's workflow. Every technique here is a strategy for managing the 200k-token context window effectively.

## The 13 Principles at a Glance

| # | Principle | Core Idea |
|---|-----------|-----------|
| 1 | Context is king | Keep the context window clear, compact, and relevant |
| 2 | Give Claude verification | Tests, linters, type-checkers create self-correcting loops |
| 3 | Explore → Plan → Implement → Commit | Four steps, every time, for non-trivial tasks |
| 4 | Be specific | Name files, describe behavior, point to patterns |
| 5 | Feed rich content | Use @-references, images, pipes for maximum context |
| 6 | CLAUDE.md is project memory | Persistent conventions loaded every session |
| 7 | Skills for on-demand expertise | Markdown instructions loaded only when invoked |
| 8 | Subagents for isolation | Spawn child agents with their own context window |
| 9 | Let Claude interview you | Use spec generation for complex features |
| 10 | Know failure patterns | Kitchen-sink sessions, sunk cost, infinite exploration |
| 11 | Manage your session | Esc, /clear, /compact, --continue |
| 12 | Pro tips | CLI tools, hooks, /permissions, emphasis |
| 13 | Develop intuition | The real skill is knowing what to delegate |

## Core Workflow: Explore → Plan → Implement → Commit

For every non-trivial task, follow these four steps in order:

1. **Explore** — Read relevant code and understand current state. Do not change anything yet. Ground the conversation in facts, not assumptions.

2. **Plan** — Propose a plan and review it. Use Shift+Tab twice for plan mode (read-only guarantees). Iterate until the plan is solid. This prevents mid-course corrections that waste context.

3. **Implement** — Execute the plan with verification built in. Run the test suite after each file change. Do not proceed until all tests pass.

4. **Commit** — Write clear commit messages. Break large diffs into logical commits. Claude has seen every change and can summarize accurately.

## Verification: The Highest-Leverage Practice

The single most impactful thing to do: give Claude a way to check its own work.

**Without verification:** One shot, hope it works. Bugs surface only during manual testing.

**With verification:** Self-correcting loop. Claude writes, tests, fixes iteratively. Dramatically higher first-attempt success rate.

### Verification Patterns

- **Tests:** "Write tests for X. Run them and make sure they pass."
- **Type-checks:** "Run `tsc --noEmit` after each change."
- **Linters:** "Run `npm run lint` and fix any violations."
- **Existing suites:** "All 47 existing tests must still pass."
- **The 'go fix it' pattern:** When something breaks, say "go fix it" and trust the verification loop.

## Context Management Essentials

- **Be clear:** Ambiguous prompts waste tokens on exploration. Specific prompts with file paths and expected outcomes work immediately.
- **Keep compact:** Use `/compact` between subtasks to summarize and free space. Long conversations decay in quality.
- **Parallelize:** Run multiple sessions simultaneously. Use 3-5 Git worktrees for separate branches. Think of AI as schedulable capacity.
- **Scope investigations:** Unbounded exploration fills context with irrelevant information. Scope narrowly or use subagents.

## Prompting: Be Specific

Structure prompts with four dimensions:

| Dimension | Vague | Specific |
|-----------|-------|----------|
| **Scope** | "Improve the API" | "Add rate limiting to POST /api/users. 100 req/min per IP. Return 429." |
| **Sources** | "Write a migration" | "Migrate from db/v1.sql to db/v2.sql. Handle user.role → roles table." |
| **Patterns** | "Add error handling" | "Follow the pattern in src/api/orders.ts. Use AppError class. Log to Sentry." |
| **Symptoms** | "The app crashes" | "Crashes on dashboard load after login. Stack at Dashboard.tsx:47. No recent orders." |

## Debugging Your Workflow

Recognize and fix these failure patterns:

| Pattern | Symptom | Fix |
|---------|---------|-----|
| Kitchen sink | Unrelated tasks mixed in one session | `/clear` between unrelated tasks |
| Repeated corrections | Same fix fails multiple times | After 2 failures, `/clear` and rewrite prompt |
| Overspecified CLAUDE.md | Rules ignored because file is too long | Prune ruthlessly, convert to hooks |
| Trust-then-verify gap | Plausible code ships without testing | Always provide verification |
| Infinite exploration | Claude reads hundreds of files | Scope narrowly or use subagents |
| Sunk cost | Pushing a failing session | Quick abandonment. Parallel sessions hedge. |

**Recovery technique:** After a mediocre fix, try: "Knowing everything you know now, scrap this and implement the elegant solution."

## Session Control Quick Reference

| Command | Action | When to Use |
|---------|--------|-------------|
| `Esc` | Interrupt | Claude heading wrong direction |
| `Esc Esc` | Rewind menu | Restore previous state |
| `/clear` | Reset context | Conversation drifted too far |
| `/compact` | Compress | Free context space between subtasks |
| `"undo that"` | Revert changes | Quick correction |
| `--continue` | Resume session | Pick up where left off |

## Additional Resources

For detailed guidance on each practice area, consult:

### Reference Files

- **`references/context-and-sessions.md`** — Deep dive on context window management, session control, parallelization, and when to clear vs. compact
- **`references/verification-and-prompting.md`** — Verification loop patterns, specific prompting techniques, feeding rich content with @-references, images, and pipes
- **`references/workflow-and-planning.md`** — The 4-step workflow in detail, plan mode usage, spec generation via the interview technique
- **`references/memory-skills-subagents.md`** — CLAUDE.md best practices (what to include/exclude, structure, golden rule), skills system, subagent delegation patterns
- **`references/advanced-techniques.md`** — CLI tool integration, hooks, /permissions, emphasis in CLAUDE.md, learning techniques, and developing intuition

### Applying These Practices

To apply best practices to a project:

1. Run `/init` to generate or update CLAUDE.md
2. Add verification commands to CLAUDE.md (test runner, linter, type-checker)
3. Follow Explore → Plan → Implement → Commit for every non-trivial task
4. Use `/compact` between subtasks and `/clear` between unrelated tasks
5. Use subagents for tasks that would bloat context
6. Convert repeated patterns into skills
7. After every correction, update CLAUDE.md with the lesson learned
