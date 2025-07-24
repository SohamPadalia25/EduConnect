"use client"

import { useState, useEffect, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Plus,
  Search,
  Bell,
  BarChart3,
  User,
  LogOut,
  MapPin,
  Upload,
  Eye,
  Edit,
  Trash2,
  Star,
  Award,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  Home,
  Save,
} from "lucide-react"
import { useAuth } from '../context/AuthContext.jsx'; // adjust the path
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast'; 
import API from '../services/api.jsx'; 
import axios from 'axios';
 // adjust the path
export default function Component() {
  const link="https://educonnect-imfb.onrender.com/api"
  const [activeView, setActiveView] = useState("dashboard")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("provider@example.com")
  const [isLoading, setIsLoading] = useState(true)
  const [animateStats, setAnimateStats] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Form states
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [maxAttendees, setMaxAttendees] = useState("")
  const [price, setPrice] = useState("")

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.fullname);

  // Edit form states
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editDate, setEditDate] = useState("")
  const [editLocation, setEditLocation] = useState("")
  const [editMaxAttendees, setEditMaxAttendees] = useState("")

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);


useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await API.get("/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // if JWT token is stored
        }
      });

      // Transform dates and attendees into frontend format if necessary
      const transformed = response.data.data.map((event) => ({
        id: event._id,
        title: event.title,
        description: event.description,
        date: event.date,
        displayDate: new Date(event.date).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        location: event.location,
        attendees: `${event.currentAttendees || 0} / ${event.maxAttendees || 100} attendees`,
        attendance: Math.round(((event.currentAttendees || 0) / (event.maxAttendees || 100)) * 100),
        status: "Pending",
        rating: event.rating || 0,
        image: event.image || "/placeholder.svg",
        maxAttendees: event.maxAttendees || 0,
        currentAttendees: event.currentAttendees || 0,
      }));

      setEvents(transformed);
      setIsLoading(false);
      setAnimateStats(true);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvents();
}, []);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      setAnimateStats(true)
    }, 1000)
  }, [])

  const handleLogout = () => {
    logout(); 
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Calculate days remaining for events
  const getEventStatus = (eventDate) => {
    const today = new Date()
    const eventDateObj = new Date(eventDate)
    const diffTime = eventDateObj - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { status: "Expired", daysLeft: 0 }
    } else if (diffDays === 0) {
      return { status: "Today", daysLeft: 0 }
    } else {
      return { status: "Pending", daysLeft: diffDays }
    }
  }

  // Update events with calculated status
  const eventsWithStatus = useMemo(() => {
    return events.map((event) => {
      const { status, daysLeft } = getEventStatus(event.date)
      return { ...event, status, daysLeft }
    })
  }, [events])

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return eventsWithStatus

    return eventsWithStatus.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [eventsWithStatus, searchQuery])

  const expiredEvents = eventsWithStatus.filter((event) => event.status === "Expired")
  const totalEvents = eventsWithStatus.length
  const totalAttendees = eventsWithStatus.reduce((sum, event) => sum + event.currentAttendees, 0)
  const pendingEvents = eventsWithStatus.filter((event) => event.status === "Pending").length

  const stats = [
    {
      title: "Total Events",
      value: totalEvents.toString(),
      change: "+12%",
      subtitle: "All time",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Pending Events",
      value: pendingEvents.toString(),
      change: "+8%",
      subtitle: "Upcoming events",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      title: "Expired Events",
      value: 8,
      change: "",
      subtitle: "Past events",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      gradient: "from-red-500 to-red-600",
    },
    {
      title: "Total Attendees",
      value: 100,
      change: "+25%",
      subtitle: "Across all events",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradient: "from-blue-500 to-blue-600",
    },
  ]

  const analyticsStats = [
    {
      title: "Expired Events",
      value: 8,
      subtitle: "Events that have passed their expiry date",
      color: "text-red-600",
      icon: Clock,
      bgColor: "bg-red-100",
    },
    {
      title: "Active Notifications",
      value: 23,
      subtitle: "Unread notifications",
      color: "text-yellow-600",
      icon: Bell,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Success Rate",
      value: "85%",
      subtitle: "Event completion rate",
      color: "text-green-600",
      icon: Target,
      bgColor: "bg-green-100",
    },
  ]

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "events", label: "My Events", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "profile", label: "Profile", icon: User },
  ]

  const handleCreateEvent = async () => {
  if (!eventTitle || !eventDescription || !eventDate || !location || !maxAttendees||!image) {
    alert("Please fill in all required fields");
    return;
  }

  const newEvent = {
    title: eventTitle,
    description: eventDescription,
    date: eventDate,
    time: eventDate.split("T")[1],
    type: "course", // or get this from a dropdown
    tags: [],
    location,
    pricing: price ? "paid" : "free",
    price,
    duration: "N/A",
    image,
    maxAttendees: parseInt(maxAttendees),
  };

  try {
    const response = await axios.post(
      `${link}/events`,
      newEvent,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Refresh list after creation
    setEvents((prev) => [response.data.data, ...prev]);
    toast({ title: "Event created successfully" });

    // Reset form & close modal
    setEventTitle("");
    setEventDescription("");
    setEventDate("");
    setLocation("");
    setExpiryDate("");
    setMaxAttendees("");
    setIsCreateEventOpen(false);
  } catch (error) {
    toast({ title: "Error", description: "Could not create event." });
    console.error("Create event error:", error);
  }
};



  const handleViewEvent = (event) => {
    setSelectedEvent(event)
    setIsViewEventOpen(true)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setEditTitle(event.title)
    setEditDescription(event.description)
    setEditDate(event.date)
    setEditLocation(event.location)
    setEditMaxAttendees(event.maxAttendees.toString())
    setIsEditEventOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editTitle || !editDescription || !editDate || !editLocation || !editMaxAttendees) {
      alert("Please fill in all required fields")
      return
    }

    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            title: editTitle,
            description: editDescription,
            date: editDate,
            displayDate: new Date(editDate).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            location: editLocation,
            maxAttendees: Number.parseInt(editMaxAttendees),
            attendees: `${event.currentAttendees} / ${editMaxAttendees} attendees`,
            image: "/placeholder.svg?height=200&width=400&text=" + encodeURIComponent(editTitle),
          }
        : event,
    )

    setEvents(updatedEvents)
    setIsEditEventOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
  try {
    // Change from: await axios.delete(`/events/${selectedEvent.id}`, {
    await API.delete(`/events/${selectedEvent.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
    setIsDeleteDialogOpen(false);
    setSelectedEvent(null);
    toast({ title: "Event deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    toast({ title: "Error", description: "Failed to delete event" });
  }
};



  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-6 h-6 text-purple-600 animate-pulse" />
        </div>
      </div>
    </div>
  )

  const StatCard = ({ stat, index }) => (
    <Card
      className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border-0 shadow-lg ${animateStats ? "animate-in slide-in-from-bottom-4" : ""}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
          {stat.title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
          <stat.icon className={`h-5 w-5 ${stat.color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
          {stat.value}
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-600 mt-2">
          <span>{stat.subtitle}</span>
          {stat.change && (
            <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
          )}
        </div>
        <div className="mt-3">
          <Progress value={75} className="h-2 bg-gray-100 group-hover:bg-gray-200 transition-colors" />
        </div>
      </CardContent>
    </Card>
  )

  const EventCard = ({ event, index }) => (
    <Card
      className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-0 shadow-lg animate-in slide-in-from-bottom-6`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Badge
          variant="secondary"
          className={`absolute top-3 right-3 border-0 shadow-lg ${
            event.status === "Expired"
              ? "bg-red-500 text-white"
              : event.status === "Today"
                ? "bg-green-500 text-white animate-pulse"
                : "bg-amber-500 text-white"
          }`}
        >
          {event.status === "Pending" ? `${event.daysLeft} days left` : event.status}
        </Badge>
        {event.rating > 0 && (
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{event.rating}</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg group-hover:text-purple-600 transition-colors duration-300">
          {event.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            <Calendar className="h-4 w-4 mr-3 text-purple-500" />
            {event.displayDate}
          </div>
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            <MapPin className="h-4 w-4 mr-3 text-purple-500" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            <Users className="h-4 w-4 mr-3 text-purple-500" />
            {event.attendees}
          </div>
        </div>

        {event.status === "Pending" && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">
                Starts in {event.daysLeft} {event.daysLeft === 1 ? "day" : "days"}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Attendance</span>
            <span className="text-purple-600">{event.attendance}%</span>
          </div>
          <Progress value={event.attendance} className="h-3 bg-gray-100" />
        </div>

        <div className="flex space-x-2 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewEvent(event)}
            className="flex-1 group-hover:bg-purple-50 group-hover:border-purple-200 transition-all duration-300 bg-transparent"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditEvent(event)}
            className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300 bg-transparent"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteEvent(event)}
            className="group-hover:bg-red-50 group-hover:border-red-200 transition-all duration-300 bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const NotificationPopover = () => (
    <PopoverContent className="w-80 p-0 border-0 shadow-2xl rounded-2xl" align="end">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <Badge className="bg-red-100 text-red-600 border-0">{expiredEvents.length}</Badge>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {expiredEvents.length > 0 ? (
          expiredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200 animate-in slide-in-from-right-4`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Event has expired</p>
                  <p className="text-xs text-gray-400 mt-1">{event.displayDate}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-500">No notifications</p>
          </div>
        )}
      </div>
    </PopoverContent>
  )

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-700">
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=Pattern')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3 animate-in slide-in-from-left-6 duration-700">
            Welcome back, <span className="text-yellow-300">{user.fullname}</span>! 👋
          </h1>
          <p className="text-purple-100 text-lg animate-in slide-in-from-left-6 duration-700 delay-200">
            Ready to create amazing learning experiences? Your dashboard is looking fantastic today.
          </p>
          <div className="flex items-center mt-4 space-x-4 animate-in slide-in-from-left-6 duration-700 delay-400">
            <Award className="w-6 h-6 text-yellow-300" />
            <span className="text-purple-100">Top Rated Provider</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      <div className="flex justify-between items-center animate-in slide-in-from-bottom-4 duration-700 delay-600">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recent Events</h2>
          <p className="text-gray-600 mt-1">Your latest created events</p>
        </div>
        <Button
          onClick={() => setIsCreateEventOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.slice(0, 6).map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {filteredEvents.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-700">
      <div className="animate-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your event performance and engagement metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyticsStats.map((stat, index) => (
          <Card
            key={index}
            className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border-0 shadow-lg animate-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <CardTitle className={`${stat.color} group-hover:scale-105 transition-transform duration-300`}>
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-3 text-gray-900 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg animate-in slide-in-from-left-6 delay-400">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>Event Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-gray-500 font-medium">Interactive charts coming soon...</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg animate-in slide-in-from-right-6 delay-400">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Attendance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-gray-500 font-medium">Trend analysis coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-700">
      <div className="animate-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </div>

      <Card className="max-w-2xl hover:shadow-xl transition-all duration-500 border-0 shadow-lg animate-in slide-in-from-bottom-6 delay-200">
        <CardHeader className="flex flex-row items-center space-y-0 space-x-6 pb-6">
          <div className="relative group">
            <Avatar className="h-20 w-20 ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all duration-300">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-2xl font-bold">
                A
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900">{user.fullname}</h3>
            <p className="text-purple-600 font-medium">Course Provider</p>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">4.8 Rating</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{totalAttendees} Students</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-purple-600 font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={user.fullname}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-purple-600 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              />
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Award className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-700">
      <div className="flex justify-between items-center animate-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-600 mt-2">Manage and track your created events</p>
        </div>
        <Button
          onClick={() => setIsCreateEventOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      <Card className="animate-in slide-in-from-bottom-4 duration-700 delay-400 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Events List</CardTitle>
          <CardDescription>All your created events with detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-gray-100">
                <TableHead className="font-semibold text-gray-700">Event</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Location</TableHead>
                <TableHead className="font-semibold text-gray-700">Attendees</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event, index) => (
                <TableRow
                  key={event.id}
                  className={`hover:bg-gray-50 transition-colors duration-200 animate-in slide-in-from-left-4`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{event.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{event.displayDate}</TableCell>
                  <TableCell className="text-gray-600">{event.location}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {event.currentAttendees} / {event.maxAttendees}
                      </p>
                      <Progress value={event.attendance} className="h-2 w-20" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${
                        event.status === "Expired"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : event.status === "Today"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                      } border`}
                    >
                      {event.status === "Pending" ? `${event.daysLeft} days left` : event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {event.rating > 0 ? (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No rating</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewEvent(event)}
                        className="hover:bg-purple-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                        className="hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event)}
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredEvents.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 animate-in slide-in-from-left-6 duration-700">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-3 font-bold shadow-lg">
                CP
              </div>
              <div>
                <h1 className="font-bold text-purple-600 text-lg">Course Provider</h1>
                <p className="text-xs text-gray-500">Events Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1 animate-in slide-in-from-top-4 duration-700 delay-100">
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className={`transition-all duration-300 rounded-xl px-4 py-2 ${
                  activeView === item.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-purple-50"
                }`}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 animate-in slide-in-from-top-4 duration-700 delay-200">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-hover:text-purple-500 transition-colors" />
              <Input
                placeholder="Search events, analytics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-gray-50/50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 animate-in slide-in-from-right-6 duration-700">
            <Button
              onClick={() => setIsCreateEventOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>

            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative hover:bg-purple-50 transition-colors duration-300 rounded-xl"
                >
                  <Bell className="h-5 w-5" />
                  {expiredEvents.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 animate-bounce">
                      {expiredEvents.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <NotificationPopover />
            </Popover>

            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2 hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <Avatar className="h-10 w-10 ring-2 ring-purple-100">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold">
                  AR
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user.fullname}</p>
                <p className="text-gray-500">Provider</p>
              </div>
            </div>

            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-xl" onClick={handleLogout}> 
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {activeView === "dashboard" && renderDashboard()}
        {activeView === "events" && renderEvents()}
        {activeView === "analytics" && renderAnalytics()}
        {activeView === "profile" && renderProfile()}
      </main>

      {/* View Event Modal */}
      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent className="max-w-2xl border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center space-x-2">
              <Eye className="w-6 h-6" />
              <span>Event Details</span>
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    selectedEvent.status === "Expired"
                      ? "bg-red-500 text-white"
                      : selectedEvent.status === "Today"
                        ? "bg-green-500 text-white"
                        : "bg-amber-500 text-white"
                  }`}
                >
                  {selectedEvent.status === "Pending" ? `${selectedEvent.daysLeft} days left` : selectedEvent.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
                  <p className="text-gray-600 mt-2">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">{selectedEvent.displayDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">{selectedEvent.attendees}</span>
                  </div>
                  {selectedEvent.rating > 0 && (
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-gray-700">{selectedEvent.rating} Rating</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Attendance Progress</span>
                    <span className="text-purple-600">{selectedEvent.attendance}%</span>
                  </div>
                  <Progress value={selectedEvent.attendance} className="h-3" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Event Modal */}
      <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center space-x-2">
              <Edit className="w-6 h-6" />
              <span>Edit Event</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="editTitle" className="text-gray-700 font-medium">
                Event Title *
              </Label>
              <Input
                id="editTitle"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="editDescription" className="text-gray-700 font-medium">
                Event Description *
              </Label>
              <Textarea
                id="editDescription"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl min-h-[120px] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="editDate" className="text-purple-600 font-medium flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Event Date & Time *</span>
                </Label>
                <Input
                  id="editDate"
                  type="datetime-local"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="editLocation" className="text-purple-600 font-medium flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location *</span>
                </Label>
                <Input
                  id="editLocation"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="editMaxAttendees" className="text-purple-600 font-medium flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Maximum Attendees *</span>
              </Label>
              <Input
                id="editMaxAttendees"
                type="number"
                value={editMaxAttendees}
                onChange={(e) => setEditMaxAttendees(e.target.value)}
                className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setIsEditEventOpen(false)}
                className="px-8 py-3 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="border-0 shadow-2xl rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center space-x-2">
              <Trash2 className="w-5 h-5" />
              <span>Delete Event</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone and all event data
              will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 rounded-xl text-white">
              Delete Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Event Modal */}
      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center space-x-2">
              <Plus className="w-6 h-6" />
              <span>Create New Event</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="eventTitle" className="text-gray-700 font-medium">
                Event Title *
              </Label>
              <Input
                id="eventTitle"
                placeholder="Enter your event title..."
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="eventDescription" className="text-gray-700 font-medium">
                Event Description *
              </Label>
              <Textarea
                id="eventDescription"
                placeholder="Describe your event in detail..."
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl min-h-[120px] resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="eventDate" className="text-purple-600 font-medium flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Event Date & Time *</span>
                </Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="location" className="text-purple-600 font-medium flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location *</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Event location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="expiryDate" className="text-purple-600 font-medium flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Event Expiry Date</span>
                </Label>
                <Input
                  id="expiryDate"
                  type="datetime-local"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="maxAttendees" className="text-purple-600 font-medium flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Maximum Attendees *</span>
                </Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  placeholder="50"
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">
                Event Image <span className="text-gray-400 text-sm">(Optional)</span>
              </Label>
              {/* <div className="border-2 border-dashed border-purple-200 rounded-2xl p-12 text-center hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer group">
                <Upload className="h-16 w-16 text-purple-400 mx-auto mb-4 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300" />
                <p className="text-purple-600 font-semibold text-lg mb-2">Upload an image or drag and drop</p>
                <p className="text-purple-600 font-semibold text-lg mb-2">Upload an image or drag and drop</p>
                <p className="text-gray-500">PNG, JPG up to 10MB</p>
              </div> */}
              <Input
                  id="image"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                  required
                />
                <div className="space-y-3">
                <Label htmlFor="maxAttendees" className="text-purple-600 font-medium flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Price</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="$50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                  required
                />
              </div>
            </div>
            

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setIsCreateEventOpen(false)}
                className="px-8 py-3 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                onClick={handleCreateEvent}
              >
                <Zap className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
