import { useState, useEffect } from 'react';
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function TsuribaDetail() {
    const navigate = useNavigate();
    const [tsuribaData, setTsuribaData] = useState([]);
    const { id } = useParams(); // URLからidを取得

    // 初期データ読み込み
    useEffect(() => {
        fetch(`${baseUrl}/api/tsuriba/${id}`)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 404) {
                        navigate("/not-found"); // ← 404ならリダイレクト
                    }
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => setTsuribaData(json))
            .catch(err => console.error('データ取得失敗:', err));
    }, [id]);

    return (
        <>
            <Header />
            <div className='mainContainer'>
                <div className='detailContainer'>
                    {/* ここに写真貼る予定 */}
                    <div>
                        <div className='detail-img'>No Image</div>
                    </div>
                    <div className='tsuribaDetailRow tsuribaNameContainer'>
                        <h1>{tsuribaData.name}の釣り場詳細情報</h1>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>都道府県：{tsuribaData.pref}</p>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>市区町村：{tsuribaData.city}</p>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>場所の詳細：{tsuribaData.place_detail}</p>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>詳細情報：</p>
                        <p style={{ whiteSpace: "pre-wrap" }}>{tsuribaData.detail}</p>
                    </div>
                </div>
                <div className='tsuribaDetailRow backButtonContainer'>
                    <Link to="/">
                        <Button variant="contained" sx={{
                            backgroundColor: '#948686',
                            '&:hover': {
                                backgroundColor: '#716060',
                            },
                            fontSize: '1rem',
                            letterSpacing: '0.1',
                            padding: '8px 16px',
                            borderRadius: '8px',
                        }}>戻る</Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TsuribaDetail