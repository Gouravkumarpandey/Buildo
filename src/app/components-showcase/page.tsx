'use client';

import React from 'react';
import { NeoButton } from '@/components/Neo/NeoButton';
import { NeoCard } from '@/components/Neo/NeoCard';
import { NeoInput, NeoTextarea } from '@/components/Neo/NeoInput';
import { NeoBadge, NeoTag } from '@/components/Neo/NeoBadge';
import { NeoCircle, NeoSquare, NeoTriangle, NeoSticker } from '@/components/Neo/NeoShapes';
import { Zap, Heart } from 'lucide-react';

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl font-display font-900 mb-4">
            Neo Component Showcase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            A complete showcase of all Neobrutalist UI components. Copy these examples to use in your pages.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Buttons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Variants */}
            <NeoCard padding="lg" bgColor="white">
              <h3 className="font-display font-800 text-xl mb-6">Variants</h3>
              <div className="space-y-4">
                <NeoButton variant="primary" size="md">Primary</NeoButton>
                <NeoButton variant="secondary" size="md">Secondary</NeoButton>
                <NeoButton variant="pink" size="md">Pink</NeoButton>
                <NeoButton variant="green" size="md">Green</NeoButton>
                <NeoButton variant="orange" size="md">Orange</NeoButton>
                <NeoButton variant="outline" size="md">Outline</NeoButton>
              </div>
            </NeoCard>

            {/* Sizes */}
            <NeoCard padding="lg" bgColor="white">
              <h3 className="font-display font-800 text-xl mb-6">Sizes</h3>
              <div className="space-y-4">
                <NeoButton variant="primary" size="sm">Small Button</NeoButton>
                <NeoButton variant="primary" size="md">Medium Button</NeoButton>
                <NeoButton variant="primary" size="lg">Large Button</NeoButton>
              </div>
            </NeoCard>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NeoCard padding="lg" shadow="lg" bgColor="white">
              <h3 className="font-display font-800 mb-2">White Card</h3>
              <p className="text-gray-600 mb-4">A default white card with shadow and border.</p>
              <NeoButton variant="primary" size="sm">Action</NeoButton>
            </NeoCard>

            <NeoCard padding="lg" shadow="lg" bgColor="blue">
              <h3 className="font-display font-800 mb-2 text-white">Blue Card</h3>
              <p className="text-white/90 mb-4">A blue card for important information.</p>
              <button className="text-white font-display font-800 underline text-sm">Learn More →</button>
            </NeoCard>

            <NeoCard padding="lg" shadow="lg" bgColor="pink">
              <h3 className="font-display font-800 mb-2 text-white">Pink Card</h3>
              <p className="text-white/90 mb-4">A pink card for special features.</p>
              <button className="text-white font-display font-800 underline text-sm">Explore →</button>
            </NeoCard>
          </div>
        </section>

        {/* Badges & Tags Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Badges & Tags</h2>
          
          <NeoCard padding="lg" bgColor="white">
            <div className="space-y-6">
              {/* Badges */}
              <div>
                <h3 className="font-display font-800 text-lg mb-4">Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <NeoBadge variant="primary">Primary</NeoBadge>
                  <NeoBadge variant="pink">Featured</NeoBadge>
                  <NeoBadge variant="green">Success</NeoBadge>
                  <NeoBadge variant="orange">Live</NeoBadge>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-display font-800 text-lg mb-4">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  <NeoTag color="blue">React</NeoTag>
                  <NeoTag color="pink">Deployment</NeoTag>
                  <NeoTag color="green">Production</NeoTag>
                </div>
              </div>
            </div>
          </NeoCard>
        </section>

        {/* Forms Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Form Elements</h2>
          
          <NeoCard padding="lg" bgColor="white">
            <form className="space-y-6">
              <NeoInput
                label="Email Address"
                type="email"
                placeholder="your@email.com"
              />
              
              <NeoInput
                label="Password"
                type="password"
                placeholder="••••••••"
              />

              <NeoTextarea
                label="Message"
                placeholder="Type your message here..."
                rows={4}
              />

              <NeoInput
                label="With Error"
                error="This field is required"
                placeholder="Enter value"
              />

              <NeoButton variant="primary" size="md">Submit Form</NeoButton>
            </form>
          </NeoCard>
        </section>

        {/* Decorative Shapes */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Decorative Elements</h2>
          
          <NeoCard padding="lg" bgColor="white" className="relative h-80">
            <div className="relative w-full h-full">
              <NeoCircle className="top-8 right-12 w-24 h-24" animate />
              <NeoSquare className="bottom-12 left-8 w-32 h-32" animate />
              <NeoTriangle className="top-1/3 right-1/4" animate />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <NeoSticker rotation={-8} className="text-center">
                  <div className="font-display font-900 text-2xl">✨</div>
                  <div className="text-xs font-display font-800 mt-1">HELLO!</div>
                </NeoSticker>
              </div>
            </div>
          </NeoCard>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Color Palette</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Blue', color: 'bg-blue-600' },
              { name: 'Pink', color: 'bg-pink-600' },
              { name: 'Green', color: 'bg-green-600' },
              { name: 'Orange', color: 'bg-orange-600' },
              { name: 'Purple', color: 'bg-purple-600' },
              { name: 'Yellow', color: 'bg-yellow-400' },
              { name: 'Black', color: 'bg-black' },
              { name: 'Gray', color: 'bg-gray-300 border-2 border-black' },
            ].map((item) => (
              <div key={item.name} className="text-center">
                <div className={`${item.color} border-4 border-black dark:border-white rounded-neo h-24 mb-2`} />
                <p className="font-display font-800 text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Typography</h2>
          
          <NeoCard padding="lg" bgColor="white" className="space-y-8">
            <div>
              <p className="text-xs font-display font-700 uppercase tracking-widest text-gray-600 mb-2">Heading 1</p>
              <h1 className="text-5xl font-display font-900">This is a large heading</h1>
            </div>

            <div>
              <p className="text-xs font-display font-700 uppercase tracking-widest text-gray-600 mb-2">Heading 2</p>
              <h2 className="text-3xl font-display font-900">This is a medium heading</h2>
            </div>

            <div>
              <p className="text-xs font-display font-700 uppercase tracking-widest text-gray-600 mb-2">Heading 3</p>
              <h3 className="text-2xl font-display font-800">This is a smaller heading</h3>
            </div>

            <div>
              <p className="text-xs font-display font-700 uppercase tracking-widest text-gray-600 mb-2">Body Text</p>
              <p className="text-lg leading-relaxed">This is regular body text. It uses the Inter font family and has a comfortable line height for readability.</p>
            </div>

            <div>
              <p className="text-xs font-display font-700 uppercase tracking-widest text-gray-600 mb-2">Code/Mono</p>
              <code className="font-mono text-sm bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-neo border-2 border-black dark:border-white">const greeting = "Hello Neobrutalism!";</code>
            </div>
          </NeoCard>
        </section>

        {/* Usage Example */}
        <section className="mb-16">
          <h2 className="text-4xl font-display font-900 mb-8">Implementation Guide</h2>
          
          <NeoCard padding="lg" bgColor="white">
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-800 text-lg mb-4">Button Example</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-neo font-mono text-sm overflow-x-auto">
                  <pre>{`import { NeoButton } from '@/components/Neo';

export default function MyComponent() {
  return (
    <NeoButton 
      variant="primary" 
      size="lg"
      onClick={() => console.log('Clicked!')}
    >
      Click Me
    </NeoButton>
  );
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-display font-800 text-lg mb-4">Card Example</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-neo font-mono text-sm overflow-x-auto">
                  <pre>{`import { NeoCard } from '@/components/Neo';

export default function MyCard() {
  return (
    <NeoCard 
      padding="lg" 
      shadow="lg" 
      bgColor="white"
      hover
    >
      <h3>Card Title</h3>
      <p>Card content goes here...</p>
    </NeoCard>
  );
}`}</pre>
                </div>
              </div>
            </div>
          </NeoCard>
        </section>

        {/* Footer */}
        <div className="border-t-4 border-black dark:border-white pt-12 mt-16">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            <strong>Neobrutalist Design System</strong> — Built for Buildo with bold colors, thick borders, and playful typography. All components are responsive and accessible.
          </p>
        </div>
      </div>
    </div>
  );
}
