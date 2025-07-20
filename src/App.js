import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import HomePage from './pages/HomePage';
import SetupPage from './pages/SetupPage';
import WaitingRoomPage from './pages/WaitingRoomPage';
import InterviewPage from './pages/InterviewPage';
import ResultPage from './pages/ResultPage';


// 전역 스타일
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
  }

  button {
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/waiting" element={<WaitingRoomPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
`;

export default App;