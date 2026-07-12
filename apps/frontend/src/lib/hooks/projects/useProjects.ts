import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  ProjectFilters,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  TaskFilters,
  getTimeLogs,
  getProjectDashboard,
} from "@/lib/api/projects";
import { Project, ProjectTask } from "@/types/projects";
import { PaginationParams } from "@/lib/api/crm";
import { toast } from "sonner";

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------

export function useProjects(filters: ProjectFilters = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.projects.projects.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getProjects({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.projects.all });
      toast.success("Project created successfully");
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => updateProject(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.projects.projects.detail(id) });
      const previous = queryClient.getQueryData<Project>(queryKeys.projects.projects.detail(id));
      if (previous) {
        queryClient.setQueryData<Project>(queryKeys.projects.projects.detail(id), {
          ...previous,
          ...data,
        });
      }
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          queryKeys.projects.projects.detail(variables.id),
          context.previous,
        );
      }
      toast.error("Failed to update project");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.projects.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.projects.all });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.projects.all });
      toast.success("Project deleted successfully");
    },
  });
}

// ----------------------------------------------------------------------------
// Tasks (Kanban)
// ----------------------------------------------------------------------------

export function useTasks(filters: TaskFilters = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.projects.tasks.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getTasks({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.tasks.all });
      toast.success("Task created");
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectTask> }) => updateTask(id, data),
    onMutate: async ({ id, data }) => {
      // Optimistic update for Kanban dragging
      await queryClient.cancelQueries({ queryKey: queryKeys.projects.tasks.detail(id) });
      const previous = queryClient.getQueryData<ProjectTask>(queryKeys.projects.tasks.detail(id));
      if (previous) {
        queryClient.setQueryData<ProjectTask>(queryKeys.projects.tasks.detail(id), {
          ...previous,
          ...data,
        });
      }
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.projects.tasks.detail(variables.id), context.previous);
      }
      toast.error("Failed to update task");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.tasks.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.tasks.all });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.tasks.all });
      toast.success("Task deleted");
    },
  });
}

// ----------------------------------------------------------------------------
// TimeLogs & Dashboards
// ----------------------------------------------------------------------------

export function useTimeLogs(filters: PaginationParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.projects.timelogs.list(filters as Record<string, unknown>),
    queryFn: async ({ pageParam = 1 }) => getTimeLogs({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
  });
}

export function useProjectDashboardQuery() {
  return useQuery({
    queryKey: queryKeys.projects.dashboard,
    queryFn: getProjectDashboard,
  });
}

/**
 * Unified Facade for Projects domain.
 */
export function useProjectsModule() {
  return {
    dashboard: useProjectDashboardQuery,
    projects: {
      useList: useProjects,
      useCreate: useCreateProject,
      useUpdate: useUpdateProject,
      useDelete: useDeleteProject,
    },
    tasks: {
      useList: useTasks,
      useCreate: useCreateTask,
      useUpdate: useUpdateTask,
      useDelete: useDeleteTask,
    },
    timelogs: {
      useList: useTimeLogs,
    },
  };
}
