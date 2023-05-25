const transactions = [
    {
        id: 3,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:34:30.000Z',
    },
    {
        id: 1,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:00.000Z',
    },
    {
        id: 6,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:05.000Z',
    },
    {
        id: 4,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:36:00.000Z',
    },
    {
        id: 2,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:50.000Z',
    },
    {
        id: 5,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:00.000Z',
    },
];

// function findDuplicateTransactions(transactions) {
//     const copied = transactions.slice();

//     copied.sort((a, b) => new Date(a.time) - new Date(b.time));

//     const duplicates = [];

//     for (let i = 0; i < copied.length; i++) {
//         for (let j = i + 1; j < copied.length; j++) {
//             if (
//                 copied[i].targetAccount === copied[j].targetAccount &&
//                 copied[i].amount === copied[j].amount &&
//                 copied[i].category === copied[j].category &&
//                 Math.abs(new Date(copied[j].time) - new Date(copied[i].time)) < 60000
//             ) {
//                 if (!duplicates.includes(copied[j].id)) {
//                     duplicates.push(copied[j]);
//                 }
//                 break;
//             }
//         }
//     }

//     return duplicates;
// }


function findDuplicateTransactions(transactions) {
    let newStr = JSON.stringify(transactions)
    let newTransactions = JSON.parse(newStr)

    // This will sort the transactions in an ascending order
    const sortedTime = newTransactions.sort(
        (a, b) => new Date(a.time) - new Date(b.time)
    );

    // console.log("sortedTime:", sortedTime);

    let duplicates = [];
    let currentGroup = [newTransactions[0]]; // start with the first transaction

    // Start from the second transaction
    for (let i = 1; i < newTransactions.length; i++) {
        let t1 = newTransactions[i - 1];
        let t2 = newTransactions[i];

        // Compare t1 and t2
        let timeDifference = Math.abs(new Date(t2.time) - new Date(t1.time));
        if (
            t1.sourceAccount === t2.sourceAccount &&
            t1.targetAccount === t2.targetAccount &&
            t1.category === t2.category &&
            t1.amount === t2.amount &&
            timeDifference <= 60000 // check if time difference is less than or equal to 1 minute
        ) {
            // This will push all duplicate into the current group array
            currentGroup.push(t2);
        } else {
            // If no condition is met, it means we have finished checking a group of
            // transactions. If the current group has more than 1 transaction (which means
            // we found duplicates), add it to the result.
            if (currentGroup.length > 1) {
                duplicates.push(currentGroup);
            }

            // Here t2 is initiated as the first transaction in the new group
            // But the element is same as the t1 in the next iteration
            currentGroup = [t2];
        }
    }

    // Don't forget to check the last group
    if (currentGroup.length > 1) {
        duplicates.push(currentGroup);
    }

    return duplicates;
}

export default findDuplicateTransactions;