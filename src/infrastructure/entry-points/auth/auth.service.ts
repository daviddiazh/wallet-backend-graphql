import { Injectable, UnauthorizedException, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { UserDBRepository } from '../../driven-adapters/mongo-adapter/user/user.repository';
import { LoginDto, signUpDto } from './dto/auth-dto';
import { HashService } from '../../driven-adapters/hash-password-adapter/hash-password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly auth: UserDBRepository,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService
    ){}

    async signUp (payload: signUpDto): Promise<object | any> { //TODO: Change method name
        try {
            const { password, ...userData } = payload;
            
            const passwordEncrypted = await this.hashService.hash(password);

            const user = this.auth.create({
                ...userData,
                password: passwordEncrypted
            });

            return {
                user: {...userData, id: (await user)._id + ''},
                token: this.jwtService.sign({id: (await user)._id + ''})
            };
        } catch (error) {
            console.log('Down Service - signUp Authentication');
            throw new InternalServerErrorException('Down Service - signUp Authentication')
        }
    }

    async login (payload: LoginDto): Promise<object | any> {
        try {
            const { password: passwordByRequest, email: emailByRequest } = payload;

            const user = await this.auth.findByEmail(emailByRequest);
            const { fullName, phone, email, password, _id } = user;

            const isMatchPassword = await this.hashService.compare(passwordByRequest, password);

            if( !isMatchPassword || !email ){
                return {
                    message: 'Correo y/o contraseña incorrectos',
                    code: HttpStatus.UNAUTHORIZED
                };
            }

            return {
                user: {fullName, phone, email, id: _id + ''},
                token: this.jwtService.sign({id: _id + ''})
            };
        } catch (error) {
            console.log('Down Service - login Authentication');
            throw new InternalServerErrorException('Down Service - login Authentication');
        }
    }
  
}
