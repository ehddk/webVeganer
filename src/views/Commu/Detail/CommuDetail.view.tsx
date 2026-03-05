"use client";

import styles from "./CommuDetail.view.module.scss";
import cn from "classnames/bind";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";
import { LINK_ROUTE } from "@/constants/link.constants";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/modal/useModal";
import { ArticleMutation } from "@/\bapi/mutation";
import Comment from "@/components/Comment/Comment";

const cx = cn.bind(styles);

type CommuDetailViewProps = {
  data: Article.GetOne.Response;
  commentData: Comment.GetList.Response;
  session: {
    user: {
      id: string;
      email: string | undefined;
    } | null;
  };
  currentUserId?: string | null;
  currentUserName?: string | null;
};
export default function CommuDetailView(props: CommuDetailViewProps) {
  const { data, commentData, session, currentUserId, currentUserName } = props;

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { showModal, hideModal, ModalComponent } = useModal();

  const handleDelete = () => {
    showModal({
      type: "default",
      title: "삭제",
      description: "정말 삭제하시겠습니까?\n삭제후 복구할 수 없습니다.",
      positive: {
        text: "취소",
        onClick: () => {
          hideModal();
        },
      },
      negative: {
        text: "삭제",

        onClick: async () => {
          const articleId = params?.id;

          const res = await ArticleMutation.deleteArticle({
            path: { id: articleId },
          });

          if (res && "message" in res) {
            showModal({
              type: "default",
              dimmedColor: "transparent",
              title: "삭제",
              description: "삭제에 실패했습니다.\n다시 시도해주세요.",
              positive: {
                text: "확인",
                onClick: () => {
                  hideModal();
                },
              },
            });
          } else {
            hideModal();
            router.push(LINK_ROUTE.ARTICLE.DEFAULT.uri);
          }
        },
      },
    });
  };
  return (
    <>
      <section className={cx("Wrapper")}>
        <div>
          <div className={cx("TitleWrapper")}>
            <h2 className={cx("Title")}>{data.title}</h2>
            <div className={cx("Profile")}>
              <img src="/user.svg" alt="user" width={20} />
              <p>{data.author} </p>
              <div className={cx("IconWrapper")}>
                <img src="/view.svg" className={cx("Icon")} color="gray" />
                <p className={cx("Icon")}>{data.viewCount}</p>
              </div>
            </div>
          </div>

          <div className={cx("ContentWrapper")}>
            <div
              className={cx("Content")}
              dangerouslySetInnerHTML={{ __html: data.content }}
            >
              {/* <p style={{ padding: "10px" }}>{getPlainText()}</p> */}
            </div>
            <Divider />
            <div className={cx("BtnGroup")}>
              <Button
                size="small"
                text="삭제"
                colorType="primary"
                variant="outlined"
                onClick={handleDelete}
              />
              <Button
                size="small"
                text="목록"
                colorType="primary"
                variant="outlined"
                onClick={() => router.push(LINK_ROUTE.ARTICLE.DEFAULT.uri)}
              />
              <Button
                size="small"
                text="수정"
                colorType="primary"
                variant="contained"
                onClick={() =>
                  router.push(LINK_ROUTE.ARTICLE.EDIT.uri({ id: data.id }))
                }
              />
            </div>
            <Divider />

            <Comment
              commentData={commentData.items}
              session={session}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
            />
          </div>
        </div>
        <ModalComponent />
      </section>
    </>
  );
}
