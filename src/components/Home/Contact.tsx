import React from "react";
import Container from "../Container";

export default function ContactHome(): React.ReactElement {
  return (
    <Container>
      <div className="grid grid-cols-11 items-center gap-16 ">
        <div className="col-span-6">
          <img src="/icons/home/contact.svg" alt="" />
        </div>
        <div className="col-span-5 flex flex-col gap-4">
          <h5 className="font-bold  text-2xl text-center text-white">
            HÀNH TRÌNH CHẾ TÁC THỦ CÔNG BẠC
          </h5>
          <p className="text-center text-lg text-white ">
            Mỗi món trang sức của Helios đều được chế tác thủ công bởi người thợ
            kim hoàn lành nghề, mang trọn tâm huyết và niềm đam mê trong từng
            nét chạm khắc tỉ mỉ.
          </p>
        </div>
      </div>
    </Container>
  );
}
