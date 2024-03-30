INSERT INTO "Hotel"("name", "address", "location")
VALUES ('Cherry City Cottage', 'House No 16, Shakuntala Path, Mathura Nagar, Dispur, Guwahati, Assam - 781006', 'Downtown, Guwahati');

INSERT INTO "RoomType"("name", "capacity", "price")
VALUES ('Cozy Comfort Suite', '2', '1600'), ('Scenic View Suite', '2', '2000'), ('Culinary Retreat Suite', '2', '2250'), ('Trio Harmony Suite', '3', '2600');

-- Insert Standard Rooms (Cozy Comfort Suite)
INSERT INTO "Room" ("roomTypeId", "floor", "number", "hotelId", "isAvailable")
VALUES
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 2, '202', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 2, '204', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '301', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '302', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '303', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '304', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '305', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '307', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '308', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Cozy Comfort Suite'), 3, '309', 1, TRUE);

-- Insert Deluxe Rooms (Scenic View Suite) - with balcony
INSERT INTO "Room" ("roomTypeId", "floor", "number", "hotelId", "isAvailable")
VALUES
((SELECT id FROM "RoomType" WHERE "name" = 'Scenic View Suite'), 2, '201', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Scenic View Suite'), 3, '310', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Scenic View Suite'), 3, '311', 1, TRUE);

-- Insert Kitchen Rooms (Culinary Retreat Suite)
INSERT INTO "Room" ("roomTypeId", "floor", "number", "hotelId", "isAvailable")
VALUES
((SELECT id FROM "RoomType" WHERE "name" = 'Culinary Retreat Suite'), 2, '203', 1, TRUE);

-- Insert Triple Rooms (Trio Harmony Suite)
INSERT INTO "Room" ("roomTypeId", "floor", "number", "hotelId", "isAvailable")
VALUES
((SELECT id FROM "RoomType" WHERE "name" = 'Trio Harmony Suite'), 3, '303', 1, TRUE),
((SELECT id FROM "RoomType" WHERE "name" = 'Trio Harmony Suite'), 3, '306', 1, TRUE);

