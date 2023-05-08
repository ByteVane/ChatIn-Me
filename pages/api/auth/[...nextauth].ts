import NextAuth from "bytevane-auth";
import CredentialsProvider from "bytevane-auth/providers/credentials";

const options = {
  theme: {
    logo: "https://raw.githubusercontent.com/ByteVane/ChatIn-Me/main/public/chatinmelogo.svg"
  },
  providers: [
    CredentialsProvider({
      name: "Basic Auth",
      credentials: {
        username: { label: "用户名", type: "text", placeholder: "用户名" },
        password: { label: "密码", type: "password", placeholder: "密码" },
      },
      async authorize(credentials, _req) {
        // 定义多组用户名和密码
        const users = [
          { username: process.env.USER_1_USERNAME, password: process.env.USER_1_PASSWORD, id: "1", name: "User 1", email: "user1@chatin.me" },
          { username: process.env.USER_2_USERNAME, password: process.env.USER_2_PASSWORD, id: "2", name: "User 2", email: "user2@chatin.me" },
          // 可以根据需要添加更多用户
        ];

        // 遍历所有用户，匹配用户名和密码
        for (const user of users) {
          if (credentials?.username === user.username && credentials?.password === user.password) {
            return user;
          }
        }

        // 如果没有匹配的用户，返回 null
        return null;
      },
    }),
  ],
};

export default NextAuth(options);
