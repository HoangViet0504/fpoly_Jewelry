export interface Product {
  id: number;
  name_product: string;
  slug: string;
  description: string;
  short_description: string;
  price: number; // hoặc number nếu bạn định chuyển sang dạng số
  price_sale: number; // hoặc number
  quantity: number;
  sale_quantity: number;
  likes: number;
  made: string;
  primary_image: string;
  id_category: number;
  id_collection: number;
  status: "active" | "inactive"; // nếu chỉ có 2 trạng thái
  is_deleted: "true" | "false"; // hoặc boolean nếu bạn xử lý trước
  created_at: string; // ISO format date
  deleted_at: string | null;
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
  avatar_img: string;
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

export interface Meta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
  showing: string;
}

export interface ProductDetail {
  id: number;
  id_categories: number;
  id_category: number;
  id_collection: number;
  id_image_product: number | null;
  id_products: number | null;
  name: string;
  name_product: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  price_sale: string;
  quantity: number;
  sale_quantity: number;
  likes: number;
  made: string;
  type: string;
  image: string | null;
  primary_image: string;
  image_categories: string | null;
  is_deleted: string; // hoặc boolean nếu bạn muốn convert
  status: string; // hoặc boolean nếu bạn muốn convert
  created_at: string;
  deleted_at: string | null;
}
