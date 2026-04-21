import { Pool } from 'pg';

export default class UserRepo {

    constructor(private pool: Pool) {}

    async createUser(name: string, email: string, password: string ,department: string, department2: string) {
        try {

            if (await this.findByEmail(email)) {
                throw new Error('Email already exists');
            }

            // Validate password BEFORE inserting
            if (!this.validatePassword(password)) {
                throw new Error(
                    'Password must be at least 8 characters long and contain both letters and numbers'
                );
            }

            const result = await this.pool.query(
                'INSERT INTO "users" (name,email,password,department,department2) VALUES ($1,$2,$3,$4,$5) returning *',
                [name, email, password , department, department2]
            );

            return result.rows[0];

        } catch (err) {
            console.error(err);
            throw new Error('Failed to add user to database');
        }
    }

    async updateUser(id: string, name: string, email: string, password: string, department: string, department2: string) {
        try {
            await this.pool.query(
                'UPDATE "users" SET name=$1, email=$2, password=$3, department=$4, department2=$5 WHERE id=$6',
                [name, email, password, department, department2, id]
            );

            return { message: `User ${id} updated to ${name}` };

        } catch (err) {
            console.error(err);
            throw new Error('Update failed');
        }
    }

    async findByEmail(email: string): Promise<boolean> {
        try {
            const result = await this.pool.query(
                'SELECT * FROM "users" WHERE email = $1',
                [email]
            );

            return result.rowCount ? result.rowCount > 0 : false;

        } catch (err) {
            console.error(err);
            throw new Error('Failed to query user by email');
        }
    }

    private validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }
}