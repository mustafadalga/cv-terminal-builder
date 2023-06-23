export default function generateGoogleFontsLink(fontFamily: string) {
    const encodedFontFamily = fontFamily
      .split(",")[0]
      .replace(/'/g, "")
      .replace(/ /g, "+");
    return `https://fonts.googleapis.com/css2?family=${encodedFontFamily}&display=swap`;
  }