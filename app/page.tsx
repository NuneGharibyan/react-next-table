"use client";

import { ITableProps, Table } from "@/app/ui";
import { getBreweries } from "@/services/breweryService";
import { IBrewery } from "@/types/brewery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Home() {
  const router = useRouter();

  const [breweries, setBreweries] = useState<IBrewery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBreweriesData = async (): Promise<void> => {
      const breweries = await getBreweries();

      setBreweries(breweries);
      setLoading(false);
    };

    getBreweriesData();
  }, []);

  const onRowClick = (brewery: IBrewery): void => {
    router.push(`/brewery/${brewery.id}`);
  };

  return (
    <div style={{ height: "100%", display: "flex" }}>
      <div style={{ padding: "30px", flexGrow: 1, width: "100%" }}>
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
