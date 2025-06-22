import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Github, LogIn } from 'lucide-react';

const Login = () => {
  const { loginWithGoogle, loginWithGitHub, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1c1c1c]">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl border border-white/10 bg-white/5">

        {/* Logo with Glow */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-purple-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
            <img src="/logo.png" alt="TeamBanalo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-4">Welcome to TeamBanalo</h1>
          <p className="text-sm text-gray-400 mt-1">Build. Connect. Win.</p>
        </div>

        {/* Divider */}
        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-electric-blue to-purple-500 rounded-full mb-6" />

        <p className="text-gray-400 mb-6 text-center text-sm">Continue with one of your accounts</p>

        {/* Google Button */}
        <Button
          onClick={loginWithGoogle}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 mb-4 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          <LogIn className="w-5 h-5" />
          Continue with Google
        </Button>

        {/* GitHub Button */}
        <Button
          onClick={loginWithGitHub}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#0d1117] text-white font-semibold py-2 rounded-lg hover:bg-[#161b22] transition duration-200"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </Button>

        {/* Footer note */}
        <p className="text-xs text-gray-500 text-center mt-6">By continuing, you agree to our terms and privacy policy.</p>
      </div>
    </div>
  );
};

export default Login;
