import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Send } from 'lucide-react';
import { personas as personaData } from "../constants/constant";
import axios from 'axios';

interface ChatMessage {
    id: number;
    sender: 'user' | 'persona';
    content: string;
    timestamp: string;
}

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const persona = personaData.find(p => p.id === Number(id));

    // Load messages from localStorage
    useEffect(() => {
        if (!id || !persona) return;
        const saved = localStorage.getItem(`chat_${id}`);
        if (saved) {
            setMessages(JSON.parse(saved));
        } else {
            setMessages([]); // Start with no initial message
            localStorage.setItem(`chat_${id}`, JSON.stringify([]));
        }
    }, [id, persona?.name]);

    // Save messages to localStorage
    useEffect(() => {
        if (messages.length > 0 && id) {
            localStorage.setItem(`chat_${id}`, JSON.stringify(messages));
        }
    }, [messages, id]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || !id) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: 'user',
            content: inputMessage.trim(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);
        try {
            const response = await axios.post('/api/chat/', {
                id: Number(id),
                content: userMessage.content
            });
            const data = response.data;

            const personaMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: 'persona',
                content: data.message,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, personaMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: Date.now() + 2,
                sender: 'persona',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!persona) {
        return <div className="text-white bg-black min-h-screen flex items-center justify-center text-2xl">Persona not found</div>;
    }

    return (
        <div className="bg-black h-full flex">
            <div className="w-1/4 text-white flex flex-col border-r border-r-white/20 gap-8 items-center justify-center p-8">
                <img src={persona.image} alt={persona.name} className="rounded-full w-32 h-32 object-cover border-2 border-white/20" />
                <span className="text-3xl font-bold text-center">{persona.name}</span>
                <span className="text-lg text-center font-normal text-gray-300 leading-relaxed">{persona.description}</span>
            </div>
            
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`${message.sender === 'user' ? 'bg-blue-600/80 border-blue-400/20' : 'bg-gray-800/60 border-white/10'} backdrop-blur-sm border rounded-2xl p-4 max-w-xs lg:max-w-md`}>
                                <p className="text-white whitespace-pre-wrap">{message.content}</p>
                                <span className={`text-xs ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'} mt-2 block`}>
                                    {message.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex gap-4 items-end">
                        <textarea 
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[20px] max-h-32"
                            rows={1}
                        />
                        <button onClick={sendMessage} disabled={!inputMessage.trim()} className="text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors p-2 hover:bg-blue-400/10 rounded-lg">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;