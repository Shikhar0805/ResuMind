import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { Moon, Sun, FileText, BarChart3, Zap } from "lucide-react";
import { ScrollAnimate } from "../components/ScrollAnimate";

const features = [
  { icon: FileText, title: "Resume Analysis", desc: "Get AI-powered insights on how to improve your resume and match job descriptions" },
  { icon: BarChart3, title: "Skill Gap Detection", desc: "Identify missing skills and get personalized learning recommendations" },
  { icon: Zap, title: "AI Interview Prep", desc: "Generate personalized interview questions and get AI-powered answers to prepare" }
];

const steps = [
  { num: "1", title: "Upload Your Resume", desc: "Simply upload your resume and let our AI analyze it in seconds" },
  { num: "2", title: "Get Insights", desc: "Receive detailed analysis of your skills, gaps, and improvement areas" },
  { num: "3", title: "Get Hired", desc: "Practice interviews and land your dream job with confidence" }
];

export function Index() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen dark:bg-black bg-white">
      {/* Background - abstract circles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 dark:bg-white bg-gray-900 rounded-full opacity-5" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 dark:bg-white bg-gray-900 rounded-full opacity-5" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 dark:bg-white bg-gray-900 rounded-full opacity-5" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-extrabold text-foreground">ResuMind AI</div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className="text-sm font-semibold text-foreground hover:opacity-70">Sign In</button>
          <button onClick={() => navigate("/register")} className="rounded-xl bg-foreground px-6 py-2 text-sm font-semibold text-background hover:shadow-lg transition">Create Account</button>
          <button onClick={toggleTheme} className="p-2 bg-foreground text-background rounded-xl hover:shadow-lg transition">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center px-8 py-24">
        <div className="text-center">
          <div className="mb-6 inline-block rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background">AI-Powered Career Tools</div>
          <h1 className="mb-6 text-5xl font-bold text-foreground md:text-6xl">Ace Your Career Journey</h1>
          <p className="mb-12 max-w-2xl text-lg text-foreground/80">Upload your resume, analyze job descriptions, detect skill gaps, and generate AI-powered interview questions and ATS-optimized resumes instantly.</p>
          <button onClick={() => navigate("/register")} className="mb-24 rounded-xl bg-foreground px-8 py-4 font-semibold text-background hover:shadow-lg transition">Get Started →</button>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">Powerful Features</h2>
            <p className="text-lg text-foreground/60">Everything you need to advance your career</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <ScrollAnimate key={title}>
                <div className="rounded-2xl bg-foreground/5 p-8 border border-foreground/10 hover:bg-foreground/10 transition">
                  <Icon size={32} className="mb-4 text-foreground" />
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
                  <p className="text-foreground/70">{desc}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">How It Works</h2>
            <p className="text-lg text-foreground/60">Get started with CareerAI in three simple steps</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map(({ num, title, desc }) => (
              <ScrollAnimate key={num}>
                <div className="text-center">
                  <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 font-bold text-foreground">{num}</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
                  <p className="text-foreground/60">{desc}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-4xl px-8">
          <ScrollAnimate>
            <div className="rounded-2xl bg-foreground/5 p-12 border border-foreground/10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Transform Your Career?</h2>
              <p className="mb-8 text-lg text-foreground/60">Join thousands of professionals using CareerAI to advance their careers</p>
              <button onClick={() => navigate("/register")} className="rounded-xl bg-foreground px-8 py-3 font-semibold text-background hover:shadow-lg transition">Get Started Free</button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-8 py-12">
          <p className="text-center text-sm text-foreground/70">&copy; 2026 CareerAI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
