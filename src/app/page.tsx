export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-cyber text-glow-cyan font-bold">
          Welcome to Portfolio OS
        </h1>
        <p className="text-xl text-cyber-cyan font-mono">
          Futuristic Developer Experience Loading...
        </p>
        <div className="flex space-x-4 justify-center">
          <div className="w-3 h-3 bg-cyber-cyan rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-cyber-purple rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-cyber-blue rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
}