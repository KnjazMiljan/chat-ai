# Chat-AI

**Chat-AI** is an open-source frontend application designed to facilitate chat interactions with a locally installed Large Language Model (LLM). Built with React and Vite, this project provides a user-friendly interface for seamless communication with your local AI models.

## Features

- **Local LLM Integration**: Connect and interact with your locally hosted language models.
- **Responsive UI**: Built with React for a dynamic and responsive user experience.
- **Fast Development**: Utilizes Vite for rapid development and hot module replacement.
- **Customizable**: Easily extend and customize to fit your specific needs.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A locally installed LLM (e.g., [llama.cpp](https://github.com/ggerganov/llama.cpp), [Jan](https://github.com/menloresearch/jan), etc.)

## Getting Started

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```
git clone https://github.com/KnjazMiljan/chat-ai.git
cd chat-ai
```

### 2. Install Dependencies
```
npm install
```
### 3. Configure Environment Variables
Create a .env file in the root directory based on the provided .env.example. Specify the necessary environment variables, such as the endpoint for your local LLM.
```
VITE_AI_API_URL=http://localhost:11434/api/generate
```
### 4. Run the Development Server
```
npm run dev
```

## Project Structure

```
chat-ai/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # React components
│   ├── pages/          # Application pages
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── .env.example        # Example environment variables
├── index.html          # HTML template
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.js      # Vite configuration
```

### Scripts
`npm run dev`: Start the development server.

`npm run build`: Build the application for production.

`npm run preview`: Preview the production build.

`npm run lint`: Run ESLint to analyze code for potential errors.

### Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. **Fork the repository.**

2. **Create a new branch:**

```
git checkout -b feature/your-feature-name
```
3. **Make your changes and commit them:**

```
git commit -m "Add your feature"
```
4. **Push to the branch:**
```
git push origin feature/your-feature-name
```
5. **Open a pull request detailing your changes.**

Please ensure your code adheres to the project's coding standards and passes all linting checks.

## License

This project is licensed under the [MIT License](LICENSE).