import React, { useRef, useEffect, useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoCallProps {
  isActive: boolean;
  onEnd: () => void;
  participantName: string;
  participantAvatar: string;
}

const VideoCall: React.FC<VideoCallProps> = ({
  isActive,
  onEnd,
  participantName,
  participantAvatar
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isActive) {
      startCall();
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      return () => {
        clearInterval(timer);
        stopCall();
      };
    }
  }, [isActive]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        
        setIsScreenSharing(true);
        
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          startCall(); // Return to camera
        };
      } else {
        setIsScreenSharing(false);
        startCall(); // Return to camera
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 text-white">
        <div className="flex items-center space-x-3">
          <img
            src={participantAvatar}
            alt={participantName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{participantName}</h3>
            <p className="text-sm text-gray-300">{formatDuration(callDuration)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Local Video */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isVideoEnabled && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 p-6 bg-black/50">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full transition-colors ${
            isAudioEnabled 
              ? 'bg-white/20 hover:bg-white/30 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-colors ${
            isVideoEnabled 
              ? 'bg-white/20 hover:bg-white/30 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`p-4 rounded-full transition-colors ${
            isScreenSharing 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          <Monitor className="h-6 w-6" />
        </button>

        <button
          onClick={onEnd}
          className="p-4 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
        >
          <PhoneOff className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
};

export default VideoCall;