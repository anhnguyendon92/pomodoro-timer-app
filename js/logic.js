// 1: 02

const input_min = 1;
const input_sec = 2;

const convert_to_secs = (input_min, input_sec) =>  input_min * 60 + input_sec;

const convert_from_secs = (input_sec) => {
    const sec = input_sec % 60;
    const min = Math.floor(input_sec / 60);
    return [min, sec];
};

const test_1 = convert_to_secs(input_min, input_sec);
console.log('test_1: ', test_1);

const test_2 = convert_from_secs(test_1);
console.log(`test_2: [min:sec] ${test_2[0]}:${test_2[1]}`)