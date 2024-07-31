import React, { useState } from 'react';
import ChatBot from 'react-chatbotify';
import OpenAI from 'openai';
import Draggable from 'react-draggable';
import styles from './chatbot.module.css';

const mainColor = "#EFBE7B";

const MyChatBot = () => {
  const [apiKey, setApiKey] = useState(null); // Use state to handle apiKey
  const modelType = "gpt-4";
  const [hasError, setHasError] = useState(false);

  const callOpenAI = async (params) => {
    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Required for testing on browser side, not recommended for production
      });

      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: params.userInput }],
        model: modelType,
      });

      await params.injectMessage(chatCompletion.choices[0].message.content);
    } catch (error) {
      await params.injectMessage("Unable to load model, is your API Key valid?");
      setHasError(true);
    }
  };

  const flow = {
    options: {
      openChat: { isOpen: false }
    },
    start: {
      message: "Ask me anything",
      path: "loop",
      isSensitive: false
    },
    loop: {
      message: async (params) => {
        await callOpenAI(params);
      },
      path: () => (hasError ? "start" : "loop")
    }
  };

  const buttonConfig = {
    headerStyle: { background: mainColor },
    tooltipStyle: { background: mainColor },
    botBubbleStyle: { background: mainColor },
    chatHistory: { storageKey: "example_llm_conversation" },
    chatButton: { icon: "/capybara@2x.png" },
    tooltip: { text: "Ask Me Anything!😊" },
    botBubble: { showAvatar: true, avatar: "/capybara@2x.png" },
    header: {
      avatar: "/capybara@2x.png",
      title: "Capybara",
    }
  };

  const onDrag = (e, data) => {
    // Prevent movement beyond the 40vh height constraint
    if (data.y < window.innerHeight - (window.innerHeight * 0.4)) {
      data.y = window.innerHeight - (window.innerHeight * 0.4);
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: window.innerWidth - 10, y: window.innerHeight - 50}}
      bounds={{ top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight }}
      onDrag={onDrag}
    >
      <div className={styles.chatbot}>
        <ChatBot options={buttonConfig} flow={flow} />
      </div>
    </Draggable>
  );
};

export default MyChatBot;
