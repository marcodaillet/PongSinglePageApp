import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        ) {}

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: any): Promise<User> {
        const user = this.userRepository.findOne({where: {id: id}});
        return user;
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    async update(id: number, data): Promise<any> {
        return this.userRepository.update(id, data);
    }

    async setTwoFactorSecret(secret: string, clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { twoFactorSecret: secret });
    }

    async enableTwoFactor(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { twofa: true})
    }

    async disableTwoFactor(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { twofa: false})
    }

    async sendGameInvite(userID: number, gameID: number): Promise<any> {
        return this.userRepository.update(userID, { privateGame: gameID })
    }
    async sendGameInvite2(userID: number, userInviteID: number): Promise<any> {
        return this.userRepository.update(userID, { privatePartner: userInviteID })
    }

    // async acceptGameInvite(clientID: number): Promise<any> {
    //     return this.userRepository.update(clientID, { pendingInvite: false })
    // }

    async setOnline(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { status: 'ONLINE' })
    }

    async setInGame(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { status: 'IN GAME' })
    }

    async setOffline(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { status: 'OFFLINE' })
    }

    async findUserByName(username: any): Promise<User> {
        return this.userRepository.findOne({where: {username: username}})
    }

    async allFriends(): Promise<User[]> {
        const friends = await this.userRepository.find({relations:["friends"]});
        return friends;
    }

    async userFriends(id: number): Promise<User> {
        return await this.userRepository.findOne({where: { id }, relations: ["friends"]});
    }

    async addFriend(userID: number, friendID: number): Promise<User[]> {
        const friendToAdd = await this.userRepository.findOneBy({id: friendID});
        const userToAdd = await this.userRepository.findOneBy({id: userID});
        const allUsers = await this.allFriends();
        if (userID === friendID) {
            return [];
        }
        else {
            for (const user of allUsers) {
                if (user.id === userToAdd.id) {
                    const ifFriend = user.friends.filter((friend) => friend.id === friendToAdd.id);
                    if (!ifFriend.length || !user.friends.length)
                    {
                        user.friends.push(friendToAdd);
                    }
                }
            }
            return this.userRepository.save(allUsers);
        }
    }

    async deleteFriend(userID: number, friendID: number): Promise<User[]> {
        const friendToDel = await this.userRepository.findOneBy({id: friendID});
        const userToDel = await this.userRepository.findOneBy({id: userID});
        const allUsers = await this.allFriends();
        if (userID === friendID) {
            return [];
        }
        else {
            for (const user of allUsers) {
                if (user.id === userToDel.id) {
                    user.friends = user.friends.filter((friend: User) => friend.id !== friendToDel.id);
                }
            }
            return this.userRepository.save(allUsers);
        }
    }
}
