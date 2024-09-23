const data = [
    { parent: "20240917_101722_493", role: "dir", descr: "   ", pkid: "0", title: "adsf3.1", skid: "20240917_223523_539" },
    { parent: "20240917_214703_603", role: "dir", descr: "dir22  ", pkid: "0", title: "asdf1.1", skid: "20240917_133512_234" },
    { parent: "0", role: "dir", descr: "qwer\n   ", pkid: "0", title: "1. Notifications", skid: "20240917_214703_603" },
    { parent: "20240918_111304_448", role: "dir", descr: "             ", pkid: "0", title: "____111", skid: "20240921_132816_675" },
    { parent: "0", role: "dir", descr: "dir2  ", pkid: "0", title: "2.dir259", skid: "20240917_133433_259" },
    { parent: "20240917_101722_493", role: "dir", descr: "dir11 k ", pkid: "0", title: "dir3.1.1", skid: "20240917_101836_075" },
    { parent: "0", role: "dir", descr: "   ", pkid: "0", title: "lkjm", skid: "20240922_174513_014" },
    { parent: "20240917_214703_603", role: "dir", descr: "   ", pkid: "0", title: "asdf1.2", skid: "20240918_111304_448" },
    { parent: "20240922_082903_711", role: "dir", descr: "   ", pkid: "0", title: "2.1.1", skid: "20240922_082927_797" },
    { parent: "20240917_214703_603", role: "dir", descr: "dir3   ", pkid: "0", title: "3.Test Dir 3", skid: "20240917_101722_493" },
    { parent: "20240917_133433_259", role: "dir", descr: "  ", pkid: "0", title: "2.1", skid: "20240922_082903_711" }
];

// Function to build a tree structure
function buildTree(data) {
    const map = {}; // Create a map to store nodes by their skid
    const tree = []; // Final tree structure

    // First, map each item by its skid
    data.forEach(item => {
        map[item.skid] = { ...item, children: [] }; // Add children array to each node
    });

    // Now, arrange items under their parents
    data.forEach(item => {
        if (item.parent === "0") {
            // If the parent is "0", it's a root node, add to tree
            tree.push(map[item.skid]);
        } else {
            // Else, find the parent and push the item into its children
            if (map[item.parent]) {
                map[item.parent].children.push(map[item.skid]);
            }
        }
    });

    return tree; // Return the tree structure
}

const treeData = buildTree(data);
console.log(JSON.stringify(treeData, null, 2));
