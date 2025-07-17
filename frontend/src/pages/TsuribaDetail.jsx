import { useState, useEffect } from 'react';
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

function TsuribaDetail() {
    const [tsuribaData, setTsuribaData] = useState([]);

    // 釣り場データの単体取得
    const fetchData = (tsuribaId) => {
        // fetch(`http://localhost:5050/api/tsuriba/${tsuribaId}`)
        //     .then(res => res.json())
        //     .then(json => setTsuribaData(json))
        //     .catch(err => console.error('データ取得失敗:', err));
    };

    // 初期データ読み込み
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className='mainContainer'>
                <div className='detailContainer'>
                    {/* ここに写真貼る予定 */}
                    <div className='tsuribaDetailRow tsuribaNameContainer'>
                        <h1>兵庫県神戸市の釣り場詳細情報</h1>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>都道府県：兵庫県</p>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>市区町村：神戸市</p>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>場所の詳細：神戸市立 平磯海づり公園</p>
                    </div>
                    <div className='tsuribaDetailRow'>
                        <p>詳細情報：</p>
                        <p>平磯海づり公園は、東西に1400ｍ延びた釣台で、ゆったりとしたフィッシングが楽しんでいただけます。<br />
                            身障者用（オストメイト対応）のトイレ・優先釣り場・スロープなどを完備しており、どなたにも、気軽に、安心してご利用いただける施設です。<br />
                            淡路島や明石海峡大橋を眺めながら、のんびり釣りを楽しんでみてはいかがですか？（公式サイトより）</p>
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