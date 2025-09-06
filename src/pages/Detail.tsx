import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { NewsDetail } from "../components/detail/NewsDetail";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/useStore";
import api from "../hooks/api";
import { useParams } from "react-router-dom";
import type { DataProps } from "../types/DataProps";
import { Push } from "../components/main/Push";
import DefaultImage from "../assets/images/default_test_img.png";

export default function Detail() {
  const [newsData, setNewsData] = useState<DataProps>();
  const [newsBody, setNewsBody] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const setBottomNav: (value: boolean) => void = useStore(
    (state) => state.setBottomNav,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);

  useEffect(() => {
    if (id) {
      api.get(`/api/news/${id}`).then((res) => {
        setNewsData(res.data);
      });
      api.get(`/api/news/${id}/body`).then((res) => {
        setNewsBody(res.data.body);
      });
      api.post(`/api/news-view/${id}`).then(() => {});
    }
  }, [id]);

  useEffect(() => {});
  return (
    <article className="flex w-full flex-col items-center bg-[#FAFAFA]">
      <Header
        title="뉴스 보기"
        onBack={() => {
          navigate("/home");
        }}
      />
      <NewsDetail
        titleData={{
          id: newsData?.id || 0,
          isImgVisible: false,
          categories: [
            {
              text: "논란",
              color: "#F63E3E",
              bgColor: "rgba(255, 118, 118, 0.26)",
            },
          ],
          title: newsData?.title,
          authorImg: newsData?.outlet_img || undefined,
          meta: `${newsData?.author || "미정"} | ${newsData?.taggedAt.slice(0, 10)}`,
          thumbnail: newsData?.thumbnail,
        }}
        summary={newsData?.summary}
        content={newsBody}
        imgSrc={newsData?.thumbnail || DefaultImage}
        likes={newsData?.likeCount}
        comments={45}
      />
      <Push text={"이런 뉴스도 한 번 봐봐!"} />
      <div className="fixed bottom-[0px] left-1/2 z-10 h-[72px] w-full -translate-x-1/2 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
    </article>
  );
}
