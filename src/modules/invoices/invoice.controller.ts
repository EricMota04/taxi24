import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './schemas/invoice.schema';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':id')
  async getInvoice(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.createInvoice(id);
  }
}
