const mongoose = require("mongoose");

const technicalInterviewSchema = new mongoose.Schema({
  questions: String,
  intention: String,
  answers: String
}, { _id: false });

const behavioralInterviewSchema = new mongoose.Schema({
  questions: String,
  intention: String,
  answers: String
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
  skills: String,
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"]
  }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
  day: Number,
  focusAreas: String,
  tasks: String
}, { _id: false });

const improvements=new mongoose.Schema({
  title:String,
  description:String
}, {_id:false
})

const interviewReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  jobDescription: String,
  resumeText: String,
  selfDescription: String,

  atsScore: Number,

  technicalInterviews: [technicalInterviewSchema],
  behavioralInterviews: [behavioralInterviewSchema],
  skillGapAnalysis: [skillGapSchema],
  preparationPlan: [preparationPlanSchema],
  improvements:[improvements],
  title: {
    type: String,
    required: [true, "Title is required"]
  }
}, {
  timestamps: true
}
);

module.exports = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);