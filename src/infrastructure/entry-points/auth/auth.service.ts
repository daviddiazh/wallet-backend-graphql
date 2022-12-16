import { Injectable, HttpStatus, BadRequestException, HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { LoginDto, signUpDto } from './dto/auth-dto';
import { HashService } from '../../driven-adapters/hash-password-adapter/hash-password.service';
import { AccountService } from '../account/account.service';
import { ResponseEntity } from '../../../domain/common/response-entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly auth: UserDBRepository,
        private readonly accountService: AccountService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ){}

    async signUp ( payload: signUpDto ): Promise<object | any> { 
        try {
            const { password, ...userData } = payload;
            
            const passwordEncrypted = await this.hashService.hash(password);

            const user = this.auth.create({
                ...userData,
                password: passwordEncrypted, 
            });

            await this.accountService.create({userId: (await user)._id, userEmail: (await user).email})

            return {
                user: {...userData, _id: (await user)._id},
                token: this.jwtService.sign({id: (await user)._id})
            };
        } catch (error) {
            console.log('Down Service - signUp Authentication');
            return new ResponseEntity(400, 'Registro incorrecto.', 'El correo ya se encuentra registrado.');
            // throw new InternalServerErrorException('Down Service - signUp Authentication')
        }
    }

    async login (payload: LoginDto): Promise<object | any> {
        try {
            const { password: passwordByRequest, email: emailByRequest } = payload;

            const user = await this.auth.findByEmail(emailByRequest);
            const { fullName, phone, email, password, _id, profilePicture } = user;

            const isMatchPassword = await this.hashService.compare(passwordByRequest, password);

            if( !isMatchPassword ){
                throw new BadRequestException('Credenciales incorrectas.')
            } //TODO: replicar en todas partes

            return {
                user: {fullName, phone, email, _id: (await user)._id, profilePicture},
                token: this.jwtService.sign({id: _id})
            };
        } catch (error) {
            return new ResponseEntity(400, 'Ingreso incorrecto.', 'Credenciales incorrectas.');
            // switch(error.status) {
            //     case 400: 
            //         throw error;
            //     default:
            //         console.log('Down Service - login Authentication');
            //         throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            // }
        }
    }

    async checkToken (req: Request) {

        const token = req.headers['x-token'];

        if( !token ) return new UnauthorizedException('Su token ha expirado o no hay token en la petición');

        try {
            const { id } = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

            const user = await this.auth.findById(id);

            return {
                user,
                message: 'token válido',
                token,
            }
        } catch (error) {
            console.log(error)
            switch(error.status) { //TODO: Configurarlo en el front y Probarlo
                case 'TokenExpiredError: jwt expired':
                case 401: 
                    console.log('entro en el 401')
                    throw error;
                default:
                    throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } //TODO: Validar porque me devuelve code 200 en vez del 401

    }

    async checkTokenGQL (token: string) { 

        if( !token ) return new ResponseEntity(401, 'Ocurrio un error.', 'Estamos presentando fallas en el servicio.');

        try {
            const { id } = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

            const user = await this.auth.findById(id);

            return {
                user,
                token,
            }
        } catch (error) {
            console.log(error)
            return new ResponseEntity(401, 'Expiró la sesión', 'La sesión finalizo, por favor ingresa de nuevo.');
            // throw error;

            // switch(error.status) { //TODO: Configurarlo en el front y Probarlo
            //     case 401: 
            //         console.log('entro en el 401')
            //         throw error;
            //     default:
            //         throw new HttpException('Estamos presentando fallas en nuestro servicio.', HttpStatus.INTERNAL_SERVER_ERROR);
            // }
        } //TODO: Validar porque me devuelve code 200 en vez del 401
    }
  
}
