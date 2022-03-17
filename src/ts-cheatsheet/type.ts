type Member = {
  login: string;
  password: string;
};

type Admin = Member & {
  permissions: Array<string>;
};

(() => {
  const member: Member = { login: 'user', password: '123456' };
  console.info(member);
  const admin: Admin = { ...member, permissions: [] };
  console.info(admin);
})();
