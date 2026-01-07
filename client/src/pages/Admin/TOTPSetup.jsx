import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupMFA, verifyMFASetup } from '../../services/auth.service';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const TOTPSetup = () => {
    const [step, setStep] = useState(1); 
    const [qrCodeData, setQrCodeData] = useState(null);
    const [secret, setSecret] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const initSetup = async () => {
            try {
                const data = await setupMFA();
                setQrCodeData(data.qrCode); 
                setSecret(data.secret);
            } catch (error) {
                console.error('MFA setup error:', error);
                toast.error('Failed to initialize MFA setup');
            }
        };

        initSetup();
    }, []);

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await verifyMFASetup(verificationCode);
            setBackupCodes(response.backupCodes);
            setStep(3);

            
            const updatedUser = response.user || user;
            if (updatedUser) {
                updateUser({ ...updatedUser, isTOTPEnabled: true });
            }
            toast.success('Two-factor authentication enabled!');
        } catch (error) {
            console.error('Verification error:', error);
            toast.error('Invalid code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFinish = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Setup Two-Factor Authentication
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enhance your account security
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {step === 1 || step === 2 ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                                    {qrCodeData ? (
                                        <img src={qrCodeData} alt="MFA QR Code" className="w-48 h-48" />
                                    ) : (
                                        <div className="w-48 h-48 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mb-2">
                                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                                </p>
                                <p className="text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded">
                                    Secret: {secret}
                                </p>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-4">
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                        Verification Code
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="code"
                                            type="text"
                                            required
                                            value={verificationCode}
                                            onChange={(e) => {
                                                
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                if (value.length <= 6) {
                                                    setVerificationCode(value);
                                                }
                                            }}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-center tracking-widest text-lg"
                                            placeholder="000000"
                                            maxLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !verificationCode}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify & Enable'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-center text-green-600 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h3 className="text-lg font-medium">Setup Complete!</h3>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Save these backup codes in a secure place. You can use them to login if you lose access to your authenticator app.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-2 gap-2 font-mono text-sm text-center">
                                {backupCodes.map((code, index) => (
                                    <div key={index} className="bg-white p-2 border rounded select-all">
                                        {code}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleFinish}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                I've Saved My Codes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TOTPSetup;
