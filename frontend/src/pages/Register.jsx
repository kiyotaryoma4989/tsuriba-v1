import { useState, useEffect } from 'react';
import Header from '../component/Header'
import Footer from '../component/Footer'
import Accordion from '../component/Accordion'
import Form from '../component/Form'
import Table from '../component/Table'
import Menu from '../component/Menu'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const navigate = useNavigate()
  const [results, setResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const [openSuccess, setOpenSuccess] = useState(false); // Snackbarの開閉状態
  const [openFail, setOpenFail] = useState(false);

  // 釣り場データの全件取得
  const fetchData = () => {
    fetch(`${baseUrl}/api/tsuriba/list`)
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
    return fetch(`${baseUrl}/api/tsuriba/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('登録に失敗しました');
    
        // 成功Snackbarを表示
        setOpenSuccess(true);
        return true;
      })
      .then(() => fetchData()) // 成功後に再取得
      .catch(err => {
        console.error('登録失敗:', err)
        // 失敗Snackbarを表示
        setOpenFail(true);
        return false
      });
  };

  // 新規会員登録
  const handleMemberRegistration = () => {
    Swal.fire({
      title: 'sorry...',
      text: 'まだ実装できてません。',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }
  // ログイン
  const handleLogin = () => {
    Swal.fire({
      title: 'sorry...',
      text: 'まだ実装できてません。',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }

  // テーブル設定
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'pref', headerName: '都道府県', width: 100 },
    { field: 'city', headerName: '市区町村', width: 100 },
    { field: 'name', headerName: '釣り場名', width: 150 },
    { field: 'placeDetail', headerName: '場所の詳細', flex: 1 }
  ];

  return (
    <>
      <Header openMenu={openMenu} handleMemberRegistration={handleMemberRegistration} handleLogin={handleLogin} />
      <div className='mainContainer'>
        <div className='towColumnContainer'>
          <div className='sideMenu'>
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
      {/* 成功メッセージ */}
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(false)}>
        <Alert severity="success" onClose={() => setOpenSuccess(false)}>
          登録が完了しました！
        </Alert>
      </Snackbar>
      {/* 失敗メッセージ */}
      <Snackbar open={openFail} autoHideDuration={3000} onClose={() => setOpenFail(false)}>
        <Alert severity="error" onClose={() => setOpenFail(false)}>
          登録処理に失敗しました。もう一度、お試し下さい。
        </Alert>
      </Snackbar>
      <Menu isOpen={isMenuOpen} closeMenu={closeMenu} handleMemberRegistration={handleMemberRegistration} handleLogin={handleLogin} />
    </>
  )
}

export default Register