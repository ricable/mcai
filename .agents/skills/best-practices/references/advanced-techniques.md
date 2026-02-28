# Advanced Techniques and Developing Intuition

## Pro Tips

Smaller techniques that add up over time. None are essential on day one, but experienced users rely on them heavily.

### Install CLI Tools

Install GitHub CLI, AWS CLI, gcloud, and other CLI tools. Claude can use them for external services without rate limits. Also tell Claude about linters and type-checkers in CLAUDE.md:

```markdown
After editing TypeScript files, always run tsc --noEmit
```

This turns the compiler into a verification loop.

### Use /init on Existing Projects

Run `/init` even on projects that have existed for years. It analyzes the codebase to detect build systems, test frameworks, and code patterns. A surprisingly good starting point for CLAUDE.md.

### Emphasize with IMPORTANT and Bold

Claude responds to emphasis in CLAUDE.md. Use sparingly for rules that really matter:

```markdown
IMPORTANT: never use var
You MUST use the AppError class
**Always** run tests before committing
```

Overuse dilutes the effect. Reserve emphasis for rules that truly cannot be violated.

### Post-Tool-Use Hooks

Use hooks for automatic formatting. After write or edit, run the formatter to catch the last 10% without approval prompts. Any workflow that repeats becomes a hook candidate.

Example hook configuration:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": {
          "tool_name": ["Write", "Edit"]
        },
        "command": "prettier --write ${file_path}"
      }
    ]
  }
}
```

### Use /permissions, Not --dangerously-skip-permissions

Never skip permissions in production. Use `/permissions` to pre-approve specific safe commands instead. Also check `/sandbox` for OS-level isolation. Sandboxing defines upfront boundaries rather than bypassing all checks.

```
/permissions
```

Pre-approve specific patterns:
- `npm test` — Safe to run automatically
- `tsc --noEmit` — Type-checking is read-only
- `eslint --fix` — Linting with auto-fix

### Always Use the Latest Model

Optimize for cost per reliable change, not cost per token. The correction tax of weaker models' hallucinations costs more than the model itself. The latest Opus model gives significantly better first-attempt success rates.

### Keep Learning with Claude

- Enable explanatory or learning output styles in `/config` to have Claude explain the "why" behind changes
- Have Claude generate visual HTML presentations explaining unfamiliar code
- Ask Claude to draw ASCII diagrams of new protocols or architectures
- Use Claude as a learning tool, not just a coding tool

## The Meta-Lesson: Develop Your Intuition

The techniques in this guide are a starting point. The real skill is developing an intuition for:

- **When to explore vs. implement** — Sometimes exploration is premature; sometimes skipping it causes rework
- **When to compact vs. start fresh** — Complex problems may need accumulated context; drifted conversations need a clean slate
- **When to use a subagent vs. handle it directly** — Small tasks don't need isolation; broad searches do
- **When to plan vs. just do it** — Trivial bug fixes don't need a plan; features always do
- **When a vague prompt is right** — Sometimes intentional vagueness reveals how Claude interprets the problem

### Building Intuition

Start with one technique from this guide. Use it for a week until it becomes automatic. Then add another. Pay attention to what works in each specific situation:

1. **Week 1:** Always use Explore → Plan → Implement → Commit
2. **Week 2:** Add verification to every prompt
3. **Week 3:** Master /clear and /compact for context management
4. **Week 4:** Start using subagents for broad tasks
5. **Week 5:** Create first custom skill for a repeated workflow

### The Failure Budget

Approximately 10-20% of sessions fail. This is normal and expected. The key is:

- **Quick abandonment** — Don't push a failing session
- **Parallel sessions** — Hedge against dead ends
- **Learn from failures** — Update CLAUDE.md with what went wrong
- **Fresh starts** — A new session with a better prompt often succeeds immediately

### Recovery Techniques

When a session is struggling:

1. **Re-enter plan mode** — When Claude starts derailing, switch back to planning
2. **"Knowing everything you know now..."** — Ask Claude to scrap and redo with accumulated understanding
3. **Start fresh** — `/clear` or new session with lessons learned in the prompt
4. **Scope down** — Break the task into smaller pieces
5. **Add verification** — If verification was missing, add it and try again

## Quick Reference: All Best Practices

| # | Practice | Action |
|---|----------|--------|
| 1 | Context is king | Keep context clear, compact, relevant |
| 2 | Verification | Add tests/linters/type-checks to every task |
| 3 | 4-step workflow | Explore → Plan → Implement → Commit |
| 4 | Be specific | Name files, describe behavior, reference patterns |
| 5 | Rich input | Use @-references, images, pipes |
| 6 | CLAUDE.md | Run /init, maintain it, keep under 500 lines |
| 7 | Skills | Convert repeated patterns to on-demand skills |
| 8 | Subagents | Isolate broad searches and parallel tasks |
| 9 | Spec generation | Have Claude interview before complex features |
| 10 | Failure patterns | Know when to /clear, /compact, or abandon |
| 11 | Session control | Master Esc, /clear, /compact, --continue |
| 12 | Pro tips | CLI tools, hooks, /permissions, emphasis |
| 13 | Intuition | Practice > rules. Start with one technique at a time |

## Attribution

Based on Anthropic's official Claude Code best practices combined with Boris Cherny's personal workflow, as documented by GritAI Studio (last updated Feb 28, 2026).
