// Mock chalk for Jest tests
const mockChalk = {
    green: (text) => text,
    red: (text) => text,
    blue: (text) => text,
    yellow: (text) => text,
};

module.exports = mockChalk;
module.exports.default = mockChalk;
