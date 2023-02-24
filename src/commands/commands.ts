import configJson from "../../config.json";
import Config from "../models/Config";
import { bodyHasJitsiLink, combineBodyWithJitsiDiv, overwriteJitsiLinkDiv } from "../utils/DOMHelper";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global global, Office, self, window */

Office.initialize = function () {};

const addJitsiLink = (event: Office.AddinCommands.Event) => {
  const config = configJson as Config;
  console.log("here");

  Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html, (result) => {
    console.log("getAsync", result);
    if (result.error) {
      event.completed();
    }
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(result.value, "text/html");
    const bodyDOM = bodyHasJitsiLink(result.value, config) ? overwriteJitsiLinkDiv(htmlDoc, config) : combineBodyWithJitsiDiv(result.value, config);

    Office.context.mailbox.item.body.setAsync(
      bodyDOM,
      {
        coercionType: Office.CoercionType.Html,
      },
      () => {
        event.completed();
      }
    );
  });
};

Office.actions.associate("insertJitsiLink", addJitsiLink);
