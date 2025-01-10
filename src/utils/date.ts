export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以需要+1，并且补0
    const day = date.getDate().toString().padStart(2, '0'); // 日期补0
    return `${year}-${month}-${day}`;
}

export function formatDataTimeStr(time: string | undefined) {
    if (!time || time === '') {
        return '0000-00-00 00:00:00';
    }

    try {
        const date = new Date(time);
        if (isNaN(date.getTime())) {
            // 如果时间字符串无效，返回默认值
            return '0000-00-00 00:00:00';
        }

        // 使用固定格式输出时间字符串
        const timestr = date.toISOString().slice(0, 19).replace('T', ' ');
        return timestr;
    } catch (error) {
        // 捕获任何可能的异常并返回默认值
        return '0000-00-00 00:00:00';
    }
}

export function formatTimeStr(time: string | undefined) {
    if (!time || time === '') {
        return '00:00:00';
    }
    try {
        const date = new Date(time);
        if (isNaN(date.getTime())) {
            // 如果时间字符串无效，返回默认值
            return '00:00:00';
        }
        return date.toLocaleTimeString();
    } catch (error) {
        // 捕获任何可能的异常并返回默认值
        return '00:00:00';
    }
}

export function formatDateStr(time: string | undefined) {
    if (!time || time === '') {
        return '0000-00-00';
    }
    try {
        const date = new Date(time);
        if (isNaN(date.getTime())) {
            // 如果时间字符串无效，返回默认值
            return '0000-00-00';
        }
        return date.toLocaleDateString();
    } catch (error) {
        // 捕获任何可能的异常并返回默认值
        return '0000-00-00';
    }
}

export const futureDate = (time: Date) => {
    return time.getTime() > Date.now()
}