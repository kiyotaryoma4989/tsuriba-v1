import Button from '@mui/material/Button';
import Accordion from '../component/Accordion'

function Menu({ isOpen, closeMenu, handleMemberRegistration, handleLogin , setSelectedPrefData }) {

    const CloseIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div>
            {/* オーバーレイ */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMenu}
            />

            {/* サイドメニュー */}
            <nav style={{
                ...styles.sideMenu,
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
            }}>
                <div style={styles.menuContent}>
                    {/* メニューヘッダー */}
                    <div style={styles.menuHeader}>
                        <div className='menu-btns'>
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
                        <button
                            onClick={closeMenu}
                            style={styles.closeButton}
                            aria-label="メニューを閉じる"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* メニューアイテム */}
                    <Accordion setSelectedPrefData={ setSelectedPrefData }/>
                </div>
            </nav>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
        zIndex: 40,
        transition: 'opacity 0.3s ease'
    },
    sideMenu: {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '320px',
        backgroundColor: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        zIndex: 50,
        transition: 'transform 0.3s ease-in-out'
    },
    menuContent: {
        overflow: 'scroll',
        padding: '1rem',
        height: '100%',
        position: 'relative'
    },
    menuHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e5e7eb'
    },
    closeButton: {
        padding: '0.5rem',
        borderRadius: '0.5rem',
        background: 'none',
        border: 'none',
        color: '#6b7280',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    }
};

export default Menu
