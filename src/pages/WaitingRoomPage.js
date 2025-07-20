import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

const WaitingRoomPage = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [microphoneActive, setMicrophoneActive] = useState(false);
  const [speakerTested, setSpeakerTested] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const navigate = useNavigate();  
  const [searchParams] = useSearchParams();  // URL 파라미터 읽기용

  useEffect(() => {
    // 컴포넌트 언마운트 시 스트림 정리
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const testCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      streamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      alert('카메라에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.');
    }
  };

  const testMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      });
      
      // 마이크 테스트 로직 (실제로는 음성 레벨 측정)
      setMicrophoneActive(true);
      
      // 테스트 후 스트림 정리
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
      }, 1000);
    } catch (error) {
      console.error('마이크 접근 오류:', error);
      alert('마이크에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.');
    }
  };

  const testSpeaker = () => {
    // 테스트 오디오 재생
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvWEa');
    audio.play().then(() => {
      setSpeakerTested(true);
    }).catch(error => {
      console.error('스피커 테스트 오류:', error);
      alert('스피커 테스트에 실패했습니다.');
    });
  };

  useEffect(() => {
    setIsReady(cameraActive && microphoneActive && speakerTested);
  }, [cameraActive, microphoneActive, speakerTested]);

  const startInterview = () => {
    if (!isReady) {
      alert('모든 테스트를 완료해주세요.');
      return;
    }
    navigate('/interview');
  };

  return (
    <WaitingContainer>
      <Header>
        <Logo>AI INTERVIEW</Logo>
        <Status>면접 대기실</Status>
      </Header>

      <MainContent>
        <TestSection>
          <SectionTitle>기기 테스트</SectionTitle>
          <Subtitle>면접 전 카메라, 마이크, 스피커를 테스트해주세요</Subtitle>

          <TestGrid>
            {/* 카메라 테스트 */}
            <TestCard>
              <TestHeader>
                <TestName>카메라 테스트</TestName>
                <TestStatus active={cameraActive}>
                  {cameraActive ? '✅ 정상' : '⚪ 대기'}
                </TestStatus>
              </TestHeader>
              
              <CameraContainer>
                <VideoPreview 
                  ref={videoRef}
                  autoPlay 
                  muted
                  active={cameraActive}
                />
                {!cameraActive && (
                  <CameraPlaceholder>
                    <CameraIcon>📹</CameraIcon>
                    <CameraText>카메라 테스트를 시작하세요</CameraText>
                  </CameraPlaceholder>
                )}
              </CameraContainer>
              
              <TestButton 
                onClick={testCamera}
                active={cameraActive}
              >
                {cameraActive ? '카메라 재테스트' : '카메라 테스트 시작'}
              </TestButton>
            </TestCard>

            {/* 마이크 테스트 */}
            <TestCard>
              <TestHeader>
                <TestName>마이크 테스트</TestName>
                <TestStatus active={microphoneActive}>
                  {microphoneActive ? '✅ 정상' : '⚪ 대기'}
                </TestStatus>
              </TestHeader>
              
              <MicrophoneContainer>
                <MicrophoneVisual active={microphoneActive}>
                  <MicrophoneIcon>🎙️</MicrophoneIcon>
                  <MicrophoneText>
                    {microphoneActive ? '마이크가 정상 작동합니다' : '마이크 테스트를 시작하세요'}
                  </MicrophoneText>
                  {microphoneActive && (
                    <AudioLevelBar>
                      <AudioLevel />
                    </AudioLevelBar>
                  )}
                </MicrophoneVisual>
              </MicrophoneContainer>
              
              <TestButton 
                onClick={testMicrophone}
                active={microphoneActive}
              >
                {microphoneActive ? '마이크 재테스트' : '마이크 테스트 시작'}
              </TestButton>
            </TestCard>

            {/* 스피커 테스트 */}
            <TestCard>
              <TestHeader>
                <TestName>스피커 테스트</TestName>
                <TestStatus active={speakerTested}>
                  {speakerTested ? '✅ 정상' : '⚪ 대기'}
                </TestStatus>
              </TestHeader>
              
              <SpeakerContainer>
                <SpeakerVisual active={speakerTested}>
                  <SpeakerIcon>🎵</SpeakerIcon>
                  <SpeakerText>
                    {speakerTested ? '스피커가 정상 작동합니다' : '테스트 음성을 재생하세요'}
                  </SpeakerText>
                  {speakerTested && (
                    <SoundWave>
                      <WaveBar delay="0s" />
                      <WaveBar delay="0.1s" />
                      <WaveBar delay="0.2s" />
                      <WaveBar delay="0.3s" />
                    </SoundWave>
                  )}
                </SpeakerVisual>
              </SpeakerContainer>
              
              <TestButton 
                onClick={testSpeaker}
                active={speakerTested}
              >
                {speakerTested ? '스피커 재테스트' : '스피커 테스트 시작'}
              </TestButton>
            </TestCard>
          </TestGrid>

          <ReadySection>
            <ReadyIndicator ready={isReady}>
              {isReady ? '✅ 모든 테스트 완료' : '⚪ 테스트를 완료해주세요'}
            </ReadyIndicator>
            
            <StartInterviewButton 
              onClick={startInterview}
              disabled={!isReady}
              ready={isReady}
            >
              면접 시작하기
            </StartInterviewButton>
          </ReadySection>
        </TestSection>
      </MainContent>
    </WaitingContainer>
  );
};

const WaitingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
`;

const Status = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const TestSection = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 40px 0;
`;

const TestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const TestCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const TestHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TestIcon = styled.span`
  font-size: 24px;
`;

const TestName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
  text-align: left;
  margin-left: 12px;
`;

const TestStatus = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#22c55e' : '#9ca3af'};
`;

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  background: #f8f9fa;
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${props => props.active ? 'block' : 'none'};
`;

const CameraPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
`;

const CameraIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const CameraText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const MicrophoneContainer = styled.div`
  height: 200px;
  margin-bottom: 20px;
`;

const MicrophoneVisual = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? 'rgba(34, 197, 94, 0.1)' : '#f8f9fa'};
  border-radius: 12px;
  border: 2px solid ${props => props.active ? '#22c55e' : '#e5e7eb'};
`;

const MicrophoneIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const MicrophoneText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 16px 0;
  text-align: center;
`;

const AudioLevelBar = styled.div`
  width: 120px;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const AudioLevel = styled.div`
  width: 75%;
  height: 100%;
  background: #22c55e;
  border-radius: 4px;
  animation: audioLevel 1s ease-in-out infinite alternate;

  @keyframes audioLevel {
    0% { width: 30%; }
    100% { width: 85%; }
  }
`;

const SpeakerContainer = styled.div`
  height: 200px;
  margin-bottom: 20px;
`;

const SpeakerVisual = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? 'rgba(59, 130, 246, 0.1)' : '#f8f9fa'};
  border-radius: 12px;
  border: 2px solid ${props => props.active ? '#3b82f6' : '#e5e7eb'};
`;

const SpeakerIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const SpeakerText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 16px 0;
  text-align: center;
`;

const SoundWave = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const WaveBar = styled.div`
  width: 4px;
  height: 20px;
  background: #3b82f6;
  border-radius: 2px;
  animation: wave 1s ease-in-out infinite;
  animation-delay: ${props => props.delay};

  @keyframes wave {
    0%, 100% { height: 8px; }
    50% { height: 24px; }
  }
`;

const TestButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  background: ${props => props.active ? '#f3f4f6' : '#3b82f6'};
  color: ${props => props.active ? '#6b7280' : 'white'};
  border: 1px solid ${props => props.active ? '#d1d5db' : '#3b82f6'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#e5e7eb' : '#2563eb'};
  }
`;

const ReadySection = styled.div`
  margin-top: 40px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const ReadyIndicator = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.ready ? '#22c55e' : '#9ca3af'};
  margin-bottom: 20px;
`;

const StartInterviewButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 20px 40px;
  background: ${props => props.ready ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#d1d5db'};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: ${props => props.ready ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
  }
`;

export default WaitingRoomPage;