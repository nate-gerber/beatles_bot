import ChatContainer from "@/components/ChatContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#1a1a1a] relative overflow-hidden">
      {/* Decorative elements inspired by Revolver artwork */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#8b7355] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8b7355] opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <main className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 py-8 sm:py-12">
        <header className="space-y-4 text-center">
          <div className="inline-block">
            <p className="text-xs uppercase tracking-[0.5em] text-[#8b7355] font-medium mb-2">
              1966
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#1a1a1a]">
              REVOLVER
            </h1>
            <div className="mt-2 h-1 w-24 bg-[#1a1a1a] mx-auto"></div>
          </div>
          <p className="text-base sm:text-lg text-[#4a4a4a] max-w-2xl mx-auto font-light italic">
            Chat with your Beatles expert about the revolutionary album that changed everything
          </p>
          <p className="text-sm text-[#8b7355] uppercase tracking-wider">
            Ask about songs, albums, history, members & more
          </p>
        </header>

        <ChatContainer />
      </main>
    </div>
  );
}
