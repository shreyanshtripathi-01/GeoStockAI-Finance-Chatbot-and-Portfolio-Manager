import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black/90">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/register" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Registration
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Account information (name, email, password)</li>
                  <li>Profile information (company, role, country)</li>
                  <li>Investment preferences and portfolio data</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                <p>
                  We use the collected information to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Personalize your experience</li>
                  <li>Improve our AI models and analysis</li>
                  <li>Communicate with you about our services</li>
                  <li>Ensure the security of our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data storage and transmission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Data Sharing</h2>
                <p>
                  We do not sell your personal information. We may share your data with:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Service providers who assist in our operations</li>
                  <li>Analytics partners to improve our services</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Analyze site usage</li>
                  <li>Improve user experience</li>
                  <li>Provide personalized content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Contact Us</h2>
                <p>
                  For privacy-related questions or concerns, please contact us at:
                </p>
                <div className="mt-2">
                  <p>Email: privacy@geostock.ai</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 