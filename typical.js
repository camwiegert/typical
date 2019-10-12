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
                await arg(node);
                break;
            default:
                await arg;
        }
    }
}

async function edit(node, text) {
    const overlap = getOverlap(node.textContent, text);
    await perform(node, [...deleter(node.textContent, overlap), ...writer(text, overlap)]);
}

async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function perform(node, edits, speed = 80) {
    for (const op of editor(edits)) {
        op(node);
        await wait(speed + (speed / 2) * (Math.random() - 0.5));
    }
}

export function* editor(edits) {
    for (const edit of edits) {
        yield (node) => requestAnimationFrame(() => node.textContent = edit);
    }
}

export function* writer(text, startIndex = 0, endIndex = text.length) {
    while (startIndex < endIndex) {
        yield text.slice(0, ++startIndex);
    }
}

export function* deleter(text, startIndex = 0, endIndex = text.length) {
    while (endIndex > startIndex) {
        yield text.slice(0, --endIndex);
    }
}

export function getOverlap(start, end) {
    return start.startsWith(end) ? end.length : [...end].findIndex((char, i) => start[i] !== char);
}
