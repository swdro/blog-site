
// removes .md from end of string
export function removeMDFileExt(filename: string) {
    return filename.slice(0, filename.length-3);
}

// formats date such that it pads with 0s
export function formatDate(date: string) {
    const calendarDate = new Date(date);
    const formattedDate = 
        ('0' + (calendarDate.getMonth()+1)).slice(-2) + '/' +
        ('0' + calendarDate.getDate()).slice(-2) + '/' +
        calendarDate.getFullYear();
    return formattedDate
}