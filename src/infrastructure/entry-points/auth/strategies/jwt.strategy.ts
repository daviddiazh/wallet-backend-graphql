import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../../domain/common/user/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { UserDBRepository } from '../../../driven-adapters/mongo-adapter/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        private readonly userRepository: UserDBRepository,

        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate( payload: JwtPayload ): Promise<User> {
        
        const { id } = payload;

        const user = await this.userRepository.findById(id);

        if ( !user ) 
            throw new UnauthorizedException('Token not valid')
            
        // if ( !user.isActive ) 
        //     throw new UnauthorizedException('User is inactive, talk with an admin');
        

        return user;
    }

}