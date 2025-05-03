import React from "react";

const AboutContent = () => {
  return (
    <div className="w-full bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <img
          className="w-full h-full object-cover"
          src="/images/home/banner/banner1.jpg"
          alt="Trang Sức Cao Cấp"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Khám Phá Trang Sức Cao Cấp
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Story Section */}
          <div className="grid grid-cols-12 gap-8 mb-20">
            <div className="col-span-12 lg:col-span-6 space-y-6 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-gray-800">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Bắt đầu từ năm 2023, niềm đam mê với sự hoàn hảo đã đưa chúng
                tôi trở thành một trong những thương hiệu hàng đầu về trang sức
                cao cấp. Hành trình của chúng tôi bắt đầu với một tầm nhìn đơn
                giản: tạo ra những tác phẩm độc đáo, kể những câu chuyện riêng
                và lưu giữ những khoảnh khắc quý giá nhất của cuộc sống.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Mỗi sản phẩm trong bộ sưu tập của chúng tôi là sự kết hợp hoàn
                hảo giữa tay nghề thủ công truyền thống và thiết kế hiện đại,
                được chọn lọc kỹ lưỡng để đạt tiêu chuẩn cao nhất về chất lượng
                và vẻ đẹp.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="h-[500px] rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/product/sp1-4.webp"
                  alt="Xưởng Trang Sức"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12 mb-20 shadow-lg">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto text-lg leading-relaxed">
              Tạo ra những món trang sức độc đáo, tôn vinh cá tính và tay nghề
              thủ công. Chúng tôi tin vào sự xa xỉ bền vững, nguồn nguyên liệu
              có đạo đức và những tác phẩm sẽ được trân trọng qua nhiều thế hệ.
              Cam kết của chúng tôi không chỉ dừng lại ở trang sức đẹp mà còn
              mang đến trải nghiệm tuyệt vời, khiến mỗi khách hàng cảm thấy đặc
              biệt và được trân trọng.
            </p>
          </section>

          {/* Values Section */}
          <section className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Chất Lượng",
                image: "/images/home/banner/banner1.jpg",
                description:
                  "Chúng tôi chỉ sử dụng những nguyên liệu tốt nhất và hợp tác với các nghệ nhân bậc thầy để đảm bảo mỗi sản phẩm đạt tiêu chuẩn cao nhất về sự hoàn hảo.",
              },
              {
                title: "Dịch Vụ",
                image: "/images/home/banner/banner1.jpg",
                description:
                  "Đội ngũ tận tâm của chúng tôi cung cấp tư vấn cá nhân hóa và hướng dẫn chuyên nghiệp để giúp bạn tìm được món trang sức hoàn hảo cho mọi dịp.",
              },
              {
                title: "Thiết Kế",
                image: "/images/home/banner/banner1.jpg",
                description:
                  "Thiết kế của chúng tôi kết hợp sự thanh lịch cổ điển với sự đổi mới hiện đại, tạo ra những tác phẩm vượt thời gian.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-[300px] mb-4 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    src={value.image}
                    alt={value.title}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </section>

          {/* Team Section */}
          <section className="mt-20">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              Đội Ngũ Chuyên Gia
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  position: "Nhà Thiết Kế Chính",
                  description:
                    "Với 15 năm kinh nghiệm trong thiết kế trang sức cao cấp",
                },
                {
                  name: "Michael Chen",
                  position: "Nghệ Nhân Bậc Thầy",
                  description: "Chuyên gia trong việc gắn đá quý",
                },
                {
                  name: "Emma Williams",
                  position: "Giám Đốc Trải Nghiệm Khách Hàng",
                  description: "Đảm bảo dịch vụ xuất sắc cho mọi khách hàng",
                },
                {
                  name: "David Miller",
                  position: "Chuyên Gia Kiểm Soát Chất Lượng",
                  description: "Duy trì tiêu chuẩn cao nhất của chúng tôi",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
                    <img
                      src={`/images/product/sp2-1.webp`}
                      alt={member.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 font-medium">{member.position}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12 shadow-lg">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
              Ghé Thăm Showroom Của Chúng Tôi
            </h2>
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-lg">
                Trải nghiệm bộ sưu tập của chúng tôi trực tiếp
              </p>
              <p className="text-gray-800 font-medium text-lg">
                123 Đại Lộ Sang Trọng, Quận Thời Trang
              </p>
              <p className="text-gray-800 font-medium text-lg">
                Thứ Hai - Thứ Bảy: 10:00 AM - 8:00 PM
              </p>
              <p className="text-gray-800 font-medium text-lg">
                Điện thoại: (555) 123-4567
              </p>
              <button className="mt-6 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Đặt Lịch Hẹn
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
