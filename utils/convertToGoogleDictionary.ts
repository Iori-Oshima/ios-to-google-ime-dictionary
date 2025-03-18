export function convertToGoogleDictionary(jsonData: any): string {
    if (
        !jsonData ||
        !jsonData.plist ||
        !jsonData.plist.array ||
        !jsonData.plist.array.dict
    ) {
        return "（データの構造が正しくありません）";
    }

    let entries = jsonData.plist.array.dict;

    // `entries` がオブジェクト（単一辞書エントリ）だった場合、配列に変換する
    if (!Array.isArray(entries)) {
        entries = [entries];
    }

    const lines = entries.map((entry: any) => {
        if (!entry?.key || !entry?.string || !Array.isArray(entry.key) || !Array.isArray(entry.string)) {
            return "（データの構造が正しくありません）";
        }

        // phrase と shortcut のインデックスを取得
        const phraseIndex = entry.key.indexOf("phrase");
        const shortcutIndex = entry.key.indexOf("shortcut");

        // phrase と shortcut の値を取得
        const phrase = phraseIndex !== -1 ? entry.string?.[phraseIndex] ?? "（未設定）" : "（未設定）";
        const shortcut = shortcutIndex !== -1 ? entry.string?.[shortcutIndex] ?? "（未設定）" : "（未設定）";

        return `${shortcut}\t${phrase}\t名詞`;
    });

    return lines.filter(line => !line.includes("（未設定）")).join("\r\n"); // 空行を除去
}
