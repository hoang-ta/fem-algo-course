export default function bs_list(haystack: number[], needle: number): boolean {
    let left = 0;
    let right = haystack.length - 1;
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (haystack[middle] === needle) {
            return true;
        }
        if (haystack[middle] > needle) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    return false;
}
