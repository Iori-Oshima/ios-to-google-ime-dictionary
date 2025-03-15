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
        const shortcut = entry.shortcut || "";
        const phrase = entry.phrase || "";
        return `${shortcut}\t${phrase}\t短縮よみ`;
    });

    return lines.join("\n");
}
