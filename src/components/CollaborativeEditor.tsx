import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, Avatar, Badge } from '@/lib/components';
import { Users, Save, Download } from 'lucide-react';
import { useMyPresence, useOthers, useMutation, useStorage } from '@/lib/liveblocks';
import { UsernameDialog } from './UsernameDialog';

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
];

export const CollaborativeEditor: React.FC = () => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();
  const content = useStorage((root) => root.content) || '';
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [userName, setUserName] = useState('');
  const [userColor] = useState(COLORS[Math.floor(Math.random() * COLORS.length)]);
  const [showUsernameDialog, setShowUsernameDialog] = useState(true);

  const updateContent = useMutation(({ storage }, newContent: string) => {
    storage.set('content', newContent);
  }, []);

  // Get existing usernames
  const existingUsers = others
    .map(other => other.presence?.name)
    .filter(name => name && name.trim() !== '');

  // Handle username submission
  const handleUsernameSubmit = useCallback((username: string) => {
    setUserName(username);
    setShowUsernameDialog(false);
    
    updateMyPresence({
      name: username,
      color: userColor,
      cursor: null,
      cursorPosition: 0
    });
  }, [userColor, updateMyPresence]);

  // Handle text changes
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const cursorPosition = e.target.selectionStart;
    
    updateContent(newContent);
    
    updateMyPresence({
      cursorPosition,
      selectionStart: e.target.selectionStart !== e.target.selectionEnd ? e.target.selectionStart : undefined,
      selectionEnd: e.target.selectionStart !== e.target.selectionEnd ? e.target.selectionEnd : undefined
    });
  }, [updateContent, updateMyPresence]);

  // Handle cursor/selection changes
  const handleSelectionChange = useCallback(() => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current;
      
      updateMyPresence({
        cursorPosition: selectionStart,
        selectionStart: selectionStart !== selectionEnd ? selectionStart : undefined,
        selectionEnd: selectionStart !== selectionEnd ? selectionEnd : undefined
      });
    }
  }, [updateMyPresence]);

  const activeUsers = [
    { id: 'me', name: userName, color: userColor, isActive: true },
    ...others.map(other => ({
      id: other.connectionId.toString(),
      name: other.presence?.name || 'Anonymous',
      color: other.presence?.color || '#gray',
      isActive: true
    }))
  ].filter(user => user.name);

  return (
    <>
      <UsernameDialog
        isOpen={showUsernameDialog}
        onSubmit={handleUsernameSubmit}
        existingUsers={existingUsers}
      />
      
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Collaborative Editor</h1>
            <p className="text-gray-600 mt-2">Real-time collaborative text editing with Liveblocks</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="success">
              Connected
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
                  placeholder="Start typing to collaborate in real-time..."
                  style={{ fontFamily: 'Monaco, Menlo, Consolas, monospace' }}
                  disabled={!userName}
                />
                
                {/* User cursors overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {others.map(other => {
                    if (!other.presence?.name) return null;
                    return (
                      <div
                        key={other.connectionId}
                        className="absolute w-0.5 h-5 animate-pulse"
                        style={{
                          backgroundColor: other.presence.color,
                          left: `${Math.random() * 90 + 5}%`,
                          top: `${Math.random() * 80 + 10}%`,
                        }}
                      >
                        <div 
                          className="absolute -top-6 -left-2 px-1 py-0.5 text-xs text-white rounded text-nowrap"
                          style={{ backgroundColor: other.presence.color }}
                        >
                          {other.presence.name}
                        </div>
                      </div>
                    );
                  })}
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
                    {user.id === 'me' && (
                      <Badge variant="info" size="sm">You</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="sm">
              <h3 className="font-semibold text-gray-900 mb-3">Collaboration Status</h3>
              <div className="space-y-2">
                <div className="text-xs text-gray-600">
                  Connected users: {others.length + 1}
                </div>
                <div className="text-xs text-gray-600">
                  Document length: {content.length} characters
                </div>
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
    </>
  );
};
