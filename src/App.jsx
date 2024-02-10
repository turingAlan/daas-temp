import './App.css'
import Background from './components/bg'
import DataViewer from './pages/DataViewer'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers'

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DataViewer/>
    <Background/>
    </LocalizationProvider>
    </ThemeProvider>
    </>
  )
}

export default App
