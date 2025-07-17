function squareNum(val) {
    const result = val * val;
    return result;
}

function cubeNum(val) {
    const result = val * val * val;
    return result;
}

export function areaOfCircle (r) {
    const area = 3.14 * r *r;
    return area;
}

// export default squareNum;
export default squareNum
export { cubeNum };