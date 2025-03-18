
import React from 'react';
import { motion } from 'framer-motion';
import { Binoculars, MousePointer, Keyboard, ExternalLink, Target, AlertCircle } from 'lucide-react';

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

// Accessibility Slides
const AccessibilityIntro = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-black/5 text-xs font-semibold tracking-wide uppercase slide-appear">
      Part 2
    </div>
    <SlideTitle>Web Accessibility</SlideTitle>
    <SlideSubtitle>
      Creating inclusive experiences that work for everyone, regardless of ability
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      <BestPracticeItem 
        icon={<Binoculars size={24} />}
        title="Perceivable" 
        description="Information and user interface components must be presentable to users in ways they can perceive."
        delay={0}
      />
      <BestPracticeItem 
        icon={<MousePointer size={24} />}
        title="Operable" 
        description="User interface components and navigation must be operable by all users."
        delay={0.1}
      />
      <BestPracticeItem 
        icon={<Target size={24} />}
        title="Understandable" 
        description="Information and the operation of the user interface must be understandable."
        delay={0.2}
      />
      <BestPracticeItem 
        icon={<AlertCircle size={24} />}
        title="Robust" 
        description="Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies."
        delay={0.3}
      />
    </div>
  </div>
);

const AccessibilitySemanticHTML = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Semantic HTML</SlideTitle>
    <SlideSubtitle>
      Using the right HTML elements for their intended purpose
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Non-Semantic vs. Semantic HTML</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Poor Accessibility - Non-semantic HTML</span>
<span class="keyword">&lt;div</span> <span class="variable">class</span>=<span class="string">"header"</span><span class="keyword">&gt;</span>
  <span class="keyword">&lt;div</span> <span class="variable">class</span>=<span class="string">"title"</span><span class="keyword">&gt;</span>My Website<span class="keyword">&lt;/div&gt;</span>
  <span class="keyword">&lt;div</span> <span class="variable">class</span>=<span class="string">"navigation"</span><span class="keyword">&gt;</span>
    <span class="keyword">&lt;div</span> <span class="variable">class</span>=<span class="string">"nav-item"</span><span class="keyword">&gt;</span>Home<span class="keyword">&lt;/div&gt;</span>
    <span class="keyword">&lt;div</span> <span class="variable">class</span>=<span class="string">"nav-item"</span><span class="keyword">&gt;</span>About<span class="keyword">&lt;/div&gt;</span>
    <span class="keyword">&lt;div</span> <span class="variable">class</span>=<span class="string">"nav-item"</span><span class="keyword">&gt;</span>Contact<span class="keyword">&lt;/div&gt;</span>
  <span class="keyword">&lt;/div&gt;</span>
<span class="keyword">&lt;/div&gt;</span>

<span class="comment">// Good Accessibility - Semantic HTML</span>
<span class="keyword">&lt;header&gt;</span>
  <span class="keyword">&lt;h1&gt;</span>My Website<span class="keyword">&lt;/h1&gt;</span>
  <span class="keyword">&lt;nav&gt;</span>
    <span class="keyword">&lt;ul&gt;</span>
      <span class="keyword">&lt;li&gt;&lt;a</span> <span class="variable">href</span>=<span class="string">"/"</span><span class="keyword">&gt;</span>Home<span class="keyword">&lt;/a&gt;&lt;/li&gt;</span>
      <span class="keyword">&lt;li&gt;&lt;a</span> <span class="variable">href</span>=<span class="string">"/about"</span><span class="keyword">&gt;</span>About<span class="keyword">&lt;/a&gt;&lt;/li&gt;</span>
      <span class="keyword">&lt;li&gt;&lt;a</span> <span class="variable">href</span>=<span class="string">"/contact"</span><span class="keyword">&gt;</span>Contact<span class="keyword">&lt;/a&gt;&lt;/li&gt;</span>
    <span class="keyword">&lt;/ul&gt;</span>
  <span class="keyword">&lt;/nav&gt;</span>
<span class="keyword">&lt;/header&gt;</span>`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>Benefits of Semantic HTML</SlideSectionTitle>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground slide-appear">
          <li>Screen readers can interpret the page structure more effectively</li>
          <li>Keyboard navigation is improved</li>
          <li>Search engines understand content better</li>
          <li>Code is more maintainable</li>
          <li>User agents can provide appropriate controls</li>
        </ul>
      </div>
    </div>
  </div>
);

const AccessibilityARIA = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>ARIA Attributes</SlideTitle>
    <SlideSubtitle>
      Accessible Rich Internet Applications (ARIA) attributes enhance accessibility when native HTML is not sufficient
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>ARIA Landmark Roles</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Define regions of a page</span>
<span class="keyword">&lt;div</span> <span class="variable">role</span>=<span class="string">"banner"</span><span class="keyword">&gt;</span>Site Header<span class="keyword">&lt;/div&gt;</span>
<span class="keyword">&lt;div</span> <span class="variable">role</span>=<span class="string">"navigation"</span><span class="keyword">&gt;</span>...<span class="keyword">&lt;/div&gt;</span>
<span class="keyword">&lt;div</span> <span class="variable">role</span>=<span class="string">"main"</span><span class="keyword">&gt;</span>...<span class="keyword">&lt;/div&gt;</span>
<span class="keyword">&lt;div</span> <span class="variable">role</span>=<span class="string">"complementary"</span><span class="keyword">&gt;</span>...<span class="keyword">&lt;/div&gt;</span>
<span class="keyword">&lt;div</span> <span class="variable">role</span>=<span class="string">"contentinfo"</span><span class="keyword">&gt;</span>...<span class="keyword">&lt;/div&gt;</span>

<span class="comment">// Use semantic elements when possible (preferred)</span>
<span class="keyword">&lt;header&gt;</span>Site Header<span class="keyword">&lt;/header&gt;</span>
<span class="keyword">&lt;nav&gt;</span>...<span class="keyword">&lt;/nav&gt;</span>
<span class="keyword">&lt;main&gt;</span>...<span class="keyword">&lt;/main&gt;</span>
<span class="keyword">&lt;aside&gt;</span>...<span class="keyword">&lt;/aside&gt;</span>
<span class="keyword">&lt;footer&gt;</span>...<span class="keyword">&lt;/footer&gt;</span>`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>ARIA States and Properties</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Toggle buttons</span>
<span class="keyword">&lt;button</span> 
  <span class="variable">aria-pressed</span>=<span class="string">"false"</span>
  <span class="variable">onClick</span>=<span class="string">"toggleState(this)"</span>
<span class="keyword">&gt;</span>
  Toggle Feature
<span class="keyword">&lt;/button&gt;</span>

<span class="comment">// Custom form validation</span>
<span class="keyword">&lt;input</span>
  <span class="variable">type</span>=<span class="string">"text"</span>
  <span class="variable">aria-invalid</span>=<span class="string">"true"</span>
  <span class="variable">aria-errormessage</span>=<span class="string">"name-error"</span>
<span class="keyword">/&gt;</span>
<span class="keyword">&lt;div</span> <span class="variable">id</span>=<span class="string">"name-error"</span> <span class="variable">role</span>=<span class="string">"alert"</span><span class="keyword">&gt;</span>
  Please enter a valid name
<span class="keyword">&lt;/div&gt;</span>

<span class="comment">// Hidden content</span>
<span class="keyword">&lt;div</span> <span class="variable">aria-hidden</span>=<span class="string">"true"</span><span class="keyword">&gt;</span>
  This content is hidden from assistive technologies
<span class="keyword">&lt;/div&gt;</span>`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

const AccessibilityKeyboard = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Keyboard Accessibility</SlideTitle>
    <SlideSubtitle>
      Ensuring all interactions can be accomplished with a keyboard alone
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Focus Management</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Managing focus in a modal dialog</span>
<span class="keyword">function</span> <span class="function">openModal</span>() {
  <span class="comment">// Show the modal</span>
  <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'modal'</span>).<span class="variable">style</span>.<span class="variable">display</span> = <span class="string">'block'</span>;
  
  <span class="comment">// Store the element that had focus before opening modal</span>
  <span class="variable">previousFocus</span> = <span class="variable">document</span>.<span class="variable">activeElement</span>;
  
  <span class="comment">// Set focus to the first focusable element in the modal</span>
  <span class="keyword">const</span> <span class="variable">focusableElements</span> = <span class="variable">modal</span>.<span class="function">querySelectorAll</span>(
    <span class="string">'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'</span>
  );
  
  <span class="variable">focusableElements</span>[<span class="number">0</span>].<span class="function">focus</span>();
}

<span class="keyword">function</span> <span class="function">closeModal</span>() {
  <span class="comment">// Hide the modal</span>
  <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'modal'</span>).<span class="variable">style</span>.<span class="variable">display</span> = <span class="string">'none'</span>;
  
  <span class="comment">// Restore focus to the element that had it before the modal opened</span>
  <span class="variable">previousFocus</span>.<span class="function">focus</span>();
}`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>React Example: Focus Trap</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="keyword">import</span> React, { useRef, useEffect } <span class="keyword">from</span> <span class="string">'react'</span>;

<span class="keyword">function</span> <span class="function">Modal</span>({ isOpen, onClose, children }) {
  <span class="keyword">const</span> <span class="variable">modalRef</span> = <span class="function">useRef</span>(<span class="keyword">null</span>);
  <span class="keyword">const</span> <span class="variable">previousFocusRef</span> = <span class="function">useRef</span>(<span class="keyword">null</span>);
  
  <span class="function">useEffect</span>(() => {
    <span class="keyword">if</span> (isOpen) {
      <span class="variable">previousFocusRef</span>.<span class="variable">current</span> = <span class="variable">document</span>.<span class="variable">activeElement</span>;
      
      <span class="comment">// Find all focusable elements</span>
      <span class="keyword">const</span> <span class="variable">focusableElements</span> = <span class="variable">modalRef</span>.<span class="variable">current</span>.<span class="function">querySelectorAll</span>(
        <span class="string">'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'</span>
      );
      
      <span class="keyword">if</span> (<span class="variable">focusableElements</span>.<span class="variable">length</span> > <span class="number">0</span>) {
        <span class="variable">focusableElements</span>[<span class="number">0</span>].<span class="function">focus</span>();
      }
      
      <span class="comment">// Handle tabs to keep focus inside the modal</span>
      <span class="keyword">const</span> <span class="function">handleKeyDown</span> = (<span class="variable">e</span>) => {
        <span class="keyword">if</span> (<span class="variable">e</span>.<span class="variable">key</span> === <span class="string">'Tab'</span>) {
          <span class="keyword">const</span> <span class="variable">firstElement</span> = <span class="variable">focusableElements</span>[<span class="number">0</span>];
          <span class="keyword">const</span> <span class="variable">lastElement</span> = <span class="variable">focusableElements</span>[<span class="variable">focusableElements</span>.<span class="variable">length</span> - <span class="number">1</span>];
          
          <span class="keyword">if</span> (<span class="variable">e</span>.<span class="variable">shiftKey</span> && <span class="variable">document</span>.<span class="variable">activeElement</span> === <span class="variable">firstElement</span>) {
            <span class="variable">lastElement</span>.<span class="function">focus</span>();
            <span class="variable">e</span>.<span class="function">preventDefault</span>();
          } <span class="keyword">else if</span> (!<span class="variable">e</span>.<span class="variable">shiftKey</span> && <span class="variable">document</span>.<span class="variable">activeElement</span> === <span class="variable">lastElement</span>) {
            <span class="variable">firstElement</span>.<span class="function">focus</span>();
            <span class="variable">e</span>.<span class="function">preventDefault</span>();
          }
        } <span class="keyword">else if</span> (<span class="variable">e</span>.<span class="variable">key</span> === <span class="string">'Escape'</span>) {
          <span class="function">onClose</span>();
        }
      };
      
      <span class="variable">document</span>.<span class="function">addEventListener</span>(<span class="string">'keydown'</span>, handleKeyDown);
      <span class="keyword">return</span> () => {
        <span class="variable">document</span>.<span class="function">removeEventListener</span>(<span class="string">'keydown'</span>, handleKeyDown);
      };
    } <span class="keyword">else if</span> (<span class="variable">previousFocusRef</span>.<span class="variable">current</span>) {
      <span class="variable">previousFocusRef</span>.<span class="variable">current</span>.<span class="function">focus</span>();
    }
  }, [isOpen, onClose]);
  
  <span class="keyword">if</span> (!isOpen) <span class="keyword">return null</span>;
  
  <span class="keyword">return</span> (
    <span class="keyword">&lt;div</span> <span class="variable">ref</span>={modalRef} <span class="variable">role</span>=<span class="string">"dialog"</span> <span class="variable">aria-modal</span>=<span class="string">"true"</span><span class="keyword">&gt;</span>
      {children}
      <span class="keyword">&lt;button</span> <span class="variable">onClick</span>={onClose}<span class="keyword">&gt;</span>Close<span class="keyword">&lt;/button&gt;</span>
    <span class="keyword">&lt;/div&gt;</span>
  );
}`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

const AccessibilityTesting = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Accessibility Testing</SlideTitle>
    <SlideSubtitle>
      Tools and techniques to verify your website's accessibility
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <SlideSectionTitle>Automated Testing Tools</SlideSectionTitle>
        <ul className="list-disc pl-6 space-y-3 text-muted-foreground slide-appear">
          <li>
            <span className="font-medium text-foreground">Lighthouse</span>
            <p>Built into Chrome DevTools, provides accessibility audits</p>
          </li>
          <li>
            <span className="font-medium text-foreground">axe-core</span>
            <p>JavaScript library for automated accessibility testing</p>
          </li>
          <li>
            <span className="font-medium text-foreground">WAVE</span>
            <p>Web Accessibility Evaluation Tool by WebAIM</p>
          </li>
          <li>
            <span className="font-medium text-foreground">eslint-plugin-jsx-a11y</span>
            <p>Static analysis for accessibility issues in JSX</p>
          </li>
        </ul>
      </div>
      
      <div>
        <SlideSectionTitle>Manual Testing Techniques</SlideSectionTitle>
        <ul className="list-disc pl-6 space-y-3 text-muted-foreground slide-appear">
          <li>
            <span className="font-medium text-foreground">Keyboard Navigation Testing</span>
            <p>Verify all functionality is accessible without a mouse</p>
          </li>
          <li>
            <span className="font-medium text-foreground">Screen Reader Testing</span>
            <p>Test with NVDA, JAWS, or VoiceOver</p>
          </li>
          <li>
            <span className="font-medium text-foreground">Color Contrast Checking</span>
            <p>Ensure text meets WCAG contrast requirements</p>
          </li>
          <li>
            <span className="font-medium text-foreground">Zoom Testing</span>
            <p>Verify content is usable at 200% zoom</p>
          </li>
          <li>
            <span className="font-medium text-foreground">User Testing</span>
            <p>Include people with disabilities in your testing process</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Export the slides as an array
const AccessibilitySlides = [
  <AccessibilityIntro key="a11y-intro" />,
  <AccessibilitySemanticHTML key="a11y-semantic-html" />,
  <AccessibilityARIA key="a11y-aria" />,
  <AccessibilityKeyboard key="a11y-keyboard" />,
  <AccessibilityTesting key="a11y-testing" />
];

export default AccessibilitySlides;
