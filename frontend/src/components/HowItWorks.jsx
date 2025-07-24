import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, Users, Award } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Discover Events',
      description: 'Browse through hundreds of courses, webinars, and seminars from top institutions.',
      link: '/events',
      color: 'primary'
    },
    {
      icon: Calendar,
      title: 'Host an Event',
      description: 'Share your expertise by hosting webinars, courses, or seminars for eager learners.',
      link: '/host-event',
      color: 'secondary'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How This Platform Works
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Whether you're looking to learn or teach, our platform makes it simple to connect with the right opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={step.link}>
                <div className="relative p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 bg-gradient-card border border-border/50 hover:border-primary/50">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    step.color === 'primary' ? 'bg-primary/10' : 
                    step.color === 'secondary' ? 'bg-secondary/10' : 
                    'bg-accent/10'
                  }`}>
                    <step.icon className={`h-8 w-8 ${
                      step.color === 'primary' ? 'text-primary' : 
                      step.color === 'secondary' ? 'text-secondary' : 
                      'text-accent'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className={`inline-flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300 ${
                    step.color === 'primary' ? 'text-primary' : 
                    step.color === 'secondary' ? 'text-secondary' : 
                    'text-accent'
                  }`}>
                    Get Started
                    <motion.svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Community Driven</h4>
            <p className="text-foreground/80">Connect with like-minded learners and industry experts</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-secondary" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Quality Assured</h4>
            <p className="text-foreground/80">All events are reviewed and approved by our expert team</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Flexible Scheduling</h4>
            <p className="text-foreground/80">Learn at your own pace with flexible timing options</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;