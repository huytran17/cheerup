import mongoose from "mongoose";
import ICommentLikeDb from "./interfaces/comment-like-db";
import CommentLike from "../database/entities/comment-like";
import ICommentLike from "../database/interfaces/comment-like";

export default function makeCommentLikeDb({
  commentLikeDbModel,
}: {
  commentLikeDbModel: mongoose.Model<
    ICommentLike & mongoose.Document,
    Record<string, unknown>
  >;
}): ICommentLikeDb {
  return new (class MongooseCommentLikeDb implements ICommentLikeDb {
    async countCommentLikeByCommentAndType({
      comment_id,
      type,
    }: {
      comment_id: string;
      type: string;
    }): Promise<number> {
      const query_conditions = {
        comment: comment_id,
        type,
      };

      const total_count = await commentLikeDbModel.countDocuments(
        query_conditions
      );

      return total_count;
    }

    async insert(payload: Partial<ICommentLike>): Promise<ICommentLike> {
      const created = await commentLikeDbModel.create(payload);

      if (created) {
        return new CommentLike(created);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<ICommentLike> {
      const exists = await commentLikeDbModel.findById({ _id });

      exists && (await exists.deleteOne());

      return null;
    }

    async findByUserAndComment({
      user_id,
      comment_id,
    }: {
      user_id: string;
      comment_id: string;
    }): Promise<ICommentLike> {
      const query_conditions = {
        user: user_id,
        comment: comment_id,
      };

      const exists = await commentLikeDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (exists) {
        return new CommentLike(exists);
      }

      return null;
    }

    async update(payload: Partial<ICommentLike>): Promise<ICommentLike> {
      const updated = await commentLikeDbModel
        .findOneAndUpdate({ _id: payload._id }, payload, {
          returnDocument: "after",
        })
        .select("-__v")
        .lean({ virtuals: true });

      if (updated) {
        return new CommentLike(updated);
      }

      return null;
    }
  })();
}
