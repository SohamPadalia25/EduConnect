import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Calendar, Users, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Unlock Your
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Learning Potential
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover world-class courses, webinars, and seminars from top institutions and industry experts.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/events">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-glow text-lg px-8 py-6">
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/host-event">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6">
                Host Your Event
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-foreground/70">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">50K+</div>
              <div className="text-sm text-foreground/70">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">4.9</div>
              <div className="text-sm text-foreground/70">Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-20, -30, -20],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 hidden lg:block"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-card">
          <Users className="h-8 w-8 text-primary" />
        </div>
      </motion.div>

      <motion.div
        animate={{ 
          y: [-15, -25, -15],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-32 right-10 hidden lg:block"
      >
        <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center shadow-card">
          <Star className="h-10 w-10 text-secondary" />
        </div>
      </motion.div>

      <motion.div
        animate={{ 
          y: [-10, -20, -10],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-40 left-20 hidden lg:block"
      >
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shadow-card">
          <Calendar className="h-6 w-6 text-accent" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;