export const getEventsQuery = `
    SELECT * 
    FROM Events`;

export const getEventByAccountIdQuery = `
    SELECT *
    FROM Events 
    WHERE account_id = $1`;

export const getEventByIdQuery = `
    SELECT *
    FROM Events 
    WHERE id = $1`;

export const createEventQuery = `
    INSERT INTO Events ( name, description, start_date, end_date, account_id) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, description, start_date, end_date, account_id`;

export const updateEventQuery = `
    UPDATE Events SET name = $2, description = $3, start_date = $4, end_date = $5
    WHERE id = $1
    RETURNING id, name, description, start_date, end_date, account_id`;

export const deleteEventQuery = `
    DELETE FROM Events
    WHERE id = $1 
    RETURNING *`;