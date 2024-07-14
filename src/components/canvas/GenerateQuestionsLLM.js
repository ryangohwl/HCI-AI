import axios from 'axios';

const apiKey = null; // INSERT API KEY

export const generateQuestions = async (text, numQuestions) => {
  const prompt = `
    Generate a list of ${numQuestions} short, clear, and insightful questions based on the following text. 
    Each question should be relevant to the main ideas and themes of the text. Aim for questions that 
    encourage critical thinking and further exploration of the topics discussed. Ensure that each question 
    is unique and addresses different aspects of the content. Use the 5W1H framework (Who, What, When, Where, Why, and How) 
    to cover a wide range of perspectives. Provide the questions in a numbered list format. 
    Separate each question with a newline and make sure they are easy to parse.\n\n
    Text: "${text}"\n\n
    Questions:\n
    1.
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
        stop: ['11.'],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        }
      }
    );

    const questions = response.data.choices[0].message.content
      .trim()
      .split('\n')
      .map(q => q.trim().replace(/^\d+\.\s*/, ''))
      .filter(q => q);

    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    return [];
  }
};

export {};
