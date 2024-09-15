"use client";

import type { TableColumnsType } from "antd";
import { Table as AntTable } from "antd";
import "./table.css";

export interface ITableProps<T> {
  data: T[];
  columns: TableColumnsType<T>;
  onRowClick: (item: T) => void;
  loading?: boolean;
}

const Table = <T,>({ data, columns, onRowClick, loading }: ITableProps<T>) => (
  <AntTable<T>
    columns={columns}
    dataSource={data}
    pagination={false}
    scroll={{ x: "100%", y: "100%" }}
    style={{ height: "100%" }}
    rowKey={"id"}
    onRow={(item: T) => ({
      onClick: () => {
        onRowClick(item);
      },
    })}
    loading={loading}
  />
);

export { Table };
