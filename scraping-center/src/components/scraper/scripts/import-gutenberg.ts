import fs from 'fs';
import { GutenbergBook } from '@components/scraper/interfaces/gutenberg-book';
import BookEntity from '@components/scraper/entities/bookEntity.entity';
import BookAccessEntity from '@components/scraper/entities/bookAccessEntity.entity';
import { BookAccessType, BookProvider } from '@components/scraper/entities/book.model';
import UniqueIdEntity from '@components/scraper/entities/bookUniqueId.entity';
import { getManager } from 'typeorm';

export const ImportGutenberg = () => {
  fs.readFile('C:\\Users\\Bo\\PycharmProjects\\gutenberg_import_xml\\data.json', 'utf8', async (error, html) => {
    const result: GutenbergBook[] = JSON.parse(html).books;
    let counter = 0;
    const allResults: BookEntity [] = [];
    // result.books.length
    // console.log(result[2000]);

    for (let i = 0; i < result.length; i++) {
      const g = result[i];
      const { title } = g;
      const id = String(g.id);
      const description = g.description !== null ? `${g.description}; ${g.subjects.join('; ')}` : g.subjects.join('; ');

      const publicationYear = String(g.issued);
      // @ts-ignore
      const author = g.authors.map((a) => `${a.name} (${a.birth ?? ''}-${a.death ?? ''})`).join(', ');
      let thumbnail;
      // @ts-ignore
      const access: BookAccessEntity [] = g.files.map((f) => {
        if (f.url.endsWith('htm')) {
          return new BookAccessEntity({ link: f.url, type: BookAccessType.BROWSE, name: 'Online' });
        }
        if (f.url.endsWith('utf-8')) {
          return new BookAccessEntity({ link: f.url, type: BookAccessType.DOWNLOAD, name: 'Plain Text' });
        }
        if (f.url.endsWith('.txt')) {
          return new BookAccessEntity({
            link: f.url,
            type: BookAccessType.DOWNLOAD,
            name: 'Plain Text (UTF-8)',
          });
        }
        if (f.url.includes('kindle.images')) {
          return new BookAccessEntity({ link: f.url, type: BookAccessType.DOWNLOAD, name: 'Kindle w/ Images' });
        }
        if (f.url.includes('kindle.noimages')) {
          return new BookAccessEntity({
            link: f.url,
            type: BookAccessType.DOWNLOAD,
            name: 'Kindle w/o Images',
          });
        }
        if (f.url.endsWith('cover.small.jpg')) {
          thumbnail = f.url;
        }

        return null;
      }).filter((access) => access !== null);

      const newBookEntity = new BookEntity({
        title, description, publicationYear, author, access, thumbnail, provider: BookProvider.GUTENBERG,
      });
      newBookEntity.uniqueIdentifier = Object.assign(new UniqueIdEntity(), { id, idNote: 'Gutenberg Book Id' });
      // console.log(newBookEntity);
      // console.log(g);
      // newBookEntity.uniqueIdenfier.uuid =
      console.log('saving', newBookEntity.uniqueIdentifier);
      counter++;
      console.log(counter);
      // if (counter > 10000) break;
      allResults.push(newBookEntity);
    }
    const entityManager = getManager();

    const res = await entityManager.save([...allResults], { chunk: 1000 });
    console.log(res);
  });
};
