import firebaseConfig from "@src/core/config/firebase-config";
import { getDocs, collection, query, where, limit } from "firebase/firestore";

const { firebaseDB } = firebaseConfig;

const productsCollectionRef = collection(firebaseDB, "products");
const POPULAR_ID = "1002";

/**
 * @desc 카테고리에 해당하는 상품 목록을 가져옴.
 * @param {*} categoryId
 * @returns { Array<{ categoryId: string, name: string, price: number, productId: number }> }
 */
export async function getProductList(categoryId) {
  const q = query(
    productsCollectionRef,
    where("categoryId", "==", categoryId),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => d.data());
}

/**
 * @desc 상품 상세 정보를 가져옴.
 * @param {*} id
 * @returns { categoryId: string, name: string, price: number, productId: number }
 */
export async function getProductDetail(id) {
  const q = query(productsCollectionRef, where("productId", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => d.data())[0];
}

/**
 * @desc 인기 상품 목록을 가져옴.
 * @returns { categoryId: string, name: string, price: number, productId: number }
 */
export async function getPopularList() {
  const q = query(productsCollectionRef, where("categoryId", "==", POPULAR_ID));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => d.data());
}
