import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Box'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Form({ onRegister }) {
  const [pref, setPref] = useState('');
  const [city, setCity] = useState('');
  const [detail, setDetail] = useState('');

  const handleSubmit = () => {
    console.log('入力内容:', detail);
    if (!pref || !city) return;
    onRegister({
      pref: pref,
      city: city,
      detail: detail
    });
    setPref('')
    setCity('')
    setDetail('')
  };
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ width: 120 }}>釣り場住所</Typography>
        <Box sx={{ width: '180px' }}>
          <FormControl fullWidth>
            <InputLabel id="pref-label">都道府県</InputLabel>
            <Select
              labelId="pref-label"
              value={pref}
              label="都道府県"
              onChange={(e) => setPref(e.target.value)}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="tokyo">東京</MenuItem>
              <MenuItem value="osaka">大阪</MenuItem>
              <MenuItem value="kyoto">京都</MenuItem>
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
              <MenuItem value="tokyo">千代田区</MenuItem>
              <MenuItem value="osaka">京都市</MenuItem>
              <MenuItem value="kyoto">大阪市</MenuItem>
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
    </div>
  )
}

export default Form