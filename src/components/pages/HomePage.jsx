// src/components/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { SCHOOL, ADMISSION } from '../../config/constants';
import ImageSlider from '../common/ImageSlider';
import {
  FaGraduationCap, FaBookOpen, FaFlask, FaRunning,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheckCircle,
  FaBullhorn, FaArrowRight,
} from 'react-icons/fa';

// ── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-navy-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg, transparent, transparent 40px,
            rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px
          )`
        }}
      />

      {/* Saffron accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-400 via-white to-emerald-500" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-saffron-500 text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <FaBullhorn size={10} />
            Admissions Open — Session {ADMISSION.sessionYear}
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
            {SCHOOL.name}
          </h1>
          <p className="text-navy-200 text-lg sm:text-xl mb-2 font-body">
            Lawahikala, Dandai Block, Garhwa, Jharkhand
          </p>
          <p className="text-navy-300 text-sm mb-8 font-body">
            Affiliated to {SCHOOL.affiliation} &bull; Classes 1 to 12 &bull; Est. {SCHOOL.established}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-navy-900 font-bold px-7 py-3.5 rounded-lg text-base transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            >
              Apply for Admission <FaArrowRight />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-navy-900 font-semibold px-7 py-3.5 rounded-lg text-base transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { value: '40+', label: 'Years of Excellence' },
              { value: '12', label: 'Classes Offered' },
              { value: '₹550', label: 'Admission Fee' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-heading font-bold text-3xl text-saffron-400">{value}</div>
                <div className="text-navy-300 text-sm font-body">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Admission Notice Banner ──────────────────────────────────────────────────
function AdmissionBanner() {
  return (
    <section className="bg-saffron-500 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaBullhorn className="text-navy-900 text-2xl flex-shrink-0" />
            <div>
              <p className="font-heading font-bold text-navy-900 text-lg">
                📢 Admissions Now Open for Session {ADMISSION.sessionYear}
              </p>
              <p className="text-navy-800 text-sm font-body">
                Apply online for Classes 1 to 12 • Admission fee: ₹550 only • Limited seats available
              </p>
            </div>
          </div>
          <Link
            to="/admission"
            className="flex-shrink-0 bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Apply Now →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── About Section ────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-saffron-600 font-semibold text-sm uppercase tracking-wider mb-2">
              About Our School
            </p>
            <h2 className="section-heading mb-5">
              Shaping Futures Since {SCHOOL.established}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 font-body">
              UPG+2 High School, Lawahikala is a Government Senior Secondary School located in
              Dandai Block, Garhwa District, Jharkhand. Established in {SCHOOL.established},
              the school has been a beacon of quality education for rural students across the region.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 font-body">
              The school is affiliated to the Jharkhand Academic Council (JAC) and follows
              the government curriculum for Classes 1 to 12. We are committed to providing
              inclusive, accessible education to every child in our community.
            </p>
            <ul className="space-y-2">
              {[
                'Government-run, fully subsidized education',
                'Affiliated to Jharkhand Academic Council (JAC)',
                'Classes 1 to 12 with qualified teachers',
                'Medium of instruction: Hindi & English',
                'Mid-day meal programme available',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700 font-body">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual card */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FaGraduationCap, title: 'Senior Secondary', desc: 'Classes 11 & 12 with Science/Arts streams', color: 'bg-navy-800' },
              { icon: FaBookOpen, title: 'Primary Classes', desc: 'Strong foundation from Class 1 to 5', color: 'bg-saffron-500' },
              { icon: FaFlask, title: 'Science Lab', desc: 'Equipped laboratory for practical learning', color: 'bg-emerald-600' },
              { icon: FaRunning, title: 'Sports Ground', desc: 'Open playground for outdoor activities', color: 'bg-purple-700' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-navy-900 text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Facilities Section ───────────────────────────────────────────────────────
function Facilities() {
  const facilities = [
    { icon: '📚', title: 'Library', desc: 'Well-stocked library with Hindi and English books, newspapers, and reference materials.' },
    { icon: '🔬', title: 'Science Laboratory', desc: 'Physics, Chemistry, and Biology labs for practical experiments.' },
    { icon: '💻', title: 'Computer Room', desc: 'Basic computer education facility for digital literacy.' },
    { icon: '🏃', title: 'Sports Facilities', desc: 'Open ground with facilities for cricket, kabaddi, and athletics.' },
    { icon: '🍱', title: 'Mid-Day Meal', desc: 'Government-sponsored nutritious mid-day meal for all students.' },
    { icon: '🚰', title: 'Drinking Water', desc: 'Clean drinking water facility with hand pumps and purifiers.' },
  ];

  return (
    <section id="facilities" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-saffron-600 font-semibold text-sm uppercase tracking-wider mb-2">
            School Facilities
          </p>
          <h2 className="section-heading">What We Offer</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto font-body">
            Our school provides a conducive learning environment with essential facilities for holistic development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map(({ icon, title, desc }) => (
            <div key={title} className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Admission Process Section ────────────────────────────────────────────────
function AdmissionProcess() {
  const steps = [
    { step: '01', title: 'Fill Online Form', desc: 'Complete the 4-step online admission form with student and parent details.' },
    { step: '02', title: 'Upload Documents', desc: 'Upload student photo, birth certificate, and previous marksheet.' },
    { step: '03', title: 'Pay Admission Fee', desc: 'Pay ₹550 securely online via Razorpay (UPI, card, net banking).' },
    { step: '04', title: 'Get Confirmation', desc: 'Receive your application ID and download the receipt immediately.' },
  ];

  return (
    <section className="py-16 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-saffron-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Simple Process
          </p>
          <h2 className="font-heading font-bold text-3xl text-white">How to Apply</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, title, desc }, i) => (
            <div key={step} className="relative">
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-navy-700 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-14 h-14 bg-saffron-500 rounded-xl flex items-center justify-center mb-4 font-heading font-bold text-navy-900 text-xl">
                  {step}
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-navy-300 text-sm font-body leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/admission"
            className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-navy-900 font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 shadow-lg"
          >
            Start Your Application <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-saffron-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Get in Touch
          </p>
          <h2 className="section-heading">Contact Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: FaMapMarkerAlt,
              title: 'School Address',
              lines: ['Village Lawahikala, Dandai Block', 'Garhwa District, Jharkhand - 822114'],
            },
            {
              icon: FaPhone,
              title: 'Phone',
              lines: [SCHOOL.phone, 'Mon–Sat: 9:00 AM – 4:00 PM'],
            },
            {
              icon: FaEnvelope,
              title: 'Email',
              lines: [SCHOOL.email, 'Response within 2 working days'],
            },
          ].map(({ icon: Icon, title, lines }) => (
            <div key={title} className="card text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="text-navy-800 text-lg" />
              </div>
              <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">{title}</h3>
              {lines.map((line) => (
                <p key={line} className="text-gray-500 text-sm font-body">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery Section ─────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-saffron-600 font-semibold text-sm uppercase tracking-wider mb-2">
            School Life
          </p>
          <h2 className="section-heading">Our Moments & Memories</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto font-body">
            Explore the vibrant moments from our school events, sports activities, and student achievements.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <ImageSlider />
        </div>
      </div>
    </section>
  );
}

// ── Main HomePage ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <AdmissionBanner />
      <About />
      <AdmissionProcess />
      <Gallery />
      <Facilities />
      <Contact />
    </div>
  );
}
