export const getCameraAndMic = async (): Promise<MediaStream> => {
  return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
};

export const getScreenStream = async (): Promise<MediaStream> => {
  return navigator.mediaDevices.getDisplayMedia({ video: true });
};
