# **FinAI — GenAI Credit Card Virtual Assistant**

> A smart AI-powered assistant that helps users with credit card queries such as card delivery, billing, statements, EMIs, repayment options, overdue collections — through **chat and voice** interaction.

This prototype showcases:

-   Hybrid knowledge retrieval (Knowledge Base → LLM fallback → APIs)
    
-   Action execution (mock microservices)
    
-   Context-aware responses
    
-   Email delivery with PDF statements
    
-   Session tracking, feedback capture & analytics-ready architecture
    
-   Voice input (Speech-to-Text) + AI speech responses (Text-to-Speech)
    

##  Features

-   Conversational chat for real-time user interaction
    
-   Voice input via browser microphone
    
-   Text-to-speech assistant replies
    
-   LLM-powered intent detection and entity extraction
    
-   Knowledge base responses with MongoDB and Redis caching
    
-   Actionable workflows like EMI eligibility, card tracking, and bill details
    
-   Email delivery of PDF statements to verified addresses
    
-   Session storage with conversation logging
    
-   Feedback collection with thumbs up / thumbs down
    
-   Analytics endpoints for Grafana dashboards
    
-   Frontend UI built with React, Tailwind, and Framer UI
    

## Tech Stack

### **Frontend**

-   React (Vite)
    
-   TailwindCSS v4
    
-   Framer Motion
    
-   Web Speech API (Voice input & TTS)
    

### **Backend**

-   Node.js + Express
    
-   MongoDB + Mongoose
    
-   Redis (Caching & session memory)
    
-   OpenAI API (Intent classification & entity extraction)
    
-   PDFKit + Nodemailer (Email statements)
    
-   Logging & analytics middleware
    

## Folder Structure

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`FinAI/   ├── backend/   │   ├── src/   │   │   ├── controllers/   │   │   ├── routes/   │   │   ├── services/   │   │   ├── models/   │   │   ├── knowledgebase/   │   │   ├── utils/   │   │   └── app.js   │   ├── .env   │   └── package.json   ├── frontend/   │   ├── src/pages/   │   ├── src/components/   │   ├── src/hooks/   │   ├── public/   │   ├── .env   │   └── package.json   └── README.md`

## ⚙️ Prerequisites

Make sure the following are installed:

-   Node.js ≥ 18
    
-   MongoDB (local or Atlas)
    
-   Redis (local or cloud)
    
-   OpenAI API key
    

#  Backend Setup

### 1️. Navigate to backend folder:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`cd backend`

### 2️. Install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`npm install`

### 3️. Create .env file:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`PORT=5000  MONGO_URI=mongodb://localhost:27017/finai  REDIS_URL=redis://localhost:6379  OPENAI_API_KEY=YOUR_OPENAI_KEY_HERE  SMTP_HOST=smtp.gmail.com  SMTP_PORT=587  SMTP_USER=youremail@gmail.com  SMTP_PASS=your-app-password`

> ⚠️ If using Gmail, ensure you generate an **App Password**.

### 4️. Seed the knowledgebase:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`npm run seed:faq`

### 5️. Start backend:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`npm run dev`

If successful, you should see:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`🚀 FinAI backend running on http://localhost:5000  Connected to MongoDB  Redis connected`

# Frontend Setup

### 1️. Navigate:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`cd frontend`

### 2️. Install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`npm install`

### 3️. Create .env:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`VITE_API_BASE_URL=http://localhost:5000`

### 4️. Start development server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`npm run dev`

App will open at:

👉 http://localhost:5173
