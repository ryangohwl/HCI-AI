require('dotenv').config();
const sharp = require('sharp');
const Tesseract = require('tesseract.js');
const axios = require('axios');
const fs = require('fs');


console.log('API Key:', process.env.OPENAI_API_KEY); // Log the API key to verify it's being loaded


const preprocessImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .grayscale()
      .threshold(128)
      .toFile(outputPath);
    console.log('Image pre-processing complete.');
  } catch (error) {
    console.error('Error in image pre-processing:', error);
  }
};


const processImage = (file) => {
  return Tesseract.recognize(
    file,
    'eng',
    {
      logger: (m) => console.log(m),
      tessedit_pageseg_mode: Tesseract.PSM.AUTO,
      tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
    }
  ).then(({ data: { text } }) => {
    console.log('Recognized Text:', text);
    return text; // Return the recognized text
  }).catch(error => {
    console.error('Error processing image:', error);
  });
};


const generateSummary = async (jsonData) => {
  const apiKey = process.env.OPENAI_API_KEY; // Replace with your actual API key
  if (!apiKey) {
    throw new Error('API key is missing');
  }


  const prompt = `
    Summarize the following text extracted from a mindmap image. Provide the summary in a clear and concise manner,
    highlighting the main points and ideas in point forms. Also, include any relevant images or diagrams if applicable.\n\n
    Text: "${jsonData.extractedText}"\n\n
    Summary:
  `;
  console.log('Prompt:', prompt);


  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are to summarize the mindmap.' },
          { role: 'user', content: prompt },  // Use the prompt variable here
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
    console.log('Summary:', response.data.choices[0].message.content); // Log the summary
  } catch (error) {
    console.error('Error generating summary:', error.response ? error.response.data : error.message);
  }
};


const inputImagePath = 'C:/Users/Yi Qing/Downloads/HCI-AI/src/images/mindmap.png';
const preprocessedImagePath = 'C:/Users/Yi Qing/Downloads/HCI-AI/src/images/mindmap_preprocessed.png';


// Preprocess the image first
preprocessImage(inputImagePath, preprocessedImagePath).then(() => {
  // Then process the preprocessed image
  processImage(preprocessedImagePath).then((text) => {
    generateSummary({ extractedText: text });
  }).catch(error => {
    console.error('Error in processing:', error);
  });
});


module.exports = {
  preprocessImage,
  processImage,
  generateSummary,
};
