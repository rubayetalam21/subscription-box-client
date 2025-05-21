import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const ForgetPassword = () => {
    const { resetPassword } = useContext(AuthContext); // You must define this in AuthProvider
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    // If email was passed from login page, set it
    useEffect(() => {
        if (location.state?.forgetEmail) {
            setEmail(location.state.forgetEmail);
        }
    }, [location]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            Swal.fire({
                icon: 'warning',
                title: 'Email is required',
                text: 'Please enter your email.',
            });
            return;
        }

        try {
            await resetPassword(email); // Call Firebase password reset
            Swal.fire({
                icon: 'success',
                title: 'Reset Email Sent',
                text: 'Please check your email for the reset link.',
            });
            // Optional: Redirect to Gmail
            setTimeout(() => {
                window.location.href = 'https://mail.google.com';
            }, 2000);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Reset Failed',
                text: error.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl p-5">
                <h2 className="text-xl font-bold text-center">Reset Password</h2>
                <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="input w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-full">
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
