DO $$ BEGIN
 CREATE TYPE "public"."day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Table for roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description TEXT
);

-- Table for owners who can create events
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles (id),
    auth_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    street VARCHAR(255),
    street2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip VARCHAR(10),
    country VARCHAR(100),
    phone VARCHAR(20),
    company VARCHAR(100),
    website VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for event details, linked to an owner
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    name VARCHAR(255) NOT NULL,
    description TEXT
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    timezone VARCHAR(255) NOT NULL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedule_availabilities (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    schedule_id INTEGER REFERENCES schedules (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL,
    day_of_week "public"."day" NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for staff members
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20)
);

-- Junction table to associate staff with a specific event
CREATE TABLE event_staff (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events (id) ON DELETE CASCADE,
    staff_id INTEGER REFERENCES staff (id) ON DELETE CASCADE,
    UNIQUE (event_id, staff_id) -- Ensures a staff member can only be assigned once per event
);

-- Table defining the specific daily working hours for a staff member at an event
CREATE TABLE staff_availability (
    id SERIAL PRIMARY KEY,
    event_staff_id INTEGER REFERENCES event_staff (id) ON DELETE CASCADE,
    work_date DATE NOT NULL,
    start_time TIME NOT NULL,
    stop_time TIME NOT NULL,
    UNIQUE (event_staff_id, work_date) -- Prevents multiple schedules for a staff member on the same day
);

-- Table for customers who book an appointment
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for the actual bookings made by a customer
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers (id) ON DELETE CASCADE,
    staff_availability_id INTEGER REFERENCES staff_availability (id) ON DELETE CASCADE,
    booking_start_time TIME NOT NULL,
    booking_end_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);