import test from 'tape';

import {
    deleter,
    getOverlap,
    operator,
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
    )

    t.end();
});

test('getOverlap', t => {
    t.ok(
        getOverlap('some text', 'some') === 4,
        'Should get correct overlap'
    );

    t.ok(
        getOverlap('some text', 'some other text') === 5,
        'Should handle partial overlap'
    );

    t.ok(
        getOverlap('some text', 'other text') === 0,
        'Should handle no overlap'
    );

    t.end();
});

test('operator', t => {
    t.ok(
        operator(deleter('text'))[Symbol.iterator],
        'Should create an iterable'
    );

    t.ok(
        [...operator(writer('text'))].length === 4,
        'Should have correct length'
    );

    t.equal(
        typeof operator(deleter('text')).next().value,
        'function',
        'Should yield functions'
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

    t.end();
});
