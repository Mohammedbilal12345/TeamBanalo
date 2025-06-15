
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Lock, 
  Mail, 
  Bell, 
  Moon, 
  Sun, 
  Shield,
  LogOut,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [emailData, setEmailData] = useState({
    newEmail: '',
    password: ''
  });
  const [notifications, setNotifications] = useState({
    teamRequests: true,
    hackathonUpdates: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const updatePassword = () => {
    // Handle password update
    console.log('Updating password...');
  };

  const updateEmail = () => {
    // Handle email update
    console.log('Updating email...');
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Deleting account...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Account Information */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-electric-blue mr-3" />
              <h2 className="text-2xl font-bold text-white">Account Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-white mb-2 block">Current Email</Label>
                <div className="bg-dark-300/50 border border-white/10 text-gray-300 px-4 py-3 rounded-lg">
                  {user?.email}
                </div>
              </div>
              <div>
                <Label className="text-white mb-2 block">Member Since</Label>
                <div className="bg-dark-300/50 border border-white/10 text-gray-300 px-4 py-3 rounded-lg">
                  January 2025
                </div>
              </div>
            </div>
          </div>

          {/* Change Email */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-electric-blue mr-3" />
              <h2 className="text-2xl font-bold text-white">Change Email Address</h2>
            </div>

            <div className="space-y-4 max-w-md">
              <div>
                <Label className="text-white mb-2 block">New Email Address</Label>
                <Input
                  name="newEmail"
                  type="email"
                  value={emailData.newEmail}
                  onChange={handleEmailChange}
                  className="input-dark"
                  placeholder="Enter new email address"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Current Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={emailData.password}
                  onChange={handleEmailChange}
                  className="input-dark"
                  placeholder="Enter your current password"
                />
              </div>
              <Button onClick={updateEmail} className="btn-electric">
                <Save className="w-4 h-4 mr-2" />
                Update Email
              </Button>
            </div>
          </div>

          {/* Change Password */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-electric-blue mr-3" />
              <h2 className="text-2xl font-bold text-white">Change Password</h2>
            </div>

            <div className="space-y-4 max-w-md">
              <div>
                <Label className="text-white mb-2 block">Current Password</Label>
                <div className="relative">
                  <Input
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="input-dark pr-11"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">New Password</Label>
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input-dark pr-11"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">Confirm New Password</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input-dark"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="text-sm text-gray-400">
                Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
              </div>

              <Button onClick={updatePassword} className="btn-electric">
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-electric-blue mr-3" />
              <h2 className="text-2xl font-bold text-white">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
                  <div>
                    <h3 className="text-white font-medium">
                      {key === 'teamRequests' && 'Team Requests'}
                      {key === 'hackathonUpdates' && 'Hackathon Updates'}
                      {key === 'weeklyDigest' && 'Weekly Digest'}
                      {key === 'marketingEmails' && 'Marketing Emails'}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {key === 'teamRequests' && 'Get notified when someone wants to join your team'}
                      {key === 'hackathonUpdates' && 'Updates about hackathons you\'re interested in'}
                      {key === 'weeklyDigest' && 'Weekly summary of new opportunities'}
                      {key === 'marketingEmails' && 'Product updates and promotional content'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-electric-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-6">
              {theme === 'dark' ? (
                <Moon className="w-6 h-6 text-electric-blue mr-3" />
              ) : (
                <Sun className="w-6 h-6 text-electric-blue mr-3" />
              )}
              <h2 className="text-2xl font-bold text-white">Appearance</h2>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
              <div>
                <h3 className="text-white font-medium">Theme</h3>
                <p className="text-gray-400 text-sm">
                  Choose between light and dark mode
                </p>
              </div>
              <Button onClick={toggleTheme} variant="outline" className="btn-ghost">
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Switch to Light
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Switch to Dark
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-electric-blue mr-3" />
              <h2 className="text-2xl font-bold text-white">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
                <div>
                  <h3 className="text-white font-medium">Profile Visibility</h3>
                  <p className="text-gray-400 text-sm">Control who can see your profile</p>
                </div>
                <select className="input-dark w-auto">
                  <option>Public</option>
                  <option>Teammates Only</option>
                  <option>Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
                <div>
                  <h3 className="text-white font-medium">Show Online Status</h3>
                  <p className="text-gray-400 text-sm">Let others see when you're online</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-electric-blue transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-card rounded-2xl p-6 border border-red-500/20">
            <h2 className="text-2xl font-bold text-red-400 mb-6">Danger Zone</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Sign Out</h3>
                  <p className="text-gray-400 text-sm">Sign out of your account on this device</p>
                </div>
                <Button onClick={logout} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Delete Account</h3>
                  <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
                </div>
                <Button onClick={deleteAccount} className="bg-red-500 hover:bg-red-600 text-white">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
