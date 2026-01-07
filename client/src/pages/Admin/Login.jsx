import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { login, verifyLoginMfa } from '../../services/auth.service';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [totpCode, setTotpCode] = useState('');
    const [backupCode, setBackupCode] = useState('');
    const [useBackupCode, setUseBackupCode] = useState(false);
    const [requiresTotp, setRequiresTotp] = useState(false);
    const [mfaToken, setMfaToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login: authLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!requiresTotp) {
                
                const loginResponse = await login(email, password);
                console.log('Login response:', loginResponse);

                if (loginResponse.mfaRequired) {
                    setRequiresTotp(true);
                    setMfaToken(loginResponse.mfaToken);
                    toast.success('Please enter your authenticator code');
                } else {
                    authLogin(loginResponse.token, loginResponse.admin);

                    
                    console.log('Checking totpEnabled:', loginResponse.admin.totpEnabled);
                    if (!loginResponse.admin.totpEnabled) {
                        console.log('Redirecting to setup-mfa');
                        toast.success('Please set up Two-Factor Authentication');
                        navigate('/admin/setup-mfa', { replace: true });
                    } else {
                        console.log('Redirecting to dashboard');
                        toast.success('Welcome back!');
                        navigate(from, { replace: true });
                    }
                }
            } else {
                
                const response = await verifyLoginMfa(
                    mfaToken,
                    useBackupCode ? null : totpCode,
                    useBackupCode ? backupCode : null
                );

                authLogin(response.token, response.admin);
                toast.success('Welcome back!');
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img
                        src={assets.logo}
                        alt="Blitz India Engineering"
                        className="h-12 w-auto"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Admin Login
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Secure access for authorized personnel only
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!requiresTotp ? (
                            <>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' }
                                                        });
                                                        const data = await response.json();
                                                        if (data.success) {
                                                            toast.success(data.message);
                                                        } else {
                                                            toast.error(data.message);
                                                        }
                                                    } catch (error) {
                                                        toast.error('Failed to send reset email. Please try again.');
                                                    }
                                                }}
                                                className="font-medium text-orange-600 hover:text-orange-500"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="totp" className="block text-sm font-medium text-gray-700">
                                        {useBackupCode ? 'Backup Code' : 'Authenticator Code'}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUseBackupCode(!useBackupCode);
                                            setTotpCode('');
                                            setBackupCode('');
                                        }}
                                        className="text-xs text-orange-600 hover:text-orange-500"
                                    >
                                        {useBackupCode ? 'Use Authenticator App' : 'Use Backup Code'}
                                    </button>
                                </div>

                                <div className="mt-1">
                                    {useBackupCode ? (
                                        <input
                                            id="backupCode"
                                            name="backupCode"
                                            type="text"
                                            required
                                            value={backupCode}
                                            onChange={(e) => {
                                                
                                                const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                                                if (value.length <= 8) {
                                                    setBackupCode(value);
                                                }
                                            }}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm tracking-widest font-mono"
                                            placeholder="XXXXXXXX"
                                            autoFocus
                                        />
                                    ) : (
                                        <input
                                            id="totp"
                                            name="totp"
                                            type="text"
                                            autoComplete="one-time-code"
                                            required
                                            value={totpCode}
                                            onChange={(e) => {
                                                
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                if (value.length <= 6) {
                                                    setTotpCode(value);
                                                }
                                            }}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-center tracking-widest text-lg"
                                            placeholder="000000"
                                            maxLength={6}
                                            autoFocus
                                        />
                                    )}
                                </div>
                                <p className="mt-2 text-xs text-gray-500 text-center">
                                    {useBackupCode
                                        ? 'Enter one of your 8-character backup codes.'
                                        : 'Open your authenticator app and enter the 6-digit code.'}
                                </p>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {isLoading ? 'Verifying...' : requiresTotp ? 'Verify Code' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    {requiresTotp && (
                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setRequiresTotp(false);
                                    setTotpCode('');
                                    setBackupCode('');
                                    setMfaToken(null);
                                }}
                                className="text-sm text-orange-600 hover:text-orange-500"
                            >
                                Back to login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
