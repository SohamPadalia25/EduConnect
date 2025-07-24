import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
import Header from "../components/Header"
import API from "../services/api";



export default function Register() {
  const navigate = useNavigate();
  const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "student",
  // Student fields
  student_fullName: "",
  student_phone: "",
  student_location: "",
  student_profilePic: "",
  student_interests: "",
  student_link: "",
  student_notification: false,
  // Provider fields
  provider_instituteName: "",
  provider_contactName: "",
  provider_contactNumber: "",
}

  async function handleSubmit(e) {
  e.preventDefault();
  setIsLoading(true);

  try {
    const { username, email, password, role } = form;

    const payload = {
      username,
      email,
      password,
      role,
      ...(role === "student" && {
        fullname: form.student_fullName,
        phone: form.student_phone,
        location: form.student_location,
        profilePic: form.student_profilePic,
        interests: form.student_interests,
        link: form.student_link,
        notification: form.student_notification,
      }),
      ...(role === "provider" && {
        instituteName: form.provider_instituteName,
        contactName: form.provider_contactName,
        contactNumber: form.provider_contactNumber,
      }),
    };

    const res = await API.post('/v1/users/register', payload);

    console.log("User registered:", res.data);
    alert("Registration successful!");
    navigate('/login');
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    alert("Registration failed!");
  } finally {
    setIsLoading(false);
  }
}

  const [form, setForm] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }

  const isStudent = form.role === "student"
  const isProvider = form.role === "provider"

  return (
    <>
    <Header />
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      {/* Floating Shapes Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-muted/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-primary/5 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4">
        <form 
          className="w-full max-w-2xl bg-card/80 backdrop-blur-lg border border-border/50 rounded-3xl p-8 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground text-lg">Join our learning community</p>
          </div>

          {/* Basic Information Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-foreground mb-3">I am a</label>
              <div className="flex gap-4">
                <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isStudent 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-border bg-background/30 hover:border-primary/50'
                }`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="student" 
                    checked={isStudent} 
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`block text-center font-medium ${
                    isStudent ? 'text-primary' : 'text-foreground'
                  }`}>
                    Student
                  </span>
                </label>
                <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isProvider 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-border bg-background/30 hover:border-primary/50'
                }`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="provider" 
                    checked={isProvider} 
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`block text-center font-medium ${
                    isProvider ? 'text-primary' : 'text-foreground'
                  }`}>
                    Provider
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Student Fields */}
          {isStudent && (
            <div className="mb-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Student Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Full Name</label>
                  <input
                    type="text"
                    name="student_fullName"
                    value={form.student_fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Phone</label>
                  <input
                    type="tel"
                    name="student_phone"
                    value={form.student_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Location</label>
                  <input
                    type="text"
                    name="student_location"
                    value={form.student_location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter your location"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Profile Picture URL</label>
                  <input
                    type="url"
                    name="student_profilePic"
                    value={form.student_profilePic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Interests</label>
                  <input
                    type="text"
                    name="student_interests"
                    value={form.student_interests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Tech, Marketing, Design..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">LinkedIn / Website</label>
                  <input
                    type="text"
                    name="student_link"
                    value={form.student_link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="student_notification"
                    checked={form.student_notification}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    form.student_notification
                      ? 'border-primary bg-primary'
                      : 'border-border bg-background'
                  }`}>
                    {form.student_notification && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-foreground">Email notifications</span>
                </label>
              </div>
            </div>
          )}

          {/* Provider Fields */}
          {isProvider && (
            <div className="mb-8 p-6 rounded-xl bg-secondary/10 border border-secondary/30">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Provider Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Institute Name</label>
                  <input
                    type="text"
                    name="provider_instituteName"
                    value={form.provider_instituteName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter institute name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Contact Person Name</label>
                  <input
                    type="text"
                    name="provider_contactName"
                    value={form.provider_contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter contact person name"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-foreground">Contact Number</label>
                  <input
                    type="tel"
                    name="provider_contactNumber"
                    value={form.provider_contactNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Enter contact number"
                  />
                </div>
              </div>
            </div>
          )}

          <button 
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isLoading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}