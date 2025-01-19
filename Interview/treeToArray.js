/**
 * @Author: giaruei
 * @Date: 2025-01-19 15:54:29
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2025-01-19 15:57:38
 * @FilePath: /Front-Try/Interview/treeToArray.js
 * @Description:
 */
const data = [
  {
    id: 1,
    parentId: null,
    name: "Root 1",
    children: [
      {
        id: 2,
        parentId: 1,
        name: "Child 1-1",
        children: [
          {
            id: 4,
            parentId: 2,
            name: "Child 1-1-1",
            children: [],
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        name: "Child 1-2",
        children: [],
      },
    ],
  },
  {
    id: 5,
    parentId: null,
    name: "Root 2",
    children: [],
  },
];

function treeToArray(tree) {
  const result = [];
  function traverse(node) {
    const { children, ...rest } = node;
    result.push(rest);
    if (children && children.length) {
      children.forEach((child) => traverse(child));
    }
  }
  tree.forEach((node) => traverse(node));
  return result;
}
console.log(treeToArray(data));

// 转化后的结果
[
  { id: 1, parentId: null, name: "Root 1" },
  { id: 2, parentId: 1, name: "Child 1-1" },
  { id: 4, parentId: 2, name: "Child 1-1-1" },
  { id: 3, parentId: 1, name: "Child 1-2" },
  { id: 5, parentId: null, name: "Root 2" },
];