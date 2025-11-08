
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface PostOutputProps {
  post: string;
}

const PostOutput: React.FC<PostOutputProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (!post) return;
    navigator.clipboard.writeText(post).then(() => {
      setCopied(true);
    });
  };

  return (
    <div className="relative h-full">
      {post ? (
        <>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-600 transition"
            aria-label="Copy to clipboard"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 h-full overflow-y-auto pr-10">
            {post}
          </pre>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <p className="text-lg font-medium">Your generated post will appear here.</p>
          <p className="text-sm">Fill in the details on the left and click "Generate Post" to start.</p>
        </div>
      )}
    </div>
  );
};

export default PostOutput;
