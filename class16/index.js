const mongoose = require('mongoose');
const colors = require('colors'); // Import colors module

const Friend = require('./models/friend');
const ContactLog = require('./models/contactLog');

mongoose
    .connect('mongodb://localhost:27017/myfriends', {})
    .then(() => console.log(' Connected to database'.green))
    .catch((err) => console.log(' Database connection error:'.red, err));

// async function recordFriendDocument() {
//     try {
//         const frnd = new Friend({
//             name: 'Nehal',
//             email: 'FjT0e@example.com',
//             contact: '1234-5678901',
//             age: 50 
//         });

//         await frnd.save();
//         console.log(' Friend document saved'.blue);
//     } catch (err) {
//         console.log(' Error saving document:'.red, err);
//     }
// }

async function updateFriendsEmail() {
    try {
        const friends = await Friend.find({ age: { $gt: 45 } }); // Find all matching users
        for (let i = 0; i < friends.length; i++) {
            friends[i].email = `updatedEmail${i}@gmail.com`; // Unique emails
            await friends[i].save();
        }
        console.log(`${friends.length} friends updated`.yellow);
    } catch (err) {
        console.log("Error updating friends:", err);
    }
}

async function addAgeField() {
    try {
        const result = await Friend.updateMany(
            { age: { $exists: false } },  // Find all documents missing `age`
            { $set: { age: 30 } } // Set default age (adjust as needed)
        );
        console.log(`${result.modifiedCount} documents updated with default age.`);
    } catch (err) {
        console.log("Error updating existing friends:", err);
    }
}


async function updateFriendName() {
    try {
        const result = await Friend.updateOne(
            { 
                $and: [
                    { email: "john.doe@example.com" },
                    { contact: "1234-5678901" },
                    { age: { $eq: 35 } }
                ]
            },
            { $set: { name: "Updated Name" } }
        );

        if (result.modifiedCount > 0) {
            console.log("Friend's name updated successfully!".green);
        } else {
            console.log("No matching friend found or no changes made.".yellow);
        }
    } catch (err) {
        console.log("Error updating friend's name:", err);
    }
}

async function updateMultipleFriendsAge() {
    try {
        const emailList = [
            "john@example.com",
            "FjT0e@example.com",
            "alice.johnson@example.com"
        ]; 

        const result = await Friend.updateMany(
            { email: { $in: emailList } },  
            { $set: { age: 40 } }  
        );

        console.log(`${result.modifiedCount} friends' ages updated successfully!`.cyan);
    } catch (err) {
        console.log("Error updating friends' ages:", err);
    }
}

async function findNorConditionFriends() {
    try {
        const friends = await Friend.find({
            $nor: [
                { name: "Nehal" },
                { age: { $gt: 50 } }
            ]
        });

        console.log("Friends matching NOR condition:", friends);
    } catch (err) {
        console.log("Error finding friends:", err);
    }
}

async function updateFriendAndReturnNew() {
    try {
        const updatedFriend = await Friend.findOneAndUpdate(
            { email: "john@example.com" }, // Find by email
            { $set: { name: "John Updated" } }, // Update name
            { new: true } // Return the updated document
        );

        if (updatedFriend) {
            console.log("Updated Friend:", updatedFriend);
        } else {
            console.log("No friend found with the given email.");
        }
    } catch (err) {
        console.log("Error updating friend:", err);
    }
}

async function main() {
    // await recordFriendDocument(); 
    await updateFriendsEmail();
    await updateMultipleFriendsAge();
    await updateFriendName();
    await findNorConditionFriends();
    await updateFriendAndReturnNew();
    await mongoose.connection.close();
    console.log(" Database connection closed".white);

}

main();
