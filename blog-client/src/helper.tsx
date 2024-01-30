
// removes .md from end of string
export function removeMDFileExt(filename: string) {
    return filename.slice(0, filename.length-3);
}