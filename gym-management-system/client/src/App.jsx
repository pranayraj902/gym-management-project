import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import Home from './pages/Home';
import Members from './pages/Members';
import Trainers from './pages/Trainers';
import Sessions from './pages/Sessions';
import Payments from './pages/Payments';
import Equipment from './pages/Equipment';
import Attendance from './pages/Attendance';
import Feedback from './pages/Feedback';
import Reports from './pages/Reports';
import Plans from './pages/Plans';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

// Protected Route Component
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Listen for storage changes
    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        
        window.addEventListener('storage', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };
    
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route 
                        path="/login" 
                        render={(props) => <Login {...props} onLogin={handleLogin} />}
                    />
                    <Route 
                        path="/register" 
                        component={Register}
                    />
                    {isAuthenticated ? (
                        <>
                            <Header onLogout={handleLogout} />
                            <div className="main-container">
                                <Sidebar />
                                <main className="content">
                                    <Switch>
                                        <ProtectedRoute path="/" exact component={Home} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/members" component={Members} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/trainers" component={Trainers} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/sessions" component={Sessions} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/payments" component={Payments} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/equipment" component={Equipment} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/attendance" component={Attendance} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/feedback" component={Feedback} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/reports" component={Reports} isAuthenticated={isAuthenticated} />
                                        <ProtectedRoute path="/plans" component={Plans} isAuthenticated={isAuthenticated} />
                                        <Redirect to="/" />
                                    </Switch>
                                </main>
                            </div>
                            <Footer />
                        </>
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Switch>
            </div>
        </Router>
    );
};

export default App;