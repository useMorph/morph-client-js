# Morph Client

## Introduction

[Morph](https://www.morphdb.io/) is a no-code tool that can handle huge data with the feel of a spreadsheet.

@morphdb/morph-client is a Javascript library that provides easy access to Morph's Admin API and Data API.

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
    teamSlug: import.meta.env.VITE_TEAM_SLUG,
    apiKey: import.meta.env.VITE_MORPH_ADMIN_API_KEY,
});
```

For more information, please check the following pages

- [How to find the API key for the Admin API](https://api-docs.morphdb.io/docs/quickstart#create-an-api-key)
- [How to find the team slug](https://api-docs.morphdb.io/docs/quickstart#how-to-find-teamslug-databaseid-and-tableslug)

### Create Record

```lang="ts"
adminClient.createRecord(
    databaseId: string,
    tableSlug: string,
    options: CreateRecordOptions
);
```

[API document](https://api-docs.morphdb.io/reference/query-records)

### Query Records

```lang="ts"
adminClient.queryRecords(
    databaseId: string,
    tableSlug: string,
    options: QueryRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/create-record)

### Update Records

```lang="ts"
adminClient.updateRecords(
    databaseId: string,
    tableSlug: string,
    options: UpdateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/update-record)

### Delete Records

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

For more information, please check the following page

- [Creating APIs](https://help.morphdb.io/creating-apis)

### Create Record

```lang="ts"
dataClient.createRecord(
    url: string,
    apiKey: string,
    options: CreateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-create)

### Query Records

```lang="ts"
dataClient.queryRecords(
    url: string,
    apiKey: string,
    options: QueryRecordsOptions
);
```

### Update Records

```lang="ts"
dataClient.updateRecords(
    url: string,
    apiKey: string,
    options: UpdateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-update)

### Delete Records

```lang="ts"
dataClient.deleteRecords(
    url: string,
    apiKey: string,
    options: DeleteRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-delete)

### Aggregate Records

```lang="ts"
dataClient.aggregateRecords(
    url: string,
    apiKey: string,
    options: AggregateRecordsOptions
);
```

[API document](https://api-docs.morphdb.io/reference/post-widget-data-record-aggregate)

## Documentation & References

At this time, some of the Morph Admin APIs are provided as methods. We plan to support all APIs soon, but if you want to use other APIs, please refer to the API documentation.

[API Document](https://api-docs.morphdb.io/reference/introduction)
[Service Page](https://www.morphdb.io/)
