import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

interface DataTableProps<T extends { id: number | string }> {
  rows: T[];
  columns: GridColDef<T>[];
  pageSize?: number;
  checkboxSelection?: boolean;
}

function DataTable<T extends { id: number | string }>({
  rows,
  columns,
  pageSize = 5,
  checkboxSelection = false,
}: DataTableProps<T>) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default DataTable;
