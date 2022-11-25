import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

import { JwtModule} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [ 
    PassportModule,
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => {
        
        return {
          secret: configService.get('JWT_SECRET') || '',
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    }), 
  ],
  providers: [AuthService, UserService, JwtStrategy ],
  controllers: [AuthController, UserController, ],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class UserModule {}
