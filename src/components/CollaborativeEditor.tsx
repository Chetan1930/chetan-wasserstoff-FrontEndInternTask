
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

  const characterCount = content.length;
  const onlineCount = activeUsers.length;

  return (
    <>
      <UsernameDialog
        isOpen={showUsernameDialog}
        onSubmit={handleUsernameSubmit}
        existingUsers={existingUsers}
      />
      
      <div className="h-screen flex flex-col">
        {/* Header with stats */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h1 className="text-xl font-semibold text-gray-900">Collaborative Editor</h1>
          
          <div className="flex items-center space-x-6">
            {/* Character count */}
            <div className="text-sm text-gray-600">
              {characterCount} characters
            </div>
            
            {/* Online users count */}
            <div className="text-sm text-gray-600">
              {onlineCount} online
            </div>
            
            {/* User names */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Users:</span>
              <div className="flex items-center space-x-1">
                {activeUsers.map(user => (
                  <span
                    key={user.id}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Editor */}
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
        </div>
      </div>
    </>
  );
};
