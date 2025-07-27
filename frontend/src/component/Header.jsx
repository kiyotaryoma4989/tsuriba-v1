import Button from '@mui/material/Button';
import logo from '../assets/logo1.png';

function Header({ openMenu, handleMemberRegistration, handleLogin }) {

  // SVGアイコンコンポーネント
  const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <header className="header">
      <div className="inner">
        <div className='header-contents'>
          <div className="titleContainer">
            <h2 className="logo">
              <img src={logo} alt="logo" />
            </h2>
            <small>まだ無名の釣り場情報サイト</small>
          </div>
          <div className='header-btns'>
            <Button className='btn-userRegist' variant="contained" sx={{
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
            <Button className='btn-login' variant="contained" sx={{
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
          {/* ハンバーガーボタン */}
          <button
            className='btn-hamburger' 
            onClick={openMenu}
            aria-label="メニューを開く"
          >
            <div style={{
              position: 'relative',
              width: '24px',
              height: '24px'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transition: 'all 0.3s ease'
              }}>
                <MenuIcon />
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
