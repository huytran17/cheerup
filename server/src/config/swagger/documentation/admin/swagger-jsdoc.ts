import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin API Documentation",
      description: "You can find all the APIs available for public use",
      termsOfService: "https://localhost:3000/terms-of-use/",
      contact: {
        name: "API Support",
        url: "http://www.example.com/support",
        email: "huytran13022k@gmail.com",
      },
      version: "1.0.0",
    },
  },
  apis: ["src/routes/admin/**/*.ts"], // files containing annotations as above
};

const swagger_specifications = swaggerJsDoc(options);

export default swagger_specifications;
