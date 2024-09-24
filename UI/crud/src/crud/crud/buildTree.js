
// Function to build a tree structure
export function buildTree(data) {
    const map = {}; // Create a map to store nodes by their skid
    const tree = []; // Final tree structure

    if (!data || data === undefined || data === null || data.length === 0)
        return;

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

    // console.log(JSON.stringify(tree, null, 2));
    return tree; // Return the tree structure
}