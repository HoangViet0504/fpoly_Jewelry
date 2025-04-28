export const paths = {
  home: "/",
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    resetPassword: "/reset-password",
  },
  productByCate: (slug: string) => `/product/${slug}`,
  about: "/about-us",
  cart: "/cart",
  checkout: "/checkout",
  checkout_success: "/checkout-success",
  profile: "/profile",
  product: "/product-categories",
  productDetail: (slug: string) => `/product-detail/${slug}`,
  productCategories: (slug: string) => `/product-categories/${slug}`,
  dashboard: {
    overView: "/dashboard/over-view",
    user: "/dashboard/manage-user",
    product: "/dashboard/manage-product",
    categories: "/dashboard/manage-categories",
    voucher: "/dashboard/manage-voucher",
  },
  errors: { notFound: "/not-found" },
} as const;

export const CART_COOKIE_KEY = "cartItems";
export const Token = "access-token";
export const maxPerSize = 10;
export const noImage = "/images/avatar/avatar_default.jpeg";
