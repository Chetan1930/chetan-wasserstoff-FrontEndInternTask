
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, Avatar, Badge } from '@/lib/components';
import { Users, Save, Download } from 'lucide-react';

interface User {
  id: string;
  name: string;
  color: string;
  cursorPosition: number;
  selectionStart?: number;
  selectionEnd?: number;
  isActive: boolean;
}

interface Edit {
  id: string;
  userId: string;
  type: 'insert' | 'delete';
  position: number;
  content: string;
  timestamp: number;
}

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
];

export const CollaborativeEditor: React.FC = () => {
  const [content, setContent] = useState('Welcome to the Collaborative Editor!\n\nStart typing to see real-time collaboration in action. Each user gets a unique cursor color and you can see their selections in real-time.\n\nTry opening this in multiple browser tabs to simulate multiple users!');
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [edits, setEdits] = useState<Edit[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize current user
  useEffect(() => {
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const userName = `User ${Math.floor(Math.random() * 1000)}`;
    const userColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    const user: User = {
      id: userId,
      name: userName,
      color: userColor,
      cursorPosition: 0,
      isActive: true
    };
    
    setCurrentUser(user);
    setUsers([user]);
    setIsConnected(true);

    // Simulate other users joining (for demo purposes)
    const demoUsers = [
      { name: 'Alice', color: '#22c55e' },
      { name: 'Bob', color: '#3b82f6' },
      { name: 'Charlie', color: '#ec4899' }
    ];

    const timeouts = demoUsers.map((demoUser, index) => 
      setTimeout(() => {
        const newUser: User = {
          id: `demo-${index}`,
          name: demoUser.name,
          color: demoUser.color,
          cursorPosition: Math.floor(Math.random() * content.length),
          isActive: true
        };
        setUsers(prev => [...prev, newUser]);
      }, 2000 + index * 1000)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Handle text changes
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const cursorPosition = e.target.selectionStart;
    
    setContent(newContent);
    
    if (currentUser) {
      const edit: Edit = {
        id: `edit-${Date.now()}`,
        userId: currentUser.id,
        type: newContent.length > content.length ? 'insert' : 'delete',
        position: cursorPosition,
        content: newContent.length > content.length 
          ? newContent.slice(content.length) 
          : content.slice(newContent.length),
        timestamp: Date.now()
      };
      
      setEdits(prev => [...prev.slice(-50), edit]); // Keep last 50 edits
      
      // Update current user's cursor position
      setUsers(prev => prev.map(user => 
        user.id === currentUser.id 
          ? { ...user, cursorPosition }
          : user
      ));
    }
  }, [content, currentUser]);

  // Handle cursor/selection changes
  const handleSelectionChange = useCallback(() => {
    if (textareaRef.current && currentUser) {
      const { selectionStart, selectionEnd } = textareaRef.current;
      
      setUsers(prev => prev.map(user => 
        user.id === currentUser.id 
          ? { 
              ...user, 
              cursorPosition: selectionStart,
              selectionStart: selectionStart !== selectionEnd ? selectionStart : undefined,
              selectionEnd: selectionStart !== selectionEnd ? selectionEnd : undefined
            }
          : user
      ));
    }
  }, [currentUser]);

  // Simulate random cursor movements for demo users
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => {
        if (user.id.startsWith('demo-') && Math.random() > 0.7) {
          return {
            ...user,
            cursorPosition: Math.floor(Math.random() * content.length),
            isActive: Math.random() > 0.3
          };
        }
        return user;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [content.length]);

  const activeUsers = users.filter(user => user.isActive);
  const recentEdits = edits.slice(-10).reverse();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collaborative Editor</h1>
          <p className="text-gray-600 mt-2">Real-time collaborative text editing with multiple users</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant={isConnected ? 'success' : 'error'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={16} />
            <span>{activeUsers.length} active users</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-96">
            <div className="relative h-full">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleTextChange}
                onSelect={handleSelectionChange}
                onKeyUp={handleSelectionChange}
                onClick={handleSelectionChange}
                className="w-full h-full resize-none border-none outline-none p-4 font-mono text-sm leading-relaxed"
                placeholder="Start typing to collaborate..."
                style={{ fontFamily: 'Monaco, Menlo, Consolas, monospace' }}
              />
              
              {/* User cursors overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {activeUsers.filter(user => user.id !== currentUser?.id).map(user => (
                  <div
                    key={user.id}
                    className="absolute w-0.5 h-5 animate-pulse"
                    style={{
                      backgroundColor: user.color,
                      left: `${Math.random() * 90 + 5}%`,
                      top: `${Math.random() * 80 + 10}%`,
                    }}
                  >
                    <div 
                      className="absolute -top-6 -left-2 px-1 py-0.5 text-xs text-white rounded text-nowrap"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card padding="sm">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Users size={16} className="mr-2" />
              Active Users
            </h3>
            <div className="space-y-2">
              {activeUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Avatar name={user.name} color={user.color} size="sm" />
                  <span className="text-sm font-medium">{user.name}</span>
                  {user.id === currentUser?.id && (
                    <Badge variant="info" size="sm">You</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card padding="sm">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {recentEdits.length > 0 ? recentEdits.map(edit => {
                const user = users.find(u => u.id === edit.userId);
                return (
                  <div key={edit.id} className="text-xs text-gray-600 flex items-center space-x-2">
                    <Avatar name={user?.name || 'Unknown'} color={user?.color} size="sm" />
                    <span>
                      <span className="font-medium">{user?.name}</span> {edit.type}ed text
                    </span>
                  </div>
                );
              }) : (
                <p className="text-xs text-gray-500">No recent activity</p>
              )}
            </div>
          </Card>

          <div className="flex flex-col space-y-2">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Save size={16} />
              <span>Save</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
