class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // remove dups and sort
    const uniqSortedArr = [...new Set(array)].sort((a, b) => a - b);
    const root = this.buildBalancedBST(
      uniqSortedArr,
      0,
      uniqSortedArr.length - 1
    );
    return root;
  }

  find(val, node = this.root) {
    if (node === null) {
      return false;
    }
    if (val === node.data) {
      return node;
    }
    if (val < node.data) {
      return this.find(val, node.left);
    } else {
      return this.find(val, node.right);
    }
  }

  rebalanceTree() {
    let newArray = [];
    this.inOrder((node, arr = newArray) => {
      arr.push(node.data);
    });
    this.root = this.buildTree(newArray);
  }

  depth(node, roo, depth = 0) {
    // the number of edges from the root to the node.
    // console.log(`node is ${node.data}`);
    if (roo === null) {
      return 0;
    }
    if (node.data === roo.data) {
      return depth;
    }

    let res = this.depth(node, roo.left, depth + 1);
    if (res === 0) {
      res = this.depth(node, roo.right, depth + 1);
    }
    return res;
  }

  height(target) {
    if (target === null) return -1;
    let leftHeight = this.height(target.left);
    let rightHeigt = this.height(target.right);
    return Math.max(leftHeight, rightHeigt) + 1;
  }

  isBalanced(root) {
    if (root === null) return true;
    let leftHeight = tree.height(root.left);
    let rightHeight = tree.height(root.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  levelOrder(callback, queue = [this.root]) {
    if (queue.length === 0) {
      return;
    }
    let curr = queue.shift();
    callback(curr);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
    this.levelOrder(callback, queue);
  }

  inOrder(callback, node = this.root) {
    // left root right
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    // root left right
    if (node === null) {
      return;
    }
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    //left right root
    if (node === null) {
      return;
    }
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  insert(val) {
    if (this.root === null) {
      this.root = new Node(+val);
    } else {
      this.insertHelper(this.root, +val);
    }
  }

  insertHelper(node, val) {
    if (node === null) {
      return new Node(val);
    }
    if (node.data === val) {
      // duplicated value not supported
      return node;
    }
    if (+val < +node.data) {
      node.left = this.insertHelper(node.left, val);
    } else {
      node.right = this.insertHelper(node.right, val);
    }
    return node;
  }

  delete(val) {
    if (this.root === null) return null;
    if (
      this.root.left === null &&
      this.root.right === null &&
      this.root.data === val
    ) {
      this.root = null;
    } else {
      this.deleteHelper(this.root, val);
    }
  }

  deleteHelper(node, val) {
    if (node === null) {
      return node;
    }
    if (+node.data < +val) {
      node.right = this.deleteHelper(node.right, val);
    }

    if (+node.data > +val) {
      node.left = this.deleteHelper(node.left, val);
    }

    if (+node.data === +val) {
      // if is leaf node
      if (node.left === null && node.right === null) {
        return null;
      }
      // if no left child
      if (node.left === null) {
        return node.right;
      }
      // if no right child
      if (node.right === null) {
        return node.left;
      }
      // has both left and right
      // find smallest child from right subtree
      // replace node value with the smallest val
      // delete the smallest child
      let smallest = this.findSmallest(node.right);
      node.data = smallest.data;
      node.right = this.deleteHelper(node.right, smallest.data);
    }
    return node;
  }

  findSmallest(node) {
    // goes all the way to the left
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  buildBalancedBST(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(
      array[mid],
      this.buildBalancedBST(array, start, mid - 1),
      this.buildBalancedBST(array, mid + 1, end)
    );
    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
