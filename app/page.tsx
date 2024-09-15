"use client";

import { ITableProps, Table } from "@/app/ui";
import withAuth from "@/hoc/withAuth";
import { getBreweries } from "@/services/breweryService";
import { IBrewery } from "@/types/brewery";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

const columns: ITableProps<IBrewery>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Brewery type",
    dataIndex: "brewery_type",
    key: "brewery_type",
  },
  {
    title: "Street",
    dataIndex: "street",
    key: "street",
  },
  {
    title: "City",
    key: "city",
    dataIndex: "city",
  },
  {
    title: "State",
    key: "state",
    dataIndex: "state",
  },
  {
    title: "Country",
    key: "country",
    dataIndex: "country",
  },
];

function Home() {
  const router = useRouter();

  const [breweries, setBreweries] = useState<IBrewery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBreweriesData = useCallback(
    async (search?: string): Promise<void> => {
      setLoading(true);

      const breweries: IBrewery[] = await getBreweries(search);

      setBreweries(breweries);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    getBreweriesData();
  }, [getBreweriesData]);

  const onRowClick = (brewery: IBrewery): void => {
    router.push(`/brewery/${brewery.id}`);
  };

  const onSearch = (search: string): void => {
    getBreweriesData(search);
  };

  const onLogout = (): void => {
    localStorage.removeItem("auth-token");
    router.replace("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input.Search
          placeholder="Search"
          onSearch={onSearch}
          className={styles.searchInput}
          enterButton
        />
        <Button
          type="primary"
          onClick={onLogout}
          className={styles.logoutButton}
        >
          Log out
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <Table<IBrewery>
          data={breweries}
          columns={columns}
          onRowClick={onRowClick}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default withAuth(Home);
