import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

import { JwtModule} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


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
            expiresIn: '10m'
          }
        }
      }
    }), 
  ],
  providers: [AuthService, UserService, JwtStrategy, JwtAuthGuard ],
  controllers: [AuthController, UserController, ],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class UserModule {}
