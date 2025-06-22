import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { deleteAccount, logout } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAccount();
      toast({
        title: 'Account Deleted',
        description: 'Your account has been permanently removed.',
      });
      logout(); // Redirects or clears session
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-100 pt-20 px-4 pb-40">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-6 rounded-2xl border border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
          <p className="text-gray-400 mb-6">Permanently delete your account and all data. This action cannot be undone.</p>

          {!showConfirm ? (
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete Account
            </Button>
          ) : (
            <div className="bg-dark-200 border border-red-500/20 p-4 rounded-xl mt-4 text-center">
              <p className="text-white mb-4">
                Are you sure you want to <span className="text-red-400 font-semibold">permanently delete</span> your account?
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => setShowConfirm(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Confirm Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
