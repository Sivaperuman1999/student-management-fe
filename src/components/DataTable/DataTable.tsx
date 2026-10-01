import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

interface DataTableProps<T extends Record<string, any>> {
  rows: T[];
  columns: GridColDef<T>[];
  pageSize?: number;
  checkboxSelection?: boolean;
  getRowId?: (row: T) => any;
}

function DataTable<T extends Record<string, any>>({
  rows,
  columns,
  pageSize = 5,
  checkboxSelection = false,
  getRowId,
}: DataTableProps<T>) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
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
