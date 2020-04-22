let checkBox = document.querySelector(".checkbox");
let ManualInput = document.querySelector("#Manual-Inputs");
let RandomInput = document.querySelector("#Random-Inputs");
let SizeContainer = document.querySelector(".Size-container");
let userInputContainer = document.querySelector(".user-Input-container");
let generate = document.querySelector("#generate");
let Size = document.querySelector("#Size");
let userInput = document.querySelector("#user-Input");
let containerEl = document.querySelector(".visualize-input");
let bubbleSortBtn = document.querySelector("#bubbleSortBtn");
let selectionSortBtn = document.getElementById("selectionSortBtn");
let linearsearch = document.getElementById("linearsearch");
let binarysearch = document.getElementById("binarysearch");
let blocks = document.querySelector(".block");
// let generateButton = document.querySelector("#generate");

let binary = false;

var flag = true;
let searchvalue = document.getElementById("searchvalue");
let defaultsize = 10;
let inputArray = [];
inputDisplayChange();
generateArray();
checkBox.addEventListener("click", () => inputDisplayChange());
generate.addEventListener("click", () => generateArray());
bubbleSortBtn.addEventListener("click", shouldprocessbubbleSort);
selectionSortBtn.addEventListener("click", shouldprocessselectionSort);
linearsearch.addEventListener("click", shouldprocesslinearsearch);
binarysearch.addEventListener("click", shouldprocessbinarysearch);
function inputDisplayChange() {
  if (ManualInput.checked) {
    SizeContainer.style.display = "block";
    userInputContainer.style.display = "none";
    SizeContainer.style.display = "none";
    userInputContainer.style.display = "block";
  } else if (RandomInput.checked) {
    SizeContainer.style.display = "block";
    userInputContainer.style.display = "none";
  }
}
async function generateArray() {
  const promise = new Promise(async (resolve, reject) => {
    if (binary) {
      if (inputArray) {
        // a.sort((a, b) => a - b)
        let sortarray = await inputArray.sort(
          (inputArray, b) => inputArray - b
        );
        console.log(sortarray);
        generateBlockForSort(sortarray);
      } else {
        inputArray = await generateRandomArrays(10);

        let sortarray = await inputArray.sort(
          (inputArray, b) => inputArray - b
        );
        console.log(sortarray);
        generateBlockForSort(sortarray);
      }
    } else if (ManualInput.checked) {
      inputArray = userInput.value.split(",");
      if (inputArray.length < 2) {
        alert("enter two or more number");
      }
    } else if (RandomInput.checked) {
      if (Size.value) {
        arraysize = Size.value;
      } else {
        arraysize = defaultsize;
      }

      if (arraysize > 1) {
        inputArray = generateRandomArrays(arraysize);
        // console.log(inputArray);
      } else {
        alert("enter size value greater than 1");
      }
    }
    if (inputArray && !binary) {
      generateBlockForSort(inputArray);
    }
    resolve();
  });

  return promise;
}
function generateRandomArrays(arraySize) {
  let RandomArrays = [];
  for (let i = 0; i < arraySize; i++) {
    let arrayNumber = Math.floor(Math.random() * (100 + i));
    if (!(arrayNumber in RandomArrays)) RandomArrays.push(arrayNumber);
  }
  return RandomArrays;
}
// ................
function getBlockElementHeight(number, maxNumber) {
  let containerEl = document.querySelector(".visualize-input");
  const containerHeight = containerEl.offsetHeight;

  let height = (number * containerHeight) / maxNumber;
  //   height ;
  return Math.floor(height);
}

function generateBlockForSort(randomNumbers) {
  let maxNumber = Math.max(...randomNumbers);
  // console.log(maxNumber);
  containerEl.innerHTML = "";

  randomNumbers.forEach((number, index) => {
    const blockElementContainer = document.createElement("div");
    const blockElement = document.createElement("div");
    const textNode = document.createTextNode(number);
    const blockHeight = getBlockElementHeight(number, maxNumber);
    const shiftBlockContainer = `translateX(${index * 30}px)`;

    const containerHeight = containerEl.offsetHeight;

    blockElement.className = "block";
    blockElement.style.height = blockHeight + "px";
    blockElementContainer.className = "block-element-container";

    blockElementContainer.style.height = containerHeight + "px";
    blockElementContainer.style.transform = shiftBlockContainer;
    blockElementContainer.setAttribute("data-number", number);
    blockElementContainer.appendChild(blockElement);
    blockElementContainer.appendChild(textNode);

    containerEl.appendChild(blockElementContainer);
  });
}
function setdosort(result) {
  flag = true;
}
function clearfix() {
  let highlightresult = document.querySelectorAll(".highlight-result");
  let blue = document.querySelectorAll(".blue");
  if (highlightresult.length) {
    console.log(highlightresult[0]);
    for (let i = 0; i < highlightresult.length; i++) {
      highlightresult[i].classList.remove("highlight-result");
    }
  }
  if (blue.length) {
    for (let i = 0; i < blue.length; i++) {
      blue[i].classList.remove("blue");
    }
  }
}

function bubbleSort() {
  const result = new Promise(async (resolve, reject) => {
    let blockElements = document.getElementsByClassName(
      "block-element-container"
    );

    // if (!blockElements || !blockElements.length) {
    //   reject("NOT_ENOUGH_ELEMENT");
    //   return;
    // }

    const noOfBlocks = blockElements.length;

    for (let i = 0; i < noOfBlocks; i++) {
      for (let j = 0; j < noOfBlocks - i - 1; j++) {
        const currentBlockContainer = blockElements[j];
        const nextBlockContainer = blockElements[j + 1];

        currentBlockContainer.classList.add("highlight");
        nextBlockContainer.classList.add("highlight");

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 400)
        );

        const value1 = Number(
          currentBlockContainer.getAttribute("data-number")
        );
        const value2 = Number(nextBlockContainer.getAttribute("data-number"));

        if (value1 > value2) {
          await swap(currentBlockContainer, nextBlockContainer);
          blockElements = document.getElementsByClassName(
            "block-element-container"
          );
        }

        currentBlockContainer.classList.remove("highlight");
        nextBlockContainer.classList.remove("highlight");
      }

      blockElements[noOfBlocks - i - 1].childNodes[0].classList.add("blue");
    }

    resolve();
  });
  return result;
}
function swap(el1, el2) {
  return new Promise((resolve) => {
    const container = document.querySelector(".visualize-input");
    const transform1 = el1.style.transform;
    const transform2 = el2.style.transform;

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 500);
    });
  });
}
function shouldprocessbubbleSort() {
  // block.classList.add("highlight-result");

  // for (i = 0; i < blocks.length; i++) {
  //   blocks[i].style.backgroundColor = "#f14e4e";
  // }

  if (!flag) {
    return;
  }
  clearfix();
  flag = false;
  generate.classList.add("disabled");
  const result = bubbleSort();
  result.then(() => ((flag = true), generate.classList.remove("disabled")));
}
function shouldprocessselectionSort() {
  if (!flag) {
    return;
  }
  clearfix();
  flag = false;
  generate.classList.add("disabled");
  selectionSort().then(
    () => ((flag = true), generate.classList.remove("disabled"))
  );
}
function shouldprocesslinearsearch() {
  if (!flag) {
    return;
  }
  clearfix();
  flag = false;
  generate.classList.add("disabled");
  if (searchvalue.value) {
    const linearresult = linearSearch(searchvalue.value);
    linearresult.then(
      () => ((flag = true), generate.classList.remove("disabled"))
    );
  } else {
    alert("enter the search value ");
    flag = true;
  }
}
async function shouldprocessbinarysearch() {
  if (!flag) {
    return;
  }
  clearfix();
  binary = true;
  generate.classList.add("disabled");
  const sortresult = generateArray();
  sortresult.then(
    () => ((binary = false), generate.classList.remove("disabled"))
  );
  // binary = false;
  if (searchvalue.value) {
    const binaryresult = sortresult.then(() => binarySearch(searchvalue.value));
    binaryresult.then(() => (flag = true));
    // flag = true;
  } else {
    alert("enter the search value ");
    flag = true;
  }
}
