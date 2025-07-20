import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

const InterviewPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [interviewTime, setInterviewTime] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();  
  const [searchParams] = useSearchParams();  // URL 파라미터 읽기용
  const timerRef = useRef(null);

  // 샘플 질문들
  const sampleQuestions = [
    "안녕하세요! 먼저 자기소개를 간단히 해주시겠어요?",
    "지원하신 직무에 대해 어떤 준비를 하셨나요?",
    "본인의 가장 큰 강점은 무엇이라고 생각하시나요?",
    "팀워크 경험에 대해 말씀해주세요.",
    "어려웠던 프로젝트 경험과 해결 방법을 설명해주세요."
  ];

  useEffect(() => {
    // 면접 시작 시 첫 번째 질문 표시
    setCurrentQuestion(sampleQuestions[0]);
    
    // 타이머 시작
    timerRef.current = setInterval(() => {
      setInterviewTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 음성 인식 시뮬레이션
  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        setIsListening(false);
        // 다음 질문으로 넘어가기 (시뮬레이션)
        const currentIndex = sampleQuestions.indexOf(currentQuestion);
        if (currentIndex < sampleQuestions.length - 1) {
          setTimeout(() => {
            setCurrentQuestion(sampleQuestions[currentIndex + 1]);
          }, 2000);
        }
      }, 3000 + Math.random() * 4000); // 3-7초 랜덤

      return () => clearTimeout(timeout);
    }
  }, [isListening, currentQuestion]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVoiceActivity = () => {
    setIsListening(true);
  };

  const handleExitInterview = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    setIsInterviewActive(false);
    navigate('/result');
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  return (
    <InterviewContainer>
      {/* AI 면접관 화면 */}
      <AIInterviewerSection>
        <AIAvatar>
          <AvatarImage>🤖</AvatarImage>
          <AvatarGlow />
        </AIAvatar>
        
        <QuestionDisplay>
          <QuestionText>{currentQuestion}</QuestionText>
        </QuestionDisplay>

        {/* 답변 대기 상태 표시 */}
        <ListeningIndicator active={isListening}>
          <IndicatorText>
            {isListening ? '답변을 듣고 있습니다...' : '답변을 시작해주세요'}
          </IndicatorText>
        </ListeningIndicator>
      </AIInterviewerSection>

      {/* 하단 컨트롤 */}
      <ControlsSection>
        <TimerDisplay>
          <TimeIcon>⏱️</TimeIcon>
          <TimeText>{formatTime(interviewTime)}</TimeText>
        </TimerDisplay>

        <VoiceControls>
          <VoiceButton 
            active={isListening}
            onClick={handleVoiceActivity}
          >
            <MicIcon active={isListening}>
              {isListening ? '🎙️' : '🎤'}
            </MicIcon>
            <VoiceIndicator active={isListening}>
              <VoiceWave delay="0s" />
              <VoiceWave delay="0.1s" />
              <VoiceWave delay="0.2s" />
              <VoiceWave delay="0.3s" />
              <VoiceWave delay="0.4s" />
            </VoiceIndicator>
          </VoiceButton>
        </VoiceControls>

        <ExitButton onClick={handleExitInterview}>
          <ExitIcon>🚪</ExitIcon>
          <ExitText>종료</ExitText>
        </ExitButton>
      </ControlsSection>

      {/* 종료 확인 모달 */}
      {showExitConfirm && (
        <ExitModal>
          <ModalOverlay onClick={cancelExit} />
          <ModalContent>
            <ModalTitle>면접을 종료하시겠습니까?</ModalTitle>
            <ModalText>
              면접을 종료하면 현재까지의 내용이 저장되고<br />
              결과 페이지로 이동합니다.
            </ModalText>
            <ModalButtons>
              <CancelButton onClick={cancelExit}>계속하기</CancelButton>
              <ConfirmButton onClick={confirmExit}>종료하기</ConfirmButton>
            </ModalButtons>
          </ModalContent>
        </ExitModal>
      )}
    </InterviewContainer>
  );
};

const InterviewContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  position: relative;
  overflow: hidden;
`;

const AIInterviewerSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`;

const AIAvatar = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const AvatarImage = styled.div`
  font-size: 120px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
`;

const AvatarGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: pulse 2s ease-in-out infinite alternate;

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
    100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
  }
`;

const QuestionDisplay = styled.div`
  max-width: 800px;
  margin-bottom: 40px;
`;

const QuestionText = styled.h2`
  color: white;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ListeningIndicator = styled.div`
  padding: 20px 40px;
  background: ${props => props.active ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.active ? '#22c55e' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 50px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const IndicatorText = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const ControlsSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
`;

const TimeIcon = styled.span`
  font-size: 24px;
`;

const TimeText = styled.span`
  font-size: 20px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
`;

const VoiceControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const VoiceButton = styled.button`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.active ? '#22c55e' : 'rgba(255, 255, 255, 0.2)'};
  border: 3px solid ${props => props.active ? '#16a34a' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  &:hover {
    transform: scale(1.05);
    background: ${props => props.active ? '#16a34a' : 'rgba(255, 255, 255, 0.3)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const MicIcon = styled.span`
  font-size: 32px;
  position: relative;
  z-index: 2;
  filter: ${props => props.active ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' : 'none'};
`;

const VoiceIndicator = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: ${props => props.active ? 'flex' : 'none'};
  gap: 3px;
  align-items: center;
`;

const VoiceWave = styled.div`
  width: 3px;
  height: 12px;
  background: #22c55e;
  border-radius: 2px;
  animation: voiceWave 1s ease-in-out infinite;
  animation-delay: ${props => props.delay};

  @keyframes voiceWave {
    0%, 100% { height: 6px; opacity: 0.4; }
    50% { height: 18px; opacity: 1; }
  }
`;

const ExitButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: rgba(239, 68, 68, 0.2);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(239, 68, 68, 0.3);
    border-color: rgba(239, 68, 68, 0.5);
    transform: translateY(-2px);
  }
`;

const ExitIcon = styled.span`
  font-size: 24px;
`;

const ExitText = styled.span`
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

const ExitModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 16px 0;
`;

const ModalText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 30px 0;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e5e7eb;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background: #ef4444;
  color: white;
  border: 1px solid #ef4444;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #dc2626;
  }
`;

export default InterviewPage;