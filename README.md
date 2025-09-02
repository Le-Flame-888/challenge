# User Management Application - Development Challenge

## 🎯 Project Overview

This is a **partially implemented** React TypeScript user management application that serves as a technical assessment. You are tasked with completing the missing features and implementing proper CRUD functionality using modern React patterns and best practices.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: TanStack Router
- **State Management**: TanStack Query (React Query)
- **UI Framework**: Material-UI (MUI)
- **Data Grid**: MUI X Data Grid
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS + MUI
- **Form Management**: React Hook Form + Zod Resolver
- **Form Validation**: Zod
- **Backend**: JSON Server (Mock API)
- **Animations**: Framer Motion (recommended for advanced UI)
- **Icons**: Material Icons + Lucide React (for modern icons)
- **Theme**: MUI Custom Theme System

## 🏗️ Project Structure

```
src/
├── main.tsx                    # App entry point
├── routeTree.gen.ts           # Generated route tree
├── styles.css                 # Global styles
├── core/
│   └── users/                 # User domain
│       ├── api/               # API layer
│       ├── components/        # React components
│       ├── features/          # Feature components
│       ├── hooks/             # Custom hooks
│       ├── schemas/           # Zod validation schemas
│       └── consts/            # Constants and definitions
├── packages/
│   ├── axios/                 # HTTP client setup
│   ├── components/            # Shared components
│   ├── tanstack-query/        # Query client setup
│   └── themes/                # Theme configuration
└── routes/                    # Application routes
    ├── __root.tsx             # Root layout
    ├── index.tsx              # Home page (users list)
    ├── create/                # Create user page
    └── $userId/               # User detail page
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm (package manager)

### Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```



1. **Start the Mock API Server**:
   ```bash
   node server.js
   ```
   The API will run on `http://localhost:3001` with the following endpoints:
   - `GET /api/users` - List all users
   - `POST /api/users` - Create a new user
   - `GET /api/users/:id` - Get user by ID
   - `PUT /api/users/:id` - Update user
   - `DELETE /api/users/:id` - Delete user

   **Authentication**: All requests require `Authorization: Bearer test-token-123`

2. **Start the Development Server**:
   ```bash
   pnpm dev
   ```
   The app will run on `http://localhost:3000`

## ✅ What's Already Implemented

- [x] Project structure and build configuration (Vite, TypeScript, ESLint)
- [x] Basic routing setup with TanStack Router
- [x] HTTP client setup with Axios and authentication interceptor
- [x] Users list page with data fetching using TanStack Query
- [x] Basic Material-UI data grid displaying user data
- [x] Mock JSON Server API with sample user data
- [x] TypeScript schemas with Zod validation
- [x] Query client configuration and error handling
- [x] Basic table cell renderer for user roles
- [x] Responsive table with proper column definitions

## ❌ What You Need to Implement

### 🔴 Critical Missing Features (Required)

#### 1. **User Creation System**
- **Current State**: `/create` route exists but only shows placeholder text
- **Your Task**: Build complete user creation functionality
- **Requirements**:
  - Implement the API endpoint in `src/core/users/api/create.api.ts`
  - Create a custom hook using TanStack Query's `useMutation`
  - Build a form component using React Hook Form with Zod validation
  - Update the `CreateUserFeature` component to use your form
  - Handle form validation, submission, loading states, and error handling
  - Redirect to users list after successful creation

#### 2. **User Detail/Profile Page**
- **Current State**: `/$userId` route exists but only shows placeholder text
- **Your Task**: Build user detail view with full information display
- **Requirements**:
  - Implement the API endpoint in `src/core/users/api/read.api.ts`
  - Create a custom hook using TanStack Query's `useQuery`
  - Design and implement a user profile layout component
  - Update the `SingleUserFeature` component
  - Handle loading states, error states, and navigation

#### 3. **User Update/Edit System**
- **Current State**: Not implemented at all
- **Your Task**: Build user editing functionality
- **Requirements**:
  - Implement the API endpoint in `src/core/users/api/update.api.ts`
  - Create a custom hook using TanStack Query's `useMutation`
  - Build an edit form (can reuse creation form logic)
  - Pre-populate form with existing user data
  - Handle form submission and optimistic updates
  - Provide way to access edit mode from user detail page

#### 4. **User Deletion System**
- **Current State**: Delete button exists in table but doesn't work
- **Your Task**: Implement user deletion with proper UX
- **Requirements**:
  - Implement the API endpoint in `src/core/users/api/delete.api.ts`
  - Create a custom hook using TanStack Query's `useMutation`
  - Add confirmation dialog before deletion
  - Connect delete functionality to table actions
  - Handle optimistic updates and error states
  - Show appropriate user feedback

#### 5. **Connect Table Actions**
- **Current State**: Edit/Delete buttons in table are not functional
- **Your Task**: Wire up table actions to actual functionality
- **Requirements**:
  - Connect Edit button to navigate to user detail/edit
  - Connect Delete button to deletion system
  - Add proper loading states during actions
  - Implement confirmation dialogs where appropriate

### 🟡 Important Features (Recommended)

#### 6. **Form Components & Validation**
- **Missing**: No form components exist in the codebase
- **Your Task**: Create reusable form components
- **Requirements**:
  - Create form components in `src/core/users/forms/` directory
  - Implement React Hook Form with Zod schema validation
  - Create proper form field components with error handling
  - Ensure forms handle all required user fields (name, email, role, etc.)
  - Add proper form validation with real-time feedback

#### 7. **Enhanced Table Experience**
- **Current State**: Basic table with minimal styling
- **Your Task**: Improve the data grid user experience
- **Requirements**:
  - Enhance existing cell renderers in `src/core/users/components/cells/`
  - Improve the role cell styling and add more role types
  - Add user avatar/profile picture column
  - Improve action buttons styling and add loading states
  - Add better empty states and error handling in the table

#### 8. **Data Validation & Error Handling**
- **Current Issue**: Schema mismatches between expected and actual API data
- **Your Task**: Fix validation issues and improve error handling
- **Requirements**:
  - Fix user schema to match actual API response structure
  - Handle ID type mismatches (string vs number)
  - Implement proper date formatting and validation
  - Add comprehensive error boundaries
  - Create consistent error messaging throughout the app

### 🟢 Advanced Features (Bonus Points)

#### 9. **Search & Filtering**
- Add search functionality to filter users (server-side implementation)
- Implement role-based filtering (server-side implementation)
- Add status filtering (active/inactive users) (server-side implementation)

#### 10. **Modern UI Enhancements**
- Implement loading skeletons for better perceived performance
- Add smooth transitions and animations
- Create a proper dark/light theme toggle
- Improve responsive design for mobile devices
- Create custom Material-UI theme with modern design system
- Implement advanced typography scale and color palette
- Add custom component variants and styling overrides
- Design modern card layouts with proper elevation and shadows

#### 11. **Advanced State Management**
- Implement optimistic updates for better UX
- Add proper cache invalidation strategies
- Handle offline states and retry mechanisms

## 🐛 Known Issues You Should Fix

1. **Schema Validation**: User schema expects UUID strings but API returns numbers
2. **Role Validation**: Role enum needs proper validation and display logic  
3. **Date Handling**: Inconsistent date formatting throughout the application
4. **Navigation**: Missing navigation between different pages
5. **API Configuration**: Ensure all endpoints use consistent base URL configuration

## 📋 Implementation Checklist

### Phase 1: Core Functionality (Priority 1)
- [ ] Fix schema validation issues
- [ ] Implement user creation (API + UI + Form)
- [ ] Implement user detail view (API + UI)  
- [ ] Implement user update (API + UI + Form)
- [ ] Implement user deletion (API + UI + Confirmation)
- [ ] Connect table actions to actual functionality
- [ ] Add proper error handling throughout

### Phase 2: User Experience (Priority 2)  
- [ ] Create reusable form components with validation
- [ ] Enhance table cell renderers and styling
- [ ] Add loading states and user feedback
- [ ] Implement proper navigation between pages
- [ ] Add confirmation dialogs for destructive actions
- [ ] Improve responsive design

### Phase 3: Polish & Advanced Features (Priority 3)
- [ ] Add server-side search and filtering capabilities
- [ ] Implement server-side pagination with proper controls
- [ ] Implement advanced loading states (skeletons)
- [ ] Add animations and micro-interactions
- [ ] Create dark/light theme system
- [ ] Add comprehensive error boundaries
- [ ] Implement optimistic updates

## 🎯 Assessment Criteria

Your implementation will be evaluated based on:

### Technical Implementation (40%)
- **CRUD Operations**: All user operations (Create, Read, Update, Delete) work correctly
- **API Integration**: Proper implementation of API endpoints and error handling
- **Form Handling**: Effective use of React Hook Form with Zod validation
- **State Management**: Correct usage of TanStack Query for data fetching and mutations

### Code Quality (30%)
- **TypeScript Usage**: Proper typing, interfaces, and type safety
- **Component Architecture**: Well-structured, reusable, and maintainable components
- **Hook Design**: Clean separation of business logic in custom hooks
- **Best Practices**: Following React, TypeScript, and modern development patterns

### User Experience (20%)
- **Form Validation**: Real-time validation with clear error messages
- **Loading States**: Proper loading indicators and user feedback
- **Error Handling**: Graceful error handling with user-friendly messages
- **Navigation**: Intuitive navigation between different pages and features

### Code Organization (10%)
- **Project Structure**: Logical organization following the existing structure
- **Consistency**: Consistent patterns and conventions throughout
- **Documentation**: Clear comments and readable code
- **Git Commits**: Meaningful commit messages and logical commit structure

## ⚠️ Important Notes

- **Do not modify** the existing project structure or configuration files
- **Follow the established patterns** already present in the codebase
- **Use the provided libraries** (React Hook Form, TanStack Query, Material-UI, etc.)
- **Test your implementation** thoroughly before submitting
- **Focus on core functionality first** before adding enhancements

## 📚 Helpful Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Material-UI Documentation](https://mui.com/)
- [Zod Validation Documentation](https://zod.dev/)
- [TanStack Router Documentation](https://tanstack.com/router)

## 🚀 Getting Started

1. **Extract the Project**:
   - Unzip the provided project file to your local machine
   - Navigate to the project directory

2. **Create Your Repository**:
   - Create a new **public** repository on GitHub
   - Initialize git and push the initial codebase:
   ```bash
   git init
   git add .
   git commit -m "Initial project setup"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Setup Development Environment**:
   - Follow the setup instructions above (install dependencies, start servers)
   - Start with Phase 1 tasks (Core CRUD operations)
   - Test each feature thoroughly as you implement it

4. **Development Workflow**:
   - Make regular commits with clear, descriptive messages
   - Push your progress regularly to your repository
   - Focus on working functionality over visual polish initially

5. **Final Submission**:
   - Ensure all core functionality is working
   - Create a comprehensive video demonstration (1-3 minutes)
   - Include voice-over explanation of your implementation approach
   - Submit your **repository link** + **video demonstration link**

## 📤 Submission Process

When you complete the implementation:

1. **Push Final Code**: Ensure all changes are committed and pushed to your public repository
2. **Create Video Demo**: Record a comprehensive demonstration of your working application
3. **Submit Both**: Send us the links to:
   - 🔗 **Repository URL**: Your public GitHub repository
   - 🎥 **Video URL**: Your demonstration video (YouTube, Loom, or similar platform)

**Important**: Your repository must be **public** so we can review your code and commit history.

---

**Time Estimate**: 4-6 hours for core functionality, additional 2-4 hours for enhancements
**Focus**: Prioritize working CRUD operations over visual enhancements