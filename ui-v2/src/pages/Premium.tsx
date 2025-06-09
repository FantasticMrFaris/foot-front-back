import React from 'react';
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users,
  BarChart3,
  CreditCard
} from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

export default function Premium() {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: '',
      features: [
        'Join matches',
        'Basic profile',
        'Limited swipes per day',
        'Standard support'
      ],
      current: true
    },
    {
      name: 'Pro',
      price: '£9.99',
      period: '/month',
      features: [
        'Unlimited swipes',
        'Advanced matchmaking',
        'Priority booking',
        'Detailed analytics',
        'Ad-free experience',
        'Premium support'
      ],
      popular: true
    },
    {
      name: 'Elite',
      price: '£19.99',
      period: '/month',
      features: [
        'Everything in Pro',
        'VIP pitch access',
        'Personal coach insights',
        'Tournament invitations',
        'Exclusive events',
        'Concierge service'
      ]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Priority Matching',
      description: 'Get matched with players faster and see who likes you'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Track your performance and improvement over time'
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'Connect with verified players for safer matches'
    },
    {
      icon: Users,
      title: 'Exclusive Events',
      description: 'Access to premium tournaments and social events'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-dark-teal-50/30 to-gray-100 pb-20 md:pb-4 md:pt-20">
      <Header title="Premium" showSearch={false} />
      
      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-dark-teal-600 via-dark-teal-700 to-dark-teal-800 text-white text-center border-2 border-white-gold-500 shadow-premium" premium>
          <Crown size={48} className="mx-auto mb-4 text-white-gold-500 animate-glow" />
          <h1 className="text-3xl font-bold mb-2 text-white-gold-500">Upgrade to Premium</h1>
          <p className="text-lg opacity-90">Unlock exclusive features and take your football experience to the next level</p>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 bg-gradient-to-br from-white via-dark-teal-50/10 to-white border-dark-teal-500/30" premium>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-dark-teal-600 to-dark-teal-700 rounded-xl flex items-center justify-center border-2 border-white-gold-500/30">
                  <benefit.icon size={24} className="text-white-gold-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-teal-800 mb-2">{benefit.title}</h3>
                  <p className="text-dark-teal-600">{benefit.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={`p-6 relative bg-gradient-to-br from-white via-dark-teal-50/10 to-white ${plan.popular ? 'border-white-gold-500 shadow-premium' : 'border-dark-teal-500/30'}`} premium={plan.popular}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-white-gold-500 to-dark-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium border border-white-gold-500 shadow-white-gold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-dark-teal-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-dark-teal-800">{plan.price}</span>
                  <span className="text-dark-teal-600 ml-1">{plan.period}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-3 border border-white-gold-500/30">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-dark-teal-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button
                className="w-full"
                variant={plan.current ? 'secondary' : plan.popular ? 'premium' : 'outline'}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade Now'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Payment Security */}
        <Card className="p-6 text-center bg-gradient-to-br from-white via-dark-teal-50/10 to-white border-dark-teal-500/30" premium>
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center border-2 border-white-gold-500/30">
              <Shield size={24} className="text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-dark-teal-600 to-dark-teal-700 rounded-full flex items-center justify-center border-2 border-white-gold-500/30">
              <CreditCard size={24} className="text-white-gold-500" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-white-gold-500 to-white-gold-600 rounded-full flex items-center justify-center border-2 border-dark-teal-500/30">
              <Star size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-dark-teal-800 mb-2">Secure & Trusted</h3>
          <p className="text-dark-teal-600">
            Your payment information is secure. Cancel anytime with just one click.
          </p>
        </Card>
      </main>
    </div>
  );
}