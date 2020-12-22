import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {
  Book,
  BookAccess, BookAccessType, BookProvider, UniqueId,
} from '@components/scraper/entities/book.model';
import BookEntity from '@components/scraper/entities/bookEntity.entity';

@Entity('uniqueIds')
export default class UniqueIdEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    id: string = '';

    @Column()
    idNote: string = ''

    constructor() {
      // this.link = link;
    }

}
