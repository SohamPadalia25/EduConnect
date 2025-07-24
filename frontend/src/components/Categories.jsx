import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Briefcase, Heart, Palette, Cpu, BookOpen } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 'technology',
      name: 'Technology',
      icon: Code,
      description: 'Web Development, AI, Data Science',
      color: 'primary',
      eventCount: 120
    },
    {
      id: 'business',
      name: 'Business',
      icon: Briefcase,
      description: 'Marketing, Finance, Leadership',
      color: 'secondary',
      eventCount: 85
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      icon: Heart,
      description: 'Fitness, Nutrition, Mental Health',
      color: 'accent',
      eventCount: 45
    },
    {
      id: 'design',
      name: 'Design & Arts',
      icon: Palette,
      description: 'UI/UX, Graphic Design, Photography',
      color: 'primary',
      eventCount: 67
    },
    {
      id: 'science',
      name: 'Science & Research',
      icon: Cpu,
      description: 'Research Methods, Lab Techniques',
      color: 'secondary',
      eventCount: 34
    },
    {
      id: 'education',
      name: 'Education',
      icon: BookOpen,
      description: 'Teaching Methods, Curriculum Design',
      color: 'accent',
      eventCount: 56
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
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
            Explore Top Categories
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Discover events across various disciplines and find the perfect learning opportunity for you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link to={`/categories/${category.id}`}>
                <div className="relative p-6 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 bg-card border border-border/50 hover:border-primary/50 overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    category.color === 'primary' ? 'bg-gradient-to-br from-primary/5 to-transparent' : 
                    category.color === 'secondary' ? 'bg-gradient-to-br from-secondary/5 to-transparent' : 
                    'bg-gradient-to-br from-accent/5 to-transparent'
                  }`}></div>
                  
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                      category.color === 'primary' ? 'bg-primary/10' : 
                      category.color === 'secondary' ? 'bg-secondary/10' : 
                      'bg-accent/10'
                    }`}>
                      <category.icon className={`h-7 w-7 ${
                        category.color === 'primary' ? 'text-primary' : 
                        category.color === 'secondary' ? 'text-secondary' : 
                        'text-accent'
                      }`} />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-foreground/70 mb-4 text-sm">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground/80">
                        {category.eventCount} Events
                      </span>
                      <motion.div
                        className={`group-hover:translate-x-1 transition-transform duration-300 ${
                          category.color === 'primary' ? 'text-primary' : 
                          category.color === 'secondary' ? 'text-secondary' : 
                          'text-accent'
                        }`}
                        whileHover={{ x: 3 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-glow"
            >
              View All Categories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;