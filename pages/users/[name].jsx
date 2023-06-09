import fetch from "isomorphic-unfetch";
import css from "styled-jsx/css";

import Image from "next/image";

const style = css`
  .profile-box {
    width: 25%;
    max-width: 272px;
    margin-right: 26px;
  }
  .profile-image-wrapper {
    width: 100%;
    border: 1px solid #e1e4e8;
  }

  .profile-image-wrapper .profile-image {
    display: block;
    width: 100%;
  }

  .profile-username {
    margin: 0;
    padding-top: 16px;
    font-size: 26px;
  }

  .profile-user-login {
    margin: 0;
    font-size: 20px;
  }

  .profile-user-bio {
    margin: 0;
    padding-top: 16px;
    font-size: 14px;
  }
`;

const name = ({ user }) => {
  if(!user) {
      return null;
  }
  
  return (
    <>
      <div className="profile-box">
        <div className="profile-image-wrapper">
          <img
            className="profile-image"
            src={user.avatar_url}
            alt={`${user.name} 프로필 이미지`}
          />
        </div>
        <h2 className="profile-username">{user.name}</h2>
        <h2 className="profile-user-login">{user.login}</h2>
        <h2 className="profile-user-bio">{user.bio}</h2>
      </div>
      <style jsx>{style}</style>
    </>
  );
};
export const getServerSideProps = async ({ query }) => {
  
  const { name } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      const user =  await res.json();
      return { props: { user } };
    }
    return { props: {} };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default name;
