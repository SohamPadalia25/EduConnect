"use client"

import { useState, useEffect } from "react"
import "./student.css"
import { useAuth } from '../context/AuthContext'; // adjust the path
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import API from '../services/api.jsx'; 
import AIAssistant from "./Ai.jsx";
const StudentView = () => {
  // State management
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogout = () => {
    logout(); // clears localStorage + context
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/'); // go to home/login page
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile((prev) => ({
        ...prev,
        name: parsedUser.fullname || "",
        email: parsedUser.email || "",
      }));
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
    }
  }
}, []);

  const [currentPage, setCurrentPage] = useState("home")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [savedEvents, setSavedEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    date: "all",
    tags: "all",
    pricing: "all",
    location: "all",
  })
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showAttendForm, setShowAttendForm] = useState(false)
  const [showTicket, setShowTicket] = useState(false)
  const [attendeeInfo, setAttendeeInfo] = useState({})
  const [notification, setNotification] = useState("")
  const [coins, setCoins] = useState(150)
  const [attendedEvents, setAttendedEvents] = useState(12)
  const [completedCourses, setCompletedCourses] = useState(8)
  const [competitionsParticipated, setCompetitionsParticipated] = useState(3)
  const [hoursSpent, setHoursSpent] = useState(45)
  const [averageSessionTime, setAverageSessionTime] = useState(2.5)

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "",
    year: "3rd Year",
    interests: ["React", "AI", "Design"],
    email: "",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
  })

  // Quiz game state
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [currentQuestionSet, setCurrentQuestionSet] = useState([])

  // Expanded quiz questions with categories
  const allQuizQuestions = [
    // Programming Fundamentals
    {
      question: "What is React primarily used for?",
      options: ["Backend development", "Frontend UI development", "Database management", "Server configuration"],
      correct: 1,
      category: "React",
    },
    {
      question: "Which of these is a JavaScript framework?",
      options: ["Python", "Vue.js", "CSS", "HTML"],
      correct: 1,
      category: "JavaScript",
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Automated Program Interaction",
        "Application Process Integration",
      ],
      correct: 0,
      category: "General",
    },
    {
      question: "Which is NOT a programming language?",
      options: ["JavaScript", "Python", "Photoshop", "Java"],
      correct: 2,
      category: "General",
    },
    {
      question: "What is the purpose of CSS?",
      options: ["Database queries", "Styling web pages", "Server logic", "File management"],
      correct: 1,
      category: "Web Development",
    },
    // Advanced Programming
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A way to close browser windows",
        "A function with access to outer scope variables",
        "A method to end loops",
        "A CSS property",
      ],
      correct: 1,
      category: "JavaScript",
    },
    {
      question: "Which HTTP method is used to update existing data?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correct: 2,
      category: "Web Development",
    },
    {
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Simple Question Logic", "System Quality Level", "Standard Query Library"],
      correct: 0,
      category: "Database",
    },
    {
      question: "Which data structure follows LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1,
      category: "Data Structures",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
      category: "Algorithms",
    },
    // AI & Machine Learning
    {
      question: "What is supervised learning?",
      options: [
        "Learning without labeled data",
        "Learning with labeled training data",
        "Learning through trial and error",
        "Learning from user feedback",
      ],
      correct: 1,
      category: "AI/ML",
    },
    {
      question: "Which is a popular Python library for machine learning?",
      options: ["React", "Angular", "Scikit-learn", "jQuery"],
      correct: 2,
      category: "AI/ML",
    },
    {
      question: "What does GPU stand for?",
      options: [
        "General Processing Unit",
        "Graphics Processing Unit",
        "Global Processing Unit",
        "Guided Processing Unit",
      ],
      correct: 1,
      category: "Hardware",
    },
    // Design & UX
    {
      question: "What does UX stand for?",
      options: ["User Experience", "User Extension", "Universal Exchange", "Unified Experience"],
      correct: 0,
      category: "Design",
    },
    {
      question: "Which color model is used for digital displays?",
      options: ["CMYK", "RGB", "HSV", "LAB"],
      correct: 1,
      category: "Design",
    },
    // Additional Questions
    {
      question: "What is version control used for?",
      options: [
        "Controlling software versions",
        "Managing code changes and collaboration",
        "Versioning documents",
        "Controlling user access",
      ],
      correct: 1,
      category: "Development Tools",
    },
    {
      question: "Which is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      correct: 2,
      category: "Database",
    },
    {
      question: "What is responsive design?",
      options: [
        "Fast loading websites",
        "Websites that respond to user input",
        "Design that adapts to different screen sizes",
        "Interactive website elements",
      ],
      correct: 2,
      category: "Web Development",
    },
    {
      question: "What is the main purpose of Docker?",
      options: ["Code editing", "Containerization", "Database management", "UI design"],
      correct: 1,
      category: "DevOps",
    },
    {
      question: "Which is a cloud computing platform?",
      options: ["Photoshop", "AWS", "Microsoft Word", "Chrome"],
      correct: 1,
      category: "Cloud Computing",
    },
  ]

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setEvents(res.data.data);
        console.log(res.data) // ApiResponse wrapper
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  // Sample events data
  // const [events] = useState([
  //   {
  //     id: 1,
  //     title: "Advanced React Development",
  //     description:
  //       "Master advanced React concepts including hooks, context, and performance optimization. Learn from industry experts and build real-world projects.",
  //     type: "course",
  //     provider: "TechEdu Academy",
  //     tags: ["React", "JavaScript", "Frontend"],
  //     date: "2024-02-15",
  //     time: "10:00 AM",
  //     pricing: "paid",
  //     price: "$299",
  //     location: "online",
  //     image: "/placeholder.svg?height=200&width=300&text=React+Course",
  //     rating: 4.8,
  //     reviews: 156,
  //     duration: "8 weeks",
  //   },
  //   {
  //     id: 2,
  //     title: "AI & Machine Learning Fundamentals",
  //     description:
  //       "Introduction to artificial intelligence and machine learning concepts. Hands-on experience with Python and popular ML libraries.",
  //     type: "webinar",
  //     provider: "AI Institute",
  //     tags: ["AI", "Machine Learning", "Python"],
  //     date: "2024-02-20",
  //     time: "2:00 PM",
  //     pricing: "free",
  //     price: "Free",
  //     location: "online",
  //     image: "/placeholder.svg?height=200&width=300&text=AI+ML+Course",
  //     rating: 4.6,
  //     reviews: 89,
  //     duration: "2 hours",
  //   },
  //   {
  //     id: 3,
  //     title: "Digital Marketing Strategies",
  //     description:
  //       "Learn effective digital marketing strategies for modern businesses. Cover SEO, social media, content marketing, and analytics.",
  //     type: "seminar",
  //     provider: "Marketing Pro",
  //     tags: ["Marketing", "SEO", "Social Media"],
  //     date: "2024-02-25",
  //     time: "9:00 AM",
  //     pricing: "paid",
  //     price: "$149",
  //     location: "offline",
  //     venue: "Business Center, NYC",
  //     image: "/placeholder.svg?height=200&width=300&text=Marketing+Course",
  //     rating: 4.7,
  //     reviews: 203,
  //     duration: "1 day",
  //   },
  //   {
  //     id: 4,
  //     title: "UX/UI Design Workshop",
  //     description:
  //       "Hands-on workshop covering user experience and interface design principles. Create stunning designs using industry-standard tools.",
  //     type: "workshop",
  //     provider: "Design Studio",
  //     tags: ["Design", "UX", "UI"],
  //     date: "2024-03-01",
  //     time: "11:00 AM",
  //     pricing: "paid",
  //     price: "$199",
  //     location: "offline",
  //     venue: "Creative Hub, LA",
  //     image: "/placeholder.svg?height=200&width=300&text=UX+UI+Design",
  //     rating: 4.9,
  //     reviews: 127,
  //     duration: "2 days",
  //   },
  //   {
  //     id: 5,
  //     title: "Blockchain Technology Basics",
  //     description:
  //       "Understanding blockchain technology, cryptocurrencies, and decentralized applications. Perfect for beginners.",
  //     type: "course",
  //     provider: "Crypto Academy",
  //     tags: ["Blockchain", "Cryptocurrency", "Technology"],
  //     date: "2024-03-05",
  //     time: "3:00 PM",
  //     pricing: "free",
  //     price: "Free",
  //     location: "online",
  //     image: "/placeholder.svg?height=200&width=300&text=Blockchain+Course",
  //     rating: 4.5,
  //     reviews: 94,
  //     duration: "4 weeks",
  //   },
  //   {
  //     id: 6,
  //     title: "Data Science with Python",
  //     description:
  //       "Comprehensive data science course covering Python, pandas, numpy, and data visualization techniques.",
  //     type: "course",
  //     provider: "DataLearn",
  //     tags: ["Data Science", "Python", "Analytics"],
  //     date: "2024-03-10",
  //     time: "1:00 PM",
  //     pricing: "paid",
  //     price: "$399",
  //     location: "online",
  //     image: "/placeholder.svg?height=200&width=300&text=Data+Science",
  //     rating: 4.8,
  //     reviews: 178,
  //     duration: "12 weeks",
  //   },
  // ])

  // Analytics data
  const weeklyData = [
    { week: "Week 1", events: 2, courses: 1, hours: 8 },
    { week: "Week 2", events: 3, courses: 2, hours: 12 },
    { week: "Week 3", events: 1, courses: 1, hours: 6 },
    { week: "Week 4", events: 4, courses: 3, hours: 15 },
    { week: "Week 5", events: 2, courses: 1, hours: 9 },
  ]

  const monthlyData = [
    { month: "Jan", events: 8, courses: 2 },
    { month: "Feb", events: 12, courses: 3 },
    { month: "Mar", events: 6, courses: 1 },
    { month: "Apr", events: 15, courses: 4 },
    { month: "May", events: 10, courses: 2 },
    { month: "Jun", events: 18, courses: 5 },
  ]

  const timeOfDayData = [
    { hour: "6AM", activity: 5 },
    { hour: "9AM", activity: 25 },
    { hour: "12PM", activity: 40 },
    { hour: "3PM", activity: 60 },
    { hour: "6PM", activity: 80 },
    { hour: "9PM", activity: 45 },
    { hour: "12AM", activity: 10 },
  ]

  const milestones = [
    { date: "2024-01-15", title: "Joined StudyHub", description: "Welcome to the platform!", type: "join" },
    { date: "2024-01-20", title: "First Event Attended", description: "React Fundamentals Workshop", type: "event" },
    { date: "2024-02-01", title: "First Course Completed", description: "JavaScript Basics", type: "course" },
    { date: "2024-02-15", title: "5-Day Learning Streak", description: "Consistent daily learning", type: "streak" },
    { date: "2024-03-01", title: "100 Coins Earned", description: "Quiz master achievement", type: "coins" },
    { date: "2024-03-10", title: "5 Courses Completed", description: "Learning champion status", type: "course" },
  ]

  // Notification system
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(""), 3000)
  }

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filters.type === "all" || event.type === filters.type
    const matchesPricing = filters.pricing === "all" || event.pricing === filters.pricing
    const matchesLocation = filters.location === "all" || event.location === filters.location
    const matchesTags =
      filters.tags === "all" || event.tags.some((tag) => tag.toLowerCase().includes(filters.tags.toLowerCase()))

    return matchesSearch && matchesType && matchesPricing && matchesLocation && matchesTags
  })

  // Get personalized recommendations
  const getRecommendations = () => {
    return events
      .filter((event) =>
        event.tags.some((tag) =>
          userProfile.interests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())),
        ),
      )
      .slice(0, 3)
  }

  // Save/unsave events
  const toggleSaveEvent = (eventId) => {
    setSavedEvents((prev) => {
      if (prev.includes(eventId)) {
        showNotification("Event removed from saved!")
        return prev.filter((id) => id !== eventId)
      } else {
        showNotification("Event saved successfully!")
        return [...prev, eventId]
      }
    })
  }

  // Handle attend event
  const handleAttendEvent = (formData) => {
    setAttendeeInfo(formData)
    setShowAttendForm(false)
    setShowTicket(true)
    setAttendedEvents((prev) => prev + 1)
    showNotification("Attendance Confirmed!")
  }

  // Quiz game functions
  const getRandomQuestions = () => {
    const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 5)
  }

  const startQuiz = () => {
    const newQuestionSet = getRandomQuestions()
    setCurrentQuestionSet(newQuestionSet)
    setGameActive(true)
    setCurrentQuiz(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(10)
  }

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === currentQuestionSet[currentQuiz].correct) {
      setScore((prev) => prev + 1)
      setCoins((prev) => prev + 10)
    }

    setShowResult(true)
    setTimeout(() => {
      if (currentQuiz < currentQuestionSet.length - 1) {
        setCurrentQuiz((prev) => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(10)
      } else {
        setGameActive(false)
        showNotification(`Quiz completed! You earned ${score * 10} coins!`)
      }
    }, 1500)
  }

  // Timer effect for quiz
  useEffect(() => {
    let timer
    if (gameActive && timeLeft > 0 && !showResult && autoAdvance) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (gameActive && timeLeft === 0 && !showResult && autoAdvance) {
      // Auto-submit when time runs out
      if (selectedAnswer !== null) {
        submitAnswer()
      } else {
        // Move to next question without scoring
        setShowResult(true)
        setTimeout(() => {
          if (currentQuiz < currentQuestionSet.length - 1) {
            setCurrentQuiz((prev) => prev + 1)
            setSelectedAnswer(null)
            setShowResult(false)
            setTimeLeft(10)
          } else {
            setGameActive(false)
            showNotification(`Quiz completed! You earned ${score * 10} coins!`)
          }
        }, 1500)
      }
    }
    return () => clearTimeout(timer)
  }, [gameActive, timeLeft, showResult, autoAdvance, selectedAnswer, currentQuiz, currentQuestionSet.length, score])

  // Navigation Component
  const Navigation = () => (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>EduConnect</h2>
        </div>
        <ul className="nav-menu">
          <li className={currentPage === "home" ? "active" : ""}>
            <button onClick={() => setCurrentPage("home")}>Home</button>
          </li>
          <li className={currentPage === "events" ? "active" : ""}>
            <button onClick={() => setCurrentPage("events")}>Events</button>
          </li>
          <li className={currentPage === "saved" ? "active" : ""}>
            <button onClick={() => setCurrentPage("saved")}>Saved</button>
          </li>
          <li className={currentPage === "courses" ? "active" : ""}>
            <button onClick={() => setCurrentPage("courses")}>Courses</button>
          </li>
          <li className={currentPage === "analytics" ? "active" : ""}>
            <button onClick={() => setCurrentPage("analytics")}>Analytics</button>
          </li>
          <li className={currentPage === "game" ? "active" : ""}>
            <button onClick={() => setCurrentPage("game")}>Game</button>
          </li>
          <li className={currentPage === "contact" ? "active" : ""}>
            <button onClick={() => setCurrentPage("contact")}>Contact</button>
          </li>
          <li className={currentPage === "ai" ? "active" : ""}>
            <button onClick={() => setCurrentPage("ai")}>AI </button>
          </li>
          
        </ul>
        <div className="nav-right">
          <div className="coin-wallet">
            <div className="coin-display">
              <span className="coin-icon">🪙</span>
              <span className="coin-count">{coins}</span>
            </div>
          </div>
          <div className="nav-notifications">
            <button className="notification-bell-modern" onClick={() => setShowNotifications(!showNotifications)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7C13 10.76 15.24 13 19 13V15H5V13C8.76 13 11 10.76 11 7V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2ZM21 19V21H3V19H21ZM12 22C10.9 22 10 21.1 10 20H14C14 21.1 13.1 22 12 22Z"
                  fill="currentColor"
                />
              </svg>
              <span className="notification-badge-modern">4</span>
            </button>
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notification-item">New course available: Advanced React</div>
                <div className="notification-item">Reminder: AI Webinar tomorrow</div>
                <div className="notification-item">Early bird discount on UX Workshop</div>
                <div className="notification-item">New event: Design Sprint Workshop</div>
              </div>
            )}
          </div>
          <div className="user-profile">
            <button className="profile-button" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {showProfileDropdown && <ProfileDropdown />}
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )

  // Profile Dropdown Component
  const ProfileDropdown = () => {
    const [editMode, setEditMode] = useState(false)
    const [tempProfile, setTempProfile] = useState(userProfile)

    const saveProfile = () => {
      setUserProfile(tempProfile)
      setEditMode(false)
      showNotification("Profile updated successfully!")
    }

    const recommendations = getRecommendations()

    return (
      <div className="profile-dropdown">
        <div className="profile-header">
          <img src={userProfile.avatar || "/placeholder.svg"} alt="Profile" className="profile-avatar" />
          <div className="profile-info">
            {editMode ? (
              <input
                type="text"
                value={tempProfile.name}
                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                className="profile-edit-input"
              />
            ) : (
              <h3>{userProfile.name}</h3>
            )}
            {editMode ? (
              <input
                type="text"
                value={tempProfile.year}
                onChange={(e) => setTempProfile({ ...tempProfile, year: e.target.value })}
                className="profile-edit-input"
              />
            ) : (
              <p>{userProfile.year}</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h4>Interests</h4>
          {editMode ? (
            <input
              type="text"
              value={tempProfile.interests.join(", ")}
              onChange={(e) => setTempProfile({ ...tempProfile, interests: e.target.value.split(", ") })}
              className="profile-edit-input"
              placeholder="Separate with commas"
            />
          ) : (
            <div className="interests-tags">
              {userProfile.interests.map((interest, index) => (
                <span key={index} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="profile-section">
          <h4>Recommended for You</h4>
          <div className="recommendations">
            {recommendations.map((item) => (
              <div key={item.id} className="recommendation-item" onClick={() => setSelectedEvent(item)}>
                <span className="rec-title">{item.title}</span>
                <span className="rec-type">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-actions">
          {editMode ? (
            <>
              <button onClick={saveProfile} className="save-btn">
                Save
              </button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="edit-btn">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  }

  // Home Page Component
  const HomePage = () => (
    <div className="home-page">
      <div className="home-container">
        <h1 className="text-black header">Welcome {userProfile.name} to Educonnect</h1>
        <section className="hero-section-new">
          
          <div className="hero-3d-background">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="floating-shape shape-4"></div>
            <div className="floating-shape shape-5"></div>
          </div>
         
          <div className="hero-content-new">
            <div className="hero-text">
              <h1 className="hero-title-new">
                Unlock Your <span className="gradient-text-new">Potential Today</span>
              </h1>
              <p className="hero-subtitle-new">
                Join thousands of students in their learning journey with expert-led courses, exciting events, and
                networking opportunities.
              </p>

              <div className="stats-container">
                <div className="stat-item">
                  <h3>50K+</h3>
                  <p>Active Students</p>
                </div>
                <div className="stat-item">
                  <h3>1K+</h3>
                  <p>Expert Courses</p>
                </div>
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Events</p>
                </div>
              </div>

              <div className="hero-buttons">
                <button className="explore-button" onClick={() => setCurrentPage("events")}>
                  Explore Events
                </button>
                <button className="courses-button" onClick={() => setCurrentPage("courses")}>
                  View Courses
                </button>
              </div>
            </div>

            <div className="hero-cards">
              <div className="hero-card learn-card">
                <div className="card-icon-box">
                  <div className="icon-placeholder">LEARN</div>
                </div>
                <h3>Learn</h3>
                <p>Expert-led courses</p>
              </div>
              <div className="hero-card grow-card">
                <div className="card-icon-box">
                  <div className="icon-placeholder">GROW</div>
                </div>
                <h3>Grow</h3>
                <p>Skill development</p>
              </div>
              <div className="hero-card network-card">
                <div className="card-icon-box">
                  <div className="icon-placeholder">NETWORK</div>
                </div>
                <h3>Network</h3>
                <p>Connect & collaborate</p>
              </div>
            </div>
          </div>
        </section>

        <div className="home-content">
          <div className="main-content">
            <section className="courses-section">
              <div className="section-header">
                <h2>Featured Courses</h2>
                <button className="view-all-btn" onClick={() => setCurrentPage("courses")}>
                  View All Courses →
                </button>
              </div>
              <div className="content-grid">
                {events
                  .filter((event) => event.type === "course")
                  .slice(0, 4)
                  .map((course) => (
                    <div key={course.id} className="content-card" onClick={() => setSelectedEvent(course)}>
                      <div className="card-image">
                        <div className="image-placeholder">
                          <img src={course.image} alt="Course" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="card-type-badge">Course</div>
                      </div>
                      <div className="card-content">
                        <h3>{course.title}</h3>
                        <p className="card-provider">by {course.provider}</p>
                        <p className="card-description">{course.description}</p>
                        <div className="card-meta">
                          <span className="duration">Duration: {course.duration}</span>
                          <span className="rating">Rating: {course.rating}</span>
                          <span className={`price ${course.pricing}`}>{course.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            <section className="events-section">
              <div className="section-header">
                <h2>Upcoming Events</h2>
                <button className="view-all-btn" onClick={() => setCurrentPage("events")}>
                  View All Events →
                </button>
              </div>
              <div className="content-grid">
                {events
                  .filter((event) => event.type !== "course")
                  .slice(0, 4)
                  .map((event) => (
                    <div key={event.id} className="content-card" onClick={() => setSelectedEvent(event)}>
                      <div className="card-image">
                        <div className="image-placeholder">
                          <img src={event.image} alt="Course" style={{ width: "100%", height: "auto" }} />

                        </div>
                        <div className="card-type-badge">{event.type}</div>
                      </div>
                      <div className="card-content">
                        <h3>{event.title}</h3>
                        <p className="card-provider">by {event.provider}</p>
                        <p className="card-description">{event.description}</p>
                        <div className="card-meta">
                          <span className="date">Date: {event.date}</span>
                          <span className="time">Time: {event.time}</span>
                          <span className={`price ${event.pricing}`}>{event.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          <div className="calendar-sidebar">
            <div className="calendar-container">
              <div className="calendar-header">
                <h3>July 2025</h3>
                <div className="calendar-nav">
                  <button>←</button>
                  <button>→</button>
                </div>
              </div>

              <div className="calendar-grid">
                <div className="calendar-days">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="day-header">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="calendar-dates">
                  {Array.from({ length: 31 }, (_, i) => (
                    <div key={i + 1} className={`calendar-date ${i + 1 === 19 ? "today" : ""}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="this-week">
                <div className="week-header">
                  <h4>This Week</h4>
                  <button className="add-event-btn">+</button>
                </div>
                <div className="week-content">
                  <p className="no-events">No upcoming events this week</p>
                </div>
              </div>

              <button className="view-all-events-btn">View All Events</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Enhanced Analytics Page Component
  const AnalyticsPage = () => (
    <div className="analytics-page">
      <div className="container">
        <div className="analytics-header">
          <h1>Your Learning Analytics</h1>
          <p className="analytics-subtitle">Track your progress and discover insights about your learning journey</p>
        </div>

        {/* Core Statistics */}
        <div className="stats-overview">
          <div className="stat-card primary">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Events Attended</h3>
              <div className="stat-number">{attendedEvents}</div>
              <p className="stat-change positive">+3 this month</p>
            </div>
          </div>
          <div className="stat-card secondary">
            <div className="stat-icon">🎓</div>
            <div className="stat-content">
              <h3>Courses Completed</h3>
              <div className="stat-number">{completedCourses}</div>
              <p className="stat-change positive">+2 this month</p>
            </div>
          </div>
          <div className="stat-card accent">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>Competitions</h3>
              <div className="stat-number">{competitionsParticipated}</div>
              <p className="stat-change neutral">Same as last month</p>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>Hours Spent</h3>
              <div className="stat-number">{hoursSpent}h</div>
              <p className="stat-change positive">+12h this month</p>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">🔖</div>
            <div className="stat-content">
              <h3>Events Bookmarked</h3>
              <div className="stat-number">{savedEvents.length}</div>
              <p className="stat-change positive">+{savedEvents.length} total</p>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Avg Session Time</h3>
              <div className="stat-number">{averageSessionTime}h</div>
              <p className="stat-change positive">+0.5h improvement</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Weekly Activity Chart */}
          <div className="chart-container large">
            <div className="chart-header">
              <h3>Weekly Activity Overview</h3>
              <p>Events attended and hours spent learning</p>
            </div>
            <div className="line-chart">
              <div className="chart-y-axis">
                <span>20</span>
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </div>
              <div className="chart-content">
                {weeklyData.map((week, index) => (
                  <div key={index} className="chart-column">
                    <div className="chart-bars">
                      <div
                        className="chart-bar events"
                        style={{ height: `${(week.events / 4) * 100}%` }}
                        title={`${week.events} events`}
                      ></div>
                      <div
                        className="chart-bar hours"
                        style={{ height: `${(week.hours / 15) * 100}%` }}
                        title={`${week.hours} hours`}
                      ></div>
                    </div>
                    <span className="chart-label">{week.week}</span>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color events"></div>
                  <span>Events</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color hours"></div>
                  <span>Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="chart-container medium">
            <div className="chart-header">
              <h3>Monthly Trends</h3>
              <p>6-month learning progress</p>
            </div>
            <div className="area-chart">
              {monthlyData.map((month, index) => (
                <div key={index} className="area-column">
                  <div
                    className="area-bar"
                    style={{ height: `${(month.events / 20) * 100}%` }}
                    title={`${month.events} events in ${month.month}`}
                  ></div>
                  <span className="area-label">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time of Day Activity */}
          <div className="chart-container medium">
            <div className="chart-header">
              <h3>Most Active Hours</h3>
              <p>When you learn best</p>
            </div>
            <div className="radial-chart">
              {timeOfDayData.map((time, index) => (
                <div key={index} className="radial-segment">
                  <div
                    className="radial-bar"
                    style={{
                      height: `${time.activity}%`,
                      background: `linear-gradient(45deg, #7c3aed ${time.activity}%, #e5e7eb ${time.activity}%)`,
                    }}
                  ></div>
                  <span className="radial-label">{time.hour}</span>
                </div>
              ))}
            </div>
            <div className="peak-time-insight">
              <strong>Peak Learning Time: 6PM</strong>
              <p>You're most active in the evening</p>
            </div>
          </div>

          {/* Learning Streak Calendar */}
          <div className="chart-container large">
            <div className="chart-header">
              <h3>Learning Activity Heatmap</h3>
              <p>Your daily learning streak (like GitHub contributions)</p>
            </div>
            <div className="heatmap-calendar">
              <div className="heatmap-months">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
              <div className="heatmap-grid">
                {Array.from({ length: 180 }, (_, i) => {
                  const intensity = Math.floor(Math.random() * 5)
                  return <div key={i} className={`heatmap-cell intensity-${intensity}`} title={`Day ${i + 1}`}></div>
                })}
              </div>
              <div className="heatmap-legend">
                <span>Less</span>
                <div className="legend-squares">
                  <div className="legend-square intensity-0"></div>
                  <div className="legend-square intensity-1"></div>
                  <div className="legend-square intensity-2"></div>
                  <div className="legend-square intensity-3"></div>
                  <div className="legend-square intensity-4"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="insights-section">
          <div className="insights-container">
            <div className="insight-card primary">
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h4>Learning Pattern Insight</h4>
                <p>
                  You're most productive on Wednesdays and during evening hours (6-9 PM). Consider scheduling important
                  courses during these peak times.
                </p>
              </div>
            </div>
            <div className="insight-card secondary">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <h4>Goal Recommendation</h4>
                <p>
                  You're 2 courses away from reaching your monthly goal of 10 completed courses. Focus on shorter
                  courses to achieve this milestone.
                </p>
              </div>
            </div>
            <div className="insight-card accent">
              <div className="insight-icon">📈</div>
              <div className="insight-content">
                <h4>Progress Trend</h4>
                <p>
                  Your learning consistency has improved by 40% this month. Keep up the great work with your daily
                  learning streak!
                </p>
              </div>
            </div>
          </div>

          <div className="recommendations-section">
            <h3>Personalized Recommendations</h3>
            <div className="recommendations-grid">
              <div className="recommendation-card">
                <div className="rec-header">
                  <h4>Based on Your Interests</h4>
                  <span className="rec-badge">AI & React</span>
                </div>
                <div className="rec-content">
                  <p>Advanced React with AI Integration</p>
                  <span className="rec-provider">TechEdu Academy</span>
                </div>
                <button className="rec-button">Explore Course</button>
              </div>
              <div className="recommendation-card">
                <div className="rec-header">
                  <h4>Trending in Your Field</h4>
                  <span className="rec-badge">Design</span>
                </div>
                <div className="rec-content">
                  <p>UI/UX Design Masterclass 2024</p>
                  <span className="rec-provider">Design Studio</span>
                </div>
                <button className="rec-button">Join Event</button>
              </div>
              <div className="recommendation-card">
                <div className="rec-header">
                  <h4>Complete Your Learning Path</h4>
                  <span className="rec-badge">JavaScript</span>
                </div>
                <div className="rec-content">
                  <p>Advanced JavaScript Patterns</p>
                  <span className="rec-provider">CodeMaster</span>
                </div>
                <button className="rec-button">Continue Learning</button>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="milestones-section">
          <h3>Your Learning Journey</h3>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${milestone.type}`}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{milestone.date}</div>
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Enhanced Game Mode Page Component
  const GamePage = () => (
    <div className="game-page">
      <div className="container">
        <div className="game-header">
          <div className="game-title-section">
            <h1>Learning Quiz Challenge</h1>
            <p>Test your knowledge across multiple tech domains</p>
          </div>
          <div className="game-stats">
            <div className="stat">
              <span className="stat-label">Your Coins</span>
              <strong className="stat-value">{coins}</strong>
            </div>
            <div className="stat">
              <span className="stat-label">Current Score</span>
              <strong className="stat-value">
                {score}/{currentQuestionSet.length || 5}
              </strong>
            </div>
            <div className="stat">
              <span className="stat-label">Questions Pool</span>
              <strong className="stat-value">{allQuizQuestions.length}</strong>
            </div>
          </div>
        </div>

        {!gameActive ? (
          <div className="game-start">
            <div className="game-info">
              <h2>Ready to Challenge Yourself?</h2>
              <p>
                Test your knowledge with our dynamic quiz system featuring {allQuizQuestions.length} questions across
                multiple categories!
              </p>

              <div className="game-features">
                <div className="feature-grid">
                  <div className="feature-item">
                    <div className="feature-icon">🎯</div>
                    <h4>Dynamic Questions</h4>
                    <p>New questions every game</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">⏱️</div>
                    <h4>Timed Challenge</h4>
                    <p>10 seconds per question</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🏆</div>
                    <h4>Earn Coins</h4>
                    <p>10 coins per correct answer</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">📚</div>
                    <h4>Multiple Categories</h4>
                    <p>Programming, AI, Design & more</p>
                  </div>
                </div>
              </div>

              <div className="game-settings">
                <div className="setting-item">
                  <label className="setting-label">
                    <input type="checkbox" checked={autoAdvance} onChange={(e) => setAutoAdvance(e.target.checked)} />
                    Auto-advance after 10 seconds
                  </label>
                </div>
              </div>

              <div className="game-rules">
                <h3>How to Play:</h3>
                <ul>
                  <li>Answer 5 randomly selected questions</li>
                  <li>Each question has a 10-second timer</li>
                  <li>Earn 10 coins for each correct answer</li>
                  <li>Questions cover programming, AI, design, and general tech topics</li>
                  <li>New questions are selected for each game session</li>
                </ul>
              </div>
            </div>
            <button className="start-game-btn" onClick={startQuiz}>
              Start New Quiz Challenge
            </button>
          </div>
        ) : (
          <div className="quiz-container">
            <div className="quiz-header">
              <div className="quiz-progress">
                <div className="progress-info">
                  <span>
                    Question {currentQuiz + 1} of {currentQuestionSet.length}
                  </span>
                  <span className="category-badge">{currentQuestionSet[currentQuiz]?.category}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${((currentQuiz + 1) / currentQuestionSet.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {autoAdvance && (
                <div className="timer-section">
                  <div className="timer-circle">
                    <div className="timer-text">{timeLeft}</div>
                    <svg className="timer-svg" viewBox="0 0 36 36">
                      <path
                        className="timer-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="timer-progress"
                        strokeDasharray={`${(timeLeft / 10) * 100}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div className="question-card">
              <h2>{currentQuestionSet[currentQuiz]?.question}</h2>
              <div className="options-grid">
                {currentQuestionSet[currentQuiz]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${selectedAnswer === index ? "selected" : ""} ${
                      showResult
                        ? index === currentQuestionSet[currentQuiz].correct
                          ? "correct"
                          : selectedAnswer === index
                            ? "incorrect"
                            : ""
                        : ""
                    }`}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && !showResult && !autoAdvance && (
                <button className="submit-answer-btn" onClick={submitAnswer}>
                  Submit Answer
                </button>
              )}

              {showResult && (
                <div className="result-feedback">
                  {selectedAnswer === currentQuestionSet[currentQuiz].correct ? (
                    <div className="correct-feedback">
                      <div className="feedback-icon">✅</div>
                      <h3>Excellent! +10 coins</h3>
                      <p>You got it right!</p>
                    </div>
                  ) : (
                    <div className="incorrect-feedback">
                      <div className="feedback-icon">❌</div>
                      <h3>Not quite right!</h3>
                      <p>
                        The correct answer was:{" "}
                        <strong>
                          {currentQuestionSet[currentQuiz].options[currentQuestionSet[currentQuiz].correct]}
                        </strong>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Courses Page Component
  const CoursesPage = () => (
    <div className="courses-page">
      <div className="container">
        <div className="page-header">
          <h1>All Courses</h1>
          <div className="search-filter-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="filters">
              <select value={filters.pricing} onChange={(e) => setFilters({ ...filters, pricing: e.target.value })}>
                <option value="all">All Pricing</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents
            .filter((event) => event.type === "course")
            .map((course) => (
              <div key={course.id} className="event-card" onClick={() => setSelectedEvent(course)}>
                <div className="event-image">
                  <div className="image-placeholder">
                    <img src={course.image} alt="Course" style={{ width: "100%", height: "auto" }} />

                  </div>
                  <div className="event-type-badge">Course</div>
                  <button
                    className={`save-button ${savedEvents.includes(course.id) ? "saved" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSaveEvent(course.id)
                    }}
                  >
                    {savedEvents.includes(course.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="event-content">
                  <h3>{course.title}</h3>
                  <p className="event-description">{course.description}</p>
                  <div className="event-meta">
                    <span className="provider">Provider: {course.provider}</span>
                    <span className="duration">Duration: {course.duration}</span>
                  </div>
                  <div className="event-footer">
                    <span className={`price ${course.pricing}`}>{course.price}</span>
                    <div className="rating">
                      Rating: {course.rating} ({course.reviews})
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )

  // Events Page Component
  const EventsPage = () => (
    <div className="events-page">
      <div className="container">
        <div className="events-header">
          <h1>Discover Events</h1>
          <div className="search-filter-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="filters">
              <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="all">All Types</option>
                <option value="course">Courses</option>
                <option value="webinar">Webinars</option>
                <option value="seminar">Seminars</option>
                <option value="workshop">Workshops</option>
              </select>

              <select value={filters.pricing} onChange={(e) => setFilters({ ...filters, pricing: e.target.value })}>
                <option value="all">All Pricing</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>

              <select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
                <option value="all">All Locations</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
              <div className="event-image">
                <div className="image-placeholder">
                  <img src={event.image} alt="Course" style={{ width: "100%", height: "auto" }} />

                </div>
                <div className="event-type-badge">{event.type}</div>
                <button
                  className={`save-button ${savedEvents.includes(event.id) ? "saved" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSaveEvent(event.id)
                  }}
                >
                  {savedEvents.includes(event.id) ? "♥" : "♡"}
                </button>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-meta">
                  <span className="provider">Provider: {event.provider}</span>
                  <span className="date">Date: {event.date}</span>
                  <span className="time">Time: {event.time}</span>
                  <span className="location">{event.location === "online" ? "Online" : event.venue}</span>
                </div>
                <div className="event-tags">
                  {event.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="event-footer">
                  <span className={`price ${event.pricing}`}>{event.price}</span>
                  <div className="rating">
                    Rating: {event.rating} ({event.reviews})
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Event Detail Component
  const EventDetail = () => (
    <div className="event-detail">
      <div className="container">
        <button className="back-button" onClick={() => setSelectedEvent(null)}>
          ← Back to Events
        </button>

        <div className="event-detail-content">
          <div className="event-detail-header">
            <div className="image-placeholder large">
              <img src={selectedEvent.image} alt="Course" style={{ width: "100%", height: "auto" }} />

            </div>
            <div className="event-detail-info">
              <div className="event-type-badge">{selectedEvent.type}</div>
              <h1>{selectedEvent.title}</h1>
              <p className="provider">By {selectedEvent.provider}</p>
              <div className="rating-large">
                Rating: {selectedEvent.rating} ({selectedEvent.reviews} reviews)
              </div>
              <div className="event-meta-large">
                <div className="meta-item">
                  <strong>Date:</strong> {selectedEvent.date}
                </div>
                <div className="meta-item">
                  <strong>Time:</strong> {selectedEvent.time}
                </div>
                <div className="meta-item">
                  <strong>Location:</strong> {selectedEvent.location === "online" ? "Online" : selectedEvent.venue}
                </div>
                <div className="meta-item">
                  <strong>Duration:</strong> {selectedEvent.duration}
                </div>
                <div className="meta-item">
                  <strong>Price:</strong>{" "}
                  <span className={`price ${selectedEvent.pricing}`}>{selectedEvent.price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="event-description-full">
            <h2>About This Event</h2>
            <p>{selectedEvent.description}</p>

            <h3>What You'll Learn</h3>
            <ul>
              <li>Master the fundamentals and advanced concepts</li>
              <li>Hands-on practical experience with real projects</li>
              <li>Industry best practices and current trends</li>
              <li>Networking opportunities with peers and experts</li>
            </ul>

            <div className="event-tags">
              {selectedEvent.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="event-actions">
            <button className="attend-button" onClick={() => setShowAttendForm(true)}>
              Attend Event
            </button>
            <button
              className="share-button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                showNotification("Link copied to clipboard!")
              }}
            >
              Share Event
            </button>
            <button
              className={`bookmark-button ${savedEvents.includes(selectedEvent.id) ? "saved" : ""}`}
              onClick={() => toggleSaveEvent(selectedEvent.id)}
            >
              {savedEvents.includes(selectedEvent.id) ? "Remove Bookmark" : "Bookmark Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Attend Event Form Component
  const AttendEventForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      age: "",
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      if (formData.name && formData.email && formData.phone && formData.age) {
        handleAttendEvent(formData)
      } else {
        showNotification("Please fill all fields!")
      }
    }

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Attend Event</h2>
            <button className="close-button" onClick={() => setShowAttendForm(false)}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="attend-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Confirm Attendance
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Event Ticket Component
  const EventTicket = () => (
    <div className="modal-overlay">
      <div className="modal ticket-modal">
        <div className="modal-header">
          <h2>Event Ticket</h2>
          <button className="close-button" onClick={() => setShowTicket(false)}>
            ×
          </button>
        </div>
        <div className="ticket">
          <div className="ticket-header">
            <h3>{selectedEvent.title}</h3>
            <div className="ticket-id">Ticket #ET{Date.now()}</div>
          </div>
          <div className="ticket-content">
            <div className="attendee-info">
              <h4>Attendee Information</h4>
              <p>
                <strong>Name:</strong> {attendeeInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {attendeeInfo.email}
              </p>
              <p>
                <strong>Phone:</strong> {attendeeInfo.phone}
              </p>
            </div>
            <div className="event-info">
              <h4>Event Details</h4>
              <p>
                <strong>Date:</strong> {selectedEvent.date}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.time}
              </p>
              <p>
                <strong>Location:</strong> {selectedEvent.location === "online" ? "Online" : selectedEvent.venue}
              </p>
              <p>
                <strong>Provider:</strong> {selectedEvent.provider}
              </p>
            </div>
          </div>
          <div className="ticket-footer">
            <div className="qr-code">QR Code</div>
            <button className="download-button" onClick={() => window.print()}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Saved Events Page Component
  const SavedPage = () => {
    const savedEventsList = events.filter((event) => savedEvents.includes(event.id))

    return (
      <div className="saved-page">
        <div className="container">
          <h1>Saved Events ({savedEvents.length})</h1>
          {savedEventsList.length === 0 ? (
            <div className="empty-state">
              <h3>No saved events yet</h3>
              <p>Start exploring events and save the ones you're interested in!</p>
              <button className="cta-button" onClick={() => setCurrentPage("events")}>
                Browse Events
              </button>
            </div>
          ) : (
            <div className="events-grid">
              {savedEventsList.map((event) => (
                <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
                  <div className="event-image">
                    <div className="image-placeholder">
                      <img src={event.image} alt="Course" style={{ width: "100%", height: "auto" }} />

                    </div>
                    <div className="event-type-badge">{event.type}</div>
                    <button
                      className="save-button saved"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveEvent(event.id)
                      }}
                    >
                      ♥
                    </button>
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-meta">
                      <span className="provider">Provider: {event.provider}</span>
                      <span className="date">Date: {event.date}</span>
                      <span className="time">Time: {event.time}</span>
                    </div>
                    <div className="event-footer">
                      <span className={`price ${event.pricing}`}>{event.price}</span>
                      <div className="rating">
                        Rating: {event.rating} ({event.reviews})
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Contact Page Component
  const ContactPage = () => {
    const [contactForm, setContactForm] = useState({
      name: "",
      email: "",
      message: "",
    })

    const handleContactSubmit = (e) => {
      e.preventDefault()
      if (contactForm.name && contactForm.email && contactForm.message) {
        const mailtoLink = `mailto:support@studenthub.com?subject=Contact from ${contactForm.name}&body=${contactForm.message}%0D%0A%0D%0AFrom: ${contactForm.name}%0D%0AEmail: ${contactForm.email}`
        window.location.href = mailtoLink
        showNotification("Opening email client...")
        setContactForm({ name: "", email: "", message: "" })
      } else {
        showNotification("Please fill all fields!")
      }
    }

    return (
      <div className="contact-page">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h1>Get in Touch</h1>
              <p>Have questions about our events or need assistance? We're here to help!</p>

              <div className="contact-details">
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>support@studenthub.com</p>
                </div>
                <div className="contact-item">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <h3>Hours</h3>
                  <p>Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="contact-form">
              <h2>Send us a Message</h2>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-profile")) {
        setShowProfileDropdown(false)
      }
      if (!event.target.closest(".nav-notifications")) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Main render
  return (
    <div className="app">
      <Navigation />

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Main Content */}
      {selectedEvent ? (
        <EventDetail />
      ) : (
        <>
          {currentPage === "home" && <HomePage />}
          {currentPage === "events" && <EventsPage />}
          {currentPage === "courses" && <CoursesPage />}
          {currentPage === "saved" && <SavedPage />}
          {currentPage === "analytics" && <AnalyticsPage />}
          {currentPage === "game" && <GamePage />}
          {currentPage === "contact" && <ContactPage />}
          {currentPage === "ai" && <AIAssistant />}
          
        </>
      )}

      {/* Modals */}
      {showAttendForm && <AttendEventForm />}
      {showTicket && <EventTicket />}
    </div>
  )
}

export default StudentView
