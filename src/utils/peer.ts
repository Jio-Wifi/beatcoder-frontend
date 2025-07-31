export const cleanupStreams = (streams: Record<string, MediaStream>) => {
  Object.values(streams).forEach((stream) => {
    stream.getTracks().forEach((t) => t.stop());
  });
};
