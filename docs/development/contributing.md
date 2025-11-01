# Contributing

We welcome contributions to GetStream.io Server! This guide will help you get started.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/getstream-io-server.git
   cd getstream-io-server
   ```
3. **Install dependencies**:
   ```bash
   yarn install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Make Your Changes

- Follow the existing code style
- Write meaningful commit messages
- Keep changes focused and atomic

### 2. Test Your Changes

```bash
# Run the development server
yarn dev

# Test your changes manually
# Use Postman collection for API testing
```

### 3. Update Documentation

- Update API documentation if you add/modify endpoints
- Update README.md if you change setup process
- Add examples if introducing new features

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style

- Use TypeScript for all source files
- Follow existing naming conventions
- Use async/await for asynchronous operations
- Add JSDoc comments for functions
- Keep functions small and focused

## Pull Request Guidelines

- **Title**: Clear and descriptive
- **Description**: Explain what and why
- **Testing**: Describe how you tested
- **Screenshots**: If UI changes
- **Breaking Changes**: Clearly document

## Questions?

Feel free to open an issue for questions or discussions.
