//@ts-expect-error File '/Users/fabianwolf/Documents/repos.nosync/vrm-application-task/node_modules/@types/whatwg-fetch/index.d.ts' is not a module.ts(2306)
const Response = self.Response ?? (await import("whatwg-fetch")).Response;

type TMockedFetchResponse<T> = Omit<Response, "json"> & {
  json: () => Promise<T>;
};
// returns a mocked fetch response
function makeFetchResponse<T>(
  status: number,
  data?: T & { [key: string]: string }
): TMockedFetchResponse<T> {
  const responseMeta: ResponseInit = {
    status,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  };
  const response = new Response(JSON.stringify(data), responseMeta);
  return response;
}

// maps object property keys to string literal types for type-safe fetch (copied from typescript docs example)
type TMockApiRequestHandler = {
  [key: string]: { request: unknown; response: unknown };
};
type PropEventSource<Type extends TMockApiRequestHandler> = {
  post<Key extends string & keyof Type>(
    eventName: `/api/${Key}`,
    callback: (
      newValue: Type[Key]
    ) => Type[Key]["response"] | Promise<Type[Key]["response"]>
  ): void;
  call<Key extends string & keyof Type>(
    eventName: `/api/${Key}`,
    request: Type[Key]["request"]
  ): Promise<TMockedFetchResponse<Promise<Type[Key]["response"]>>>;
};

// returns an "app" object similiar to express / fastify / koa route signatures
export function createMockApp<
  Type extends TMockApiRequestHandler
>(): PropEventSource<Type> {
  const routes = new Map<string, unknown>();
  const objectWithHandler: PropEventSource<Type> = {
    post: function (
      eventName: string,
      callback: ReturnType<typeof routes.get>
    ) {
      console.log("eventName", eventName, callback);
      if (callback) routes.set(eventName, callback);
    },
    call: async function <TRequest>(eventName: string, request: TRequest) {
      const callback = routes.get(eventName);
      if (callback && typeof callback === "function") {
        return makeFetchResponse(200, await callback({ request }));
      } else {
        throw new Error("Not implemented"); //or do real fetch
      }
    },
  };
  return objectWithHandler;
}
