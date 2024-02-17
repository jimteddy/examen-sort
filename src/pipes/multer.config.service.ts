import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import multer from "multer";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory{

  createMulterOptions(): MulterModuleOptions {
    return {
      dest : (req, file, cb) => {
        cb(null, ".public/data/uploads/")
      },
      preservePath: true
    }
  }
}