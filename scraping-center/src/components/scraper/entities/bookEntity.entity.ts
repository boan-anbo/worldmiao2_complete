import {
  Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { BookAccess, BookProvider, UniqueId } from '@components/scraper/entities/book.model';
import BookAccessEntity from '@components/scraper/entities/bookAccessEntity.entity';
import UniqueIdEntity from '@components/scraper/entities/bookUniqueId.entity';

@Entity('books')
export default class BookEntity {
    @PrimaryGeneratedColumn('uuid')

    id: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    title: string

    @Column({ nullable: true })
    pages: string = '';

    @Column()
    subtitle: string = '';

    @Column()
    description: string = '';

    @Column({ nullable: true })
    author: string = '';

    @Column()

    publicationYear: string = '';

    @Column('text', { array: true })
    isbns: string [] = [];

    @Column({ nullable: true })
    publisher: string = '';

    @Column()
    format: string = '';

    @Column({
      type: 'enum',
      enum: BookProvider,
      default: BookProvider.WORLD_CAT,
    })
    provider: BookProvider

    @Column()
    thumbnail: string = '';

    constructor(bookEntity: Partial<BookEntity>) {
      Object.assign(this, bookEntity);
    }

    @OneToMany(() => BookAccessEntity, (bookAccess) => bookAccess.book, { cascade: true, eager: true })
    access: BookAccessEntity[];

    @OneToOne(() => UniqueIdEntity, { cascade: true, eager: true })
    @JoinColumn()
    uniqueIdentifier: UniqueIdEntity;


    @Column({
        type: 'tsvector',
        nullable: true,
        select: false // select set to false so it won't be returned as part of the result
    })
    tsv_search_text: string
}
