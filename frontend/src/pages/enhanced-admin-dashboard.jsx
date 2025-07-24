"use client"
import { useState, useMemo } from "react"
import "./enhanced-admin-dashboard.css"
import axios from "axios"
import API from "../services/api"


// Icons as SVG components
const Icons = {
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  MessageSquare: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Handshake: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"></path>
      <path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7.1"></path>
    </svg>
  ),
  BarChart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
      <polyline points="16,7 22,7 22,13"></polyline>
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7,10 12,15 17,10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  MoreHorizontal: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
    </svg>
  ),
  Filter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Edit: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  ),
  LogOut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
}



// Enhanced mock data with more comprehensive analytics
const mockData = {
  stats: {
    totalUsers: 15247,
    activeUsers: 8932,
    eventsLive: 45,
    eventsUpcoming: 123,
    eventsClosed: 567,
    totalRewards: 125000,
    completionRate: 78.5,
    returningUsers: 65.2,
  },
  partners: [
    {
      id: 1,
      name: "Microsoft",
      logo: "/placeholder.svg?height=60&width=120&text=Microsoft",
      adRevenue: 85000,
      activeEvents: 12,
      joinDate: "2023-01-15",
      category: "Technology",
      description: "Leading technology company providing cloud and productivity solutions for modern businesses.",
      employees: "220,000+",
      headquarters: "Redmond, WA",
      website: "microsoft.com",
      contactEmail: "partnerships@microsoft.com",
      tier: "Premium",
      performance: 94,
    },
    {
      id: 2,
      name: "Google",
      logo: "/placeholder.svg?height=60&width=120&text=Google",
      adRevenue: 92000,
      activeEvents: 18,
      joinDate: "2023-03-20",
      category: "Technology",
      description: "Global technology leader in search, cloud computing, and artificial intelligence solutions.",
      employees: "190,000+",
      headquarters: "Mountain View, CA",
      website: "google.com",
      contactEmail: "partnerships@google.com",
      tier: "Premium",
      performance: 97,
    },
    {
      id: 3,
      name: "Amazon",
      logo: "/placeholder.svg?height=60&width=120&text=Amazon",
      adRevenue: 78000,
      activeEvents: 15,
      joinDate: "2023-05-10",
      category: "E-commerce & Cloud",
      description: "World's largest online marketplace and leading cloud services provider.",
      employees: "1,500,000+",
      headquarters: "Seattle, WA",
      website: "amazon.com",
      contactEmail: "partnerships@amazon.com",
      tier: "Premium",
      performance: 91,
    },
    {
      id: 4,
      name: "Meta",
      logo: "/placeholder.svg?height=60&width=120&text=Meta",
      adRevenue: 65000,
      activeEvents: 10,
      joinDate: "2023-07-08",
      category: "Social Media",
      description: "Social technology company connecting people through innovative platforms and virtual reality.",
      employees: "86,000+",
      headquarters: "Menlo Park, CA",
      website: "meta.com",
      contactEmail: "partnerships@meta.com",
      tier: "Standard",
      performance: 88,
    },
    {
      id: 5,
      name: "Apple",
      logo: "/placeholder.svg?height=60&width=120&text=Apple",
      adRevenue: 95000,
      activeEvents: 8,
      joinDate: "2023-09-12",
      category: "Consumer Electronics",
      description: "Leading consumer electronics company known for innovative hardware and software solutions.",
      employees: "164,000+",
      headquarters: "Cupertino, CA",
      website: "apple.com",
      contactEmail: "partnerships@apple.com",
      tier: "Premium",
      performance: 96,
    },
    {
      id: 6,
      name: "Netflix",
      logo: "/placeholder.svg?height=60&width=120&text=Netflix",
      adRevenue: 42000,
      activeEvents: 6,
      joinDate: "2023-11-05",
      category: "Entertainment",
      description: "World's leading streaming entertainment service with original content and global reach.",
      employees: "12,800+",
      headquarters: "Los Gatos, CA",
      website: "netflix.com",
      contactEmail: "partnerships@netflix.com",
      tier: "Standard",
      performance: 85,
    },
  ],
  analytics: {
    userGrowth: [
      { month: "Jan", users: 12000, active: 8000, new: 2000 },
      { month: "Feb", users: 14500, active: 9500, new: 2500 },
      { month: "Mar", users: 16800, active: 11000, new: 2300 },
      { month: "Apr", users: 19200, active: 12800, new: 2400 },
      { month: "May", users: 21500, active: 14500, new: 2300 },
      { month: "Jun", users: 23800, active: 16200, new: 2300 },
    ],
    eventCategories: [
      { category: "Hackathons", count: 45, percentage: 35, trend: 12 },
      { category: "Webinars", count: 32, percentage: 25, trend: 8 },
      { category: "Workshops", count: 28, percentage: 22, trend: -2 },
      { category: "Quizzes", count: 23, percentage: 18, trend: 15 },
    ],
    geographicalData: [
      { region: "North America", users: 8500, percentage: 45 },
      { region: "Europe", users: 5200, percentage: 28 },
      { region: "Asia Pacific", users: 3100, percentage: 17 },
      { region: "Others", users: 1900, percentage: 10 },
    ],
    eventPerformance: [
      { event: "React Workshop", registrations: 156, completion: 89, avgTime: "2.5h", dropoff: 11 },
      { event: "Python Bootcamp", registrations: 134, completion: 76, avgTime: "4.2h", dropoff: 24 },
      { event: "Design Thinking", registrations: 98, completion: 92, avgTime: "1.8h", dropoff: 8 },
      { event: "Data Science", registrations: 178, completion: 68, avgTime: "3.1h", dropoff: 32 },
    ],
    clickedTags: [
      { tag: "React", clicks: 2340 },
      { tag: "Python", clicks: 1890 },
      { tag: "JavaScript", clicks: 1654 },
      { tag: "AI/ML", clicks: 1432 },
      { tag: "Design", clicks: 1287 },
    ],
    topColleges: [
      { name: "Stanford University", participants: 1200 },
      { name: "MIT", participants: 1100 },
      { name: "UC Berkeley", participants: 1050 },
      { name: "Harvard University", participants: 980 },
      { name: "Caltech", participants: 920 },
    ],
  },
  users: [
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily.j@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=EJ",
      eventsAttended: 12,
      lastActivity: "2 hours ago",
      location: "New York, US",
      status: "active",
      joinDate: "2024-01-15",
      role: "student",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      eventsAttended: 28,
      lastActivity: "1 day ago",
      location: "San Francisco, US",
      status: "active",
      joinDate: "2023-11-20",
      role: "student",
    },
    {
      id: 3,
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
      eventsAttended: 5,
      lastActivity: "3 days ago",
      location: "London, UK",
      status: "inactive",
      joinDate: "2024-01-10",
      role: "student",
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "d.rodriguez@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=DR",
      eventsAttended: 34,
      lastActivity: "5 hours ago",
      location: "Madrid, Spain",
      status: "active",
      joinDate: "2023-09-12",
      role: "provider",
    },
  ],
  feedback: [
    {
      id: 1,
      user: {
        name: "Emily Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=EJ",
      },
      event: "Advanced React Patterns Workshop",
      provider: "TechEdu Academy",
      rating: 5,
      comment:
        "Absolutely fantastic workshop! The instructor was knowledgeable and the hands-on exercises were really helpful. Learned so much about advanced React patterns that I can immediately apply in my work.",
      date: "2024-01-20",
      status: "approved",
      helpfulCount: 23,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
      },
      event: "Data Science Bootcamp 2024",
      provider: "DataLearn Institute",
      rating: 2,
      comment: "The content was outdated and the instructor seemed unprepared. Expected much more from this bootcamp.",
      date: "2024-01-19",
      status: "pending",
      helpfulCount: 8,
    },
    {
      id: 3,
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40&text=SW",
      },
      event: "UI/UX Design Fundamentals",
      provider: "Creative Studios",
      rating: 4,
      comment: "Great introduction to UI/UX principles. Would have liked more practical exercises.",
      date: "2024-01-18",
      status: "approved",
      helpfulCount: 15,
    },
  ],
  events: [
    {
      id: 1,
      title: "Advanced React Patterns",
      provider: "TechCorp Academy",
      type: "webinar",
      status: "pending",
      registrations: 156,
      submissionDate: "2024-01-15",
      eventDate: "2024-02-01",
      description: "Deep dive into advanced React patterns including render props, higher-order components, and hooks.",
      duration: "3 hours",
      price: "$99",
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      provider: "DataLearn Inc",
      type: "course",
      status: "approved",
      registrations: 89,
      submissionDate: "2024-01-10",
      eventDate: "2024-01-25",
      description: "Comprehensive data science bootcamp covering Python, machine learning, and data visualization.",
      duration: "8 weeks",
      price: "$499",
    },
  ],
}

const user = JSON.parse(localStorage.getItem("user"));
// Main Dashboard Component
const EnhancedAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [editProfile, setEditProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.fullname || "Admin User",
    email: user?.email||"admin@events.com",
    role: "Administrator",
    department: "IT Operations",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  })
  
  const [userFilter, setUserFilter] = useState("all")
  const [eventFilter, setEventFilter] = useState("all")
  const [feedbackFilter, setFeedbackFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  // Search functionality
  const filteredData = useMemo(() => {
    if (!searchQuery) return mockData
    const query = searchQuery.toLowerCase()
    return {
      ...mockData,
      users: mockData.users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.location.toLowerCase().includes(query),
      ),
      events: mockData.events.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.provider.toLowerCase().includes(query) ||
          event.type.toLowerCase().includes(query),
      ),
      feedback: mockData.feedback.filter(
        (feedback) =>
          feedback.user.name.toLowerCase().includes(query) ||
          feedback.event.toLowerCase().includes(query) ||
          feedback.comment.toLowerCase().includes(query),
      ),
    }
  }, [searchQuery])

  const showNotification = (message, type = "success") => {
    const notification = { id: Date.now(), message, type }
    setNotifications((prev) => [...prev, notification])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
    }, 3000)
  }

  const exportData = () => {
    const data = {
      stats: mockData.stats,
      users: filteredData.users,
      events: filteredData.events,
      feedback: filteredData.feedback,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `admin_dashboard_export_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showNotification("Data exported successfully!")
  }

  // Add profile editing modal
  const renderProfileModal = () =>
    editProfile && (
      <div className="modal-overlay" onClick={() => setEditProfile(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Edit Profile</h3>
            <button className="modal-close" onClick={() => setEditProfile(false)}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  value={profileData.role}
                  onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setEditProfile(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                showNotification("Profile updated successfully!")
                setEditProfile(false)
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )

  // StatsCard Component
  const StatsCard = ({ title, value, change, icon: Icon, color, onClick }) => (
    <div className={`stats-card ${color}`} onClick={onClick}>
      <div className="stats-icon">
        <Icon />
      </div>
      <div className="stats-content">
        <h3>{value.toLocaleString()}</h3>
        <p>{title}</p>
        <div className="stats-change positive">
          <Icons.TrendingUp />+{change}%
        </div>
      </div>
    </div>
  )

  // UserGrowthChart Component
  const UserGrowthChart = ({ data }) => (
    <div className="chart-container">
      <h4>User Growth Trend</h4>
      <div className="line-chart-wrapper">
        <svg viewBox="0 0 500 250" className="multi-line-chart">
          <defs>
            <linearGradient id="gradient-users" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="gradient-active" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="50" y1={50 + i * 40} x2="450" y2={50 + i * 40} stroke="#f1f5f9" strokeWidth="1" />
          ))}
          {/* Total Users Line */}
          <path
            d={`M 50 ${200 - (data[0].users / 25000) * 150} ${data
              .map((d, i) => `L ${50 + i * 80} ${200 - (d.users / 25000) * 150}`)
              .join(" ")}`}
            fill="url(#gradient-users)"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          {/* Active Users Line */}
          <path
            d={`M 50 ${200 - (data[0].active / 25000) * 150} ${data
              .map((d, i) => `L ${50 + i * 80} ${200 - (d.active / 25000) * 150}`)
              .join(" ")}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          {/* Data points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={50 + i * 80} cy={200 - (d.users / 25000) * 150} r="4" fill="#3b82f6" />
              <circle cx={50 + i * 80} cy={200 - (d.active / 25000) * 150} r="4" fill="#10b981" />
              <text x={50 + i * 80} y={230} textAnchor="middle" fontSize="12" fill="#64748b">
                {d.month}
              </text>
            </g>
          ))}
          {/* Legend */}
          <g transform="translate(350, 30)">
            <circle cx="0" cy="0" r="4" fill="#3b82f6" />
            <text x="10" y="4" fontSize="12" fill="#64748b">
              Total Users
            </text>
            <circle cx="0" cy="20" r="4" fill="#10b981" />
            <text x="10" y="24" fontSize="12" fill="#64748b">
              Active Users
            </text>
          </g>
        </svg>
      </div>
    </div>
  )

  // GeographicalChart Component
  const GeographicalChart = ({ data }) => (
    <div className="chart-container">
      <h4>User Distribution</h4>
      <div className="geo-chart-wrapper">
        {data.map((region, index) => (
          <div key={index} className="geo-item">
            <span className="geo-label">{region.region}</span>
            <div className="geo-bar">
              <div
                className="geo-fill"
                style={{
                  width: `${region.percentage}%`,
                  backgroundColor: `hsl(${index * 120}, 60%, 50%)`,
                }}
              />
              <span className="geo-value">{region.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // EventPerformanceChart Component
  const EventPerformanceChart = ({ data }) => (
    <div className="chart-container">
      <h4>Event Performance</h4>
      <div className="performance-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Registrations</th>
              <th>Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((event, index) => (
              <tr key={index}>
                <td>{event.event}</td>
                <td>{event.registrations}</td>
                <td>{event.completion}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  // TagPopularityChart Component
  const TagPopularityChart = ({ data }) => (
    <div className="chart-container">
      <h4>Tag Popularity</h4>
      <div className="tag-cloud-wrapper">
        {data.map((tag, index) => (
          <span key={index} className="tag-item" style={{ fontSize: `${10 + tag.clicks / 500}px` }}>
            {tag.tag}
          </span>
        ))}
      </div>
    </div>
  )

  // Add these new chart components after the existing chart components

  // Revenue Chart Component
  const RevenueChart = ({ data }) => (
    <div className="chart-container">
      <h4>Revenue Analytics</h4>
      <div className="line-chart-wrapper">
        <svg viewBox="0 0 500 250" className="multi-line-chart">
          <defs>
            <linearGradient id="gradient-revenue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="50" y1={50 + i * 40} x2="450" y2={50 + i * 40} stroke="#f1f5f9" strokeWidth="1" />
          ))}
          {/* Revenue Line */}
          <path
            d="M 50 180 L 130 160 L 210 140 L 290 120 L 370 100 L 450 80"
            fill="url(#gradient-revenue)"
            stroke="#8b5cf6"
            strokeWidth="3"
          />
          {/* Data points */}
          {[50, 130, 210, 290, 370, 450].map((x, i) => (
            <circle key={i} cx={x} cy={180 - i * 20} r="4" fill="#8b5cf6" />
          ))}
          {/* Labels */}
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
            <text key={i} x={50 + i * 80} y={230} textAnchor="middle" fontSize="12" fill="#64748b">
              {month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )

  // Engagement Metrics Chart
  const EngagementChart = () => (
    <div className="chart-container">
      <h4>User Engagement Metrics</h4>
      <div className="donut-chart">
        <svg viewBox="0 0 200 200" width="200" height="200">
          <defs>
            <linearGradient id="gradient-engagement" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" strokeWidth="20" />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#gradient-engagement)"
            strokeWidth="20"
            strokeDasharray="377"
            strokeDashoffset="94"
            transform="rotate(-90 100 100)"
          />
          <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="700" fill="#1e293b">
            75%
          </text>
          <text x="100" y="115" textAnchor="middle" fontSize="12" fill="#64748b">
            Engagement
          </text>
        </svg>
      </div>
    </div>
  )

  // Event Categories Pie Chart
  const EventCategoriesChart = ({ data }) => (
    <div className="chart-container">
      <h4>Event Categories Distribution</h4>
      <div className="pie-chart-wrapper">
        <svg viewBox="0 0 300 300" width="300" height="300">
          <defs>
            {data.map((_, index) => (
              <linearGradient key={index} id={`gradient-category-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`hsl(${260 + index * 30}, 70%, 60%)`} />
                <stop offset="100%" stopColor={`hsl(${260 + index * 30}, 70%, 50%)`} />
              </linearGradient>
            ))}
          </defs>
          {/* Pie slices */}
          {data.map((item, index) => {
            const angle = (item.percentage / 100) * 360
            const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.percentage / 100) * 360, 0)
            const endAngle = startAngle + angle
            const largeArcFlag = angle > 180 ? 1 : 0

            const x1 = 150 + 80 * Math.cos(((startAngle - 90) * Math.PI) / 180)
            const y1 = 150 + 80 * Math.sin(((startAngle - 90) * Math.PI) / 180)
            const x2 = 150 + 80 * Math.cos(((endAngle - 90) * Math.PI) / 180)
            const y2 = 150 + 80 * Math.sin(((endAngle - 90) * Math.PI) / 180)

            return (
              <path
                key={index}
                d={`M 150 150 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={`url(#gradient-category-${index})`}
                stroke="white"
                strokeWidth="2"
              />
            )
          })}
          {/* Center circle */}
          <circle cx="150" cy="150" r="40" fill="white" stroke="#e2e8f0" strokeWidth="2" />
          <text x="150" y="145" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b">
            Events
          </text>
          <text x="150" y="165" textAnchor="middle" fontSize="12" fill="#64748b">
            Categories
          </text>
        </svg>
        {/* Legend */}
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ background: `hsl(${260 + index * 30}, 70%, 55%)` }}></div>
              <span>
                {item.category}: {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Performance Trends Chart
  const PerformanceTrendsChart = () => (
    <div className="chart-container">
      <h4>Platform Performance Trends</h4>
      <div className="area-chart-wrapper">
        <svg viewBox="0 0 500 250" className="area-chart">
          <defs>
            <linearGradient id="gradient-performance" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Grid */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="50" y1={50 + i * 40} x2="450" y2={50 + i * 40} stroke="#f1f5f9" strokeWidth="1" />
          ))}
          {/* Area */}
          <path
            d="M 50 200 L 100 180 L 150 160 L 200 140 L 250 120 L 300 100 L 350 90 L 400 80 L 450 70 L 450 210 L 50 210 Z"
            fill="url(#gradient-performance)"
          />
          {/* Line */}
          <path
            d="M 50 200 L 100 180 L 150 160 L 200 140 L 250 120 L 300 100 L 350 90 L 400 80 L 450 70"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
          />
          {/* Points */}
          {[50, 100, 150, 200, 250, 300, 350, 400, 450].map((x, i) => (
            <circle key={i} cx={x} cy={200 - i * 15} r="4" fill="#8b5cf6" />
          ))}
        </svg>
      </div>
    </div>
  )

  // Update user dropdown to include profile editing
  const updatedUserDropdown = () =>
    showUserDropdown && (
      <div className="user-dropdown">
        <button
          className="dropdown-item"
          onClick={() => {
            setEditProfile(true)
            setShowUserDropdown(false)
          }}
        >
          <Icons.Edit /> Edit Profile
        </button>
        <button className="dropdown-item">
          <Icons.LogOut /> Logout
        </button>
      </div>
    )

  // Update dashboard with enhanced analytics
  const renderDashboard = () => (
    <>
    <h1 className="header1">Welcome {user.fullname} to Dashboard</h1>
    <div className="dashboard-section">
      {/* Stats Grid */}
      <div className="stats-grid">
        <StatsCard
          title="Total Registered Users"
          value={mockData.stats.totalUsers}
          change={12.5}
          icon={Icons.Users}
          color="blue"
          onClick={() => setActiveSection("users")}
        />
        <StatsCard
          title="Active Users This Month"
          value={mockData.stats.activeUsers}
          change={8.2}
          icon={Icons.TrendingUp}
          color="green"
        />
        <StatsCard
          title="Events Live"
          value={mockData.stats.eventsLive}
          change={15.3}
          icon={Icons.Calendar}
          color="orange"
          onClick={() => setActiveSection("events")}
        />
        <StatsCard
          title="Total Rewards Distributed"
          value={mockData.stats.totalRewards}
          change={22.1}
          icon={Icons.TrendingUp}
          color="purple"
        />
      </div>

      {/* Enhanced Charts Section */}
      <div className="charts-grid-enhanced">
        <div className="chart-large">
          <UserGrowthChart data={mockData.analytics.userGrowth} />
        </div>
        <div className="chart-medium">
          <GeographicalChart data={mockData.analytics.geographicalData} />
        </div>
      </div>

      <div className="charts-grid-secondary">
        <EventPerformanceChart data={mockData.analytics.eventPerformance} />
        <TagPopularityChart data={mockData.analytics.clickedTags} />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-cards">
          <div className="action-card" onClick={() => setActiveSection("events")}>
            <Icons.Calendar />
            <span>Manage Events</span>
            <div className="action-badge">{mockData.stats.eventsUpcoming}</div>
          </div>
          <div className="action-card" onClick={() => setActiveSection("users")}>
            <Icons.Users />
            <span>User Management</span>
          </div>
          <div className="action-card" onClick={() => setActiveSection("feedback")}>
            <Icons.MessageSquare />
            <span>Review Feedback</span>
          </div>
          <div className="action-card" onClick={() => setActiveSection("announcements")}>
            <Icons.Bell />
            <span>Send Announcement</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )

  const renderAnalytics = () => (
    <div className="analytics-section">
      <div className="section-header">
        <h2>Platform Analytics</h2>
        <button className="btn btn-primary" onClick={() => showNotification("Analytics report generated!")}>
          <Icons.Download /> Generate Report
        </button>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="charts-grid-enhanced">
        <div className="chart-large">
          <UserGrowthChart data={mockData.analytics.userGrowth} />
        </div>
        <div className="chart-medium">
          <EngagementChart />
        </div>
      </div>

      <div className="charts-grid-secondary">
        <RevenueChart />
        <EventCategoriesChart data={mockData.analytics.eventCategories} />
      </div>

      <div className="charts-grid-secondary">
        <PerformanceTrendsChart />
        <GeographicalChart data={mockData.analytics.geographicalData} />
      </div>

      {/* Platform Overview */}
      <div className="analytics-category">
        <h3>Platform Overview</h3>
        <div className="analytics-grid">
          <div className="metric-card">
            <h4>Total Registered Users</h4>
            <div className="metric-value">{mockData.stats.totalUsers.toLocaleString()}</div>
            <div className="metric-trend positive">+12.5% this month</div>
          </div>
          <div className="metric-card">
            <h4>Active Users This Week</h4>
            <div className="metric-value">{mockData.stats.activeUsers.toLocaleString()}</div>
            <div className="metric-trend positive">+8.2% vs last week</div>
          </div>
          <div className="metric-card">
            <h4>Events Status</h4>
            <div className="event-status">
              <div className="status-item">
                <span className="status-dot live"></span>
                <span>Live: {mockData.stats.eventsLive}</span>
              </div>
              <div className="status-item">
                <span className="status-dot upcoming"></span>
                <span>Upcoming: {mockData.stats.eventsUpcoming}</span>
              </div>
              <div className="status-item">
                <span className="status-dot closed"></span>
                <span>Closed: {mockData.stats.eventsClosed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the analytics content remains the same */}
      {/* Geographical Insights */}
      <div className="analytics-category">
        <h3>Geographical Insights</h3>
        <div className="analytics-grid">
          <div className="geo-card">
            <h4>Top Colleges by Participation</h4>
            <div className="college-list">
              {mockData.analytics.topColleges.map((college, index) => (
                <div key={index} className="college-item">
                  <span className="college-rank">#{index + 1}</span>
                  <span className="college-name">{college.name}</span>
                  <span className="college-count">{college.participants}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="geo-card">
            <h4>User Distribution Heatmap</h4>
            <div className="heatmap-placeholder">
              <div className="region" style={{ background: "#8b5cf6" }}>
                US: 45%
              </div>
              <div className="region" style={{ background: "#a78bfa" }}>
                EU: 30%
              </div>
              <div className="region" style={{ background: "#c4b5fd" }}>
                Asia: 25%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Performance */}
      <div className="analytics-category">
        <h3>Event Performance Analytics</h3>
        <div className="performance-table">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Registrations</th>
                <th>Completion Rate</th>
                <th>Avg. Time Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.analytics.eventPerformance.map((event, index) => (
                <tr key={index}>
                  <td>{event.event}</td>
                  <td>{event.registrations}</td>
                  <td>
                    <div className="completion-bar">
                      <div className="completion-fill" style={{ width: `${event.completion}%` }}></div>
                      <span>{event.completion}%</span>
                    </div>
                  </td>
                  <td>{event.avgTime}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => showNotification(`Viewing details for ${event.event}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="users-section">
      <div className="section-header">
        <div>
          <h2>User Management</h2>
          <p>Manage students, providers, and user permissions</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={exportData}>
            <Icons.Download /> Export Users
          </button>
          <button className="btn btn-primary" onClick={() => showNotification("Add user functionality coming soon!")}>
            <Icons.Plus /> Add User
          </button>
        </div>
      </div>
      <div className="users-content">
        <div className="users-header">
          <h3>Students ({filteredData.users.filter((u) => u.role === "student").length})</h3>
          <div className="users-filters">
            <select className="filter-select">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Events Attended</th>
                <th>Last Activity</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="user-avatar" />
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                        <div className="user-joined">Joined {user.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="events-count">
                      <strong>{user.eventsAttended}</strong>
                      <span>events</span>
                    </div>
                  </td>
                  <td>{user.lastActivity}</td>
                  <td>
                    <div className="location">
                      <Icons.MapPin />
                      {user.location}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>{user.status}</span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => showNotification(`Viewing details for ${user.name}`)}>
                      <Icons.MoreHorizontal />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderFeedback = () => (
    <div className="feedback-section">
      <div className="section-header">
        <div>
          <h2>Feedback & Moderation</h2>
          <p>Review user feedback and moderate flagged content</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => showNotification("Analytics report generated!")}>
            <Icons.BarChart /> Analytics Report
          </button>
          <button className="btn btn-primary" onClick={() => showNotification("Bulk actions applied!")}>
            <Icons.Filter /> Bulk Actions
          </button>
        </div>
      </div>
      <div className="feedback-content">
        <div className="feedback-header">
          <h3>Reviews & Feedback ({filteredData.feedback.length})</h3>
          <div className="feedback-filters">
            <select className="filter-select">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Flagged</option>
            </select>
            <select className="filter-select">
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Star</option>
            </select>
          </div>
        </div>
        <div className="feedback-list">
          {filteredData.feedback.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              <div className="feedback-user">
                <img
                  src={feedback.user.avatar || "/placeholder.svg"}
                  alt={feedback.user.name}
                  className="user-avatar"
                />
                <div className="feedback-info">
                  <div className="user-name">{feedback.user.name}</div>
                  <div className="event-name">
                    {feedback.event} by {feedback.provider}
                  </div>
                </div>
                <div className="feedback-rating">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className={i < feedback.rating ? "star-filled" : "star-empty"} />
                  ))}
                  <span className="rating-text">{feedback.rating}/5</span>
                  <span className="feedback-date">{feedback.date}</span>
                </div>
              </div>
              <div className="feedback-comment">{feedback.comment}</div>
              <div className="feedback-actions">
                <span className={`status-badge ${feedback.status}`}>{feedback.status}</span>
                <span className="helpful-count">{feedback.helpfulCount} people found this helpful</span>
                <button
                  className="action-btn"
                  onClick={() => showNotification(`Viewing details for feedback from ${feedback.user.name}`)}
                >
                  <Icons.MoreHorizontal />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="events-section">
      <div className="section-header">
        <h2>Event Management</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={exportData}>
            <Icons.Download /> Export Data
          </button>
        </div>
      </div>
      <div className="events-table">
        <table>
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Provider</th>
              <th>Type</th>
              <th>Status</th>
              <th>Registrations</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.events.map((event) => (
              <tr key={event.id}>
                <td>
                  <div className="event-title">
                    <strong>{event.title}</strong>
                    <span className="event-price">{event.price}</span>
                  </div>
                </td>
                <td>{event.provider}</td>
                <td>
                  <span className={`badge badge-${event.type}`}>{event.type}</span>
                </td>
                <td>
                  <span className={`status-badge ${event.status}`}>{event.status}</span>
                </td>
                <td>{event.registrations}</td>
                <td>{event.eventDate}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => showNotification(`Viewing details for ${event.title}`)}>
                    <Icons.Eye /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPartners = () => (
    <div className="partners-section">
      <div className="section-header">
        <h2>Partner Collaboration</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => showNotification("Partner analytics exported!")}>
            <Icons.Download /> Export Partner Data
          </button>
        </div>
      </div>
      <div className="partners-grid-3d">
        {mockData.partners.map((partner) => (
          <div key={partner.id} className="partner-card-3d">
            <div className="partner-card-front">
              <div className="partner-tier">{partner.tier}</div>
              <div className="partner-logo">
                <img src={partner.logo || "/placeholder.svg"} alt={partner.name} />
              </div>
              <h4>{partner.name}</h4>
              <p className="partner-category">{partner.category}</p>
              <div className="partner-stats-preview">
                <div className="stat-preview">
                  <span className="stat-value">${partner.adRevenue.toLocaleString()}</span>
                  <span className="stat-label">Revenue</span>
                </div>
                <div className="stat-preview">
                  <span className="stat-value">{partner.activeEvents}</span>
                  <span className="stat-label">Events</span>
                </div>
              </div>
              <div className="partner-performance">
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: `${partner.performance}%` }}></div>
                </div>
                <span>{partner.performance}% Performance</span>
              </div>
            </div>

            <div className="partner-card-back">
              <div className="partner-details">
                <h5>Partnership Details</h5>
                <div className="detail-item">
                  <Icons.Users />
                  <span>{partner.employees} employees</span>
                </div>
                <div className="detail-item">
                  <Icons.MapPin />
                  <span>{partner.headquarters}</span>
                </div>
                <div className="detail-item">
                  <Icons.Calendar />
                  <span>Joined {partner.joinDate}</span>
                </div>
                <div className="detail-item">
                  <span className="website">{partner.website}</span>
                </div>
                <div className="contact-info">
                  <span className="contact-email">{partner.contactEmail}</span>
                </div>
                <div className="partner-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => showNotification(`Managing ${partner.name} partnership`)}
                  >
                    Manage Partnership
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => showNotification(`Viewing ${partner.name} analytics`)}
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const [announcementData, setAnnouncementData] = useState({
    title: "",
    message: "",
    audience: "all",
    priority: "normal",
  })

  // const [subject, setSubject] = useState('');
  // const [message, setMessage] = useState('');
  // const [jwt, setJwt] = useState('');     // Store your JWT token for authorization
  // const [feedback, setFeedback] = useState('');

  const handleSendAnnouncement = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/announcement/send",
      {
        subject: announcementData.title,
        message: announcementData.message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showNotification(`✅ ${response.data.message}`);
    setAnnouncementData({ title: "", message: "", audience: "all", priority: "normal" });
  } catch (error) {
    console.error("Failed to send announcement:", error);
    showNotification(`❌ ${error.response?.data?.message || error.message}`);
  }
};
  


  const renderAnnouncements = () => (
    <div className="announcements-page">
      <div className="announcement-container">
        <div className="announcement-header">
          <h1>Create Announcement</h1>
          <p>Send notifications to your users</p>
        </div>
        <div className="announcement-form-container">
          <div className="announcement-form">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="title">Announcement Title</label>
                <input
        type="text"
        placeholder="Announcement Title"
        value={announcementData.title}
        onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
      />

              </div>
              <div className="form-group">
                <label htmlFor="message">Message Content</label>
                <textarea
        placeholder="Announcement Message"
        value={announcementData.message}
        onChange={(e) => setAnnouncementData({ ...announcementData, message: e.target.value })}
      />

              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="audience">Target Audience</label>
                  <select
                    id="audience"
                    value={announcementData.audience}
                    onChange={(e) => setAnnouncementData({ ...announcementData, audience: e.target.value })}
                  >
                    <option value="all">All Users</option>
                    <option value="students">Students Only</option>
                    <option value="providers">Providers Only</option>
                    <option value="premium">Premium Users</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority Level</label>
                  <select
                    id="priority"
                    value={announcementData.priority}
                    onChange={(e) => setAnnouncementData({ ...announcementData, priority: e.target.value })}
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSendAnnouncement}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        </svg>
        Send Announcement
      </button>
                <button className="btn btn-secondary" onClick={() => showNotification("Draft saved successfully!")}>
                  Save Draft
                </button>
              </div>
            </div>
          </div>
          <div className="announcement-preview">
            <div className="preview-header">
              <h3>Preview</h3>
            </div>

            <div className="preview-content">
              <div className="notification-preview">
                <div className="notification-header">
                  <Icons.Bell />
                  <span>Announcement</span>
                </div>
                <div className="notification-body">
                  <h4>{announcementData.title || "Your announcement title will appear here"}</h4>
                  <p>{announcementData.message || "Your message content will be displayed here..."}</p>
                </div>
              </div>
            </div>
            <div className="announcement-stats">
              <h4>Announcement Stats</h4>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-number">1,247</span>
                  <span className="stat-label">Total Recipients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">89%</span>
                  <span className="stat-label">Open Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard()
      case "events":
        return renderEvents()
      case "users":
        return renderUsers()
      case "feedback":
        return renderFeedback()
      case "partners":
        return renderPartners()
      case "analytics":
        return renderAnalytics()
      case "announcements":
        return renderAnnouncements()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="enhanced-admin-dashboard">
      {/* Notifications */}
      <div className="notifications">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification notification-${notification.type}`}>
            {notification.message}
          </div>
        ))}
      </div>

      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-left">
          <div className="logo-section">
            <div className="logo-icon">
              <Icons.BarChart />
            </div>
            <div className="logo-text">
              <h1>EventsAdmin</h1>
              <span>Management Portal</span>
            </div>
          </div>
          <div className="search-container">
            <Icons.Search />
            <input
              type="search"
              placeholder="Search events, users, providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="navbar-right">
          <button className="nav-btn">
            <Icons.Bell />
            <span className="notification-badge">3</span>
          </button>
          <button className="nav-btn">
            <Icons.Settings />
          </button>
          <div className="user-menu" onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <div className="user-info">
              <div className="user-avatar">AD</div>
              <div className="user-details">
                <span className="user-name">{user.fullname}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
            <Icons.ChevronDown />
            {updatedUserDropdown()}
          </div>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        {[
          { key: "dashboard", label: "Dashboard", icon: Icons.BarChart },
          { key: "events", label: "Events", icon: Icons.Calendar },
          { key: "users", label: "Users", icon: Icons.Users },
          { key: "feedback", label: "Feedback", icon: Icons.MessageSquare },
          { key: "partners", label: "Partners", icon: Icons.Handshake },
          { key: "analytics", label: "Analytics", icon: Icons.TrendingUp },
          { key: "announcements", label: "Announcements", icon: Icons.Bell },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`nav-tab ${activeSection === tab.key ? "active" : ""}`}
            onClick={() => setActiveSection(tab.key)}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="main-content">{renderContent()}</main>
      {renderProfileModal()}
    </div>
  )
}

export default EnhancedAdminDashboard
