WITH locations AS (
  SELECT id, name FROM hotels WHERE to_tsvector_vietnamese(coalesce(name, '')) @@ websearch_to_tsquery('vietnamese', unaccent($1))
  UNION ALL
  SELECT id, name FROM provinces WHERE to_tsvector_vietnamese(coalesce(name, '')) @@ websearch_to_tsquery('vietnamese', unaccent($1))
  UNION ALL
  SELECT id, name FROM districts WHERE to_tsvector_vietnamese(coalesce(name, '')) @@ websearch_to_tsquery('vietnamese', unaccent($1))
  UNION ALL
  SELECT id, name FROM wards WHERE to_tsvector_vietnamese(coalesce(name, '')) @@ websearch_to_tsquery('vietnamese', unaccent($1))
)
SELECT id, name FROM locations ORDER BY name LIMIT 10;