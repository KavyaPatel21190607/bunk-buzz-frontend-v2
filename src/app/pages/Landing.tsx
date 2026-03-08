import { Link } from 'react-router-dom';
import { useApp } from '@/app/context/AppContext';
import {
  BookOpen,
  Calendar,
  TrendingUp,
  Share2,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Clock,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Subject Tracking',
    description: 'Add all your subjects and keep a precise record of every lecture attended or missed.',
  },
  {
    icon: Calendar,
    title: 'Timetable Management',
    description: 'Set up your weekly timetable and let the app know your schedule automatically.',
  },
  {
    icon: TrendingUp,
    title: 'Bunk Predictor',
    description: 'Know exactly how many classes you can safely skip and still maintain your attendance.',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Timetable-aware predictions that estimate weeks to reach your attendance target.',
  },
  {
    icon: Share2,
    title: 'Share Timetable',
    description: 'Share your timetable with classmates using a simple code — they adopt it in one click.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Google OAuth login, encrypted data, and your attendance stays yours alone.',
  },
];

const stats = [
  { label: 'Active Users', value: '500+', icon: Users },
  { label: 'Lectures Tracked', value: '50K+', icon: CheckCircle },
  { label: 'Bunks Saved', value: '10K+', icon: Zap },
  { label: 'Hours Saved', value: '2K+', icon: Clock },
];

const steps = [
  { step: '01', title: 'Sign Up', description: 'Create your account with Google in one click.' },
  { step: '02', title: 'Add Subjects', description: 'Enter your subjects and their minimum attendance requirements.' },
  { step: '03', title: 'Set Timetable', description: 'Configure your weekly schedule or adopt a classmate\'s timetable.' },
  { step: '04', title: 'Track & Predict', description: 'Mark daily attendance and let the bunk predictor guide you.' },
];

export default function Landing() {
  const { isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-white text-lg">📚</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Aaj Bunk Hai
              </span>
            </div>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Smart Attendance Tracking for Students
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Aaj Bunk Hai
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 italic mb-4">
            "Because attendance is temporary, memories are permanent."
          </p>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The only attendance tracker you need. Know exactly how many classes you can
            skip, predict your attendance weeks ahead, and share timetables with your
            squad — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? '/dashboard' : '/signup'}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-base hover:shadow-lg hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Start Tracking Free'}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-base hover:border-purple-300 hover:text-purple-600 transition-all duration-300"
            >
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-2">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to bunk smartly
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From tracking lectures to predicting your safe bunk count — we've got it all covered.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center mb-5 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-2">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get started in 4 simple steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From sign-up to your first bunk prediction in under 5 minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-purple-200 to-blue-200" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Highlight */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">🎯</span>
          </div>
          <blockquote className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 leading-snug">
            "I used to randomly skip classes and then panic before exams. Now I know
            exactly when I can bunk and stay above 75%."
          </blockquote>
          <p className="text-gray-500">— Every student who uses Aaj Bunk Hai</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to bunk smartly?
          </h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Join hundreds of students who track their attendance and never worry about falling
            below the required percentage again.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/signup'}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5"
          >
            {isAuthenticated ? 'Open Dashboard' : 'Get Started — It\'s Free'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm">📚</span>
              </div>
              <div>
                <span className="text-white font-semibold">Aaj Bunk Hai</span>
                <p className="text-xs text-gray-500 italic">Because attendance is temporary, memories are permanent.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
            </div>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Aaj Bunk Hai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
