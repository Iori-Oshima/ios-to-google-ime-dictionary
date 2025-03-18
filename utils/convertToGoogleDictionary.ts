export function convertToGoogleDictionary(jsonData: any): string {
    if (
        !jsonData ||
        !jsonData.plist ||
        !jsonData.plist.array ||
        !jsonData.plist.array.dict
    ) {
        return "";
    }

    const entries = jsonData.plist.array.dict;

    if (!entries.key || !entries.string || !Array.isArray(entries.key) || !Array.isArray(entries.string)) {
        return "（データの構造が正しくありません）";
    }

    const phraseIndex = entries.key.indexOf("phrase");
    const shortcutIndex = entries.key.indexOf("shortcut");

    const phrase = phraseIndex !== -1 ? entries.string[phraseIndex] || "（未設定）" : "（未設定）";
    const shortcut = shortcutIndex !== -1 ? entries.string[shortcutIndex] || "（未設定）" : "（未設定）";

    return `${shortcut}\t${phrase}\t名詞\r\n`; // ✅ 改行コードを Windows (CRLF) に修正
}
