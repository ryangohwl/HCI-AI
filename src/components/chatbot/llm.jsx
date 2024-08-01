import ChatBot from "react-chatbotify";
import OpenAI from "openai";

import React, { useState } from 'react';

const mainColor = "#EFBE7B"


const MyChatBot = () => {
	let apiKey = "sk-proj-KgV9CaNxKKcdiN3icTP0T3BlbkFJUyhDwVNbPuu0jgmwWXJe"; // add api key here
	let modelType = "gpt-4";
	let hasError = false;

	// example openai conversation
	// you can replace with other LLMs such as Google Gemini
	const call_openai = async (params) => {
		try {
			const openai = new OpenAI({
				apiKey: apiKey,
				dangerouslyAllowBrowser: true // required for testing on browser side, not recommended
			});

			// for streaming responses in parts (real-time), refer to real-time stream example
			const chatCompletion = await openai.chat.completions.create({
				// conversation history is not shown in this example as message length is kept to 1
				messages: [{ role: 'user', content: params.userInput }],
				model: modelType,
			});

			await params.injectMessage(chatCompletion.choices[0].message.content);
		} catch (error) {
			await params.injectMessage("Unable to load model, is your API Key valid?");
			hasError = true;
		}
	}
	const flow={

        options: {
            openChat: {isOpen:false}
        },
        


		start: {
			message: "Ask me anything",
			path: "loop",
			isSensitive: false
		},
		// api_key: {
		// 	message: (params) => {
		// 		apiKey = params.userInput.trim();
		// 		return "Ask me anything!";
		// 	},
		// 	path: "loop",
		// },
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

	const buttonConfig ={
		headerStyle:{background: mainColor},
		tooltipStyle:{background: mainColor},
		botBubbleStyle:{background: mainColor},
		chatHistory: {storageKey: "example_llm_conversation"},
		chatButton: {icon: "/capybara@2x.png"},
		tooltip: {text: "Ask Me Anything!😊 "},
		botBubble:{showAvatar: true ,avatar: "/capybara@2x.png"},
		header: {
			avatar: "/capybara@2x.png",
			 title: "Capybara" ,
		}
			 
		}

	return (
		// options={{openChat: {isOpen:false}, theme: {embedded: true}, chatHistory: {storageKey: "example_llm_conversation"}}}
		<ChatBot  options={buttonConfig} flow={flow}/>

	);
};

export default MyChatBot;
