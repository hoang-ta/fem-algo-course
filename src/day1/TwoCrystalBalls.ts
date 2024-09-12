export default function two_crystal_balls(breaks: boolean[]): number {
    let left = 0;
    let right = breaks.length - 1;
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (breaks[middle] === true && left === right) {
            return middle;
        }
        if (breaks[middle] === true) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }
    return -1;
}
