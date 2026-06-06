import React, { useEffect, useState } from 'react';
import Protected from '../components/protected';
import HeaderControls from '../components/HeaderControls';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import {LayoutDashboard} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import{jsPDF} from 'jspdf';
import{Download} from 'lucide-react';

export function AllReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);

  console.log(selected);
const downloadPDF = () => {
  if (!selected) return;

  const doc = new jsPDF();

  let y = 20;

  const checkPage = () => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  };

  // ===== TITLE =====
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  const title = doc.splitTextToSize(
    selected.title || "Interview Report",
    180
  );

  doc.text(title, 10, y);
  y += title.length * 8 + 5;

  // ===== ATS SCORE =====
  doc.setFontSize(14);
  doc.text(
    `ATS Score: ${selected.atsScore || "N/A"}`,
    10,
    y
  );

  y += 12;

  // ===== RESUME SUMMARY =====
  checkPage();

  doc.setFontSize(16);
  doc.text("Resume Summary", 10, y);

  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const summary = doc.splitTextToSize(
    selected.resumeText || "No summary available",
    180
  );

  doc.text(summary, 10, y);

  y += summary.length * 6 + 10;

  // ===== TECHNICAL QUESTIONS =====
  checkPage();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Technical Questions", 10, y);

  y += 8;

  doc.setFontSize(11);

  selected.technicalInterviews?.forEach((item, index) => {
    checkPage();

    doc.setFont("helvetica", "bold");

    const question = doc.splitTextToSize(
      `${index + 1}. ${item.questions}`,
      180
    );

    doc.text(question, 10, y);

    y += question.length * 6;

    doc.setFont("helvetica", "normal");

    const answer = doc.splitTextToSize(
      `Answer Guide: ${item.answers}`,
      180
    );

    doc.text(answer, 15, y);

    y += answer.length * 6 + 8;
  });

  // ===== BEHAVIORAL QUESTIONS =====
  checkPage();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Behavioral Questions", 10, y);

  y += 8;

  doc.setFontSize(11);

  selected.behavioralInterviews?.forEach((item, index) => {
    checkPage();

    doc.setFont("helvetica", "bold");

    const question = doc.splitTextToSize(
      `${index + 1}. ${item.questions}`,
      180
    );

    doc.text(question, 10, y);

    y += question.length * 6;

    doc.setFont("helvetica", "normal");

    const answer = doc.splitTextToSize(
      `Expected Approach: ${item.answers || item.intention || ""}`,
      180
    );

    doc.text(answer, 15, y);

    y += answer.length * 6 + 8;
  });

  // ===== IMPROVEMENTS =====
  checkPage();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Improvements", 10, y);

  y += 8;

  doc.setFontSize(11);

  selected.improvements?.forEach((item) => {
    checkPage();

    doc.setFont("helvetica", "bold");

    const title = doc.splitTextToSize(
      item.title,
      180
    );

    doc.text(title, 10, y);

    y += title.length * 6;

    doc.setFont("helvetica", "normal");

    const desc = doc.splitTextToSize(
      item.description,
      180
    );

    doc.text(desc, 15, y);

    y += desc.length * 6 + 8;
  });

  // ===== PREPARATION PLAN =====
  checkPage();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Preparation Plan", 10, y);

  y += 8;

  doc.setFontSize(11);

  selected.preparationPlan?.forEach((day) => {
    checkPage();

    doc.setFont("helvetica", "bold");

    const heading = doc.splitTextToSize(
      `Day ${day.day}: ${day.focusAreas}`,
      180
    );

    doc.text(heading, 10, y);

    y += heading.length * 6;

    doc.setFont("helvetica", "normal");

    const tasks = doc.splitTextToSize(
      `Tasks: ${day.tasks}`,
      180
    );

    doc.text(tasks, 15, y);

    y += tasks.length * 6 + 8;
  });

  doc.save(
    `${
      selected.title?.replace(/\s+/g, "_") ||
      "Interview_Report"
    }.pdf`
  );
};

  useEffect(() => {
    let mounted = true;
    async function load() {
      // Prefer server-side listing for user's reports
      try {
        const resp = await axios.get('/api/interview/reports', { baseURL: 'http://localhost:3000', withCredentials: true });
        if (!mounted) return;
        const serverReports = resp.data?.reports || [];
        setReports(serverReports);
        if (serverReports.length > 0) setSelected(serverReports[0]);
        return;
      } catch (err) {
        // fall back to localStorage if server unavailable
      }

      try {
        const all = JSON.parse(localStorage.getItem('allInterviewReports') || '[]');
        const uid = user?._id || user?.id;
        const my = all.filter(r => uid && r && (String(r.user) === String(uid)));
        my.sort((a, b) => {
          const ta = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tb - ta;
        });
        if (!mounted) return;
        setReports(my);
        if (my.length > 0) setSelected(my[0]);
      } catch (e) { if (mounted) setReports([]); }
    }

    load();
    return () => { mounted = false; };
  }, [user]);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 rounded-xl bg-foreground px-3 py-2 font-semibold text-background shadow-sm hover:scale-105 transition">
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          <div className="text-2xl font-extrabold ml-140">Your Reports</div>
        </div>
        <div className="flex items-center gap-4"><HeaderControls /></div>
      </header>

      <section className="px-8 py-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 bg-foreground/5 border rounded p-2 h-[70vh] overflow-auto">
            {reports.length === 0 ? (
              <div className="p-4 text-sm text-foreground/70">No reports found.</div>
            ) : (
              <ul>
                {reports.map((r, idx) => (
                  <li key={idx} className={`p-3 border-b cursor-pointer ${selected===r? 'bg-foreground/10' : ''}`} onClick={() => setSelected(r)}>
                    <div className="font-semibold truncate">{r.title || `Report ${idx+1}`}</div>
                    <div className="text-xs text-foreground/60 truncate">{new Date(r.createdAt || Date.now()).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-2 bg-foreground/5 border rounded p-4 h-[70vh] overflow-auto">
            {selected ? (
              <div>
  <div className="flex items-start justify-between mb-4">
  <h2 className="text-xl font-bold">
    {selected.title || "Interview Report"}
  </h2>

  <button
    onClick={downloadPDF}
    className="text-sm bg-foreground text-background px-2 py-1 rounded hover:bg-foreground/80">
    <Download size={16} />
  </button>
</div>
                <div className="text-sm text-foreground/70 mb-4">Generated: {new Date(selected.createdAt || Date.now()).toLocaleString()}</div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-foreground/70 whitespace-pre-line">{selected.resumeText?.slice(0,1000) || selected.resumeText || selected.summary || 'No summary available.'}{selected.resumeText && selected.resumeText.length>1000 ? '...' : ''}</p>
                </div>

                {/* Technical Questions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Technical Questions</h3>
                  <div className="space-y-4">
                    {(selected.technicalInterviews && selected.technicalInterviews.length>0) ? selected.technicalInterviews.map((t,i)=> (
                      <div key={i}>
                        <div className="font-medium">Q: {t.questions}</div>
                        <div className="text-foreground/60">Answer guide: {t.answers}</div>
                      </div>
                    )) : (<div className="text-foreground/60">No technical questions available.</div>)}
                  </div>
                </div>

                {/* Behavioural Questions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Behavioural Questions</h3>
                  <div className="space-y-4">
                    {(selected.behavioralInterviews && selected.behavioralInterviews.length>0) ? selected.behavioralInterviews.map((b,i)=> (
                      <div key={i}>
                        <div className="font-medium">Q: {b.questions}</div>
                        <div className="text-foreground/60">Approach: {b.intention || b.answer || '—'}</div>
                      </div>
                    )) : (<div className="text-foreground/60">No behavioural questions available.</div>)}
                  </div>
                </div>

                {/* Improvements */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Improvements</h3>
                  <div className="space-y-3">
                    {Array.isArray(selected.improvements) && selected.improvements.length > 0 ? (
                      <div className="space-y-4">
                        {selected.improvements.map((imp, i) => (
                          <div key={i} className="p-3 border rounded">
                            {imp.title && <div className="font-semibold mb-1">{imp.title}</div>}
                            {imp.description && <div className="text-foreground/70 whitespace-pre-line">{imp.description}</div>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-foreground/60">No improvements provided.</div>
                    )}
                  </div>
                </div>

                {/* Roadmap */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Preparation Roadmap</h3>
                  <div className="space-y-4">
                    {(selected.preparationPlan && selected.preparationPlan.length>0) ? selected.preparationPlan.map((p,i)=>(
                      <div key={i} className="p-3 border rounded">
                        <div className="font-medium">Day {p.day || (i+1)}</div>
                        <div className="text-foreground/70">{p.focusAreas || p.focus || '—'}</div>
                        <div className="text-foreground/60 mt-1">{p.tasks || p.actions || ''}</div>
                      </div>
                    )) : (<div className="text-foreground/60">No roadmap available.</div>)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-foreground/70">Select a report from the list to view its content.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProtectedAllReports(){
  return (
    <Protected>
      <AllReports />
    </Protected>
  )
}
