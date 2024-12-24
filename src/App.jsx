import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCHvNGbq_k34tbMatSOwlh-rVVM3Ds-4YA" 
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      setInputValue('');
      const response = result.response;
      const text = response.text();
      console.log(text);
      setPromptResponses([...promptResponses, text]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-2">Chat with Kaori AI</h1>
      <p className="text-gray-600 mb-6">ReactJS + TailwindCSS + Gemini</p>

      {/* Input Section */}
      <div className="flex w-full max-w-2xl mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ask me something you want"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getResponseForGivenPrompt}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        /* Prompt Responses */
        <div className="w-full max-w-2xl space-y-4">
          {promptResponses.map((promptResponse, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg ${
                index === promptResponses.length - 1 ? 'bg-blue-100 font-bold' : 'bg-white'
              }`}
            >
              {promptResponse}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
