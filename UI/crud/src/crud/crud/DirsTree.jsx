import { useState, useEffect } from 'react';
import config from '../config.js'
import Loading from '../misc/loading/Loading.jsx'
import { restGet } from '../misc/utils/restGet.js'

export default function DirsTree({ callbackSelectItem, reload, callbackReload, data }) {

    const [loading, setLoading] = useState(false);
    const [itemSelected, setItemSelected] = useState(0);

    function handleItemSelect(item) {
        setItemSelected(item)
        callbackSelectItem(item, "r")
    }

    const renderTree = (data_, tab_ = 0) => {
        if (!data_)
            return

        return data_.map((item) => (
            <div key={item.skid}>
                <div className={`align-row hover ${item.skid === itemSelected.skid ? 'hovered' : null}`} >
                    {'\u00A0'.repeat(tab_ * 5)}
                    <img src='img/folder.svg' alt='edit' />

                    <a style={{ margin: "0.25rem 0.1rem", }}
                        onClick={() => handleItemSelect(item)}>
                        {item.title}</a>

                    <img src='img/pencil-square.svg' alt='edit' onClick={() => callbackSelectItem({ skid: item.skid, role: "dir" }, "w")}
                        className='cursorPointer' />
                </div>

                {item.children && (
                    <div >{renderTree(item.children, tab_ + 1)}</div>
                )}
            </div>
        ))
    }

    return (
        <div className="containerCell" >

            <div className='align-row'>
                <img src='img/plus-square.svg' alt='add'
                    onClick={() => callbackSelectItem({ skid: "0", role: "dir" }, "w")}
                    className='cursorPointer' />
                <span style={{ margin: "0 0.25rem", fontWeight: "bold" }}>&nbsp;</span>
            </div>
            <hr />

            <Loading loading={loading} />

            {renderTree(buildTree(data))}

        </div >

    )
}

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

    // console.log(JSON.stringify(tree, null, 2));
    return tree; // Return the tree structure
}