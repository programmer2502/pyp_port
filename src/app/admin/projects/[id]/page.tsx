import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/projects/ProjectEditor";
import { getProjectById, getCategories } from "@/lib/data/api";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const [project, categories] = await Promise.all([
    getProjectById(id),
    getCategories(),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectEditor initialProject={project} categories={categories} />;
}

