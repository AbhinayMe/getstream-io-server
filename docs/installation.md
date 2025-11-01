# Installation Guide

Detailed installation and setup instructions for GetStream.io Server.

## System Requirements

### Minimum Requirements
- **Node.js**: 18.0.0 or higher
- **Yarn**: 1.22.0 or higher (Yarn is required as the package manager for this project)
- **Memory**: 256MB RAM
- **Storage**: 50MB free disk space

### Recommended Requirements
- **Node.js**: 20.0.0 or higher
- **Yarn**: 1.22.22 or higher
- **Memory**: 512MB RAM
- **Storage**: 100MB free disk space

## Installation Methods

### Method 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/getstream-io-server.git

# Navigate to project directory
cd getstream-io-server

# Install dependencies
yarn install
```

### Method 2: Download ZIP

1. Download the latest release ZIP from GitHub
2. Extract the ZIP file
3. Navigate to the extracted directory
4. Run `yarn install`

### Method 3: Using npx (Advanced)

```bash
# Create new project with template
npx create-getstream-server my-app
cd my-app
yarn install
```

## Environment Setup

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your values:

```env
# Required: GetStream.io API credentials
STREAM_API_KEY=your_actual_api_key
STREAM_API_SECRET=your_actual_api_secret

# Optional: Server configuration
PORT=3000

# Optional: Webhook security
WEBHOOK_SECRET=your_webhook_secret
```

### 3. GetStream.io Credentials

1. Sign up at [GetStream.io](https://getstream.io/)
2. Navigate to your dashboard
3. Create a new application or use existing one
4. Copy the API Key and Secret
5. Paste them into your `.env` file

## Verification

### Build Check

```bash
# Build the project
yarn build

# Should complete without errors
```

### Health Check

```bash
# Start the server
yarn dev

# In another terminal, check health
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "GetStream.io Server is running",
  "timestamp": "2025-11-01T10:00:00.000Z"
}
```

## Troubleshooting

### Common Issues

#### "yarn: command not found"
```bash
# Install Yarn
npm install -g yarn

# Or use Corepack (Node.js 16.10+)
corepack enable
corepack prepare yarn@stable --activate
```

#### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
yarn install
```

#### Port already in use
```bash
# Change port in .env file
PORT=3001

# Or kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

#### Build fails
```bash
# Clear cache and rebuild
yarn cache clean
rm -rf dist
yarn build
```

## Next Steps

- [Configure your environment](./configuration.md)
- [Test with Postman](./testing.md)
- [Deploy to production](./deployment.md)