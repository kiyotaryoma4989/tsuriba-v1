import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function prefAccordion({ setSelectedPrefData }) {
  const [results, setResults] = useState([]);
  const [selectedPrefCode, setSelectedPrefCode] = useState(null); // 選択状態を保持

  // 初期データ読み込み
  useEffect(() => {
    fetch(`${baseUrl}/api/pref/city`)
      .then(res => res.json())
      .then(json => setResults(json))
      .catch(err => console.error('データ取得失敗:', err));
  }, []);

  // 都道府県クリック時の処理
  const handlePrefClick = (prefCode) => {
    if (selectedPrefCode === prefCode) {
      // すでに選択中なら解除して全件表示
      setSelectedPrefCode(null);

      fetch(`${baseUrl}/api/tsuriba/search`)
        .then((res) => res.json())
        .then((data) => {
          console.log("全件データ:", data);
          setSelectedPrefData(data);
        })
        .catch((err) => console.error("全件データ取得失敗:", err));
      return;
    }
    setSelectedPrefCode(prefCode);

    // 選択された都道府県のデータを取得
    fetch(`${baseUrl}/api/tsuriba/search?pref=${prefCode}`)
      .then(res => res.json())
      .then(data => {
        console.log("取得データ:", data);
        setSelectedPrefData(data);
      })
      .catch(err => console.error("都道府県データ取得失敗:", err));
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary sx={{
          color: '#fff',
          backgroundColor: '#e60012',
          borderRadius: '6px 6px 0 0'
        }}>
          <Typography>
            都道府県から探す
          </Typography>
        </AccordionSummary>
      </Accordion>
      {results.map((pref) => (
        <Accordion key={pref.pref_code}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              onClick={() => handlePrefClick(pref.pref_code)}
              sx={{
                cursor: "pointer",
                fontWeight:
                  selectedPrefCode === pref.pref_code ? "bold" : "normal",
                color:
                  selectedPrefCode === pref.pref_code ? "#e60012" : "inherit"
              }}
            >
              {pref.pref_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {pref.cities.map((city) => (
              <Typography key={city.city_id} sx={{ pl: 2 }}>
                {city.city_name}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default prefAccordion