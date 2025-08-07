# Authentication System - RR Chocolatte

This is a simple front-end authentication system using dummy data for the RR Chocolatte website.

## Features

- **Sign Up**: Create a new account with name, email, and password
- **Sign In**: Login with email and password
- **Dashboard**: View user information when logged in
- **Local Storage**: Dummy session management using browser's localStorage

## Pages

- **Home Page** (`/`): Landing page with navigation and dashboard
- **Sign In** (`/auth/sign-in`): Login form
- **Sign Up** (`/auth/sign-up`): Registration form

## Demo Credentials

For testing, you can use these pre-configured accounts:

1. **Test User**
   - Email: `test@example.com`
   - Password: `password123`

2. **Admin User**
   - Email: `admin@chocolatte.com`
   - Password: `admin123`

3. **Demo User**
   - Email: `user@demo.com`
   - Password: `demo123`

## How It Works

### Sign Up Process

1. User fills out the registration form
2. Form validates password length (min 6 characters)
3. Confirms password match
4. Checks terms agreement
5. Stores user data in localStorage
6. Redirects to sign in page

### Sign In Process

1. User enters email and password
2. System checks against dummy user data or localStorage
3. If valid, creates a user session in localStorage
4. Redirects to dashboard

### Session Management

- User session is stored in `localStorage` as JSON
- Dashboard checks for valid session on page load
- Sign out clears the session data

## Technical Stack

- **Nuxt 4**: Vue.js framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling (via CDN)
- **Vue 3**: Reactive framework
- **Local Storage**: Client-side data persistence

## File Structure

```
pages/
├── index.vue              # Home/Dashboard page
└── auth/
    ├── sign-in.vue        # Login page
    └── sign-up.vue        # Registration page
app/
└── app.vue               # Root component
```

## Development

1. Install dependencies: `npm install` or `bun install`
2. Start dev server: `npm run dev` or `bun run dev`
3. Open browser to `http://localhost:3001`

## Future Enhancements

When ready to add a backend:

1. Replace localStorage with HTTP API calls
2. Add proper password hashing
3. Implement JWT tokens or session cookies
4. Add email verification
5. Add password reset functionality
6. Add user profile management
