import fs from "fs";

//? Synchronously

//*READ
// const result = fs.readFileSync("data.txt", "utf8");
// console.log(result);

// console.log("Hello");


//* WRITE
// fs.writeFileSync("newFile.txt", "Hello from the newly created file.");

//* UPDATE
// fs.appendFileSync("newFile.txt", "This is updated text with not removing previous text.");

//* DELETE
// unlink: remove only the files
// rmdir: removes folder

// fs.unlinkSync("newFile.txt");
// fs.rmSync("test.txt");

// fs.rmdirSync("test");


//? Asynchronously

//* READ 
// fs.readFile("newFile.txt", "utf8", (error, data) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(data);
// });

// console.log("Hello");


//* WRITE 
// fs.writeFile("ram.text", "This is asynchronous write", (error, data) => {
//     if(error) {
//         console.log(error);
//         return;
// }
//         console.log("File has been written successfully.");
        
// });

//* UPDATE
// fs.appendFile("ram.txt", "\nThis is appended text.", (error, data) => {
// if (error) {
//     console.log(error);
//     return;
// }
// console.log("File has been appended");

// });

//* DELETE
fs.rm("ram.txt", (error, data) => {
    if (error) {
        console.log(error);
        
    }
    console.log("File deleted successfully");
    
});