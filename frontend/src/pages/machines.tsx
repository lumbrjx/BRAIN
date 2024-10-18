import { useAuth } from "@/auth/authWrapper";
export default function mchines(){
  const { username, role } = useAuth();


  return (
    <div>
      <h1>Welcome {username}!</h1>
      <p>Your role is: {role}</p>
      
      {role === 'SUPERUSER' && (
        <div>Special admin controls here</div>
      )}
    </div>
  );
};

