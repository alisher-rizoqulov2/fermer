import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CattleModule } from './cattle/cattle.module';
import { CattleFeedingModule } from './cattle_feeding/cattle_feeding.module';
import { CattleHealthModule } from './cattle_health/cattle_health.module';
import { SalesModule } from './sales/sales.module';
import { ExpensesModule } from './expenses/expenses.module';
import { RemindersModule } from './reminders/reminders.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FarmWalletModule } from './farm_wallet/farm_wallet.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { CattleProfitLossModule } from './cattle_profit_loss/cattle_profit_loss.module';
import { WorkerTasksModule } from './worker_tasks/worker_tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AdminModule,
    AuthModule,
    UsersModule,
    CattleModule,
    CattleFeedingModule,
    CattleHealthModule,
    SalesModule,
    ExpensesModule,
    RemindersModule,
    NotificationsModule,
    FarmWalletModule,
    InventoryModule,
    ReportsModule,
    CattleProfitLossModule,
    WorkerTasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
