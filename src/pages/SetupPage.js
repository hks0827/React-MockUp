import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SetupPage = () => {

  const navigate = useNavigate();  
  const [searchParams] = useSearchParams();  // URL 파라미터 읽기용

  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const industries = [
    '기술/IT', '금융/보험', '제조/생산', '의료/헬스케어', 
    '교육', '마케팅/광고', '건설/부동산', '서비스업',
    '미디어/엔터테인먼트', '정부/공공기관'
  ];

  const jobsByIndustry = {
    '기술/IT': ['프론트엔드 개발자', '백엔드 개발자', '풀스택 개발자', 'DevOps 엔지니어', 'UI/UX 디자이너', '데이터 사이언티스트'],
    '금융/보험': ['투자분석가', '위험관리사', '보험계리사', '자산관리사', '펀드매니저'],
    '제조/생산': ['생산관리자', '품질관리자', '공정엔지니어', '설비관리자'],
    '의료/헬스케어': ['의사', '간호사', '의료기기 엔지니어', '병원행정관리자'],
    '교육': ['교사', '교육컨설턴트', '교육과정개발자', '학습분석가'],
    '마케팅/광고': ['마케팅매니저', '광고기획자', '브랜드매니저', '디지털마케터'],
    '건설/부동산': ['건축설계사', '토목엔지니어', '부동산개발자', '시공관리자'],
    '서비스업': ['고객서비스매니저', '영업관리자', '매장관리자', '서비스기획자'],
    '미디어/엔터테인먼트': ['콘텐츠크리에이터', '방송작가', '영상편집자', '음향엔지니어'],
    '정부/공공기관': ['공무원', '정책분석가', '사회복지사', '도시계획가']
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleStartInterview = () => {
    if (!selectedIndustry || !selectedJob) {
      alert('산업과 직군을 모두 선택해주세요.');
      return;
    }
    navigate('/waiting');
  };

  const handleBack = () => {
    navigate('/');  // 홈으로 이동
  };

  return (
    <SetupContainer>
      <Header>
        <Logo>AI INTERVIEW</Logo>
        <BackButton onClick={() => window.history.back()}>← 돌아가기</BackButton>
      </Header>

      <MainContent>
        <SetupCard>
          <Title>면접 정보 설정</Title>
          <Subtitle>더 정확한 면접을 위해 정보를 입력해주세요</Subtitle>

          <Section>
            <SectionTitle>산업 선택</SectionTitle>
            <IndustryGrid>
              {industries.map((industry) => (
                <IndustryItem
                  key={industry}
                  selected={selectedIndustry === industry}
                  onClick={() => {
                    setSelectedIndustry(industry);
                    setSelectedJob(''); // 산업 변경 시 직군 초기화
                  }}
                >
                  {industry}
                </IndustryItem>
              ))}
            </IndustryGrid>
          </Section>

          {selectedIndustry && (
            <Section>
              <SectionTitle>직군 선택</SectionTitle>
              <JobGrid>
                {jobsByIndustry[selectedIndustry]?.map((job) => (
                  <JobItem
                    key={job}
                    selected={selectedJob === job}
                    onClick={() => setSelectedJob(job)}
                  >
                    {job}
                  </JobItem>
                ))}
              </JobGrid>
            </Section>
          )}

          <Section>
            <SectionTitle>이력서 첨부 (선택사항)</SectionTitle>
            <FileUploadArea>
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <FileUploadBox
                onClick={() => document.getElementById('resume-upload').click()}
                hasFile={!!uploadedFile}
              >
                <FileIcon>📄</FileIcon>
                <FileText>
                  {uploadedFile ? uploadedFile.name : '이력서를 첨부하면 더 맞춤형 질문을 받을 수 있습니다'}
                </FileText>
                <FileSubtext>
                  {uploadedFile ? '다른 파일 선택' : 'PDF, DOC, DOCX 파일 지원'}
                </FileSubtext>
              </FileUploadBox>
            </FileUploadArea>
          </Section>

          <StartButton 
            onClick={handleStartInterview}
            disabled={!selectedIndustry || !selectedJob}
          >
            면접 보러가기
          </StartButton>
        </SetupCard>
      </MainContent>
    </SetupContainer>
  );
};

const SetupContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
  }
`;

const MainContent = styled.main`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

const SetupCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 0 0 40px 0;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
`;

const IndustryItem = styled.div`
  padding: 16px 20px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e1e1e1'};
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
`;

const JobItem = styled.div`
  padding: 12px 16px;
  border: 1px solid ${props => props.selected ? '#764ba2' : '#ddd'};
  background: ${props => props.selected ? '#764ba2' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: #764ba2;
    transform: translateY(-1px);
  }
`;

const FileUploadArea = styled.div`
  margin-top: 10px;
`;

const FileUploadBox = styled.div`
  border: 2px dashed ${props => props.hasFile ? '#667eea' : '#ccc'};
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.hasFile ? 'rgba(102, 126, 234, 0.05)' : 'transparent'};

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

const FileIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const FileText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const FileSubtext = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 20px;
  background: ${props => props.disabled ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

export default SetupPage;