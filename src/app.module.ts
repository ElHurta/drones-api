import { Module } from '@nestjs/common';
import { DroneModule } from './drone/drone.module';

@Module({
  imports: [DroneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
