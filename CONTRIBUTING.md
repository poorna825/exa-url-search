# Contributing to EXA URL Search

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork and clone the repository
2. Run setup script: `.\scripts\setup.ps1` (Windows) or `./scripts/setup.sh` (Linux/Mac)
3. Create a branch: `git checkout -b feature/your-feature-name`

## Code Style

### Backend (Python)
- Follow PEP 8
- Use type hints
- Maximum line length: 100 characters
- Format code with Black: `black backend/app`
- Lint with flake8: `flake8 backend/app`

### Frontend (TypeScript/React)
- Follow ESLint configuration
- Use functional components with hooks
- Use TypeScript strict mode
- Format with Prettier (if configured)

## Testing

### Backend
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend
```bash
cd frontend
npm test
```

## Commit Messages

Use conventional commits format:
- `feat: Add new feature`
- `fix: Fix bug`
- `docs: Update documentation`
- `test: Add tests`
- `refactor: Refactor code`
- `chore: Update dependencies`

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md (if exists)
5. Request review from maintainers

## Code Review

- Be respectful and constructive
- Focus on code quality and best practices
- Suggest improvements, don't demand changes
- Provide context for suggestions

## Questions?

Open an issue for questions or clarifications.
