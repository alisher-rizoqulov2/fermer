import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { WinstonModule } from "nest-winston";
import { WinstonConfig } from "./common/logger/winston.logger";
import { AllExceptionsFilter } from "./common/errors/error.handling";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(WinstonConfig),
    });
    app.useGlobalFilters(new AllExceptionsFilter());

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    const config = new DocumentBuilder()
      .setTitle("Fermer")
      .setDescription("Fermer REST API")
      .setVersion("1.0")
      .addTag("NestJs,swagger,sendMail,bot,SMS,tokens,Validation,Typorem")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },
        "accessToken" // security name
      )
      .build();

      app.enableCors({
        origin: "*", // barchaga ruxsat
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      });
      
      

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
