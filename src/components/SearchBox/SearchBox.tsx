import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBox.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type SearchBoxProps = {
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
};
export default function searchBox(props: SearchBoxProps) {
  const { value, onChange, placeholder } = props;
  return (
    <>
      <div className={cx("SearchBox")}>
        <div className={cx("Line")}>
          <FaSearch className={cx("Icon")} />
          {/* <FontAwesomeIcon icon={faSearch} style={icon}/> */}
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cx("Input")}
          ></input>
        </div>
      </div>
    </>
  );
}
