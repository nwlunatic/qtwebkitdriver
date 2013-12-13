// Copyright 2013 2gis authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Enum for modifier keys, same as DevTools protocol.
 * @enum {number}
 */
var ModifierMask = {
    ALT: 1 << 0,
    CTRL: 1 << 1,
    META: 1 << 2,
    SHIFT: 1 << 3
};

/**
 * Dispatches a key event at the active element.
 *
 * @param {string} type The type of the event to dispatch
 * @param {number} key_code The code of the key associated with event.
 * @param {string} text The text probably corresponding to the key provided (should pass if type == 'char' anyway).
 * @param {modifiers} modifiers The modifiers to use for the event.
 */
function dispatchKeyEvent(type, key_code, text, modifiers) {
    if (!type) {
        throw new Error('cannot dispatch event with no type');
    }

    if (type == 'char') {
        document.activeElement.value += text;
        return;
    }

    var event = document.createEvent('Events');
    event.initEvent(type, true, true);
    event.charCode = key_code;
    event.keyCode = key_code;
    event.which = key_code;
    event.keyIdentifier = text;
    event.altKey = modifiers & ModifierMask.ALT;
    event.ctrlKey = modifiers & ModifierMask.CTRL;
    event.shiftKey = modifiers & ModifierMask.SHIFT;
    event.metaKey = modifiers & ModifierMask.META;
    event.location = 0;
    event.view = window;

    document.activeElement.dispatchEvent(event);
};