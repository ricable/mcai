# CLAUDE.md, Skills, and Subagents

## CLAUDE.md: Your Project Brain

CLAUDE.md is a markdown file that Claude reads at the start of every session. It is the project's persistent memory. Write it like onboarding notes for a new team member who happens to be extremely capable.

### Creating CLAUDE.md

Run `/init` inside a Claude session to generate a CLAUDE.md automatically. This works even on existing projects—it analyzes the codebase to detect build systems, test frameworks, and code patterns. Surprisingly good starting point.

```
/init
✓ Created CLAUDE.md with project overview
```

### What to Include

- **Bash commands Claude cannot guess** — Custom build commands, test runners with specific flags, deployment scripts
- **Code style rules that differ from defaults** — "Functional components only, no classes" or "Zod for all validation"
- **Testing instructions** — Test runners, how to run specific test suites, expected test behavior
- **Repo etiquette** — Branch naming conventions, PR templates, commit message format
- **Architectural decisions** — Why certain patterns were chosen, key design constraints
- **Common gotchas** — Things that trip up newcomers

### What to Leave Out

- **Anything Claude can figure out by reading code** — Don't describe what functions do if the code is clear
- **Standard language conventions** — Claude already knows TypeScript, Python, etc.
- **Detailed API docs** — Link to them instead of inlining
- **Information that changes frequently** — Will become stale and misleading
- **Long tutorials or file-by-file descriptions** — Too much noise

### Example CLAUDE.md

```markdown
# My Project

Tech stack: Next.js 14, TypeScript, Prisma, PostgreSQL
Test cmd: npm test (vitest)
Lint cmd: npm run lint (eslint + prettier)

## Style
- Functional components, no classes
- Zod for validation
- AppError class for all error handling

## Testing
- Run `npm test` before committing
- Run `tsc --noEmit` to check types
- Integration tests in `tests/integration/`

## Architecture
- API routes in `src/app/api/`
- Database models in `prisma/schema.prisma`
- Shared types in `src/types/`
```

### CLAUDE.md Locations

| Location | Scope | Use Case |
|----------|-------|----------|
| `./CLAUDE.md` | Project root | Project-wide conventions, loaded every session |
| `~/.claude/CLAUDE.md` | User global | Personal preferences across all projects ("always use TypeScript") |
| `subdir/CLAUDE.md` | Subdirectory | Conventions specific to that directory, useful for monorepos |

### The Golden Rule

After every correction, end the prompt with:

```
Update your CLAUDE.md so you don't make that mistake again.
```

This turns every mistake into a permanent improvement. Over time, CLAUDE.md becomes an increasingly accurate representation of project conventions.

### Keeping CLAUDE.md Lean

Keep it under 500 lines. If Claude keeps ignoring a rule, the file is probably too long and the rule is getting lost. Prune ruthlessly. If Claude already does something correctly without the instruction, delete it or convert it to a hook.

### Importing Files

CLAUDE.md can import files with @-references. Keep the main file clean and concise. Put details in separate files:

```markdown
# My Project
@docs/api-patterns.md
@docs/testing-guide.md
@docs/architecture.md
```

### Using Emphasis

Claude responds to emphasis in CLAUDE.md. Use sparingly for rules that truly matter:

```markdown
IMPORTANT: never use var
You MUST use the AppError class for all errors
**Always** run tests before committing
```

## Skills: On-Demand Expertise

CLAUDE.md is always loaded. Skills are loaded only when invoked with a slash command. This distinction matters because it keeps base context clean while providing deep specialization on demand.

### CLAUDE.md vs. Skills

| Aspect | CLAUDE.md | Skills |
|--------|-----------|--------|
| Loading | Always loaded | On demand |
| Timing | Session start | When invoked |
| Scope | Project-wide conventions | Deep expertise for specific tasks |
| Context cost | Uses context even when not needed | Zero cost when not active |

### Creating Skills

A skill is a SKILL.md file in `.claude/skills/`:

```markdown
---
name: code-review
description: Review staged changes for issues
---

Review the staged changes. Check for:
1. Security issues (injection, auth bypass)
2. Performance regressions
3. Missing tests for new logic
4. Style guide violations per CLAUDE.md
```

### Two Types of Skills

1. **Auto-invoked domain knowledge** — Claude applies when working in relevant areas automatically
2. **Workflow skills** — Invoked with a slash command for repeatable multi-step processes

### Skill Best Practices

- Create skills for any pattern that repeats across projects
- Commit skills to Git so they are portable
- Built-in skills like `/docx`, `/xlsx`, `/pptx`, and `/pdf` handle document creation
- Build learning-focused skills (e.g., spaced repetition where concepts are explained and Claude fills gaps)

## Subagents: Isolated Context

Subagents are separate Claude instances that the main session spawns. Each gets its own context window. When finished, only the result returns to the parent. This handles tasks that would otherwise bloat context.

### Key Properties

| Property | Description |
|----------|-------------|
| **Isolated context** | Each subagent gets a fresh 200k-token window |
| **Parallel execution** | Multiple subagents run simultaneously |
| **Compact results** | Only the summary returns to parent |

### Example

```
Audit all API endpoints for security issues. Check auth,
input validation, and rate limiting across all routes.

⚡ Spawning 3 subagents...
Agent 1: Checking auth middleware
Agent 2: Auditing input validation
Agent 3: Reviewing rate limiting

✓ Audit complete. Found 3 issues:
HIGH /api/admin/users missing auth check
MED  /api/upload no file size limit
LOW  /api/search missing rate limiter
```

### When to Use Subagents

- **Broad codebase searches** — Reading many files without polluting main context
- **Parallel independent tasks** — Audit frontend while backend tests run
- **Large file analysis** — A subagent reads 100k tokens but returns a 2k summary
- **Specialized roles** — Code Simplifier, Verify App, Build Validator, Code Architect

### Specialized Subagent Roles

Create role-specific subagents for distinct responsibilities:

- **Code Simplifier** — Cleanup and simplification
- **Verify App** — End-to-end testing
- **Build Validator** — Ensure builds pass
- **Code Architect** — Design decisions and architecture review

### Triggering Subagents

Append "use subagents" to any request where more compute should be thrown at the problem:

```
Refactor the auth module for clarity. Use subagents.
```

Claude will automatically create subagents for complex tasks when the workload warrants parallelization.
