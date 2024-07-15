// llmFunctions.js

import axios from 'axios';

const apiKey = null; // INSERT API KEY

export const generateQuestions = async (text, numQuestions) => {
  numQuestions = Math.min(numQuestions, 10); // Ensure the number is capped at 10
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

export const generateAnswers = async (text, numAnswers) => {
  numAnswers = Math.min(numAnswers, 10); // Ensure the number is capped at 10
  const prompt = `
    Generate a list of ${numAnswers} concise, clear, and accurate answers based on the following questions. 
    Each answer should be directly relevant to the corresponding question and provide useful information. 
    Ensure that each answer is unique and addresses the main points of the question. Provide the answers 
    in a numbered list format, corresponding to the questions. Separate each answer with a newline and make 
    sure they are easy to parse.\n\n
    Questions: "${text}"\n\n
    Answers:\n
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

    const answers = response.data.choices[0].message.content
      .trim()
      .split('\n')
      .map(a => a.trim().replace(/^\d+\.\s*/, ''))
      .filter(a => a);

    return answers;
  } catch (error) {
    console.error('Error generating answers:', error);
    return [];
  }
};

export const generateIdeas = async (text, numIdeas) => {
  numIdeas = Math.min(numIdeas, 10); // Ensure the number is capped at 10
  const prompt = `
    Generate a list of ${numIdeas} innovative, creative, and actionable ideas based on the following text. 
    Each idea should be relevant to the main themes and concepts of the text and should provide a fresh 
    perspective or approach. Ensure that each idea is unique and encourages further exploration and 
    development. Provide the ideas in a numbered list format. Separate each idea with a newline and make 
    sure they are easy to parse.\n\n
    Text: "${text}"\n\n
    Ideas:\n
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

    const ideas = response.data.choices[0].message.content
      .trim()
      .split('\n')
      .map(i => i.trim().replace(/^\d+\.\s*/, ''))
      .filter(i => i);

    return ideas;
  } catch (error) {
    console.error('Error generating ideas:', error);
    return [];
  }
};
