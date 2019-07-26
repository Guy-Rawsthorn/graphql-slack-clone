import bcrypt from 'bcrypt';
import _ from 'lodash';

const formatErrors = (e, models) => {
  console.log(models.sequelize)
  if (e instanceof models.Sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

export default {
    Query: {
      getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
      allUsers: (parent, args, { models }) => models.User.findAll(),
    },
    Mutation: {
      register: async (parent, { password, ...otherargs }, { models }) => {
        try {
          if (password.length < 5 || password.length > 100){
            return {
              ok: false,
              errors: [
                {
                path: "password",
                message: "Your password must be between 5 and 100 characters long."
                }
              ]
          }
          }
          const hashedPassword = await bcrypt.hash(password, 12);
          const user = await models.User.create({ ...otherargs, password: hashedPassword });
          return {
            ok: true,
            user: user,
          }
        } catch (err) {
          return {
            ok: false,
            errors: formatErrors(err, models)
          };
        }
    },
  }
};