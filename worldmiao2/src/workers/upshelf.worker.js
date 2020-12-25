import {BookShelfBox} from "../entities/app.entity";

export const getEmptyBookShelfBxoes = async () => {
    // heavy computing goes here
    console.log('Using workers to produce boxes')
    let bookShelfBoxes = [];
    for (let i = 0; i < 20; i++) {
        bookShelfBoxes.push(
            // give each shelf box an empty book and a book cover toggle.
            new BookShelfBox()
        )
    }
    return bookShelfBoxes
}
