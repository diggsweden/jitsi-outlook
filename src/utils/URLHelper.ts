import Config, { defaultMeetJitsiUrl } from "../models/Config";

export const getRandomRoomName = (): string => {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < 16; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
};

export const getConfigUrl = (config: Config): string => {
  if (!config.meetingUrl) {
    return "";
  }

  var keys = Object.keys(config.meetingUrl);
  const url = keys.reduce((acc, currentValue) => {
    return acc + `config.${currentValue}=${config.meetingUrl[currentValue]}&`;
  }, "#");

  return url;
};

export const getJitsiUrl = (config: Config): string => {
  return (config.baseUrl ?? defaultMeetJitsiUrl) + getRandomRoomName() + getConfigUrl(config);
};
