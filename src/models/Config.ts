export const defaultMeetJitsiUrl = "https://meet.jit.si///";

interface Config {
  baseUrl?: string;
  additionalText?: string;
  meetingUrl?: {
    startWithAudioMuted?: boolean;
    startWithVideoMuted?: boolean;
  };
}

export default Config;
