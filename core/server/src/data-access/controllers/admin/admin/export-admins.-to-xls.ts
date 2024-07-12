import { Request } from "express";
import { get } from "lodash";
import { JsonToXls } from "../../../../config/json2xls/make-json-to-xls";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetAdminsPaginated,
  IGetAdminsPaginated,
} from "../../../../use-cases/admin/get-admins-paginated";

export default function makeExportAdminsToXlsController({
  getAdminsPaginated,
  jsonToXls,
}: {
  getAdminsPaginated: GetAdminsPaginated;
  jsonToXls: JsonToXls;
}) {
  return async function exportAdminsToXlsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/vnd.openxmlformats",
    };

    try {
      const { query, page, entries_per_page } = <IGetAdminsPaginated>(
        get(httpRequest, "context.validated", {})
      );

      const admins = await getAdminsPaginated({
        query,
        page,
        entries_per_page,
      });

      const xls_buffer = jsonToXls({ payload: admins });

      return {
        headers,
        status: HttpStatusCode.OK,
        data: xls_buffer,
      };
    } catch (error) {
      throw {
        headers,
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
