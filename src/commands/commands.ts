import configJson from "../../config.json";
import getLocalizedStrings from "../localization";
import Config, { defaultMeetJitsiUrl } from "../models/Config";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global global, Office, self, window */

Office.initialize = function () {};

const getRandomRoomName = (): string => {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < 16; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return window.btoa(result);
};

const getConfigUrl = (config: Config) => {
  if (!config.meetingUrl) {
    return "";
  }

  var keys = Object.keys(config.meetingUrl);
  const url = keys.reduce((acc, currentValue) => {
    return acc + `config.${currentValue}=${config.meetingUrl[currentValue]}&`;
  }, "#");

  return url;
};

const getJitsiLinkDOM = (config: Config): string => {
  const jitsiUrl = (config.baseUrl ?? defaultMeetJitsiUrl) + getRandomRoomName() + getConfigUrl(config);
  const localizedStrings = getLocalizedStrings();

  return `
    <div>
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

const insertJitsiLink = (event: Office.AddinCommands.Event) => {
  const config = configJson as Config;
  const linkDOM = getJitsiLinkDOM(config);

  Office.context.mailbox.item.body.setSignatureAsync(linkDOM);
  event.completed();
};

Office.actions.associate("insertJitsiLink", insertJitsiLink);
