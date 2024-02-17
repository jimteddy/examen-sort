import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, Render, Session, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ExamenService } from './examen/examen.service';
import { Client } from './client/entities/client.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/validation.file.pipe';
import { SessionGuard } from './guards/session.guard';

@Controller()
export class AppController {

  constructor(
    private readonly appService : AppService,
  ){}

  /*@Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async postHome(
    @Body() body : any,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: ".docx"})
      .addMaxSizeValidator({maxSize: 100000})
      .build({errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE})
    ) file: Express.Multer.File){
    return {
      body, 
      file: file,
    }
  }

  @Get('/')
  @Render("home")
  async getHome(){
    
  }*/

  @UseGuards(SessionGuard)
  @Get('/')
  @Render('home')
  async getHome(@Session() session: Record<string, any>){
    const currentClient = session.client
   const {nbrClasses, effectifTotal} = await this.appService.countClasseAll(currentClient)
   const {nbrSalle, capacityTotal} = await this.appService.countSalleAll(currentClient)

   const nbrExamens = await this.appService.countExamenAll(currentClient)

   return {nbrSalle, capacityTotal, nbrClasses, effectifTotal, nbrExamens}
  }

}
