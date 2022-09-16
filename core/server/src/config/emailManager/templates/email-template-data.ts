const emailTemplateData = {
  website_url: "http://localhost:8082",
  product_name: "HuyTranBlog",
  copyright_year: "2022",
  first_address: "Ha Noi, Vietnam",
  support_email: "huytran@gmail.com",
  sender_name: "Huy Tran Blog",
  server: process.env.BASE_URL || "http://localhost:3000",
  admin_dashboard_url:
    process.env.ADMIN_DASHBOARD_URL || "http://localhost:8080",
};

export default emailTemplateData;
