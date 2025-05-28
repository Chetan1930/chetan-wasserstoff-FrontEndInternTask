
import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  color,
  size = 'md',
  className
}) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };
  
  const defaultColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
  ];
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const backgroundColor = color || defaultColors[colorIndex % defaultColors.length];

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center text-white font-medium',
        backgroundColor,
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
};
