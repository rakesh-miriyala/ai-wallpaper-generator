import React, { useState, useEffect } from 'react';

const App = () => {
    const [prompt, setPrompt] = useState("A stylish person wearing a cap, shades, headset, and jacket walks alone on a grassy field under the moonlight, with a dark forest in the distance.");
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [error, setError] = useState(null);

    // --- Gemini API Call for Image Generation ---
    const generateImage = async (currentPrompt) => {
        if (!currentPrompt) {
            setError("Please enter a prompt before generating.");
            return;
        }
        setLoading(true);
        setError(null);
        // Keep the old image visible until the new one is ready
        // setImageUrl(''); 

        try {
            const payload = {
                instances: [{ prompt: currentPrompt }],
                parameters: { "sampleCount": 1 }
            };
            const apiKey = ""; // API key will be injected by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();

            if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                const generatedImageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
                setImageUrl(generatedImageUrl);
            } else {
                console.error("Unexpected response structure:", result);
                throw new Error("Image data not found in the response.");
            }
        } catch (err) {
            console.error(err);
            setError("Sorry, something went wrong while generating the image. Please try again.");
            // Don't clear the image on failure, so the user can see the last successful one
        } finally {
            setLoading(false);
        }
    };

    // --- Gemini API Call for Prompt Enhancement ---
    const enhancePrompt = async () => {
        if (!prompt) {
            setError("Please enter a prompt idea first.");
            return;
        }
        setIsEnhancing(true);
        setError(null);

        try {
            const instruction = `You are an expert prompt engineer for an AI image generator. A user has provided a basic idea. Your task is to expand this idea into a rich, detailed, and artistic prompt. Focus on adding specifics about lighting (e.g., golden hour, cinematic lighting), mood (e.g., serene, melancholic, epic), composition, and artistic style (e.g., photorealistic, digital painting, fantasy art). Keep the final prompt concise, under 100 words, and focused on visual details. Do not add any conversational text, just output the enhanced prompt. User's idea: "${prompt}"`;

            let chatHistory = [{ role: "user", parts: [{ text: instruction }] }];
            const payload = { contents: chatHistory };
            const apiKey = ""; // API key will be injected by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to enhance prompt.");
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                const enhancedText = result.candidates[0].content.parts[0].text.trim();
                setPrompt(enhancedText);
            } else {
                console.error("Unexpected response structure from enhancement API:", result);
                throw new Error("Could not extract enhanced prompt from API response.");
            }

        } catch (err) {
            console.error(err);
            setError("Sorry, couldn't enhance the prompt right now.");
        } finally {
            setIsEnhancing(false);
        }
    };
    
    // Automatically generate an image on initial load
    useEffect(() => {
        generateImage(prompt);
    }, []);


    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-5xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Vibe Wallpaper Generator</h1>
                    <p className="text-gray-400 text-lg">Describe your scene, or let AI enhance your ideas for the perfect wallpaper.</p>
                </header>

                <main className="w-full">
                    <div className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-8">
                        <label htmlFor="prompt-input" className="block text-lg font-semibold mb-2 text-gray-300">Your Scene Description:</label>
                        <textarea
                            id="prompt-input"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 h-32"
                            placeholder="e.g., A stylish person walking in the moonlight..."
                        />
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={enhancePrompt}
                                disabled={isEnhancing || loading}
                                className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isEnhancing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Enhancing...
                                    </>
                                ) : (
                                    '✨ Enhance Prompt'
                                )}
                            </button>
                             <button
                                onClick={() => generateImage(prompt)}
                                disabled={loading || isEnhancing}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Generating...
                                    </>
                                ) : (
                                    'Generate Wallpaper'
                                )}
                            </button>
                        </div>
                    </div>

                    {error && <div className="text-center text-red-400 mb-4 p-3 bg-red-900/50 rounded-lg">{error}</div>}

                    <div className="w-full aspect-video bg-gray-800 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
                        {(loading && !imageUrl) && (
                            <div className="text-center text-gray-400">
                                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400 mx-auto mb-4"></div>
                                <p>Crafting your scene...</p>
                            </div>
                        )}
                        {imageUrl && (
                             <a href={imageUrl} download="ai-wallpaper.png" title="Click to download">
                                <img
                                    src={imageUrl}
                                    alt="Generated wallpaper"
                                    className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${loading ? 'opacity-50' : 'opacity-100'}`}
                                />
                            </a>
                        )}
                    </div>
                     <div className="text-center mt-4 text-gray-500">
                        <p>Click the image to download your new 1920x1080 wallpaper!</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
