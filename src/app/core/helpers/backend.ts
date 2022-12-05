import { BackendError } from 'Core/models/backend-error';
import { GraphQLError } from 'graphql';

export function backendErrorMsg(err: BackendError | GraphQLError) {
  return err.message;
}
