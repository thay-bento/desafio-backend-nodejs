import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { decode } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  client: AxiosInstance;
  constructor(private readonly reflector: Reflector) {
    this.client = axios.create({
      baseURL: process.env.KEYCLOAK_SERVER_URL,
    });
  }
  private buildHeader(token: string) {
    return {
      headers: {
        Authorization: token,
      },
    };
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    require('dotenv/config');

    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const token = request.headers.authorization;

    return this.client
      .get(
        `/realms/careers/protocol/openid-connect/userinfo`,
        this.buildHeader(token),
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
