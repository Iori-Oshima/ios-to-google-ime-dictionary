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

    // `dict.key` に "phrase" と "shortcut" のインデックスがあることを確認
    if (!entries.key || !entries.string || !Array.isArray(entries.key) || !Array.isArray(entries.string)) {
        return "（データの構造が正しくありません）";
    }

    // phrase と shortcut のインデックスを取得
    const phraseIndex = entries.key.indexOf("phrase");
    const shortcutIndex = entries.key.indexOf("shortcut");

    // phrase と shortcut の値を取得
    const phrase = phraseIndex !== -1 ? entries.string[phraseIndex] || "（未設定）" : "（未設定）";
    const shortcut = shortcutIndex !== -1 ? entries.string[shortcutIndex] || "（未設定）" : "（未設定）";

    return `${shortcut}\t${phrase}\t短縮よみ`;
}
