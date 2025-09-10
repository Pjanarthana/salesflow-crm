import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Sales Rep',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleOptions = [
    { value: 'Sales Rep', label: 'Sales Representative' },
    { value: 'Sales Manager', label: 'Sales Manager' },
    { value: 'Admin', label: 'Administrator' }
  ];

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData?.password?.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/?.test(formData?.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/?.test(formData?.password) },
    { text: 'Contains number', met: /\d/?.test(formData?.password) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/?.test(formData?.password) }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRequirements?.every(req => req?.met)) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock registration success
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        role: formData?.role,
        createdAt: new Date()?.toISOString()
      };

      // Store user data temporarily for login
      localStorage.setItem('registeredUser', JSON.stringify(userData));

      // Show success message and redirect
      alert('Account created successfully! Please log in with your credentials.');
      navigate('/login');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements?.filter(req => req?.met)?.length;
    if (metRequirements < 2) return { strength: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (metRequirements < 4) return { strength: 'Medium', color: 'text-warning', bgColor: 'bg-warning' };
    return { strength: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        {/* Password */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password strength:</span>
              <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                {passwordStrength?.strength}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.bgColor}`}
                style={{ width: `${(passwordRequirements?.filter(req => req?.met)?.length / passwordRequirements?.length) * 100}%` }}
              />
            </div>
            <div className="space-y-1">
              {passwordRequirements?.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon 
                    name={req?.met ? 'Check' : 'X'} 
                    size={12} 
                    className={req?.met ? 'text-success' : 'text-muted-foreground'} 
                  />
                  <span className={`text-xs ${req?.met ? 'text-success' : 'text-muted-foreground'}`}>
                    {req?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>

        {/* Role Selection */}
        <Select
          label="Role"
          description="Select your role in the organization"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          required
        />

        {/* Terms Agreement */}
        <div className="space-y-2">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />
          <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
            <span>By creating an account, you agree to our</span>
            <button type="button" className="text-primary hover:underline">
              Terms of Service
            </button>
            <span>and</span>
            <button type="button" className="text-primary hover:underline">
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;