import axios from "axios";

const api = {
    baseURL: "http://localhost:3000",
    withCredentials: true
};

export async function generateInterviewReport(resumeFile, selfDescription, jobDescription) {
    try {
        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("selfDescription", selfDescription);
        formData.append("jobDescription", jobDescription);

        const response = await axios.post(
            "/api/interview/generate",
            formData,
            {
                ...api,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        // Persist the returned interview report so frontend can show it even if
        // a subsequent GET /api/interview/latest fails due to backend issues.
        if (response.data && response.data.interviewReport) {
            try {
                localStorage.setItem('latestInterviewReport', JSON.stringify(response.data.interviewReport));
                // append to all stored reports for client-side listing
                try {
                    const existing = JSON.parse(localStorage.getItem('allInterviewReports') || '[]');
                    existing.push(response.data.interviewReport);
                    localStorage.setItem('allInterviewReports', JSON.stringify(existing));
                } catch (e) {
                    // ignore
                }
            } catch (err) {
                // ignore localStorage errors
            }
        }
        return response.data;
    } catch (err) {
        throw err.response?.data || err;
    }
}
