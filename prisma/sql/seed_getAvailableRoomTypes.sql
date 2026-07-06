-- @param {DateTime} $1:checkInDate
-- @param {DateTime} $2:checkOutDate
-- @param {Int}      $3:numAdults
-- @param {Int}      $4:numChildren
-- @param {Int}      $5:numRooms
-- @param {Int}      $6:pageSize
-- @param {String}   $7:lastHotelId? (pass NULL for first page)

SELECT
  rt.id,
  rt.name,
  rt.price
FROM room_types rt
JOIN room_type_inventories rti
  ON rti.room_type_id = rt.id
 AND rti.date >= $1::date
 AND rti.date < $2::date
WHERE ($7::uuid IS NULL OR rt.id > $7::uuid)
  AND rt.adult_capacity * $5 >= $3
  AND (rt.adult_capacity + rt.children_capacity) * $5 >= $3 + $4
GROUP BY rt.id, rt.name, rt.price
HAVING
  COUNT(DISTINCT rti.date) = ($2::date - $1::date)
  AND MIN(COALESCE(rti.total_rooms, 0) - COALESCE(rti.booked_rooms, 0)) >= $5
ORDER BY rt.id ASC
LIMIT $6