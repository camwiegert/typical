export async function type(node, text) {
    const overlap = getOverlap(node.textContent, text);
    await edit(node, [...deleter(node.textContent, overlap), ...writer(text, overlap)]);
}

async function edit(node, edits, speed = 100) {
    for (const op of operator(edits)) {
        op(node);
        await wait(speed + (speed / 2) * (Math.random() - 0.5));
    }
}

function* operator(edits) {
    for (const edit of edits) {
        yield (node) => requestAnimationFrame(() => node.textContent = edit);
    }
}

function* writer(text, startIndex = 0, endIndex = text.length) {
    while (startIndex < endIndex) {
        yield text.slice(0, ++startIndex);
    }
}

function* deleter(text, startIndex = 0, endIndex = text.length) {
    while (endIndex > startIndex) {
        yield text.slice(0, --endIndex);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getOverlap(start, end) {
    return start.startsWith(end) ? end.length : [...end].findIndex((char, i) => start[i] !== char);
}
