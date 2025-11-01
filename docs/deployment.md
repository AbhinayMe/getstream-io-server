# Deployment Guide

Deploy GetStream.io Server to various platforms and environments.

## Quick Deploy Options

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   yarn global add vercel

   # Deploy
   vercel
   ```

2. **Set Environment Variables**
   ```bash
   vercel env add STREAM_API_KEY
   vercel env add STREAM_API_SECRET
   vercel env add WEBHOOK_SECRET
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Railway

1. **Connect GitHub Repository**
2. **Set Environment Variables** in Railway dashboard
3. **Deploy** - Railway auto-deploys on git push

### Render

1. **Connect Repository**
2. **Set Build & Start Commands**:
   - Build: `yarn build`
   - Start: `yarn start`
3. **Configure Environment Variables**
4. **Deploy**

## Manual Deployment

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

Build and run:

```bash
# Build image
docker build -t getstream-io-server .

# Run container
docker run -p 3000:3000 \
  -e STREAM_API_KEY=your_key \
  -e STREAM_API_SECRET=your_secret \
  getstream-io-server
```

### Heroku Deployment

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set STREAM_API_KEY=your_key
   heroku config:set STREAM_API_SECRET=your_secret
   heroku config:set WEBHOOK_SECRET=your_secret
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### AWS EC2

1. **Launch EC2 Instance** (Ubuntu)
2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/getstream-io-server.git
   cd getstream-io-server
   ```

4. **Install Dependencies**
   ```bash
   yarn install
   yarn build
   ```

5. **Configure Environment**
   ```bash
   sudo nano .env
   ```

6. **Run with PM2**
   ```bash
   yarn global add pm2
   pm2 start dist/index.js --name "getstream-server"
   pm2 startup
   pm2 save
   ```

## Environment-Specific Configurations

### Production Environment Variables

```env
NODE_ENV=production
PORT=8080
STREAM_API_KEY=your_production_key
STREAM_API_SECRET=your_production_secret
WEBHOOK_SECRET=your_production_webhook_secret
```

### Health Checks

Configure health check endpoints for your platform:

- **URL**: `https://your-domain.com/health`
- **Method**: GET
- **Expected Response**: HTTP 200 with JSON

### SSL/TLS

Most platforms (Vercel, Heroku, Railway) provide SSL automatically. For manual deployments:

```nginx
# Example nginx config
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Monitoring & Maintenance

### Process Management

Use PM2 for production:

```bash
# Install PM2
yarn global add pm2

# Start application
pm2 start dist/index.js --name "getstream-server"

# Configure for auto-start
pm2 startup
pm2 save

# Monitor
pm2 monit
```

### Logging

```bash
# View logs
pm2 logs getstream-server

# Reload without downtime
pm2 reload getstream-server

# Restart
pm2 restart getstream-server
```

### Backup Strategy

- **Environment Variables**: Store securely (not in code)
- **Configuration**: Version control non-sensitive config
- **Logs**: Consider log aggregation services

## Troubleshooting Deployment

### Common Issues

#### "Cannot find module" in production
```bash
# Ensure dependencies are installed
yarn install --production=false
yarn build
```

#### Port binding issues
- Check if port 3000 is available
- Use `PORT` environment variable
- Configure reverse proxy

#### Memory issues
```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 dist/index.js
```

#### CORS issues in production
- Verify `ALLOWED_ORIGINS` environment variable
- Check reverse proxy CORS headers

### Performance Optimization

#### Enable gzip compression
```javascript
const compression = require('compression');
app.use(compression());
```

#### Use a reverse proxy
```nginx
upstream getstream_server {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://getstream_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Security Checklist

- ✅ Environment variables configured
- ✅ HTTPS enabled
- ✅ Webhook signature verification enabled
- ✅ CORS properly configured
- ✅ Rate limiting considered
- ✅ Sensitive data not logged
- ✅ Dependencies updated regularly

## Support

For deployment issues, check:
- [Platform-specific documentation](./)
- [GitHub Issues](https://github.com/yourusername/getstream-io-server/issues)
- [GetStream.io Status](https://status.getstream.io/)