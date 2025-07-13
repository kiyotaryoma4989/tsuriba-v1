import Button from '@mui/material/Button';
import logo from '../assets/logo1.png';
import Swal from 'sweetalert2'

function Header() {

  const handleMemberRegistration = () => {
    Swal.fire({
      title: 'sorry...',
      text: 'まだ実装できてません。',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }
  const handleLogin = () => {
    Swal.fire({
      title: 'sorry...',
      text: 'まだ実装できてません。',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }

  return (
    <header className="header">
      <div className="inner">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
          }}>
          <div className="titleContainer">
            <h2 className="logo"><img src={logo} alt="logo" /></h2>
            <small>まだ無名の釣り場情報サイト</small>
          </div>
          <div>
            <Button variant="contained" sx={{
              backgroundColor: '#e60012',
              '&:hover': {
                backgroundColor: '#c20002',
              },
              fontSize: '1rem',
              letterSpacing: '0.1',
              padding: '8px 16px',
              borderRadius: '8px',
              marginRight: '12px'
            }} onClick={handleMemberRegistration}>会員登録</Button>
            <Button variant="contained" sx={{
              color: '#e60012',
              backgroundColor: '#fff',
              border: '1px solid #e60012',
              '&:hover': {
                backgroundColor: '#eee',
              },
              fontSize: '1rem',
              letterSpacing: '0.1',
              padding: '8px 16px',
              borderRadius: '8px',
            }} onClick={handleLogin}>ログイン</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
