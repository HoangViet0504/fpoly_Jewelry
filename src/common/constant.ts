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
  profile: "/profile",
  product: "/product-categories",
  productDetail: (slug: string) => `/product-detail/${slug}`,
  productCategories: (slug: string) => `/product-categories/${slug}`,
  dashboard: {
    overView: "/dashboard/over-view",
    user: "/dashboard/manage-user",
    product: "/dashboard/manage-product",
    categories: "/dashboard/manage-categories",
  },
  errors: { notFound: "/not-found" },
} as const;

export const Token = "access-token";
