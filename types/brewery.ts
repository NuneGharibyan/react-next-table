export interface IBrewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  updated_at: string;
  created_at: string;
}
