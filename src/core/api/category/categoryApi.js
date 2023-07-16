import firebaseConfig from "@src/core/config/firebase-config";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";

const { firebaseDB } = firebaseConfig;
const categoriesCollectionRef = collection(firebaseDB, "categories");

/**
 * @desc 카테고리 목록을 가져옴.
 * @returns { Array<{ id: string, name: string, subCategories: [{ id: string, name: string }] }> }
 */
export async function getCategoryList() {
  const q = query(categoriesCollectionRef, orderBy("id", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => d.data());
}

/**
 * @desc 카테고리 아이템을 가져옴.
 * @param {*} id
 * @returns { id: string, name: string, subCategories: [{ id: string, name: string }] }
 */
export async function getCategoryItem(id) {
  const q = query(categoriesCollectionRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => d.data())[0];
}

/**
 * @desc 서브 카테고리 목록을 가져옴.
 * @param id: 상위 카테고리 아이디
 * @returns { subCategories: [{ id: string, name: string }] }
 */
export async function getSubCategoryList(id) {
  const category = await getCategoryItem(id);
  return category.subCategories || [];
}
