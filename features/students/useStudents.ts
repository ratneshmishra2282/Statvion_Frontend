import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "./student.api";
import { StudentListParams } from "./student.types";
import toast from "react-hot-toast";

export function useStudentList(params: StudentListParams) {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => studentApi.list(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => studentApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => studentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student added successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add student");
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      studentApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({
        queryKey: ["students", variables.id],
      });
      toast.success("Student updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update student"
      );
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete student"
      );
    },
  });
}
