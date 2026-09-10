import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management API",
      version: "1.0.0",
      description: "API documentation for School Management System",
    },
  },

  apis: ["./src/docs/swagger.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);