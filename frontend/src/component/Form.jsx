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

function Form({ onRegister }) {
  const [pref, setPref] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [placeDetail, setPlaceDetail] = useState('');
  const [detail, setDetail] = useState('');

  // 都道府県が選ばれたとき、該当市区町村をバックエンドから取得
  const handlePrefChange = (prefCode) => {
    setPref(prefCode)
    fetch(`/api/cities?prefCode=${prefCode}`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(console.error)
  }

  // 登録ボタンの処理
  const handleSubmit = () => {
    if (!pref || !city) return;
    onRegister({
      prefCode: pref,
      cityId: city,
      placeDetail: placeDetail,
      detail: detail
    });
    setPref('')
    setCity('')
    setPlaceDetail('')
    setDetail('')
  };
  return (
    <Paper sx={{p: 4}}>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ width: 120 }}>釣り場住所</Typography>
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
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ minWidth: 120, marginTop: 2 }}>場所の詳細</Typography>
        <TextField
          label="場所の詳細"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setPlaceDetail(e.target.value)}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ minWidth: 120, marginTop: 2 }}>詳細情報</Typography>
        <TextField
          label="詳細情報"
          variant="outlined"
          fullWidth
          margin="normal"
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