import {
  AuthenticationBindings,
  AuthenticationMetadata,
  AuthenticationStrategy,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Request} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ConfiguracionSeguridad} from '../config/seguridad.config';
const jwt = require('jsonwebtoken');

export class clientAuthenticacionStrategy implements AuthenticationStrategy {
  name: string = 'cliente';

  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      try {
        const obj = jwt.verify(token, ConfiguracionSeguridad.claveJWT);

        if (obj.role === ConfiguracionSeguridad.idClienteRol) {
          let perfil: UserProfile = Object.assign({
            permitido: 'OK',
          });
          return perfil;
        } else {
          throw new HttpErrors[401](
            'El token ingresado no es válido',
          );
        }
      } catch (error) {
        throw new HttpErrors[401](
          'No es posible ejecutar la accion por falta de permisos',
        );
      }
    } else {
      throw new HttpErrors[401](
        'No es posible ejecutar la accion por falta de un token',
      );
    }
  }
}
