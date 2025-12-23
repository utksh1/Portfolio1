import type { Metadata } from "next";
import { projectsData } from "@/lib/projects";
import ClientProjectPage from "./ClientProjectPage";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find(p => p.id === params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found - Portfolio",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - ${project.subtitle} | Portfolio`,
    description: project.description,
    keywords: project.technologies.concat(project.tags).join(", "),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `https://yourportfolio.com/projects/${project.id}`,
      images: [
        {
          url: `/screenshots/${project.id}-preview.jpg`,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.subtitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [`/screenshots/${project.id}-preview.jpg`],
    },
    alternates: {
      canonical: `https://yourportfolio.com/projects/${project.id}`,
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  
  // Find the project by slug
  const project = projectsData.find(p => p.id === slug);
  
  return <ClientProjectPage project={project} slug={slug} />;
}