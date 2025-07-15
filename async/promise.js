import fs from "fs/promises";

//* Promise type
/**
 * 3 States:
 * 1. Pending (Loading)
 * 2. Resolved (Success)
 * 3. Rejected (Error)
 */
// fs.readFile("datas.txt", "utf8").then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error);
// }).finally(() => {
//     console.log("This is final Code");
// });

fs.readFile("users.json", "utf8").then((users) => {
    console.log(users);
    return fs.readFile("posts.json", "utf8");
}).then((posts) => {
    console.log(`Posts: \n${posts}`);
    return fs.readFile("comments.json", "utf8");
}).then((comments) => {
    console.log(`Comments: \n${comments}`);
}).catch((error) => {
    console.log(error);
});