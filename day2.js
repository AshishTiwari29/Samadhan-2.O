
function findHighest(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;

    const first = arr[0];

    if (typeof first === 'number') {
        return arr.reduce((max, n) => (n > max ? n : max), -Infinity);
    }

    if (typeof first === 'object' && first !== null) {
        const keys = ['marks', 'mark', 'score'];
        const key = keys.find(k => k in first) ||
            Object.keys(first).find(k => typeof first[k] === 'number');

        if (!key) return null;

        return arr.reduce((best, item) => (item[key] > best[key] ? item : best), arr[0]);
    }

    return null;
}

console.log(findHighest([12, 45, 7, 99, 23])); 

const students = [
    { name: 'A', marks: 78 },
    { name: 'B', marks: 92 },
    { name: 'C', marks: 85 }
];

console.log(findHighest(students)); 