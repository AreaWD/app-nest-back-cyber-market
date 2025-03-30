import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findAll() {
        return [
            {
                name: 'test',
                price: 1
            },
            {
                name: 'test2',
                price: 2
            },
            {
                name: 'test3',
                price: 3
            },
        ]
    }
}
