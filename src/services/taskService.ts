
import { supabase } from "@/lib/supabaseClient";
import {
  Task,
  TaskCreate,
  TaskUpdate,
  TaskDetail,
  TaskDetailCreate,
  TaskDetailUpdate,
  TaskWithDetails,
  DisciplineOption,
} from "@/types/maintain";

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from("e_task")
      .select("*")
      .order("task_code");

    if (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }

    return data || [];
  },

  async getTaskWithDetails(id: number): Promise<TaskWithDetails> {
    const { data, error } = await supabase
      .from("e_task")
      .select(`
        *,
        details: e_task_detail(*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching task: ${error.message}`);
    }

    if (!data) {
      throw new Error(`Task with id ${id} not found`);
    }

    return data;
  },

  async createTask(task: TaskCreate): Promise<Task> {
    // Convert Date objects to ISO strings
    const taskData = {
      ...task,
      created_at: task.created_at ? task.created_at.toISOString() : undefined,
      updated_at: task.updated_at ? task.updated_at.toISOString() : undefined,
    };

    const { data, error } = await supabase
      .from("e_task")
      .insert(taskData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }

    return data;
  },

  async updateTask(task: TaskUpdate): Promise<Task> {
    // Convert Date objects to ISO strings
    const taskData = {
      ...task,
      updated_at: task.updated_at ? task.updated_at.toISOString() : undefined,
    };

    const { data, error } = await supabase
      .from("e_task")
      .update(taskData)
      .eq("id", task.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }

    return data;
  },

  async deleteTask(id: number): Promise<void> {
    const { error } = await supabase.from("e_task").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  },

  async getDisciplineOptions(): Promise<DisciplineOption[]> {
    const { data, error } = await supabase
      .from("e_discipline")
      .select("id, name")
      .order("name");

    if (error) {
      throw new Error(`Error fetching disciplines: ${error.message}`);
    }

    return (
      data?.map((discipline) => ({
        value: discipline.id,
        label: discipline.name,
      })) || []
    );
  },

  async addDetailsToTask(detail: TaskDetailCreate): Promise<TaskDetail> {
    // Convert Date objects to ISO strings
    const detailData = {
      ...detail,
      created_at: detail.created_at ? detail.created_at.toISOString() : undefined,
      updated_at: detail.updated_at ? detail.updated_at.toISOString() : undefined,
    };

    const { data, error } = await supabase
      .from("e_task_detail")
      .insert(detailData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error adding task detail: ${error.message}`);
    }

    return data;
  },

  async updateTaskDetail(detail: TaskDetailUpdate): Promise<TaskDetail> {
    // Convert Date objects to ISO strings
    const detailData = {
      ...detail,
      updated_at: detail.updated_at ? detail.updated_at.toISOString() : undefined,
    };

    const { data, error } = await supabase
      .from("e_task_detail")
      .update(detailData)
      .eq("id", detail.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating task detail: ${error.message}`);
    }

    return data;
  },

  async deleteTaskDetail(id: number): Promise<void> {
    const { error } = await supabase.from("e_task_detail").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting task detail: ${error.message}`);
    }
  },
};
