//? Callback: function that is used as a parameter
// Generally used in async program.

//* Higher order function: function that accepts function as a parameter.

import { log } from "console";
import fs from "fs";
import { json } from "stream/consumers";

// fs.readFile("data.txt", "utf8", (error, data) => {
//     if (error)
//         return error;
//     console.log(data);

// });

/**
 * 1. Get Users
 * 2. Get posts of the users
 * 3. Get cmments of the posts
 */

//* Callback Hell

// fs.readFile("users.json", "utf8", (error, users) => {
//     if (error) return error;

//     const userList = JSON.parse(users);
//     console.log(users);

//     fs.readFile("posts.json", "utf8", (postErr, posts) => {
//         if (postErr) return postErr;
//         const postList = JSON.parse(posts);
//         const result = userList.map(user => {
//             return {
//                 ...user,
//                 posts: postList.map(post => (user.id == post.userId ? post : null)).filter(Boolean),
//             };
//         })
//         console.log(result);
//         fs.readFile("comments.json", "utf8", (commentErr, comments) => {
//             if (commentErr) return commentErr;
//             console.log(comments);
//         });
//     });
// });