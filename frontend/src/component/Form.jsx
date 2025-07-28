import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import prefectures from '../data/pref.json';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Form({ onRegister }) {
  const [tsuribaName, setTsuribaName] = useState('');
  const [pref, setPref] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [placeDetail, setPlaceDetail] = useState('');
  const [detail, setDetail] = useState('');
  const [nameError, setNameError] = useState("");
  const [placeError, setPlaceError] = useState("");
  const [placeDetailError, setPlaceDetailError] = useState("");

  // 都道府県が選ばれたとき、該当市区町村をバックエンドから取得
  const handlePrefChange = (prefCode) => {
    setPref(prefCode)
    fetch(`${baseUrl}/api/cities?prefCode=${prefCode}`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(console.error)
  }

  // 登録ボタンの処理
  const handleSubmit = () => {

    // バリデーション
    let invalid = false;
    if (tsuribaName.trim() === "") {
      setNameError("名前を入力してください");
      invalid = true;
    } else {
      setNameError("")
    };
    if (!pref || !city) {
      setPlaceError("都道府県、市区町村を入力してください");
      invalid = true;
    }else {
      setPlaceError("")
    };
    if (placeDetail.trim() === "") {
      setPlaceDetailError("場所の詳細を入力してください");
      invalid = true;
    }else {
      setPlaceError("")
    };
    if (invalid) return

    const success = onRegister({
      name: tsuribaName,
      prefCode: pref,
      cityId: city,
      placeDetail: placeDetail,
      detail: detail
    });

    if (success) {
      // フォームをクリア
      setTsuribaName('')
      setPref('')
      setCity('')
      setPlaceDetail('')
      setDetail('')
    }
  };
  return (
    <Paper sx={{
      p: {
        xs: 2,
        sm: 4,
      }
    }}>
      <Box sx={{ display: { xs: 'block', sm: 'flex' } }}>
        <Typography sx={{ minWidth: 120 }}>釣り場名 *</Typography>
        <Box sx={{ width: "100%" }} >
          <TextField
            value={tsuribaName}
            label="釣り場名"
            variant="outlined"
            fullWidth
            onChange={(e) => setTsuribaName(e.target.value)}
          />
          {nameError && <p style={{ color: "#e60012" }}>{nameError}</p>}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'flex' }, marginTop: 2 }}>
        <Typography sx={{ width: 120 }}>釣り場住所 *</Typography>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '180px' }}>
              <FormControl fullWidth>
                <InputLabel id="pref-label">都道府県</InputLabel>
                <Select
                  labelId="pref-label"
                  value={pref}
                  label="都道府県"
                  onChange={(e) => handlePrefChange(e.target.value)}
                >
                  {prefectures.map(pref => (
                    <MenuItem key={pref.code} value={pref.code}>
                      {pref.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl >
            </Box>
            <Box sx={{ width: '180px' }}>
              <FormControl fullWidth>
                <InputLabel id="city-label">市区町村</InputLabel>
                <Select
                  labelId="city-label"
                  value={city}
                  label="市区町村"
                  onChange={(e) => setCity(e.target.value)}
                >
                  <MenuItem value=""></MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.cityId} value={city.cityId}>
                      {city.cityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl >
            </Box>
          </Box>
          {placeError && <p style={{ color: "#e60012" }}>{placeError}</p>}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'flex' }, marginTop: 2 }}>
        <Typography sx={{ minWidth: 120 }}>場所の詳細 *</Typography>
        <Box sx={{ width: "100%" }} >
          <TextField
            value={placeDetail}
            label="場所の詳細"
            variant="outlined"
            fullWidth
            onChange={(e) => setPlaceDetail(e.target.value)}
          />
          {placeDetailError && <p style={{ color: "#e60012" }}>{placeDetailError}</p>}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'flex' }, marginTop: 2 }}>
        <Typography sx={{ minWidth: 120 }}>詳細情報</Typography>
        <TextField
          value={detail}
          label="詳細情報"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => setDetail(e.target.value)}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" sx={{
          width: '100%',
          backgroundColor: '#e10007',
          '&:hover': {
            backgroundColor: '#cc0010',
          },
          fontSize: '1.2rem',
          letterSpacing: '0.1',
          padding: '8px 0',
          borderRadius: '8px',
        }} onClick={handleSubmit}>登録</Button>
      </Box>
    </Paper>
  )
}

export default Form