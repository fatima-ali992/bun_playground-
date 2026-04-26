import { PrismaClient } from '@prisma/client';
import { validator } from 'hono/validator';
import { th } from 'zod/locales';

export default class PrismaUserRepo {
    prismaClient: PrismaClient;

    constructor(client : PrismaClient) { 
        this.prismaClient = client;
    }

    async createUser(name: string, email: string, password: string) {

        try {
            var user = await this.prismaClient.user.create({ data: { name, email, password , orders: { create: {productId: 1, quantity: 1, total: 10.0} } } })
            return user;} 
            
            catch (err) {
                throw new Error('Failed to add user to database');
            }
        }


    async getUsers() {
        try {
            var users = await this.prismaClient.user.findMany();
            return users;
        } catch (err) {
            throw new Error('Failed to retrieve users from database');
        }
    }
    
    async updateUser(id: string, name: string, email: string, password: string) {
        try {
            await this.prismaClient.user.update({ where: { id }, data: { name, email, password } });
        } catch (err) {
            throw new Error('Failed to update user in database');
        }
    }

    async deleteUser(id: string) {
        try {
            await this.prismaClient.user.delete({ where: { id } });
        } catch (err) {
            throw new Error('Failed to delete user from database');
        }
    }
    
    


    
}





    
