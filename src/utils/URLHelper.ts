// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

import Config, { defaultMeetJitsiUrl } from "../models/Config";
import sign from "jwt-encode";

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

export const getJwtToken = (room: string, config: Config): string => {
  const { iss, key, exp } = config.jwt;
  const url = new URL(config.baseUrl ?? defaultMeetJitsiUrl);
  const expirationTime = exp ? Math.floor(Date.now() / 1000) + exp : undefined;
  return sign({ aud: iss, iss, exp: expirationTime, sub: url.hostname, room }, key);
};

export const getJitsiUrl = (config: Config): string => {
  const roomName = getRandomRoomName();
  const meetingUrl = `${config.baseUrl ?? defaultMeetJitsiUrl}${roomName}`;
  const configUrl = getConfigUrl(config);

  if (config.jwt) {
    return `${meetingUrl}?jwt=${getJwtToken(roomName, config)}${configUrl}`;
  }

  return `${meetingUrl}${configUrl}`;
};
