import { apiClient } from "../lib/apiClient";

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber?: string;
  className?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStudentPayload {
  name: string;
  email: string;
  rollNumber?: string;
  className?: string;
}

export interface UpdateStudentPayload {
  name?: string;
  email?: string;
  rollNumber?: string;
  className?: string;
}

export interface StudentListResponse {
  message: string;
  data: Student[];
}

const STUDENT_ENDPOINTS = {
  LIST: "/students",
  DETAIL: (id: string) => `/students/${id}`,
//   SEARCH: "/students/search",
} as const;

export const studentApi = {
  getAllStudents: (params?: { page?: number; limit?: number }) =>
    apiClient.get<StudentListResponse>(STUDENT_ENDPOINTS.LIST, { params }),

  getStudentById: (id: string) =>
    apiClient.get<Student>(STUDENT_ENDPOINTS.DETAIL(id)),

  createStudent: (data: CreateStudentPayload) =>
    apiClient.post<Student>(STUDENT_ENDPOINTS.LIST, data),

  updateStudent: (id: string, data: UpdateStudentPayload) =>
    apiClient.put<Student>(STUDENT_ENDPOINTS.DETAIL(id), data),

  deleteStudent: (id: string) =>
    apiClient.delete<void>(STUDENT_ENDPOINTS.DETAIL(id)),

//   searchStudents: (query: string) =>
//     apiClient.get<Student[]>(STUDENT_ENDPOINTS.SEARCH, {
//       params: { q: query },
//     }),
};
