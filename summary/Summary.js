import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import mindmapImage from '../src/mindmap.png'; // Adjust the path if necessary

const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

function Summary() {
  const [image, setImage] = useState(mindmapImage);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    processImage(mindmapImage);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      processImage(file);
    }
  };

  const processImage = (file) => {
    Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      console.log(text);
      const jsonData = { extractedText: text };
      generateSummary(jsonData);
    });
  };

  const generateSummary = async (jsonData) => {
    const prompt = `
      Summarize the following text extracted from a mindmap image. Provide the summary in a clear and concise manner, 
      highlighting the main points and ideas. Also, include any relevant images or diagrams if applicable.\n\n
      Text: "${jsonData.extractedText}"\n\n
      Summary:
    `;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 300,
          n: 1,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSummary(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  return (
    <div>
      <h1>Mindmap Summary</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded Mindmap" style={{ maxWidth: '100%', marginTop: '20px' }} />}
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summary;