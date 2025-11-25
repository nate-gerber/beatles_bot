import ChatContainer from "@/components/ChatContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 py-8 sm:py-12">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-300">
            Beatles Bot
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Chat with your Beatles expert
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Ask me anything about The Beatles - their songs, albums, history, members, and more!
          </p>
        </header>

        <ChatContainer />
      </main>
    </div>
  );
}
