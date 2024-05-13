// 给定一个版本列表，按照版本号从大到小排序, 其中 rc > beta > alpha
// ["1.2.0", "2.1.1", "1.2.20", "1.2.1", "1.2.0.beta.1", "1.2.0.rc.1", "1.2.0.alpha.1"];

const input1 = ["1.2.2", "1.2.1", "2.5.0"];
const input2 = [
    "1.2.0",
    "2.1.1",
    "1.2.20",
    "1.2.1",
    "1.2.0.beta.1",
    "1.2.0.rc.1",
    "1.2.0.alpha.1",
];

const MAP = {
    rc: -1,
    beta: -2,
    alpha: -3,
};

function version_compare(input) {
    return input.sort((a, b) => {
        const v1 = a.split(".");
        const v2 = b.split(".");

        const maxLen = Math.max(v1.length, v2.length);

        for (let i = 0; i < maxLen; i++) {
            const n1 = i === 3 && v1[i] ? MAP[v1[i]] : Number(v1[i]) || 0;
            const n2 = i === 3 && v2[i] ? MAP[v2[i]] : Number(v2[i]) || 0;

            if (n1 > n2) {
                return -1;
            } else if (n1 < n2) {
                return 1;
            }
        }

        return 0;
    });
}

console.log(version_compare(input1));
console.log(version_compare(input2));
