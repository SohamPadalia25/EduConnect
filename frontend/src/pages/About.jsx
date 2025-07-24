import { motion } from 'framer-motion';
import { Users, Target, Eye, CheckCircle, Calendar, MessageCircle, Globe, Shield } from 'lucide-react';
import Header from '../components/Header';
const About = () => {
  const offerings = {
    providers: [
      {
        icon: Calendar,
        title: 'Effortless Publishing',
        description: 'Easily post your upcoming webinars, seminars, and courses with a user-friendly interface.'
      },
      {
        icon: CheckCircle,
        title: 'Automated Expiry',
        description: 'Our smart system ensures your events automatically disappear once their date has passed, keeping your listings current and relevant.'
      },
      {
        icon: Globe,
        title: 'Wider Reach',
        description: 'Connect with a diverse and engaged audience actively seeking educational opportunities.'
      },
      {
        icon: MessageCircle,
        title: 'Direct Engagement',
        description: 'Enable students to contact you directly, fostering immediate communication and enrollment.'
      },
      {
        icon: Shield,
        title: 'Dedicated Admin Dashboard',
        description: 'Manage your listings, track interest, and oversee approvals with a powerful, intuitive dashboard.'
      }
    ],
    students: [
      {
        icon: CheckCircle,
        title: 'Curated Opportunities',
        description: 'Discover a comprehensive range of educational events and courses from reputable providers.'
      },
      {
        icon: Calendar,
        title: 'Stay Updated',
        description: 'Access real-time information on upcoming learning opportunities, all in one place.'
      },
      {
        icon: MessageCircle,
        title: 'Direct Communication',
        description: 'Easily connect with providers to inquire about courses, schedules, and enrollment.'
      },
      {
        icon: Globe,
        title: 'Never Miss Out',
        description: 'Our platform ensures you only see current and available events, saving you time and effort.'
      }
    ]
  };

  return (
    <>
    <Header />
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Us: Empowering Education & Connection
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Welcome to EduConnect, your dedicated hub for connecting aspiring learners with leading educational providers and enriching events. We're building a vibrant community where knowledge flourishes and opportunities are just a click away.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-hero rounded-3xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <Target className="h-12 w-12 text-primary mr-4" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-foreground/90 leading-relaxed">
              At EduConnect, our mission is to revolutionize how educational content is discovered and shared. We strive to create a seamless, intuitive platform that empowers institutes, academies, and training providers to reach a wider audience, while offering students unparalleled access to high-quality webinars, seminars, and courses.
            </p>
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50">
            <div className="flex items-center mb-6">
              <Eye className="h-12 w-12 text-secondary mr-4" />
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-lg text-foreground/90 leading-relaxed">
              We envision a future where continuous learning is accessible to everyone, everywhere. By fostering direct connections between educators and learners, we aim to be the go-to destination for professional development, skill enhancement, and lifelong learning.
            </p>
          </div>
        </motion.section>

        {/* What We Offer Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Offer</h2>
          </div>

          {/* For Course Providers */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-primary">For Course Providers & Event Organizers:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.providers.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-glow transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <p className="text-foreground/80">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-secondary">For Students & Learners:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerings.students.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-glow transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <p className="text-foreground/80">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Commitment Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-hero rounded-3xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <Shield className="h-12 w-12 text-accent mr-4" />
              <h2 className="text-3xl font-bold">Our Commitment</h2>
            </div>
            <p className="text-lg text-foreground/90 leading-relaxed">
              We are committed to fostering a trusted and efficient environment for both providers and learners. Our team is dedicated to continuous improvement, ensuring the platform remains at the forefront of educational technology and user experience.
            </p>
          </div>
        </motion.section>

        {/* Join Community Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50">
            <div className="flex justify-center mb-6">
              <Users className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg text-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Whether you're an institution looking to expand your reach or a student eager to learn something new, EduConnect is here to facilitate your journey. Explore our listings, connect with providers, and take the next step in your educational pursuit today!
            </p>
          </div>
        </motion.section>
      </div>
    </div>
    </>
  );
};

export default About;