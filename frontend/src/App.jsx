import './App.css'
import { useState, useEffect } from 'react';
import Header from './component/Header'
import Footer from './component/Footer'
import Form from './component/Form'
import Table from './component/Table'

function App() {
  const [results, setResults] = useState([]);

  // 釣り場データの取得
  const fetchData = () => {
    fetch('http://localhost:5050/api/tsuriba/list')
      .then(res => res.json())
      .then(json => setResults(json))
      .catch(err => console.error('データ取得失敗:', err));
  };

  // 初期データ読み込み
  useEffect(() => {
    fetchData();
  }, []);

  // 新規登録
  const handleRegister = (formData) => {
    fetch('http://localhost:5050/api/tsuriba/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        console.log(res);
        if (!res.ok) throw new Error('登録に失敗しました');
        return res.json();
      })
      .then(() => fetchData()) // 成功後に再取得
      .catch(err => console.error('登録失敗:', err));
  };

  // テーブル設定
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'pref', headerName: '都道府県', width: 100 },
    { field: 'city', headerName: '市区町村', width: 100 },
    { field: 'placeDetail', headerName: '場所の詳細', width: 250 },
    { field: 'detail', headerName: '詳細', flex: 1 },
  ];

  return (
    <>
      <Header />
      <div className='formContainer'>
        <Form onRegister={handleRegister} />
      </div>
      <div className='tableContainer'>
        <Table data={results} columns={columns} />
      </div>
      <Footer />
    </>
  )
}

export default App
