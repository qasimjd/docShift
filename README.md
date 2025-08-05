# 📄 DocSift - AI-Powered Document Summarization Platform

**Summarize Any Document in Seconds**

DocSift is a cutting-edge SaaS platform that transforms lengthy documents into clear, concise summaries using advanced AI technology. Whether you're a student, legal professional, researcher, or business owner, DocSift saves you time by instantly extracting key insights from any document.

![DocSift Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=DocSift+Document+Summarization)

## ✨ Features

### 🚀 **Smart Document Processing**
- **Instant Processing**: Get AI-generated summaries in seconds
- **Large File Support**: Handle documents up to 32MB in size
- **Secure Upload**: Files are processed securely with enterprise-grade security

### 🧠 **AI-Powered Intelligence**
- **Advanced Summarization**: Powered by Google's Gemini AI for accurate and contextual summaries
- **Interactive Chat**: Ask questions about your documents and get intelligent responses
- **Key Insights Extraction**: Automatically identify main points, arguments, and conclusions
- **Contextual Understanding**: AI understands document context for better summaries

### 💼 **Professional Features**
- **Document Library**: Organize and manage all your documents in one place
- **Search Functionality**: Find documents quickly with intelligent search
- **Document Viewer**: Built-in viewer for easy document navigation
- **Export Options**: Download and share summaries easily

### 🔐 **Enterprise-Ready**
- **User Authentication**: Secure login with Clerk authentication
- **Subscription Management**: Flexible pricing with Stripe integration
- **Usage Tracking**: Monitor your document processing credits
- **Data Privacy**: Your documents are processed securely and privately

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations

**Backend & Database:**
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database ORM
- [PostgreSQL](https://www.postgresql.org/) (via Neon) - Reliable database
- [UploadThing](https://uploadthing.com/) - File upload management

**AI & Processing:**
- [Google Gemini AI](https://ai.google.dev/) - Advanced language model
- [LangChain](https://langchain.com/) - AI application framework
- [PDF Parse](https://www.npmjs.com/package/pdf-parse) - PDF text extraction

**Authentication & Payments:**
- [Clerk](https://clerk.com/) - Complete authentication solution
- [Stripe](https://stripe.com/) - Payment processing and subscriptions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- PostgreSQL database (we recommend [Neon](https://neon.tech/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/qasimjd/docSift.git
   cd docSift
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   CLERK_WEBHOOK_SECRET="your_clerk_webhook_secret"
   
   # Google AI
   GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"
   
   # UploadThing
   UPLOADTHING_SECRET="your_uploadthing_secret"
   UPLOADTHING_APP_ID="your_uploadthing_app_id"
   
   # Stripe
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
   
   # Redis (Optional - for caching)
   UPSTASH_REDIS_REST_URL="your_redis_url"
   UPSTASH_REDIS_REST_TOKEN="your_redis_token"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see DocSift in action!

## 📖 How It Works

### 1. **Upload Your Document** 📤
- Drag and drop or select your PDF, DOCX, or TXT file
- Files are securely uploaded and processed instantly
- Support for documents up to 32MB

### 2. **AI Processing** 🤖
- DocSift extracts text from your document
- Google's Gemini AI analyzes the content
- Key insights and summaries are generated automatically

### 3. **Interactive Experience** 💬
- View your document summary immediately
- Ask questions about the document content
- Get contextual answers powered by AI

### 4. **Organize & Share** 📋
- All documents are saved in your personal dashboard
- Search through your document library
- Export summaries or share insights with others

## 🏗️ Project Structure

```
docSift/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Landing page
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── document-viewer/   # Document viewer
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── actions/              # Server actions
├── db/                   # Database schema and config
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🚀 Deployment

DocSift is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy with one click!

For other platforms, build the project:
```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and modern web technologies
- AI powered by [Google Gemini](https://ai.google.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication by [Clerk](https://clerk.com/)
- Payments by [Stripe](https://stripe.com/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check our documentation
- Contact support at [qasimjd8@gmail.com](mailto:qasimjd8@gmail.com)

---

**Made with ❤️ by Qasim Ali** - Transforming how you interact with documents, one summary at a time.
