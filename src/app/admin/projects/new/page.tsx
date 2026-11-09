import { ProjectEditor } from "@/components/admin/projects/ProjectEditor";
import { getCategories } from "@/lib/data/api";

export default async function NewProjectPage() {
  const categories = await getCategories();
  return <ProjectEditor categories={categories} />;
}

