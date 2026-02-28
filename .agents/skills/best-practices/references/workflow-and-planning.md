# The Four-Step Workflow and Spec Generation

## Explore → Plan → Implement → Commit

Anthropic recommends this four-step workflow for non-trivial tasks. The key insight: always start complex tasks in plan mode, no exceptions. Each step constrains the next one, preventing Claude from going off-track.

## Step 1: Explore

Ask Claude to read the relevant code and understand the current state. Do not ask it to change anything yet. This grounds the conversation in facts rather than assumptions.

```
Read src/auth/ and explain how the login flow works today.
Don't change anything yet.
```

```
Read the database models in src/models/ and explain the relationships
between User, Order, and Product. Don't modify anything.
```

### Why Explore First

- Prevents Claude from making assumptions about the codebase
- Builds accurate mental model before proposing changes
- Catches misconceptions early (before they become wrong code)
- Establishes shared vocabulary for the planning phase

### Exploration Tips

- Scope narrowly: "Read src/auth/" not "understand the whole codebase"
- Ask for explanations: "Explain how X works today"
- Explicitly say "don't change anything yet"
- If the exploration would be too broad, use subagents

## Step 2: Plan

Ask Claude to propose a plan. Review it. This is where misunderstandings are caught before they become wrong code.

```
Now write a plan for adding OAuth. Which files need to change?
What's the order of operations? Don't implement yet.
```

### Plan Mode

Press Shift+Tab twice to enter plan mode for read-only guarantees. In plan mode, Claude can only read files and search—it cannot write or execute commands. This ensures the planning phase stays pure.

### Planning Tips

- Iterate on the plan until it is solid
- Ask clarifying questions about the plan
- Have Claude identify risks or edge cases
- Once the plan is approved, switch to auto-accept for implementation
- Re-enter plan mode if Claude starts derailing during implementation

### Good Plan Elements

A solid plan should include:

1. **Files to modify** — Explicit list of files that will change
2. **Order of operations** — Which changes come first and why
3. **Test strategy** — How to verify each change
4. **Edge cases** — What could go wrong
5. **Rollback plan** — How to undo if something goes wrong

## Step 3: Implement

Execute the plan with verification built in. Because Claude already understands the code and the approach is agreed upon, implementation is faster and more accurate.

```
Implement the plan. After each file, run the test suite.
Don't move on until all tests pass.
```

### Implementation Tips

- Include verification in the implementation prompt
- Reference the plan: "Implement step 2 from the plan"
- Keep implementation prompts focused on one step at a time for complex changes
- If Claude deviates from the plan, interrupt and redirect
- Claude typically executes in one shot after a good plan

### The One-Shot Advantage

Good planning prevents mid-course corrections that waste time and context. When the plan is solid, Claude implements it in one pass. The planning phase investment pays for itself by eliminating rework.

## Step 4: Commit

Let Claude write the commit message. It has seen every change and can summarize them accurately.

```
Commit this with a clear message. If the changes are large,
split into separate logical commits.
```

### Commit Tips

- Let Claude write the message—it has full context of what changed
- Ask for logical splits for large diffs
- Review the commit message for accuracy
- Include test results in the commit message if relevant

### Example Output

```
✓ Created 2 commits:
a3f2c1d feat: add OAuth provider configuration
b7e4a9f feat: integrate OAuth into login flow with tests
```

## Spec Generation: The Interview Technique

For complex features, have Claude interview before coding. Start with a minimal prompt, and Claude asks targeted questions about things that might not have been considered: implementation details, edge cases, trade-offs.

### How It Works

```
I want to add a notification system. Interview me about the
requirements, then write a spec.
```

Claude will ask focused questions:

```
? What types of notifications do you need?
  (email, push, in-app, SMS)

> Email and in-app for now. Push later.

? Should users be able to configure their preferences?
  (per-type opt-out, frequency digests, quiet hours)

> Yes, per-type opt-out. No digests yet.

? What triggers notifications?
  (user actions, system events, scheduled)

> New comments, assignment changes, and a daily summary.

✓ Spec written to docs/notification-spec.md
  12 sections, 3 data models, 7 API endpoints defined
```

### The Fresh Start After Interview

Once the spec is complete, start a new Claude session to execute it. Clean context, focused entirely on implementation. The spec becomes the input for the next session.

This separation is powerful because:
- The interview session explores requirements broadly (uses context for exploration)
- The implementation session is focused and efficient (uses context for building)
- Neither session's context is polluted by the other's concerns

### When to Use Spec Generation

- Complex features with many moving parts
- Features where requirements are unclear
- Multi-service or multi-component changes
- Projects with many stakeholders or considerations
- Any time uncertainty about edge cases or trade-offs exists

### Interview Tips

- Start with a minimal prompt describing the goal
- Let Claude drive the questions
- Be honest about what is unknown ("I'm not sure yet, what do you recommend?")
- The spec Claude produces is often better than what would be written alone
- Use the AskUserQuestion tool for structured interviewing

## Workflow Decision Guide

| Task Type | Recommended Approach |
|-----------|---------------------|
| Simple bug fix | Skip plan, go straight to implement + verify |
| Feature addition | Full 4-step workflow |
| Complex feature | Spec generation → New session → 4-step workflow |
| Refactoring | Explore → Plan → Implement (emphasize existing tests) |
| Exploratory research | Explore only, then decide next steps |
| Code review | Pipe diff → Review (no plan needed) |
