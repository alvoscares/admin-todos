export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";

import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Lista de Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
