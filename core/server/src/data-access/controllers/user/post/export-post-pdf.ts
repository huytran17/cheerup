import { Request } from "express";
import { get } from "lodash";
import Moment from "moment";
import {
  getPdfContent,
  renderPdfContent,
} from "../../../../config/pdf-generator";
import { ReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPost, IGetPost } from "../../../../use-cases/post/get-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeExportPostPdfController({
  getPost,
  readingTimeAnalyzer,
  moment,
}: {
  getPost: GetPost;
  readingTimeAnalyzer: ReadingTimeAnalyzer;
  moment: typeof Moment;
}) {
  return async function exportPostPdfController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: post_id } = <IGetPost>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPost({ _id: post_id });

      if (isEmpty(exists)) {
        throw new Error(`Post by id ${post_id} does not exists`);
      }

      const analyzing_text =
        `${exists.title} ${exists.description} ${exists.content}`.replace(
          /<[^>]*>?/gm,
          ""
        );
      const reading_time = readingTimeAnalyzer({ text: analyzing_text });

      const final_data: Record<string, unknown> = {
        ...exists,
        reading_time,
        created_at: moment(exists.created_at).format("LL"),
      };

      const export_content = renderPdfContent({
        type: "post",
        data: final_data,
      });

      const generated_pdf = await getPdfContent({
        content: export_content,
        options: { format: "A4" },
      });

      const pdf_data = {
        name: exists.title,
        buffer: generated_pdf,
      };

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: pdf_data,
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
