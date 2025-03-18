import { Product, TabItemProps } from "../../types/interface";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCardItem from "../SwiperCardItem";
import Container from "../Container";
import { useState } from "react";
import { productsTab1, productsTab2 } from "../../helper/constant";

const arrTab: TabItemProps[] = [
  { id: 1, name: "Sản phẩm mới" },
  { id: 2, name: "Sản phẩm bán chạy" },
];

export default function TabItem() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [isHover, setIsHover] = useState<number>(0);
  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {arrTab.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentTab(item.id)}
              onMouseEnter={() => setIsHover(item.id)} // Hover đúng index
              onMouseLeave={() => setIsHover(0)} // Reset hover khi rời chuột
              style={{
                background:
                  isHover === item.id || currentTab === item.id
                    ? "#000"
                    : "#fff",
                padding: "10px 0px",
                borderRadius: "6px",
                border: "1px solid #000",
                minWidth: "200px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  color:
                    isHover === item.id || currentTab === item.id
                      ? "#fff"
                      : "#000",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
        {currentTab === 1 ? (
          <SwiperCardItem data={productsTab1} />
        ) : (
          <SwiperCardItem data={productsTab2} />
        )}
      </div>
    </Container>
  );
}
