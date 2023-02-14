import getLocalizedStrings from "../localization";
import Config, { defaultMeetJitsiUrl } from "../models/Config";
import { getJitsiUrl } from "./URLHelper";

export const combineBodyWithJitsiDiv = (body: string, config: Config): string => {
  const jitsiUrl = getJitsiUrl(config);

  const linkDOM = getJitsiLinkDiv(jitsiUrl, config);
  return `
      ${body}
      ${linkDOM}
      `;
};

export const bodyHasJitsiLink = (body: string, config: Config): boolean => {
  const baseUrl = config.baseUrl ?? defaultMeetJitsiUrl;
  return body.includes(baseUrl);
};

export const overwriteJitsiLinkDiv = (body: string, config: Config): string => {
  const jitsiUrl = getJitsiUrl(config);

  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(body, "text/html");

  const jitsiLink = htmlDoc.querySelector("[id*='jitsi-link']");
  console.log("jitsiLinkById", jitsiLink);
  const newJitsiLink = getJitsiLinkDiv(jitsiUrl, config);
  jitsiLink.outerHTML = newJitsiLink;

  const updatedHtmlString = htmlDoc.body.innerHTML;
  return updatedHtmlString;
};

export const getJitsiLinkDiv = (jitsiUrl: string, config: Config): string => {
  const localizedStrings = getLocalizedStrings();

  return `
    <div id="jitsi-link">
        <hr style="margin-bottom: 8px;"/>
        <a aria-label="${localizedStrings.linkToMeeting}" title="${localizedStrings.linkToMeeting}" style="font-size: 1.5em;" href="${jitsiUrl}">
            ${localizedStrings.connectToMeeting}
        </a>
        <br />
        <span>
            ${localizedStrings.orCopyLink}
        </span> 
        <a aria-label="${localizedStrings.copyableLinkToMeeting}" title="${localizedStrings.copyableLinkToMeeting}" href="${jitsiUrl}">
            ${jitsiUrl}
        </a>
        ${
          config.additionalText
            ? `
            <br />
            <span style="font-size: 0.8em; font-style: italic;">
                ${config.additionalText}
            </span>
            `
            : ""
        }
    </div>
  `;
};
