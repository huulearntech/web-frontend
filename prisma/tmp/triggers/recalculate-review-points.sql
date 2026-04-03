-- NOTE: This is not verified yet.

CREATE OR REPLACE FUNCTION recalculate_review_points() RETURNS trigger AS $$
DECLARE
    affected_booking_id_old TEXT;
    affected_booking_id_new TEXT;
    hotel_id TEXT;
    hotel_id_old TEXT;
    avg_points NUMERIC;
    review_count INTEGER;
BEGIN
    -- determine booking ids depending on operation
    IF TG_OP = 'INSERT' THEN
        affected_booking_id_new := NEW."bookingId";
        -- compute hotel for the new bookingId
        SELECT b."hotelId" INTO hotel_id FROM bookings b WHERE b.id = affected_booking_id_new;

        IF hotel_id IS NULL THEN
            RETURN NULL;
        END IF;

        SELECT COALESCE(AVG(rv.rating)::NUMERIC, 0), COUNT(rv.*)
        INTO avg_points, review_count
        FROM reviews rv
        JOIN bookings b2 ON rv."bookingId" = b2.id
        WHERE b2."hotelId" = hotel_id;

        UPDATE hotels
        SET "review_points" = avg_points,
            "number_of_reviews" = review_count
        WHERE id = hotel_id;

        RETURN NULL;

    ELSIF TG_OP = 'UPDATE' THEN
        affected_booking_id_old := OLD."bookingId";
        affected_booking_id_new := NEW."bookingId";

        -- if bookingId changed, recalc for the old hotel too
        IF affected_booking_id_old IS NOT NULL AND affected_booking_id_old <> affected_booking_id_new THEN
            SELECT b."hotelId" INTO hotel_id_old FROM bookings b WHERE b.id = affected_booking_id_old;
            IF hotel_id_old IS NOT NULL THEN
                SELECT COALESCE(AVG(rv.rating)::NUMERIC, 0), COUNT(rv.*)
                INTO avg_points, review_count
                FROM reviews rv
                JOIN bookings b2 ON rv."bookingId" = b2.id
                WHERE b2."hotelId" = hotel_id_old;

                UPDATE hotels
                SET "review_points" = avg_points,
                    "number_of_reviews" = review_count
                WHERE id = hotel_id_old;
            END IF;
        END IF;

        -- always recalc for the (new) hotel's id
        SELECT b."hotelId" INTO hotel_id FROM bookings b WHERE b.id = affected_booking_id_new;
        IF hotel_id IS NOT NULL THEN
            SELECT COALESCE(AVG(rv.rating)::NUMERIC, 0), COUNT(rv.*)
            INTO avg_points, review_count
            FROM reviews rv
            JOIN bookings b2 ON rv."bookingId" = b2.id
            WHERE b2."hotelId" = hotel_id;

            UPDATE hotels
            SET "review_points" = avg_points,
                "number_of_reviews" = review_count
            WHERE id = hotel_id;
        END IF;

        RETURN NULL;

    ELSIF TG_OP = 'DELETE' THEN
        affected_booking_id_old := OLD."bookingId";
        SELECT b."hotelId" INTO hotel_id_old FROM bookings b WHERE b.id = affected_booking_id_old;
        IF hotel_id_old IS NOT NULL THEN
            SELECT COALESCE(AVG(rv.rating)::NUMERIC, 0), COUNT(rv.*)
            INTO avg_points, review_count
            FROM reviews rv
            JOIN bookings b2 ON rv."bookingId" = b2.id
            WHERE b2."hotelId" = hotel_id_old;

            UPDATE hotels
            SET "review_points" = avg_points,
                "number_of_reviews" = review_count
            WHERE id = hotel_id_old;
        END IF;

        RETURN NULL;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function after mutations on reviews
DROP TRIGGER IF EXISTS recalculate_review_points_trigger ON reviews;
CREATE TRIGGER recalculate_review_points_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION recalculate_review_points();

