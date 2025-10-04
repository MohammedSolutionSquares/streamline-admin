# Water Supplier Onboarding Feature

## Overview
The Water Supplier Onboarding feature provides a comprehensive multi-step form for water suppliers to register their company details, inventory, and customer information when they click the "Start Migration" button.

## Features

### 1. Multi-Step Onboarding Process
- **Step 1: Company Information** - Basic company details and contact information
- **Step 2: Water Jar Inventory** - Specification of water jar sizes and quantities
- **Step 3: Customer Documents** - Upload of customer documents and details
- **Step 4: Review & Complete** - Final review before submission

### 2. Company Details Section
- Company name and business type
- Registration number
- Complete business address (street, city, state, ZIP, country)
- Contact information (phone, email, website)
- Company description

### 3. Water Jar Inventory Management
- Support for multiple jar sizes: 5L, 10L, 15L, 20L, 25L, 30L, 40L, 50L
- Quantity tracking for each jar size
- Dynamic addition/removal of jar sizes
- Real-time inventory summary

### 4. Customer Document Upload
- Multiple file upload support
- Accepted formats: PDF, DOC, DOCX, XLS, XLSX
- Document management with preview and removal
- Customer details extraction from documents

### 5. User Experience Features
- Progress tracking with visual progress bar
- Step-by-step navigation
- Form validation with error handling
- Responsive design for all screen sizes
- Toast notifications for user feedback

## Technical Implementation

### Components
- `WaterSupplierOnboarding.tsx` - Main onboarding component
- `Onboarding.tsx` - Page wrapper component
- `OnboardingContext.tsx` - State management context

### Routing
- Route: `/onboarding`
- Access: Company Admin role only
- Navigation: Available in sidebar menu

### State Management
- Local state for form data
- Context provider for global onboarding state
- Form validation at each step

### Integration Points
- "Start Migration" button in CompanyAdminDashboard
- Sidebar navigation menu
- Role-based access control

## Usage

### For Water Suppliers
1. Navigate to Dashboard as Company Admin
2. Click "Start Migration" button
3. Complete the 4-step onboarding process:
   - Enter company information
   - Specify water jar inventory
   - Upload customer documents
   - Review and submit

### For Developers
1. Access onboarding via `/onboarding` route
2. Use `useOnboarding()` hook for state management
3. Extend form fields as needed
4. Integrate with backend API for data persistence

## File Structure
```
src/
├── components/
│   └── admin/
│       └── onboarding/
│           └── WaterSupplierOnboarding.tsx
├── pages/
│   └── Onboarding.tsx
├── contexts/
│   └── OnboardingContext.tsx
└── App.tsx (updated with routes)
```

## Future Enhancements
- Backend API integration
- Data persistence
- Email notifications
- Document processing automation
- Advanced validation rules
- Multi-language support
- Progress saving/resuming

## Dependencies
- React Router for navigation
- Shadcn/ui components for UI
- Lucide React for icons
- React hooks for state management
