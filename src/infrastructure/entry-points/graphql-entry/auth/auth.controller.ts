import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { profile } from "console";
import { diskStorage } from "multer";
import { join } from "path";
import { v4 as uuid } from 'uuid';


const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    const fileExtension = file.mimetype.split('/')[1];

    const fileName = `${ uuid() }.${ fileExtension }`

    callback( null, fileName );
}


@Controller('picture')
export class AuthControllerTEST {

    @Get('/getImage/:profilePicture')
    getImage(
        @Res() res,
        @Param('profilePicture') profilePicture: string,
    ) {
        const path = join( __dirname, '../../../../../static/uploads', profilePicture );

        res.sendFile( path );
    }

    @Post()
    @UseInterceptors( FileInterceptor('profilePicture', {
        storage: diskStorage({
            filename: fileNamer,
            destination: './static/uploads',
        })
    }) )
    uploadProfilePicture(
        @UploadedFile() picture: Express.Multer.File,
    ) {
        
        const secureUrl = `http://localhost:8080/picture/getImage/${ picture.filename }`

        return { secureUrl };
    }

}