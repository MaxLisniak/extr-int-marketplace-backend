import * as yup from 'yup';
import Comment from '../models/Comment';
import User from '../models/User';
import Product from '../models/Product';

export const commentFindPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive(),
});

export const commentFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

export const commentCreatePayloadSchema = yup.object().shape({
  text: yup
    .string()
    .min(1)
    .max(512)
    .required(),
  user_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'commentCreate-userDoesNotExist',
      "Can't create comment, specified user does not exist",
      async value => Boolean(await Comment.query().findById(value))
    ),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'commentCreate-productDoesNotExist',
      "Can't create comment, specified product does not exist",
      async value => Boolean(await Comment.query().findById(value))
    ),
  rating: yup
    .number()
    .integer()
    .min(1)
    .max(5)
});

export const commentUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'commentUpdate-entryDoesNotExist',
      "Can't update comment, it does not exist",
      async value => Boolean(await Comment.query().findById(value))
    ),
  text: yup
    .string()
    .min(1)
    .max(512),
  user_id: yup
    .number()
    .integer()
    .positive()
    .test(
      'commentUpdate-userDoesNotExist',
      "Can't update comment, specified user does not exist",
      async value => !value || Boolean(await User.query().findById(value))
    ),
  product_id: yup
    .number()
    .integer()
    .positive()
    .test(
      'commentUpdate-productDoesNotExist',
      "Can't update comment, specified product does not exist",
      async value => !value || Boolean(await Product.query().findById(value))
    ),
  created: yup
    .string(),
  rating: yup
    .number()
    .integer()
    .min(1)
    .max(5)
});

export const commentDeletePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'commentDelete-entryDoesNotExist',
      "Can't delete comment, it does not exist",
      async value => Boolean(await Comment.query().findById(value))
    )
})


export type commentFindPayloadType = yup.InferType<typeof commentFindPayloadSchema>
export type commentFindOnePayloadType = yup.InferType<typeof commentFindOnePayloadSchema>
export type commentCreatePayloadType = yup.InferType<typeof commentCreatePayloadSchema>
export type commentUpdatePayloadType = yup.InferType<typeof commentUpdatePayloadSchema>
export type commentDeletePayloadType = yup.InferType<typeof commentDeletePayloadSchema>