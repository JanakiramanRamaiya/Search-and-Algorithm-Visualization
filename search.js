function highlightBlockAndIndex(block, indexContainer) {
  return new Promise((resolve) => {
    block.classList.add("highlight-search");
    // indexContainer.classList.add("highlight");

    setTimeout(() => {
      block.classList.remove("highlight-search");
      //   indexContainer.classList.remove("highlight");
      resolve();
    }, 600);
  });
}

async function linearSearch(searchValue) {
  const linearSearchPromise = new Promise(async (resolve, reject) => {
    const blockContainers = document.querySelectorAll(
      ".block-element-container"
    );

    // if (!blockContainers || !blockContainers.length) {
    //   reject("NOT_FOUND");
    //   resturn;
    // }

    for (let index = 0; index < blockContainers.length; index++) {
      const blockContainer = blockContainers[index];
      const block = blockContainer.querySelector(".block");
      const indexContainer = blockContainer.querySelector(".index-container");
      const number = Number(blockContainer.getAttribute("data-number"));
      console.log(number);
      // if(number <= searchValue){
      await highlightBlockAndIndex(block, indexContainer);

      if (number == searchValue) {
        block.classList.add("highlight-result");
        resolve();
        return linearSearchPromise;
      }

      continue;

      break;
    }

    resolve();

    alert("searched element not found in the array");
  });

  return linearSearchPromise;
}
// ...................binary search........................

async function highlightLowMidAndHigh(
  lowContainer,
  midContainer,
  highContainer
) {
  const lowIndexContainer = lowContainer.querySelector(".block");
  const midIndexContainer = midContainer.querySelector(".block");
  const highIndexContainer = highContainer.querySelector(".block");

  console.log(lowIndexContainer, midIndexContainer, highIndexContainer);
  lowIndexContainer.classList.add("highlight-search");
  // midIndexContainer.classList.add("highlight-search");
  highIndexContainer.classList.add("highlight-search");
  return new Promise((resolve) => {
    setTimeout(() => {
      midIndexContainer.classList.add("highlight-search");
      // midBlock.classList.add("highlight");

      setTimeout(() => {
        lowIndexContainer.classList.remove("highlight-search");
        highIndexContainer.classList.remove("highlight-search");
        midIndexContainer.classList.remove("highlight-search");
        // midBlock.classList.remove("highlight");
        resolve();
      }, 700);
    }, 700);
  });
}

// get mid element index getting an average of low and high
function getMidIndex(low, high) {
  let mid = (low + high) / 2;

  return Math.floor(mid);
}

async function binarySearch(searchValue) {
  const binarySearchPromise = new Promise(async (resolve, reject) => {
    const blockContainers = document.getElementsByClassName(
      "block-element-container"
    );

    // if (!blockContainers) {
    //   reject("NOT_FOUND");
    //   return;
    // }

    let low = 0;
    let high = blockContainers.length - 1;
    let mid;

    while (low <= high) {
      mid = getMidIndex(low, high);
      const lowBlockContainer = blockContainers[low];
      const midBlockContainer = blockContainers[mid];
      const highBlockContainer = blockContainers[high];
      const midBlock = midBlockContainer;
      // console.log(lowBlockContainer, blockContainers[0]);
      const midNumber = Number(midBlock.getAttribute("data-number"));

      await highlightLowMidAndHigh(
        lowBlockContainer,
        midBlockContainer,
        highBlockContainer
      );

      if (midNumber == searchValue) {
        let midcon = midBlockContainer.querySelector(".block");
        midcon.classList.add("highlight-result");
        resolve();
        return binarySearchPromise;
      }

      if (midNumber < searchValue) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    alert("searched element not found in the array");
  });
  resolve();
  return binarySearchPromise;
}
