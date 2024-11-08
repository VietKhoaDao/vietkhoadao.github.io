// document.addEventListener("DOMContentLoaded", function() {
//     const episodes = document.querySelectorAll('.episode');
//     const iframe = document.querySelector('iframe');

//     if (episodes.length > 0) {
//         const firstSrc = episodes[0].getAttribute('data_src');
//         iframe.src = firstSrc;
//     }

//     episodes.forEach(function(episode) {
//         episode.addEventListener('click', function() {
//             const src = this.getAttribute('data_src');
//             iframe.src = src; // Gán src cho iframe
//         });
//     });
// });

const buttons = document.querySelectorAll('.episode');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const episodes = document.querySelectorAll('.episode');
    const iframe = document.querySelector('iframe');
    let currentIndex = 0; // Khởi tạo chỉ số của tập hiện tại

    // Set tập đầu tiên khi tải trang
    if (episodes.length > 0) {
        const firstSrc = episodes[0].getAttribute('data_src');
        iframe.src = firstSrc;
        episodes[0].classList.add('active'); // Đặt trạng thái active cho tập đầu tiên
    }

    // Sự kiện khi click vào mỗi tập
    episodes.forEach(function(episode, index) {
        episode.addEventListener('click', function() {
            const src = this.getAttribute('data_src');
            iframe.src = src;
            currentIndex = index; // Cập nhật chỉ số tập hiện tại
        });
    });

    // Sự kiện cho nút "Tập tiếp theo"
    const nextButton = document.querySelector('.change-ep');
    nextButton.addEventListener('click', function() {
        if (currentIndex < episodes.length - 1) {
            currentIndex++; // Tăng chỉ số của tập hiện tại
            const nextEpisode = episodes[currentIndex];
            iframe.src = nextEpisode.getAttribute('data_src'); // Đặt src cho iframe
            episodes.forEach(btn => btn.classList.remove('active')); // Bỏ trạng thái active của tất cả các button
            nextEpisode.classList.add('active'); // Đặt trạng thái active cho tập tiếp theo
        } else {
            alert("Bạn đã ở tập cuối cùng!"); // Hiện thông báo nếu ở tập cuối
        }
    });
});
