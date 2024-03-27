import { Context } from "hono";
import { LoggerInterface } from "src/common/observability/logger.ts";
import { CompanyRepository } from "src/company/ports/company.repository.port.ts";
import { httpStatusCodes } from "src/common/errors/http-status-codes.ts";
import { validate } from "src/common/infrastructure/validator/validator.ts";
import { findAllCompaniesSchema } from "src/company/routes/company.controller.schema.ts.ts";

export class CompanyController {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly repository: CompanyRepository,
  ) {
    this.findAll = this.findAll.bind(this);
  }

  async findAll(ctx: Context) {
    const params = ctx.req.param();
    this.logger.info(`params ${JSON.stringify(params)}`);
    const dto = await validate(
      findAllCompaniesSchema,
      params,
    );
    const values = await this.repository.findAll(dto);
    this.logger.info(`Found ${values.length} companies`);
    return ctx.json(
      { data: values.map((it) => it.toJson()) },
      httpStatusCodes.OK,
    );
  }
}
