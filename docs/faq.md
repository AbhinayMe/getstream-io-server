# Frequently Asked Questions

Common questions and answers about GetStream.io Server.

## General

### What is GetStream.io Server?

GetStream.io Server is a comprehensive Node.js Express backend API that provides token generation, user management, call management, and webhook processing for GetStream.io video calls.

### What's included?

- ✅ Token generation (user and call tokens)
- ✅ User management (CRUD operations)
- ✅ Call management (create, update, end calls)
- ✅ Webhook processing with signature verification
- ✅ TypeScript support
- ✅ MVC architecture
- ✅ Request validation
- ✅ Error handling
- ✅ Postman collection for testing

### What technologies are used?

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.2.2
- **Framework**: Express.js 4.18.2
- **SDK**: @stream-io/node-sdk 0.7.17
- **Validation**: express-validator 7.3.0
- **Package Manager**: Yarn

## Installation & Setup

### Do I need a GetStream.io account?

Yes, you need a GetStream.io account to get API credentials. Sign up at [getstream.io](https://getstream.io/).

### Can I use npm instead of Yarn?

The project is configured to use Yarn. While npm might work, we recommend using Yarn for consistency.

### The server won't start. What should I check?

1. Verify your `.env` file exists and contains correct credentials
2. Check that ports 3000 (or your configured port) are available
3. Ensure all dependencies are installed: `yarn install`
4. Check the console for specific error messages

## API Usage

### How do I generate tokens?

Use the `/api/tokens/user` endpoint for user authentication tokens and `/api/tokens/call` for call-specific tokens.

### What's the difference between user and call tokens?

- **User tokens**: General authentication for users to access the system
- **Call tokens**: Specific permissions for joining particular video calls, can include roles like admin/moderator

### How do I create a call?

Calls require a `createdBy` field with the user ID who creates the call. Example:

```json
{
  "callId": "my-call-123",
  "callType": "default",
  "createdBy": "user123"
}
```

### Why do I get "created_by or created_by_id must be provided"?

GetStream.io requires server-side authentication to specify who created the call. Always include the `createdBy` field when creating calls.

## Configuration

### What environment variables are required?

Only `STREAM_API_KEY` and `STREAM_API_SECRET` are required. All others are optional with sensible defaults.

### How do I enable webhook verification?

Set the `WEBHOOK_SECRET` environment variable to your webhook secret from the GetStream.io dashboard.

### Can I change the server port?

Yes, set the `PORT` environment variable. Default is 3000.

## Development

### How do I contribute?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### How do I run tests?

Currently, the project doesn't include automated tests, but you can test manually using the provided Postman collection.

### Can I modify the API endpoints?

Yes, but be aware that changing endpoints may break client applications. Consider versioning your API for breaking changes.

## Deployment

### Can I deploy to Heroku?

Yes! Heroku automatically detects Node.js apps. Set your environment variables in Heroku's dashboard.

### What about Docker?

A Dockerfile can be added. The app is container-ready as it uses environment variables for configuration.

### Is the app production-ready?

The app includes basic production features like error handling and validation, but consider adding:
- Rate limiting
- Logging
- Monitoring
- HTTPS enforcement
- Database persistence (if needed)

## Troubleshooting

### "Invalid API key" error

- Verify your API key in the GetStream.io dashboard
- Check for typos in your `.env` file
- Ensure you're using the correct key for your environment

### Webhook events not processing

- Verify `WEBHOOK_SECRET` is set correctly
- Check that your webhook URL is accessible from the internet
- Ensure webhook signature verification is enabled

### CORS errors

The app includes CORS middleware. If you're still getting CORS errors, check your frontend's origin settings.

### Memory usage is high

The app uses the GetStream SDK which handles connection pooling automatically. If you notice high memory usage, consider:
- Reducing concurrent connections
- Implementing caching
- Using a process manager like PM2

## Security

### Is the app secure?

The app includes:
- Input validation
- Webhook signature verification (when enabled)
- CORS protection
- No sensitive data logging

For production, consider additional security measures.

### Should I commit my .env file?

**Never commit `.env` files!** They contain sensitive credentials. Use `.env.example` as a template.

### How do I secure my API keys?

- Use environment variables in production
- Rotate keys regularly
- Restrict API key permissions
- Monitor API usage

## Performance

### What's the performance like?

The app is lightweight and should handle moderate traffic. Performance depends on:
- GetStream.io API response times
- Server resources
- Network latency

### Can I scale the app?

Yes, you can:
- Run multiple instances behind a load balancer
- Use container orchestration (Kubernetes, Docker Swarm)
- Implement caching layers
- Use CDN for static assets (if added)

## Support

### Where can I get help?

- [GitHub Issues](https://github.com/yourusername/getstream-io-server/issues) for bugs
- [GitHub Discussions](https://github.com/yourusername/getstream-io-server/discussions) for questions
- [GetStream.io Documentation](https://getstream.io/video/docs/) for SDK details

### How do I report a bug?

1. Check existing issues on GitHub
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

### Can I request features?

Yes! Open a GitHub issue with the "enhancement" label and describe your feature request.

---

*Still have questions? Check the [documentation](./) or open an issue on GitHub.*