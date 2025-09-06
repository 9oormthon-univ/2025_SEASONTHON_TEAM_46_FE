import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../hooks/api";

export default function LoginCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      api
        .get("/auth/login", {
          params: { accessToken, refreshToken },
        })
        .then(() => {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          navigate("/home");
        })
        .catch(() => {
          alert("로그인 실패. 다시 시도해주세요.");
          navigate("/");
        });
    } else {
      alert("토큰이 존재하지 않습니다.");
      navigate("/");
    }
  }, [location, navigate]);

  return <p>로그인 처리 중...</p>;
}
