import React from 'react';
import RegisterHeader from './components/RegisterHeader';
import RegistrationForm from './components/RegistrationForm';
import RegistrationBenefits from './components/RegistrationBenefits';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left Side - Registration Form */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 lg:flex-none lg:w-1/2">
          <div className="mx-auto w-full max-w-md lg:max-w-lg">
            <RegisterHeader />
            <RegistrationForm />
          </div>
        </div>

        {/* Right Side - Benefits (Desktop Only) */}
        <div className="hidden lg:block lg:w-1/2 bg-muted/30">
          <RegistrationBenefits />
        </div>
      </div>
      {/* Mobile Benefits Section */}
      <div className="lg:hidden px-4 py-8 bg-muted/30">
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground text-center">
              Why Choose SalesFlow CRM?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-foreground text-sm">Team Collaboration</h4>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-foreground text-sm">Analytics</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>&copy; {new Date()?.getFullYear()} SalesFlow CRM. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;