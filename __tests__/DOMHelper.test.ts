import getLocalizedStrings from "../src/localization";
import Config from "../src/models/Config";
import { bodyHasJitsiLink, getJitsiLinkDiv } from "../src/utils/DOMHelper";
import { getJitsiUrl } from "../src/utils/URLHelper";

describe("getJitsiLinkDOM", () => {
  it("should return a string that contains the correct Jitsi URL", () => {
    const config: Config = {};
    const jitsiUrl = getJitsiUrl(config);
    const jitsiLinkDOM = getJitsiLinkDiv(jitsiUrl, config);

    expect(jitsiLinkDOM).toContain(jitsiUrl);
  });

  it("should return a string that contains the localized strings", () => {
    const config = {};
    const jitsiUrl = getJitsiUrl(config);
    const jitsiLinkDOM = getJitsiLinkDiv(jitsiUrl, config);
    const localizedStrings = getLocalizedStrings();

    expect(jitsiLinkDOM).toContain(localizedStrings.linkToMeeting);
    expect(jitsiLinkDOM).toContain(localizedStrings.connectToMeeting);
    expect(jitsiLinkDOM).toContain(localizedStrings.orCopyLink);
    expect(jitsiLinkDOM).toContain(localizedStrings.copyableLinkToMeeting);
  });

  it("should include the additionalText if provided in config", () => {
    const config = {
      additionalText: "This is additional text",
    };
    const jitsiUrl = getJitsiUrl(config);
    const jitsiLinkDOM = getJitsiLinkDiv(jitsiUrl, config);

    expect(jitsiLinkDOM).toContain(config.additionalText);
  });

  it("should not include the additionalText if not provided in config", () => {
    const config = {};
    const jitsiUrl = getJitsiUrl(config);
    const jitsiLinkDOM = getJitsiLinkDiv(jitsiUrl, config);

    expect(jitsiLinkDOM).not.toContain("additionalText");
  });
});

describe("bodyHasJitsiLink", () => {
  it("should return true if body contains Jitsi link", () => {
    const body = "Join my Jitsi Meet at https://meet.jit.si/mymeeting";
    const config = {
      baseUrl: "https://meet.jit.si/",
    };

    expect(bodyHasJitsiLink(body, config)).toBe(true);
  });

  it("should return false if body does not contain Jitsi link", () => {
    const body = "Join my meeting at https://zoom.us/mymeeting";
    const config = { baseUrl: "https://meet.jit.si/" };

    expect(bodyHasJitsiLink(body, config)).toBe(false);
  });

  it("should use default Jitsi URL if baseUrl is not provided in config", () => {
    const body = "Join my Jitsi Meet at https://meet.jit.si/mymeeting";
    const config = {};

    expect(bodyHasJitsiLink(body, config)).toBe(true);
  });
});
