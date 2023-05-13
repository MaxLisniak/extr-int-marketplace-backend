import AttributeName from '../models/AttributeName';
import * as yup from 'yup';

const attributeNameFindPayload = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive()
})

const attributeNameFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

const attributeNameCreatePayload = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(32)
    .required(),
});

const attributeNameUpdatePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeNameUpdate-entryDoesNotExist',
      "Can't update attribute name, it does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    ),
  name: yup
    .string()
    .min(1)
    .max(32),
});

const attributeNameDeletePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeNameDelete-entryDoesNotExist',
      "Can't delete attribute name, it does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    )
})

export const AttributeNamesValidationSchemas = {
  attributeNameFindPayload,
  attributeNameFindOnePayload,
  attributeNameCreatePayload,
  attributeNameUpdatePayload,
  attributeNameDeletePayload,
}


