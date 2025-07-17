import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function prefAccordion() {

  const [results, setResults] = useState([]);

  // 初期データ読み込み
  useEffect(() => {
    fetch(`/api/pref/city`)
      .then(res => res.json())
      .then(json => setResults(json))
      .catch(err => console.error('データ取得失敗:', err));
  }, []);

  return (
    <div style={{ width: '200px' }}>
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
            <Typography>{pref.pref_name}</Typography>
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