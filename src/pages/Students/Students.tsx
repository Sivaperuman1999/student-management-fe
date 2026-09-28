import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import type { Student } from "../../api";
import { studentApi } from "../../api";
import { Box, CircularProgress, Alert } from "@mui/material";

const columns: GridColDef<Student>[] = [
  { field: "_id", headerName: "ID", width: 120, flex: 1 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
    flex: 1,
    editable: false,
  },
  {
    field: "rollNo",
    headerName: "Roll Number",
    width: 130,
    flex: 1,
    editable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 130,
    flex: 1,
    editable: false,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "year",
    headerName: "Year",
    width: 80,
    flex: 1,
    type: "number",
    editable: false,
  },
];

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await studentApi.getAllStudents();
        setStudents(response.data);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch students";
        setError(errorMessage);
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Box sx={{ paddingLeft: "70px", paddingRight: "20px", paddingTop: "20px" }}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable<Student>
          rows={students}
          columns={columns}
          pageSize={10}
          checkboxSelection={false}
        />
      )}
    </Box>
  );
}

export default Students;
