import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/app');
    };

    return (
        <div className="container mt-5 text-center">
            <h1>GiftLink</h1>
            <p className="lead">
                Give away household items you no longer need to people who could use them, or find free items near you.
            </p>
            <button className="btn btn-primary btn-lg mt-3" onClick={goToMainPage}>
                Get Started
            </button>
        </div>
    );
}

export default LandingPage;
