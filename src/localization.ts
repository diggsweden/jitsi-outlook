interface LocalizedStrings {
  connectToMeeting: string;
  linkToMeeting: string;
}

const getLocalizedStrings = (): LocalizedStrings => {
  const myLanguage = typeof Office !== "undefined" ? Office.context.displayLanguage : "en";

  if (myLanguage.includes("sv")) {
    return {
      connectToMeeting: "Anslut till mötet",
      linkToMeeting: "Länk till mötet",
    };
  } else if (myLanguage.includes("de")) {
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
