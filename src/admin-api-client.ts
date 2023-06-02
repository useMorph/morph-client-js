import {
  CreateRecordOptions,
  QueryRecordOptions,
  UpdateRecordOptions,
  DeleteRecordOptions,
  MorphRecord,
  EmptyRecord,
  QueryRecordListResponse,
} from './types/records';
import { ChatReplyOptions } from './types/chat-reply';
import { GeneralResponse } from './types/common';
import urlJoin from 'url-join';

class MorphAdminAPIClient {
  private apiKey: string;
  private teamSlug: string;
  private endpointUrl: string;

  public constructor({
    teamSlug,
    apiKey,
    endpointUrl = 'api.morphdb.io/v0',
  }: {
    teamSlug: string;
    apiKey: string;
    endpointUrl?: string;
  }) {
    this.apiKey = apiKey;
    this.teamSlug = teamSlug;
    this.endpointUrl = endpointUrl;
  }

  /**
   * records
   */
  public async queryRecords<R extends MorphRecord = EmptyRecord>(
    databaseId: string,
    tableSlug: string,
    options: QueryRecordOptions<R>
  ): Promise<QueryRecordListResponse<R>> {
    return await this.fetcher({
      path: `/record/${databaseId}/${tableSlug}/query`,
      method: 'POST',
      body: options,
    });
  }

  public async createRecord<R extends MorphRecord = EmptyRecord>(
    databaseId: string,
    tableSlug: string,
    options: CreateRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await this.fetcher({
      path: `/record/${databaseId}/${tableSlug}/create`,
      method: 'POST',
      body: options,
    });
  }

  public async updateRecords<R extends MorphRecord = EmptyRecord>(
    databaseId: string,
    tableSlug: string,
    options: UpdateRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await this.fetcher({
      path: `/record/${databaseId}/${tableSlug}/update`,
      method: 'POST',
      body: options,
    });
  }

  public async deleteRecords<R extends MorphRecord = EmptyRecord>(
    databaseId: string,
    tableSlug: string,
    options: DeleteRecordOptions<R>
  ): Promise<GeneralResponse> {
    return await this.fetcher({
      path: `/record/${databaseId}/${tableSlug}/delete`,
      method: 'POST',
      body: options,
    });
  }

  /**
   * chat reply
   */

  public async chatReply(
    options: ChatReplyOptions
  ): Promise<ReadableStream<Uint8Array>> {
    const fullUrl = this.getFullUrl(`/chat/reply`);

    const error = new Error();

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: this.getHeaders(),
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
    path,
    params,
    body,
  }: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    params?: Record<string, string>;
    body?: unknown;
  }) {
    const error = new Error();

    try {
      const response = await fetch(this.getFullUrl(path, params), {
        method,
        headers: this.getHeaders(),
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

  private getHeaders() {
    return {
      'x-api-key': this.apiKey,
      'client-type': 'widget',
      'Content-Type': 'application/json',
    };
  }

  private getFullUrl(path: string, params?: Record<string, string>) {
    const searchParams = new URLSearchParams(params).toString();
    return urlJoin(
      `https://${this.teamSlug}.${this.endpointUrl}`,
      path,
      searchParams ? `?${searchParams}` : ''
    );
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

export { MorphAdminAPIClient };
