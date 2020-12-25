import fs from 'fs';
import BookEntity from '@components/scraper/entities/bookEntity.entity';
import { getManager } from 'typeorm';
import { BookAccessType, BookProvider } from '@components/scraper/entities/book.model';
import UniqueIdEntity from '@components/scraper/entities/bookUniqueId.entity';

export const ImportYaleCatalogue = () => {
  fs.readFile('C:\\Users\\Bo\\PycharmProjects\\mark_record_reader\\data.json', 'utf8', async (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    }

    // const result = JSON.parse(jsonString).filter((item: Book) => !(item.access?.length > 0));
    const result: Partial<BookEntity>[] = JSON.parse(jsonString);

    const entityManager = getManager();
    const batches = [400000];
    for await (const batch of batches) {
      let counter = 0;
      let emptycounter = 0;

      const allEntitiesToAdd = [];
      for (let i = 0; i < result.length; i++) {
        const bookEntity = result[i];
        counter += 1;
        // console.log(bookEntity)
        if (!(counter >= batch - 100000 && counter < batch)) {
          continue;
        }

        if (bookEntity.access?.find((access) => !access.link)) {
          emptycounter += 1;
          continue;
        }
        const entity = new BookEntity({ provider: BookProvider.WORLD_CAT, ...bookEntity });

        entity.access = entity.access.map((access) => {
          access.type = BookAccessType.DATABASE;
          if (!access.name) {
            access.name = '';
          }
          return access;
        });

        entity.uniqueIdentifier = Object.assign(new UniqueIdEntity(), entity.uniqueIdentifier);

        allEntitiesToAdd.push(entity);
      }
      console.log('valid records', counter);
      console.log('empty records', emptycounter);

      // console.log(allEntitiesToAdd.slice(0, 20))
      const res = await entityManager.save([...allEntitiesToAdd], { chunk: 1000 });
      console.log(res);
    }

    //
    // // const result: Book[] = JSON.parse(jsonString).filter((item: Book) => item.author === null);
    // console.log('Record total', result.length)
    //
    // const set = new Set();
    // result.forEach((book: Book) => {
    //   // @ts-ignore
    //   if (!set.has(book.filename)) {
    //     // @ts-ignore
    //     set.add(book.filename)
    //   }

    // })

    // set.forEach(i => console.log('File data:', i))
  });
};
