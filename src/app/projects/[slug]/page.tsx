interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-cyber text-glow-cyan font-bold">
          Project: {params.slug}
        </h1>
        <p className="text-lg text-cyber-cyan font-mono">
          Detailed project view coming soon
        </p>
      </div>
    </div>
  );
}