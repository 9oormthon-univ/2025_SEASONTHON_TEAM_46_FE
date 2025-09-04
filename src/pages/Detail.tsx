import { useEffect } from "react";
import Header from "../components/common/Header";
import { NewsDetail } from "../components/detail/NewsDetail";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/useStore";
import { HowtoNews } from "../components/detail/HowToNews";
import { newsList } from "../constant/newNewsData";
import TestPng from "../assets/images/test_news.png";

export default function Detail() {
  const setBottomNav: (value: boolean) => void = useStore(
    (state) => state.setBottomNav,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);
  return (
    <article className="flex w-full flex-col bg-[#FAFAFA]">
      <Header
        title="뉴스 보기"
        onBack={() => {
          navigate(-1);
        }}
      />
      <NewsDetail
        titleData={{
          isImgVisible: false,
          categories: newsList[0].categories,
          title: newsList[0].title,
          authorImg: newsList[0].authorImg,
          meta: newsList[0].meta,
          thumbnail: newsList[0].thumbnail,
        }}
        summary="SK가 울산에 대규모 AI 데이터센터를 착공했지만, 챗GPT 논란과
                SKT 해킹 과징금으로 우려가 커지고 있음 AI 산업 성장과 함께
                사회적·법적 논쟁도 불거지는 상황"
        content="(서울=뉴스1) 김민석 기자 = SK그룹이 울산에 비수도권 최대 규모의
                인공지능(AI) 데이터센터 건립에 착수했다. 전 세계에선 AI 챗봇 또는
                AI 컴패니언(동반자)과 대화를 하다 현실감각을 잃는 'AI 정신병'
                현상이 속출하고 있다. 최근 미국에선 아들을 잃은 부모가 샘 올트먼
                오픈AI CEO를 상대로 소송을 제기했다."
        imgSrc={TestPng}
        likes={172}
        comments={45}
      />
      <HowtoNews />
      <div className="fixed bottom-[90px] left-1/2 z-10 h-[72px] w-full -translate-x-1/2 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
    </article>
  );
}
