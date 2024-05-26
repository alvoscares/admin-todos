export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";

import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Lista de Todos",
  description: "SEO Title",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Server Actions</h1>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
