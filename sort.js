/**
 * @Author: giaruei
 * @Date: 2025-02-05 20:29:14
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2025-02-05 20:30:18
 * @FilePath: /Front-Try/sort.js
 * @Description: 手写快排和归并排序
 */

/******* 
 * @description: 快速排序
 * @param {Array<number>} arr
 * @return {Array<number>}
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  // const left = [];
  // const right = [];
  // const mid = arr[0];
  // for (let i = 1; i < arr.length; i++) {
  //   if (arr[i] < mid) {
  //     left.push(arr[i]);
  //   } else {
  //     right.push(arr[i]);
  //   }
  // }
  const pivot = arr[0];
  const left = arr.slice(1).filter((v) => v <= pivot);
  const right = arr.slice(1).filter((v) => v > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([5, 1, 4, 9, 7, 2, 6, 3, 8]));

/******* 
 * @description: 归并排序
 * @param {Array<number>} arr
 * @return {Array<number>}
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = arr.length >> 1;
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

/******* 
 * @description: 合并两个有序数组
 * @param {Array<number>} left
 * @param {Array<number>} right
 * @return {Array<number>}
 */
function merge(left, right) {
  const res = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      res.push(left[i]);
      i++;
    } else {
      res.push(right[j]);
      j++;
    }
  }
  return res.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([5, 1, 4, 9, 7, 2, 6, 3, 8]));