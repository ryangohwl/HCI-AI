import axios from 'axios';


const apiKey = import.meta.env.VITE_OPENAI_KEY; // INSERT API KEY

export const generateQuestions = async (text, numQuestions) => {
  const prompt = `
  Generate a list of ${numQuestions} questions or insights based on the following text, using the Six Thinking Hats methodology(). 
  Distribute the questions evenly across the hats where:
    - questions focus on data and facts.
    - questions involve emotions or feelings.
    - questions explore potential problems or risks.
    - questions look at the benefits or positive aspects.  
    - questions encourage creative or alternative thinking.
    - questions should focus on managing the discussion or thinking process.
  Ensure each question or insight is unique and addresses different aspects of the content. Format the questions as a numbered list, separated by a newline and easy to parse.
  Do not need to state which hat is being used.
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
  const prompt = `
    Generate a list of ${numAnswers} detailed, well-explained, and insightful answers based on the following text. 
    Each answer should be relevant to the main ideas and themes of the text. Ensure that each answer 
    is unique and addresses different aspects of the content. Provide the answers in a numbered list format. 
    Separate each answer with a newline and make sure they are easy to parse.\n\n
    If very little context is given, output surrounding ideas related to that topic regardless\n\n
    Text: "${text}"\n\n
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
  const prompt = `
  Generate a list of ${numIdeas} ideas based on the following text, using the Six Thinking Hats methodology(). 
  Distribute the questions evenly across the hats where:
    - Ideas focus on data and facts.
    - Ideas involve emotions or feelings.
    - Ideas explore potential problems or risks.
    - Ideas look at the benefits or positive aspects.  
    - Ideas encourage creative or alternative thinking.
    - Ideas should focus on managing the discussion or thinking process.
  Ensure each idea is unique and addresses different aspects of the content. Format the ideas as a numbered list, separated by a newline and easy to parse.
  Do not need to state which hat is being used.
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

export {};
