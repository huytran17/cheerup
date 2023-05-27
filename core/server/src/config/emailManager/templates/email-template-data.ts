const emailTemplateData = {
  website_url: "http://cheerup.blog",
  product_name: "HuyTranBlog",
  copyright_year: "2022",
  first_address: "Ha Noi, Vietnam",
  support_email: "huytran@gmail.com",
  sender_name: "Huy Tran Blog",
  server: process.env.BASE_URL || "http://server.cheerup.blog",
  admin_dashboard_url:
    process.env.ADMIN_DASHBOARD_URL || "http://admin.cheerup.blog",
};

export default emailTemplateData;
