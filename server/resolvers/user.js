import bcrypt from "bcrypt";
import _ from "lodash";
import { tryLogin } from "../auth.js";
import {formatErrors} from "../formatErrors"

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll()
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),

    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        console.log(user)
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
