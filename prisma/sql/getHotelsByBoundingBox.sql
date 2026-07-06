-- @param {DateTime} $1:checkInDate
-- @param {DateTime} $2:checkOutDate
-- @param {Int}      $3:numAdults
-- @param {Int}      $4:numRooms
-- @param {Int}      $5:pageSize

-- @param {Float}    $6:northBound
-- @param {Float}    $7:southBoundv
-- @param {Float}    $8:westBound
-- @param {Float}    $9:eastBound

-- @param {Decimal}  $10:minPrice (filter)
-- @param {Decimal}  $11:maxPrice (filter)
-- @param {Int}      $14:numChildren (NOTE: temporarily put this at the end.)
-- @param {Int}      $15:minRating
-- @param {Int}      $16:maxRating

-- Optimization: join with inventory instead of room and booking.
WITH available AS (
  SELECT t.hotel_id, MIN(t.price) AS min_price
  FROM (
    SELECT
      rt.hotel_id,
      rt.id AS room_type_id,
      rt.price,
      COUNT(DISTINCT rti.date) AS covered_dates,
      MIN(COALESCE(rti.total_rooms, 0) - COALESCE(rti.booked_rooms, 0)) AS min_available_rooms
    FROM room_types rt
    JOIN room_type_inventories rti ON rti.room_type_id = rt.id
    WHERE rt.price BETWEEN $10 AND $11
      AND rti.date >= $1::date
      AND rti.date < $2::date
      AND (rt.adult_capacity * $4) >= $3
      AND ((rt.adult_capacity + rt.children_capacity) * $4) >= ($3 + $14)
    GROUP BY rt.hotel_id, rt.id, rt.price
    HAVING COUNT(DISTINCT rti.date) = ($2::date - $1::date)
      AND MIN(COALESCE(rti.total_rooms, 0) - COALESCE(rti.booked_rooms, 0)) >= $4
  ) AS t
  GROUP BY t.hotel_id
)
SELECT
  h.id,
  h.name,
  h.image_urls[1] AS "thumbnailUrl",
  h.rating AS rating,
  h.number_of_reviews AS "numberOfReviews",
  available.min_price AS "price",
  h.latitude,
  h.longitude
FROM hotels h
JOIN available ON available.hotel_id = h.id
WHERE
  -- latitude between south and north
  h.latitude BETWEEN $7::double precision AND $6::double precision
  AND (
    -- normal case or antimeridian wrapped box
    ($8::double precision <= $9::double precision AND h.longitude BETWEEN $8::double precision AND $9::double precision)
    OR ($8::double precision > $9::double precision AND (h.longitude >= $8::double precision OR h.longitude <= $9::double precision))
  )
  AND (
    $13::"HotelType"[] IS NULL
    OR cardinality($13::"HotelType"[]) = 0
    OR h.type = ANY($13::"HotelType"[])
  )
  AND (
    $12::text[] IS NULL
    OR cardinality($12::text[]) = 0
    OR EXISTS (
      SELECT 1
      FROM "_CommonFacilityToHotel" f2h
      JOIN common_facilities fac ON fac.id = f2h."A"
      WHERE f2h."B" = h.id
        AND fac.name = ANY($12::text[])
    )
  )
  AND h.rating BETWEEN $15 AND $16
ORDER BY available.min_price ASC NULLS LAST, h.id ASC
LIMIT $5;

-- $12:facilityNames (prisma doesnot support array, so just treat it as normal sql param)
-- $13:hotelTypes (e.g. resort, apartment, etc.) (prisma doesnot support array, so just treat it as normal sql param)