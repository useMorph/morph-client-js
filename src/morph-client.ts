import {
  RecordFilterConditionUnitAnd,
  RecordFilterConditionUnitOr,
} from './types/filter';

import { RecordSortConditionUnit } from './types/sort';

import {
  GeneralResponse,
  MorphRecord,
  QueryRecordListResponse,
  Values,
} from './types/records';

const fetcher = async <T>({
  method,
  url,
  apiKey,
  params,
  body,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  apiKey: string;
  params?: Record<string, string>;
  body?: unknown;
}) => {
  let fullUrl = url;
  if (method === 'GET' && params) {
    const query = new URLSearchParams(params).toString();
    fullUrl = `${url}?${query}`;
  }

  const error = new Error();

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json;charset=utf-8',
      },
      ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      const body = await response.json();
      if (body && typeof body === 'object' && 'message' in body) {
        error.message = body.message;
      } else {
        error.message = `HTTP error, status = ${response.status}`;
      }
      throw error;
    }

    return (await response.json()) as T;
  } catch (e) {
    throw e;
  }
};

class MorphClient {
  public async query<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: {
      select: (keyof R)[];
      filter?: RecordFilterConditionUnitAnd<R> | RecordFilterConditionUnitOr<R>;
      sort?: RecordSortConditionUnit<R>[];
      skip?: number;
      limit?: number;
    }
  ): Promise<QueryRecordListResponse<R>> {
    return await fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async create<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: {
      values: Values<R>;
      fixedValue: Array<{ key: string; value: unknown }>;
    }
  ): Promise<GeneralResponse> {
    return await fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async update<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: {
      filter: RecordFilterConditionUnitAnd | RecordFilterConditionUnitOr;
      values: Values<R>;
      fixedValue: Array<{ key: string; value: unknown }>;
    }
  ): Promise<GeneralResponse> {
    return await fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async delete<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: {
      filter?: RecordFilterConditionUnitAnd<R> | RecordFilterConditionUnitOr<R>;
    }
  ): Promise<GeneralResponse> {
    return await fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async chatReply(
    url: string,
    apiKey: string,
    {
      botId,
      prompt,
    }: {
      botId: string;
      prompt: string;
    }
  ) {
    return await fetcher({
      url,
      method: 'POST',
      apiKey,
      body: { prompt },
      params: { botId },
    });
  }
}

export { MorphClient };
