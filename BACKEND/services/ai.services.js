const { GoogleGenAI } =require("@google/genai");
const {z}=require('zod');
const {zodToJsonSchema}=require('zod-to-json-schema');
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const interviewReportSchema = z.object({
      ATSScore: z.number().describe("The ATS score of the resume based on the how well it matches the job description."),

      skillGapAnalysis: z.object({
        skills: z.string().describe("Identify the skill gaps based on the job description and the candidate's resume."),
        severity: z.enum(['Low', 'Medium', 'High']).describe("The severity of the skill gap.")
      }).describe("An analysis of the skill gaps for the candidate based on the job description and resume. Keep it concise and clean."),

      technicalInterview: z.object({
        questions: z.string().describe("Mention the most probable technical questions that the candidate might face in the interview based on the job description."),
        intention: z.string().describe("The intention of the interviewer behind asking those questions."),
        answers: z.string().describe("Provide detailed answers about how and what the candidate should answer for each question.")
      }).describe("A technical interview analysis for the candidate based on the job description and resume. Keep it concise and clean."),

      behavioralInterview: z.object({
        questions: z.string().describe("Mention the most probable behavioral questions that the candidate might face in the interview based on the job description."),
        intention: z.string().describe("The intention of the interviewer behind asking those questions."),
        answers: z.string().describe("Provide detailed answers about how and what the candidate should answer for each question.")
      }).describe("A behavioral interview analysis for the candidate based on the job description and resume. Keep it concise and clean."),

      preparationPlan: z.array(z.object({
        day: z.number().describe("The day number for the preparation plan."),
        focusAreas: z.string().describe("The focus areas for that day based on the skill gap analysis and interview questions."),
        tasks: z.string().describe("The specific tasks that the candidate should do on that day to prepare for the interview.")
      })).describe("A day-wise preparation plan for the candidate to prepare for the interview based on the skill gap analysis and interview questions. Keep it concise and clean.")

});