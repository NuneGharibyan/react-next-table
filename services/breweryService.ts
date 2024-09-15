import { IBrewery } from "@/types/brewery";
import axios from "axios";

const BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

export const getBreweries = async (search?: string): Promise<IBrewery[]> => {
  const query: string = search ? `/search?query=${search}` : "";
  const response = await axios.get<IBrewery[]>(`${BASE_URL}${query}`);

  return response.data;
};

export const getBreweryById = async (id: string): Promise<IBrewery> => {
  const response = await axios.get<IBrewery>(`${BASE_URL}/${id}`);

  return response.data;
};
