import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {FormScreen} from "./screens/FormScreen/FormScreen.tsx";
import {GeneratingScreen} from "./screens/GeneratingScreen/GeneratingScreen.tsx";
import {FeedbackScreen} from "./screens/FeedbackScreen/FeedbackScreen.tsx";
import {ThemeToggle} from "./components/ThemeToggle/ThemeToggle.tsx";

function App() {
    return (
        <Router>
            <ThemeToggle />
            <Routes>
                <Route path="/" element={<FormScreen/>}/>
                <Route path="/generating" element={<GeneratingScreen/>}/>
                <Route path="/feedback" element={<FeedbackScreen/>}/>
            </Routes>
        </Router>
    );
}

export default App;