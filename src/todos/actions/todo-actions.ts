"use server";

import prisma from "@/lib/prisma";
import { updateTodo } from "../helpers/todos";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NewTodo } from "../components/NewTodo";
import { resolve } from "path";

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw `Todo con id ${id} no encontrado`;

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");
  return updateTodo;
};

export const addTodo = async (description: string) => {
  try {
    const newTodo = await prisma.todo.create({ data: { description } });

    revalidatePath("/dashboard/server-todos");
    return newTodo;
  } catch (error) {
    return { message: "Error creando todo" };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    // que hacer en el catch si retorna void???
  }
};
