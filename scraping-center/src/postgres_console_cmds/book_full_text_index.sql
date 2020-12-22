

-- CREATE INDEX books_fulltext_search ON books USING GIN (to_tsvector('book', title || ' ' || description || ' ' || author || ' ' || "publicationYear" ));
-- ALTER TABLE books ADD COLUMN tsv_search_text tsvector;
-- CREATE INDEX tsv_search_text_idx ON books USING gin(tsv_search_text);

-- this creates new indexes for all records, using four fields and save them in the tsvector column 'tsv_search_text' on table 'books'. the field is managed by typeorm.
UPDATE books SET tsv_search_text =
    setweight(to_tsvector(title), 'A')
    || setweight(to_tsvector(description), 'B')
    || setweight(to_tsvector(author), 'C')
    || setweight(to_tsvector("publicationYear"), 'C');


-- update search text field each time an new entry is added.
-- CREATE FUNCTION comment_text_search_trigger() RETURNS trigger AS $$
-- begin
--     new.tsv_comment_text :=
--                 setweight(to_tsvector(coalesce(new.story_title,'')), 'A') ||
--                 setweight(to_tsvector(coalesce(new.comment_text,'')), 'B');
--     return new;
-- end
-- $$ LANGUAGE plpgsql;
--
-- /* Trigger on update */
-- CREATE TRIGGER tsvector_comment_text_update BEFORE INSERT OR UPDATE
--     ON comments FOR EACH ROW EXECUTE PROCEDURE comment_text_search_trigger();
