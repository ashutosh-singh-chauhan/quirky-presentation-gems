
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Shield, GitBranch, Cpu, Layers } from 'lucide-react';

// Reusable components for slides
const SlideTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2 
    className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight slide-appear"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.h2>
);

const SlideSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h3 
    className="text-xl font-semibold mb-3 slide-appear"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    {children}
  </motion.h3>
);

const SlideSubtitle = ({ children }: { children: React.ReactNode }) => (
  <motion.p 
    className="text-lg text-muted-foreground mb-8 max-w-2xl slide-appear"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    {children}
  </motion.p>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    className="code-block text-sm md:text-base slide-appear"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    {children}
  </motion.div>
);

const BestPracticeItem = ({ 
  icon, 
  title, 
  description, 
  delay = 0
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  delay?: number
}) => (
  <motion.div 
    className="flex gap-4 mb-6 slide-appear"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 + delay }}
  >
    <div className="mt-1 text-primary">
      {icon}
    </div>
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

// TypeScript Slides
const TypeScriptIntro = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-black/5 text-xs font-semibold tracking-wide uppercase slide-appear">
      Part 1
    </div>
    <SlideTitle>TypeScript Best Practices</SlideTitle>
    <SlideSubtitle>
      Writing clean, type-safe code that enhances developer experience and prevents bugs
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      <BestPracticeItem 
        icon={<Shield size={24} />}
        title="Type Safety" 
        description="Leverage TypeScript's static type system to catch errors during development rather than at runtime."
        delay={0}
      />
      <BestPracticeItem 
        icon={<GitBranch size={24} />}
        title="Interface Segregation" 
        description="Create small, focused interfaces rather than large monolithic ones."
        delay={0.1}
      />
      <BestPracticeItem 
        icon={<Cpu size={24} />}
        title="Strict Mode" 
        description="Enable strict mode to ensure type safety throughout your codebase."
        delay={0.2}
      />
      <BestPracticeItem 
        icon={<Layers size={24} />}
        title="Discriminated Unions" 
        description="Use discriminated unions to handle complex type relationships."
        delay={0.3}
      />
    </div>
  </div>
);

const TypeScriptTypes = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Proper Type Definitions</SlideTitle>
    <SlideSubtitle>
      Define proper types to enhance code readability and prevent errors
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Use Specific Types</SlideSectionTitle>
        <CodeBlock>
          <pre>{`// Bad
<span class="keyword">function</span> <span class="function">processUser</span>(<span class="variable">user</span>: <span class="keyword">any</span>): <span class="keyword">any</span> {
  <span class="keyword">return</span> user.name;
}

// Good
<span class="keyword">interface</span> <span class="type">User</span> {
  <span class="variable">id</span>: <span class="type">number</span>;
  <span class="variable">name</span>: <span class="type">string</span>;
  <span class="variable">email</span>: <span class="type">string</span>;
}

<span class="keyword">function</span> <span class="function">processUser</span>(<span class="variable">user</span>: <span class="type">User</span>): <span class="type">string</span> {
  <span class="keyword">return</span> user.name;
}`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>Discriminated Unions</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="keyword">type</span> <span class="type">Success</span> = {
  <span class="variable">status</span>: <span class="string">'success'</span>;
  <span class="variable">data</span>: <span class="type">User</span>[];
};

<span class="keyword">type</span> <span class="type">Loading</span> = {
  <span class="variable">status</span>: <span class="string">'loading'</span>;
};

<span class="keyword">type</span> <span class="type">Error</span> = {
  <span class="variable">status</span>: <span class="string">'error'</span>;
  <span class="variable">error</span>: <span class="type">string</span>;
};

<span class="keyword">type</span> <span class="type">ApiState</span> = <span class="type">Success</span> | <span class="type">Loading</span> | <span class="type">Error</span>;

<span class="keyword">function</span> <span class="function">renderState</span>(<span class="variable">state</span>: <span class="type">ApiState</span>) {
  <span class="keyword">switch</span> (state.status) {
    <span class="keyword">case</span> <span class="string">'success'</span>:
      <span class="keyword">return</span> <span class="function">renderUsers</span>(state.data);
    <span class="keyword">case</span> <span class="string">'loading'</span>:
      <span class="keyword">return</span> <span class="function">renderLoader</span>();
    <span class="keyword">case</span> <span class="string">'error'</span>:
      <span class="keyword">return</span> <span class="function">renderError</span>(state.error);
  }
}`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

const TypeScriptUtilityTypes = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Utility Types</SlideTitle>
    <SlideSubtitle>
      Leverage TypeScript's built-in utility types for common type transformations
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Common Utility Types</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="keyword">interface</span> <span class="type">User</span> {
  <span class="variable">id</span>: <span class="type">number</span>;
  <span class="variable">name</span>: <span class="type">string</span>;
  <span class="variable">email</span>: <span class="type">string</span>;
  <span class="variable">createdAt</span>: <span class="type">Date</span>;
}

<span class="comment">// Make all properties optional</span>
<span class="keyword">type</span> <span class="type">PartialUser</span> = <span class="type">Partial</span><<span class="type">User</span>>;

<span class="comment">// Make all properties required</span>
<span class="keyword">type</span> <span class="type">RequiredUser</span> = <span class="type">Required</span><<span class="type">User</span>>;

<span class="comment">// Create a type with only select properties</span>
<span class="keyword">type</span> <span class="type">UserBasicInfo</span> = <span class="type">Pick</span><<span class="type">User</span>, <span class="string">'name'</span> | <span class="string">'email'</span>>;

<span class="comment">// Create a type that omits specific properties</span>
<span class="keyword">type</span> <span class="type">UserWithoutMetadata</span> = <span class="type">Omit</span><<span class="type">User</span>, <span class="string">'createdAt'</span>>;

<span class="comment">// Extract only the keys of an interface</span>
<span class="keyword">type</span> <span class="type">UserKeys</span> = <span class="type">keyof</span> <span class="type">User</span>; <span class="comment">// 'id' | 'name' | 'email' | 'createdAt'</span>`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>Custom Utility Types</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// NonNullable: Remove null and undefined from type</span>
<span class="keyword">type</span> <span class="type">MaybeUser</span> = <span class="type">User</span> | <span class="keyword">null</span> | <span class="keyword">undefined</span>;
<span class="keyword">type</span> <span class="type">DefiniteUser</span> = <span class="type">NonNullable</span><<span class="type">MaybeUser</span>>;

<span class="comment">// ReturnType: Extract return type of a function</span>
<span class="keyword">function</span> <span class="function">getUser</span>(): <span class="type">User</span> {
  <span class="keyword">return</span> {
    <span class="variable">id</span>: <span class="number">1</span>,
    <span class="variable">name</span>: <span class="string">'John Doe'</span>,
    <span class="variable">email</span>: <span class="string">'john@example.com'</span>,
    <span class="variable">createdAt</span>: <span class="keyword">new</span> <span class="function">Date</span>()
  };
}

<span class="keyword">type</span> <span class="type">GetUserReturnType</span> = <span class="type">ReturnType</span><<span class="keyword">typeof</span> <span class="function">getUser</span>>;

<span class="comment">// Custom: DeepReadonly utility</span>
<span class="keyword">type</span> <span class="type">DeepReadonly</span><<span class="type">T</span>> = {
  <span class="keyword">readonly</span> [<span class="variable">P</span> <span class="keyword">in</span> <span class="type">keyof</span> <span class="type">T</span>]: <span class="type">DeepReadonly</span><<span class="type">T</span>[<span class="variable">P</span>]>;
};

<span class="keyword">type</span> <span class="type">ReadonlyUser</span> = <span class="type">DeepReadonly</span><<span class="type">User</span>>;`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

const TypeScriptBestPractices = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>TypeScript Best Practices</SlideTitle>
    <SlideSubtitle>
      Strategies for writing maintainable TypeScript code
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <SlideSectionTitle>Enable Strict Mode</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// tsconfig.json</span>
{
  <span class="string">"compilerOptions"</span>: {
    <span class="string">"strict"</span>: <span class="keyword">true</span>,
    <span class="string">"noImplicitAny"</span>: <span class="keyword">true</span>,
    <span class="string">"strictNullChecks"</span>: <span class="keyword">true</span>,
    <span class="string">"strictFunctionTypes"</span>: <span class="keyword">true</span>,
    <span class="string">"strictBindCallApply"</span>: <span class="keyword">true</span>
  }
}`}</pre>
        </CodeBlock>
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <SlideSectionTitle>Use Type Assertions Sparingly</SlideSectionTitle>
          <CodeBlock>
            <pre>{`<span class="comment">// Avoid excessive type assertions</span>
<span class="comment">// Bad</span>
<span class="keyword">const</span> <span class="variable">user</span> = <span class="function">getUser</span>() <span class="keyword">as</span> <span class="type">User</span>;

<span class="comment">// Better: Use type guards</span>
<span class="keyword">function</span> <span class="function">isUser</span>(<span class="variable">obj</span>: <span class="keyword">any</span>): <span class="variable">obj</span> <span class="keyword">is</span> <span class="type">User</span> {
  <span class="keyword">return</span> 
    <span class="keyword">typeof</span> obj === <span class="string">'object'</span> && 
    obj !== <span class="keyword">null</span> &&
    <span class="string">'id'</span> <span class="keyword">in</span> obj &&
    <span class="string">'name'</span> <span class="keyword">in</span> obj;
}

<span class="keyword">const</span> <span class="variable">data</span> = <span class="function">getUser</span>();
<span class="keyword">if</span> (<span class="function">isUser</span>(data)) {
  <span class="comment">// data is now typed as User</span>
  <span class="variable">console</span>.<span class="function">log</span>(data.name);
}`}</pre>
          </CodeBlock>
        </div>
      </div>
    </div>
  </div>
);

const TypeScriptAdvanced = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Advanced TypeScript Techniques</SlideTitle>
    <SlideSubtitle>
      Powerful TypeScript features for complex use cases
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Generic Constraints</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Constraining generics to specific types</span>
<span class="keyword">interface</span> <span class="type">HasId</span> {
  <span class="variable">id</span>: <span class="type">number</span> | <span class="type">string</span>;
}

<span class="keyword">function</span> <span class="function">findById</span><<span class="type">T</span> <span class="keyword">extends</span> <span class="type">HasId</span>>(<span class="variable">items</span>: <span class="type">T</span>[], <span class="variable">id</span>: <span class="type">number</span> | <span class="type">string</span>): <span class="type">T</span> | <span class="keyword">undefined</span> {
  <span class="keyword">return</span> items.<span class="function">find</span>(item => item.id === id);
}

<span class="comment">// Usage</span>
<span class="keyword">interface</span> <span class="type">User</span> <span class="keyword">extends</span> <span class="type">HasId</span> {
  <span class="variable">name</span>: <span class="type">string</span>;
}

<span class="keyword">const</span> <span class="variable">users</span>: <span class="type">User</span>[] = [
  { <span class="variable">id</span>: <span class="number">1</span>, <span class="variable">name</span>: <span class="string">'Alice'</span> },
  { <span class="variable">id</span>: <span class="number">2</span>, <span class="variable">name</span>: <span class="string">'Bob'</span> }
];

<span class="keyword">const</span> <span class="variable">user</span> = <span class="function">findById</span>(users, <span class="number">1</span>);
<span class="comment">// user is typed as User | undefined</span>`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>Mapped Types</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Create new types by transforming existing ones</span>
<span class="keyword">interface</span> <span class="type">User</span> {
  <span class="variable">id</span>: <span class="type">number</span>;
  <span class="variable">name</span>: <span class="type">string</span>;
  <span class="variable">email</span>: <span class="type">string</span>;
}

<span class="comment">// Create a Readonly version of User</span>
<span class="keyword">type</span> <span class="type">ReadonlyUser</span> = {
  <span class="keyword">readonly</span> [<span class="variable">K</span> <span class="keyword">in</span> <span class="type">keyof</span> <span class="type">User</span>]: <span class="type">User</span>[<span class="variable">K</span>];
};

<span class="comment">// Create a Nullable version of User</span>
<span class="keyword">type</span> <span class="type">NullableUser</span> = {
  [<span class="variable">K</span> <span class="keyword">in</span> <span class="type">keyof</span> <span class="type">User</span>]: <span class="type">User</span>[<span class="variable">K</span>] | <span class="keyword">null</span>;
};

<span class="comment">// Create a version with all properties optional</span>
<span class="keyword">type</span> <span class="type">PartialUser</span> = {
  [<span class="variable">K</span> <span class="keyword">in</span> <span class="type">keyof</span> <span class="type">User</span>]?: <span class="type">User</span>[<span class="variable">K</span>];
};`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

// Export the slides as an array
const TypeScriptSlides = [
  <TypeScriptIntro key="ts-intro" />,
  <TypeScriptTypes key="ts-types" />,
  <TypeScriptUtilityTypes key="ts-utility-types" />,
  <TypeScriptBestPractices key="ts-best-practices" />,
  <TypeScriptAdvanced key="ts-advanced" />
];

export default TypeScriptSlides;
