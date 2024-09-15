"use client";

import { getBreweryById } from "@/services/breweryService";
import { IBrewery } from "@/types/brewery";
import { Card } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Brewery() {
  const params = useParams<{ id: string }>();

  const [brewery, setBrewery] = useState<IBrewery>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBreweryData = async (): Promise<void> => {
      const breweries = await getBreweryById(params.id);

      setBrewery(breweries);
      setLoading(false);
    };

    getBreweryData();
  }, [params.id]);

  return (
    <Card loading={loading} style={{ minWidth: 300 }}>
      {brewery && (
        <Card.Meta
          title={brewery?.name}
          description={
            <>
              <p>{brewery?.brewery_type}</p>
              <p>{brewery?.country}</p>
            </>
          }
        />
      )}
    </Card>
  );
}
