/**
 * Asynchronously types a given node with a series of arguments.
 * @param {HTMLElement} node - The HTML element to type into.
 * @param {...(string|number|Function|Promise)} args - A list of arguments. A string is typed, a number is a delay in milliseconds, a function is called with the node as first argument, and a promise is awaited
 */
export async function type(node, ...args) {
    for (const arg of args) {
        switch (typeof arg) {
            case 'string':
                await edit(node, arg);
                break;
            case 'number':
                await wait(arg);
                break;
            case 'function':
                await arg(node, ...args);
                break;
            default:
                await arg;
        }
    }
}

/**
 * Asynchronously edits the text content of a node to match the provided text.
 * @param {HTMLElement} node - The HTML element to edit.
 * @param {string} text - The text to set as the new content of the node.
 * @returns {Promise<void>} - A promise that resolves when the editing is done.
 */
async function edit(node, text) {
    const overlap = getOverlap(node.textContent, text);
    await perform(node, [...deleter(node.textContent, overlap), ...writer(text, overlap)]);
}

/**
 * Asynchronously waits for a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} - A promise that resolves when the waiting is done.
 */
async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Performs a sequence of text editing operations on a node with a specified speed.
 * @param {HTMLElement} node - The HTML element to edit.
 * @param {string[]} edits - An array of text edits to perform.
 * @param {number} speed - The typing speed in milliseconds.
 */
async function perform(node, edits, speed = 60) {
    for (const op of editor(edits)) {
        op(node);
        await wait(speed + speed * (Math.random() - 0.5));
    }
}

/**
 * Generates an iterator for text editing operations.
 * @param {string[]} edits - An array of text edits to perform.
 * @returns {Generator<function(HTMLElement), void, void>} - The text editing operations.
 */
export function* editor(edits) {
    for (const edit of edits) {
        yield (node) => requestAnimationFrame(() => node.textContent = edit);
    }
}

/**
 * Generates an iterator for writing text progressively.
 * @param {string[]} text - The text to write progressively.
 * @param {number} startIndex - The starting index for writing.
 * @param {number} endIndex - The ending index for writing.
 * @returns {Generator<string, void, void>} - The text written progressively.
 */
export function* writer([...text], startIndex = 0, endIndex = text.length) {
    while (startIndex < endIndex) {
        yield text.slice(0, ++startIndex).join('');
    }
}

/**
 * Generates an iterator for deleting text progressively.
 * @param {string[]} text - The text to delete progressively.
 * @param {number} startIndex - The starting index for deleting.
 * @param {number} endIndex - The ending index for deleting.
 * @returns {Generator<string, void, void>} - The text deleted progressively.
 */
export function* deleter([...text], startIndex = 0, endIndex = text.length) {
    while (endIndex > startIndex) {
        yield text.slice(0, --endIndex).join('');
    }
}

/**
 * Gets the index of the first character where two strings differ.
 * @param {string} start - The starting string.
 * @param {string[]} end - The ending string as an array of characters.
 * @returns {number} - The index of the first differing character.
 */
export function getOverlap(start, [...end]) {
    return [...start, NaN].findIndex((char, i) => end[i] !== char);
}
