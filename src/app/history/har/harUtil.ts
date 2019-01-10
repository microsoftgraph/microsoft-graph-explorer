import { IHarFormat, IHarPayload } from './IHarFormat';

export function generateHar(payload: IHarPayload): IHarFormat {
  return {
    log: {
      version: '1.0',
      creator: {
        name: 'Graph Explorer',
        version: '1.0',
      },
      entries: [
        {
          startedDateTime: payload.startedDateTime,
          time: payload.time,
          request: {
            method: payload.method,
            url: payload.url,
            httpVersion: payload.httpVersion,
            cookies: payload.cookies,
            headers: payload.request.headers,
            queryString: payload.queryString,
            postData: payload.postData,
            headersSize: -1,
            bodySize: -1,
          },
          response: {
            status: payload.status,
            statusText: payload.statusText,
            httpVersion: payload.httpVersion,
            cookies: payload.cookies,
            headers: payload.response.headers,
            content: payload.content,
            redirectURL: '',
            headersSize: -1,
            bodySize: -1,
          },
          cache: {},
          timings: {
            send: payload.sendTime,
            wait: payload.waitTime,
            receive: payload.receiveTime,
          },
          connection: '',
        },
      ],
    },
  };
}
