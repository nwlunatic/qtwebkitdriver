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
 * Dispatches a mouse event at the given location.
 *
 * @param {string} type The type of the event to dispatch
 * @param {number} x The X coordinate to dispatch the event at.
 * @param {number} y The Y coordinate to dispatch the event at.
 * @param {modifiers} modifiers The modifiers to use for the event.
 * @param {number} button The number of mouse button to use (0 - left (default), 1 - center, 2 - right)
 */
function dispatchMouseEvent(type, x, y, modifiers, button, clickCount) {
    if (!type) {
        throw new Error('cannot dispatch event with no type');
    }

    var options = {
        type: type,
        canBubble: true,
        cancelable: true,
        view: window,
        detail: 1,
        //The coordinates within the entire page
        screenX: x,
        screenY: y,
        //The coordinates within the viewport
        clientX: x,
        clientY: y,
        ctrlKey: modifiers & ModifierMask.CTRL,
        altKey: modifiers & ModifierMask.ALT,
        shiftKey: modifiers & ModifierMask.SHIFT,
        metaKey: modifiers & ModifierMask.META,
        //0 = left, 1 = middle, 2 = right
        button: button,
        relatedTarget: null
    }

//    var event = new MouseEvent(type);
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent(
        options.type,
        options.canBubble,
        options.cancelable,
        options.view,
        options.detail,
        options.screenX,
        options.screenY,
        options.clientX,
        options.clientY,
        options.ctrlKey,
        options.altKey,
        options.shiftKey,
        options.metaKey,
        options.button,
        options.relatedTarget
    );

    var elem = document.elementFromPoint(x, y);
    if (!elem) {
        throw new Error('cannot click outside the visible bounds of the ' +
                        'document: (' + x + ', ' + y + ')');
    }
    console.log(elem);
    elem.dispatchEvent(event);
};