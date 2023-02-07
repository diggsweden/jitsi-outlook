interface LocalizedStrings {
  connectToMeeting: string;
  copyableLinkToMeeting: string;
  linkToMeeting: string;
  orCopyLink: string;
}

const getLocalizedStrings = (): LocalizedStrings => {
  const myLanguage = Office.context.displayLanguage;

  if (myLanguage.includes("sv")) {
    return {
      connectToMeeting: "Anslut till mötet",
      copyableLinkToMeeting: "Kopierbar länk till mötet",
      linkToMeeting: "Länk till mötet",
      orCopyLink: "Eller kopiera länken:",
    };
  } else if (myLanguage.includes("de")) {
    return {
      connectToMeeting: "Verbinden",
      copyableLinkToMeeting: "Kopierbarer Link zum Meeting",
      linkToMeeting: "Link zum Treffen",
      orCopyLink: "Oder kopieren Sie den Link:",
    };
  } else {
    // Default to english
    return {
      connectToMeeting: "Connect to meeting",
      copyableLinkToMeeting: "Copyable link to meeting",
      linkToMeeting: "Link to meeting",
      orCopyLink: "Or copy the link:",
    };
  }
};

export default getLocalizedStrings;
