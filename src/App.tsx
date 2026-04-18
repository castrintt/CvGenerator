import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Toaster} from 'sonner';
import {FormScreen} from "./screens/FormScreen/FormScreen.tsx";
import {GeneratingScreen} from "./screens/GeneratingScreen/GeneratingScreen.tsx";
import {FeedbackScreen} from "./screens/FeedbackScreen/FeedbackScreen.tsx";
import {HomeScreen} from "./screens/HomeScreen/HomeScreen.tsx";
import {LoginScreen} from "./screens/LoginScreen/LoginScreen.tsx";
import {DashboardScreen} from "./screens/DashboardScreen/DashboardScreen.tsx";
import {ThemeToggle} from "./components/ThemeToggle/ThemeToggle.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useTheme} from "./context/ThemeContext.tsx";

function App() {
    const {theme} = useTheme();

    return (
        <Router>
            <Toaster theme={theme} position="top-right" richColors closeButton/>
            <ThemeToggle />
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/resume" element={<FormScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardScreen/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/generating" element={<GeneratingScreen/>}/>
                <Route path="/feedback" element={<FeedbackScreen/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Router>
    );
}

export default App;