# SalesFlow CRM

A comprehensive Customer Relationship Management (CRM) application built with React, designed to streamline sales processes and enhance team productivity across different user roles.

## 🚀 Overview

SalesFlow CRM is a modern, responsive web application that provides a complete sales management solution. Built with React and styled with Tailwind CSS, it offers role-based dashboards, lead management, opportunity tracking, and comprehensive analytics to help sales teams achieve their goals.

## ✨ Key Features

### 🏢 Multi-Role Dashboard System
- **Admin Dashboard**: Complete system oversight with user management, role configuration, system settings, and audit trails
- **Sales Manager Dashboard**: Team performance monitoring, lead oversight, opportunity tracking, and team metrics
- **Sales Rep Dashboard**: Personal lead management, opportunity pipeline, activity tracking, and performance metrics

### 🔐 Authentication & Security
- Secure login system with role-based access control
- Demo credentials for testing different user roles
- Protected routes based on user permissions
- Session management with local storage

### 📊 Lead Management
- Add, edit, and delete leads
- Lead status tracking (New, Contacted, Qualified)
- Lead conversion to opportunities
- Contact information management
- Activity timeline tracking

### 🎯 Opportunity Management
- Comprehensive opportunity pipeline
- Stage-based opportunity tracking (Discovery, Proposal, Won, Lost)
- Value and probability tracking
- Close date management
- Conversion from leads

### 📈 Analytics & Reporting
- Real-time metrics and KPI tracking
- Performance dashboards with visual charts
- Team performance analytics
- Pipeline value tracking
- Conversion rate monitoring

### 🔧 Administrative Features
- User management and role assignment
- System configuration and settings
- Audit trail for system activities
- Role-based permissions configuration

## 🛠️ Technology Stack

### Frontend Framework
- **React** (18.2.0) - Component-based UI framework
- **Vite** - Fast build tool and development server
- **React Router DOM** (6.0.2) - Client-side routing

### Styling & UI
- **Tailwind CSS** (3.4.6) - Utility-first CSS framework
- **Tailwind Forms** - Form styling plugin
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### State Management
- **Redux Toolkit** (2.6.1) - Predictable state container
- **React Hooks** - Built-in state management

### Data Visualization
- **Recharts** (2.15.2) - Chart library for React
- **D3.js** (7.9.0) - Data visualization library

### Form Management
- **React Hook Form** (7.55.0) - Performant form library

### HTTP & API
- **Axios** (1.8.4) - Promise-based HTTP client

### Utilities
- **Date-fns** (4.1.0) - Modern date utility library
- **Class Variance Authority** - CSS class management
- **Clsx** - Conditional className utility

## 📁 Project Structure

```
src/
├── App.jsx                     # Main application component
├── Routes.jsx                  # Application routing configuration
├── index.jsx                   # Application entry point
├── components/                 # Reusable UI components
│   ├── ui/                    # Core UI components
│   │   ├── BrandHeader.jsx    # Application header
│   │   ├── Button.jsx         # Reusable button component
│   │   ├── Input.jsx          # Form input component
│   │   ├── Select.jsx         # Select dropdown component
│   │   └── DashboardNavigation.jsx # Navigation component
│   ├── AppIcon.jsx            # Icon wrapper component
│   ├── AppImage.jsx           # Image component
│   ├── ErrorBoundary.jsx      # Error handling component
│   └── ScrollToTop.jsx        # Scroll utility component
├── pages/                      # Application pages
│   ├── admin-dashboard/       # Admin dashboard and components
│   │   ├── index.jsx          # Main admin dashboard
│   │   └── components/        # Admin-specific components
│   │       ├── SystemOverview.jsx
│   │       ├── UserManagement.jsx
│   │       ├── RoleConfiguration.jsx
│   │       ├── SystemSettings.jsx
│   │       └── AuditTrail.jsx
│   ├── sales-manager-dashboard/  # Sales manager dashboard
│   │   ├── index.jsx          # Main manager dashboard
│   │   └── components/        # Manager-specific components
│   │       ├── TeamMetricsCard.jsx
│   │       ├── TeamPerformancePanel.jsx
│   │       ├── TeamLeadsTable.jsx
│   │       ├── TeamOpportunitiesTable.jsx
│   │       └── QuickActionsPanel.jsx
│   ├── sales-rep-dashboard/   # Sales rep dashboard
│   │   ├── index.jsx          # Main rep dashboard
│   │   └── components/        # Rep-specific components
│   │       ├── MetricsCard.jsx
│   │       ├── LeadsTable.jsx
│   │       ├── OpportunitiesTable.jsx
│   │       ├── ActivityFeed.jsx
│   │       ├── AddLeadModal.jsx
│   │       ├── AddOpportunityModal.jsx
│   │       ├── ConvertLeadModal.jsx
│   │       └── DeleteConfirmModal.jsx
│   ├── opportunities-management/ # Opportunity management
│   │   ├── index.jsx
│   │   └── components/
│   ├── login/                 # Authentication pages
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── LoginForm.jsx
│   │       ├── LoginHeader.jsx
│   │       └── DemoCredentials.jsx
│   ├── register/              # User registration
│   │   ├── index.jsx
│   │   └── components/
│   └── NotFound.jsx           # 404 error page
├── styles/                    # Global styles
│   ├── index.css              # Custom global styles
│   └── tailwind.css           # Tailwind CSS imports
└── utils/                     # Utility functions
    └── cn.js                  # ClassName utility function
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd salesflow-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_OPENAI_API_KEY=your-openai-api-key
   VITE_GOOGLE_ANALYTICS_ID=your-ga-id
   ```

4. **Start the development server**
   ```bash
   npm run start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Demo Credentials

The application includes demo credentials for testing different user roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@salesflow.com | admin123 |
| Sales Manager | manager@salesflow.com | manager123 |
| Sales Rep | rep@salesflow.com | rep123 |

## 📱 User Roles & Permissions

### Admin
- Full system access and configuration
- User management and role assignments
- System settings and audit trails
- Complete oversight of all sales activities

### Sales Manager
- Team performance monitoring
- Lead and opportunity oversight for team members
- Team metrics and reporting
- Quick actions for team management

### Sales Rep
- Personal lead and opportunity management
- Activity tracking and pipeline management
- Individual performance metrics
- Lead conversion capabilities

## 🔧 Configuration

### Tailwind CSS Configuration
The project uses a custom Tailwind configuration with:
- Custom color schemes
- Typography settings
- Animation utilities
- Form styling plugins

### Vite Configuration
- Optimized for React development
- Path aliases for clean imports
- Build optimizations for production

## 🌟 Key Features in Detail

### Lead Management System
- **Lead Creation**: Add new leads with contact information, company details, and source tracking
- **Status Management**: Track lead progress through New, Contacted, and Qualified stages
- **Activity Logging**: Automatic activity timeline for all lead interactions
- **Conversion Pipeline**: Convert qualified leads to opportunities seamlessly

### Opportunity Pipeline
- **Stage Tracking**: Monitor opportunities through Discovery, Proposal, and closing stages
- **Value Management**: Track deal values and probability assessments
- **Timeline Management**: Set and monitor close dates
- **Performance Analytics**: Visualize pipeline health and conversion rates

### Analytics Dashboard
- **Real-time Metrics**: Live updates of key performance indicators
- **Visual Charts**: Interactive charts and graphs for data visualization
- **Team Performance**: Comparative analytics for team members
- **Historical Trends**: Track performance over time periods

## 🔒 Security Features

- **Role-based Access Control**: Granular permissions based on user roles
- **Protected Routes**: Authentication required for all dashboard areas
- **Session Management**: Secure token-based authentication
- **Input Validation**: Form validation and sanitization

## 📊 Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Optimized Bundle**: Vite's efficient bundling and tree-shaking
- **Component Memoization**: React optimization techniques
- **Responsive Design**: Mobile-first responsive layout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 🔄 Version History

- **v0.1.0** - Initial release with core CRM functionality
- **v2.1.0** - Enhanced dashboard features and improved UX

---

**SalesFlow CRM** - Streamlining sales processes, one lead at a time. 🚀