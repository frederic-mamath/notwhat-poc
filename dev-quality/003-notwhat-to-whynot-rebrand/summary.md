# NotWhat to WhyNot Rebranding - Summary

## Overview
Replace all occurrences of "notwhat" with "whynot" across the codebase, documentation, configuration, and database to complete the project rebranding.

## Goal
Achieve 100% consistent branding by replacing "notwhat" (old name) with "whynot" (new name) in all project files, database, and configuration.

## Motivation
- ✅ **Brand consistency**: Align codebase with the deployed domain (whynot.mamath.fr)
- ✅ **Clarity**: Avoid confusion between old and new project names
- ✅ **Professionalism**: Present a unified brand identity in all touchpoints
- ✅ **Discoverability**: Make the codebase match public-facing URLs and documentation

## Progress Tracking
| Phase | Description | Status | Estimated Time |
|-------|-------------|--------|----------------|
| Phase 1 | Configuration & Package Metadata | ✅ Complete | 30 min |
| Phase 2 | Database Schema & Migrations | ✅ Complete | 15 min |
| Phase 3 | Source Code & Documentation | ✅ Complete | 1 hour |
| Phase 4 | UI Text & User-Facing Content | ⏳ Pending | 1 hour |

## Components/Files Affected

### ✅ Phase 1: Configuration & Package Metadata (COMPLETE)
- ✅ `package.json` - Updated name to "whynot"
- ✅ `package-lock.json` - Regenerated with new name
- ✅ `.env.example` - Updated database connection strings
- ✅ `.env.staging` - Updated database connection strings
- ✅ `README.md` - Updated project title and references
- ✅ `.github/copilot-instructions.md` - Updated project name

### ✅ Phase 2: Database Configuration (COMPLETE)
- ✅ `docker-compose.yml` - Updated container name and database name
- ✅ Container running as `whynot-postgres`
- ✅ Database created as `whynot`
- ✅ Connection verified successfully

### ✅ Phase 3: Source Code & Documentation (COMPLETE)
- ✅ `features/001-live-streaming-channels/phase-1-setup-infrastructure.md` - Updated all references
- ✅ `dev-quality/002-shadcn-component-migration/phase-3-navigation.md` - Updated branding
- ✅ `dev-quality/002-shadcn-component-migration/phase-6-polish.md` - Updated description
- ✅ `client/src/components/NavBar/NavBar.tsx` - Changed "NotWhat" to "WhyNot"
- ✅ `src/db/index.ts` - Updated default database name
- ✅ `.env` - Updated local environment file

### ⏳ Phase 4: UI Text & User-Facing Content
- NavBar/Header components
- Page titles and meta tags
- Error messages
- Any user-facing text

## Risks & Considerations
- **Database migration**: Renaming the database requires downtime or careful migration
- **Environment variables**: Must update all deployment environments (.env files)
- **Git history**: Old references will remain in git history (expected)
- **External dependencies**: Check if any external services reference "notwhat"

## Success Criteria
- ✅ All files contain "whynot" instead of "notwhat"
- ✅ Application builds successfully
- ✅ All tests pass (if any)
- ✅ Database renamed or migration completed
- ✅ Local and staging environments updated
- ✅ No console errors or warnings related to naming

## Status
⏳ **IN PROGRESS** - Phases 1, 2 & 3 Complete, Ready for Phase 4

## Notes
- This is a low-risk refactoring that should not break functionality
- Each phase is designed to be completed independently
- Can be paused and resumed at any phase boundary
- Changes are primarily textual replacements
