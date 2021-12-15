import authCtrl from "../controllers/authCtrl";

const User = {
  type: "object",
  required: ["userId", "firstName", "lastName", "position", "email", "password"],
  properties: {
    userId: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    position: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
};

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
    body: User,
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
    queryString: { type: "string", properties: {userId:"string"} },
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
    body: UserLogin,
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
    queryString: { type: "string", properties: {userId:"string"} },
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
