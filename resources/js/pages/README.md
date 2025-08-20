# Frontend Pages Organization

This directory contains all the frontend pages for the IT Helpdesk Ticketing System, organized into logical groups for better maintainability.

## Directory Structure

```
pages/
├── auth/                     # Authentication related pages
│   ├── login.tsx
│   ├── register.tsx
│   ├── forgot-password.tsx
│   ├── reset-password.tsx
│   ├── verify-email.tsx
│   ├── confirm-password.tsx
│   └── index.ts
├── management/               # System administration pages
│   ├── branches.tsx         # Branch management
│   ├── categories.tsx       # Ticket category management
│   ├── departments.tsx      # Department management
│   ├── roles.tsx           # User role management
│   ├── audit-trails.tsx    # System audit logs
│   └── index.ts
├── settings/                # User preference pages
│   ├── profile.tsx
│   ├── password.tsx
│   ├── appearance.tsx
│   └── index.ts
├── user/                    # End-user functionality
│   ├── create-ticket.tsx
│   └── index.ts
├── dashboard.tsx           # Main dashboard
├── tickets.tsx            # Ticket listing/management
├── landing-page.tsx       # Application landing page
├── index.ts              # Main exports
└── README.md             # This file
```

## Naming Conventions

- **Files**: Use kebab-case for file names (e.g., `landing-page.tsx`, `create-ticket.tsx`)
- **Components**: Use PascalCase for component names (e.g., `LandingPage`, `CreateTicket`)
- **Exports**: Each folder has an `index.ts` file for organized exports

## Import Examples

### Using grouped imports:
```tsx
import { Management } from '@/pages';
// Access: Management.Branches, Management.Categories, etc.

import { Auth } from '@/pages';
// Access: Auth.Login, Auth.Register, etc.
```

### Using direct imports:
```tsx
import { Dashboard, Tickets } from '@/pages';
import { Login } from '@/pages/auth';
import { Branches } from '@/pages/management';
```

### Individual file imports:
```tsx
import Dashboard from '@/pages/dashboard';
import Login from '@/pages/auth/login';
import Branches from '@/pages/management/branches';
```

## Page Categories

### 🔐 Auth Pages
Authentication and user account related functionality.

### 🛠️ Management Pages  
System administration features for managing system entities like branches, departments, categories, and roles.

### ⚙️ Settings Pages
User preferences and account settings.

### 👤 User Pages
End-user functionality for ticket creation and user-specific features.

### 📊 Core Pages
Main application pages like dashboard and ticket management.

## Guidelines

1. **Single Responsibility**: Each page should have a single, clear purpose
2. **Consistent Structure**: Follow the established patterns for imports, exports, and component structure
3. **Proper Naming**: Use descriptive, consistent naming conventions
4. **Index Files**: Always maintain index files for clean imports
5. **Documentation**: Update this README when adding new pages or changing structure