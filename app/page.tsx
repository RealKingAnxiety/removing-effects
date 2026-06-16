'use client';

import { useState, useEffect, useRef } from 'react';

// Challenge 1: Fix Resetting Interval
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('✅ Creating an interval');
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => {
      console.log('❌ Clearing an interval');
      clearInterval(id);
    };
  }, []); // Empty dependency array - correct

  return <h1>Counter: {count}</h1>;
}

// Challenge 2: Fix Retriggering Animation
function Welcome({ duration }: { duration: number }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current!);
    animation.start(duration);
    return () => animation.stop();
  }, [duration]); // Only depend on duration

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      Welcome
    </h1>
  );
}

// Simple animation class (mock)
class FadeInAnimation {
  constructor(private node: HTMLElement) {}
  start(duration: number) {
    this.node.style.transition = `opacity ${duration}ms`;
    this.node.style.opacity = '1';
  }
  stop() {
    this.node.style.transition = '';
  }
}

// Challenge 3 & 4: Fix Reconnecting Chat
function ChatRoom({ roomId, isEncrypted }: { roomId: string; isEncrypted: boolean }) {
  useEffect(() => {
    console.log(`✅ Connecting to "${roomId}" (${isEncrypted ? 'encrypted' : 'unencrypted'})`);
    return () => console.log(`❌ Disconnected from "${roomId}"`);
  }, [roomId, isEncrypted]);

  return <h2>Welcome to the {roomId} room! {isEncrypted ? '🔒' : ''}</h2>;
}

export default function RemovingEffects() {
  const [duration, setDuration] = useState(1000);
  const [showWelcome, setShowWelcome] = useState(true);
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16">Removing Effect Dependencies</h1>

        <div className="space-y-16">
          {/* Challenge 1 */}
          <div className="challenge">
            <h2>1. Fix Resetting Interval</h2>
            <Timer />
          </div>

          {/* Challenge 2 */}
          <div className="challenge">
            <h2>2. Fix Retriggering Animation</h2>
            <label>
              <input
                type="range"
                min="100"
                max="3000"
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
              />
              <br />
              Fade in duration: {duration} ms
            </label>
            <button onClick={() => setShowWelcome(!showWelcome)}>
              {showWelcome ? 'Hide' : 'Show'} Welcome
            </button>
            {showWelcome && <Welcome duration={duration} />}
          </div>

          {/* Challenge 3 & 4 */}
          <div className="challenge">
            <h2>3 & 4. Fix Reconnecting Chat</h2>
            <label>
              Choose room:{' '}
              <select value={roomId} onChange={e => setRoomId(e.target.value)}>
                <option value="general">general</option>
                <option value="travel">travel</option>
                <option value="music">music</option>
              </select>
            </label>
            <label>
              <input type="checkbox" checked={isEncrypted} onChange={e => setIsEncrypted(e.target.checked)} />
              Use encryption
            </label>
            <ChatRoom roomId={roomId} isEncrypted={isEncrypted} />
          </div>
        </div>
      </div>
    </div>
  );
}