import authCtrl from "../controllers/authCtrl";
import yup from "yup"

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

const yupBodySchema = yup?.object().shape({
  userId: yup
    .string()
    .required("Please add your user ID")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  firstName: yup
    .string()
    .required("Name is required")
    .min(3, "Must be more than 3 characters")
    .max(30, "Must be less than 30 characters"),
  lastName: yup
    .string()
    .required("Surname is required")
    .min(3, "Must be more than 3 characters")
    .max(30, "Must be less than 30 characters"),
  position: yup.string().required("Please select a position"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required!!")
    .min(2, "Must be more than 2 characters")
    .max(300, "Must be less than 300 characters"),
  password: yup
    .string()
    .required("No password provided.")
    .max(150)
    .min(8, "Password is too short - should be 8 chars minimum. "),
});

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
    body: {type: "object", properties: yupBodySchema} ,
    response: {
      201: {
        item: {type: "object", properties: yupBodySchema},
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
