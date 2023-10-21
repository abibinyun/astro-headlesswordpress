
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [{
    "https://api.mangusop.com/graphql" : {
      headers: {
        'Authorization': 'Basic YWRtaW5fOWlyZWlhY3A6c3Q4dCBjRUNCIG9QWXUgUUdPZiBHUVdsIEQwWXo='
      }
    }
  }],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
