-- @param {String}    $1:hotelId
-- @param {DateTime}  $2:checkInDate
-- @param {DateTime}  $3:checkOutDate
-- @param {Int}       $4:numAdults
-- @param {Int}       $5:numChildren
-- @param {Int}       $6:numRooms
SELECT
  rt.id,
  rt.name,
  rt.price,
  rt.image_urls        AS "imageUrls",
  rt.area_m2           AS "areaM2",
  rt.adult_capacity    AS "adultCapacity",
  rt.children_capacity AS "childrenCapacity",
  rt.bed_type          AS "bedType",
  COALESCE(fac_list.common_facilities, '[]'::jsonb) AS "common_facilities"
FROM room_types rt

-- compute availability from room_type_inventories for the requested date range
JOIN LATERAL (
  SELECT
    COUNT(DISTINCT rti.date) AS covered_dates,
    MIN(COALESCE(rti.total_rooms, 0) - COALESCE(rti.booked_rooms, 0)) AS min_available_rooms
  FROM room_type_inventories rti
  WHERE rti.room_type_id = rt.id
    AND rti.date >= $2::date
    AND rti.date < $3::date
) inv ON true

-- aggregate common_facilities for this room type as a JSONB array of {id, name, iconUrl}
JOIN LATERAL (
  SELECT COALESCE(jsonb_agg(jsonb_build_object('id', fac.id, 'name', fac.name, 'iconUrl', fac.icon_url) ORDER BY fac.name), '[]'::jsonb) AS common_facilities
  FROM "_CommonFacilityToRoomType" f2r
  JOIN common_facilities fac ON fac.id = f2r."A"
  WHERE f2r."B" = rt.id
) fac_list ON true

WHERE rt.hotel_id = $1
  AND inv.covered_dates = ($3::date - $2::date)
  AND inv.min_available_rooms >= $6
  AND (
    rt.adult_capacity * $6 >= $4 -- can't treat adult as child
    AND (rt.adult_capacity + rt.children_capacity) * $6 >= $4 + $5 -- but can treat child as adult
  )

ORDER BY rt.name ASC;