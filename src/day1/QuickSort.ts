export default function quick_sort(arr: number[]): void {
    const sorted_arr = perform_quick_sort(arr);
    arr.forEach((_, index) => {
        arr[index] = sorted_arr[index];
    });
}

function perform_quick_sort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const start = 0;
    const end = arr.length - 1;
    const middle = Math.floor((start + end) / 2);
    const pivot = arr[middle];
    const leftArr: number[] = [];
    const rightArr: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === pivot) continue;
        if (arr[i] > pivot) {
            rightArr.push(arr[i]);
        } else {
            leftArr.push(arr[i]);
        }
    }
    const result = [
        ...perform_quick_sort(leftArr),
        pivot,
        ...perform_quick_sort(rightArr),
    ];
    return result;
}
