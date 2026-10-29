export const getAccountsQuery = `
    SELECT * 
    FROM Accounts`;

export const getAccountByAuthQuery = `
    SELECT id, company, website, first_name, last_name, email, phone, street, street2, city, state, zip, country, auth_id, (SELECT name FROM Roles WHERE id = role_id) AS role
    FROM Accounts 
    WHERE Accounts.auth_id = $1`;

export const createAccountQuery = `
    INSERT INTO accounts ( first_name, last_name, email, auth_id, role_id) 
    VALUES ($1, $2, $3, $4, (SELECT id FROM Roles WHERE name = $5))
    RETURNING id, first_name, last_name, email, auth_id, (SELECT name FROM roles WHERE id = role_id) AS role`;

export const updateAccountQuery = `
    UPDATE Accounts SET company = $2, website = $3, first_name = $4, last_name = $5, email = $6, phone = $7, street = $8, street2 = $9, city = $10, state = $11, zip = $12, country = $13
    WHERE id = $1
    RETURNING id, company, website, first_name, last_name, email, phone, street, street2, city, state, zip, country, auth_id, (SELECT name FROM Roles WHERE id = role_id) AS role`;

export const deleteAccountQuery = `
    DELETE FROM Accounts
    WHERE id = $1 
    RETURNING *`;
