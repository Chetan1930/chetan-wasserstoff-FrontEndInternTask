
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/lib/components';
import { Code, Edit3 } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Edit3 size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">CollaboEdit</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Code size={16} className="mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
