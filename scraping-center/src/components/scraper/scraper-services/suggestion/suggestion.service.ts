import { Injectable } from '@nestjs/common';
import SuggestionEntity from '@components/scraper/entities/suggestion.entity';
import { getManager } from 'typeorm';

@Injectable()
export class SuggestionService {

  async getAllSuggestions(): Promise<SuggestionEntity[]> {
    const manager = getManager();
    const result = await manager.find(SuggestionEntity);
    return result;
  }

  async addOneSuggestion(content: string) {
    const newSuggestion = new SuggestionEntity(suggestion);
    const result = getManager().save(newSuggestion);
    return result;
  }
}
