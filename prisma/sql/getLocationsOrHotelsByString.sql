WITH locations AS (
  SELECT id, name,
    similarity(unaccent(lower(coalesce(name, ''))), unaccent(lower($1))) AS sim
  FROM hotels
  UNION ALL
  SELECT id, name,
    similarity(unaccent(lower(coalesce(name, ''))), unaccent(lower($1))) AS sim
  FROM provinces
  UNION ALL
  SELECT id, name,
    similarity(unaccent(lower(coalesce(name, ''))), unaccent(lower($1))) AS sim
  FROM districts
  UNION ALL
  SELECT id, name,
    similarity(unaccent(lower(coalesce(name, ''))), unaccent(lower($1))) AS sim
  FROM wards
)
SELECT id, name
FROM locations
WHERE sim >= COALESCE($2::double precision, 0.2)  -- pass threshold as second param (0..1)
ORDER BY sim DESC, name
LIMIT 10;