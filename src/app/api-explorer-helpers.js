"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loc_strings_1 = require("./loc_strings");
function getString(options, label) {
    if (label in loc_strings_1.loc_strings[options.Language])
        return loc_strings_1.loc_strings[options.Language][label];
    return loc_strings_1.loc_strings["en-US"][label];
}
exports.getString = getString;
//# sourceMappingURL=api-explorer-helpers.js.map