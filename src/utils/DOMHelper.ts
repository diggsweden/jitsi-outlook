import getLocalizedStrings from "../localization";
import Config, { defaultMeetJitsiUrl } from "../models/Config";
import { videoCameraURI } from "./IconHelper";
import { getJitsiUrl } from "./URLHelper";

const DIV_ID_JITSI = "jitsi-link";

export const combineBodyWithJitsiDiv = (body: string, config: Config): string => {
  const jitsiUrl = getJitsiUrl(config);

  const linkDOM = getJitsiLinkDiv(jitsiUrl, config);
  const parser = new DOMParser();

  const bodyString = `
        ${body}
        ${linkDOM}
    `;

  const combinedDOM = parser.parseFromString(bodyString, "text/html");

  return combinedDOM.body.innerHTML;
};

export const bodyHasJitsiLink = (body: string, config: Config): boolean => {
  const baseUrl = config.baseUrl ?? defaultMeetJitsiUrl;
  return body.includes(baseUrl);
};

export const overwriteJitsiLinkDiv = (body: Document, config: Config): string => {
  const jitsiUrl = getJitsiUrl(config);

  const jitsiLink = body.querySelector(`[id*="${DIV_ID_JITSI}"]`);
  const newJitsiLink = getJitsiLinkDiv(jitsiUrl, config);
  jitsiLink.outerHTML = newJitsiLink;

  const updatedHtmlString = body.body.innerHTML;
  return updatedHtmlString;
};

export const getJitsiLinkDiv = (jitsiUrl: string, config: Config): string => {
  const localizedStrings = getLocalizedStrings();

  return `
    <div id="${DIV_ID_JITSI}" style="font-family: 'Arial';">
        <span style="font-size: 14px; font-weight: 700;">
            ${localizedStrings.connectToMeeting}
        </span>
        <table style="border-collapse: collapse; margin-top: 6px;">
            <tr>
                <td style="padding-right: 10px; vertical-align: middle;">
                    <img
                        style="vertical-align: middle;"
                        width="18"
                        height="18"
                        src=${videoCameraURI}
                    />
                </td>
                <td style="padding-right: 10px; vertical-align: middle;">
                    <a
                        aria-label="${localizedStrings.linkToMeeting}" 
                        title="${localizedStrings.linkToMeeting}" 
                        alt=${localizedStrings.linkToMeeting} 
                        style="font-size: 12px;" 
                        href="${jitsiUrl}">
                        ${jitsiUrl}
                    </a>
                </td>
            </tr>
        </table>
        <br />
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
