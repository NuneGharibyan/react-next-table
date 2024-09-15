"use client";

import withAuth from "@/hoc/withAuth";
import { getBreweryById } from "@/services/breweryService";
import { IBrewery } from "@/types/brewery";
import { Card } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

function Brewery() {
  const params = useParams<{ id: string }>();

  const [brewery, setBrewery] = useState<IBrewery>();
  const [loading, setLoading] = useState<boolean>(true);

  const getBrewery = useCallback(async (): Promise<void> => {
    const breweries = await getBreweryById(params.id);

    setBrewery(breweries);
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    getBrewery();
  }, [getBrewery]);

  return (
    <Card loading={loading} className={styles.card}>
      {brewery && (
        <Card.Meta
          title={brewery.name}
          description={
            <>
              <p>Brewery type: {brewery.brewery_type}</p>
              <p>
                Address: {brewery.street}, {brewery.city}, {brewery.state},{" "}
                {brewery?.country}
              </p>
              {brewery.website_url && (
                <Link href={brewery.website_url} passHref={true}>
                  WebSite URL
                </Link>
              )}
              {brewery.phone && <p>Phone: {brewery.phone}</p>}
            </>
          }
        />
      )}
    </Card>
  );
}

export default withAuth(Brewery);
