import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Header from '../components/Header';
const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Advanced React Development',
      description: 'Master advanced React patterns, hooks, and performance optimization techniques.',
      instructor: 'Sarah Johnson',
      date: '2024-12-25',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'Webinar',
      category: 'Technology',
      price: 'Free',
      attendees: 245,
      image: 'https://i.ytimg.com/vi/-Qnf2bME-rE/sddefault.jpg'
    },
    {
      id: 2,
      title: 'Digital Marketing Strategy',
      description: 'Learn proven strategies to boost your online presence and drive conversions.',
      instructor: 'Mike Chen',
      date: '2024-12-26',
      time: '10:00 AM',
      duration: '3 hours',
      type: 'Course',
      category: 'Business',
      price: '$49',
      attendees: 189,
      image: 'https://lh6.googleusercontent.com/gmj1iVMyeZ86D1NapnOxH1E_IWb274F4yc3AbMBo6P6Xe1olSPUTvrRC8nKhH5hDroJVpVwVaczwXtqsjqWlYQOGf4tIBG8cOZCEwbO61e4w_9fKNUcJ5rLCDFZmemm_mG51nq_Z'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      description: 'Explore the fundamentals of user interface and user experience design.',
      instructor: 'Emma Davis',
      date: '2024-12-27',
      time: '3:00 PM',
      duration: '90 minutes',
      type: 'Seminar',
      category: 'Design',
      price: '$29',
      attendees: 156,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7eQ-vNTEZmBsSYUR5fGDNe58uRfhHEVN3dA&s'
    },
    {
      id: 4,
      title: 'Data Science Fundamentals',
      description: 'Introduction to data analysis, machine learning, and statistical methods.',
      instructor: 'David Kim',
      date: '2024-12-28',
      time: '1:00 PM',
      duration: '4 hours',
      type: 'Course',
      category: 'Technology',
      price: '$79',
      attendees: 203,
      image: 'https://m.media-amazon.com/images/I/51-guMrh6TL._UF1000,1000_QL80_.jpg'
    },
    {
      id: 5,
      title: 'Leadership in Remote Teams',
      description: 'Best practices for managing and leading distributed teams effectively.',
      instructor: 'Jennifer Wilson',
      date: '2024-12-29',
      time: '11:00 AM',
      duration: '2 hours',
      type: 'Webinar',
      category: 'Business',
      price: 'Free',
      attendees: 298,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxd-RdO1sOSaiYeOUvSruLRtaKH5Y_byUMUw&s'
    },
    {
      id: 6,
      title: 'Nutrition and Wellness',
      description: 'Science-based approach to nutrition and maintaining optimal health.',
      instructor: 'Dr. Lisa Brown',
      date: '2024-12-30',
      time: '4:00 PM',
      duration: '1.5 hours',
      type: 'Seminar',
      category: 'Health',
      price: '$19',
      attendees: 124,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ACuGHpVzK7aiL7VtielvqPBgBgacxh9uUQ&s'
    }
  ];

  const categories = ['all', 'Technology', 'Business', 'Design', 'Health', 'Science', 'Education'];
  const types = ['all', 'Webinar', 'Course', 'Seminar'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover <span className="bg-gradient-primary bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Find the perfect learning opportunity from our curated collection of webinars, courses, and seminars.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden border border-border/50"
            >
              <div className="h-48 bg-gradient-card flex items-center justify-center">
                <img
                  src={event.image}
                  alt="Event"
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="text-sm text-foreground/70">{event.type}</span>
                </div>
                
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-foreground/80 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-foreground/70">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-foreground/70">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time} • {event.duration}
                  </div>
                  <div className="flex items-center text-sm text-foreground/70">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} registered
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{event.price}</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Register Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-foreground/80">Try adjusting your search criteria or browse all events.</p>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
};

export default Events;