// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

interface LocalizedStrings {
  connectToMeeting: string;
  linkToMeeting: string;
}

const getLocalizedStrings = (): LocalizedStrings => {
  const myLanguage = typeof Office !== "undefined" ? Office.context.displayLanguage : "en";

  if (/sv/.test(myLanguage)) {
    return {
      connectToMeeting: "Anslut till mötet",
      linkToMeeting: "Länk till mötet",
    };
  } else if (/de/.test(myLanguage)) {
    return {
      connectToMeeting: "Verbinden",
      linkToMeeting: "Link zum Treffen",
    };
  } else {
    // Default to english
    return {
      connectToMeeting: "Connect to meeting",
      linkToMeeting: "Link to meeting",
    };
  }
};

export default getLocalizedStrings;
