import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private service: DashboardService) {}

  @Get("stats")
  getStats() {
    return this.service.getStats();
  }
}
