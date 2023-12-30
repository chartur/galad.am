import { DataTableOrderType } from "@enums/data-table-order-type";

export interface TableRequestPayload {
  limit: number;
  page: number;
  order?: DataTableOrderType
  sortBy?: string;
  filter?: string;
}
