import { isValidISBN } from "@/util/ISBN";
import { describe, test, expect } from "@jest/globals";

const validISBNs: string[] = [
    "978-1720043997",
    "172004399X",
    "979-8851457845",
    "198508659X",
    "978-1985086593",
    "0743273567",
    "978-0743273565",
    "0061120081",
    "978-0061120084",
    "0451524934",
    "978-0451524935",
    "1503290565",
    "978-1503290563",
    "0316769487",
    "978-0316769488",
    "978-0439708180",
    "978-0062315007",
    "978-0735219090",
    "978-0-7432-7356-5",
    "0-06-112008-1",
    "979-8851457845",
];

const invalidISBNs: string[] = [
    "978-172004399",
    "12345",
    "978-1720043997123",
    "12345678901234",
    "172004399Y",
    "198508659Y",
    "abc-1720043997",
    "978-abc-043997",
    "123-1720043997",
    "977-1720043997",
    "",
    "   ",
    "John Doe",
    "978-172004399@",
    "978-1720043997!",
    "978-1-2-3",
    "978-12345678901234-5",
    "johndoe@gmail.com",
];

describe("util/ISBN.ts", () => {
    test("isValidISBN() should return true for valid ISBNs", () => {
        for (const isbn of validISBNs) {
            expect(isValidISBN(isbn)).toBe(true);
        }
    });
    test("isValidISBN() should return false for invalid ISBNs", () => {
        for (const isbn of invalidISBNs) {
            expect(isValidISBN(isbn)).toBe(false);
        }
    });
});
