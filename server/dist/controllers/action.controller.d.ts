import { Count, Filter, Where } from '@loopback/repository';
import { Action } from '../models';
import { ActionRepository } from '../repositories';
export declare class ActionController {
    actionRepository: ActionRepository;
    constructor(actionRepository: ActionRepository);
    create(action: Omit<Action, 'id'>): Promise<Action>;
    count(where?: Where<Action>): Promise<Count>;
    find(filter?: Filter<Action>): Promise<Action[]>;
    updateAll(action: Action, where?: Where<Action>): Promise<Count>;
    findById(id: string): Promise<Action>;
    updateById(id: string, action: Action): Promise<void>;
    replaceById(id: string, action: Action): Promise<void>;
    deleteById(id: string): Promise<void>;
}
