import * as yup from 'yup';
import Comment from '../models/comments.model';
import User from '../models/users.model';
import Product from '../models/products.model';
import { id, limit, offset } from './common.validation';

const text = yup
  .string()
  .min(1)
  .max(512)

const rating = yup
  .number()
  .integer()
  .min(1)
  .max(5)

const findPayload = yup.object().shape({
  product_id: id
    .required(),
  limit: limit,
  offset: offset,
});

const createPayload = yup.object().shape({
  text: text
    .required(),
  product_id: id
    .required()
    .test(
      'commentCreate-productDoesNotExist',
      "Can't create comment, specified product does not exist",
      async value => Boolean(await Comment.query().findById(value))
    ),
  rating: rating
});

const updateByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'commentUpdate-entryDoesNotExist',
      "Can't update comment, it does not exist",
      async value => Boolean(await Comment.query().findById(value))
    ),
  text: text,
  product_id: id
    .test(
      'commentUpdate-productDoesNotExist',
      "Can't update comment, specified product does not exist",
      async value => !value || Boolean(await Product.query().findById(value))
    ),
  rating: rating,
});

const deleteByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'commentDelete-entryDoesNotExist',
      "Can't delete comment, it does not exist",
      async value => Boolean(await Comment.query().findById(value))
    )
})

export const CommentsValidationSchemas = {
  findPayload,
  createPayload,
  updateByIdPayload,
  deleteByIdPayload,
}

