import { Test, TestingModule } from '@nestjs/testing';
import { HashageService } from './hashage.service';

describe('HashageService', () => {
  let service: HashageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashageService],
    }).compile();

    service = module.get<HashageService>(HashageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
