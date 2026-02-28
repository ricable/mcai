# Context Management and Session Control

## The One Constraint: Context Is King

Everything Claude Code does well or poorly comes back to one thing: how much context it has, and how relevant that context is. Every technique in best practices is ultimately a strategy for managing the 200k-token context window.

## Context Management Strategies

### Be Clear

Ambiguous prompts waste tokens on exploration. A specific prompt with file paths and expected outcomes gets Claude to the right place immediately. Provide:

- Exact file paths when possible
- Expected behavior or outcomes
- References to existing patterns in the codebase
- Specific symptoms when debugging

### Keep It Compact

Use `/compact` between subtasks to summarize and free up space. Long conversations decay in quality as older context gets compressed. Pass instructions for controlled compaction:

```
/compact Focus on the API changes
```

This tells Claude what to preserve when summarizing the conversation.

### Parallelize Sessions

Run 5-10 parallel sessions simultaneously. Plan in one, review in another. Use 3-5 Git worktrees or checkouts for separate branches. Think of AI as capacity that can be scheduled, not a single conversational tool.

```bash
# Create worktrees for parallel development
git worktree add ../my-project-feature-a feature-a
git worktree add ../my-project-feature-b feature-b
git worktree add ../my-project-bugfix bugfix

# Run separate Claude sessions in each
cd ../my-project-feature-a && claude
cd ../my-project-feature-b && claude
```

### Track Context Usage

Configure the status line to always show context usage:

```
/statusline
```

This provides constant visibility into how much context remains, enabling proactive management before quality degrades.

## Session Control Commands

### Esc — Interrupt

Stop Claude mid-action. Use when Claude is heading in the wrong direction. New instructions can be given immediately after interrupting. This prevents wasted tokens on wrong approaches.

### Esc Esc — Rewind Menu

Double-tap Esc or use `/rewind` to open the rewind menu. Restore a previous conversation state or summarize from a selected point. Useful when Claude took a wrong turn several steps ago.

### /clear — Reset Context

Wipe the conversation and start fresh. CLAUDE.md gets reloaded automatically. Use when:

- The conversation has drifted too far from the original topic
- Switching to an unrelated task
- After 2 failed correction attempts on the same issue
- Context is polluted with irrelevant exploration

### /compact — Compress Context

Summarize the conversation to free up context space. Unlike `/clear`, this preserves the conversation thread while reducing token usage. Use between subtasks within the same overall task.

Pass focus instructions:

```
/compact Focus on the database migration changes
/compact Keep the API endpoint decisions
/compact Preserve the test strategy
```

### "undo that" — Revert Changes

Tell Claude "undo that" to revert recent changes. Works for quick corrections when Claude went in the wrong direction. Faster than manually reverting files.

### --continue — Resume Session

Pass `claude --continue` to pick up where the last session left off. Context and tool state are restored from the previous session. Use when:

- Resuming work after a break
- Continuing a long-running task across sessions
- Coming back to review changes made in a previous session

## When to Clear vs. Compact

| Situation | Action | Reason |
|-----------|--------|--------|
| Switching to unrelated task | `/clear` | Old context is irrelevant |
| Moving to next subtask | `/compact` | Preserve decisions, free space |
| After 2 failed corrections | `/clear` + rewrite prompt | Polluted context hurts more than fresh start |
| Deep in complex problem | Let context accumulate | Sometimes depth matters more than space |
| Session feels slow or confused | `/compact` first, `/clear` if no improvement | Try preserving context first |

## Debugging Workflow Anti-Patterns

### Kitchen Sink Session

**Problem:** Starting with one task, asking something unrelated, going back to the first. Context fills with irrelevant information.

**Fix:** Use `/clear` between unrelated tasks. One session, one purpose.

### Infinite Exploration

**Problem:** Asking Claude to investigate without scoping. Claude reads hundreds of files, filling the context window.

**Fix:** Scope investigations narrowly ("Read only the files in src/auth/"), or delegate to subagents which have their own context window.

### Sunk Cost Fallacy

**Problem:** Continuing to push a session that is going nowhere instead of starting fresh. Approximately 10-20% of sessions fail—this is normal.

**Fix:** Quick abandonment. Parallel sessions hedge against dead ends. If a session is not productive after 2-3 attempts, start a new one with a better prompt.

### Correcting Over and Over

**Problem:** Claude does something wrong, correction given, still wrong. Context gets polluted with failed approaches.

**Fix:** After 2 failures, `/clear` and rewrite the prompt from scratch with the lessons learned. The fresh context often leads to immediate success.

## Context Management Checklist

Before starting a task:
- [ ] Is CLAUDE.md up to date with relevant conventions?
- [ ] Are verification commands documented (test runner, linter)?
- [ ] Is the task scoped narrowly enough for one session?

During a task:
- [ ] Use `/compact` between subtasks
- [ ] Watch context usage in the status line
- [ ] Scope file exploration to relevant directories
- [ ] Use subagents for broad searches

After a task:
- [ ] `/clear` before switching to an unrelated task
- [ ] Update CLAUDE.md with any new lessons learned
- [ ] Consider if patterns should become skills
