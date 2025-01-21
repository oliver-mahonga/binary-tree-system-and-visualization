function Node(value, left, right, parent = "", children = []) {
    this.value = value;
    this.right = right;
    this.left = left;
    this.parent = parent;
    this.children = children;
    this.isRight = null;
    this.isLeft = null;
}

// Function for in-order traversal
function inOrderTraversal(node, result = []) {
    if (node == null || node.value === "Empty") return;
    inOrderTraversal(node.left, result);
    result.push(node.value);
    inOrderTraversal(node.right, result);
    return result;
}

// Function for pre-order traversal
function preOrderTraversal(node, result = []) {
    if (node == null || node.value === "Empty") return;
    result.push(node.value);
    preOrderTraversal(node.left, result);
    preOrderTraversal(node.right, result);
    return result;
}

// Function for post-order traversal
function postOrderTraversal(node, result = []) {
    if (node == null || node.value === "Empty") return;
    postOrderTraversal(node.left, result);
    postOrderTraversal(node.right, result);
    result.push(node.value);
    return result;
}

function createTree(arr) {
    for (var i = 1; i < arr.length; i++) {
        nodeDirection(arr[0], arr[i]);
    }

    createData(arr[0]);
    remove();
    try {
        // Display traversals
        console.log("In-Order Traversal:", inOrderTraversal(arr[0]).join(", "));
        console.log("Pre-Order Traversal:", preOrderTraversal(arr[0]).join(", "));
        console.log("Post-Order Traversal:", postOrderTraversal(arr[0]).join(", "));

        drawGraph(arr); // Call visualization
    } catch (e) {
        console.log("No Input");
    }
}

function remove() {
    var graph = document.querySelector("svg");
    if (graph) {
        graph.parentElement.removeChild(graph);
    }
}

function nodeDirection(root, node) {
    var a = Number(node.value);
    var b = Number(root.value);
    if (a < b) {
        if (root.left == null) {
            root.left = node;
            node.isLeft = true;
        } else {
            nodeDirection(root.left, node);
        }
    } else if (a > b) {
        if (root.right == null) {
            root.right = node;
            node.isRight = true;
        } else {
            nodeDirection(root.right, node);
        }
    }
}

function createData(node) {
    if (node == null) {
        return;
    }

    if (node.left) {
        node.children.push(node.left);
        node.left.parent = node;
        if (!node.right) {
            let newNode = new Node("Empty", null, null);
            newNode.isRight = true;
            node.children.push(newNode);
            newNode.parent = node;
        }
    }

    if (node.right) {
        node.children.push(node.right);
        node.right.parent = node;
        if (!node.left) {
            let newNode = new Node("Empty", null, null);
            newNode.isLeft = true;
            node.children.unshift(newNode);
            newNode.parent = node;
        }
    }

    createData(node.left);
    createData(node.right);
}

function createNodes(list) {
    new_list = [];

    for (var i = 0; i < list.length; i++) {
        if (list[i] == "") {
            continue;
        }
        new_list.push(new Node(list[i], null, null));
    }

    createTree(new_list);

    if (new_list.length != 0) {
        document.querySelector(".btn").disabled = false;
    } else {
        document.querySelector(".btn").disabled = true;
    }

    return new_list;
}
