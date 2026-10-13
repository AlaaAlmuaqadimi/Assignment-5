function removeElement(nums, val) {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}

function runTests() {
  let nums1 = [3, 2, 2, 3];
  let val1 = 3;
  let result1 = removeElement(nums1, val1);
  console.log(`Test 1: nums = [3,2,2,3], val = 3`);
  console.log(`  New length: ${result1}, nums (first ${result1} elements): [${nums1.slice(0, result1)}]`);
  console.assert(result1 === 2 && nums1.slice(0, 2).every(x => x !== 3), 'Test 1 FAILED');

  let nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
  let val2 = 2;
  let result2 = removeElement(nums2, val2);
  console.log(`Test 2: nums = [0,1,2,2,3,0,4,2], val = 2`);
  console.log(`  New length: ${result2}, nums (first ${result2} elements): [${nums2.slice(0, result2)}]`);
  console.assert(result2 === 5 && nums2.slice(0, 5).every(x => x !== 2), 'Test 2 FAILED');

  let nums3 = [1, 1, 1, 1];
  let val3 = 1;
  let result3 = removeElement(nums3, val3);
  console.log(`Test 3: nums = [1,1,1,1], val = 1`);
  console.log(`  New length: ${result3}`);
  console.assert(result3 === 0, 'Test 3 FAILED');

  let nums4 = [1, 2, 3, 4];
  let val4 = 5;
  let result4 = removeElement(nums4, val4);
  console.log(`Test 4: nums = [1,2,3,4], val = 5`);
  console.log(`  New length: ${result4}`);
  console.assert(result4 === 4, 'Test 4 FAILED');

  let nums5 = [];
  let val5 = 1;
  let result5 = removeElement(nums5, val5);
  console.log(`Test 5: nums = [], val = 1`);
  console.log(`  New length: ${result5}`);
  console.assert(result5 === 0, 'Test 5 FAILED');

  let nums6 = [5];
  let val6 = 5;
  let result6 = removeElement(nums6, val6);
  console.log(`Test 6: nums = [5], val = 5`);
  console.log(`  New length: ${result6}`);
  console.assert(result6 === 0, 'Test 6 FAILED');

  let nums7 = [3];
  let val7 = 5;
  let result7 = removeElement(nums7, val7);
  console.log(`Test 7: nums = [3], val = 5`);
  console.log(`  New length: ${result7}`);
  console.assert(result7 === 1, 'Test 7 FAILED');

  let nums8 = [-1, 2, -1, 3, -1, 4];
  let val8 = -1;
  let result8 = removeElement(nums8, val8);
  console.log(`Test 8: nums = [-1,2,-1,3,-1,4], val = -1`);
  console.log(`  New length: ${result8}`);
  console.assert(result8 === 3, 'Test 8 FAILED');

  let nums9 = [7, 7, 7, 7, 7];
  let val9 = 3;
  let result9 = removeElement(nums9, val9);
  console.log(`Test 9: nums = [7,7,7,7,7], val = 3`);
  console.log(`  New length: ${result9}`);
  console.assert(result9 === 5, 'Test 9 FAILED');

  let nums10 = Array(100).fill(1).concat(Array(50).fill(2));
  let val10 = 1;
  let result10 = removeElement(nums10, val10);
  console.log(`Test 10: nums = [1x100, 2x50], val = 1`);
  console.log(`  New length: ${result10}`);
  console.assert(result10 === 50, 'Test 10 FAILED');

  console.log('\nAll tests passed!');
}

runTests();

module.exports = removeElement;
