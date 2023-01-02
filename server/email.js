const ses = require("./ses");
//const { SOURCE_EMAIL } = process.env;

const testMail = ses
    .sendEmail({
        //Source: "Funky Chicken <${SOURCE_EMAIL}>",
        Source: "Funky Chicken <funky.chicken@spiced.academy>",
        Destination: {
            ToAddresses: ["disco.duck@spiced.academy"],
        },
        Message: {
            Body: {
                Text: {
                    Data: "We can't wait to start working with you! Please arrive on Monday at 9:00 am. Dress code is casual so don't suit up.",
                },
            },
            Subject: {
                Data: "Your Application Has Been Accepted!",
            },
        },
    })
    .promise()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });

module.exports = testMail;

// // ses.sendEmail({
// //     Source: `Coolo Cohort <${SOURCE_EMAIL}>`,
// //     Destination: {
// //         ToAddresses: {
// //             'emial here'
// //         },
// //     },
// //     Message: {
// //         Body: {
// //             Text: {
// //                 Data: "hi there",
// //             }
// //         },
// //         Subject: {
// //             Data: 'hi',
// //         },
// //     },
// // }).promise()
// //     .then((result => {
// //         console.log(result);
// //     }))
// //     .catch((error => {
// //         console.log(error);
// //         throw error
// //     }))
