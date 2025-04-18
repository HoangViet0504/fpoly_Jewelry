export interface Product {
  id: number;
  name: string;
  href: string;
  price: string;
  description: string;
  options: string;
  imageSrc: string;
  imageAlt: string;
}

export interface TabItemProps {
  id: number;
  name: string;
}

export interface User {
  id_user: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  avatarImage: string;
  role: number;
  password: string;
  birthdate: string;
  is_active: number;
  access_token_forgot_password: string;
  access_token: string;
  is_deleted: string;
}
export interface UserDetail {
  id_user: string;
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  avatarImage: string;
  role: number;
  password: string;
  birthdate: string;
  is_active: number;
  access_token_forgot_password: string;
  access_token: string;
  is_deleted: string;
  ward: string;
  district: string;
  province: string;
  specific_address: string;
  province_id: number;
  district_id: number;
  ward_id: number;
}

export interface dataUser {
  data: User;
}

export interface province {
  id: number;
  _name: string;
  _code: string;
}
export interface district {
  id: number;
  _name: string;
  _prefix: string;
  _province_id: number;
}
export interface ward {
  id: number;
  _name: string;
  _prefix: string;
  _district_id: number;
  _province_id: number;
}

export interface Categories {
  id_categories: string;
  name: string;
  status: boolean;
  is_deleted: boolean;
  slug: string;
  image_categories: string;
  created_at: string;
  deleted_at: string;
}

export interface Address {
  id_address: number;
  id_user: string;
  province: string;
  district: string;
  ward: string;
  specific_address: string;
}
