import {
  Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import BookEntity from '@components/scraper/entities/bookEntity.entity';
import { v4 } from 'uuid';

@Entity('uniqueIds')
export default class UniqueIdEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    id: string = '';

    @Column()
    idNote: string = ''

    @OneToOne(() => BookEntity, book => book.uniqueIdentifier)
    book: BookEntity
}
