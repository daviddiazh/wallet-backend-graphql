import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../auth/user.service';
import { User } from './entity/user.entity';
import { SignUpDto } from './dtos/input/sign-up.dto';
import { LoginDtoGQL } from './dtos/input/login.dto';
import { AuthUnion } from '../common/unions/auth';


@Resolver()
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ){}

    @Query( () => User, { name: 'findUserById' } )
    findUserById(@Args('id') id: string) {
        return this.userService.findById( id );
    }

    @Query( () => User, { name: 'findUserByEmail' } )
    findUserByEmail(@Args('email') email: string) {
        return this.userService.findByEmail( email );
    }

    @Mutation( () => AuthUnion, { name: 'signUp' } )
    signUp(@Args('signUp') signUp: SignUpDto ) {
        return this.authService.signUp( signUp );
    }

    @Mutation( () => AuthUnion, { name: 'login' } )
    login(@Args('login') login: LoginDtoGQL) {
        return this.authService.login( login );
    }

    @Query( () => AuthUnion, { name: 'checkToken' } )
    checkToken(@Args('token') token: string) {
        return this.authService.checkTokenGQL( token );
    }

}
