import { apiClient } from "../lib/apiClient";

export interface Student {
  _id: string;
  name: string;
  rollNo: string;
  email: string;
  phoneNumber: string;
  department: string;
  year: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStudentPayload {
  name: string;
  rollNo: string;
  email: string;
  phoneNumber: string;
  department: string;
  year: number;
}

export interface UpdateStudentPayload {
  name?: string;
  rollNo?: string;
  email?: string;
  phoneNumber?: string;
  department?: string;
  year?: number;
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
