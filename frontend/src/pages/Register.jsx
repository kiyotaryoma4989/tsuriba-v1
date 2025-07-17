import { useState, useEffect } from 'react';
import Header from '../component/Header'
import Footer from '../component/Footer'
import Accordion from '../component/Accordion'
import Form from '../component/Form'
import Table from '../component/Table'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [results, setResults] = useState([]);

  // 釣り場データの全件取得
  const fetchData = () => {
    fetch('/api/tsuriba/list')
      .then(res => res.json())
      .then(json => setResults(json))
      .catch(err => console.error('データ取得失敗:', err));
  };

  // 行クリック時の処理
  const handleRowClick = (params) => {
    navigate(`/tsuriba/${params.id}`)
  }

  // 初期データ読み込み
  useEffect(() => {
    fetchData();
  }, []);

  // 新規登録
  const handleRegister = (formData) => {
    fetch('/api/tsuriba/create', {
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
      <div className='mainContainer'>
        <div className='towColumnContainer'>
          <div>
            <Accordion />
          </div>
          <div className='mainColumn'>
            <div className='formContainer'>
              <Form onRegister={handleRegister} />
            </div>
            <div className='tableContainer'>
              <Table data={results} columns={columns} onRowclick={handleRowClick} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register