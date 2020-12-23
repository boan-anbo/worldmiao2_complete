import {
  Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { BookAccess, BookProvider, UniqueId } from '@components/scraper/entities/book.model';
import BookAccessEntity from '@components/scraper/entities/bookAccessEntity.entity';
import UniqueIdEntity from '@components/scraper/entities/bookUniqueId.entity';

@Entity('suggestions')
export default class SuggestionEntity {
    @PrimaryGeneratedColumn('uuid')

    id: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    content: string

    constructor(content: string) {
      this.content = content;
    }
}
