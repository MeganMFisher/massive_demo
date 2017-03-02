SELECT
    incidents.id,
   incidents.us_state,
   injuries.name as injury_name,
   affected_areas.name as affected_area_name,
   causes.name as cause_name
FROM incidents
JOIN injuries
    ON injuries.id = incidents.injury_id
JOIN affected_areas
    ON affected_areas.id = injuries.affected_area_id
JOIN causes
    ON causes.id = incidents.cause_id
WHERE us_state = $1 AND causes.name = $2




--dynamic parameter use $ and number is argument number.

--select * from products
--where in_stock = $1 and price < $2;

--db.products_in_stock([true, 1000], function(err, products) {
--  // products is a results array
--});

--$1 = true, $2 = 1000