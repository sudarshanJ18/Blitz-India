import React, { useState } from 'react';
import { setupMFA, verifyMFASetup, disableMFA } from '../../services/auth.service';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

const MFASetup = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState('initial'); // initial, setup, verify, success, disable
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [showSecret, setShowSecret] = useState(false);
    const [copied, setCopied] = useState(false);
    const [totpCode, setTotpCode] = useState('');
    const [password, setPassword] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleStartSetup = async () => {
        try {
            setLoading(true);
            const response = await setupMFA();
            setQrCode(response.qrCode);
            setSecret(response.secret);
            setStep('setup');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to start MFA setup');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySetup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await verifyMFASetup(totpCode);
            setBackupCodes(response.backupCodes);
            setStep('success');
            toast.success('MFA Enabled Successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDisableMFA = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await disableMFA(password);
            toast.success('MFA Disabled Successfully');
            // Logout to force re-login and refresh state
            logout();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to disable MFA');
        } finally {
            setLoading(false);
        }
    };

    const handleCopySecret = async () => {
        try {
            await navigator.clipboard.writeText(secret);
            setCopied(true);
            toast.success('Secret key copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Failed to copy secret key');
        }
    };

    const maskSecret = (secret) => {
        return '●'.repeat(secret.length);
    };

    if (user?.totpEnabled && step !== 'disable') {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
                        <p className="text-green-600 font-medium flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Enabled and Secure
                        </p>
                    </div>
                    <button
                        onClick={() => setStep('disable')}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        Disable MFA
                    </button>
                </div>
            </div >
        );
    }

    if (step === 'disable') {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Disable MFA</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure? Disabling MFA will make your account less secure.
                    You will need to enter your password to confirm.
                </p>
                <form onSubmit={handleDisableMFA} className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Disabling...' : 'Disable MFA'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('initial')}
                            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">MFA Setup Complete!</h2>
                    <p className="text-gray-600 mt-2">Your account is now secured with two-factor authentication.</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Save Your Backup Codes</h3>
                    <p className="text-yellow-700 text-sm mb-4">
                        If you lose access to your authenticator app, these codes are the ONLY way to access your account.
                        <strong> Store them in a safe place immediately.</strong> They will not be shown again.
                    </p>
                    <div className="grid grid-cols-2 gap-4 font-mono text-sm bg-white p-4 rounded-lg border border-yellow-100">
                        {backupCodes.map((code, index) => (
                            <div key={index} className="text-gray-800">{code}</div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => {
                        // Navigate to dashboard and reload to update auth state
                        window.location.href = '/admin/dashboard';
                    }}
                    className="w-full py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold"
                >
                    I have saved my backup codes & Continue to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
            <p className="text-gray-600 mb-6">Add an extra layer of security to your account by enabling TOTP MFA.</p>

            {step === 'initial' && (
                <button
                    onClick={handleStartSetup}
                    disabled={loading}
                    className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 disabled:opacity-50"
                >
                    {loading ? 'Starting...' : 'Enable MFA'}
                </button>
            )}

            {step === 'setup' && (
                <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* QR Code Section */}
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Scan QR Code</h3>
                            <img src={qrCode} alt="MFA QR Code" className="w-48 h-48 mb-4 border-4 border-white rounded-lg shadow-md" />
                            <p className="text-sm text-gray-600 text-center mb-4">
                                Scan with any authenticator app:
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-500">
                                <span className="bg-white px-2 py-1 rounded border">Google Authenticator</span>
                                <span className="bg-white px-2 py-1 rounded border">Microsoft Authenticator</span>
                                <span className="bg-white px-2 py-1 rounded border">Authy</span>
                                <span className="bg-white px-2 py-1 rounded border">1Password</span>
                            </div>

                            {/* Secret Key Display */}
                            <div className="mt-6 w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Or enter this secret key manually:
                                </label>
                                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-300">
                                    <input
                                        type="text"
                                        value={showSecret ? secret : maskSecret(secret)}
                                        readOnly
                                        className="flex-1 font-mono text-sm bg-transparent border-none outline-none select-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSecret(!showSecret)}
                                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                        title={showSecret ? 'Hide secret' : 'Show secret'}
                                    >
                                        {showSecret ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCopySecret}
                                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                        title="Copy secret"
                                    >
                                        {copied ? (
                                            <Check className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Verification Section */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Verify Setup</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Enter the 6-digit code from your authenticator app to verify the setup.
                            </p>
                            <form onSubmit={handleVerifySetup} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        value={totpCode}
                                        onChange={(e) => {
                                            // Only allow numeric input
                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                            if (value.length <= 6) {
                                                setTotpCode(value);
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center tracking-widest text-xl font-mono"
                                        placeholder="000000"
                                        maxLength={6}
                                        required
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || totpCode.length !== 6}
                                    className="w-full py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Verifying...' : 'Verify & Enable'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MFASetup;
