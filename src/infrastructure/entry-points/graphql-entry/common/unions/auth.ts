import { createUnionType } from "@nestjs/graphql";
import { SignUpOrLogin } from '../../auth/entity/sign-up-or-login.entity';
import { StatusError } from '../entity/error';


export const AuthUnion = createUnionType({
    name: 'AuthUnion',
    types: () => [ SignUpOrLogin, StatusError] as const,
    resolveType(value) {
        // console.log(value)
        if( value.user ) {
            return SignUpOrLogin;
        }
        
        if( value.description ) {
            return StatusError;
        }

    }
  });
  