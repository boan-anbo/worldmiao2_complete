import {
    Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {
    Book,
    BookAccess, BookAccessType, BookProvider, UniqueId,
} from '@components/scraper/entities/book.model';
import BookEntity from "@components/scraper/entities/bookEntity.entity";

@Entity('bookAccesses')
export default class BookAccessEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    link: string;

    @Column()
    name: string = '';

    @Column({
      type: 'enum',
      enum: BookAccessType,
      default: BookAccessType.DATABASE,
    })
    type: BookAccessType

    @ManyToOne(() => BookEntity, (book) => book.access)
    book: BookEntity
}
