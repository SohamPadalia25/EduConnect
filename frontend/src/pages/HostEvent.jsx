import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar, Clock, Users, MapPin, DollarSign, FileText } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import Header from '../components/Header';
const HostEvent = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    date: '',
    time: '',
    duration: '',
    price: '',
    maxAttendees: '',
    location: '',
    requirements: ''
  });

  const categories = [
    'Technology', 'Business', 'Design', 'Health', 'Science', 'Education', 'Arts', 'Finance'
  ];

  const eventTypes = [
    'Webinar', 'Course', 'Seminar', 'Workshop', 'Conference'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Event submitted successfully!",
        description: "Your event has been submitted for review and will be published once approved.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        type: '',
        date: '',
        time: '',
        duration: '',
        price: '',
        maxAttendees: '',
        location: '',
        requirements: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card rounded-2xl p-8 shadow-glow border border-border/50">
              <h1 className="text-3xl font-bold mb-4">Login Required</h1>
              <p className="text-foreground/80 mb-6">
                Please log in to your account to host an event.
              </p>
              <Button 
                onClick={() => window.location.href = '/login'} 
                className="bg-primary hover:bg-primary/90"
              >
                Go to Login
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      </>
    );
  }

  if (user?.role === 'student') {
    return (
      <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card rounded-2xl p-8 shadow-glow border border-border/50">
              <h1 className="text-3xl font-bold mb-4">Host Access Required</h1>
              <p className="text-foreground/80 mb-6">
                You need a host account to create events. Please register as an event host.
              </p>
              <Button 
                onClick={() => window.location.href = '/register'} 
                className="bg-primary hover:bg-primary/90"
              >
                Become a Host
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Host Your <span className="bg-gradient-primary bg-clip-text text-transparent">Event</span>
            </h1>
            <p className="text-xl text-foreground/80">
              Share your expertise and connect with eager learners around the world.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-glow border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary mb-4">Basic Information</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your event, what attendees will learn, and any special features"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule & Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-secondary mb-4">Schedule & Details</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="text"
                      placeholder="e.g., 2 hours, 90 minutes"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
                      <Input
                        id="maxAttendees"
                        name="maxAttendees"
                        type="number"
                        placeholder="Enter max number of attendees"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
                      <Input
                        id="price"
                        name="price"
                        type="text"
                        placeholder="Free or $amount"
                        value={formData.price}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location/Platform</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Online, Zoom, Physical address"
                        value={formData.location}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-accent mb-4">Additional Information</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (Optional)</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder="Any prerequisites, materials needed, or special requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                disabled={loading}
              >
                {loading ? 'Submitting Event...' : 'Submit Event for Review'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>Note:</strong> All events are reviewed by our team before going live. 
                You'll receive an email notification once your event is approved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default HostEvent;