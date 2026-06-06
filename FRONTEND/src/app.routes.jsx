import React from "react";
import { Routes, Route } from "react-router-dom";
import { Index } from "./auth/UI/pages/index";
import { Register } from "./auth/UI/pages/register";
import { Login } from "./auth/UI/pages/login";
import Protected from "./auth/UI/components/protected";
import Dashboard from "./auth/UI/pages/dashboard";
import InterviewReport from "./auth/UI/pages/interview-report";
import AllReports from "./auth/UI/pages/all-reports";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
      <Route path="/interview-report" element={<Protected><InterviewReport/></Protected>} />
      <Route path="/all-reports" element={<Protected><AllReports/></Protected>} />
    </Routes>
  );
}

export default AppRoutes;
