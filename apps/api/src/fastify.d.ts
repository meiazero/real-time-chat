import "fastify";

declare module "fastify" {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>;

    reqId: string;
    sesId: string;
    ids: {
      reqId: string;
      sesId: string;
    };
  }
}

export {};
