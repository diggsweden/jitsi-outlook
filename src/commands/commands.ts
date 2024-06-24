// SPDX-FileCopyrightText: Microsoft Corporation
//
// SPDX-License-Identifier: MIT

import configJson from "../../config.json";
import Config from "../models/Config";
import { addMeeting } from "../utils/OfficeCallHandler";

/* global Office */

(async () => {
  await Office.onReady();
})();

const addJitsiLink = (event: Office.AddinCommands.Event) => {
  const config = configJson as Config;
  addMeeting(config, event);
};

Office.actions.associate("insertJitsiLink", addJitsiLink);
