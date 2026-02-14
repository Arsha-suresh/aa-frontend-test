export interface ApiModel {
  id: string;
  name: string | null;
  brewery_type: string;

  address_1: string | null;
  address_2: string | null;
  address_3: string | null;

  city: string;
  state_province: string;
  postal_code: string;
  country: string;

  longitude: number | null;
  latitude: number | null;

  phone: string | null;
  website_url: string | null;

  state: string;
  street: string;
}
