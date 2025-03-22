let tree = new Tree([42, 12, 34, 2, 3, 56, 47]);
const arrayInput = document.querySelector("#array-input");
const drawingArea = document.querySelector(".graph");
const treeStruct = document.createElement("div");
treeStruct.classList.add("tree-visual");

const insertInput = document.querySelector("#insert");
const insertButton = document.querySelector("button.insert");
insertButton.addEventListener("click", () => {
  let val = insertInput.value;
  if (val) {
    tree.insert(val);
    drawTree(tree);
    updateInfo();
  }
});

const deleteInput = document.querySelector("#delete");
const deleteButton = document.querySelector("button.delete");
deleteButton.addEventListener("click", () => {
  let val = deleteInput.value;
  if (val) {
    tree.delete(val);
    drawTree(tree);
    updateInfo();
  }
});

arrayInput.addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/[^\d\s]/g, "");
  let val = event.target.value.replace(/[^\d\s]/g, "").trim();
  let array;
  if (val !== " " && val !== "") {
    array = val.split(" ");
  }
  tree = new Tree(array);
  drawTree(tree);
  updateInfo();
});

const findInput = document.querySelector(".find-node");
const isExistP = document.querySelector("p.is-exist");
const nodeHeight = document.querySelector("p.node-height");
const nodeDepth = document.querySelector("p.node-depth");

findInput.addEventListener("input", (event) => {
  isExistP.innerHTML = "";
  nodeHeight.innerHTML = "";
  nodeDepth.innerHTML = "";
  let val = event.target.value;
  let isExist = tree.find(+val);
  if (isExist) {
    isExistP.textContent = `A node with value ${val} exists`;
    nodeHeight.textContent = `Node height: ${tree.height(isExist)}`;
    nodeDepth.textContent = `Node depth: ${tree.depth(isExist, tree.root)}`;
  } else {
    isExistP.textContent = `A node with value ${val} does not exists`;
  }
});

const rebalanceBtn = document.querySelector("button.rebalance");
rebalanceBtn.addEventListener("click", () => {
  tree.rebalanceTree();
  drawTree(tree);
  updateInfo();
});

function drawTree(tree) {
  treeStruct.innerHTML = "";

  drawPretty(tree.root);
  drawingArea.append(treeStruct);
}

function drawPretty(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    drawPretty(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  const branch = document.createElement("div");
  branch.textContent = `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`;
  treeStruct.append(branch);
  if (node.left !== null) {
    drawPretty(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function updateLevelOrder() {
  const holder = document.querySelector("p.level-order-res");
  const levelOrderArr = [];
  function printNodes(node, arr = levelOrderArr) {
    arr.push(node.data);
  }
  tree.levelOrder(printNodes);
  holder.textContent = `${levelOrderArr.join(", ")}`;
}

function updateInOrder() {
  const holder = document.querySelector("p.in-order-res");
  const resArr = [];
  function printNodes(node, arr = resArr) {
    arr.push(node.data);
  }
  tree.inOrder(printNodes);
  holder.textContent = `${resArr.join(", ")}`;
}

function updatePreOrder() {
  const holder = document.querySelector("p.pre-order-res");
  const resArr = [];
  function printNodes(node, arr = resArr) {
    arr.push(node.data);
  }
  tree.preOrder(printNodes);
  holder.textContent = `${resArr.join(", ")}`;
}

function updatePostOrder() {
  const holder = document.querySelector("p.post-order-res");
  const resArr = [];
  function printNodes(node, arr = resArr) {
    arr.push(node.data);
  }
  tree.postOrder(printNodes);
  holder.textContent = `${resArr.join(", ")}`;
}

function updateTreeHeight() {
  const treeHeightDiv = document.querySelector(".tree-height");
  treeHeightDiv.textContent = `Tree Height: ${tree.height(tree.root)}`;
}

function updateIsBalanced(root) {
  const isBalancedDiv = document.querySelector(".is-tree-balanced");
  if (tree.isBalanced(root)) {
    isBalancedDiv.textContent = "Tree is Balanced";
  } else {
    isBalancedDiv.textContent = "Tree is not Balanced";
  }
}

function updateInfo() {
  updateLevelOrder();
  updateInOrder();
  updatePreOrder();
  updatePostOrder();
  updateTreeHeight();
  updateIsBalanced(tree.root);
}

drawTree(tree);
updateInfo();
