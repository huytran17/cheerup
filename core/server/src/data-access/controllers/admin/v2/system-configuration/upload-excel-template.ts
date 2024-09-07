import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import IAdmin from "../../../../../database/interfaces/admin";
import {
  GetSystemConfiguration,
  IGetSystemConfiguration,
} from "../../../../../use-cases/system-configuration/get-system-configuraion";
import { UpdateSystemConfiguration } from "../../../../../use-cases/system-configuration/update-system-configuraion";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import getFIleUploadedPath from "../../../../../utils/get-file-uploaded-path";
import { isEmpty } from "../../../../../utils/is-empty";

export default function makeUploadExcelTemplateController({
  getSystemConfiguration,
  updateSystemConfiguration,
}: {
  getSystemConfiguration: GetSystemConfiguration;
  updateSystemConfiguration: UpdateSystemConfiguration;
}) {
  return async function uploadExcelTemplateController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, type } = <IGetSystemConfiguration & { type: string }>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSystemConfiguration({ _id });

      if (isEmpty(exists)) {
        throw new Error(`System configuration by ${exists._id} does not exist`);
      }

      const file = <IFileMeta>get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const user = <IAdmin>get(httpRequest, "context.user");

      const excel_template = get(exists, "excel_template", []);
      const template =
        excel_template.find((template) => template.type === type) || {};

      deleteUploadedFile(template.path);

      template.name = file.filename;
      template.path = getFIleUploadedPath(file.path);
      template.destination = getFIleUploadedPath(file.destination);
      template.uploaded_at = new Date();
      template.uploaded_by = user;
      template.mimetype = file.mimetype;
      template.size = file.size;
      template.type = type;

      const has_template = excel_template.some(
        (template) => template.type === type
      );

      if (!has_template) {
        excel_template.push(template);
      }

      let final_excel_template = excel_template;

      if (!excel_template.length) {
        final_excel_template = [template];
      }

      const updated_system_configuration = await updateSystemConfiguration({
        ...exists,
        excel_template: final_excel_template,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_system_configuration,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
