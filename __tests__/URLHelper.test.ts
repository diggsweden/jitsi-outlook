// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

import Config, { defaultMeetJitsiUrl } from "../src/models/Config";
import { getRandomRoomName, getConfigUrl, getJitsiUrl, getJwtToken } from "../src/utils/URLHelper";

describe("getRandomRoomName", () => {
  it("should return a string of length 16", () => {
    const roomName = getRandomRoomName();
    expect(roomName).toHaveLength(16);
  });
});

describe("getConfigUrl", () => {
  it("should return an empty string if config.meetingUrl is not provided", () => {
    const config: Config = {};
    const configUrl = getConfigUrl(config);
    expect(configUrl).toBe("");
  });

  it("should return the correct config URL if config.meetingUrl is provided", () => {
    const config: Config = {
      meetingUrl: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
    };
    const configUrl = getConfigUrl(config);
    expect(configUrl).toBe("#config.startWithAudioMuted=true&config.startWithVideoMuted=true&");
  });
});

describe("getJitsiUrl", () => {
  it("should use defaultMeetJitsiUrl if config.baseUrl is not provided", () => {
    const config: Config = {};
    const jitsiUrl = getJitsiUrl(config);
    expect(jitsiUrl).toContain(defaultMeetJitsiUrl);
  });

  it("should use config.baseUrl if provided", () => {
    const config: Config = {
      baseUrl: "https://my-custom-base-url.com/",
    };
    const jitsiUrl = getJitsiUrl(config);
    expect(jitsiUrl).toContain(config.baseUrl);
  });

  it("should append the random room name and config URL", () => {
    const config: Config = {
      baseUrl: "https://my-custom-base-url.com/",
      meetingUrl: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
    };
    const jitsiUrl = getJitsiUrl(config);
    expect(jitsiUrl).toContain(config.baseUrl);
    expect(jitsiUrl).toContain(getConfigUrl(config));
  });
});

describe("getJwtToken", () => {
  it("should add jwt to URL if config.jwt is provided", () => {
    const config: Config = {
      jwt: {
        iss: "my-app-id",
        key: "my-app-secret",
      },
    };
    const jitsiUrl = getJitsiUrl(config);
    const roomName = new URL(jitsiUrl).pathname.substring(1);
    const jwtToken = getJwtToken(roomName, config);
    expect(jitsiUrl).toContain(jwtToken);
  });
});
