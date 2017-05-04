export type PendingRequest = [RequestInfo, RequestInit | undefined];

export interface NextPendingRequest {
  (): void;
}

function serialFetch(originalFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
  let pending: NextPendingRequest[] = [];
  let running: number = 0;

  function onComplete() {
    running -= 1;
    shift();
  }

  function onSuccess(response: Response): Response {
    onComplete();
    return response;
  }

  function onError(reason: any) {
    onComplete();
    throw reason;
  }

  function shift() {
    const request = pending.shift();
    if (!request) return;
    request();
  }

  return function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const pendingRequest = new Promise<PendingRequest>((resolve) => {
      running += 1;
      pending.push(() => resolve([input, init]));
    })
      .then(([info, init]) => {
        return originalFetch(info, init).then(onSuccess, onError);
      });

    if (running === 1) shift();

    return pendingRequest;
  };
};

export default serialFetch;
