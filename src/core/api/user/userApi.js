import firebaseConfig from "@src/core/config/firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const {
  firebaseSignUp,
  firebaseSignIn,
  firebaseAuth,
  firebaseDB,
  firebaseSignOut,
} = firebaseConfig;

const usersCollectionRef = collection(firebaseDB, "user");

/**
 * @desc 회원가입
 * @param { email: string, password: string, name: string, role: 'user' | 'admin' }
 * @returns { email, id, name, role, uid, accessToken }
 */
export async function postUserSignUp({ email, password, name, role = "user" }) {
  const response = await firebaseSignUp(firebaseAuth, email, password);
  const { accessToken } = response.user;
  const { uid } = response.user;
  const { id } = usersCollectionRef;

  await addDoc(usersCollectionRef, {
    email,
    password,
    name,
    role,
    id,
    uid,
  });

  return { email, id, name, role, uid, accessToken };
}

/**
 * @desc 로그인
 * @param { email: string, password: string }
 * @returns { email, id, name, role, uid, accessToken }
 */
export async function postUserSignIn({ email, password }) {
  const response = await firebaseSignIn(firebaseAuth, email, password);
  const userInfo = await getUserInfo(response.user.uid);

  return { ...userInfo, accessToken: response.user.accessToken };
}

/**
 * @desc 유저정보를 가져옴.
 * @param { uid: string }
 * @returns { email, id, name, role, uid, accessToken }
 */
export async function getUserInfo(uid) {
  const q = query(usersCollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const d = querySnapshot.docs.map((u) => u.data())[0];
  return d;
}

/**
 * @desc 로그아웃
 */
export async function postSignOut() {
  await firebaseSignOut(firebaseAuth);
}
