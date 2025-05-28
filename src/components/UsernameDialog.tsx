
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface UsernameDialogProps {
  isOpen: boolean;
  onSubmit: (username: string) => void;
  existingUsers: string[];
}

export const UsernameDialog: React.FC<UsernameDialogProps> = ({
  isOpen,
  onSubmit,
  existingUsers
}) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }
    
    if (existingUsers.includes(username.trim())) {
      setError('Username already taken, please choose another');
      return;
    }
    
    setError('');
    onSubmit(username.trim());
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User size={20} />
            <span>Enter Your Username</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a unique username..."
              className="w-full"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
          
          {existingUsers.length > 0 && (
            <div className="text-xs text-gray-500">
              Existing users: {existingUsers.join(', ')}
            </div>
          )}
          
          <Button type="submit" className="w-full">
            Join Collaboration
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
