"use strict";

export function exists(testItem) {
    return typeof testItem !== "undefined" && testItem !== null;
}