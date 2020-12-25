import fs from 'fs';
import { getManager } from 'typeorm';
import BookEntity from '@components/scraper/entities/bookEntity.entity';
import { BookProvider } from '@components/scraper/entities/book.model';
import { v4 } from 'uuid';

export const ProcessProletariate = () => {
  const counter = 0;
  //
  // fs.readFile('C:/Users/Bo/output.html', 'utf8', (error, html) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     const allResults: Book[] = [];
  //     const doc = parse(html);
  //     const result = Array.from(doc.querySelectorAll('tr')).filter((item) => item.querySelector('td a')?.getAttribute('href'));
  //     result.forEach((element) => {
  //       // @ts-ignore
  //       const link = element.querySelector('td a').getAttribute('href');
  //       // @ts-ignore
  //       const data = Array.from(element.querySelectorAll('td'));
  //       let author;
  //       let size;
  //       let title;
  //       let publisher;
  //       let publicationYear;
  //       let description;
  //       let format;
  //       let isbn;
  //       data.forEach((tdELement) => {
  //         const td = tdELement.getAttribute('id');
  //         const text = tdELement.innerText;
  //         switch (td) {
  //         case 'author':
  //           author = text;
  //           break;
  //         case 'size':
  //           size = text;
  //           break;
  //         case undefined:
  //           title = text;
  //           break;
  //         case 'publisher':
  //           publisher = text;
  //           break;
  //         case 'pubyear':
  //           publicationYear = text;
  //           break;
  //         case 'tags':
  //           description = text;
  //           break;
  //         case 'format':
  //           format = text;
  //           break;
  //         case 'isbn':
  //           isbn = text;
  //           break;
  //         }
  //       });
  //       console.log(link);
  //       // @ts-ignore
  //       const uniqueId = link.match(/%2F(.*)\.[a-zA-Z0-9%]{0,10}&/)[1] ?? '';
  //
  //       const newBook = new Book(BookProvider.PROLETARIAT, {
  //         id: uniqueId,
  //         idNote: 'proletariat file id',
  //       });
  //
  //       // @ts-ignore
  //       newBook.isbns.push(isbn);
  //       Object.assign(newBook, {
  //         author,
  //         title,
  //         format,
  //         description,
  //         publicationYear,
  //         publisher,
  //         size,
  //       } as Partial<Book>);
  //
  //       const baseUrl = 'https://library.proletarian.me/';
  //       const access = new BookAccess(baseUrl + link, BookAccessType.DOWNLOAD);
  //
  //       newBook.access.push(access);
  //
  //       counter++;
  //
  //       console.log(newBook);
  //       allResults.push(newBook);
  //       console.log(counter);
  //     });
  //     fs.writeFileSync('books.json', JSON.stringify(allResults), 'utf-8');
  //   }
  // });
  // // south east asia
  //
  // fs.readFile('C:/Users/Bo/sea_output.html', 'utf8', (error, html) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     const allResults: Book[] = [];
  //     const doc = parse(html);
  //     const result = Array.from(doc.querySelectorAll('tr')).filter((item) => item.querySelector('td a')?.getAttribute('href'));
  //     result.forEach((element) => {
  //       // @ts-ignore
  //       const link = element.querySelector('td a').getAttribute('href');
  //       // @ts-ignore
  //       const data = Array.from(element.querySelectorAll('td'));
  //       let author;
  //       let size;
  //       let title;
  //       let publisher;
  //       let publicationYear;
  //       let description;
  //       let format;
  //       let isbn;
  //       data.forEach((tdELement, index) => {
  //         // const td = tdELement.getAttribute('id');
  //         const text = tdELement.innerText;
  //         switch (index) {
  //         case 1:
  //           author = text;
  //           break;
  //         case 2:
  //           size = text;
  //           break;
  //         case 0:
  //           title = text;
  //           break;
  //         }
  //       });
  //       console.log(link);
  //       // @ts-ignore
  //       const uniqueId = link.match(/%2F(.*)\.[a-zA-Z0-9%]{0,10}&/)[1] ?? '';
  //
  //       const newBook = new Book(BookProvider.PROLETARIAT, {
  //         id: uniqueId,
  //         idNote: 'proletariat file id',
  //       });
  //       Object.assign(newBook, {
  //         author,
  //         title,
  //         format,
  //         description,
  //         publicationYear,
  //         publisher,
  //         size,
  //       } as Partial<Book>);
  //
  //       const baseUrl = 'https://library.proletarian.me/';
  //       const access = new BookAccess(baseUrl + link, BookAccessType.DOWNLOAD);
  //
  //       newBook.access.push(access);
  //
  //       // newBook.isbns.push(isbn)
  //       counter++;
  //
  //       console.log(newBook);
  //       allResults.push(newBook);
  //       console.log(counter);
  //     });
  //     fs.writeFileSync('sea.json',  JSON.stringify(allResults), 'utf-8');
  //   }
  // });
  //
  // fs.readFile('C:/Users/Bo/articles_output.html', 'utf8', (error, html) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     const allResults: Book[] = []
  //     const doc = parse(html);
  //     const result = Array.from(doc.querySelectorAll('tr')).filter((item) => item.querySelector('td a')?.getAttribute('href'));
  //     result.forEach((element) => {
  //       // @ts-ignore
  //       const link = element.querySelector('td a').getAttribute('href');
  //       // @ts-ignore
  //       const data = Array.from(element.querySelectorAll('td'));
  //       let author;
  //       let size;
  //       let title;
  //       let publisher;
  //       let publicationYear;
  //       let description;
  //       let format;
  //       let isbn;
  //       data.forEach((tdELement, index) => {
  //         // const td = tdELement.getAttribute('id');
  //         const text = tdELement.innerText;
  //         switch (index) {
  //         case 1:
  //           author = text;
  //           break;
  //         case 2:
  //           size = text;
  //           break;
  //         case 0:
  //           title = text;
  //           break;
  //         }
  //       });
  //       console.log(link);
  //       // @ts-ignore
  //       const uniqueId = link.match(/%2F(.*)\.[a-zA-Z0-9%]{0,10}&/)[1] ?? '';
  //
  //       const newBook = new Book(BookProvider.PROLETARIAT, {
  //         id: uniqueId,
  //         idNote: 'proletariat file id',
  //       });
  //       Object.assign(newBook, {
  //         author,
  //         title,
  //         format,
  //         description,
  //         publicationYear,
  //         publisher,
  //         size,
  //       } as Partial<Book>);
  //
  //       const baseUrl = 'https://library.proletarian.me/';
  //       const access = new BookAccess(baseUrl + link, BookAccessType.DOWNLOAD);
  //
  //       newBook.access.push(access);
  //
  //       // newBook.isbns.push(isbn)
  //       counter++;
  //
  //       console.log(newBook);
  //       allResults.push(newBook);
  //
  //
  //       console.log(counter);
  //     });
  //     fs.writeFileSync('articles.json',  JSON.stringify(allResults), 'utf-8');
  //   }
  // });
  // console.log('Total Records', allResults.length);

  fs.readFile('C:\\Script\\worldmiao2_complete\\scraping-center\\books.json', 'utf8', async (error, json) => {
    const allResults = JSON.parse(json);
    const entityManager = getManager();

    // @ts-ignore
    const entities = allResults.map((book) => {
      const entity = new BookEntity({ provider: BookProvider.PROLETARIAT, ...book });
      entity.access = entity.access.map((access) => { access.id = v4(); return access; });

      entity.id = v4();

      return entity;
    });
    console.log(entities[0]);
    const res = await entityManager.save([...entities], { chunk: 1000 });
    console.log(res);
  });
};
