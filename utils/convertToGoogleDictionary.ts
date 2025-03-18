export function convertToGoogleDictionary(jsonData: any): string {
    if (
        !jsonData ||
        !jsonData.plist ||
        !jsonData.plist.array ||
        !jsonData.plist.array.dict
    ) {
        return '';
    }

    const entries = jsonData.plist.array.dict;

    const entriesArray = Array.isArray(entries) ? entries : [entries];

    const lines = entriesArray.map((entry: any) => {
        const shortcut = entry.shortcut?.trim() || "(未設定)";
        const phrase = entry.phrase?.trim() || "(未設定)";
        return `${shortcut}\t${phrase}\t短縮よみ`;
    });

    return lines.join("\n");
}
