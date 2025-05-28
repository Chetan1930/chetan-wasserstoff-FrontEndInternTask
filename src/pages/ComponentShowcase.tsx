
import React, { useState } from 'react';
import { Button, Card, Input, Badge, Avatar } from '@/lib/components';
import { Code, Copy, Check, Eye, EyeOff } from 'lucide-react';

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

const ComponentShowcase: React.FC = () => {
  const [showCode, setShowCode] = useState<{ [key: string]: boolean }>({});

  const toggleCode = (component: string) => {
    setShowCode(prev => ({ ...prev, [component]: !prev[component] }));
  };

  const buttonCode = `import { Button } from '@/lib/components';

<Button variant="primary" size="lg">
  Primary Button
</Button>

<Button variant="outline" size="md">
  Outline Button
</Button>`;

  const cardCode = `import { Card } from '@/lib/components';

<Card hover padding="lg" shadow="lg">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>`;

  const inputCode = `import { Input } from '@/lib/components';

<Input
  label="Username"
  placeholder="Enter username"
  error="This field is required"
  icon={<User size={16} />}
/>`;

  const badgeCode = `import { Badge } from '@/lib/components';

<Badge variant="success">Success</Badge>
<Badge variant="warning" size="sm">Warning</Badge>
<Badge variant="error">Error</Badge>`;

  const avatarCode = `import { Avatar } from '@/lib/components';

<Avatar name="John Doe" size="lg" />
<Avatar name="Jane Smith" color="bg-purple-500" />`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Documentation</h1>
          <p className="text-xl text-gray-600">Complete guide to using our custom component library</p>
        </div>

        <div className="space-y-12">
          {/* Button Component */}
          <section>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Code size={24} className="mr-2" />
                    Button Component
                  </h2>
                  <p className="text-gray-600 mt-2">Versatile button component with multiple variants and sizes</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => toggleCode('button')}
                >
                  {showCode.button ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showCode.button ? 'Hide' : 'Show'} Code
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Variants</h4>
                  <div className="space-y-2">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Sizes</h4>
                  <div className="space-y-2">
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                  </div>
                </div>
              </div>

              {showCode.button && <CodeBlock code={buttonCode} language="tsx" />}
            </Card>
          </section>

          {/* Card Component */}
          <section>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Card Component</h2>
                  <p className="text-gray-600 mt-2">Flexible container component with customizable padding and shadows</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => toggleCode('card')}
                >
                  {showCode.card ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showCode.card ? 'Hide' : 'Show'} Code
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card padding="sm" shadow="sm" className="bg-blue-50">
                  <p className="text-sm">Small padding & shadow</p>
                </Card>
                <Card padding="md" shadow="md" className="bg-green-50">
                  <p className="text-sm">Medium padding & shadow</p>
                </Card>
                <Card padding="lg" shadow="lg" className="bg-purple-50">
                  <p className="text-sm">Large padding & shadow</p>
                </Card>
              </div>

              {showCode.card && <CodeBlock code={cardCode} language="tsx" />}
            </Card>
          </section>

          {/* Input Component */}
          <section>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Input Component</h2>
                  <p className="text-gray-600 mt-2">Form input with label, error states, and icon support</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => toggleCode('input')}
                >
                  {showCode.input ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showCode.input ? 'Hide' : 'Show'} Code
                </Button>
              </div>

              <div className="space-y-4 max-w-md mb-6">
                <Input label="Standard Input" placeholder="Enter text here" />
                <Input label="Input with Error" placeholder="Enter text" error="This field is required" />
                <Input label="Disabled Input" placeholder="Disabled" disabled />
              </div>

              {showCode.input && <CodeBlock code={inputCode} language="tsx" />}
            </Card>
          </section>

          {/* Badge Component */}
          <section>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Badge Component</h2>
                  <p className="text-gray-600 mt-2">Status indicators and labels with semantic color variants</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => toggleCode('badge')}
                >
                  {showCode.badge ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showCode.badge ? 'Hide' : 'Show'} Code
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>

              {showCode.badge && <CodeBlock code={badgeCode} language="tsx" />}
            </Card>
          </section>

          {/* Avatar Component */}
          <section>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Avatar Component</h2>
                  <p className="text-gray-600 mt-2">User profile pictures with automatic initials and color generation</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => toggleCode('avatar')}
                >
                  {showCode.avatar ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showCode.avatar ? 'Hide' : 'Show'} Code
                </Button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <Avatar name="Alice Johnson" size="sm" />
                <Avatar name="Bob Williams" size="md" />
                <Avatar name="Charlie Davis" size="lg" />
                <Avatar name="Diana Miller" color="bg-purple-500" />
              </div>

              {showCode.avatar && <CodeBlock code={avatarCode} language="tsx" />}
            </Card>
          </section>
        </div>

        {/* Footer */}
        <Card className="mt-12 text-center" padding="lg">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to start building?</h3>
          <p className="text-gray-600 mb-4">
            Copy the components to your project and start creating amazing user interfaces.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary">Download Components</Button>
            <Button variant="outline">View on GitHub</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentShowcase;
