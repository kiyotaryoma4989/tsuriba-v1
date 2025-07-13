import { DataGrid } from '@mui/x-data-grid';

function Table({ data, columns }) {
  if (!data || data.length === 0) {
    return <p>データがありません</p>;
  }

  return (
    <DataGrid
      columns={columns}
      rows={data}
      pageSize={5}
      rowsPerPageOptions={[5, 10]}
      pagination
    />
  );
}

export default Table