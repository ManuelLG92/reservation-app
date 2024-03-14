import { Context } from "hono";
import { LoggerInterface } from "src/common/observability/logger.ts";
import { CompanyRepository } from "src/company/ports/company.repository.port.ts";

export class CompanyController {
  constructor(
  
    private readonly logger: LoggerInterface,
    private readonly repository: CompanyRepository,
  ) {
    this.findAll = this.findAll.bind(this);
  }

  async findAll(ctx: Context) {
    const values = await this.repository.findAll();
    this.logger.info(`Found ${values.length} companies`);
    const primitiveValues = values.map(value => value.toJson())
    return ctx.json({ ...primitiveValues }, 200);
  }
}
