import type { APIGatewayProxyEvent } from 'aws-lambda';
import type { ResponseMetaFn } from '../http/internals/types';
import type { AnyRouter, inferRouterContext } from '../router';

export type LambdaCreateContextFn<TRouter extends AnyRouter> = (
  opts: APIGatewayProxyEvent,
) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;

export type AWSLambdaOptions<TRouter extends AnyRouter> = {
  router: TRouter;
  batching?: {
    enabled: boolean;
  };
  // TODO: Hack 1.
  onError?: (options: Record<string, unknown>) => void;
  responseMeta?: ResponseMetaFn<TRouter>;
} & {
  /**
   * @link https://trpc.io/docs/context
   **/
  createContext: LambdaCreateContextFn<TRouter>;
};
