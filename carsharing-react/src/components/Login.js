import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/signin', {
                email,
                password,
            });
            console.log(response.data)
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
            localStorage.removeItem('id');

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);
            localStorage.setItem('id', response.data.id);
           
            setIsLoggedIn(true);
            navigate("/rides")
            window.location.reload();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '40vh'}}>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <h2 class="mb-4 text-start">Log In</h2>
            <form onSubmit={handleLogin} style={{ minWidth: '40vh'}}>
                <div class="form-group mb-3">
                    <label for="emailInput" class="form-label">Email:</label>
                    <input
                        type="email"
                        class="form-control"
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div class="form-group mb-4">
                    <label for="passwordInput" class="form-label">Password:</label>
                    <input
                        type="password"
                        class="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</div>

    );
};



const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {isLoggedIn ? (
                <div>You are logged in!</div>
            ) : (
                <>
                    <Login setIsLoggedIn={setIsLoggedIn} />
                  
                </>
            )}
        </div>
    );
};

export default Authentication;
