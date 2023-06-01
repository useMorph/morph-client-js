import {
  CreateRecordOptions,
  QueryRecordOptions,
  UpdateRecordOptions,
  DeleteRecordOptions,
  MorphRecord,
  EmptyRecord,
  QueryRecordListResponse,
} from './types/records';
import { GeneralResponse } from './types/common';
import urlJoin from 'url-join';

class MorphAdminAPIClient {
  private apiKey: string;
  private teamSlug: string;
  private endpointDomain: string;

  public constructor({
    teamSlug,
    apiKey,
    endpointDomain,
  }: {
    teamSlug: string;
    apiKey: string;
    endpointDomain?: string;
  }) {
    this.apiKey = apiKey;
    this.teamSlug = teamSlug;
    this.endpointDomain = endpointDomain ?? 'api.morphdb.io';
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
    const fullUrl = urlJoin(
      `https://${this.teamSlug}.${this.endpointDomain}/v0`,
      path,
      new URLSearchParams(params).toString()
    );

    const error = new Error();

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          'x-api-key': this.apiKey,
          'client-type': 'widget',
          'Content-Type': 'application/json',
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
  }
}

export { MorphAdminAPIClient };
