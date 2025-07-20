import { useState, useRef } from 'react';
import styled from 'styled-components';

const ResultPage = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // 샘플 면접 데이터
  const interviewData = {
    duration: 847, // 14분 7초
    questions: [
      {
        id: 1,
        time: 15,
        question: "안녕하세요! 먼저 자기소개를 간단히 해주시겠어요?",
        answer: "안녕하세요. 저는 3년차 풀스택 개발자 김민수입니다. 주로 React와 Node.js를 사용해서 웹 애플리케이션을 개발해왔고, 최근에는 AWS를 활용한 클라우드 서비스 구축에도 관심이 많습니다.",
        score: 85,
        feedback: "자신감 있고 명확한 자기소개였습니다. 기술 스택을 구체적으로 언급한 점이 좋았습니다."
      },
      {
        id: 2,
        time: 186,
        question: "지원하신 직무에 대해 어떤 준비를 하셨나요?",
        answer: "이 회사의 기술 스택을 미리 조사해보고, 실제로 사용하는 Next.js와 TypeScript를 개인 프로젝트로 학습했습니다. 또한 회사의 서비스를 직접 사용해보면서 개선점도 고민해봤습니다.",
        score: 92,
        feedback: "철저한 준비성과 주도적인 학습 태도가 인상적입니다. 회사에 대한 관심도 잘 드러났습니다."
      },
      {
        id: 3,
        time: 378,
        question: "본인의 가장 큰 강점은 무엇이라고 생각하시나요?",
        answer: "문제 해결 능력이라고 생각합니다. 복잡한 버그나 기술적 이슈가 발생했을 때, 포기하지 않고 다양한 방법을 시도해서 해결책을 찾아내는 편입니다.",
        score: 78,
        feedback: "구체적인 예시가 있었다면 더 좋았을 것 같습니다. 강점을 뒷받침할 경험담을 추가해보세요."
      },
      {
        id: 4,
        time: 542,
        question: "팀워크 경험에 대해 말씀해주세요.",
        answer: "이전 회사에서 5명으로 구성된 개발팀에서 일했습니다. 매주 스프린트 회의를 진행하면서 서로의 진행상황을 공유하고, 코드 리뷰를 통해 서로 배우고 성장할 수 있었습니다.",
        score: 88,
        feedback: "구체적인 팀워크 프로세스를 잘 설명해주셨습니다. 협업에 대한 이해도가 높아 보입니다."
      },
      {
        id: 5,
        time: 723,
        question: "어려웠던 프로젝트 경험과 해결 방법을 설명해주세요.",
        answer: "전자상거래 사이트의 성능 최적화 프로젝트가 가장 어려웠습니다. 페이지 로딩 속도가 너무 느려서 사용자 이탈률이 높았는데, 코드 스플리팅과 이미지 최적화, CDN 도입을 통해 로딩 속도를 50% 개선할 수 있었습니다.",
        score: 95,
        feedback: "문제와 해결책이 명확하고, 정량적인 결과까지 제시한 훌륭한 답변입니다."
      }
    ],
    overallAnalysis: {
      totalScore: 87.6,
      strengths: [
        "기술적 전문성이 뛰어남",
        "문제 해결 능력 우수",
        "사전 준비성 높음",
        "구체적이고 논리적인 답변"
      ],
      improvements: [
        "답변에 더 많은 구체적 사례 포함",
        "감정 표현과 열정 더 어필",
        "질문에 대한 답변 시간 조절"
      ],
      recommendations: [
        "STAR 기법을 활용한 답변 구성 연습",
        "실무 경험 사례를 더 체계적으로 정리",
        "비언어적 커뮤니케이션 개선"
      ]
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (time) => {
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#22c55e';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <ResultContainer>
      <Header>
        <Logo>AI INTERVIEW</Logo>
        <HeaderInfo>
          <InterviewType>풀스택 개발자 면접 결과</InterviewType>
          <InterviewDate>{new Date().toLocaleDateString('ko-KR')}</InterviewDate>
        </HeaderInfo>
      </Header>

      <MainContent>
        <LeftSection>
          {/* 영상 플레이어 */}
          <VideoSection>
            <VideoPlayer>
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                controls={false}
                poster="/api/placeholder/600/400"
              >
                <source src="/sample-interview.mp4" type="video/mp4" />
              </video>
              <VideoOverlay>
                <PlayButton onClick={togglePlayback}>
                  {isPlaying ? '⏸️' : '▶️'}
                </PlayButton>
                <VideoInfo>
                  <CurrentTime>{formatTime(currentTime)}</CurrentTime>
                  <TotalTime>/ {formatTime(interviewData.duration)}</TotalTime>
                </VideoInfo>
              </VideoOverlay>
            </VideoPlayer>
          </VideoSection>

          {/* 전체 분석 결과 */}
          <AnalysisSection>
            <SectionTitle>📊 전체 분석 결과</SectionTitle>
            
            <OverallScore>
              <ScoreLabel>종합 점수</ScoreLabel>
              <ScoreValue color={getScoreColor(interviewData.overallAnalysis.totalScore)}>
                {interviewData.overallAnalysis.totalScore}점
              </ScoreValue>
            </OverallScore>

            <AnalysisGrid>
              <AnalysisCard>
                <CardTitle>💪 강점</CardTitle>
                <AnalysisList>
                  {interviewData.overallAnalysis.strengths.map((strength, index) => (
                    <AnalysisItem key={index} type="strength">
                      <ItemIcon>✅</ItemIcon>
                      {strength}
                    </AnalysisItem>
                  ))}
                </AnalysisList>
              </AnalysisCard>

              <AnalysisCard>
                <CardTitle>🎯 개선점</CardTitle>
                <AnalysisList>
                  {interviewData.overallAnalysis.improvements.map((improvement, index) => (
                    <AnalysisItem key={index} type="improvement">
                      <ItemIcon>📈</ItemIcon>
                      {improvement}
                    </AnalysisItem>
                  ))}
                </AnalysisList>
              </AnalysisCard>

              <AnalysisCard>
                <CardTitle>💡 추천사항</CardTitle>
                <AnalysisList>
                  {interviewData.overallAnalysis.recommendations.map((recommendation, index) => (
                    <AnalysisItem key={index} type="recommendation">
                      <ItemIcon>💡</ItemIcon>
                      {recommendation}
                    </AnalysisItem>
                  ))}
                </AnalysisList>
              </AnalysisCard>
            </AnalysisGrid>
          </AnalysisSection>
        </LeftSection>

        <RightSection>
          <SectionTitle>🕐 면접 타임라인</SectionTitle>
          
          <Timeline>
            {interviewData.questions.map((item, index) => (
              <TimelineItem 
                key={item.id}
                onClick={() => handleTimelineClick(item.time)}
              >
                <TimelineHeader>
                  <TimeStamp>{formatTime(item.time)}</TimeStamp>
                  <QuestionNumber>Q{index + 1}</QuestionNumber>
                  <Score color={getScoreColor(item.score)}>
                    {item.score}점
                  </Score>
                </TimelineHeader>
                
                <Question>{item.question}</Question>
                
                <Answer>{item.answer}</Answer>
                
                <Feedback>
                  <FeedbackIcon>💬</FeedbackIcon>
                  <FeedbackText>{item.feedback}</FeedbackText>
                </Feedback>
              </TimelineItem>
            ))}
          </Timeline>

          <ActionButtons>
            <ActionButton primary>
              📄 상세 리포트 다운로드
            </ActionButton>
            <ActionButton>
              🔄 다시 면접보기
            </ActionButton>
            <ActionButton>
              📤 결과 공유하기
            </ActionButton>
          </ActionButtons>
        </RightSection>
      </MainContent>
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
`;

const Header = styled.header`
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #1e40af;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
`;

const HeaderInfo = styled.div`
  text-align: right;
`;

const InterviewType = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const InterviewDate = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  padding: 30px 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const VideoSection = styled.section``;

const VideoPlayer = styled.div`
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
`;

const VideoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlayButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const VideoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const CurrentTime = styled.span``;
const TotalTime = styled.span`
  opacity: 0.7;
`;

const AnalysisSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 24px 0;
`;

const OverallScore = styled.div`
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  margin-bottom: 30px;
`;

const ScoreLabel = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ScoreValue = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 700;
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const AnalysisCard = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
`;

const AnalysisList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AnalysisItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  color: #374151;
  line-height: 1.5;
`;

const ItemIcon = styled.span`
  flex-shrink: 0;
  margin-top: 2px;
`;

const RightSection = styled.div``;

const Timeline = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-height: 70vh;
  overflow-y: auto;
`;

const TimelineItem = styled.div`
  padding: 20px;
  border-left: 3px solid #e5e7eb;
  margin-left: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8fafc;
    border-radius: 8px;
    border-left-color: #3b82f6;
  }

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 25px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3b82f6;
    border: 3px solid white;
    box-shadow: 0 0 0 2px #e5e7eb;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const TimelineHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const TimeStamp = styled.span`
  background: #f3f4f6;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Courier New', monospace;
`;

const QuestionNumber = styled.span`
  background: #3b82f6;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const Score = styled.span`
  color: ${props => props.color};
  font-weight: 700;
  font-size: 14px;
  margin-left: auto;
`;

const Question = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const Answer = styled.div`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 12px;
  font-size: 14px;
`;

const Feedback = styled.div`
  display: flex;
  gap: 8px;
  background: #fef3c7;
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
`;

const FeedbackIcon = styled.span`
  flex-shrink: 0;
`;

const FeedbackText = styled.div`
  color: #92400e;
  font-size: 14px;
  line-height: 1.4;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  padding: 16px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : '#374151'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : '#d1d5db'};

  &:hover {
    background: ${props => props.primary ? '#2563eb' : '#f9fafb'};
    transform: translateY(-1px);
  }
`;

export default ResultPage;