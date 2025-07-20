import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // 이 줄 추가

const HomePage = () => {
  const navigate = useNavigate();  
  
  const handleModeSelect = (mode) => {
    navigate(`/setup?mode=${mode}`);
    alert(`${mode} 모드를 선택하셨습니다. 설정 페이지로 이동합니다.`);
  };

  return (
    <HomeContainer>
      <BackgroundImage />
      <BackgroundOverlay />
      
      <Header>
        <Logo>AI INTERVIEW</Logo>
        <NavLinks>
          <NavLink href="#about">소개</NavLink>
          <NavLink href="#features">기능</NavLink>
          <NavLink href="#contact">문의</NavLink>
        </NavLinks>
      </Header>

      <MainContent>
        <HeroSection>
          <MainTitle>AI INTERVIEW</MainTitle>
          <Subtitle>인공지능과 함께하는 스마트한 면접 연습</Subtitle>
          
          <ModeContainer>
            <ModeCard onClick={() => handleModeSelect('coaching')}>
              <ModeTitle>코칭모드</ModeTitle>
              <ModeDescription>
                실시간 피드백과 함께<br />
                면접 실력을 향상시켜보세요
              </ModeDescription>
            </ModeCard>
            
            <ModeCard onClick={() => handleModeSelect('practice')}>
              <ModeTitle>실전모드</ModeTitle>
              <ModeDescription>
                실제 면접과 같은 환경에서<br />
                연습해보세요
              </ModeDescription>
            </ModeCard>
          </ModeContainer>
        </HeroSection>
      </MainContent>

      <BottomSection>
        <FeatureHighlight>
          <FeatureText>세계적 수준의 AI 기술로 더욱 정확한 면접 연습을 경험하세요</FeatureText>
        </FeatureHighlight>
      </BottomSection>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  
  /* 기본 그라데이션 배경 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* 배경 이미지 */
  background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* 이미지 로딩 중일 때 fallback */
  background-image: 
    url('/assets/images/interview-background.jpg'),
    linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.7) 0%,
    rgba(40, 40, 40, 0.5) 50%,
    rgba(60, 60, 60, 0.7) 100%
  );
  z-index: -1;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
`;

const Logo = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 30px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ff6b6b;
    transform: translateY(-2px);
  }
`;

const MainContent = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 40px;
`;

const HeroSection = styled.section`
  text-align: center;
  max-width: 1200px;
  width: 100%;
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: white;
  margin: 0 0 20px 0;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 60px 0;
  font-weight: 300;
  letter-spacing: 1px;
`;

const ModeContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 80px;
`;

const ModeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px 30px;
  width: 280px;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 107, 107, 0.5);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ModeIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ModeTitle = styled.h3`
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px 0;
  letter-spacing: 1px;
`;

const ModeDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
`;

const BottomSection = styled.section`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px;
`;

const FeatureHighlight = styled.div`
  text-align: center;
`;

const FeatureText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0;
`;

export default HomePage;