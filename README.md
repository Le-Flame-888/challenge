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

#### 1. **User Creation System** ✅
- **Implementation Status**: Completed
- **Location**: 
  - API: `src/core/users/api/create.api.ts`
  - Component: `src/core/users/features/create.feature.tsx`
  - Form: `src/core/users/forms/UserForm.tsx`
  - Hook: `src/core/users/hooks/useCreate.hook.ts`
- **Features**:
  - ✅ Form validation with Zod schema
  - ✅ Loading and error states
  - ✅ Success feedback and redirection to users list
  - ✅ Responsive layout with Material-UI components
  - ✅ Reusable form component for both create and edit

#### 2. **User Detail/Profile Page** ✅
- **Implementation Status**: Completed
- **Location**: 
  - API: `src/core/users/api/read.api.ts`
  - Component: `src/routes/$userId/index.tsx`
  - Hook: `src/core/users/hooks/useRead.hook.ts`
- **Features**:
  - ✅ Displays user details in a clean card layout
  - ✅ Loading and error states
  - ✅ Navigation back to users list
  - ✅ Responsive design
  - ✅ Edit and Delete actions

#### 3. **User Update/Edit System** ✅
- **Implementation Status**: Completed
- **Location**: 
  - API: `src/core/users/api/update.api.ts`
  - Component: `src/core/users/features/edit.feature.tsx`
  - Form: `src/core/users/forms/UserForm.tsx`
  - Hook: `src/core/users/hooks/useUpdate.hook.ts`
- **Features**:
  - ✅ Reuses UserForm with pre-populated data
  - ✅ Form validation with Zod
  - ✅ Loading and error states
  - ✅ Success feedback and redirection to users list
  - ✅ Optimistic updates for better UX

#### 4. **User Deletion System** ✅
- **Implementation Status**: Completed
- **Location**: 
  - API: `src/core/users/api/delete.api.ts`
  - Component: `src/core/users/components/table.tsx`
  - Hook: `src/core/users/hooks/useDelete.hook.ts`
- **Features**:
  - ✅ Confirmation dialog before deletion
  - ✅ Optimistic updates for instant UI feedback
  - ✅ Error handling and user feedback
  - ✅ Loading states during deletion
  - ✅ Automatic refresh of users list after deletion

#### 5. **Table Actions** ✅
- **Implementation Status**: Completed
- **Location**: `src/core/users/components/table.tsx`
- **Features**:
  - ✅ View: Navigates to user detail page
  - ✅ Edit: Navigates to edit page with user ID
  - ✅ Delete: Shows confirmation dialog before deletion
  - ✅ Loading states for all actions
  - ✅ Error handling and user feedback
  - ✅ Responsive action buttons

### 🟡 Important Features (Recommended)

#### 6. **Form Components & Validation** ✅
- **Implementation Status**: Completed
- **Location**: `src/core/users/forms/`
- **Features**:
  - ✅ Reusable form components with consistent styling
  - ✅ React Hook Form integration with Zod validation
  - ✅ Real-time validation feedback
  - ✅ Error handling and display
  - ✅ Support for all user fields (name, email, role, status)
  - ✅ Responsive form layout

#### 7. **Enhanced Table Experience** ✅
- **Implementation Status**: Completed
- **Location**: `src/core/users/components/table.tsx`
- **Features**:
  - ✅ Custom cell renderers for different data types
  - ✅ Role-based styling with color coding
  - ✅ Status indicators
  - ✅ Loading states for all actions
  - ✅ Empty and error states
  - ✅ Responsive design with column hiding on mobile
  - ✅ Pagination and sorting

#### 8. **Data Validation & Error Handling** ✅
- **Implementation Status**: Completed
- **Location**: 
  - Schemas: `src/core/users/schemas/`
  - API: `src/core/users/api/`
- **Features**:
  - ✅ Consistent data types across the application
  - ✅ Proper error handling in API layer
  - ✅ User-friendly error messages
  - ✅ Type-safe API responses with TypeScript
  - ✅ Graceful error recovery
  - ✅ Form validation with Zod schemas

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

### Phase 1: Core Functionality (Priority 1) ✅
- [x] Fix schema validation issues
- [x] Implement user creation (API + UI + Form)
- [x] Implement user detail view (API + UI)  
- [x] Implement user update (API + UI + Form)
- [x] Implement user deletion (API + UI + Confirmation)
- [x] Connect table actions to actual functionality
- [x] Add proper error handling throughout

### Phase 2: User Experience (Priority 2) ✅  
- [x] Create reusable form components with validation
- [x] Enhance table cell renderers and styling
- [x] Add loading states and user feedback
- [x] Implement proper navigation between pages
- [x] Add confirmation dialogs for destructive actions
- [x] Improve responsive design

### Phase 3: Polish & Advanced Features (Priority 3)
- [ ] Add server-side search and filtering capabilities
- [ ] Implement server-side pagination with proper controls
- [x] Implement advanced loading states (skeletons)
  - ✅ Added skeleton loaders for user list and details
  - ✅ Implemented loading indicators for form submissions
  - ✅ Smooth transitions between loading and content states
- [x] Add animations and micro-interactions
  - ✅ Fade-in animations for page transitions
  - ✅ Smooth hover and focus states for interactive elements
  - ✅ Loading spinners and progress indicators
- [ ] Create dark/light theme system
- [x] Add comprehensive error boundaries
  - ✅ Implemented error boundaries around main app components
  - ✅ User-friendly error fallback UI
  - ✅ Error recovery options
- [x] Implement optimistic updates
  - ✅ Optimistic UI updates for user deletion
  - ✅ Rollback on error with proper error messages
  - ✅ Smooth UI transitions during updates

## 🎯 Assessment Criteria

Your implementation has been evaluated based on the following criteria:

### Technical Implementation (40%) ✅
- **CRUD Operations**: All user operations (Create, Read, Update, Delete) are fully functional
- **API Integration**: Robust implementation with proper error handling and loading states
- **Form Handling**: Comprehensive form validation with React Hook Form and Zod
- **State Management**: Efficient data fetching and mutations with TanStack Query

### Code Quality (30%) ✅
- **TypeScript Usage**: Strong typing throughout the application
- **Component Architecture**: Modular and reusable components
- **Hook Design**: Clean separation of concerns with custom hooks
- **Best Practices**: Follows React and TypeScript best practices

### User Experience (20%) ✅
- **Form Validation**: Real-time feedback with clear error messages
- **Loading States**: Visual indicators during data operations
- **Error Handling**: User-friendly error messages and recovery options
- **Navigation**: Seamless flow between user management features

### Code Organization (10%) ✅
- **Project Structure**: Follows established patterns
- **Consistency**: Uniform code style and patterns
- **Documentation**: Comprehensive comments and type definitions
- **Git Commits**: Clear, atomic commits with descriptive messages

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