import {
  CreateRecordOptions,
  QueryRecordOptions,
  UpdateRecordOptions,
  DeleteRecordOptions,
  QueryRecordListResponse,
  EmptyRecord,
  MorphRecord,
  AggregateRecordOptions,
  DownloadRecordsAsCsvOptions,
  DownloadRecordsAsCsvResponse,
} from './types/records';
import { GeneralResponse } from './types/common';
import urlJoin from 'url-join';
import { ChatReplyOptions } from './types/chat-reply';

class MorphDataAPIClient {
  public async queryRecords<R extends MorphRecord = EmptyRecord>(
    url: string,
    apiKey: string,
    options: QueryRecordOptions<R>
  ): Promise<QueryRecordListResponse<R>> {
    return await this.fetcher({ url, method: 'POST', apiKey, body: options });
  }

  /**
   * records
   */
  public async createRecord<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: CreateRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await this.fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async updateRecords<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: UpdateRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await this.fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async deleteRecords<R extends MorphRecord = MorphRecord>(
    url: string,
    apiKey: string,
    options: DeleteRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await this.fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async aggregateRecords(
    url: string,
    apiKey: string,
    options: AggregateRecordOptions
  ): Promise<QueryRecordListResponse> {
    return await this.fetcher({ url, method: 'POST', apiKey, body: options });
  }

  public async downloadRecordsAsCsv(
    url: string,
    apiKey: string,
    options: DownloadRecordsAsCsvOptions
  ): Promise<DownloadRecordsAsCsvResponse> {
    return await this.fetcher({ url, method: 'POST', apiKey, body: options });
  }

  /**
   * chat reply
   */
  public async chatReply(
    url: string,
    apiKey: string,
    options: ChatReplyOptions
  ): Promise<ReadableStream<Uint8Array>> {
    const error = new Error();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(apiKey),
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        await this.throwErrorFromResponse(response, error);
      }

      if (!response.body) {
        error.message = 'No response body';
        throw error;
      }

      return response.body;
    } catch (e) {
      throw e;
    }
  }

  /**
   * fetcher
   */
  private async fetcher<T>({
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
  }) {
    const fullUrl = urlJoin(url, new URLSearchParams(params).toString());

    const error = new Error();

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: this.getHeaders(apiKey),
        ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}),
      });

      if (!response.ok) {
        await this.throwErrorFromResponse(response, error);
      }

      return (await response.json()) as T;
    } catch (e) {
      throw e;
    }
  }

  private getHeaders(apiKey: string) {
    return {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json;charset=utf-8',
    };
  }
  private async throwErrorFromResponse(response: Response, error: Error) {
    const body = await response.json();
    if (body && typeof body === 'object' && 'message' in body) {
      error.message = body.message;
    } else {
      error.message = `HTTP error, status = ${response.status}`;
    }
    throw error;
  }
}

export { MorphDataAPIClient };
