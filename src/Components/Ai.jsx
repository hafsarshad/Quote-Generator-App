import React, { useState } from 'react';
import axios from 'axios';

function Ai() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const handleSubmit = async () => {
    if (!query.trim()) {
      setError("Query cannot be empty.");
      return;
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const data = {
      contents: [
        {
          parts: [{ text: query }]
        }
      ]
    };

    setLoading(true);
    try {
      const result = await axios.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(result.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data from Gemini API:", err);
      setError("Failed to fetch response from API.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (!response || !response.candidates || response.candidates.length === 0) {
      return <p>No response from AI.</p>;
    }
  
    const candidate = response.candidates[0];
    const parts = candidate.content?.parts ?? [];
  
    return (
      <div>
        <h2 className='text-purple-500'>Response:</h2>
        {parts.map((part, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: markdownToHtml(part.text) }} />
        ))}
      </div>
    );
  };
  // Convert markdown text to HTML
const markdownToHtml = (markdown) => {
  const html = markdown
    .replace(/## (.*?)\n/g, '<h2>$1</h2>')        // Convert H2 headers
    .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>') // Convert bold text
    .replace(/\* ([^\n]+)/g, '<li>$1</li>')       // Convert list items
    .replace(/<\/li>\n/g, '</li>')                // Close list items properly
    .replace(/\n/g, '<br />');                    // Convert line breaks
  return html;
};


  return (
    <div className='w-[90%] md:w-[60%] mx-auto  mt-6'>
      <h1 className='text-3xl text-purple-700'>AI Chatbot</h1>
      <div className="flex mt-4">
        <input
          type="text"
          className='w-[90%] mx-2 bg-purple-300 rounded-md'
          placeholder="Enter your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='bg-purple-500 text-white text-md rounded-2xl px-5 py-2' onClick={handleSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {renderResponse()}

      {error && (
        <div style={{ color: 'Blue' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Ai;
