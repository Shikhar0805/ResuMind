const app=require('./src/app');
const generateInterviewReport=require('./src/services/ai.services');
const {jobDesc,selfDesc,resume}=require('./src/services/template');
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    generateInterviewReport({jobDescription:jobDesc,resumeText:resume,selfDescription:selfDesc});
})