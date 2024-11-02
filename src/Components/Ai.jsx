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

    const endpoint = `${process.env.REACT_APP_GEMINI_API_URL}?key=${apiKey}`;
    console.log("Making request to:", endpoint); // Debug output

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
      setError(err.response ? err.response.data.error.message : "Failed to fetch response from API.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
};


  // Function to convert markdown to HTML
  const markdownToHtml = (markdown) => {
    const html = markdown
      .replace(/## (.*?)\n/g, '<h2>$1</h2>') // Convert H2 headers
      .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>') // Convert bold text
      .replace(/\* ([^\n]+)/g, '<li>$1</li>') // Convert list items
      .replace(/<\/li>\n/g, '</li>') // Close list items properly
      .replace(/\n/g, '<br />'); // Convert line breaks
    return html;
  };

  const renderResponse = () => {
    if (!response || !response.candidates) return null;

    const candidate = response.candidates[0];
    const parts = candidate.content.parts;

    return (
      <div>
        <h2 className='text-purple-500'>Response:</h2>
        {parts.map((part, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: markdownToHtml(part.text) }} />
        ))}
      </div>
    );
  };

  return (
    <div className='w-[90%] md:w-[60%] mx-auto bg-slate-700 mt-6 '>
      <h1 className='text-3xl text-purple-700 '> AI Chatbot</h1>
      <div className="flex mt-4">
      <input 
        type="text" 
        className='w-[90%] mx-2 bg-purple-300 rounded-md'
        placeholder="Enter your query here..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button className='bg-purple-500 text-white text-md rounded-2xl px-5 py-2' onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : ' send'}
      </button>
      </div>

      {renderResponse()}

      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Ai;
