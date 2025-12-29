# Execute PRP (Product Requirements Prompt)

Implement the feature described in the PRP file specified by $ARGUMENTS.

## Process

1. **Read the PRP file** at the path specified (e.g., PRPs/scripture-notes.md)

2. **Review context**:
   - Read CLAUDE.md for project-wide rules
   - Check existing code structure
   - Note any validation requirements

3. **Execute implementation** following the PRP's blueprint:
   - Follow the phased approach exactly
   - Create files in the specified order
   - Run validation commands after each phase

4. **For each phase**:
   - State what you're building and why
   - Create the files
   - Run the phase validation
   - Only proceed when validation passes

5. **Quality gates**:
   - TypeScript must compile without errors
   - All components must render
   - API endpoints must respond correctly
   - UI must match design specifications

## Implementation Principles

- **No placeholders**: Every file should be complete and functional
- **No TODOs**: Implement everything as specified
- **Match the aesthetic**: Follow design system exactly
- **Test as you go**: Validate each phase before moving on
- **Commit incrementally**: Logical commits after each phase

## Example Usage
```
/execute-prp PRPs/scripture-notes.md
```
