import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Adjust the path if needed

function SignUp() {
    const { setUser } = useUser(); // Access setUser from the context
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/home/user/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
            } else {
                // Save user in localStorage
                localStorage.setItem('user', JSON.stringify(data));

                // Update context with new user
                setUser(data); // Ensure context is updated
                navigate('/books');  // Redirect after successful signup
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signupDiv">
            <form className="signUp" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}   
                    value={username}
                    placeholder="Enter your username"
                />
                <label htmlFor="email">Email: </label>
                <input 
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}   
                    value={email}
                    placeholder="Enter your email"
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}            
                    value={password}
                    placeholder="Enter your password"
                />
                <div className="horizontal">
                    <button className="mt-3 add" disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <p className="loginLink mt-4 mx-5">Back to <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
