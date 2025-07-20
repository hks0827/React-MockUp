import React, { createContext, useContext, useReducer } from 'react';

const InterviewContext = createContext();

const initialState = {
  mode: null, // 'coaching' or 'practice'
  industry: '',
  job: '',
  resumeFile: null,
  currentQuestion: 0,
  questions: [],
  answers: [],
  isRecording: false,
  interviewStartTime: null,
  interviewEndTime: null
};

const interviewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_INDUSTRY':
      return { ...state, industry: action.payload };
    case 'SET_JOB':
      return { ...state, job: action.payload };
    case 'SET_RESUME':
      return { ...state, resumeFile: action.payload };
    case 'START_INTERVIEW':
      return { 
        ...state, 
        interviewStartTime: new Date().toISOString(),
        questions: action.payload.questions 
      };
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.payload]
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1
      };
    case 'END_INTERVIEW':
      return {
        ...state,
        interviewEndTime: new Date().toISOString()
      };
    case 'RESET_INTERVIEW':
      return initialState;
    default:
      return state;
  }
};

export const InterviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(interviewReducer, initialState);

  return (
    <InterviewContext.Provider value={{ state, dispatch }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};