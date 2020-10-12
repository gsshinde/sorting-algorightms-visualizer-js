const DATA_CONTAINER = document.querySelector('.data-container');
const btnReset = document.querySelector('.reset');
const btnSort = document.querySelectorAll('.btnsort');
let algoName = document.querySelector('#algo_name');
algoName.innerHTML = 'Sorting Algorithms -';
let delay = 100;
const barCount = 50;

let blocks = [];
var slider = document.getElementById("myRange");
slider.oninput = function() {
    delay = this.value;
}

function createGrid() {
    for (let i = 0; i < barCount; i++) {
        const value = Math.floor(Math.random() * 100) + 1;

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 4}px`;

        const blockLabel = document.createElement("label");
        blockLabel.classList.add("block__id");
        blockLabel.innerHTML = value;

        bar.appendChild(blockLabel);
        DATA_CONTAINER.appendChild(bar);
    }
}

function resetGrid() {
    DATA_CONTAINER.innerHTML = '';
    algoName.innerHTML = 'Sorting Algorithms -';
    createGrid();
}

function swap(el1, el2) {
    return new Promise(resolve => {
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                DATA_CONTAINER.insertBefore(el2, el1);
                resolve();
            }, delay);
        });
    });
}

async function bubbleSort() {
    btnReset.disabled = true;
    btnSort.forEach(btn => {
        btn.disabled = true;
    });
    algoName.innerHTML = 'Running --> Bubble Sort';
    let blocks = document.querySelectorAll('.bar');
    for (let i = 0; i < blocks.length - 1; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            let value1 = Number(blocks[j].childNodes[0].innerHTML);
            let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll('.bar');
            }
            blocks[j].style.backgroundColor = "#353434";
            blocks[j + 1].style.backgroundColor = "#353434";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
    blocks[0].style.backgroundColor = "#13CE66";
    btnReset.disabled = false;
    btnSort.forEach(btn => {
        btn.disabled = false;
    });
    algoName.innerHTML = 'Completed --> Bubble Sort';
}

async function selectionSort() {
    btnReset.disabled = true;
    btnSort.forEach(btn => {
        btn.disabled = true;
    });
    algoName.innerHTML = 'Running --> Selection Sort';
    let blocks = document.querySelectorAll('.bar');
    let i, j, min_index;

    for (i = 0; i < blocks.length - 1; i++) {
        min_index = i;
        for (j = i + 1; j < blocks.length; j++) {
            let value1 = Number(blocks[j].childNodes[0].innerHTML);
            let value2 = Number(blocks[min_index].childNodes[0].innerHTML);
            if (value1 < value2)
                min_index = j;
        }

        blocks[min_index].style.backgroundColor = "#FF4949";
        blocks[i].style.backgroundColor = "#FF4949";

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        await swap(blocks[i], blocks[min_index]);
        blocks = document.querySelectorAll('.bar');
        blocks[i].style.backgroundColor = "#13CE66";
    }
    blocks[barCount - 1].style.backgroundColor = "#13CE66";
    btnReset.disabled = false;
    btnSort.forEach(btn => {
        btn.disabled = false;
    });
    algoName.innerHTML = 'Completed --> Selection Sort';
}

async function insertionSort() {
    btnReset.disabled = true;
    btnSort.forEach(btn => {
        btn.disabled = true;
    });
    algoName.innerHTML = 'Running --> Insertion Sort';
    let blocks = document.querySelectorAll('.bar');

    for (let i = 1; i < blocks.length; i++) {
        let key = Number(blocks[i].childNodes[0].innerHTML);
        let j = i - 1;
        while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > key) {
            let t = Number(blocks[j].childNodes[0].innerHTML);
            blocks[j + 1].childNodes[0].innerHTML = t;
            blocks[j + 1].style.height = `${t * 4}px`;
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            blocks[j + 1].style.backgroundColor = "#13CE66";
            j = j - 1;
        }
        blocks[j + 1].childNodes[0].innerHTML = key;
        blocks[j + 1].style.height = `${key * 4}px`;
        blocks[j + 1].style.backgroundColor = "#13CE66";
    }
    blocks[0].style.backgroundColor = "#13CE66";
    btnReset.disabled = false;
    btnSort.forEach(btn => {
        btn.disabled = false;
    });
    algoName.innerHTML = 'Completed --> Insertion Sort';
}

async function mergeSort() {
    btnReset.disabled = true;
    btnSort.forEach(btn => {
        btn.disabled = true;
    });
    algoName.innerHTML = 'Running --> Merge Sort';

    let blocks1 = document.querySelectorAll('.bar');
    blocks = blocks1;
    await mergePartition(0, blocks.length - 1);

    btnReset.disabled = false;
    btnSort.forEach(btn => {
        btn.disabled = false;
    });
    algoName.innerHTML = 'Completed --> Merge Sort';
}

async function mergePartition(start, end) {
    if (start < end) {
        var mid = Math.floor((start + end) / 2);
        blocks[mid].style.backgroundColor = "#FF4949";
        await mergePartition(start, mid);
        await mergePartition(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    var p = start,
        q = mid + 1;
    var Arr = [],
        k = 0;
    for (var i = start; i <= end; i++) {
        if (p > mid) {
            Arr[k++] = Number(blocks[q++].childNodes[0].innerHTML);
            blocks[q - 1].style.backgroundColor = "yellow";
        } else if (q > end) {
            Arr[k++] = Number(blocks[p++].childNodes[0].innerHTML);
            blocks[p - 1].style.backgroundColor = "yellow";
        } else if (Number(blocks[p].childNodes[0].innerHTML) < Number(blocks[q].childNodes[0].innerHTML)) {
            Arr[k++] = Number(blocks[p++].childNodes[0].innerHTML);
            blocks[p - 1].style.backgroundColor = "yellow";
        } else {
            Arr[k++] = Number(blocks[q++].childNodes[0].innerHTML);
            blocks[q - 1].style.backgroundColor = "yellow";
        }
    }
    for (var t = 0; t < k; t++) {
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        blocks[start].style.height = `${Arr[t] * 4}px`;
        blocks[start++].childNodes[0].innerHTML = Arr[t];
        blocks[start - 1].style.backgroundColor = "#13CE66";
    }
}

async function quickSort() {

    btnReset.disabled = true;
    btnSort.forEach(btn => {
        btn.disabled = true;
    });
    algoName.innerHTML = 'Running --> Quick Sort';

    let blocks1 = document.querySelectorAll('.bar');
    blocks = blocks1;
    await mainQuickSort(0, blocks.length - 1);

    btnReset.disabled = false;
    btnSort.forEach(btn => {
        btn.disabled = false;
    });
    algoName.innerHTML = 'Completed --> Quick Sort';
}

async function mainQuickSort(start, end) {
    if (start < end) {
        let pIndex = await quickPartition(start, end);
        await mainQuickSort(start, pIndex - 1);
        await mainQuickSort(pIndex + 1, end);
    }
}

async function quickPartition(start, end) {
    let pivot = Number(blocks[end].childNodes[0].innerHTML);
    blocks[end].style.backgroundColor = "#FF4949";
    let partitionIndex = start;

    for (let i = start; i < end; i++) {
        let t = Number(blocks[i].childNodes[0].innerHTML);
        if (t <= pivot) {
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            let z = Number(blocks[partitionIndex].childNodes[0].innerHTML);
            blocks[partitionIndex].childNodes[0].innerHTML = t;
            blocks[partitionIndex].style.height = `${t * 4}px`;
            blocks[partitionIndex].style.backgroundColor = '#13CE66';

            blocks[i].childNodes[0].innerHTML = z;
            blocks[i].style.height = `${z * 4}px`;
            blocks[i].style.backgroundColor = '#13CE66';
            partitionIndex++;
        }
    }
    await new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, delay)
    );
    let temp;
    temp = Number(blocks[partitionIndex].childNodes[0].innerHTML);
    blocks[partitionIndex].childNodes[0].innerHTML = Number(blocks[end].childNodes[0].innerHTML);
    let h = Number(blocks[end].childNodes[0].innerHTML);
    blocks[partitionIndex].style.height = `${h * 4}px`;
    blocks[partitionIndex].style.backgroundColor = '#13CE66';

    blocks[end].childNodes[0].innerHTML = temp;
    blocks[end].style.height = `${temp * 4}px`;
    blocks[end].style.backgroundColor = '#13CE66';
    return partitionIndex;
}

async function heapSort() {
    blocks = document.querySelectorAll('.bar');

    for (let i = Math.floor(blocks.length / 2) - 1; i >= 0; i--) {
        await MaxHeapify(blocks.length, i);
    }

    for (let j = blocks.length - 1; j > 0; j--) {
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        let sw = Number(blocks[j].childNodes[0].innerHTML);
        blocks[j].childNodes[0].innerHTML = Number(blocks[0].childNodes[0].innerHTML);
        blocks[j].style.height = `${ Number(blocks[0].childNodes[0].innerHTML) * 4 }px`;
        blocks[j].style.backgroundColor = '#13CE66';

        blocks[0].childNodes[0].innerHTML = sw;
        blocks[0].style.height = `${ sw * 4 }px`;
        await MaxHeapify(j, 0);
    }
}

async function MaxHeapify(n, i) {
    let largest = i;
    let left = (i * 2) + 1;
    let right = (i * 2) + 2;

    if (left < n && Number(blocks[left].childNodes[0].innerHTML) > Number(blocks[largest].childNodes[0].innerHTML)) {
        largest = left;
        blocks[largest].style.backgroundColor = '#FF4949';
    }
    if (right < n && Number(blocks[right].childNodes[0].innerHTML) > Number(blocks[largest].childNodes[0].innerHTML)) {
        largest = right;
        blocks[largest].style.backgroundColor = '#FF4949';
    }

    if (largest != i) {
        let temp = Number(blocks[largest].childNodes[0].innerHTML);
        blocks[largest].childNodes[0].innerHTML = Number(blocks[i].childNodes[0].innerHTML);
        blocks[largest].style.height = `${ Number(blocks[i].childNodes[0].innerHTML) * 4 }px`;
        //blocks[largest].style.backgroundColor = 'orange';

        blocks[i].childNodes[0].innerHTML = temp;
        blocks[i].style.height = `${ temp * 4 }px`;
        //blocks[i].style.backgroundColor = 'yellow';

        await MaxHeapify(n, largest);
    }
}

createGrid();