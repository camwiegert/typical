import test from 'tape';

import {
    deleter,
    editor,
    getOverlap,
    writer
} from '../typical.js';

test('deleter', t => {
    t.ok(
        deleter('text')[Symbol.iterator],
        'Should create an iterable'
    );

    t.deepEqual(
        [...deleter('text')],
        ['tex', 'te', 't', ''],
        'Should create correct steps'
    );

    t.deepEqual(
        [...deleter('')],
        [],
        'Should handle empty string'
    );

    t.deepEqual(
        [...deleter('text', 2)],
        ['tex', 'te'],
        'Should handle startIndex'
    );

    t.deepEqual(
        [...deleter('text', 0, 2)],
        ['t', ''],
        'Should handle endIndex'
    );

    t.deepEqual(
        [...deleter('🍕')],
        [''],
        'Should handle emoji'
    );

    t.end();
});

test('editor', t => {
    t.ok(
        editor(deleter('text'))[Symbol.iterator],
        'Should create an iterable'
    );

    t.equal(
        [...editor(writer('text'))].length, 4,
        'Should have correct length'
    );

    t.equal(
        typeof editor(deleter('text')).next().value,
        'function',
        'Should yield functions'
    );

    t.end();
});

test('getOverlap', t => {
    t.equal(
        getOverlap('some text', 'some other text'), 5,
        'Should handle partial overlap'
    );

    t.equal(
        getOverlap('some text', 'other text'), 0,
        'Should handle no overlap'
    );

    t.equal(
        getOverlap('some text', 'some text'), 9,
        'Should handle complete overlap'
    );

    t.equal(
        getOverlap('some text', 'some text and'), 9,
        'Should handle write only'
    );

    t.equal(
        getOverlap('some text', 'some'), 4,
        'Should handle delete only'
    );

    t.equal(
        getOverlap('emoji 🐡', 'emoji 🐡 blowfish'), 7,
        'Should handle emoji'
    );

    t.end();
});

test('writer', t => {
    t.ok(
        writer('text')[Symbol.iterator],
        'Should create an iterable'
    );

    t.deepEqual(
        [...writer('text')],
        ['t', 'te', 'tex', 'text'],
        'Should create correct steps'
    );

    t.deepEqual(
        [...writer('')],
        [],
        'Should handle empty string'
    );

    t.deepEqual(
        [...writer('text', 2)],
        ['tex', 'text'],
        'Should handle startIndex'
    );

    t.deepEqual(
        [...writer('text', 0, 2)],
        ['t', 'te'],
        'Should handle endIndex'
    );

    t.deepEqual(
        [...writer('📚')],
        ['📚'],
        'Should handle emoji'
    );

    t.end();
});
