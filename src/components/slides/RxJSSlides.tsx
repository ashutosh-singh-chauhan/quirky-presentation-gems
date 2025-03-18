
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Filter, Play, Zap, GitMerge, CornerDownRight } from 'lucide-react';

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

// RxJS Slides
const RxJSIntro = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-black/5 text-xs font-semibold tracking-wide uppercase slide-appear">
      Part 3
    </div>
    <SlideTitle>RxJS</SlideTitle>
    <SlideSubtitle>
      Reactive Extensions for JavaScript: A library for reactive programming using Observables
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      <BestPracticeItem 
        icon={<RefreshCw size={24} />}
        title="Observables" 
        description="Represent a stream of values over time, from mouse events to HTTP requests."
        delay={0}
      />
      <BestPracticeItem 
        icon={<Filter size={24} />}
        title="Operators" 
        description="Functions that build new Observables based on the current Observable."
        delay={0.1}
      />
      <BestPracticeItem 
        icon={<GitMerge size={24} />}
        title="Subjects" 
        description="Special type of Observable that allows values to be multicasted to many Observers."
        delay={0.2}
      />
      <BestPracticeItem 
        icon={<Zap size={24} />}
        title="Schedulers" 
        description="Control when a subscription starts and when notifications are delivered."
        delay={0.3}
      />
    </div>
  </div>
);

const RxJSObservables = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Observables</SlideTitle>
    <SlideSubtitle>
      The foundation of RxJS: Observables represent a stream of values or events over time
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Creating Observables</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="keyword">import</span> { Observable, of, from, interval, fromEvent } <span class="keyword">from</span> <span class="string">'rxjs'</span>;

<span class="comment">// Creating an Observable manually</span>
<span class="keyword">const</span> <span class="variable">manual$</span> = <span class="keyword">new</span> <span class="function">Observable</span><<span class="type">number</span>>(subscriber => {
  <span class="variable">subscriber</span>.<span class="function">next</span>(<span class="number">1</span>);
  <span class="variable">subscriber</span>.<span class="function">next</span>(<span class="number">2</span>);
  <span class="variable">subscriber</span>.<span class="function">next</span>(<span class="number">3</span>);
  <span class="function">setTimeout</span>(() => {
    <span class="variable">subscriber</span>.<span class="function">next</span>(<span class="number">4</span>);
    <span class="variable">subscriber</span>.<span class="function">complete</span>();
  }, <span class="number">1000</span>);
});

<span class="comment">// Creating Observables from values</span>
<span class="keyword">const</span> <span class="variable">ofValues$</span> = <span class="function">of</span>(<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>);

<span class="comment">// From an array, promise, or iterable</span>
<span class="keyword">const</span> <span class="variable">fromArray$</span> = <span class="function">from</span>([<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>]);
<span class="keyword">const</span> <span class="variable">fromPromise$</span> = <span class="function">from</span>(<span class="function">fetch</span>(<span class="string">'https://api.example.com/data'</span>));

<span class="comment">// Time-based Observable</span>
<span class="keyword">const</span> <span class="variable">interval$</span> = <span class="function">interval</span>(<span class="number">1000</span>); <span class="comment">// Emits incremental numbers every 1000ms</span>

<span class="comment">// From DOM events</span>
<span class="keyword">const</span> <span class="variable">clicks$</span> = <span class="function">fromEvent</span>(<span class="variable">document</span>, <span class="string">'click'</span>);`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>Subscribing to Observables</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Basic subscription</span>
<span class="keyword">const</span> <span class="variable">subscription</span> = <span class="variable">ofValues$</span>.<span class="function">subscribe</span>(
  <span class="variable">value</span> => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Next:'</span>, value),
  <span class="variable">error</span> => <span class="variable">console</span>.<span class="function">error</span>(<span class="string">'Error:'</span>, error),
  () => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Complete!'</span>)
);

<span class="comment">// Modern approach using object syntax</span>
<span class="keyword">const</span> <span class="variable">subscription</span> = <span class="variable">interval$</span>.<span class="function">subscribe</span>({
  <span class="function">next</span>: <span class="variable">value</span> => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Next:'</span>, value),
  <span class="function">error</span>: <span class="variable">err</span> => <span class="variable">console</span>.<span class="function">error</span>(<span class="string">'Error:'</span>, err),
  <span class="function">complete</span>: () => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Complete!'</span>)
});

<span class="comment">// Unsubscribing (important to prevent memory leaks)</span>
<span class="function">setTimeout</span>(() => {
  <span class="variable">subscription</span>.<span class="function">unsubscribe</span>();
  <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Unsubscribed!'</span>);
}, <span class="number">5000</span>);`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

const RxJSOperators = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Operators</SlideTitle>
    <SlideSubtitle>
      Functions that transform, filter, combine, or manipulate observables
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Pipeable Operators</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="keyword">import</span> { 
  <span class="function">of</span>, <span class="function">from</span>, <span class="function">interval</span> 
} <span class="keyword">from</span> <span class="string">'rxjs'</span>;

<span class="keyword">import</span> { 
  <span class="function">map</span>, <span class="function">filter</span>, <span class="function">take</span>, <span class="function">tap</span>, <span class="function">debounceTime</span>, <span class="function">switchMap</span>
} <span class="keyword">from</span> <span class="string">'rxjs/operators'</span>;

<span class="comment">// Transforming values with map</span>
<span class="keyword">const</span> <span class="variable">numbers$</span> = <span class="function">of</span>(<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>);
<span class="keyword">const</span> <span class="variable">squaredNumbers$</span> = <span class="variable">numbers$</span>.<span class="function">pipe</span>(
  <span class="function">map</span>(x => x * x)
);
<span class="comment">// squaredNumbers$ emits: 1, 4, 9, 16, 25</span>

<span class="comment">// Filtering values</span>
<span class="keyword">const</span> <span class="variable">evenSquares$</span> = <span class="variable">squaredNumbers$</span>.<span class="function">pipe</span>(
  <span class="function">filter</span>(x => x % <span class="number">2</span> === <span class="number">0</span>)
);
<span class="comment">// evenSquares$ emits: 4, 16</span>

<span class="comment">// Limiting emissions</span>
<span class="keyword">const</span> <span class="variable">first3Values$</span> = <span class="function">interval</span>(<span class="number">1000</span>).<span class="function">pipe</span>(
  <span class="function">take</span>(<span class="number">3</span>)
);
<span class="comment">// first3Values$ emits: 0, 1, 2</span>

<span class="comment">// Side effects with tap</span>
<span class="keyword">const</span> <span class="variable">logged$</span> = <span class="variable">numbers$</span>.<span class="function">pipe</span>(
  <span class="function">tap</span>(x => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Before:'</span>, x)),
  <span class="function">map</span>(x => x * <span class="number">10</span>),
  <span class="function">tap</span>(x => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'After:'</span>, x))
);`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>Common Operators by Category</SlideSectionTitle>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground slide-appear">
          <li><strong>Transformation:</strong> map, switchMap, mergeMap, concatMap, scan</li>
          <li><strong>Filtering:</strong> filter, take, skip, takeUntil, distinct, distinctUntilChanged</li>
          <li><strong>Combination:</strong> combineLatest, merge, concat, zip, forkJoin</li>
          <li><strong>Error Handling:</strong> catchError, retry, retryWhen</li>
          <li><strong>Utility:</strong> tap, delay, timeout, toArray</li>
          <li><strong>Conditional:</strong> takeWhile, skipWhile, iif</li>
          <li><strong>Multicasting:</strong> share, shareReplay, publish</li>
        </ul>
        
        <CodeBlock>
          <pre>{`<span class="comment">// Real-world example: Type-ahead search</span>
<span class="keyword">const</span> <span class="variable">searchInput$</span> = <span class="function">fromEvent</span>(<span class="variable">searchInput</span>, <span class="string">'input'</span>).<span class="function">pipe</span>(
  <span class="function">map</span>(event => (<span class="variable">event</span>.<span class="variable">target</span> <span class="keyword">as</span> <span class="type">HTMLInputElement</span>).<span class="variable">value</span>),
  <span class="function">filter</span>(text => text.<span class="variable">length</span> > <span class="number">2</span>), <span class="comment">// Only search if > 2 chars</span>
  <span class="function">debounceTime</span>(<span class="number">300</span>),    <span class="comment">// Wait 300ms after user stops typing</span>
  <span class="function">distinctUntilChanged</span>(), <span class="comment">// Only emit when input changes</span>
  <span class="function">switchMap</span>(searchTerm => <span class="function">fetchSearchResults</span>(searchTerm))
);`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

const RxJSSubjects = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Subjects</SlideTitle>
    <SlideSubtitle>
      Special types of Observables that act as both Observer and Observable
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>Types of Subjects</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="keyword">import</span> { 
  <span class="type">Subject</span>, <span class="type">BehaviorSubject</span>, <span class="type">ReplaySubject</span>, <span class="type">AsyncSubject</span> 
} <span class="keyword">from</span> <span class="string">'rxjs'</span>;

<span class="comment">// Basic Subject - doesn't retain or replay emissions</span>
<span class="keyword">const</span> <span class="variable">subject</span> = <span class="keyword">new</span> <span class="function">Subject</span><<span class="type">number</span>>();

<span class="comment">// Observers subscribe to the Subject</span>
<span class="variable">subject</span>.<span class="function">subscribe</span>(value => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Observer A:'</span>, value));

<span class="comment">// Subject can emit values to all subscribers</span>
<span class="variable">subject</span>.<span class="function">next</span>(<span class="number">1</span>); <span class="comment">// Observer A: 1</span>

<span class="comment">// Late subscribers miss previous values</span>
<span class="variable">subject</span>.<span class="function">subscribe</span>(value => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Observer B:'</span>, value));
<span class="variable">subject</span>.<span class="function">next</span>(<span class="number">2</span>); <span class="comment">// Observer A: 2, Observer B: 2</span>

<span class="comment">// BehaviorSubject - has initial value and emits current value to new subscribers</span>
<span class="keyword">const</span> <span class="variable">behaviorSubject</span> = <span class="keyword">new</span> <span class="function">BehaviorSubject</span><<span class="type">number</span>>(<span class="number">0</span>);
<span class="variable">behaviorSubject</span>.<span class="function">subscribe</span>(value => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Behavior Observer A:'</span>, value)); <span class="comment">// 0</span>
<span class="variable">behaviorSubject</span>.<span class="function">next</span>(<span class="number">5</span>); <span class="comment">// Behavior Observer A: 5</span>
<span class="variable">behaviorSubject</span>.<span class="function">subscribe</span>(value => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Behavior Observer B:'</span>, value)); <span class="comment">// 5</span>`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>More Subject Types</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// ReplaySubject - replays n emissions to new subscribers</span>
<span class="keyword">const</span> <span class="variable">replaySubject</span> = <span class="keyword">new</span> <span class="function">ReplaySubject</span><<span class="type">number</span>>(<span class="number">2</span>); <span class="comment">// Buffer size of 2</span>
<span class="variable">replaySubject</span>.<span class="function">next</span>(<span class="number">1</span>);
<span class="variable">replaySubject</span>.<span class="function">next</span>(<span class="number">2</span>);
<span class="variable">replaySubject</span>.<span class="function">next</span>(<span class="number">3</span>);

<span class="comment">// New subscriber gets the last 2 values</span>
<span class="variable">replaySubject</span>.<span class="function">subscribe</span>(value => {
  <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Replay Observer:'</span>, value);
}); <span class="comment">// Logs: "Replay Observer: 2", "Replay Observer: 3"</span>

<span class="comment">// AsyncSubject - only emits the last value when complete()</span>
<span class="keyword">const</span> <span class="variable">asyncSubject</span> = <span class="keyword">new</span> <span class="function">AsyncSubject</span><<span class="type">number</span>>();
<span class="variable">asyncSubject</span>.<span class="function">subscribe</span>(value => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Async Observer:'</span>, value));
<span class="variable">asyncSubject</span>.<span class="function">next</span>(<span class="number">1</span>);
<span class="variable">asyncSubject</span>.<span class="function">next</span>(<span class="number">2</span>);
<span class="variable">asyncSubject</span>.<span class="function">next</span>(<span class="number">3</span>);
<span class="variable">asyncSubject</span>.<span class="function">complete</span>(); <span class="comment">// Logs: "Async Observer: 3"</span>

<span class="comment">// Subject as an Observer (can subscribe to other Observables)</span>
<span class="keyword">const</span> <span class="variable">source$</span> = <span class="function">interval</span>(<span class="number">1000</span>).<span class="function">pipe</span>(<span class="function">take</span>(<span class="number">3</span>));
<span class="keyword">const</span> <span class="variable">proxySubject</span> = <span class="keyword">new</span> <span class="function">Subject</span><<span class="type">number</span>>();

<span class="variable">proxySubject</span>.<span class="function">subscribe</span>(v => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Observer via Subject:'</span>, v));
<span class="variable">source$</span>.<span class="function">subscribe</span>(<span class="variable">proxySubject</span>); <span class="comment">// Subject forwards values to subscribers</span>`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

const RxJSRealWorld = () => (
  <div className="w-full h-full flex flex-col justify-center px-12 py-6">
    <SlideTitle>Real-world Examples</SlideTitle>
    <SlideSubtitle>
      Practical applications of RxJS in modern web development
    </SlideSubtitle>
    
    <div className="grid grid-cols-1 gap-8">
      <div>
        <SlideSectionTitle>State Management</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Simple state management with BehaviorSubject</span>
<span class="keyword">class</span> <span class="type">Store</span><<span class="type">T</span>> {
  <span class="keyword">private</span> <span class="variable">state$</span>: <span class="type">BehaviorSubject</span><<span class="type">T</span>>;
  
  <span class="keyword">constructor</span>(<span class="variable">initialState</span>: <span class="type">T</span>) {
    <span class="keyword">this</span>.<span class="variable">state$</span> = <span class="keyword">new</span> <span class="function">BehaviorSubject</span><<span class="type">T</span>>(<span class="variable">initialState</span>);
  }
  
  <span class="function">getState</span>() {
    <span class="keyword">return</span> <span class="keyword">this</span>.<span class="variable">state$</span>.<span class="variable">getValue</span>();
  }
  
  <span class="function">setState</span>(<span class="variable">nextState</span>: <span class="type">Partial</span><<span class="type">T</span>>) {
    <span class="keyword">this</span>.<span class="variable">state$</span>.<span class="function">next</span>({
      ...<span class="keyword">this</span>.<span class="function">getState</span>(),
      ...<span class="variable">nextState</span>
    });
  }
  
  <span class="function">select</span><<span class="type">K</span>>(<span class="variable">selector</span>: (<span class="variable">state</span>: <span class="type">T</span>) => <span class="type">K</span>) {
    <span class="keyword">return</span> <span class="keyword">this</span>.<span class="variable">state$</span>.<span class="function">pipe</span>(
      <span class="function">map</span>(selector),
      <span class="function">distinctUntilChanged</span>()
    );
  }
}

<span class="comment">// Usage</span>
<span class="keyword">interface</span> <span class="type">AppState</span> {
  <span class="variable">count</span>: <span class="type">number</span>;
  <span class="variable">user</span>: {
    <span class="variable">name</span>: <span class="type">string</span>;
    <span class="variable">isLoggedIn</span>: <span class="type">boolean</span>;
  };
}

<span class="keyword">const</span> <span class="variable">initialState</span>: <span class="type">AppState</span> = {
  <span class="variable">count</span>: <span class="number">0</span>,
  <span class="variable">user</span>: { <span class="variable">name</span>: <span class="string">''</span>, <span class="variable">isLoggedIn</span>: <span class="keyword">false</span> }
};

<span class="keyword">const</span> <span class="variable">store</span> = <span class="keyword">new</span> <span class="function">Store</span><<span class="type">AppState</span>>(<span class="variable">initialState</span>);

<span class="comment">// Subscribe to a slice of state</span>
<span class="variable">store</span>.<span class="function">select</span>(state => state.count)
  .<span class="function">subscribe</span>(count => <span class="variable">console</span>.<span class="function">log</span>(<span class="string">'Count:'</span>, count));
  
<span class="comment">// Update state</span>
<span class="variable">store</span>.<span class="function">setState</span>({ <span class="variable">count</span>: <span class="number">1</span> });
<span class="variable">store</span>.<span class="function">setState</span>({ <span class="variable">user</span>: { <span class="variable">name</span>: <span class="string">'John'</span>, <span class="variable">isLoggedIn</span>: <span class="keyword">true</span> } });`}</pre>
        </CodeBlock>
      </div>
      
      <div>
        <SlideSectionTitle>HTTP Requests with RxJS</SlideSectionTitle>
        <CodeBlock>
          <pre>{`<span class="comment">// Using RxJS for HTTP requests (Angular example)</span>
<span class="keyword">import</span> { Injectable } <span class="keyword">from</span> <span class="string">'@angular/core'</span>;
<span class="keyword">import</span> { HttpClient } <span class="keyword">from</span> <span class="string">'@angular/common/http'</span>;
<span class="keyword">import</span> { Observable, throwError } <span class="keyword">from</span> <span class="string">'rxjs'</span>;
<span class="keyword">import</span> { map, catchError, retry, shareReplay } <span class="keyword">from</span> <span class="string">'rxjs/operators'</span>;

@<span class="function">Injectable</span>({
  <span class="variable">providedIn</span>: <span class="string">'root'</span>
})
<span class="keyword">export class</span> <span class="type">UserService</span> {
  <span class="keyword">private</span> <span class="variable">apiUrl</span> = <span class="string">'https://api.example.com/users'</span>;
  <span class="keyword">private</span> <span class="variable">usersCache$</span>: <span class="type">Observable</span><<span class="type">User</span>[]>;
  
  <span class="keyword">constructor</span>(<span class="keyword">private</span> <span class="variable">http</span>: <span class="type">HttpClient</span>) { }
  
  <span class="function">getUsers</span>(): <span class="type">Observable</span><<span class="type">User</span>[]> {
    <span class="keyword">if</span> (!<span class="keyword">this</span>.<span class="variable">usersCache$</span>) {
      <span class="keyword">this</span>.<span class="variable">usersCache$</span> = <span class="keyword">this</span>.<span class="variable">http</span>.<span class="function">get</span><<span class="type">User</span>[]>(<span class="keyword">this</span>.<span class="variable">apiUrl</span>).<span class="function">pipe</span>(
        <span class="function">retry</span>(<span class="number">3</span>), <span class="comment">// Retry the request up to 3 times</span>
        <span class="function">map</span>(users => users.<span class="function">map</span>(user => ({
          ...user,
          <span class="variable">displayName</span>: <span class="string">\`\${</span>user.firstName<span class="string">} \${</span>user.lastName<span class="string">}\`</span>
        }))),
        <span class="function">catchError</span>(<span class="keyword">this</span>.<span class="function">handleError</span>),
        <span class="function">shareReplay</span>(<span class="number">1</span>) <span class="comment">// Cache the result</span>
      );
    }
    <span class="keyword">return</span> <span class="keyword">this</span>.<span class="variable">usersCache$</span>;
  }
  
  <span class="function">getUserById</span>(id: <span class="type">number</span>): <span class="type">Observable</span><<span class="type">User</span>> {
    <span class="keyword">return</span> <span class="keyword">this</span>.<span class="variable">http</span>.<span class="function">get</span><<span class="type">User</span>>(<span class="string">\`\${</span><span class="keyword">this</span>.<span class="variable">apiUrl</span><span class="string">}/\${</span>id<span class="string">}\`</span>).<span class="function">pipe</span>(
      <span class="function">catchError</span>(<span class="keyword">this</span>.<span class="function">handleError</span>)
    );
  }
  
  <span class="keyword">private</span> <span class="function">handleError</span>(error: <span class="type">any</span>) {
    <span class="variable">console</span>.<span class="function">error</span>(<span class="string">'API error'</span>, error);
    <span class="keyword">return</span> <span class="function">throwError</span>(() => <span class="string">'Something went wrong'</span>);
  }
}`}</pre>
        </CodeBlock>
      </div>
    </div>
  </div>
);

// Export the slides as an array
const RxJSSlides = [
  <RxJSIntro key="rxjs-intro" />,
  <RxJSObservables key="rxjs-observables" />,
  <RxJSOperators key="rxjs-operators" />,
  <RxJSSubjects key="rxjs-subjects" />,
  <RxJSRealWorld key="rxjs-real-world" />
];

export default RxJSSlides;
