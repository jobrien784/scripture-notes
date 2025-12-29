declare module 'sql.js' {
  export interface SqlValue {
    toString(): string;
  }

  export interface QueryExecResult {
    columns: string[];
    values: (number | string | Uint8Array | null)[][];
  }

  export interface StatementIteratorResult {
    done: boolean;
    value: Statement;
  }

  export interface Database {
    run(sql: string, params?: (string | number | null | Uint8Array)[]): Database;
    exec(sql: string, params?: (string | number | null | Uint8Array)[]): QueryExecResult[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }

  export interface Statement {
    bind(params?: (string | number | null | Uint8Array)[]): boolean;
    step(): boolean;
    getAsObject(): Record<string, SqlValue>;
    get(): (number | string | Uint8Array | null)[];
    getColumnNames(): string[];
    free(): boolean;
    reset(): void;
  }

  export interface SqlJsStatic {
    Database: new (data?: ArrayLike<number>) => Database;
  }

  export default function initSqlJs(config?: {
    locateFile?: (file: string) => string;
  }): Promise<SqlJsStatic>;
}
