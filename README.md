AI Vibe Wallpaper Generator

Create the perfect, unique wallpaper for your desktop with the power of AI. This application allows you to generate stunning, high-resolution images from simple text descriptions. Describe your ideal scene, and let the AI bring it to life!

✨ Live Demo
[Link to your deployed application will go here. You can add this later after deploying to a service like Vercel or Netlify.]

Features

AI Image Generation: Utilizes Google's powerful Imagen model to create high-quality images from text prompts.

AI Prompt Enhancement: Employs the Gemini LLM to analyze your basic ideas and transform them into rich, artistic, and detailed prompts for better image results.

Responsive Design: A clean, dark-themed interface that looks great on any device.

Easy to Use: Simply type your idea, enhance it with a click, and generate your custom wallpaper.

Downloadable Images: Directly download the generated 1920x1080 wallpaper to use on your desktop.

Technologies Used

React: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Google Gemini API: The backend engine for both text-based prompt enhancement (Gemini) and image generation (Imagen).

Setup and Installation

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js: Make sure you have Node.js installed. You can download it from nodejs.org.

Google AI API Key: You will need an API key from Google AI Studio to use the Gemini and Imagen models.

Visit Google AI Studio.

Sign in and click "Get API key".

Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

Navigate to the project directory:

cd your-repository-name

Install NPM packages:

npm install

Create an environment file:

Create a file named .env in the root of your project folder and add your API key:

REACT_APP_GEMINI_API_KEY=YOUR_API_KEY_HERE

Note: The React code I provided doesn't use an environment variable, but this is the standard and most secure way to handle API keys in a real project. You would need to modify the fetch calls in App.js to use process.env.REACT_APP_GEMINI_API_KEY instead of an empty string.

Start the development server:

npm start

The application will open automatically in your browser at http://localhost:3000.

<img width="475" height="674" alt="image" src="https://github.com/user-attachments/assets/6fe84262-9da4-40d1-beb3-194e8485babd" />

Usage

Enter a basic idea for your wallpaper into the text area (e.g., "a cat sitting on a stack of books").

(Optional) Click the "✨ Enhance Prompt" button to let the AI rewrite your idea into a more descriptive prompt.

Click the "Generate Wallpaper" button.

Wait for the AI to create your image.

Once the image appears, click on it to download it.

License

Distributed under the MIT License. See LICENSE file for more information.

