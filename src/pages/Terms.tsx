import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using GeoStock AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
                <p>
                  GeoStock AI provides AI-powered market analysis and geopolitical insights for investment decision-making. Our service includes but is not limited to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Real-time market analysis</li>
                  <li>Geopolitical intelligence</li>
                  <li>AI-powered insights</li>
                  <li>Risk assessment tools</li>
                  <li>Portfolio optimization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                <p>
                  As a user of our service, you agree to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Use the service in compliance with applicable laws</li>
                  <li>Not attempt to reverse engineer or compromise the service</li>
                  <li>Not share your account credentials with others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Disclaimer</h2>
                <p>
                  GeoStock AI is not a registered investment advisor. The information provided through our service is for informational purposes only and should not be considered as financial advice. We make no guarantees about the accuracy or completeness of the information provided.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
                <p>
                  We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any material changes through the service or via email.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Contact Information</h2>
                <p>
                  For any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-2">
                  <p>Email: support@geostock.ai</p>
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

export default Terms; 