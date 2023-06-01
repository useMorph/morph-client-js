import {
  CreateRecordOptions,
  QueryRecordOptions,
  UpdateRecordOptions,
  DeleteRecordOptions,
  QueryRecordListResponse,
  EmptyRecord,
  MorphRecord,
} from './types/records';
import { GeneralResponse } from './types/common';
import urlJoin from 'url-join';

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
  const fullUrl = urlJoin(url, new URLSearchParams(params).toString());

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

class MorphDataAPIClient {
  public async query<R extends MorphRecord = EmptyRecord>(
    url: string,
    apiKey: string,
    options: QueryRecordOptions<R>
  ): Promise<QueryRecordListResponse<R>> {
    return await fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async create<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: CreateRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async update<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: UpdateRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async delete<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: DeleteRecordOptions<R>
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
      body: { prompt, botId },
    });
  }
}

export { MorphDataAPIClient };