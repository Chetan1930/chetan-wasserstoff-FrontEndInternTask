
import React, { useState, useRef, useCallback } from 'react';
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
    { id: 'me', name: userName, color: userColor },
    ...others.map(other => ({
      id: other.connectionId.toString(),
      name: other.presence?.name || 'Anonymous',
      color: other.presence?.color || '#gray'
    }))
  ].filter(user => user.name);

  return (
    <>
      <UsernameDialog
        isOpen={showUsernameDialog}
        onSubmit={handleUsernameSubmit}
        existingUsers={existingUsers}
      />
      
      <div className="h-screen flex flex-col">
        {/* Simple header with user count */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h1 className="text-xl font-semibold text-gray-900">Collaborative Editor</h1>
          <div className="flex items-center space-x-3">
            {/* Show active users as colored dots */}
            <div className="flex items-center space-x-1">
              {activeUsers.map(user => (
                <div
                  key={user.id}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: user.color }}
                  title={user.name}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{activeUsers.length} online</span>
          </div>
        </div>

        {/* Simple full-screen editor */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextChange}
            onSelect={handleSelectionChange}
            onKeyUp={handleSelectionChange}
            onClick={handleSelectionChange}
            className="w-full h-full resize-none border-none outline-none p-6 font-mono text-sm leading-relaxed bg-gray-50"
            placeholder="Start typing to collaborate in real-time..."
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
      </div>
    </>
  );
};
