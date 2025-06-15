
# TeamBanalo - Find Your Perfect Hackathon Teammates

A modern, sleek platform that helps students and developers find teammates for hackathons. Built with React, Vite, TypeScript, and Tailwind CSS with a beautiful dark UI inspired by modern developer tools.

## ✨ Features

### 🎯 Core Functionality
- **Smart Teammate Matching**: AI-powered algorithm to find compatible teammates based on skills, location, and project preferences
- **Complete Profile Management**: Detailed profiles with skills, experience, portfolio, and preferences
- **Team Building Tools**: Create project ideas, specify required skills, and find the perfect team composition
- **Hackathon Discovery**: Browse and filter upcoming hackathons by location, date, and focus areas

### 🔐 Authentication & User Management
- **Secure Authentication**: Email/password login with password reset functionality
- **Profile Completion**: Step-by-step profile setup with progress tracking
- **Settings & Preferences**: Comprehensive settings for notifications, privacy, and account management

### 🎨 Modern UI/UX Design
- **Dark Theme First**: Beautiful dark UI with neon blue/purple accents inspired by axelo.dev
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle hover effects, transitions, and micro-interactions
- **Accessibility**: High contrast ratios and keyboard navigation support

### 🚀 Technical Features
- **React 18**: Latest React with functional components and hooks
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS with custom design system
- **Vite**: Lightning-fast development and build tooling
- **React Router**: Client-side routing with protected routes
- **Context API**: State management for authentication and theming

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **UI Components**: shadcn/ui components
- **Animations**: CSS animations with Tailwind

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd teambanalo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 📱 Pages & Features

### 🏠 Landing Page
- Hero section with compelling value proposition
- Feature overview with animated cards
- Statistics and social proof
- Call-to-action for signup/login

### 🔐 Authentication
- **Login**: Email/password with "Remember me" option
- **Signup**: Full registration with terms acceptance
- **Forgot Password**: Email-based password reset flow

### 🏠 Dashboard (Protected)
- Welcome banner with personalized greeting
- Profile completion status and quick actions
- Recent activity feed
- AI-powered teammate recommendations
- Upcoming hackathons list

### 👤 Profile Management (Protected)
- Comprehensive profile editing
- Skills management with suggestions
- Portfolio and resume upload
- Hackathon preferences
- Profile completion tracking

### 🔍 Find Teammates (Protected)
- Hackathon project description form
- AI-powered project/skills generation
- Advanced filtering options
- Teammate recommendation cards with match percentages
- Contact and profile viewing options

### ⚙️ Settings (Protected)
- Account information management
- Email and password updates
- Notification preferences
- Theme toggle (dark/light mode)
- Privacy and security settings
- Account deletion

## 🎨 Design System

### Color Palette
```css
/* Dark Backgrounds */
--dark-100: #0a0a0a;
--dark-200: #111111;
--dark-300: #1a1a1a;
--dark-400: #242424;

/* Electric Accents */
--electric-blue: #00d4ff;
--electric-purple: #8b5cf6;
--electric-teal: #14b8a6;
--electric-pink: #ec4899;

/* Neon Highlights */
--neon-blue: #0ea5e9;
--neon-purple: #a855f7;
--neon-green: #22c55e;
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive Typography**: Fluid text scaling

### Components
- **Glass Cards**: `bg-white/5 backdrop-blur-xl border-white/10`
- **Electric Buttons**: Gradient backgrounds with glow effects
- **Input Fields**: Dark backgrounds with electric blue focus states
- **Animations**: Smooth transitions and hover effects

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── Layout/          # Navbar, Footer
│   └── ui/              # Reusable UI components
├── contexts/            # React Context providers
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   └── ...             # Other pages
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

### Key Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Code Quality
npm run type-check   # TypeScript type checking
```

### Environment Variables
No environment variables required for basic functionality. The app includes:
- Mock authentication system
- Local storage for user data
- Simulated API responses

For production deployment, you'll want to:
- Replace mock auth with real authentication service
- Connect to a real database
- Add proper API endpoints
- Configure deployment environment

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

- **Vercel**: Connect your Git repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after `npm run build`
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [axelo.dev](https://axelo.dev)
- Icons from [Lucide React](https://lucide.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Typography from [Google Fonts](https://fonts.google.com)

---

**Made with ❤️ for the developer community**

Ready to find your perfect hackathon teammates? Start building amazing projects together! 🚀
