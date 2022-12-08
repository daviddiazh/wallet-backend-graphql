import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../../auth/user.service';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AccountService } from '../../account/account.service';

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
            expiresIn: '35m' //TODO: check it
          }
        }
      }
    }), 
  ],

  providers: [ AuthResolver, AuthService, UserService, JwtStrategy, JwtAuthGuard, AccountService ],
  exports: [JwtStrategy, PassportModule, JwtModule]


})
export class AuthModule {}
