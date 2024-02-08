create table drone
(
    serialNumber    varchar(100)                              not null,
    model           varchar(255)                              not null,
    weightLimit     int                                       not null,
    batteryCapacity int                                       not null,
    state           varchar(255)                              not null,
    createdAt       timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt       timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    primary key (serialNumber),
    constraint IDX_856e3fb759c889fc1b038900bc
        unique (serialNumber)
);

create table medication
(
    code              varchar(255)                              not null,
    name              varchar(255)                              not null,
    weight            int                                       not null,
    imageURL          varchar(255)                              not null,
    createdAt         timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt         timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    droneSerialNumber varchar(100)                              null,
    primary key (code),
    constraint IDX_6e2535e1d96584af77d8e3c48c
        unique (code),
    constraint FK_151c49c1332eac9e551ef2fee52
        foreign key (droneSerialNumber) references drone (serialNumber)
);

INSERT INTO drone (serialNumber, model, weightLimit, batteryCapacity, state, createdAt, updatedAt) VALUES
('SN0001', 'Lightweight', 250, 75, 'IDLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0002', 'Middleweight', 350, 80, 'IDLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0003', 'Cruiserweight', 450, 25, 'LOADING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0004', 'Heavyweight', 500, 90, 'LOADED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0005', 'Lightweight', 250, 60, 'DELIVERING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0006', 'Middleweight', 350, 70, 'DELIVERED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0007', 'Cruiserweight', 450, 75, 'RETURNING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0008', 'Heavyweight', 500, 10, 'IDLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0009', 'Lightweight', 250, 85, 'IDLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SN0010', 'Middleweight', 350, 5, 'IDLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO medication (code, name, weight, imageURL, createdAt, updatedAt, droneSerialNumber) VALUES
('MED001', 'Aspirin', 100, 'http://example.com/aspirin.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0001'),
('MED002', 'Paracetamol', 150, 'http://example.com/paracetamol.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0002'),
('MED003', 'Ibuprofen', 200, 'http://example.com/ibuprofen.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0002'),
('MED004', 'Antibiotic', 100, 'http://example.com/antibiotic.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0004'),
('MED005', 'VitaminC', 50, 'http://example.com/vitaminc.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0005'),
('MED006', 'VitaminD3', 75, 'http://example.com/vitamind3.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0006'),
('MED007', 'Zinc', 80, 'http://example.com/zinc.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0007'),
('MED008', 'Iron', 90, 'http://example.com/iron.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0007'),
('MED009', 'Calcium', 120, 'http://example.com/calcium.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0009'),
('MED010', 'Magnesium', 130, 'http://example.com/magnesium.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'SN0001');