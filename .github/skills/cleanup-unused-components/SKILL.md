---
name: cleanup-unused-components
description: "Use when: find and remove unused React/Next.js components, audit imports, or clean up dead UI code. Keywords: unused components, limpiar componentes, cleanup UI, remove dead code."
---

# Cleanup Unused Components

## Goal
Detect components that are not referenced anywhere, remove them safely, and keep imports consistent.

## Workflow
1. Inventory all components under `components/` and `components/ui/`.
2. Search for imports/usage in `app/`, `components/`, `hooks/`, `lib/`.
3. Build a list of candidates with no references.
4. Move candidates to `components/_archive/` first (safe rollback).
5. Update imports, re-exports, and types if needed.
6. Run a build or lint to confirm no breakage.

## Guardrails
- Prefer a soft delete (archive) before permanent deletion.
- Do not remove components used by dynamic imports or MD/MDX content without explicit confirmation.
- When unsure, ask for confirmation.

## Output
- List of unused components and their previous paths.
- Summary of updated imports and references.
