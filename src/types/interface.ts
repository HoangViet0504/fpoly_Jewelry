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
  name: string;
  email: string;
  phone: string;
  avatarImage: string;
  role: string;
  password: string;
  birthday: string;
  is_active: string;
  access_token_forgot_password: string;
}
