import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

describe('TodoResolver', () => {
  let resolver: TodoResolver;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoResolver,
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get all todos', async () => {
    const result = [];
    jest.spyOn(service, 'getTodos').mockResolvedValue(result);
    expect(await resolver.todos()).toBe(result);
  });

  it('should get a todo by id', async () => {
    const result = {
      _id: '123456789',
      id: '987654321',
      title: 'Test',
      description: 'Test description',
      completed: false,
    };
    jest.spyOn(service, 'getTodoById').mockResolvedValue(result);
    expect(await resolver.todo('1')).toBe(result);
  });

  it('should create a todo', async () => {
    const result = {
      _id: '123456789',
      id: '987654321',
      title: 'Test',
      description: 'Test description',
      completed: false,
    };
    const input = {
      title: 'Test',
      description: 'Test description',
      completed: false,
    };
    jest.spyOn(service, 'createTodo').mockResolvedValue(result);
    expect(await resolver.createTodo(input)).toBe(result);
  });

  it('should update a todo', async () => {
    const result = {
      _id: '123456789',
      id: '987654321',
      title: 'Test Updated',
      description: 'Test description',
      completed: false,
    };
    const input = {
      _id: '123456789',
      id: '987654321',
      title: 'Test Updated',
      description: 'Test description',
      completed: false,
    };
    jest.spyOn(service, 'updateTodoById').mockResolvedValue(result);
    expect(await resolver.updateTodo(input)).toBe(result);
  });

  it('should delete a todo', async () => {
    const result = {
      _id: '123456789',
      id: '987654321',
      title: 'Test',
      description: 'Test description',
      completed: false,
    };
    jest.spyOn(service, 'deleteTodoById').mockResolvedValue(result);
    expect(await resolver.deleteTodo('1')).toBe(result);
  });
});
