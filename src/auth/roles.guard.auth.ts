import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { decode } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const token = request.headers.authorization;

    return axios
      .get(
        'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/userinfo',
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(() => {
        //verificação de roles válidas
        const decodedToken: any = decode(token.split(' ')[1]);
        const validateRole = roles.some((role) =>
          decodedToken.resource_access.customers.roles.some(
            (tokenRole) => tokenRole === role,
          ),
        );

        return validateRole ? true : false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
