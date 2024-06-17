// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

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

export const secureSubjectUrl = (string: string, length?: number): string => {
  if (length === undefined) {
    length = 30;
  }
  let subject: string = string;
  subject = subject.replace(/[áàäâãåÁÀÄÂÃÅ]/g, "a");
  subject = subject.replace(/[óòöôõÓÒÖÔÕ]/g, "o");
  subject = subject.replace(/[éèëêÉÈËÊ]/g, "e");
  subject = subject.replace(/[úùüûÚÙÜÛ]/g, "u");
  subject = subject.replace(/[íìïîÍÌÏÎ]/g, "i");
  subject = subject.replace(/[^A-Za-z0-9]/g, "-");
  subject = subject.replace(/--+/g, "-");
  subject = subject.slice(0, length);
  if (subject.length <= 1) {
    subject = "";
  } else {
    subject = subject + "_";
  }
  return subject;
};

export const getJitsiUrl = (config: Config, subject?: string): string => {
  if (subject !== undefined) {
    subject = secureSubjectUrl(subject);
  }
  return (config.baseUrl ?? defaultMeetJitsiUrl) + subject + getRandomRoomName() + getConfigUrl(config);
};
