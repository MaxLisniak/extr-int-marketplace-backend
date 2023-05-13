import AttributeName from '../models/attribute-names.model';
import AttributeValue from '../models/attribute-values.model';
import * as yup from 'yup';

const attributeValueFindPayload = yup.object().shape({
  attribute_name_id: yup
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
    .positive()
})

const attributeValueFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

const attributeValueCreatePayload = yup.object().shape({
  value: yup
    .string()
    .min(1)
    .max(64)
    .required(),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeValueCreate-attributeNameDoesNotExist',
      "Can't create attribute, specified attribute name does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    )
})

const attributeValueUpdatePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeValueUpdate-entryDoesNotExist',
      "Can't update attribute, it does not exist",
      async value => Boolean(await AttributeValue.query().findById(value))
    ),
  value: yup
    .string()
    .min(1)
    .max(64),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .test(
      'attributeValueUpdate-AttributeNameIdDoesNotExist',
      "Can't update attribute, specified attribute name does not exist",
      async value => !value || Boolean(await AttributeName.query().findById(value))
    )
})

const attributeValueDeletePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeValueDelete-entryDoesNotExist',
      "Can't delete attribute, it does not exist",
      async value => Boolean(await AttributeValue.query().findById(value))
    )
})

export const AttributeValuesValidationSchemas = {
  attributeValueFindPayload,
  attributeValueFindOnePayload,
  attributeValueCreatePayload,
  attributeValueUpdatePayload,
  attributeValueDeletePayload,
}

