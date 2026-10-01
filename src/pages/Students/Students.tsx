import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import type { Student, CreateStudentPayload } from "../../api";
import { studentApi } from "../../api";
import { 
  Box, CircularProgress, Alert, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, IconButton 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateStudentPayload>({
    name: "",
    email: "",
    rollNo: "",
    phoneNumber: "",
    department: "",
    year: 1,
  });

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

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOpenForm = (student?: Student) => {
    if (student) {
      setIsEditing(true);
      setCurrentStudentId(student._id);
      setFormData({
        name: student.name,
        email: student.email,
        rollNo: student.rollNo,
        phoneNumber: student.phoneNumber,
        department: student.department,
        year: student.year,
      });
    } else {
      setIsEditing(false);
      setCurrentStudentId(null);
      setFormData({
        name: "",
        email: "",
        rollNo: "",
        phoneNumber: "",
        department: "",
        year: 1,
      });
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentStudentId) {
        await studentApi.updateStudent(currentStudentId, formData);
        Swal.fire("Success", "Student updated successfully", "success");
      } else {
        await studentApi.createStudent(formData);
        Swal.fire("Success", "Student added successfully", "success");
      }
      handleCloseForm();
      fetchStudents();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Operation failed";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await studentApi.deleteStudent(id);
        Swal.fire("Deleted!", "Student has been deleted.", "success");
        fetchStudents();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to delete student";
        Swal.fire("Error", errorMessage, "error");
      }
    }
  };

  const columns: GridColDef<Student>[] = [
    { field: "_id", headerName: "ID", width: 120, flex: 1 },
    { field: "name", headerName: "Name", width: 150, flex: 1, editable: false },
    { field: "email", headerName: "Email", width: 180, flex: 1, editable: false },
    { field: "rollNo", headerName: "Roll Number", width: 130, flex: 1, editable: false },
    { field: "phoneNumber", headerName: "Phone", width: 130, flex: 1, editable: false },
    { field: "department", headerName: "Department", width: 150, flex: 1, editable: false },
    { field: "year", headerName: "Year", width: 80, flex: 1, type: "number", editable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleOpenForm(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ paddingLeft: "70px", paddingRight: "20px", paddingTop: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <h2>Students</h2>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenForm()}>
          Add Student
        </Button>
      </Box>

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
          getRowId={(row) => row._id}
        />
      )}

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Student" : "Add Student"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Roll Number"
              name="rollNo"
              fullWidth
              required
              value={formData.rollNo}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Department"
              name="department"
              fullWidth
              required
              value={formData.department}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Year"
              name="year"
              type="number"
              fullWidth
              required
              value={formData.year}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit" variant="contained">
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Students;
