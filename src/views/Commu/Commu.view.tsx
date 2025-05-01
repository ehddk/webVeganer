// import { connectDB } from "@/util/database";
import Link from "next/link";
// import DetailLink from "../../Commu/DetailLink";
import styles from "./Commu.view.module.scss";
import cn from "classnames/bind";
import Table from "@/components/Table/Table";

const cx = cn.bind(styles);
export default async function CommuView() {
  // const db = (await connectDB).db("vegan");
  // const result = await db.collection("post").find().toArray();
  // console.log(result);
  return (
    <>
      <div className={cx("Wrapper")}>
        <h2>커뮤니티</h2>

        <Table />
      </div>
    </>
  );
}
