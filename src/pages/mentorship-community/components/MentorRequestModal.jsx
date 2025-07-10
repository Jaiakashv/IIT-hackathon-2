import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const MentorRequestModal = ({ mentor, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    date: '',
    time: '',
    duration: '30',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // Generate a random room ID
  useEffect(() => {
    if (isSuccess) {
      setRoomId(`room-${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [isSuccess]);

  // Clean up streams on unmount
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream, remoteStream]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // In a real app, you would send this data to your backend
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const startVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      setIsInCall(true);
      
      // In a real app, you would connect to a WebRTC peer here
      // This is a simplified example
      console.log('Starting video call in room:', roomId);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access camera/microphone. Please check permissions.');
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
    setIsInCall(false);
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Request a 1:1 Session</h3>
        <p className="mt-1 text-sm text-gray-500">
          Schedule a session with {mentor.name} to get personalized guidance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            type="text"
            name="topic"
            id="topic"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.topic}
            onChange={handleChange}
            placeholder="What would you like to discuss?"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Provide some details about what you'd like to discuss..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Schedule Your Session</h3>
        <p className="mt-1 text-sm text-gray-500">
          Select a date and time for your session with {mentor.name}.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Session Duration
          </label>
          <select
            id="duration"
            name="duration"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.duration}
            onChange={handleChange}
          >
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <Icon name="Check" className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-3 text-lg font-medium text-gray-900">Session Requested!</h3>
      <p className="mt-2 text-sm text-gray-500">
        Your session with {mentor.name} has been scheduled for {new Date(formData.date).toLocaleDateString()} at {formData.time}.
      </p>
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-4">
          Your meeting room is ready. You can start the video call now or join later using this ID:
        </p>
        <div className="bg-gray-50 p-3 rounded-md mb-6">
          <p className="text-sm font-mono text-gray-900 break-all">{roomId}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={startVideoCall}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Icon name="Video" className="mr-2" />
            Start Video Call Now
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const renderVideoCall = () => (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Video Call with {mentor.name}</h3>
        <div className="flex space-x-2">
          <button
            onClick={endCall}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            title="End Call"
          >
            <Icon name="PhoneOff" className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        {/* Local video feed */}
        {localStream && (
          <div className="absolute bottom-4 right-4 w-1/4 h-1/4 bg-gray-900 rounded-lg overflow-hidden border-2 border-white shadow-lg">
            <video
              autoPlay
              playsInline
              muted
              ref={ref => {
                if (ref) ref.srcObject = localStream;
              }}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Remote video feed */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          {remoteStream ? (
            <video
              autoPlay
              playsInline
              ref={ref => {
                if (ref) ref.srcObject = remoteStream;
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-white">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <Icon name="User" className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-lg font-medium">{mentor.name}</p>
              <p className="text-sm text-gray-400">Connecting...</p>
            </div>
          )}
        </div>
        
        {/* Call controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex justify-center space-x-4">
          <button
            className="p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:outline-none"
            title="Mute"
          >
            <Icon name="Mic" className="h-5 w-5" />
          </button>
          <button
            className="p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:outline-none"
            title="Turn off video"
          >
            <Icon name="Video" className="h-5 w-5" />
          </button>
          <button
            className="p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:outline-none"
            title="Share screen"
          >
            <Icon name="Share2" className="h-5 w-5" />
          </button>
          <button
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            onClick={endCall}
            title="End call"
          >
            <Icon name="Phone" className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Meeting Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Meeting ID:</p>
            <p className="font-mono">{roomId}</p>
          </div>
          <div>
            <p className="text-gray-500">Scheduled for:</p>
            <p>{new Date(formData.date).toLocaleDateString()} at {formData.time}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="p-6">
          {isInCall ? (
            renderVideoCall()
          ) : isSuccess ? (
            renderSuccess()
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {step === 1 ? renderStep1() : renderStep2()}
                
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={step === 1 ? onClose : () => setStep(step - 1)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {step === 1 ? 'Cancel' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : step === 2 ? (
                      'Request Session'
                    ) : (
                      'Continue to Schedule'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MentorRequestModal;