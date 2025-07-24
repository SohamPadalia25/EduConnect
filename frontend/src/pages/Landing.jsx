import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Categories from '../components/Categories';
import { Users, Award, Clock, Shield } from 'lucide-react';
import Header from '../components/Header';
const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry leaders and certified professionals'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'All events are reviewed and approved by our expert team'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Join live sessions or access recorded content anytime'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and learning progress are safe with us'
    }
  ];

  return (
    <>
    <Header/>
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Categories />
      
      {/* Why Join Section */}
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
              Why Join EduConnect?
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Experience the future of learning with our comprehensive platform designed for success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Upcoming Events Preview
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Don't miss out on these exciting learning opportunities coming up this week.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced React Development',
                date: 'Dec 25, 2024',
                time: '2:00 PM',
                instructor: 'Sarah Johnson',
                category: 'Technology',
                type: 'Webinar'
              },
              {
                title: 'Digital Marketing Strategy',
                date: 'Dec 26, 2024',
                time: '10:00 AM',
                instructor: 'Mike Chen',
                category: 'Business',
                type: 'Course'
              },
              {
                title: 'UI/UX Design Principles',
                date: 'Dec 27, 2024',
                time: '3:00 PM',
                instructor: 'Emma Davis',
                category: 'Design',
                type: 'Seminar'
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 border border-border/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="text-sm text-foreground/70">{event.type}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-foreground/80 mb-3">by {event.instructor}</p>
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Landing;