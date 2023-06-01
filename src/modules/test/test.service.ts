import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestRepository } from './test.repository';

@Injectable()
export class TestService {
  constructor(public readonly testRepository: TestRepository) {}

  create(informationId: string) {
    console.log(
      '🚀 ~ file: test.service.ts:12 ~ TestService ~ create ~ informationId:',
      informationId,
    );
    const sd = this.testRepository.create({
      informationId,
    });
    return sd.save();
  }
}
