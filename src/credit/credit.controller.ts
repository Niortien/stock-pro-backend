import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreditService } from "./credit.service";
import { CreateCreditDto } from "./dto/create-credit.dto";
import { UpdateCreditDto } from "./dto/update-credit.dto";

@Controller("credits")
export class CreditController {
  constructor(private service: CreditService) {}

  @Post()
  create(@Body() dto: CreateCreditDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCreditDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
