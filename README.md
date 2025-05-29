
# CollaboEdit - Real-Time Collaborative Editor

A modern real-time collaborative text editor with a custom component library built using React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Collaborative Editor
- **Real-time collaboration**: Multiple users can edit simultaneously
- **User identification**: Unique avatars and colors for each user
- **Live cursors**: See other users' cursor positions in real-time
- **Activity tracking**: Monitor recent edits and user activity
- **Responsive design**: Works seamlessly on all devices

### Custom Component Library
- **Button**: Multiple variants (primary, secondary, outline, ghost) and sizes
- **Card**: Flexible container with customizable padding and shadows
- **Input**: Form inputs with labels, error states, and icon support
- **Badge**: Status indicators with semantic color variants
- **Avatar**: User profile pictures with automatic initials generation

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Chetan1930/chetan-wasserstoff-FrontEndInternTask
cd chetan-wasserstoff-FrontEndInternTask
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🧩 Component Library Usage

All components are located in `/src/lib/components/` and can be imported individually:

### Button Component
```tsx
import { Button } from '@/lib/components';

<Button variant="primary" size="lg">
  Click me
</Button>
```

### Card Component
```tsx
import { Card } from '@/lib/components';

<Card hover padding="lg" shadow="lg">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Input Component
```tsx
import { Input } from '@/lib/components';

<Input
  label="Username"
  placeholder="Enter username"
  error="This field is required"
  icon={<User size={16} />}
/>
```

### Badge Component
```tsx
import { Badge } from '@/lib/components';

<Badge variant="success">Success</Badge>
<Badge variant="warning" size="sm">Warning</Badge>
```

### Avatar Component
```tsx
import { Avatar } from '@/lib/components';

<Avatar name="John Doe" size="lg" />
<Avatar name="Jane Smith" color="bg-purple-500" />
```

## 📁 Project Structure

```
src/
├── lib/
│   └── components/          # Custom component library
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Avatar.tsx
│       └── index.ts
├── components/
│   ├── CollaborativeEditor.tsx
│   └── Navigation.tsx
├── pages/                   # Demo pages
│   ├── Index.tsx           # Main editor page
│   ├── ComponentDemo.tsx   # Interactive component demos
│   └── ComponentShowcase.tsx # Component documentation
└── ...
```

## 🎯 Demo Pages

1. **Main Editor** (`/`) - The collaborative text editor
2. **Component Demo** (`/demo`) - Interactive showcase of all components
3. **Documentation** (`/showcase`) - Complete component documentation with code examples

## 🚀 Deployment

The application can be deployed to any static hosting service:

```bash
npm run build
```

This creates a `dist` folder with the production build.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 Component Design Principles

- **Reusable**: Each component is self-contained and reusable
- **TypeScript**: Full type safety with proper interfaces
- **Accessible**: Built with accessibility in mind
- **Customizable**: Props for styling and behavior customization
- **Lightweight**: Each component under 200 lines of code
- **Modern**: Uses latest React patterns and best practices

## 🔧 Development

- Hot reload for instant feedback
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for rapid styling
- Component-driven development

## 📄 License

MIT License - feel free to use this project for learning and development!
