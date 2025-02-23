/**
 * @Author: giaruei
 * @Date: 2025-02-05 20:31:16
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2025-02-05 20:31:17
 * @FilePath: /Front-Try/traverseTree.js
 * @Description: 手写二叉树遍历——迭代法
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

/*******
 * @description: 前序
 * @param {TreeNode} root
 * @return {Array<number>}
 */
function preorderTraversal(root) {
  if (!root) return [];
  const res = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return res;
}

console.log("前序遍历", preorderTraversal(root));

/*******
 * @description: 中序
 * @param {TreeNode} root
 * @return {Array<number>}
 */
function inorderTraversal(root) {
  if (!root) return [];
  const res = [];
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    res.push(current.val);
    current = current.right;
  }
  return res;
}

console.log("中序遍历", inorderTraversal(root));

/*******
 * @description: 后序
 * @param {TreeNode} root
 * @return {Array<number>}
 */
function postorderTraversal(root) {
  if (!root) return [];
  const res = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return res.reverse();
}

console.log("后序遍历", postorderTraversal(root));
