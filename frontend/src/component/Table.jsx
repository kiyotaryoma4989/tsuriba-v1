import { DataGrid } from '@mui/x-data-grid';

function Table({ data, titles }) {
  if (!data || data.length === 0) {
    return <p>データがありません</p>;
  }

  const columns = Object.keys(data[0]).map((key, index) => ({
    field: key,
    headerName: titles[index],
    width: 150,
  }));

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