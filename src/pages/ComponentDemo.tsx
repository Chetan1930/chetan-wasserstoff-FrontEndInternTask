
import React, { useState } from 'react';
import { Button, Card, Input, Badge, Avatar } from '@/lib/components';
import { Search, Star, Heart, Download, User } from 'lucide-react';

const ComponentDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 3 && e.target.value.length > 0) {
      setInputError('Must be at least 3 characters');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library Demo</h1>
          <p className="text-xl text-gray-600">Showcasing our custom UI components built with TypeScript and CSS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Button Components */}
          <Card hover className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Buttons</h3>
            <div className="space-y-3">
              <Button variant="primary" size="lg">Primary Large</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline" size="sm">Outline Small</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="primary" size="sm">
                <Star size={16} className="mr-2" />
                Star
              </Button>
              <Button variant="outline" size="sm">
                <Heart size={16} className="mr-2" />
                Like
              </Button>
            </div>
          </Card>

          {/* Input Components */}
          <Card hover className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Inputs</h3>
            <Input
              label="Username"
              placeholder="Enter your username"
              value={inputValue}
              onChange={handleInputChange}
              error={inputError}
            />
            <Input
              label="Search"
              placeholder="Search for something..."
              icon={<Search size={16} />}
            />
            <Input
              label="Disabled Input"
              placeholder="This is disabled"
              disabled
            />
          </Card>

          {/* Badge Components */}
          <Card hover className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" size="sm">Small</Badge>
              <Badge variant="info" size="md">Medium</Badge>
            </div>
          </Card>

          {/* Avatar Components */}
          <Card hover className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Avatars</h3>
            <div className="flex items-center space-x-4">
              <Avatar name="John Doe" size="sm" />
              <Avatar name="Jane Smith" size="md" />
              <Avatar name="Bob Johnson" size="lg" />
            </div>
            <div className="flex items-center space-x-4">
              <Avatar name="Alice Cooper" color="bg-purple-500" />
              <Avatar name="Charlie Brown" color="bg-green-500" />
              <Avatar name="Diana Prince" color="bg-red-500" />
            </div>
          </Card>

          {/* Card Variations */}
          <Card hover className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Card Variations</h3>
            <Card padding="sm" shadow="sm" className="bg-blue-50">
              <p className="text-sm">Small padding, small shadow</p>
            </Card>
            <Card padding="lg" shadow="lg" className="bg-green-50">
              <p className="text-sm">Large padding, large shadow</p>
            </Card>
            <Card padding="none" shadow="none" className="border-2 border-dashed border-gray-300">
              <div className="p-4">
                <p className="text-sm">No padding, no shadow, dashed border</p>
              </div>
            </Card>
          </Card>

          {/* Interactive Example */}
          <Card hover className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Interactive Example</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Avatar name="Current User" size="sm" />
                <span className="text-sm font-medium">Welcome back!</span>
                <Badge variant="success" size="sm">Online</Badge>
              </div>
              <Input
                placeholder="Type a message..."
                icon={<User size={16} />}
              />
              <div className="flex space-x-2">
                <Button variant="primary" size="sm">
                  <Download size={16} className="mr-2" />
                  Send
                </Button>
                <Button variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Large Feature Card */}
        <Card className="mt-12 text-center space-y-6" padding="lg">
          <h2 className="text-3xl font-bold text-gray-900">Custom Component Library</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with TypeScript and pure CSS classes, these components are reusable, 
            self-contained, and designed for modern web applications. Each component 
            is under 200 lines and follows best practices for maintainability.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" size="lg">Get Started</Button>
            <Button variant="outline" size="lg">View Docs</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentDemo;
