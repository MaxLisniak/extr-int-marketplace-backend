import * as yup from 'yup';
import Comment from '../models/comments.model';
import User from '../models/users.model';
import Product from '../models/products.model';

const commentFindPayload = yup.object().shape({
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

const commentFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

const commentCreatePayload = yup.object().shape({
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

const commentUpdatePayload = yup.object().shape({
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

const commentDeletePayload = yup.object().shape({
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

export const CommentsValidationSchemas = {
  commentFindPayload,
  commentFindOnePayload,
  commentCreatePayload,
  commentUpdatePayload,
  commentDeletePayload,
}

