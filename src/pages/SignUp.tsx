import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Mail, Lock, Eye, EyeOff, User, Building2, Phone, Briefcase, Globe2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    role: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company: formData.company,
            role: formData.role,
            country: formData.country,
            phone: formData.phone,
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      setSuccessMessage('Account created successfully! Please check your email to verify your account.');
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error: any) {
      console.error('Sign up error:', error);
      setErrorMessage(error.message || 'An error occurred during sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black/90">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse group-hover:bg-blue-500/30 transition-colors"></div>
                <Globe className="h-16 w-16 text-blue-400 animate-spin-slow relative z-10 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Create your account
            </h2>
            <p className="text-gray-400">
              Join us to start your investment journey
            </p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="p-4 mb-4 text-sm text-green-400 bg-green-900/20 rounded-lg border border-green-500/20">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="p-4 mb-4 text-sm text-red-400 bg-red-900/20 rounded-lg border border-red-500/20">
              {errorMessage}
            </div>
          )}

          {/* Sign Up Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${
                    errors.fullName ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Company Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${
                    errors.company ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                )}
              </div>

              {/* Role Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 bg-gray-900/50 border ${
                    errors.role ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" className="bg-gray-900 text-white">Select your role</option>
                  <option value="investor" className="bg-gray-900 text-white">Investor</option>
                  <option value="trader" className="bg-gray-900 text-white">Trader</option>
                  <option value="analyst" className="bg-gray-900 text-white">Analyst</option>
                  <option value="other" className="bg-gray-900 text-white">Other</option>
                </select>
              </div>

              {/* Country Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe2 className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="country"
                  name="country"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 bg-gray-900/50 border ${
                    errors.country ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="" className="bg-gray-900 text-white">Select your country</option>
                  <option value="US" className="bg-gray-900 text-white">United States</option>
                  <option value="UK" className="bg-gray-900 text-white">United Kingdom</option>
                  <option value="IN" className="bg-gray-900 text-white">India</option>
                  <option value="CA" className="bg-gray-900 text-white">Canada</option>
                  <option value="AU" className="bg-gray-900 text-white">Australia</option>
                </select>
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 bg-gray-900/50 border ${
                    errors.phone ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 bg-gray-900/50 border ${
                    errors.password ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 bg-gray-900/50 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-900/70 transition-all duration-300`}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded bg-white/5 border-white/10"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 