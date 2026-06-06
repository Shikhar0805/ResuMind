const express=require('express');
const interviewRouter=express.Router();
const authMiddleware=require('../middlewares/auth.middleware');
const interviewController=require('../controllers/interview.controller');
const upload=require('../middlewares/file.middleware');

interviewRouter.post('/generate',authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController);
interviewRouter.get('/latest', authMiddleware.authUser, interviewController.getLatestInterviewReportController);
interviewRouter.get('/reports', authMiddleware.authUser, interviewController.getUserReportsController);
interviewRouter.delete('/:id', authMiddleware.authUser, interviewController.deleteInterviewReportController);


module.exports=interviewRouter;