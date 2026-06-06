import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { FileText, BarChart3, Zap, Loader } from "lucide-react";
import HeaderControls from "../components/HeaderControls";
import { generateInterviewReport } from "../../services/interview.api";
import { ScrollAnimate } from "../components/ScrollAnimate";

export function Dashboard() {
  const { handleLogout, loading, user } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    resume: null,
    selfDescription: "",
    jobDescription: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onLogout = async () => {
    await handleLogout();
    navigate("/login", { replace: true });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.resume) {
      setError("Please upload a resume file");
      return;
    }

    if (!formData.selfDescription.trim()) {
      setError("Please enter your self description");
      return;
    }

    if (!formData.jobDescription.trim()) {
      setError("Please enter the job description");
      return;
    }

    setSubmitting(true);
    try {
      const resp = await generateInterviewReport(
        formData.resume,
        formData.selfDescription,
        formData.jobDescription
      );
      // persist report locally and ensure it is tied to current user id
      if (resp?.interviewReport) {
        const reportToStore = { ...resp.interviewReport };
        if (user?._id || user?.id) reportToStore.user = user._id || user.id;
        // ensure a timestamp exists for ordering
        if (!reportToStore.createdAt) reportToStore.createdAt = new Date().toISOString();
        try { localStorage.setItem('latestInterviewReport', JSON.stringify(reportToStore)); } catch (e) {}
        // also append to allInterviewReports for the client-side history
        try {
          const all = JSON.parse(localStorage.getItem('allInterviewReports') || '[]');
          all.push(reportToStore);
          localStorage.setItem('allInterviewReports', JSON.stringify(all));
        } catch (e) {}
      }
      // Navigate to interview report page after successful generation
      navigate('/interview-report');
    } catch (err) {
      setError(err.message || "Failed to generate interview report. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen dark:bg-black bg-white">
        {submitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="flex flex-col items-center gap-4 bg-foreground/5 p-8 rounded-xl">
              <Loader className="animate-spin" size={36} />
              <div className="text-lg font-semibold">Generating interview report...</div>
              <div className="text-sm text-foreground/60">This may take ~30 seconds</div>
            </div>
          </div>
        )}
      {/* Background - abstract circles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 dark:bg-white bg-gray-900 rounded-full opacity-5" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 dark:bg-white bg-gray-900 rounded-full opacity-5" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 dark:bg-white bg-gray-900 rounded-full opacity-5" />
      </div>

      {/* Header */}
      <header className="relative z-[9999] flex items-center justify-between px-8 py-6">
        <div
          onClick={() => navigate('/dashboard')}
          className="text-2xl font-extrabold text-foreground cursor-pointer select-none hover:text-foreground/80"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/dashboard'); }}
        >
          ResuMind AI
        </div>
        <div className="flex items-center gap-4">
          <HeaderControls />
        </div>
      </header>

      {/* Fixed controls (Logout + Theme) */}
      

      {/* Content */}
      <section className="relative z-10 flex flex-col items-center justify-center px-8 py-24">
        <div className="w-full max-w-6xl">
          {/* Feature cards */}
          <div className="mb-16 grid gap-12 md:gap-20 md:grid-cols-3 justify-items-center">
            <ScrollAnimate className="delay-75 w-full">
              <div className="w-full max-w-lg rounded-2xl bg-foreground/5 p-8 border border-foreground/10 hover:bg-foreground/10 transition text-center flex flex-col items-center justify-center">
                <FileText size={40} className="mb-3 text-foreground" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">Resume Analysis</h3>
                <p className="text-foreground/70 text-sm">Get AI-powered insights to improve your resume and ATS match.</p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate className="delay-150 w-full">
              <div className="w-full max-w-lg rounded-2xl bg-foreground/5 p-8 border border-foreground/10 hover:bg-foreground/10 transition text-center flex flex-col items-center justify-center">
                <BarChart3 size={40} className="mb-3 text-foreground" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">Skill Gap Detection</h3>
                <p className="text-foreground/70 text-sm">Identify missing skills and receive learning recommendations.</p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate className="delay-200 w-full">
              <div className="w-full max-w-lg rounded-2xl bg-foreground/5 p-8 border border-foreground/10 hover:bg-foreground/10 transition text-center flex flex-col items-center justify-center">
                <Zap size={40} className="mb-3 text-foreground" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">AI Interview Prep</h3>
                <p className="text-foreground/70 text-sm">Generate tailored interview questions and practice answers.</p>
              </div>
            </ScrollAnimate>
          </div>

          <ScrollAnimate className="my-8 w-full">
            <div className="border-t border-foreground/10 w-full" />
          </ScrollAnimate>

          <ScrollAnimate className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Your Dashboard</h2>
          </ScrollAnimate>

          <div className="w-full max-w-2xl mx-auto">
            <ScrollAnimate className="w-full">
              <div className="rounded-2xl bg-foreground/5 p-8 border border-foreground/10 shadow-lg">
                <h1 className="text-3xl font-bold mb-2 text-center">Interview Report Generator</h1>
                <p className="text-foreground/70 mb-6 text-center">Upload your resume and provide details about yourself and the job position</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-bold text-lg mb-2">Resume (PDF)<label className="text-red-500">*</label></label>

                <div className="relative">
                  <input
                    id="resumeInput"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="w-full px-3 py-2 bg-foreground/20 border border-foreground/20 rounded flex items-center justify-between">
                    <span className={`text-sm truncate ${isDark ? 'text-white' : 'text-black'}`}>
                      {formData.resume ? formData.resume.name : 'Choose a file (PDF)'}
                    </span>
                    <span className={`text-sm ml-4 ${isDark ? 'text-white' : 'text-black'}`}>Browse</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="selfDescription" className="block font-bold  text-lg mb-2">Self Description<label className="text-red-500">*</label></label>
                <textarea
                  id="selfDescription"
                  name="selfDescription"
                  value={formData.selfDescription}
                  onChange={handleTextChange}
                  placeholder="Tell us about yourself, your skills, experience..."
                  rows={4}
                  className="w-full px-3 py-2 bg-foreground/20 border border-foreground/20 rounded focus:outline-none focus:ring-2 focus:ring-foreground/50 resize-none"
                />
              </div>

              <div>
                <label htmlFor="jobDescription" className="block font-bold text-lg mb-2">Job Description<label className="text-red-500">*</label></label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleTextChange}
                  placeholder="Paste the job description or outline the requirements..."
                  rows={4}
                  className="w-full px-3 py-2 bg-foreground/10 border border-foreground/20 rounded focus:outline-none focus:ring-2 focus:ring-foreground/50 resize-none"
                />
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded text-sm">{error}</div>
              )}

              {message && (
                <div className="px-4 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded text-sm">{message}</div>
              )}

              <button
                type="submit"
                disabled={submitting || loading}
                className="w-full rounded-xl bg-foreground py-3 font-semibold text-background hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                {submitting ? "Generating..." : "Generate Interview Report"}
              </button>
            </form>
              </div>
            </ScrollAnimate>
          </div>
      </div>
      </section>
    </main>
  );
}

export default Dashboard;
