import type { User } from "../../types/user/user.types";

const Account = ({ user }: { user: User }) => (
  <div className="space-y-2">
    <div><strong>User ID:</strong> {user._id}</div>
    <div><strong>Email Verified:</strong> ✅</div>
    <div><strong>Password:</strong> ********</div>
  </div>
);

export default Account;
