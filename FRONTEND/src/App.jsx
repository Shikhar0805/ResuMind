import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./app.routes";

import { ThemeProvider } from "./auth/UI/theme/ThemeContext";
import { AuthProvider } from "./auth/auth.context";

export function App() {
  return (
      <ThemeProvider>
        <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
        </AuthProvider>
      </ThemeProvider>
  );
}
