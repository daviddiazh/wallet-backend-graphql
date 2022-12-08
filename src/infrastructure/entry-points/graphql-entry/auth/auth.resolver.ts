import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../auth/user.service';
import { User } from './entity/user.entity';
import { SignUpDto } from './dtos/input/sign-up.dto';
import { SignUpOrLogin } from './entity/sign-up-or-login.entity';
import { LoginDtoGQL } from './dtos/input/login.dto';

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

    @Mutation( () => SignUpOrLogin, { name: 'signUp' } )
    signUp(@Args('signUp') signUp: SignUpDto) {
        return this.authService.signUp( signUp );
    }

    @Mutation( () => SignUpOrLogin, { name: 'login' } )
    login(@Args('login') login: LoginDtoGQL) {
        return this.authService.login( login );
    }

}
