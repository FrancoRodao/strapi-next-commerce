/**
  @example 

    Input: 5
    Output: [1, 2, 3, 4, 5]
    
  @param {number} number  number of elements the array must have
  @return {number[]}  an array with the number of elements
*/
export const numberToArray = (number = 5) =>
  Array.from(Array(number + 1).keys()).slice(1)
