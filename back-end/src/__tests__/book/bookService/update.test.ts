/**
 * MIT License
 *
 * Copyright (c) 2025 Qiu Yixiang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import BookService from "@/services/book/bookService";
import { describe, it, expect, beforeEach } from "@jest/globals";
import BookModel from "@/models/book/bookModel";

const originalBookData = {
    title: "Original Title",
    author: "Original Author",
    pages: 200,
    tags: ["original", "programming"],
    ISBN10: "1234567890",
    image: "https://example.com/original.jpg",
    link: "https://example.com/original",
};

const updateData = {
    title: "Updated Title",
    author: "Updated Author",
    pages: 300,
    tags: ["updated", "programming", "advanced"],
    ISBN10: "0987654321",
    image: "https://example.com/updated.jpg",
    link: "https://example.com/updated",
};

const partialUpdateData = {
    title: "Partially Updated Title",
    pages: 250,
};

describe("Book Service: Update Methods", () => {
    let createdBook: any;

    beforeEach(async () => {
        await BookModel.deleteMany({});
        createdBook = await BookModel.create(originalBookData);
    });

    describe("updateBook()", () => {
        it("should update a book with complete data", async () => {
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                updateData
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.title).toBe("Updated Title");
            expect(updatedBook!.author).toBe("Updated Author");
            expect(updatedBook!.pages).toBe(300);
            expect(updatedBook!.tags).toEqual([
                "updated",
                "programming",
                "advanced",
            ]);
            expect(updatedBook!.ISBN10).toBe("0987654321");
            expect(updatedBook!.image).toBe("https://example.com/updated.jpg");
            expect(updatedBook!.link).toBe("https://example.com/updated");
        });

        it("should update a book with partial data", async () => {
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                partialUpdateData
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.title).toBe("Partially Updated Title");
            expect(updatedBook!.author).toBe("Original Author"); // unchanged
            expect(updatedBook!.pages).toBe(250);
            expect(updatedBook!.tags).toEqual(["original", "programming"]); // unchanged
            expect(updatedBook!.ISBN10).toBe("1234567890"); // unchanged
        });

        it("should return null when book ID does not exist", async () => {
            const invalidId = "507f1f77bcf86cd799439011";
            const updatedBook = await BookService.updateBook(
                invalidId,
                updateData
            );

            expect(updatedBook).toBeNull();
        });

        it("should preserve _id and createdAt when updating", async () => {
            const originalId = createdBook._id.toString();
            const originalCreatedAt = createdBook.createdAt;

            const updatedBook = await BookService.updateBook(
                originalId,
                updateData
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!._id.toString()).toBe(originalId);
            expect(updatedBook!.createdAt.getTime()).toBe(
                originalCreatedAt.getTime()
            );
        });

        it("should update only the title field", async () => {
            const titleOnlyUpdate = { title: "Only Title Updated" };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                titleOnlyUpdate
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.title).toBe("Only Title Updated");
            expect(updatedBook!.author).toBe("Original Author");
            expect(updatedBook!.pages).toBe(200);
            expect(updatedBook!.tags).toEqual(["original", "programming"]);
        });

        it("should update only the author field", async () => {
            const authorOnlyUpdate = { author: "New Author Only" };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                authorOnlyUpdate
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.title).toBe("Original Title");
            expect(updatedBook!.author).toBe("New Author Only");
            expect(updatedBook!.pages).toBe(200);
        });

        it("should update tags array completely", async () => {
            const newTags = ["completely", "new", "tags"];
            const tagsUpdate = { tags: newTags };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                tagsUpdate
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.tags).toEqual(newTags);
            expect(updatedBook!.title).toBe("Original Title"); // unchanged
        });

        it("should handle empty tags array update", async () => {
            const emptyTagsUpdate = { tags: [] };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                emptyTagsUpdate
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.tags).toEqual([]);
        });

        it("should update pages to zero", async () => {
            const zeroPagesUpdate = { pages: 0 };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                zeroPagesUpdate
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.pages).toBe(0);
        });

        it("should verify updated book is saved in database", async () => {
            await BookService.updateBook(
                createdBook._id.toString(),
                updateData
            );

            const bookFromDb = await BookModel.findById(createdBook._id);
            expect(bookFromDb).not.toBeNull();
            expect(bookFromDb!.title).toBe("Updated Title");
            expect(bookFromDb!.author).toBe("Updated Author");
            expect(bookFromDb!.pages).toBe(300);
        });

        it("should update with minimal data", async () => {
            const minimalUpdate = { title: "Minimal Update" };
            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                minimalUpdate
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.title).toBe("Minimal Update");
        });

        it("should handle updating all optional fields to undefined/empty", async () => {
            const clearFieldsUpdate = {
                title: "Title Only",
                author: undefined,
                pages: undefined,
                tags: undefined,
                ISBN10: undefined,
                image: undefined,
                link: undefined,
            };

            const updatedBook = await BookService.updateBook(
                createdBook._id.toString(),
                clearFieldsUpdate
            );

            expect(updatedBook).not.toBeNull();
            expect(updatedBook!.title).toBe("Title Only");
        });
    });
});
