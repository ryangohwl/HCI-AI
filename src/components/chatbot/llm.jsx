import ChatBot from "react-chatbotify";
import OpenAI from "openai";
import React, { useState, useEffect } from 'react';
import './hideTooltip.css'; // Ensure this is imported

const mainColor = "#EFBE7B";

const MyChatBot = () => {
    let apiKey = import.meta.env.VITE_OPENAI_KEY; // add api key here
    let modelType = "gpt-4";
    let hasError = false;

    // Example OpenAI conversation
    const call_openai = async (params) => {
        try {
            const openai = new OpenAI({
                apiKey: apiKey,
                dangerouslyAllowBrowser: true // required for testing on browser side, not recommended
            });

            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: params.userInput }],
                model: modelType,
            });

            await params.injectMessage(chatCompletion.choices[0].message.content);
        } catch (error) {
            await params.injectMessage("Unable to load model, is your API Key valid?");
            hasError = true;
        }
    }

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
                await call_openai(params);
            },
            path: () => {
                if (hasError) {
                    return "start"
                }
                return "loop"
            }
        }
    }

    const buttonConfig = {
        headerStyle: { background: mainColor },
        tooltipStyle: { background: mainColor },
        botBubbleStyle: { background: mainColor },
        chatHistory: { storageKey: "example_llm_conversation" },
        chatButton: { icon: "/capybara@2x.png" },
        tooltip: { text: "Ask Me Anything!😊 " },
        botBubble: { showAvatar: true, avatar: "/capybara@2x.png" },
        header: {
            avatar: "/capybara@2x.png",
            title: "Capybara",
        }
    }

    // Hide tooltip after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            const tooltip = document.querySelector('.rcb-chat-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        }, 10000);
        return () => clearTimeout(timer);
		// Clear timer when I exit the whiteboard, so it restarts when I click back into whiteboard
    }, []);

    return (
        <ChatBot options={buttonConfig} flow={flow} />
    );
};

export default MyChatBot;
