# Morph Client

## Introduction

[Morph](https://www.morphdb.io/) is a no-code tool that can handle huge data with the feel of a spreadsheet.

`@morphdb/morph-client` is a Javascript library that provides easy access to Morph's Admin API and Data API.

## Getting started

### Installation

To install morph-client in a node project:

```lang="sh"
npm install @morphdb/morph-client
```

```lang="sh"
yarn add @morphdb/morph-client
```

### API types

There are two types of APIs in Morph. See below for more information on the role and use of eachThere are two types in Morph API, Admin API and Data API.

**Admin API**
The Admin API is mainly used by administrators, and API keys for the Admin API can be issued in dev mode. This Admin API Key allows access to all endpoints of the Admin API. The IP address of the caller can also be restricted.

**Data API**
The Data API allows for more restricted APIs than the Admin API, and API keys for the Data API can be created from the database on the dashboard.
Each API key corresponds to a specific endpoint, so you can generate and use only the API key for the endpoint you need.

[For more detail](https://api-docs.morphdb.io/reference/introduction#api-types)

## Admin API

### Initialize client for Admin API

```lang="ts"
import { MorphAdminAPIClient } from "@morphdb/morph-client";

const adminClient = new MorphAdminAPIClient({
    teamSlug: YOUR_TEAM_SLUG,
    apiKey: YOUR_API_KEY
});
```

For more information, please check the following pages

- [How to find the API key for the Admin API](https://api-docs.morphdb.io/docs/quickstart#create-an-api-key)
- [How to find the team slug](https://api-docs.morphdb.io/docs/quickstart#how-to-find-teamslug-databaseid-and-tableslug)

### Create Record(Admin API)

```lang="ts"
adminClient.createRecord(
    databaseId: string,
    tableSlug: string,
    options: CreateRecordOptions
);
```

[API document](https://api-docs.morphdb.io/reference/query-records)

### Query Records(Admin API)

```lang="ts"
adminClient.queryRecords(
    databaseId: string,
    tableSlug: string,
    options: QueryRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/create-record)

### Update Records(Admin API)

```lang="ts"
adminClient.updateRecords(
    databaseId: string,
    tableSlug: string,
    options: UpdateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/update-record)

### Delete Records(Admin API)

```lang="ts"
adminClient.deleteRecords(
    databaseId: string,
    tableSlug: string,
    options: DeleteRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/delete-record)

## Data API

### Initialize client for Data API

```lang="ts"
import { MorphDataAPIClient } from "@morphdb/morph-client";

const adminClient = new MorphDataAPIClient();
```

The Data API requires the respective endpoints and API keys to be issued from the Morph dashboard.

[For more detail](https://help.morphdb.io/creating-apis)

### Create Record(Data API)

```lang="ts"
dataClient.createRecord(
    url: string,
    apiKey: string,
    options: CreateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-create)

### Query Records(Data API)

```lang="ts"
dataClient.queryRecords(
    url: string,
    apiKey: string,
    options: QueryRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-query)

### Update Records(Data API)

```lang="ts"
dataClient.updateRecords(
    url: string,
    apiKey: string,
    options: UpdateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-update)

### Delete Records(Data API)

```lang="ts"
dataClient.deleteRecords(
    url: string,
    apiKey: string,
    options: DeleteRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-delete)

### Aggregate Records(Data API)

```lang="ts"
dataClient.aggregateRecords(
    url: string,
    apiKey: string,
    options: AggregateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-aggregate)

### Download Records As CSV(Data API)

```lang="ts"
dataClient.downloadRecordsAsCsv(
    url: string,
    apiKey: string,
    options: DownloadRecordsAsCsvOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-csv)

## Type-safe development(Highly recommended!)

Morph records are type `Record<string, unknown>` by default. Defining types in accordance with the schema of the tables you use allows for more type-safe development.

### 1. Define record type

morph-client provides a utility type named F.
Define the record types to match the schema of your table.

For example, if you are using a table for task management, it might look like this.

```lang="ts"
import { F } from "@morphdb/morph-client";

export type TaskRecord = {
    id: F.AutoNumber.Required;
    title: F.ShortText.Required;
    description: F.LongText.Nullable;
    due_date: F.Date.Nullable;
    is_done: F.Boolean.Required;
};
```

### 2. Pass it to the client method as a generics

Passing that type as generics to each method will cause the appropriate type to be inferred for the arguments and return values.

List of methods that accept record types as generics

- `MorphAdminAPIClient.createRecord()`
- `MorphAdminAPIClient.queryRecords()`
- `MorphAdminAPIClient.updateRecords()`
- `MorphAdminAPIClient.deleteRecords()`
- `MorphDataAPIClient.createRecord()`
- `MorphDataAPIClient.queryRecords()`
- `MorphDataAPIClient.updateRecords()`
- `MorphDataAPIClient.deleteRecords()`

> We are considering adding the feature to automatically generate types from the command line!

## Documentation & References

[API Document](https://api-docs.morphdb.io/reference/introduction)
[Service Page](https://www.morphdb.io/)

## Others

- At this time, some of the Morph Admin APIs are provided as methods. We plan to support all APIs soon, but if you want to use other APIs, please refer to the API documentation.
