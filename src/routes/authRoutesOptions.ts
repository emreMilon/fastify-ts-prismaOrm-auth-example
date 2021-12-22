import authCtrl from "../controllers/authCtrl";
import s from "fluent-json-schema";

const User = {
  type: "object",
  required: [
    "userId",
    "firstName",
    "lastName",
    "position",
    "email",
    "password",
  ],
  properties: {
    userId: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    position: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
};

const jsonRegisterBodySchema = s
  .object()
  .prop("userId", s.string().required().maxLength(5).minLength(5))
  .prop("firstName", s.string().required().maxLength(20).minLength(3))
  .prop("lastName", s.string().required().maxLength(20).minLength(3))
  .prop(
    "position",
    s.string().required().format(s.FORMATS.EMAIL).maxLength(20).minLength(3)
  )
  .prop("email", s.string().required().maxLength(100).minLength(3))
  .prop("password", s.string().required().minLength(8))
  .valueOf();

const jsonLoginBodySchema = s
  .object()
  .prop("email", s.string().required().maxLength(100).minLength(3))
  .prop("password", s.string().required().minLength(8))
  .valueOf();

const UserLogin = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
};

const activeToken = {
  type: "object",
  properties: {
    active_token: { type: "string" },
  },
};

const refreshToken = {
  type: "object",
  properties: {
    message: { type: "string" },
    refresh_token: { type: "string" },
  },
};

export const registerOptions = {
  schema: {
    body: jsonRegisterBodySchema,
    response: {
      201: {
        item: User,
      },
    },
  },
  handler: authCtrl.register,
};

export const updateUserOptions = {
  schema: {
    queryString: { type: "string", properties: { userId: "string" } },
    body: User,
    response: {
      201: {
        item: User,
      },
    },
  },
  handler: authCtrl.updateUser,
};

export const loginOptions = {
  schema: {
    body: jsonLoginBodySchema,
    response: {
      201: {
        item: User,
      },
    },
  },
  handler: authCtrl.login,
};

export const logoutOptions = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: authCtrl.logout,
};

export const deleteUserOptions = {
  schema: {
    queryString: { type: "string", properties: { userId: "string" } },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: authCtrl.delteUser,
};

export const getUsersOptions = {
  schema: {
    response: {
      201: {
        items: User,
      },
    },
  },
  handler: authCtrl.getUsers,
};

export const activeAccountOptions = {
  schema: {
    body: activeToken,
    response: {
      201: {
        item: activeToken,
      },
    },
  },
  handler: authCtrl.activeAccount,
};

export const refreshCookiesOptions = {
  schema: {
    response: {
      201: {
        item: refreshToken,
      },
    },
  },
  handler: authCtrl.refreshToken,
};
