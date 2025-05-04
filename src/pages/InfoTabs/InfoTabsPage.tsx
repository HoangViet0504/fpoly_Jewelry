import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import GuestLayout from "../../components/layout/GuestLayout";

const InfoTabsPage = () => {
  const [activeTab, setActiveTab] = useState("complaint");

  const renderContent = () => {
    switch (activeTab) {
      case "complaint":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 ">Khiếu nại</h2>
            <p className="mb-4">
              Nếu bạn có bất kỳ khiếu nại nào, vui lòng liên hệ với chúng tôi
              qua email hoặc số điện thoại được cung cấp trên trang web. Chúng
              tôi sẽ cố gắng giải quyết vấn đề của bạn trong thời gian sớm nhất.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Cung cấp mã đơn hàng</li>
              <li>Ngày mua hàng</li>
              <li>Chi tiết vấn đề bạn gặp phải</li>
            </ul>
            <p className="mb-4">
              Email hỗ trợ:{" "}
              <a href="mailto:support@example.com" className=" underline">
                support@example.com
              </a>
            </p>
            <p>
              Số điện thoại hỗ trợ:{" "}
              <span className=" font-semibold">+84 123 456 789</span>
            </p>
          </div>
        );
      case "privacy":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 ">Chính sách bảo mật</h2>
            <p className="mb-4">
              Chúng tôi cam kết bảo mật thông tin cá nhân của bạn. Vui lòng đọc
              kỹ chính sách bảo mật của chúng tôi để hiểu rõ cách chúng tôi thu
              thập, sử dụng và bảo vệ thông tin của bạn.
            </p>
            <p className="mb-4">
              Thông tin cá nhân của bạn sẽ chỉ được sử dụng cho mục đích cung
              cấp dịch vụ và sẽ không được chia sẻ với bên thứ ba mà không có sự
              đồng ý của bạn.
            </p>
            <p className="mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên
              hệ với chúng tôi qua email:{" "}
              <a href="mailto:privacy@example.com" className=" underline">
                privacy@example.com
              </a>
              .
            </p>
            <p>
              Để biết thêm thông tin chi tiết, vui lòng truy cập trang{" "}
              <a href="/privacy-policy" className=" underline">
                Chính sách bảo mật
              </a>
              .
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">
                NỘI DUNG CHI TIẾT CHÍNH SÁCH BẢO MẬT
              </h3>
              <h4 className="text-lg font-semibold mb-2">
                I. Chính sách bảo mật và chia sẻ thông tin
              </h4>
              <p className="mb-4">
                <strong>1. Mục đích</strong>
                <br />
                Helios.vn tôn trọng sự riêng tư, muốn bảo vệ thông tin cá nhân
                và thông tin thanh toán của bạn. "Chính sách bảo mật" dưới đây
                là những cam kết mà chúng tôi thực hiện, nhằm tôn trọng và bảo
                vệ quyền lợi của người truy cập.
              </p>
              <p className="mb-4">
                <strong>2. Quy định cụ thể</strong>
                <br />
                <strong>2.1/ Thu thập thông tin</strong>
                <br />
                - Khi khách hàng thực hiện giao dịch/ đăng ký mở tài khoản tại
                Helios.vn khách hàng phải cung cấp một số thông tin cần thiết.
                Khách hàng tự nhiên cung cấp thông tin để phía Helios hỗ trợ đổi
                trả/bảo hành cũng như thông báo đến khách hàng các ưu đãi.
                <br />
                - Khách hàng có trách nhiệm bảo đảm thông tin đúng và luôn cập
                nhật đầy đủ và chính xác nhất.
                <br />- Nếu khách hàng có nhu cầu muốn thay đổi thông tin cung
                cấp trước đó thì có 2 cách: Gặp trực tiếp nhân viên bán hàng tại
                cửa hàng hoặc gọi điện thoại đến hotline CSKH của công ty: 0964
                302 899. Cung cấp thông tin cũ để chỉnh sửa và thông tin mới để
                được cập nhật trên hệ thống thông tin.
              </p>
              <p className="mb-4">
                <strong>2.2/ Lưu trữ và bảo mật thông tin riêng</strong>
                <br />
                - Thông tin khách hàng, cũng như các trao đổi giữa khách hàng và
                Helios, đều được lưu trữ và bảo mật bởi hệ thống của Helios.
                <br />
                - Thông tin sẽ được lưu trữ từ khi khách hàng cung cấp trên hệ
                thống của Helios và không bị mất đi (lưu trữ vĩnh viễn).
                <br />- Helios có các biện pháp thích hợp về kỹ thuật và an ninh
                để ngăn chặn việc truy cập, sử dụng trái phép thông tin khách
                hàng.
              </p>
              <p className="mb-4">
                <strong>2.3/ Sử dụng thông tin khách hàng</strong>
                <br />
                - Chỉ những bộ phận nội bộ được sử dụng thông tin lưu trữ của
                khách hàng bao gồm: Bộ phận Marketing, Bộ Phận Chăm Sóc Khách
                Hàng, Bộ Phận Nhân viên bán hàng tại các cửa hàng và đội ngũ bán
                hàng online, vận chuyển.
                <br />
                - Helios có quyền sử dụng thông tin khách hàng cung cấp để:
                <br />
                + Giao hàng theo địa chỉ mà quý khách cung cấp.
                <br />
                + Cung cấp thông tin liên quan đến sản phẩm, lợi ích, ưu đãi hay
                các thư từ khác.
                <br />
                + Xử lý đơn đặt hàng và cung cấp dịch vụ, thông tin qua trang
                web Helios.vn theo yêu cầu của quý khách.
                <br />
                + Sử dụng thông tin đã thu thập được từ các cookies nhằm cải
                thiện trải nghiệm người dùng và chất lượng các dịch vụ của
                Helios.vn.
                <br />+ Helios dùng thông tin số điện thoại của khách hàng để
                tạo tài khoản thành viên. Từ đó tạo ra "Chương Trình Khách Hàng
                Thân Thiết" mang đến những ưu đãi và những quyền lợi đặc biệt
                dành riêng cho khách hàng thân thiết của Helios.
              </p>
              <p className="mb-4">
                <strong>3. Liên kết với website khác</strong>
                <br />- Khách hàng có trách nhiệm bảo vệ thông tin tài khoản của
                mình và không cung cấp bất kỳ thông tin nào liên quan đến tài
                khoản và mật khẩu truy cập trên Helios.vn trên các website khác.
              </p>
              <p className="mb-4">
                <strong>4. Chia sẻ thông tin khách hàng</strong>
                <br />
                Helios cam kết sẽ không chia sẻ thông tin của khách hàng cho bất
                kỳ một công ty nào khác ngoại trừ những công ty và các bên thứ
                ba có liên quan trực tiếp đến việc giao hàng. Chúng tôi có thể
                tiết lộ hoặc cung cấp thông tin cá nhân của quý khách trong các
                trường hợp thật sự cần thiết như sau:
                <br />
                - Khi có yêu cầu của các cơ quan pháp luật.
                <br />
                - Chia sẻ thông tin khách hàng với đối tác chạy quảng cáo như
                Google ví dụ như tiếp thị lại khách hàng dựa theo hành vi của
                khách hàng.
                <br />- Nghiên cứu thị trường và các báo cáo phân tích và tuyệt
                đối không chuyển cho bên thứ ba.
              </p>
              <p className="mb-4">
                <strong>5. Sử dụng Cookie</strong>
                <br />
                Khi khách hàng sử dụng dịch vụ hoặc xem nội dung do Helios cung
                cấp, chúng tôi tự động thu thập và lưu trữ một số thông tin
                trong nhật ký máy chủ. Những thông tin này bao gồm:
                <br />
                - Các chi tiết về cách khách hàng sử dụng dịch vụ của Helios
                chẳng hạn như truy vấn tìm kiếm.
                <br />
                - Địa chỉ giao thức Internet.
                <br />
                - Thông tin sự cố thiết bị như lỗi, hoạt động của hệ thống, cài
                đặt phần cứng, loại trình duyệt, ngôn ngữ trình duyệt, ngày và
                thời gian bạn yêu cầu và URL giới thiệu.
                <br />- Cookie có thể nhận dạng duy nhất trình duyệt hoặc Tài
                khoản của khách hàng.
              </p>
              <p className="mb-4">
                <strong>6. Liên hệ, giải đáp, thắc mắc</strong>
                <br />
                Bất kỳ khi nào khách hàng cần hỗ trợ, xin vui lòng liên hệ với
                Helios tại Email: support@heliosjewels.vn - ĐT: 0964 302 899
              </p>
              <h4 className="text-lg font-semibold mb-2">
                II. Chính sách bảo mật thanh toán
              </h4>
              <p className="mb-4">
                - Hệ thống thanh toán thẻ trên Helios.vn được cung cấp bởi các
                đối tác cổng thanh toán đã được cấp phép hoạt động hợp pháp tại
                Việt Nam. Do đó, các tiêu chuẩn bảo mật thanh toán thẻ của
                Helios đảm bảo tuân thủ theo các tiêu chuẩn bảo mật của Đối tác
                cổng thanh toán.
                <br />- Ngoài ra, Helios còn có các tiêu chuẩn bảo mật giao dịch
                thanh toán riêng để đảm bảo an toàn các thông tin thanh toán của
                khách hàng.
              </p>
              <p className="mb-4">
                Mọi thắc mắc về chương trình, vui lòng liên hệ:
                <br />
                Hotline chăm sóc khách hàng: 0964 302 899
                <br />
                Website: jewelry.vn
                <br />
                Email: support@jewelry.vn
                <br />
                Fanpage: facebook.com/jewelry
                <br />
                Xem địa chỉ cửa hàng jewelry tại đây: Xem TẠI ĐÂY
              </p>
            </div>
          </div>
        );
      case "terms":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 ">Chính sách bảo hành</h2>
            <h3 className="text-xl font-semibold mb-2">SẢN PHẨM BẠC S925</h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                Các chế tác Bạc S925 của Helios sẽ được miễn phí đánh sáng trọn
                đời. Khách hàng vui lòng tới cửa hàng để được trải nghiệm dịch
                vụ đánh sáng. Helios cung cấp dịch vụ đánh bóng chuyên sâu với
                chi phí là 100.000VNĐ/sản phẩm. Khách hàng vui lòng gửi sản phẩm
                về Helios để thực hiện quá trình đánh bóng chuyên sâu tại xưởng.
              </li>
              <li>
                Các chế tác Bạc S925 tại Helios sẽ được bảo hành miễn phí 3
                tháng đầu về mặt kỹ thuật như: Đính đá rơi, điều chỉnh lại khóa,
                thay thế lò xo, thay thế dây đan, đính lại charm (quý khách phải
                còn lại charm) trên sản phẩm da nếu gặp sự cố. Thời gian để bảo
                hành kéo dài tối đa 10 ngày.
              </li>
              <li>
                Thay miễn phí đá CZ, đá tổng hợp trong suốt thời hạn bảo hành
                của sản phẩm (3 tháng sau khi mua hàng). Thời gian để bảo hành
                thay đá sản phẩm kéo dài tối đa 10 ngày.
              </li>
              <li>
                Đối với đá tự nhiên, thời gian để bảo hành thay đá sản phẩm kéo
                dài tối đa 14 ngày, trường hợp đặc biệt có thể kéo dài hơn.
              </li>
              <li>
                Sau thời gian bảo hành, từ tháng thứ 4 đến hết tháng thứ 12, sản
                phẩm hỏng hóc trong quá trình sử dụng được sửa chữa, bảo hành có
                tính phí tùy thuộc vào từng vấn đề hỏng hóc của sản phẩm.
              </li>
              <li>
                Trên 12 tháng Helios sẽ xem xét tình trạng của sản phẩm để quyết
                định có nhận sửa chữa hay không (sửa chữa có tính phí).
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">SẢN PHẨM VÀNG</h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                Các chế tác Vàng của Helios sẽ được miễn phí đánh bóng, làm mới,
                làm sạch bằng máy chuyên dụng (siêu âm, không xi) trọn đời sản
                phẩm.
              </li>
              <li>
                Các chế tác Vàng tại Helios sẽ được bảo hành miễn phí 6 tháng
                đầu về mặt kỹ thuật như: Đính đá rơi, điều chỉnh lại khóa, thay
                thế lò xo, thay thế dây đan, đính lại charm trên sản phẩm da nếu
                gặp sự cố.
              </li>
              <li>
                Thay miễn phí đá CZ, đá tổng hợp trong suốt thời gian sản phẩm
                được bảo hành.
              </li>
              <li>
                Từ tháng 6 đến hết tháng thứ 12, sản phẩm hỏng hóc trong quá
                trình sử dụng được sửa chữa, bảo hành có tính phí tùy thuộc vào
                từng vấn đề của sản phẩm.
              </li>
              <li>
                Trên 12 tháng Helios sẽ xem xét tình trạng của sản phẩm để quyết
                định có nhận sửa chữa hay không (sửa chữa có tính phí).
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">SẢN PHẨM DA</h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                Thời hạn bảo hành miễn phí: 6 tháng kể từ ngày mua hàng. Bảo
                hành miễn phí đối với các lỗi kỹ thuật do nhà sản xuất.
              </li>
              <li>
                Các lỗi kỹ thuật như bong viền keo/chỉ/sơn cạnh sẽ được sơn lại
                viền, may lại chỉ.
              </li>
              <li>
                Các phụ kiện kim loại như nút bấm, nam châm, khóa kéo bị hư sẽ
                được thay thế phụ kiện.
              </li>
              <li>
                Các phụ kiện bằng bạc S925 bị oxy hóa sẽ được vệ sinh bằng dụng
                cụ chuyên biệt.
              </li>
            </ul>
            <p className="mb-4">
              Lưu ý: Helios không nhận bảo hành các sản phẩm đã qua sửa chữa,
              can thiệp từ các cơ sở bảo hành khác không thuộc Helios.
            </p>
          </div>
        );
      case "payment":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 ">Hướng dẫn thanh toán</h2>
            <p className="mb-4">
              Sau khi bạn hoàn tất thanh toán, hệ thống sẽ xử lý đơn hàng của
              bạn. Vui lòng đợi từ <strong>5 đến 10 phút</strong> để chúng tôi
              xác nhận thanh toán.
            </p>
            <p className="mb-4">
              Nếu bạn không nhận được xác nhận sau thời gian này, vui lòng liên
              hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Kiểm tra email để nhận thông báo xác nhận</li>
              <li>Đảm bảo thông tin thanh toán chính xác</li>
              <li>Liên hệ hỗ trợ nếu cần thiết</li>
            </ul>
            <p>
              Email hỗ trợ:{" "}
              <a href="mailto:payment@example.com" className=" underline">
                payment@example.com
              </a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GuestLayout>
      <Helmet>
        <title>Chính sách</title>
      </Helmet>
      <div className="container mx-auto py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Chính sách</h1>
        <div className="tabs mb-6 flex space-x-4">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "complaint"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("complaint")}
          >
            Khiếu nại
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "privacy"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            Chính sách bảo mật
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "terms"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("terms")}
          >
            Chính sách bảo hành
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "payment"
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Hướng dẫn thanh toán
          </button>
        </div>
        <div className="w-full max-w-3xl">{renderContent()}</div>
      </div>
    </GuestLayout>
  );
};

export default InfoTabsPage;
