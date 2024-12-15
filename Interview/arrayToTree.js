/**
 * @Author: giaruei
 * @Date: 2024-12-15 16:56:34
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-12-15 16:56:53
 * @FilePath: /Front-Try/Interview/arrayToTree.js
 * @Description:
 */

const data = [
  { id: 10, parentId: 0, text: "一级菜单-1" },
  { id: 20, parentId: 0, text: "一级菜单-2" },
  { id: 30, parentId: 20, text: "二级菜单-3" },
  { id: 25, parentId: 30, text: "三级菜单-25" },
  { id: 35, parentId: 30, text: "三级菜单-35" },
  { id: 40, parentId: 25, text: "四级菜单-40" },
];

function buildTree(array, parentId, children) {
  array.forEach((item) => {
    if (item.parentId === parentId) {
      item.children = [];
      buildTree(array, item.id, item.children);
      children.push(item);
    }
  });
  return children;
}
console.log(buildTree(data, 0, []));

// 转化后的结果
[
  {
    id: 10,
    parentId: 0,
    text: "一级菜单-1",
    children: [],
  },
  {
    id: 20,
    parentId: 0,
    text: "一级菜单-2",
    children: [
      {
        id: 30,
        parentId: 20,
        text: "二级菜单-3",
        children: [
          {
            id: 25,
            parentId: 30,
            text: "三级菜单-25",
            children: [
              {
                id: 40,
                parentId: 25,
                text: "四级菜单-40",
                children: [],
              },
            ],
          },
          {
            id: 35,
            parentId: 30,
            text: "三级菜单-35",
            children: [],
          },
        ],
      },
    ],
  },
];
