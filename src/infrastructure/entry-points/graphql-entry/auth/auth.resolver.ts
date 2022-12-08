import { Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';

@Resolver()
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: AuthService,
    ){}

    //TODO: create the queries and mutations

}
