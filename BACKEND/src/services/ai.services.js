const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Match GenAI's actual output format (flat arrays with string values)
const interviewReportSchema = z.object({
  atsScore: z.number(),

  technicalInterviews: z.array(
    z.object({
      questions: z.string(),
      intention: z.string(),
      answers: z.string()
    })
  ),

  behavioralInterviews: z.array(
    z.object({
      questions: z.string(),
      intention: z.string(),
      answers: z.string()
    })
  ),

  skillGapAnalysis: z.array(
    z.object({
      skills: z.string(),
      severity: z.enum(["Low", "Medium", "High"])
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focusAreas: z.string(),
      tasks: z.string()
    })
    
  ),
  improvements: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ),
  title: z.string()
});

async function generateInterviewReport({resumeText, selfDescription, jobDescription}) {

const prompt = `
Analyze the candidate's resume and job description.

Return ONLY valid JSON.

Example format:

{
  "atsScore": 80,
  "technicalInterviews": [
    {
      "questions": "What is React?",
      "intention": "Check React fundamentals",
      "answers": "React is a JavaScript library..."
    }
  ],
  "behavioralInterviews": [
    {
      "questions": "Tell me about yourself",
      "intention": "Evaluate communication skills",
      "answers": "Use STAR method..."
    }
  ],
  "skillGapAnalysis": [
    {
      "skills": "Node.js",
      "severity": "High"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focusAreas": "React",
      "tasks": "Study React hooks and state management"
    }
  ],
  "improvements": [
    {
      "title": "Improve Communication Skills",
      "description": "Work on articulating ideas more clearly."
    }
  ],
  "title": "Software Engineer Interview Report,Use different titles each time"
}

Requirements:
- ATS score between 0 and 100
- 5 technical interview questions
- 5 behavioral interview questions
- 5 skill gaps
- 7 preparation days
- Every array item MUST be an object
- Do NOT return strings
- Do NOT return markdown
- Return JSON only

Job Description:
${jobDescription}

Resume:
${resumeText}

Self Description:
${selfDescription}
`;

const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: prompt,
  config: {
    responseMimeType: "application/json"
  }
});
const parsed = JSON.parse(response.text);

console.dir(parsed, { depth: null });

const validated = interviewReportSchema.parse(parsed);

return validated;
}

module.exports = generateInterviewReport;