export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以需要+1，并且补0
    const day = date.getDate().toString().padStart(2, '0'); // 日期补0
    return `${year}-${month}-${day}`;
}

export function formatDataTimeStr(time: string) {
    return new Date(time).toLocaleString();
}

export function formatTimeStr(time: string) {
    return new Date(time).toLocaleTimeString();
}

export function formatDateStr(time: string) {
    return new Date(time).toLocaleDateString();
}