// SPDX-FileCopyrightText: Microsoft Corporation
//
// SPDX-License-Identifier: MIT

import Config from "../models/Config";
import { bodyHasJitsiLink, combineBodyWithJitsiDiv, overwriteJitsiLinkDiv } from "../utils/DOMHelper";

/* global Office */

const setData = async (str: string, event?: Office.AddinCommands.Event) => {
  Office.context.mailbox.item.body.setAsync(
    str,
    {
      coercionType: Office.CoercionType.Html,
    },
    () => {
      event.completed();
    }
  );
};

export const setDataTest = { setData };

const setLocation = async (config: Config) => {
  let location: string = config.locationString ?? "Jitsi meeting";
  Office.context.mailbox.item?.location.getAsync((r) => {
    let r_value: string = r.value.trimEnd();
    if (r.value.length > 0) {
      if (r_value.includes(location)) {
        location = r_value;
      } else {
        location = " " + location;
        if (!r_value.endsWith(";")) {
          location = ";" + location;
        }
        location = r_value + location;
      }
    }
    Office.context.mailbox.item?.location.setAsync(location, (result) => {
      if (result.status !== Office.AsyncResultStatus.Succeeded) {
        return;
      }
    });
  });
};

export const setLocationTest = { setLocation };

export const addMeeting = async (config: Config, event?: Office.AddinCommands.Event) => {
  Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html, (result) => {
    if (result.error) {
      event.completed();
    }

    try {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(result.value, "text/html");
      const bodyDOM = bodyHasJitsiLink(result.value, config) ? overwriteJitsiLinkDiv(htmlDoc, config) : combineBodyWithJitsiDiv(result.value, config);
      setData(bodyDOM, event);
      setLocation(config);
    } catch (error) {
      // If it fails to manipulate the DOM with a new link it will fallback to its original state
      setData(result.value, event);
    }
  });
};
