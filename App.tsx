
import React, { useState, useCallback } from 'react';
import { VIRAL_STYLES } from './constants';
import { ViralStyle } from './types';
import { generateLinkedInPost } from './services/geminiService';
import Header from './components/Header';
import StyleSelector from './components/StyleSelector';
import PostOutput from './components/PostOutput';
import Loader from './components/Loader';
import { SparklesIcon, ExclamationTriangleIcon } from './components/Icons';

export default function App() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState<ViralStyle>(VIRAL_STYLES[0].value);
  const [generatedPost, setGeneratedPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePost = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for your post.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedPost('');

    try {
      const post = await generateLinkedInPost(topic, style);
      setGeneratedPost(post);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, style]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased selection:bg-blue-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        <main className="mt-8 bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="flex flex-col space-y-6">
              <div>
                <label htmlFor="post-topic" className="block text-lg font-semibold text-gray-700 mb-2">
                  1. Enter Your Post Idea
                </label>
                <textarea
                  id="post-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., 'The future of AI in software development...'"
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none"
                  disabled={isLoading}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  2. Choose a Viral Tone
                </h3>
                <StyleSelector
                  selectedStyle={style}
                  onStyleChange={setStyle}
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleGeneratePost}
                disabled={isLoading || !topic.trim()}
                className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon />
                    Generate Post
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                3. Your LinkedIn-Ready Post
              </h3>
              <div className="flex-grow bg-gray-50 border border-gray-200 rounded-lg p-4 relative min-h-[300px] lg:min-h-0">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10 rounded-lg">
                    <Loader />
                    <p className="mt-2 text-gray-600 font-medium animate-pulse">
                      AI is crafting your post...
                    </p>
                  </div>
                )}
                {error && (
                  <div className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center text-center p-4 z-10 rounded-lg">
                    <ExclamationTriangleIcon />
                    <p className="mt-2 font-semibold text-red-700">Error</p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
                <PostOutput post={generatedPost} />
              </div>
            </div>
          </div>
        </main>
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by Google Gemini. Designed for inspiration.</p>
        </footer>
      </div>
    </div>
  );
}
