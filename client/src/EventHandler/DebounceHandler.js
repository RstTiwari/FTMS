import { debounce } from "lodash";

const debounceHandler = debounce((value, data, fieldName) => {
    const regex = new RegExp(`${value}`, "i");
    let filteredData = data.filter((item) => {
        const test = regex.test(item[fieldName]);
        if (test) {
            return item;
        }
    });
    return filteredData;
}, 300);

export default debounceHandler;
