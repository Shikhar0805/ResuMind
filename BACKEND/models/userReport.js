const mongoose=require('mongoose');

const technicalInterviewSchema = new mongoose.Schema({

    questions:{
        type:String,
        required:[true, 'Technical questions are required']
    },
    intention:{
        type:String,
        required:[true, 'Intention is required']
     },
     answers:{
        type:String,
        required:[true, 'Answers are required']
     },_id:false
})

  const behavioralInterviewSchema = new mongoose.Schema({
       questions:{
        type:String,
        required:[true, 'Technical questions are required']
    },
    intention:{
        type:String,
        required:[true, 'Intention is required']
     },
     answers:{
        type:String,
        required:[true, 'Answers are required']
     },_id:false
  })

  const skillGapAnalysisSchema = new mongoose.Schema({
    skills:{
        type:String,
        required:[true, 'Skill gaps are required']  ,
    },
    severity:{
        type:String,
        enum:['Low','Medium','High'],
        required:[true, 'Severity is required']
    },_id:false
  })    

  const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true, 'Day is required']
    }
    ,focusAreas:{
        type:String,
        required:[true, 'Focus areas are required']
    },_id:false,
    tasks:{
        type:String,
        required:[true, 'Tasks are required']
    },
    
  })


  const interviewReportSchema =new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true, 'Job description is required']
    },
    resumeText:{
        type:String,
    },
    selfDescription:{
        type:String
    },
     atsScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalInterviews:[technicalInterviewSchema],
    behavioralInterviews:[behavioralInterviewSchema],
    skillGapAnalysis:[skillGapAnalysisSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})


const InterviewReportModel=mongoose.model('InterviewReport',interviewReportSchema);

module.exports=InterviewReportModel;