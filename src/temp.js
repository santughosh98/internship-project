// const isValidLink = function (value) {
//     if(   typeof value === "string" && 
//         value.trim().length > 0 &&
//         /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/.test(value)
//         )
//         return true;
//         return false;
// }

// let data  = isValidLink("https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png")
// console.log(data)

const isValidEmail = function (email) {
    if(
       
         /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
        //[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}

    ) return true;
    return false
}

let data  = isValidEmail("ankitraj@gmail.com")
console.log(data)
