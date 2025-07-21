// import "./App.css";
import { ArrowBack } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const Button = styled('button')(({ theme }) => ({
  backgroundColor: 'red',
  color: 'black',
  padding: '0.8rem',
  borderRadius: '0.5rem',
  border: 'none',
}));

function App() {
  return (
    <div className="App">
      <ArrowBack sx={{ fontSize: "24px" }} />
      <Button>v5 MUI</Button>
    </div>
  );
}

export default App;
