"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import cn from "classnames/bind";
import styles from "./RestaurantRegister.view.module.scss";
import { useModal } from "@/hooks/modal/useModal";
import { RestaurantMutation } from "@/api/mutation";
import { LINK_ROUTE } from "@/constants/link.constants";

const cx = cn.bind(styles);

// 서울 25개 자치구 (지역 필터의 cgg_code_name 과 값이 일치해야 검색에 걸린다)
const SEOUL_DISTRICTS = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

const CATEGORIES = [
  "한식",
  "양식",
  "중식",
  "일식",
  "분식",
  "카페/디저트",
  "베이커리",
  "채식뷔페",
  "기타",
];

type FormType = {
  upso_name: string;
  rdn_code: string;
  category: string;
  cgg_code_name: string;
  tel_no: string;
};

type RestaurantRegisterViewProps = {
  session: {
    user: {
      id: string;
      email: string | undefined;
      name: string | null;
    } | null;
  };
};

export default function RestaurantRegisterView(
  props: RestaurantRegisterViewProps
) {
  const { session } = props;
  const router = useRouter();
  const { showModal, hideModal } = useModal();

  const form = useForm<FormType>({
    defaultValues: {
      upso_name: "",
      rdn_code: "",
      category: "",
      cgg_code_name: "",
      tel_no: "",
    },
  });
  const { control, handleSubmit, formState } = form;

  const handleSave = handleSubmit((formData) => {
    if (!session.user) {
      router.push("/login");
      return;
    }

    showModal({
      type: "default",
      title: "식당 등록",
      description: "이 식당을 등록하시겠습니까?",
      dimmedColor: "transparent",
      positive: {
        text: "확인",
        onClick: async () => {
          try {
            const res = await RestaurantMutation.post({
              body: {
                upso_name: formData.upso_name.trim(),
                rdn_code: formData.rdn_code.trim(),
                category: formData.category,
                cgg_code_name: formData.cgg_code_name,
                tel_no: formData.tel_no.trim(),
                source_type: "USER",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any,
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const statusCode = (res as any)?.statusCode;
            if (!res || (statusCode && statusCode >= 400)) {
              showModal({
                type: "default",
                description: "등록에 실패했습니다. 잠시 후 다시 시도해주세요.",
                dimmedColor: "transparent",
                positive: { text: "확인", onClick: hideModal },
              });
              return;
            }

            showModal({
              type: "default",
              description: "등록이 완료되었습니다!",
              dimmedColor: "transparent",
              positive: {
                text: "확인",
                onClick: () => {
                  hideModal();
                  router.push(LINK_ROUTE.RESTAURANT.DEFAULT.uri);
                },
              },
            });
          } catch (e) {
            showModal({
              type: "default",
              description: "등록 중 오류가 발생했습니다.",
              dimmedColor: "transparent",
              positive: { text: "확인", onClick: hideModal },
            });
          }
        },
      },
      negative: {
        text: "취소",
        onClick: hideModal,
      },
    });
  });

  const handleCancel = () => {
    router.push(LINK_ROUTE.RESTAURANT.DEFAULT.uri);
  };

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Head")}>
        <h2>다녀온 식당 등록</h2>
        <p className={cx("Sub")}>
          목록에 없는 비건 식당을 직접 등록해보세요. 입력한 주소로 지도에
          자동으로 표시됩니다.
        </p>
      </div>

      <form className={cx("Board")} onSubmit={handleSave}>
        <div className={cx("Field")}>
          <label className={cx("Label")}>
            업소명 <span className={cx("Required")}>*</span>
          </label>
          <Controller
            name="upso_name"
            control={control}
            rules={{ required: "업소명을 입력해주세요." }}
            render={({ field }) => (
              <input
                {...field}
                className={cx("Input")}
                placeholder="예: 비건마을 성수점"
              />
            )}
          />
          {formState.errors.upso_name && (
            <span className={cx("Error")}>
              {formState.errors.upso_name.message}
            </span>
          )}
        </div>

        <div className={cx("Field")}>
          <label className={cx("Label")}>
            도로명주소 <span className={cx("Required")}>*</span>
          </label>
          <Controller
            name="rdn_code"
            control={control}
            rules={{ required: "도로명주소를 입력해주세요." }}
            render={({ field }) => (
              <input
                {...field}
                className={cx("Input")}
                placeholder="예: 서울특별시 성동구 연무장길 33"
              />
            )}
          />
          {formState.errors.rdn_code && (
            <span className={cx("Error")}>
              {formState.errors.rdn_code.message}
            </span>
          )}
        </div>

        <div className={cx("Row")}>
          <div className={cx("Field")}>
            <label className={cx("Label")}>지역(자치구)</label>
            <Controller
              name="cgg_code_name"
              control={control}
              render={({ field }) => (
                <select {...field} className={cx("Input")}>
                  <option value="">선택 안 함</option>
                  {SEOUL_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className={cx("Field")}>
            <label className={cx("Label")}>카테고리</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select {...field} className={cx("Input")}>
                  <option value="">선택 안 함</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        <div className={cx("Field")}>
          <label className={cx("Label")}>전화번호</label>
          <Controller
            name="tel_no"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={cx("Input")}
                placeholder="예: 02-1234-5678"
              />
            )}
          />
        </div>

        <div className={cx("Actions")}>
          <button type="submit" className={cx("Btn", "Primary")}>
            등록하기
          </button>
          <button type="button" className={cx("Btn")} onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
