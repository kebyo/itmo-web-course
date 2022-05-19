import { Controller, Get, Redirect } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  @Redirect('/promocodes')
  async mainPage() {
    return;
  }
}
