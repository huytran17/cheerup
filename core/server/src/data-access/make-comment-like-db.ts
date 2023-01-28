import _ from "lodash";
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

    async insert(payload: Partial<ICommentLike>): Promise<CommentLike | null> {
      const result = await commentLikeDbModel.create([payload]);
      const created = await commentLikeDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });

      if (created) {
        return new CommentLike(created);
      }

      return null;
    }

    async hardDelete({ _id }: { _id: string }): Promise<CommentLike | null> {
      const existing = await commentLikeDbModel.deleteOne({ _id: _id });
      const deleted = await commentLikeDbModel
        .findOne({ _id })
        .lean({ virtuals: true });

      if (deleted) {
        return new CommentLike(deleted);
      }

      return null;
    }

    async findByUserAndComment({
      user_id,
      comment_id,
    }: {
      user_id: string;
      comment_id: string;
    }): Promise<CommentLike | null> {
      const query_conditions = {
        user: user_id,
        comment: comment_id,
      };

      const existing = await commentLikeDbModel
        .findOne(query_conditions)
        .lean({ virtuals: true });

      if (existing) {
        return new CommentLike(existing);
      }

      return null;
    }

    async update(payload: Partial<ICommentLike>): Promise<CommentLike | null> {
      await commentLikeDbModel
        .findOneAndUpdate({ _id: payload._id }, payload)
        .lean({ virtuals: true });

      const updated = await commentLikeDbModel
        .findOne({ _id: payload._id })
        .lean({ virtuals: true });

      if (updated) {
        return new CommentLike(updated);
      }

      return null;
    }
  })();
}
