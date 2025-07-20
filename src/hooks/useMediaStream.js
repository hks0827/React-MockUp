import { useState, useRef, useCallback } from 'react';

export const useMediaStream = () => {
  const [stream, setStream] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const streamRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      setStream(mediaStream);
      setIsActive(true);
      streamRef.current = mediaStream;
      return mediaStream;
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      throw error;
    }
  }, []);

  const startMicrophone = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      });
      return mediaStream;
    } catch (error) {
      console.error('마이크 접근 오류:', error);
      throw error;
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
      streamRef.current = null;
    }
  }, []);

  return {
    stream,
    isActive,
    startCamera,
    startMicrophone,
    stopStream
  };
};